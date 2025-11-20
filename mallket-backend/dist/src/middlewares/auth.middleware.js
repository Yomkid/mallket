"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditMiddleware = exports.requireRole = exports.authorizeAction = exports.getRoutePermission = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../config/prisma"));
const auditLog_1 = require("../utils/auditLog"); // Adjust path as needed
// Cache for route permissions to reduce database queries
const routePermissionCache = new Map();
const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No authentication token provided" });
    }
    const token = authHeader.split(' ')[1];
    try {
        // Check token blacklist first
        const blacklisted = await prisma_1.default.blacklistedToken.findFirst({
            where: { token },
        });
        if (blacklisted) {
            return res.status(401).json({ message: "Token is no longer valid" });
        }
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Get user with permissions
        const user = await prisma_1.default.user.findUnique({
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
        req.user = user;
        next();
    }
    catch (err) {
        console.error("Authentication error:", err);
        let message = "Invalid token";
        if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
            message = "Token expired";
        }
        else if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            message = "Malformed token";
        }
        return res.status(401).json({ message });
    }
};
exports.protect = protect;
const getRoutePermission = async (routeKey, method) => {
    // Normalize route key
    const normalizedRoute = routeKey.replace(/\/+$/, ''); // Remove trailing slashes
    const cacheKey = `${method} ${normalizedRoute}`;
    // Check cache first
    if (routePermissionCache.has(cacheKey)) {
        return routePermissionCache.get(cacheKey);
    }
    // Query database if not in cache
    const routePermission = await prisma_1.default.routePermission.findUnique({
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
exports.getRoutePermission = getRoutePermission;
const authorizeAction = async (req, res, next) => {
    try {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: "Access denied: No role assigned" });
        }
        // Build route key
        const routeKey = `${req.baseUrl}${req.route?.path ?? req.path}`;
        const requiredPermission = await (0, exports.getRoutePermission)(routeKey, req.method);
        if (!requiredPermission) {
            console.warn(`No permission mapping for route: ${req.method} ${routeKey}. Make sure it's registered in the route_permission table.`);
            return res.status(404).json({ message: "Route not found or not configured" });
        }
        // Check permissions
        const hasPermission = req.user.role.permissions.some((p) => p.action === requiredPermission);
        if (!hasPermission) {
            return res.status(403).json({
                message: `Access denied: Requires '${requiredPermission}' permission`
            });
        }
        next();
    }
    catch (err) {
        console.error("Authorization error:", err);
        return res.status(500).json({ message: "Internal authorization error" });
    }
};
exports.authorizeAction = authorizeAction;
const requireRole = async (req, res, next) => {
    try {
        // Ensure user exists and has a role
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: "Access denied: No role assigned" });
        }
        // Get the complete user with role details
        const user = await prisma_1.default.user.findUnique({
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
    }
    catch (err) {
        console.error("Role verification error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.requireRole = requireRole;
const auditMiddleware = (action, entity) => {
    return async (req, res, next) => {
        res.on('finish', async () => {
            if (res.statusCode >= 200 && res.statusCode < 400) {
                await (0, auditLog_1.logAudit)({ req, action, entity, metadata: { method: req.method, url: req.originalUrl } });
            }
        });
        next();
    };
};
exports.auditMiddleware = auditMiddleware;
