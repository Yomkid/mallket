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
router.use(protect);

// 🛒 **Customer-only cart actions (Permissions dynamically checked)**
router.get('/', authorizeAction, asyncHandler(getCart));  
router.post('/', authorizeAction, asyncHandler(addToCart));  
router.put('/:itemId', authorizeAction, asyncHandler(updateCartItem));  
router.delete('/:itemId', authorizeAction, asyncHandler(removeFromCart));  
router.delete('/', authorizeAction, asyncHandler(clearCart));  

export default router;
