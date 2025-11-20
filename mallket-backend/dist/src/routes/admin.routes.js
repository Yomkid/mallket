"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// 🔐 **Role-based protected routes (Permissions dynamically checked)**
router.get('/users', (0, asyncHandler_1.default)(auth_middleware_1.protect), (0, asyncHandler_1.default)(auth_middleware_1.authorizeAction), (0, asyncHandler_1.default)(auth_middleware_1.requireRole));
exports.default = router;
