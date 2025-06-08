import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';
import { logAudit } from '../utils/auditLog'; // Adjust path as needed

// Extend Express Request interface to include user with role
declare global {
  namespace Express {
    interface Request {
      user?: UserWithPermissions;
    }
  }
}

interface DecodedToken {
  userId: string;
}

interface UserWithPermissions {
  id: string;
  email?: string;
  isBanned?: boolean;
  role?: {
    permissions: Array<{
      id: string;
      action: string;
      description?: string | null;
      createdAt?: Date;
    }>;
    id?: string;
    name?: string;
    description?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  } | null;
}



// Cache for route permissions to reduce database queries
const routePermissionCache = new Map<string, string>();

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: "No authentication token provided" });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Check token blacklist first
    const blacklisted = await prisma.blacklistedToken.findFirst({
      where: { token },
    });


    if (blacklisted) {
      return res.status(401).json({ message: "Token is no longer valid" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    // Get user with permissions
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true, // ✅ Add this line
        isBanned: true,
        role: {
          select: {
            permissions: {
              select: {
                action: true,
              },
            },
          },
        },
      },
    });


    if (!user) {
      return res.status(401).json({ message: "User account not found" });
    }

    if (user.isBanned) {
      return res.status(403).json({ message: "Account suspended" });
    }

    // Attach user to request
    req.user = user as UserWithPermissions;
    next();
  } catch (err) {
    console.error("Authentication error:", err);

    let message = "Invalid token";
    if (err instanceof jwt.TokenExpiredError) {
      message = "Token expired";
    } else if (err instanceof jwt.JsonWebTokenError) {
      message = "Malformed token";
    }

    return res.status(401).json({ message });
  }
};

export const getRoutePermission = async (routeKey: string, method: string): Promise<string | null> => {
  // Normalize route key
  const normalizedRoute = routeKey.replace(/\/+$/, ''); // Remove trailing slashes
  const cacheKey = `${method} ${normalizedRoute}`;

  // Check cache first
  if (routePermissionCache.has(cacheKey)) {
    return routePermissionCache.get(cacheKey)!;
  }

  // Query database if not in cache
  const routePermission = await prisma.routePermission.findUnique({
    where: { route: normalizedRoute },
    select: { permission: true },
  });

  // Cache the result
  if (routePermission) {
    routePermissionCache.set(cacheKey, routePermission.permission);
    return routePermission.permission;
  }

  return null;
};

export const authorizeAction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Access denied: No role assigned" });
    }

    // Build route key
    const routeKey = `${req.baseUrl}${req.route?.path ?? req.path}`;
    const requiredPermission = await getRoutePermission(routeKey, req.method);

    if (!requiredPermission) {
      console.warn(`No permission mapping for route: ${req.method} ${routeKey}. Make sure it's registered in the route_permission table.`);
      return res.status(404).json({ message: "Route not found or not configured" });
    }


    // Check permissions
    const hasPermission = req.user.role.permissions.some(
      (p: { action: string; }) => p.action === requiredPermission
    );

    if (!hasPermission) {
      return res.status(403).json({
        message: `Access denied: Requires '${requiredPermission}' permission`
      });
    }

    next();
  } catch (err) {
    console.error("Authorization error:", err);
    return res.status(500).json({ message: "Internal authorization error" });
  }
};


export const requireRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Ensure user exists and has a role
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Access denied: No role assigned" });
    }

    // Get the complete user with role details
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true, // ✅ Correct
        isBanned: true,
        role: {
          include: {
            permissions: true,
          },
        },
      },
    });




    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    // Attach full user object to request
    req.user = user;

    // Continue to next middleware/controller
    next();
  } catch (err) {
    console.error("Role verification error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const auditMiddleware = (action: string, entity: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    res.on('finish', async () => {
      if (res.statusCode >= 200 && res.statusCode < 400) {
        await logAudit({ req, action, entity, metadata: { method: req.method, url: req.originalUrl } });
      }
    });
    next();
  };
};




