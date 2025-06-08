import prisma from '../config/prisma';
import { Prisma } from '@prisma/client';

interface CartItemWithProduct extends Prisma.CartItemGetPayload<{
  include: {
    product: true;
    variant: true;
    cart: true;
  }
}> {}

const getCart = async (userId: string): Promise<CartItemWithProduct[]> => {
  const cart = await prisma.cart.findUnique({
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


const addToCart = async (
  userId: string,
  productId: string,
  quantity: number
): Promise<CartItemWithProduct> => {
  if (quantity <= 0) {
    throw new Error('Quantity must be greater than 0');
  }

  let cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
    });
  }

  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId },
  });

  if (existingItem) {
    return await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
      include: {
        product: true,
        variant: true,
        cart: true,
      },
    });
  }

  return await prisma.cartItem.create({
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

const updateCartItem = async (
  userId: string,
  itemId: string,
  quantity: number
): Promise<CartItemWithProduct> => {
  if (quantity <= 0) {
    throw new Error('Quantity must be greater than 0');
  }

  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) throw new Error('Cart not found');

  const item = await prisma.cartItem.findFirst({
    where: { id: itemId, cartId: cart.id },
  });

  if (!item) {
    throw new Error('Cart item not found');
  }

  return await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
    include: {
      product: true,
      variant: true,
      cart: true,
    },
  });
};

const removeFromCart = async (
  userId: string,
  itemId: string
): Promise<void> => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) return;

  await prisma.cartItem.deleteMany({
    where: { id: itemId, cartId: cart.id },
  });
};

const clearCart = async (userId: string): Promise<void> => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) return;

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });
};

export default {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
