"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const cart_controller_1 = require("../controllers/cart.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// 🔐 All cart routes require authentication
router.use((0, asyncHandler_1.default)(auth_middleware_1.protect));
// 🛒 **Customer-only cart actions (Permissions dynamically checked)**
router.get('/', (0, asyncHandler_1.default)(auth_middleware_1.authorizeAction), (0, asyncHandler_1.default)(cart_controller_1.getCart));
router.post('/', (0, asyncHandler_1.default)(auth_middleware_1.authorizeAction), (0, asyncHandler_1.default)(cart_controller_1.addToCart));
router.put('/:itemId', (0, asyncHandler_1.default)(auth_middleware_1.authorizeAction), (0, asyncHandler_1.default)(cart_controller_1.updateCartItem));
router.delete('/:itemId', (0, asyncHandler_1.default)(auth_middleware_1.authorizeAction), (0, asyncHandler_1.default)(cart_controller_1.removeFromCart));
router.delete('/', (0, asyncHandler_1.default)(auth_middleware_1.authorizeAction), (0, asyncHandler_1.default)(cart_controller_1.clearCart));
exports.default = router;
