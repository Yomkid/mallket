import { Request, Response } from 'express';
import crypto from 'crypto';
import authService from '../services/auth.service';
import prisma from '../config/prisma';

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
                addresses: address ? { create: [address] } : undefined,
            },
            include: {
                role: { include: { permissions: true } },
                addresses: true,
            },
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

// 🔑 LOGIN
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

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

        const isMatch = await authService.comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (!user.emailVerified) {
            return res.status(403).json({
                message: "Please verify your email before logging in",
                resendVerification: true
            });
        }

        const token = authService.generateToken(user.id);

        // Remove sensitive data before sending response
        const { password: _, verifyToken: __, verifyExpires: ___, resetToken: resetToken, resetExpires: resetExpires, ...userWithoutSensitiveData } = user;

        res.status(200).json({
            message: "Login successful",
            token,
            user: userWithoutSensitiveData,
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// 🚪 LOGOUT
export const logout = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }

        await prisma.blacklistedToken.create({
            data: {
                token,
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // Expire in 7 days
            }
        });

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
        const isSamePassword = await authService.comparePassword(newPassword, user.password);
        if (isSamePassword) {
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
        const { userId } = req.params;

        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.isBanned) {
            return res.status(400).json({ message: "User is already banned" });
        }

        await prisma.user.update({
            where: { id: userId },
            data: { isBanned: true },
        });

        res.status(200).json({ message: "User has been banned successfully" });
    } catch (error) {
        console.error("Ban user error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ UNBAN USER
export const unbanUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.isBanned) {
            return res.status(400).json({ message: "User is not currently banned" });
        }

        await prisma.user.update({
            where: { id: userId },
            data: { isBanned: false },
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


