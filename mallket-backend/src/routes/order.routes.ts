import { Router } from 'express';
import asyncHandler from '../utils/asyncHandler';
import { createOrder, getOrders } from '../controllers/order.controller';
import { protect, authorizeAction } from '../middlewares/auth.middleware';

const router = Router();

// 🔐 **Role-based protected routes (Permissions dynamically checked)**
router.post('/', asyncHandler(protect), asyncHandler(authorizeAction), asyncHandler(createOrder));  // Auto-checks required permission dynamically
router.get('/', asyncHandler(protect), asyncHandler(authorizeAction), asyncHandler(getOrders));     // Auto-checks required permission dynamically

export default router;
