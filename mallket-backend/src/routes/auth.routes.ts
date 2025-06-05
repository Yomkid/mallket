import { Router } from 'express';
import asyncHandler from '../utils/asyncHandler';
import { register, login, logout } from '../controllers/auth.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// 🔐 **User authentication routes**
router.post('/register', asyncHandler(register)); // Users register, roles assigned dynamically
router.post('/login', asyncHandler(login)); // Verify role & status before login
// 🔐 **Authentication routes**
router.post('/logout', protect,  asyncHandler(logout)); // Requires authentication

export default router;
