"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const notification_controller_1 = require("../controllers/notification.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Protect all routes
router.use((0, asyncHandler_1.default)(auth_middleware_1.protect));
// GET /api/notifications - View notifications
router.get('/', (0, asyncHandler_1.default)(auth_middleware_1.authorizeAction), // ⬅️ Checks permission from route_permission table
(0, auth_middleware_1.auditMiddleware)('view', 'Notification'), (0, asyncHandler_1.default)(notification_controller_1.getUserNotifications));
// PATCH /api/notifications/:id/read - Mark as read
router.patch('/:id/read', (0, asyncHandler_1.default)(auth_middleware_1.authorizeAction), (0, auth_middleware_1.auditMiddleware)('update', 'Notification'), notification_controller_1.markNotificationAsRead);
// DELETE /api/notifications/:id - Delete
router.delete('/:id', (0, asyncHandler_1.default)(auth_middleware_1.authorizeAction), (0, auth_middleware_1.auditMiddleware)('delete', 'Notification'), notification_controller_1.deleteNotification);
// POST /api/notifications/send - Post single notification
router.post('/send', (0, asyncHandler_1.default)(auth_middleware_1.authorizeAction), (0, auth_middleware_1.auditMiddleware)('delete', 'Notification'), (0, asyncHandler_1.default)(notification_controller_1.sendSingleNotification));
// POST /api/notifications/bulk - Post bulk notifications
router.post('/bulk', (0, asyncHandler_1.default)(auth_middleware_1.authorizeAction), (0, auth_middleware_1.auditMiddleware)('create', 'Notification'), (0, asyncHandler_1.default)(notification_controller_1.sendBulkNotification));
exports.default = router;
