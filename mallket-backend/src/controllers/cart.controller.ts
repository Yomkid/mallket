import { Request, Response } from 'express';
import cartService from '../services/cart.service';

export const getCart = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const cart = await cartService.getCart(userId);
  res.json(cart);
};

export const addToCart = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  const updatedCart = await cartService.addToCart(userId, productId, quantity);
  res.status(201).json(updatedCart);
};

export const updateCartItem = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { itemId } = req.params;
  const { quantity } = req.body;
  const updatedItem = await cartService.updateCartItem(userId, Number(itemId), quantity);
  res.json(updatedItem);
};

export const removeFromCart = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { itemId } = req.params;
  await cartService.removeFromCart(userId, Number(itemId));
  res.status(204).send();
};

export const clearCart = async (req: Request, res: Response) => {
  const userId = req.user.id;
  await cartService.clearCart(userId);
  res.status(204).send();
};
