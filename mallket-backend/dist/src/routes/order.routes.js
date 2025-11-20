"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const order_controller_1 = require("../controllers/order.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// 🔐 **Role-based protected routes (Permissions dynamically checked)**
router.post('/', (0, asyncHandler_1.default)(auth_middleware_1.protect), (0, asyncHandler_1.default)(auth_middleware_1.authorizeAction), (0, asyncHandler_1.default)(order_controller_1.createOrder)); // Auto-checks required permission dynamically
router.get('/', (0, asyncHandler_1.default)(auth_middleware_1.protect), (0, asyncHandler_1.default)(auth_middleware_1.authorizeAction), (0, asyncHandler_1.default)(order_controller_1.getOrders)); // Auto-checks required permission dynamically
exports.default = router;
