import { Request, Response } from 'express';
import crypto from 'crypto';
import authService from '../services/auth.service';
import { PrismaClient, NotificationType } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from '../utils/sendEmail';
import { logAudit } from '../utils/auditLog';
import { sendNotification } from '../utils/notification';
import { generateNotificationEmail } from '../utils/emailTemplate';
import { notifyUser } from '../services/multiNotification.service';




const prisma = new PrismaClient();
const SESSION_EXPIRY = 1000 * 60 * 60 * 24 * 7; // 7 days
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_DURATION = 15 * 60 * 1000; // 15 minutes

export const login = async (req: Request, res: Response) => {
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
        const isMatch = await bcrypt.compare(password, user.password);
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
        const sessionToken = jwt.sign({ userId: user.id, role: user.roleId }, process.env.JWT_SECRET, { expiresIn: "7d" });
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

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};




// 🔐 REGISTER
export const register = async (req: Request, res: Response) => {
    try {
        // Debugging: Log the received request body
        console.log("Received Request Body:", req.body);

        const {
            firstName,
            lastName,
            email,
            password,
            roleName = "CUSTOMER", // Default role
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
        const hashedPassword = await authService.hashPassword(password);

        // Retrieve the role ID
        const role = await prisma.role.findUnique({
            where: { name: roleName },
        });

        if (!role) {
            return res.status(400).json({ message: "Invalid role name" });
        }

        const verifyToken = crypto.randomBytes(32).toString("hex");
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
        await authService.sendVerificationEmail(newUser.email, verifyToken);

        // Remove sensitive data before sending response
        const { password: _, verifyToken: __, verifyExpires: ___, ...userWithoutSensitiveData } = newUser;

        res.status(201).json({
            message: "Registration successful, check your email to verify your account",
            user: userWithoutSensitiveData,
        });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};




export const logout = async (req: Request, res: Response) => {
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
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



// ✅ VERIFY EMAIL
export const verifyEmail = async (req: Request, res: Response) => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({ message: "Verification token is required" });
        }

        const user = await prisma.user.findFirst({
            where: {
                verifyToken: token as string,
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
    } catch (error) {
        console.error("Email verification error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// 🔄 RESEND VERIFICATION EMAIL
export const resendVerificationEmail = async (req: Request, res: Response) => {
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

        const token = crypto.randomBytes(32).toString('hex');
        const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        await prisma.user.update({
            where: { email },
            data: {
                verifyToken: token,
                verifyExpires: expiry,
            },
        });

        await authService.sendVerificationEmail(email, token);

        res.status(200).json({ message: "Verification email resent" });
    } catch (error) {
        console.error("Resend verification error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// 🔄 PASSWORD RESET REQUEST
export const requestPasswordReset = async (req: Request, res: Response) => {
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

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetExpires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

        await prisma.user.update({
            where: { email },
            data: { resetToken, resetExpires },
        });

        await authService.sendPasswordResetEmail(email, resetToken);

        res.status(200).json({ message: "If the email exists, a password reset link has been sent" });
    } catch (error) {
        console.error("Password reset request error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// 🔄 RESET PASSWORD
export const resetPassword = async (req: Request, res: Response) => {
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
         if (!user || !user.password) {
            return res.status(401).json({ message: "Invalid user" });
        }

        const isMatch = await authService.comparePassword(newPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "New password must be different from current password" });
        }


        const hashedPassword = await authService.hashPassword(newPassword);

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
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// 🚫 BAN USER
export const banUser = async (req: Request, res: Response) => {
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

        // 2. In-App Notification
        await sendNotification({
            userId,
            type: NotificationType.SECURITY,
            title: 'Account Banned',
            message: 'Your account has been banned due to security violations.',
            link: '/support',
        });

        // 3. Email Notification
        const emailHTML = generateNotificationEmail(
            'Account Banned',
            'Your MallKet account has been banned due to security violations. If this is a mistake, please contact our support team.',
            'https://mallket.com/support'
        );

        await sendMail({
            to: user.email,
            subject: 'MallKet Account Banned',
            html: emailHTML,
        });

        // 4. Audit Log
        await logAudit({
            req,
            action: 'BAN_USER',
            entity: 'User',
            entityId: userId,
            metadata: {
                reason: 'Security policy violation',
                title: 'Account Banned',
                bannedEmail: user.email,
                sentBy: req.user?.email || 'system',
                timestamp: new Date().toISOString(),
            },
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

        // res.status(200).json({ message: "User has been banned successfully" });
        res.status(200).json({ message: 'User banned, notifications and email sent' });

    } catch (error) {
        console.error("Ban user error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



// ✅ UNBAN USER
export const unbanUser = async (req: Request, res: Response) => {
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



        console.log('Body:', req.body); // ⬅️ Add this line
        const { reason } = req.body;

        // Validate
        if (!reason) {
            return res.status(400).json({ message: 'Reason is required' });
        }
        // Send notification (in-app + email) and log audit
        await notifyUser({
            req,
            userId,
            email: user.email, // ✅ Make sure to include this
            type: NotificationType.SECURITY,
            title: 'Account Banned',
            message: `${reason}`,
            link: '/help/account-status',
            reason: `${reason}`,
        });



        res.status(200).json({ message: "User has been unbanned successfully" });
    } catch (error) {
        console.error("Unban user error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



// 👤 Get Current User Info
export const getCurrentUser = async (req: Request, res: Response) => {
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
    } catch (error) {
        console.error("Get current user error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// 🔒 Update Password
export const updatePassword = async (req: Request, res: Response) => {
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

        const isMatch = await authService.comparePassword(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Current password is incorrect" });
        }

        const hashedPassword = await authService.hashPassword(newPassword);

        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Update password error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✏️ Update Profile
export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const { firstName, lastName, address } = req.body;

        const updateData: any = {};
        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
            include: {
                role: true,
                addresses: true
            }
        });

        res.status(200).json({ user: updatedUser });
    } catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// 🔧 Create Role (Admin Only)
export const createRole = async (req: Request, res: Response) => {
    try {
        const { name, permissions } = req.body;

        const role = await prisma.role.create({
            data: {
                name,
                permissions: {
                    connect: permissions?.map((id: number) => ({ id }))
                }
            }
        });

        res.status(201).json({ message: "Role created successfully", role });
    } catch (error) {
        console.error("Create role error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// 📋 List Roles (Admin Only)
export const listRoles = async (_req: Request, res: Response) => {
    try {
        const roles = await prisma.role.findMany({
            include: {
                permissions: true
            }
        });

        res.status(200).json({ roles });
    } catch (error) {
        console.error("List roles error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


