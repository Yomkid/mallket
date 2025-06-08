import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { sendNotification, sendBulkNotifications } from '../utils/notification';
import { logAudit } from '../utils/auditLog';
import { NotificationType } from '@prisma/client';

// Get user notifications
export const getUserNotifications = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });

        const notifications = await prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });

        res.json(notifications);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch notifications' });
    }
};

// Mark as read
export const markNotificationAsRead = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const updated = await prisma.notification.update({
            where: { id },
            data: { isRead: true },
        });

        res.json({ message: 'Marked as read', notification: updated });
    } catch (err) {
        res.status(500).json({ message: 'Failed to mark as read' });
    }
};

// (Optional) Delete notification
export const deleteNotification = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await prisma.notification.delete({ where: { id } });

        res.json({ message: 'Notification deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete notification' });
    }
};


export const sendSingleNotification = async (req: Request, res: Response) => {
    const { userId, type, title, message, link } = req.body;

    if (!userId || !type || !title || !message) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!Object.values(NotificationType).includes(type)) {
        return res.status(400).json({ message: 'Invalid notification type' });
    }

    try {
        await sendNotification({
            userId,
            type: type as NotificationType,
            title,
            message,
            link,
        });

        // Get user email (optional)
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { email: true },
        });

        await logAudit({
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

    } catch (error) {
        console.error('Send single notification error:', error);
        return res.status(500).json({ message: 'Failed to send notification' });
    }
};


export const sendBulkNotification = async (req: Request, res: Response) => {
    const { users, type, title, message, link } = req.body;

    if (!Array.isArray(users) || users.length === 0 || !type || !title || !message) {
        return res.status(400).json({ message: 'Missing or invalid input data' });
    }

    if (!Object.values(NotificationType).includes(type)) {
        return res.status(400).json({ message: 'Invalid notification type' });
    }

    try {
        await sendBulkNotifications(
            users,
            type as NotificationType,
            title,
            message,
            link ? link : undefined
        );

        await logAudit({
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

    } catch (error) {
        console.error('Send bulk notifications error:', error);
        return res.status(500).json({ message: 'Failed to send bulk notifications' });
    }
};
