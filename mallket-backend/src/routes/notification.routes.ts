import { Router } from 'express';
import asyncHandler from '../utils/asyncHandler';
import {
    getUserNotifications,
    markNotificationAsRead,
    deleteNotification,
    sendSingleNotification,
    sendBulkNotification,
} from '../controllers/notification.controller';

import { protect, authorizeAction, auditMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Protect all routes
router.use(asyncHandler(protect));

// GET /api/notifications - View notifications
router.get(
    '/',
    asyncHandler(authorizeAction), // ⬅️ Checks permission from route_permission table
    auditMiddleware('view', 'Notification'),
    asyncHandler(getUserNotifications)
);

// PATCH /api/notifications/:id/read - Mark as read
router.patch(
    '/:id/read',
    asyncHandler(authorizeAction),
    auditMiddleware('update', 'Notification'),
    markNotificationAsRead
);

// DELETE /api/notifications/:id - Delete
router.delete(
    '/:id',
    asyncHandler(authorizeAction),
    auditMiddleware('delete', 'Notification'),
    deleteNotification
);

// POST /api/notifications/send - Post single notification
router.post(
    '/send',
    asyncHandler(authorizeAction),
    auditMiddleware('delete', 'Notification'),
    asyncHandler(sendSingleNotification)
);


// POST /api/notifications/bulk - Post bulk notifications
router.post(
    '/bulk',
    asyncHandler(authorizeAction),
    auditMiddleware('create', 'Notification'),
    asyncHandler(sendBulkNotification)
);
export default router;
