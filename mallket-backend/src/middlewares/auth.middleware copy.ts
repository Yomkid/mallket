import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };

    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
//   if (!req.user || req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Admins only' });
//   }
//   next();
// };

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  console.log("Admin Check:", req.user?.isAdmin);
  if (!req.user || req.user.isAdmin !== true) {
    return res.status(403).json({ message: 'Admins only' });
  }
  next();
};
