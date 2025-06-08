import { Router } from 'express';
import asyncHandler from '../utils/asyncHandler';
// import authController from '../controllers/auth.controller';
import { register, authController} from '../controllers/auth.controller';
import { 
  protect, 
  authorizeAction, 
  requireRole 
} from '../middlewares/auth.middleware';
import { rateLimit } from 'express-rate-limit';

const router = Router();

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});

// 🔐 Public Authentication Routes
router.post('/register', 
  authLimiter,
  asyncHandler(register)
);

router.post('/login', 
  authLimiter,
  asyncHandler(login)
);

router.get('/verify-email', 
  asyncHandler(authController.verifyEmail)
);

router.post('/resend-verification', 
  authLimiter,
  asyncHandler(authController.resendVerificationEmail)
);

router.post('/request-password-reset', 
  authLimiter,
  asyncHandler(authController.requestPasswordReset)
);

router.post('/reset-password', 
  authLimiter,
  asyncHandler(authController.resetPassword)
);

// 🔐 Protected Authentication Routes
router.post('/logout', 
  asyncHandler(protect),
  asyncHandler(authController.logout)
);

// 🔐 Admin-only Routes
router.post('/ban-user/:id', 
  asyncHandler(protect),
  asyncHandler(requireRole('ADMIN')),
  asyncHandler(authorizeAction),
  asyncHandler(authController.banUser)
);

router.post('/unban-user/:id', 
  asyncHandler(protect),
  asyncHandler(requireRole('ADMIN')),
  asyncHandler(authorizeAction),
  asyncHandler(authController.unbanUser)
);

// 🔐 User Management Routes
router.get('/me', 
  asyncHandler(protect),
  asyncHandler(authController.getCurrentUser)
);

router.put('/update-password', 
  asyncHandler(protect),
  asyncHandler(authController.updatePassword)
);

router.put('/update-profile', 
  asyncHandler(protect),
  asyncHandler(authController.updateProfile)
);

// 🔐 Role Management Routes (Admin only)
router.post('/roles', 
  asyncHandler(protect),
  asyncHandler(requireRole('ADMIN')),
  asyncHandler(authorizeAction),
  asyncHandler(authController.createRole)
);

router.get('/roles', 
  asyncHandler(protect),
  asyncHandler(requireRole('ADMIN')),
  asyncHandler(authorizeAction),
  asyncHandler(authController.listRoles)
);

export default router;