"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.removeFromCart = exports.updateCartItem = exports.addToCart = exports.getCart = void 0;
const cart_service_1 = __importDefault(require("../services/cart.service"));
const getCart = async (req, res) => {
    try {
        const userId = req.user?.id; // Add null check
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const cart = await cart_service_1.default.getCart(userId);
        return res.json(cart);
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.getCart = getCart;
const addToCart = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { productId, quantity } = req.body;
        // Validate input
        if (!productId || typeof quantity !== 'number' || quantity <= 0) {
            return res.status(400).json({ message: 'Invalid product ID or quantity' });
        }
        const updatedCart = await cart_service_1.default.addToCart(userId, productId, quantity);
        return res.status(201).json(updatedCart);
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.addToCart = addToCart;
const updateCartItem = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { itemId } = req.params;
        const { quantity } = req.body;
        // Validate input
        if (!itemId || typeof quantity !== 'number' || quantity <= 0) {
            return res.status(400).json({ message: 'Invalid item ID or quantity' });
        }
        const updatedItem = await cart_service_1.default.updateCartItem(userId, itemId, quantity);
        return res.json(updatedItem);
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.updateCartItem = updateCartItem;
const removeFromCart = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { itemId } = req.params;
        if (!itemId) {
            return res.status(400).json({ message: 'Item ID required' });
        }
        await cart_service_1.default.removeFromCart(userId, itemId);
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.removeFromCart = removeFromCart;
const clearCart = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        await cart_service_1.default.clearCart(userId);
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.clearCart = clearCart;
