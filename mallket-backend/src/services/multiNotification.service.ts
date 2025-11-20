// src/services/multiNotification.service.ts

import { sendNotification } from '../utils/notification';
import { sendMail } from '../utils/sendEmail';
import { generateNotificationEmail } from '../utils/emailTemplate';
import { logAudit } from '../utils/auditLog';
import { NotificationType } from '@prisma/client';
import prisma from '../config/prisma';


interface NotificationPayload {
    userId: string;
    email: string;
    type: NotificationType;
    title: string;
    message: string;
    link?: string;
    req: any; // Request object for logging
    reason?: string;
    channels?: ('email' | 'in-app' | 'audit')[];
}


interface NotifyAdminsPayload {
    type: NotificationType;
    title: string;
    message: string;
    link?: string;
    req: any; // Express request object (for audit logging)
    reason?: string;
    roles?: string[]; // e.g., ['ADMIN', 'MODERATOR']
    channels?: ('email' | 'in-app' | 'audit')[];
}


export const notifyUser = async ({
    userId,
    email,
    type,
    title,
    message,
    link,
    req,
    reason,
    channels = ['email', 'in-app', 'audit'], // default all channels
}: NotificationPayload) => {
    try {
        // 1. In-App Notification
        if (channels.includes('in-app')) {
            await sendNotification({ userId, type, title, message, link });
        }

        // 2. Email Notification
        if (channels.includes('email')) {
            const html = generateNotificationEmail(title, message, link);
            await sendMail({ to: email, subject: title, html });
        }

        // 3. Audit Log
        if (channels.includes('audit')) {
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
        }

        return true;
    } catch (error) {
        console.error('Error sending notification:', error);
        return false;
    }
};

export const notifyUsersBulk = async (
    users: { userId: string; email: string }[],
    type: NotificationType,
    title: string,
    message: string,
    link: string | undefined,
    req: any,
    channels?: ('email' | 'in-app' | 'audit')[]
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
            channels,
        });
    }
};



export const notifyAdmins = async ({
    type,
    title,
    message,
    link,
    req,
    reason,
    roles = ['ADMIN'],
    channels = ['email', 'in-app', 'audit'],
}: NotifyAdminsPayload): Promise<boolean> => {
    try {
        // 1. Fetch all active users with the specified roles
        const admins = await prisma.user.findMany({
            where: {
                isBanned: false,
                role: {
                    name: { in: roles }, // roles must be string[] of role names
                },
            },
            select: {
                id: true,
                email: true,
            },
        });

        // Log a warning if no admins were found (optional)
        if (!admins.length) {
            console.warn(`⚠️ No users found with roles: ${roles.join(', ')}`);
        }

        // 2. Prevent duplicate notifications by email (if needed)
        const uniqueAdmins = Array.from(new Map(admins.map(u => [u.email, u])).values());

        // 3. Notify each admin
        for (const admin of uniqueAdmins) {
            await notifyUser({
                userId: admin.id,
                email: admin.email!,
                type,
                title,
                message,
                link,
                req,
                reason,
                channels,
            });
        }

        // 4. Optional audit log for notifying multiple admins
        await logAudit({
            req,
            action: 'NOTIFY_ADMINS',
            entity: 'User',
            entityId: 'multiple',
            metadata: {
                title,
                type,
                roles,
                count: uniqueAdmins.length,
                sentBy: req.user?.email || 'system',
                timestamp: new Date().toISOString(),
            },
        });

        return true;
    } catch (error) {
        console.error('❌ Error notifying admins:', error);
        return false;
    }
};


