import { Request, Response } from 'express';
import cartService from '../services/cart.service';

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // Add null check
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const cart = await cartService.getCart(userId);
    return res.json(cart);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const addToCart = async (req: Request, res: Response) => {
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

    const updatedCart = await cartService.addToCart(userId, productId, quantity);
    return res.status(201).json(updatedCart);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
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

    const updatedItem = await cartService.updateCartItem(userId, itemId, quantity);
    return res.json(updatedItem);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { itemId } = req.params;
    if (!itemId) {
      return res.status(400).json({ message: 'Item ID required' });
    }

    await cartService.removeFromCart(userId, itemId);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await cartService.clearCart(userId);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};