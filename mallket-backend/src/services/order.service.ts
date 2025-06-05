import { Request, Response } from 'express';
import prisma from '../config/prisma';

async function createOrder(req: any, res: Response) {
  const { cartItems } = req.body;
  const total = cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

  const order = await prisma.order.create({
    data: {
      userId: req.user.userId,
      total,
      items: {
        create: cartItems.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  });

  res.status(201).json(order);
}

async function getOrders(req: any, res: Response) {
  const orders = await prisma.order.findMany({
    where: { userId: req.user.userId },
    include: { items: { include: { product: true } } },
  });
  res.json(orders);
}

export default { createOrder, getOrders };
