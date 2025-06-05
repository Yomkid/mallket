import { Request, Response } from 'express';
import productService from '../services/product.service';

export const getAllProducts = async (_req: Request, res: Response) => {
  const products = await productService.getAllProducts();
  res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await productService.getProductById(Number(id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const newProduct = await productService.createProduct(req.body);
  res.status(201).json(newProduct);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedProduct = await productService.updateProduct(Number(id), req.body);
  res.json(updatedProduct);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  await productService.deleteProduct(Number(id));
  res.status(204).send();
};
