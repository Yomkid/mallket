"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendBulkNotification = exports.sendSingleNotification = exports.deleteNotification = exports.markNotificationAsRead = exports.getUserNotifications = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const notification_1 = require("../utils/notification");
const auditLog_1 = require("../utils/auditLog");
const client_1 = require("@prisma/client");
// Get user notifications
const getUserNotifications = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ message: 'Unauthorized' });
        const notifications = await prisma_1.default.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
        res.json(notifications);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch notifications' });
    }
};
exports.getUserNotifications = getUserNotifications;
// Mark as read
const markNotificationAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await prisma_1.default.notification.update({
            where: { id },
            data: { isRead: true },
        });
        res.json({ message: 'Marked as read', notification: updated });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to mark as read' });
    }
};
exports.markNotificationAsRead = markNotificationAsRead;
// (Optional) Delete notification
const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.notification.delete({ where: { id } });
        res.json({ message: 'Notification deleted' });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to delete notification' });
    }
};
exports.deleteNotification = deleteNotification;
const sendSingleNotification = async (req, res) => {
    const { userId, type, title, message, link } = req.body;
    if (!userId || !type || !title || !message) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    if (!Object.values(client_1.NotificationType).includes(type)) {
        return res.status(400).json({ message: 'Invalid notification type' });
    }
    try {
        await (0, notification_1.sendNotification)({
            userId,
            type: type,
            title,
            message,
            link,
        });
        // Get user email (optional)
        const user = await prisma_1.default.user.findUnique({
            where: { id: userId },
            select: { email: true },
        });
        await (0, auditLog_1.logAudit)({
            req,
            action: 'SEND_NOTIFICATION',
            entity: 'Notification',
            entityId: userId,
            metadata: {
                userEmail: user?.email || 'unknown',
                reason: 'Notification sent',
                type,
                title,
                timestamp: new Date().toISOString(),
                sentBy: req.user?.email || 'system',
            },
        });
        return res.status(200).json({ message: 'Notification sent successfully' });
    }
    catch (error) {
        console.error('Send single notification error:', error);
        return res.status(500).json({ message: 'Failed to send notification' });
    }
};
exports.sendSingleNotification = sendSingleNotification;
const sendBulkNotification = async (req, res) => {
    const { users, type, title, message, link } = req.body;
    if (!Array.isArray(users) || users.length === 0 || !type || !title || !message) {
        return res.status(400).json({ message: 'Missing or invalid input data' });
    }
    if (!Object.values(client_1.NotificationType).includes(type)) {
        return res.status(400).json({ message: 'Invalid notification type' });
    }
    try {
        await (0, notification_1.sendBulkNotifications)(users, type, title, message, link ? link : undefined);
        await (0, auditLog_1.logAudit)({
            req,
            action: 'SEND_BULK_NOTIFICATION',
            entity: 'Notification',
            entityId: users.join(','), // Log IDs
            metadata: {
                userIds: users,
                reason: 'Bulk notification sent',
                type,
                title,
                timestamp: new Date().toISOString(),
                sentBy: req.user?.email || 'system',
            },
        });
        return res.status(200).json({ message: 'Bulk notifications sent' });
    }
    catch (error) {
        console.error('Send bulk notifications error:', error);
        return res.status(500).json({ message: 'Failed to send bulk notifications' });
    }
};
exports.sendBulkNotification = sendBulkNotification;
