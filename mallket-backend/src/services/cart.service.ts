import prisma from '../config/prisma';

const getCart = async (userId: number) => {
  return await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });
};

const addToCart = async (userId: number, productId: number, quantity: number) => {
  const existingItem = await prisma.cartItem.findFirst({
    where: { userId, productId },
  });

  if (existingItem) {
    return await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    });
  }

  return await prisma.cartItem.create({
    data: {
      userId,
      productId,
      quantity,
    },
  });
};

const updateCartItem = async (userId: number, itemId: number, quantity: number) => {
  const item = await prisma.cartItem.findFirst({
    where: { id: itemId, userId },
  });

  if (!item) throw new Error('Cart item not found');

  return await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
  });
};

const removeFromCart = async (userId: number, itemId: number) => {
  await prisma.cartItem.deleteMany({
    where: { id: itemId, userId },
  });
};

const clearCart = async (userId: number) => {
  await prisma.cartItem.deleteMany({ where: { userId } });
};

export default {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
