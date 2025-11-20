import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { PrismaClient, NotificationType } from "@prisma/client";

import { notifyUser } from '../services/multiNotification.service'; // Make sure NotificationType is exported

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.query;

  if (!token || typeof token !== 'string') {
    return res.status(400).json({ message: 'Invalid verification token' });
  }

  // Find user with matching token that is not expired
  const user = await prisma.user.findFirst({
    where: {
      verifyToken: token,
      verifyExpires: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }

  // Update user to mark email as verified
  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      verifyToken: null,
      verifyExpires: null,
    },
  });



  // Send notification to user
  await notifyUser({
    req,
    userId: user.id,
    email: user.email!,
    type: NotificationType.SYSTEM,
    title: 'Welcome to MallKet!',
    message: 'Your account has been successfully verified. Start shopping now!',
    link: '/login',
    reason: 'New user registration',
    channels: ['in-app', 'audit'], // no email here
  });

  return res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
};
