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

// 🔐 **Role-based asyncHandler(protect)ed routes (Permissions fetched dynamically)**
router.post('/', asyncHandler(protect), asyncHandler(authorizeAction), asyncHandler(createProduct));  // Auto-checks required permission dynamically
router.put('/:id', asyncHandler(protect), asyncHandler(authorizeAction), asyncHandler(updateProduct)); // Auto-checks required permission dynamically
router.delete('/:id', asyncHandler(protect), asyncHandler(authorizeAction), asyncHandler(deleteProduct)); // Auto-checks required permission dynamically

export default router;
