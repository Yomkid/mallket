import { Router } from 'express';
import asyncHandler from '../utils/asyncHandler';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller';
import { protect, authorizeAction } from '../middlewares/auth.middleware';

const router = Router();

// 🔓 **Public routes** (Accessible to all)
router.get('/', asyncHandler(getAllProducts));  
router.get('/:id', asyncHandler(getProductById));

// 🔐 **Role-based protected routes (Permissions fetched dynamically)**
router.post('/', protect, authorizeAction, asyncHandler(createProduct));  // Auto-checks required permission dynamically
router.put('/:id', protect, authorizeAction, asyncHandler(updateProduct)); // Auto-checks required permission dynamically
router.delete('/:id', protect, authorizeAction, asyncHandler(deleteProduct)); // Auto-checks required permission dynamically

export default router;
