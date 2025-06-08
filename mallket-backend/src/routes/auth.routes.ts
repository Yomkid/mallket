import { Router } from 'express';
import asyncHandler from '../utils/asyncHandler';
import {
    register,
    verifyEmail,
    login,
    logout,
    resendVerificationEmail,
    requestPasswordReset,
    resetPassword,
    banUser,
    unbanUser,
    getCurrentUser,
    updatePassword,
    updateProfile,
    createRole,
    listRoles
} from '../controllers/auth.controller';
import {
    protect,
    requireRole,
    authorizeAction
} from '../middlewares/auth.middleware';
import { rateLimit } from 'express-rate-limit';

const router = Router();

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: 'Too many requests from this IP, please try again later',
});

// Public routes
router.post('/register', authLimiter, asyncHandler(register));
router.post('/login', authLimiter, asyncHandler(login));
router.get('/verify-email', asyncHandler(verifyEmail));
router.post('/resend-verification', authLimiter, asyncHandler(resendVerificationEmail));
router.post('/request-password-reset', authLimiter, asyncHandler(requestPasswordReset));
router.post('/reset-password', authLimiter, asyncHandler(resetPassword));

// asyncHandler(protect)ed route
router.post('/logout', asyncHandler(protect), asyncHandler(logout));

// Admin-only routes
router.post('/ban-user/:userId', asyncHandler(protect), asyncHandler(requireRole), asyncHandler(authorizeAction), asyncHandler(banUser));
router.post('/unban-user/:userId', asyncHandler(protect), asyncHandler(requireRole), asyncHandler(authorizeAction), asyncHandler(unbanUser));

// User Management
router.get('/me', asyncHandler(protect), asyncHandler(getCurrentUser));
router.put('/update-password', asyncHandler(protect), asyncHandler(updatePassword));
router.put('/update-profile', asyncHandler(protect), asyncHandler(updateProfile));

// Role Management (admin only)
router.post('/roles', asyncHandler(protect), asyncHandler(requireRole), asyncHandler(authorizeAction), asyncHandler(createRole));
router.get('/roles', asyncHandler(protect), asyncHandler(requireRole), asyncHandler(authorizeAction), asyncHandler(listRoles));

export default router;
