"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationTemplates = void 0;
// src/constants/notifications.ts
exports.NotificationTemplates = {
    USER_BANNED: {
        type: 'SECURITY',
        title: 'Account Banned',
        message: 'Your account has been banned due to security reasons.',
    },
    USER_UNBANNED: {
        type: 'SECURITY',
        title: 'Account Unbanned',
        message: 'Your account ban has been lifted. You may now access your account.',
    },
    // Add more as needed
};
