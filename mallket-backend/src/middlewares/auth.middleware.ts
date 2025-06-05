import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { role: { include: { permissions: true } } },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


export const getRoutePermission = async (routeKey: string): Promise<string | null> => {
  const normalizedRoute = routeKey.endsWith('/') ? routeKey.slice(0, -1) : routeKey; // Remove trailing slash
  console.log("Checking permission for route:", normalizedRoute);

  const routePermission = await prisma.routePermission.findUnique({
    where: { route: normalizedRoute },
  });

  console.log("Fetched permission:", routePermission?.permission);
  return routePermission?.permission || null;
};



export const authorizeAction = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !req.user.role) {
    return res.status(403).json({ message: "Access Denied: No role assigned" });
  }

  // 🔍 Detect required permission dynamically
  const routeKey = `${req.method} ${req.baseUrl}${req.path}`;
  const requiredPermission = await getRoutePermission(routeKey); // Fetch from database

  if (!requiredPermission) {
    return res.status(403).json({ message: "Access Denied: No permission mapping found!" });
  }

  const hasPermission = req.user.role.permissions.some((p: { action: string; }) => p.action === requiredPermission);

  if (!hasPermission) {
    return res.status(403).json({ message: `Access Denied: You need permission for '${requiredPermission}'` });
  }

  next();
};







