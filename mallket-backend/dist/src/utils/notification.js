"use strict";
// src/utils/notification.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendBulkNotifications = exports.sendNotification = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
// Send single notification
const sendNotification = async ({ userId, type, title, message, link, }) => {
    try {
        await prisma_1.default.notification.create({
            data: {
                userId,
                type,
                title,
                message,
                link,
            },
        });
    }
    catch (error) {
        console.error('❌ Failed to send notification:', error);
        // Optionally send to auditLog or error monitoring service
    }
};
exports.sendNotification = sendNotification;
// Send bulk notifications to multiple users
const sendBulkNotifications = async (users, type, title, message, link) => {
    try {
        const notifications = users.map(userId => ({
            userId,
            type,
            title,
            message,
            link,
            isRead: false, // Optional: remove if not in schema
        }));
        return await prisma_1.default.notification.createMany({
            data: notifications,
            skipDuplicates: true, // Optional, avoids inserting same (userId + message) again
        });
    }
    catch (error) {
        console.error('❌ Failed to send bulk notifications:', error);
        // Optionally log this error
    }
};
exports.sendBulkNotifications = sendBulkNotifications;
