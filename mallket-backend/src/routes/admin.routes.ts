import { Router } from 'express';
import asyncHandler from '../utils/asyncHandler';
import { getAllUsers } from '../controllers/admin.controller';
import { protect, authorizeAction } from '../middlewares/auth.middleware';

const router = Router();

// 🔐 **Role-based protected routes (Permissions dynamically checked)**
router.get('/users', protect, authorizeAction, asyncHandler(getAllUsers));  

export default router;
