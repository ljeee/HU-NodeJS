import type { Request, Response } from 'express';
import { createOrder, listOrders } from '../services/orders.service.js';

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const order = await createOrder(req.body);
    res.status(201).json(order);
  } catch (e: any) {
    const status = e?.status ?? 500;
    res.status(status).json({ message: e?.message || 'Error creating order' });
  }
};

export const listOrdersController = async (req: Request, res: Response) => {
  const { customer_id, product_id } = req.query;
  try {
    const filters: any = {};
    if (customer_id !== undefined) filters.customer_id = Number(customer_id);
    if (product_id !== undefined) filters.product_id = Number(product_id);
    const orders = await listOrders(filters);
    res.json(orders);
  } catch (e: any) {
    res.status(500).json({ message: e?.message || 'Error fetching orders' });
  }
};
