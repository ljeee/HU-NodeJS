import type { Request, Response } from 'express';
import { createCustomer, deleteCustomer, getCustomerById, listCustomers, updateCustomer } from '../services/customers.service.js';

export const getCustomersController = async (_req: Request, res: Response) => {
  const data = await listCustomers();
  res.json(data);
};

export const getCustomerController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const item = await getCustomerById(id);
  if (!item) return res.status(404).json({ message: 'Customer not found' });
  res.json(item);
};

export const createCustomerController = async (req: Request, res: Response) => {
  try {
    const item = await createCustomer(req.body);
    res.status(201).json(item);
  } catch (e: any) {
    res.status(500).json({ message: e?.message || 'Error creating customer' });
  }
};

export const updateCustomerController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const item = await updateCustomer(id, req.body);
    res.json(item);
  } catch (e: any) {
    const status = e?.status ?? 500;
    res.status(status).json({ message: e?.message || 'Error updating customer' });
  }
};

export const deleteCustomerController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await deleteCustomer(id);
    res.status(204).send();
  } catch (e: any) {
    const status = e?.status ?? 500;
    res.status(status).json({ message: e?.message || 'Error deleting customer' });
  }
};
