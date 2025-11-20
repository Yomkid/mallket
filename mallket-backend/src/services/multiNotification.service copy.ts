// src/services/notificationService.ts

import { sendNotification } from '../utils/notification';
import { sendMail } from '../utils/sendEmail';
import { generateNotificationEmail } from '../utils/emailTemplate';
import { logAudit } from '../utils/auditLog';
import { NotificationType } from '@prisma/client';

interface NotificationPayload {
    userId: string;
    email: string;
    type: NotificationType;
    title: string;
    message: string;
    link?: string;
    req: any; // Request object for logging
    reason?: string; // ✅ Add this
}

export const notifyUser = async ({ userId, email, type, title, message, link, req, reason }: NotificationPayload) => {
    try {
        // 1. In-App Notification
        await sendNotification({ userId, type, title, message, link });

        // 2. Email Notification
        const html = generateNotificationEmail(title, message, link);
        await sendMail({ to: email, subject: title, html });

        // 3. Audit Log
        await logAudit({
            req,
            action: 'SEND_NOTIFICATION',
            entity: 'Notification',
            entityId: userId,
            metadata: {
                userEmail: email,
                title,
                type,
                link,
                reason,
                timestamp: new Date().toISOString(),
                sentBy: req.user?.email || 'system',
            },
        });

        return true;
    } catch (error) {
        console.error('Error sending full notification:', error);
        return false;
    }
};

export const notifyUsersBulk = async (
    users: { userId: string; email: string }[],
    type: NotificationType,
    title: string,
    message: string,
    link: string | undefined,
    req: any
) => {
    for (const user of users) {
        await notifyUser({
            userId: user.userId,
            email: user.email,
            type,
            title,
            message,
            link,
            req,
        });
    }
};
