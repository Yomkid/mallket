"use strict";
// src/utils/auditLog.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logAudit = void 0;
const prisma_1 = __importDefault(require("../config/prisma")); // adjust path if needed
const logAudit = async ({ req, action, entity, entityId, userId, ipAddress, metadata, }) => {
    try {
        const logUserId = userId || req?.user?.id;
        const logIp = ipAddress || req?.ip;
        await prisma_1.default.auditLog.create({
            data: {
                action,
                entity,
                entityId,
                userId: logUserId,
                ipAddress: logIp,
                metadata,
            },
        });
    }
    catch (error) {
        console.error("❌ Failed to log audit:", error);
        // Optional: send to Sentry or other error tracking tool
    }
};
exports.logAudit = logAudit;
