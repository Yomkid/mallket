"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const verifyEmail = async (req, res) => {
    const { token } = req.query;
    if (!token || typeof token !== 'string') {
        return res.status(400).json({ message: 'Invalid verification token' });
    }
    const user = await prisma_1.default.user.findFirst({
        where: {
            verifyToken: token,
            verifyExpires: {
                gt: new Date(), // Token not expired
            },
        },
    });
    if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
    }
    await prisma_1.default.user.update({
        where: { id: user.id },
        data: {
            emailVerified: true,
            verifyToken: null,
            verifyExpires: null,
        },
    });
    return res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
};
exports.verifyEmail = verifyEmail;
