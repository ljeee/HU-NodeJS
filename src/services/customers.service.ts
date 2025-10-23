import { sequelize } from '../config/dbconect.js';
import { initModels } from '../models/init-models.js';
import type { customersAttributes, customersCreationAttributes } from '../models/customers.js';

// Lazily acquire models so tests can mock init-models on demand
const getModels = () => initModels(sequelize);
export const listCustomers = async () => getModels().customers.findAll();
export const getCustomerById = async (id: number) => getModels().customers.findByPk(id);
export const createCustomer = async (data: customersCreationAttributes) => getModels().customers.create(data as customersAttributes);
export const updateCustomer = async (id: number, data: Partial<customersAttributes>) => {
  const c = await getModels().customers.findByPk(id);
  if (!c) {
    throw Object.assign(new Error('Customer not found'), { status: 404 });
  }
  await c.update(data);
  return c;
};
export const deleteCustomer = async (id: number) => {
  const c = await getModels().customers.findByPk(id);
  if (!c) {
    throw Object.assign(new Error('Customer not found'), { status: 404 });
  }
  await c.destroy();
};
