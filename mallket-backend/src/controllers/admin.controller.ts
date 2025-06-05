import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getAllUsers = async (_: Request, res: Response) => {
  const users = await prisma.user.findMany({ select: { id: true, email: true, isAdmin: true } });
  res.json(users);
};
