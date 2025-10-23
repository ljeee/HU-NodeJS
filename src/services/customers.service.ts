import { sequelize } from '../config/dbconect.js';
import { initModels } from '../models/init-models.js';
import type { customersAttributes, customersCreationAttributes } from '../models/customers.js';

const models = initModels(sequelize);
const { customers } = models;

export const listCustomers = async () => customers.findAll();
export const getCustomerById = async (id: number) => customers.findByPk(id);
export const createCustomer = async (data: customersCreationAttributes) => customers.create(data as customersAttributes);
export const updateCustomer = async (id: number, data: Partial<customersAttributes>) => {
  const c = await customers.findByPk(id);
  if (!c) {
    throw Object.assign(new Error('Customer not found'), { status: 404 });
  }
  await c.update(data);
  return c;
};
export const deleteCustomer = async (id: number) => {
  const c = await customers.findByPk(id);
  if (!c) {
    throw Object.assign(new Error('Customer not found'), { status: 404 });
  }
  await c.destroy();
};
