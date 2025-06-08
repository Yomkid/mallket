// src/utils/auditLog.ts

import prisma from '../config/prisma'; // adjust path if needed
import { Request } from 'express';

type AuditLogParams = {
  req?: Request; // optional Express request for extracting user and IP
  action: string;
  entity: string;
  entityId?: string;
  userId?: string;      // manually provide if req is not passed
  ipAddress?: string;   // manually provide if req is not passed
  metadata?: any;
};

export const logAudit = async ({
  req,
  action,
  entity,
  entityId,
  userId,
  ipAddress,
  metadata,
}: AuditLogParams) => {
  try {
    const logUserId = userId || req?.user?.id;
    const logIp = ipAddress || req?.ip;

    await prisma.auditLog.create({
      data: {
        action,
        entity,
        entityId,
        userId: logUserId,
        ipAddress: logIp,
        metadata,
      },
    });
  } catch (error) {
    console.error("❌ Failed to log audit:", error);
    // Optional: send to Sentry or other error tracking tool
  }
};
