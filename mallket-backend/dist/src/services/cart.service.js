"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../config/prisma"));
const getCart = async (userId) => {
    const cart = await prisma_1.default.cart.findUnique({
        where: { userId },
        include: {
            items: {
                include: {
                    product: true,
                    variant: true,
                    cart: true,
                },
            },
        },
    });
    return cart?.items ?? [];
};
const addToCart = async (userId, productId, quantity) => {
    if (quantity <= 0) {
        throw new Error('Quantity must be greater than 0');
    }
    let cart = await prisma_1.default.cart.findUnique({
        where: { userId },
    });
    if (!cart) {
        cart = await prisma_1.default.cart.create({
            data: { userId },
        });
    }
    const existingItem = await prisma_1.default.cartItem.findFirst({
        where: { cartId: cart.id, productId },
    });
    if (existingItem) {
        return await prisma_1.default.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: existingItem.quantity + quantity },
            include: {
                product: true,
                variant: true,
                cart: true,
            },
        });
    }
    return await prisma_1.default.cartItem.create({
        data: {
            cartId: cart.id,
            productId,
            quantity,
        },
        include: {
            product: true,
            variant: true,
            cart: true,
        },
    });
};
const updateCartItem = async (userId, itemId, quantity) => {
    if (quantity <= 0) {
        throw new Error('Quantity must be greater than 0');
    }
    const cart = await prisma_1.default.cart.findUnique({
        where: { userId },
    });
    if (!cart)
        throw new Error('Cart not found');
    const item = await prisma_1.default.cartItem.findFirst({
        where: { id: itemId, cartId: cart.id },
    });
    if (!item) {
        throw new Error('Cart item not found');
    }
    return await prisma_1.default.cartItem.update({
        where: { id: itemId },
        data: { quantity },
        include: {
            product: true,
            variant: true,
            cart: true,
        },
    });
};
const removeFromCart = async (userId, itemId) => {
    const cart = await prisma_1.default.cart.findUnique({
        where: { userId },
    });
    if (!cart)
        return;
    await prisma_1.default.cartItem.deleteMany({
        where: { id: itemId, cartId: cart.id },
    });
};
const clearCart = async (userId) => {
    const cart = await prisma_1.default.cart.findUnique({
        where: { userId },
    });
    if (!cart)
        return;
    await prisma_1.default.cartItem.deleteMany({
        where: { cartId: cart.id },
    });
};
exports.default = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
};
