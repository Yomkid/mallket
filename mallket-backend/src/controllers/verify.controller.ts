import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.query;

  if (!token || typeof token !== 'string') {
    return res.status(400).json({ message: 'Invalid verification token' });
  }

  const user = await prisma.user.findFirst({
    where: {
      verifyToken: token,
      verifyExpires: {
        gt: new Date(), // Token not expired
      },
    },
  });

  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      verifyToken: null,
      verifyExpires: null,
    },
  });

  return res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
};
