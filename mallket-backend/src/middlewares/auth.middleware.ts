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
  // Try both Authorization header and cookie
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication required"
    });
  }

  try {
    // Check token blacklist
    const blacklisted = await prisma.blacklistedToken.findFirst({
      where: { token },
    });

    if (blacklisted) {
      res.clearCookie('token');
      return res.status(401).json({
        success: false,
        message: "Session expired. Please log in again."
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    // Get complete user with permissions
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        role: {
          include: {
            permissions: {
              select: {
                id: true,
                action: true,
                description: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      res.clearCookie('token');
      return res.status(401).json({
        success: false,
        message: "User account not found"
      });
    }

    if (user.isBanned) {
      res.clearCookie('token');
      return res.status(403).json({
        success: false,
        message: "Account suspended. Please contact support."
      });
    }

    // Build complete user object for request
    req.user = {
      id: user.id,
      email: user.email,
      isBanned: user.isBanned,
      role: user.role ? {
        id: user.role.id,
        name: user.role.name,
        description: user.role.description,
        permissions: user.role.permissions.map(p => ({
          id: p.id,
          action: p.action,
          description: p.description
        }))
      } : null
    };

    next();
  } catch (err) {
    res.clearCookie('token');
    console.error("Authentication error:", err);

    let message = "Invalid session";
    if (err instanceof jwt.TokenExpiredError) {
      message = "Session expired. Please log in again.";
    } else if (err instanceof jwt.JsonWebTokenError) {
      message = "Invalid authentication token";
    }

    return res.status(401).json({
      success: false,
      message
    });
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




