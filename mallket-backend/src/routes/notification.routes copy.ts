import { Router } from 'express';
import {
  getUserNotifications,
  markNotificationAsRead,
  deleteNotification
} from '../controllers/notification.controller';
import { isAuthenticated } from '../middlewares/auth.middleware';

const router = Router();

router.use(isAuthenticated); // 👈 secure all routes

router.get('/', getUserNotifications);
router.patch('/:id/read', markNotificationAsRead);
router.delete('/:id', deleteNotification); // optional

export default router;
