// src/utils/notification.ts

import prisma from '../config/prisma';
import { NotificationType } from '@prisma/client'; // Prisma-generated enum

type NotificationParams = {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
};

// Send single notification
export const sendNotification = async ({
  userId,
  type,
  title,
  message,
  link,
}: NotificationParams) => {
  try {
    await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        link,
      },
    });
  } catch (error) {
    console.error('❌ Failed to send notification:', error);
    // Optionally send to auditLog or error monitoring service
  }
};

// Send bulk notifications to multiple users
export const sendBulkNotifications = async (
  users: string[],
  type: NotificationType,
  title: string,
  message: string,
  link?: string
) => {
  try {
    const notifications = users.map(userId => ({
      userId,
      type,
      title,
      message,
      link,
      isRead: false, // Optional: remove if not in schema
    }));

    return await prisma.notification.createMany({
      data: notifications,
      skipDuplicates: true, // Optional, avoids inserting same (userId + message) again
    });
  } catch (error) {
    console.error('❌ Failed to send bulk notifications:', error);
    // Optionally log this error
  }
};
