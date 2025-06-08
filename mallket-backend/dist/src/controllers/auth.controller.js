"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRoles = exports.createRole = exports.updateProfile = exports.updatePassword = exports.getCurrentUser = exports.unbanUser = exports.banUser = exports.resetPassword = exports.requestPasswordReset = exports.resendVerificationEmail = exports.verifyEmail = exports.logout = exports.register = exports.login = void 0;
const crypto_1 = __importDefault(require("crypto"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auditLog_1 = require("../utils/auditLog");
const notification_1 = require("../utils/notification");
const prisma = new client_1.PrismaClient();
const SESSION_EXPIRY = 1000 * 60 * 60 * 24 * 7; // 7 days
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_DURATION = 15 * 60 * 1000; // 15 minutes
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        // ✅ Find user
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                role: { include: { permissions: true } },
                addresses: true,
            },
        });
        if (!user || !user.password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // ✅ Check if account is locked
        if (user.lockedUntil && new Date(user.lockedUntil) > new Date()) {
            return res.status(403).json({ message: "Account locked due to too many failed attempts. Try again later." });
        }
        if (user.isBanned) {
            return res.status(403).json({ message: "Your account has been banned." });
        }
        // ✅ Verify password
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            await prisma.user.update({
                where: { id: user.id },
                data: { loginAttempts: user.loginAttempts + 1 }
            });
            if (user.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS) {
                await prisma.user.update({
                    where: { id: user.id },
                    data: { lockedUntil: new Date(Date.now() + LOCK_DURATION) }
                });
            }
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // ✅ Generate JWT session token
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET environment variable is not set");
        }
        const sessionToken = jsonwebtoken_1.default.sign({ userId: user.id, role: user.roleId }, process.env.JWT_SECRET, { expiresIn: "7d" });
        const expiresAt = new Date(Date.now() + SESSION_EXPIRY);
        await prisma.session.create({
            data: {
                userId: user.id,
                token: sessionToken,
                ipAddress: req.ip ?? "Unknown",
                userAgent: req.headers["user-agent"] ?? "Unknown",
                expiresAt,
            }
        });
        // ✅ Update last login & reset failed attempts
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                lastLogin: new Date(),
                loginAttempts: 0,
                lockedUntil: null,
            },
            include: {
                role: { include: { permissions: true } },
                addresses: true,
            }
        });
        // ✅ Send response
        const { password: _, verifyToken: __, verifyExpires: ___, resetToken, resetExpires, ...userWithoutSensitiveData } = updatedUser;
        res.status(200).json({
            message: "Login successful",
            token: sessionToken,
            user: userWithoutSensitiveData,
        });
    }
    catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.login = login;
// 🔐 REGISTER
const register = async (req, res) => {
    try {
        // Debugging: Log the received request body
        console.log("Received Request Body:", req.body);
        const { firstName, lastName, email, password, roleName = "CUSTOMER", // Default role
        address, // Optional: { street, city, zipCode }
         } = req.body;
        // Validate required fields
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        // Password validation
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "Email is already registered" });
        }
        // Hash the password
        const hashedPassword = await auth_service_1.default.hashPassword(password);
        // Retrieve the role ID
        const role = await prisma.role.findUnique({
            where: { name: roleName },
        });
        if (!role) {
            return res.status(400).json({ message: "Invalid role name" });
        }
        const verifyToken = crypto_1.default.randomBytes(32).toString("hex");
        const verifyExpires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours
        console.log("Data sent to Prisma:", JSON.stringify({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            provider: "LOCAL",
            verifyToken,
            verifyExpires,
            roleId: role.id,
            addresses: address ? { create: [address] } : undefined
        }, null, 2));
        // Create new user
        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                provider: "LOCAL",
                verifyToken,
                verifyExpires,
                roleId: role.id,
                addresses: address ? {
                    create: [
                        {
                            firstName: address.firstName ?? firstName, // Ensure fallback values
                            lastName: address.lastName ?? lastName,
                            line1: address.line1 ?? "Unknown Street",
                            line2: address.line2 ?? null,
                            city: address.city ?? "Unknown City",
                            state: address.state ?? "Unknown State",
                            postalCode: address.postalCode ?? "000000",
                            country: address.country ?? "Unknown Country",
                            phone: address.phone ?? null,
                            isDefault: address.isDefault ?? true
                        }
                    ]
                } : undefined
            },
            include: {
                role: { include: { permissions: true } },
                addresses: true
            }
        });
        // Send verification email
        await auth_service_1.default.sendVerificationEmail(newUser.email, verifyToken);
        // Remove sensitive data before sending response
        const { password: _, verifyToken: __, verifyExpires: ___, ...userWithoutSensitiveData } = newUser;
        res.status(201).json({
            message: "Registration successful, check your email to verify your account",
            user: userWithoutSensitiveData,
        });
    }
    catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.register = register;
const logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }
        // ✅ Verify session exists before deletion
        const session = await prisma.session.findUnique({ where: { token } });
        if (!session) {
            return res.status(404).json({ message: "Session not found or already logged out." });
        }
        await prisma.session.delete({ where: { token } });
        res.status(200).json({ message: "Logged out successfully!" });
    }
    catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.logout = logout;
// ✅ VERIFY EMAIL
const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(400).json({ message: "Verification token is required" });
        }
        const user = await prisma.user.findFirst({
            where: {
                verifyToken: token,
                verifyExpires: { gt: new Date() },
            },
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }
        await prisma.user.update({
            where: { id: user.id },
            data: {
                emailVerified: true,
                verifyToken: null,
                verifyExpires: null,
            },
        });
        res.status(200).json({ message: "Email verified successfully" });
    }
    catch (error) {
        console.error("Email verification error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.verifyEmail = verifyEmail;
// 🔄 RESEND VERIFICATION EMAIL
const resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.emailVerified) {
            return res.status(400).json({ message: "Email already verified" });
        }
        const token = crypto_1.default.randomBytes(32).toString('hex');
        const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        await prisma.user.update({
            where: { email },
            data: {
                verifyToken: token,
                verifyExpires: expiry,
            },
        });
        await auth_service_1.default.sendVerificationEmail(email, token);
        res.status(200).json({ message: "Verification email resent" });
    }
    catch (error) {
        console.error("Resend verification error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.resendVerificationEmail = resendVerificationEmail;
// 🔄 PASSWORD RESET REQUEST
const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            // Don't reveal whether user exists or not for security
            return res.status(200).json({ message: "If the email exists, a password reset link has been sent" });
        }
        const resetToken = crypto_1.default.randomBytes(32).toString('hex');
        const resetExpires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
        await prisma.user.update({
            where: { email },
            data: { resetToken, resetExpires },
        });
        await auth_service_1.default.sendPasswordResetEmail(email, resetToken);
        res.status(200).json({ message: "If the email exists, a password reset link has been sent" });
    }
    catch (error) {
        console.error("Password reset request error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.requestPasswordReset = requestPasswordReset;
// 🔄 RESET PASSWORD
const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) {
            return res.status(400).json({ message: "Token and new password are required" });
        }
        if (newPassword.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetExpires: { gt: new Date() },
            },
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }
        // Check if new password is different from current password
        const isSamePassword = await auth_service_1.default.comparePassword(newPassword, user.password);
        if (isSamePassword) {
            return res.status(400).json({ message: "New password must be different from current password" });
        }
        const hashedPassword = await auth_service_1.default.hashPassword(newPassword);
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetExpires: null,
                lastPasswordChange: new Date(),
            },
        });
        res.status(200).json({ message: "Password has been reset successfully" });
    }
    catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.resetPassword = resetPassword;
// 🚫 BAN USER
const banUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.isBanned) {
            return res.status(400).json({ message: "User is already banned" });
        }
        // Update user as banned
        await prisma.user.update({
            where: { id: userId },
            data: { isBanned: true },
        });
        // Optionally blacklist active session tokens if available
        const sessions = await prisma.session.findMany({
            where: { userId },
        });
        // Log Attempts
        await (0, auditLog_1.logAudit)({
            req,
            action: 'BAN_USER',
            entity: 'User',
            entityId: userId,
            metadata: {
                bannedEmail: user.email,
                reason: 'User banned by admin',
                timestamp: new Date().toISOString(),
                bannedBy: req.user?.email, // optional
            },
        });
        await (0, notification_1.sendNotification)({
            userId,
            type: client_1.NotificationType.SECURITY,
            title: 'Account Banned',
            message: 'Your account has been banned due to security reasons.',
        });
        for (const session of sessions) {
            await prisma.blacklistedToken.upsert({
                where: { token: session.token },
                update: {},
                create: {
                    token: session.token,
                    userId,
                    reason: 'User banned',
                },
            });
        }
        res.status(200).json({ message: "User has been banned successfully" });
    }
    catch (error) {
        console.error("Ban user error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.banUser = banUser;
// ✅ UNBAN USER
const unbanUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!user.isBanned) {
            return res.status(400).json({ message: "User is not currently banned" });
        }
        // Unban the user
        await prisma.user.update({
            where: { id: userId },
            data: { isBanned: false },
        });
        // Remove blacklisted tokens associated with the user
        await prisma.blacklistedToken.deleteMany({
            where: { userId },
        });
        // log attempt
        await (0, auditLog_1.logAudit)({
            req,
            action: 'UNBAN_USER',
            entity: 'User',
            entityId: userId,
            metadata: {
                unbannedEmail: user.email,
                reason: 'User unbanned by admin',
                timestamp: new Date().toISOString(),
                unbannedBy: req.user?.email, // optional
            },
        });
        await (0, notification_1.sendNotification)({
            userId,
            type: client_1.NotificationType.SECURITY,
            title: 'Account Unbanned',
            message: 'Your account ban has been lifted. You may now access your account.',
        });
        res.status(200).json({ message: "User has been unbanned successfully" });
    }
    catch (error) {
        console.error("Unban user error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.unbanUser = unbanUser;
// 👤 Get Current User Info
const getCurrentUser = async (req, res) => {
    try {
        const userId = req.user?.id;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                role: { include: { permissions: true } },
                addresses: true,
            }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const { password, verifyToken, verifyExpires, resetToken, resetExpires, ...safeUser } = user;
        res.status(200).json({ user: safeUser });
    }
    catch (error) {
        console.error("Get current user error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getCurrentUser = getCurrentUser;
// 🔒 Update Password
const updatePassword = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "Both current and new passwords are required" });
        }
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user || !user.password) {
            return res.status(401).json({ message: "Invalid user" });
        }
        const isMatch = await auth_service_1.default.comparePassword(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Current password is incorrect" });
        }
        const hashedPassword = await auth_service_1.default.hashPassword(newPassword);
        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });
        res.status(200).json({ message: "Password updated successfully" });
    }
    catch (error) {
        console.error("Update password error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updatePassword = updatePassword;
// ✏️ Update Profile
const updateProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { firstName, lastName, address } = req.body;
        const updateData = {};
        if (firstName)
            updateData.firstName = firstName;
        if (lastName)
            updateData.lastName = lastName;
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
            include: {
                role: true,
                addresses: true
            }
        });
        res.status(200).json({ user: updatedUser });
    }
    catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateProfile = updateProfile;
// 🔧 Create Role (Admin Only)
const createRole = async (req, res) => {
    try {
        const { name, permissions } = req.body;
        const role = await prisma.role.create({
            data: {
                name,
                permissions: {
                    connect: permissions?.map((id) => ({ id }))
                }
            }
        });
        res.status(201).json({ message: "Role created successfully", role });
    }
    catch (error) {
        console.error("Create role error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.createRole = createRole;
// 📋 List Roles (Admin Only)
const listRoles = async (_req, res) => {
    try {
        const roles = await prisma.role.findMany({
            include: {
                permissions: true
            }
        });
        res.status(200).json({ roles });
    }
    catch (error) {
        console.error("List roles error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.listRoles = listRoles;
