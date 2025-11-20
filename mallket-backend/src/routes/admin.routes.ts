import { Router } from 'express';
import asyncHandler from '../utils/asyncHandler';
import { protect, authorizeAction, requireRole, } from '../middlewares/auth.middleware';

const router = Router();

// 🔐 **Role-based protected routes (Permissions dynamically checked)**
router.get('/users',  asyncHandler(protect),  asyncHandler(authorizeAction), asyncHandler(requireRole));  

export default router;
