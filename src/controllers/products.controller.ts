import type { Request, Response } from 'express';
import { createProduct, deleteProduct, getProductById, listProducts, updateProduct } from '../services/products.service.js';

export const getProductsController = async (_req: Request, res: Response) => {
  const data = await listProducts();
  res.json(data);
};

export const getProductController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const item = await getProductById(id);
  if (!item) return res.status(404).json({ message: 'Product not found' });
  res.json(item);
};

export const createProductController = async (req: Request, res: Response) => {
  try {
    const item = await createProduct(req.body);
    res.status(201).json(item);
  } catch (e: any) {
    const status = e?.status ?? 500;
    res.status(status).json({ message: e?.message || 'Error creating product' });
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const item = await updateProduct(id, req.body);
    res.json(item);
  } catch (e: any) {
    const status = e?.status ?? 500;
    res.status(status).json({ message: e?.message || 'Error updating product' });
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await deleteProduct(id);
    res.status(204).send();
  } catch (e: any) {
    const status = e?.status ?? 500;
    res.status(status).json({ message: e?.message || 'Error deleting product' });
  }
};
