"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const express_rate_limit_1 = require("express-rate-limit");
const router = (0, express_1.Router)();
// Rate limiting for auth endpoints
const authLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: 'Too many requests from this IP, please try again later',
});
// Public routes
router.post('/register', authLimiter, (0, asyncHandler_1.default)(auth_controller_1.register));
router.post('/login', authLimiter, (0, asyncHandler_1.default)(auth_controller_1.login));
router.get('/verify-email', (0, asyncHandler_1.default)(auth_controller_1.verifyEmail));
router.post('/resend-verification', authLimiter, (0, asyncHandler_1.default)(auth_controller_1.resendVerificationEmail));
router.post('/request-password-reset', authLimiter, (0, asyncHandler_1.default)(auth_controller_1.requestPasswordReset));
router.post('/reset-password', authLimiter, (0, asyncHandler_1.default)(auth_controller_1.resetPassword));
// asyncHandler(protect)ed route
router.post('/logout', (0, asyncHandler_1.default)(auth_middleware_1.protect), (0, asyncHandler_1.default)(auth_controller_1.logout));
// Admin-only routes
router.post('/ban-user/:userId', (0, asyncHandler_1.default)(auth_middleware_1.protect), (0, asyncHandler_1.default)(auth_middleware_1.requireRole), (0, asyncHandler_1.default)(auth_middleware_1.authorizeAction), (0, asyncHandler_1.default)(auth_controller_1.banUser));
router.post('/unban-user/:userId', (0, asyncHandler_1.default)(auth_middleware_1.protect), (0, asyncHandler_1.default)(auth_middleware_1.requireRole), (0, asyncHandler_1.default)(auth_middleware_1.authorizeAction), (0, asyncHandler_1.default)(auth_controller_1.unbanUser));
// User Management
router.get('/me', (0, asyncHandler_1.default)(auth_middleware_1.protect), (0, asyncHandler_1.default)(auth_controller_1.getCurrentUser));
router.put('/update-password', (0, asyncHandler_1.default)(auth_middleware_1.protect), (0, asyncHandler_1.default)(auth_controller_1.updatePassword));
router.put('/update-profile', (0, asyncHandler_1.default)(auth_middleware_1.protect), (0, asyncHandler_1.default)(auth_controller_1.updateProfile));
// Role Management (admin only)
router.post('/roles', (0, asyncHandler_1.default)(auth_middleware_1.protect), (0, asyncHandler_1.default)(auth_middleware_1.requireRole), (0, asyncHandler_1.default)(auth_middleware_1.authorizeAction), (0, asyncHandler_1.default)(auth_controller_1.createRole));
router.get('/roles', (0, asyncHandler_1.default)(auth_middleware_1.protect), (0, asyncHandler_1.default)(auth_middleware_1.requireRole), (0, asyncHandler_1.default)(auth_middleware_1.authorizeAction), (0, asyncHandler_1.default)(auth_controller_1.listRoles));
exports.default = router;
