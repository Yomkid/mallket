// services/auth.service.ts
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import crypto from 'crypto';
import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { sendEmail } from '../utils/sendEmail';


// Environment configuration
import { getEnvVar } from '../utils/env';

// const JWT_SECRET = getEnvVar('JWT_SECRET');
// const JWT_EXPIRES_IN = getEnvVar('JWT_EXPIRES_IN', '7d');

const SALT_ROUNDS = 12; // Increased for better security
const TOKEN_EXPIRATION_HOURS = 1;


// Token utilities
// JWT_EXPIRES_IN should be typed as ms.StringValue
const JWT_SECRET: string = getEnvVar('JWT_SECRET');
const JWT_EXPIRES_IN = getEnvVar('JWT_EXPIRES_IN', '7d') as jwt.Jwt | string; // explicitly asserting to string

export function generateToken(userId: string): string {
  const payload = { userId };
  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN as SignOptions['expiresIn'], // ✅ fixes the type error
  };

  return jwt.sign(payload, JWT_SECRET, options);
}


// Password utilities
export async function hashPassword(password: string): Promise<string> {
    if (!password) throw new Error('Password is required');
    return bcrypt.hash(password, SALT_ROUNDS);
}



export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    if (!password || !hashedPassword) return false;
    return bcrypt.compare(password, hashedPassword);
}



export function generateRandomToken(length = 64): string {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
}

// Email utilities
export async function sendVerificationEmail(email: string, token: string): Promise<void> {
    if (!email || !token) throw new Error('Email and token are required');
    
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    const expirationHours = TOKEN_EXPIRATION_HOURS;

    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Verify Your Email Address</h2>
            <p>Thank you for registering with our service. Please verify your email address by clicking the button below:</p>
            <a href="${verificationUrl}" 
               style="display: inline-block; background: #007bff; color: #fff; padding: 10px 20px; 
                      text-decoration: none; border-radius: 4px; margin: 15px 0;">
                Verify Email
            </a>
            <p>This link will expire in ${expirationHours} hour${expirationHours !== 1 ? 's' : ''}.</p>
            <p>If you didn't request this, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 12px; color: #777;">
                For security reasons, we don't store your password in plain text. If you forget your password, 
                you can reset it using our password reset service.
            </p>
        </div>
    `;

    await sendEmail({
        to: email,
        subject: 'Verify Your Account',
        html,
    });
}

export async function sendPasswordResetEmail(email: string, token: string): Promise<void> {
    if (!email || !token) throw new Error('Email and token are required');
    
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    const expirationHours = TOKEN_EXPIRATION_HOURS;

    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Password Reset Request</h2>
            <p>We received a request to reset your password. Click the button below to proceed:</p>
            <a href="${resetUrl}" 
               style="display: inline-block; background: #dc3545; color: #fff; padding: 10px 20px; 
                      text-decoration: none; border-radius: 4px; margin: 15px 0;">
                Reset Password
            </a>
            <p>This link will expire in ${expirationHours} hour${expirationHours !== 1 ? 's' : ''}.</p>
            <p>If you didn't request a password reset, please ignore this email or contact support.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 12px; color: #777;">
                For your security, this password reset link can only be used once and will expire.
            </p>
        </div>
    `;

    await sendEmail({
        to: email,
        subject: 'Password Reset Instructions',
        html,
    });
}

// Auth operations
async function register(req: Request, res: Response) {
    try {
        const { email, password, firstName, lastName, roleName = 'CUSTOMER' } = req.body;

        // Input validation
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Password strength validation
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters' });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        const role = await prisma.role.findUnique({ where: { name: roleName } });
        if (!role) {
            return res.status(400).json({ message: 'Invalid role specified' });
        }

        const hashedPassword = await hashPassword(password);
        const verifyToken = generateRandomToken();
        const verifyExpires = new Date(Date.now() + TOKEN_EXPIRATION_HOURS * 60 * 60 * 1000);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                roleId: role.id,
                verifyToken,
                verifyExpires,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                createdAt: true,
            },
        });

        await sendVerificationEmail(email, verifyToken);

        return res.status(201).json({
            message: 'User registered. Please verify your email.',
            user,
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await prisma.user.findUnique({
            where: { email },
            include: { 
                role: { 
                    include: { 
                        permissions: { 
                            select: { action: true } // ✅ Corrected field
                        } 
                    } 
                } 
            },
        });

        if (!user || !user.password || !(await comparePassword(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (user.isBanned) {
            return res.status(403).json({ message: 'Account suspended. Please contact support.' });
        }

        if (!user.emailVerified) {
            return res.status(403).json({ 
                message: 'Please verify your email before logging in',
                resendVerification: true,
            });
        }

        const token = generateToken(user.id);
        const permissions = user.role?.permissions?.map(p => p.action) || []; // ✅ Corrected mapping

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role?.name,
                permissions,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


export default {
    register,
    login,
    hashPassword,
    comparePassword,
    generateToken,
    generateRandomToken,
    sendVerificationEmail,
    sendPasswordResetEmail,
};