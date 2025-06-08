import { Router } from 'express';
import asyncHandler from '../utils/asyncHandler';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cart.controller';
import { protect, authorizeAction } from '../middlewares/auth.middleware';

const router = Router();

// 🔐 All cart routes require authentication
router.use(asyncHandler(protect));

// 🛒 **Customer-only cart actions (Permissions dynamically checked)**
router.get('/', asyncHandler(authorizeAction), asyncHandler(getCart));  
router.post('/', asyncHandler(authorizeAction), asyncHandler(addToCart));  
router.put('/:itemId', asyncHandler(authorizeAction), asyncHandler(updateCartItem));  
router.delete('/:itemId', asyncHandler(authorizeAction), asyncHandler(removeFromCart));  
router.delete('/', asyncHandler(authorizeAction), asyncHandler(clearCart));  

export default router;
