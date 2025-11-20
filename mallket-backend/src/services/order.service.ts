import { Request, Response } from 'express';
import prisma from '../config/prisma';

async function createOrder(req: any, res: Response) {
  const { cartItems } = req.body;

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  // Calculate subtotal (sum of item price * quantity)
  const subtotal = cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

  // Define tax rate (e.g., 10%)
  const taxRate = 0.1;
  const tax = subtotal * taxRate;

  // Calculate total (subtotal + tax)
  const total = subtotal + tax;

  try {
    const order = await prisma.order.create({
      data: {
        userId: req.user.userId,
        subtotal,
        tax,
        total,
        items: {
          create: cartItems.map((item: any) => ({
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
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
}

async function getOrders(req: any, res: Response) {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.userId },
      include: { items: { include: { product: true } } },
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
}

export default { createOrder, getOrders };
