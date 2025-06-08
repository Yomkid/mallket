import { Router } from 'express';
import asyncHandler from '../utils/asyncHandler';
// import authController from '../controllers/auth.controller';
import { register, verifyEmail, login, banUser, logout, requestPasswordReset, resendVerificationEmail, resetPassword, unbanUser} from '../controllers/auth.controller';
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
  asyncHandler(verifyEmail)
);

router.post('/resend-verification', 
  authLimiter,
  asyncHandler(resendVerificationEmail)
);

router.post('/request-password-reset', 
  authLimiter,
  asyncHandler(requestPasswordReset)
);

router.post('/reset-password', 
  authLimiter,
  asyncHandler(resetPassword)
);

// 🔐 Protected Authentication Routes
router.post('/logout', 
  asyncHandler(protect),
  asyncHandler(logout)
);

// 🔐 Admin-only Routes
router.post('/ban-user/:id', 
  asyncHandler(protect),
  asyncHandler(requireRole),
  asyncHandler(authorizeAction),
  asyncHandler(banUser)
);

router.post('/unban-user/:id', 
  asyncHandler(protect),
  asyncHandler(requireRole),
  asyncHandler(authorizeAction),
  asyncHandler(unbanUser)
);

// 🔐 User Management Routes
router.get('/me', 
  asyncHandler(protect),
  asyncHandler(getCurrentUser)
);

router.put('/update-password', 
  asyncHandler(protect),
  asyncHandler(updatePassword)
);

router.put('/update-profile', 
  asyncHandler(protect),
  asyncHandler(updateProfile)
);

// 🔐 Role Management Routes (Admin only)
router.post('/roles', 
  asyncHandler(protect),
  asyncHandler(requireRole),
  asyncHandler(authorizeAction),
  asyncHandler(createRole)
);

router.get('/roles', 
  asyncHandler(protect),
  asyncHandler(requireRole),
  asyncHandler(authorizeAction),
  asyncHandler(listRoles)
);

export default router;