"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../config/prisma"));
async function createOrder(req, res) {
    const { cartItems } = req.body;
    if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
    }
    // Calculate subtotal (sum of item price * quantity)
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    // Define tax rate (e.g., 10%)
    const taxRate = 0.1;
    const tax = subtotal * taxRate;
    // Calculate total (subtotal + tax)
    const total = subtotal + tax;
    try {
        const order = await prisma_1.default.order.create({
            data: {
                userId: req.user.userId,
                subtotal,
                tax,
                total,
                items: {
                    create: cartItems.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        res.status(201).json(order);
    }
    catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Failed to create order' });
    }
}
async function getOrders(req, res) {
    try {
        const orders = await prisma_1.default.order.findMany({
            where: { userId: req.user.userId },
            include: { items: { include: { product: true } } },
        });
        res.json(orders);
    }
    catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
}
exports.default = { createOrder, getOrders };
