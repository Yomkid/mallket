"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// 🔓 **Public routes** (Accessible to all)
router.get('/', (0, asyncHandler_1.default)(product_controller_1.getAllProducts));
router.get('/:id', (0, asyncHandler_1.default)(product_controller_1.getProductById));
// 🔐 **Role-based asyncHandler(protect)ed routes (Permissions fetched dynamically)**
router.post('/', (0, asyncHandler_1.default)(auth_middleware_1.protect), (0, asyncHandler_1.default)(auth_middleware_1.authorizeAction), (0, asyncHandler_1.default)(product_controller_1.createProduct)); // Auto-checks required permission dynamically
router.put('/:id', (0, asyncHandler_1.default)(auth_middleware_1.protect), (0, asyncHandler_1.default)(auth_middleware_1.authorizeAction), (0, asyncHandler_1.default)(product_controller_1.updateProduct)); // Auto-checks required permission dynamically
router.delete('/:id', (0, asyncHandler_1.default)(auth_middleware_1.protect), (0, asyncHandler_1.default)(auth_middleware_1.authorizeAction), (0, asyncHandler_1.default)(product_controller_1.deleteProduct)); // Auto-checks required permission dynamically
exports.default = router;
