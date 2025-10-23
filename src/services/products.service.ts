import { sequelize } from '../config/dbconect.js';
import { initModels } from '../models/init-models.js';
import type { productsCreationAttributes, productsAttributes } from '../models/products.js';

const models = initModels(sequelize);
const { products } = models;

export const listProducts = async () => {
  return products.findAll();
};

export const getProductById = async (id: number) => {
  return products.findByPk(id);
};

export const createProduct = async (data: productsCreationAttributes) => {
  // Unique code validation
  if (data.code) {
    const exists = await products.findOne({ where: { code: data.code } });
    if (exists) {
      throw Object.assign(new Error('Product code already exists'), { status: 400 });
    }
  }
  return products.create(data as productsAttributes);
};

export const updateProduct = async (id: number, data: Partial<productsAttributes>) => {
  const item = await products.findByPk(id);
  if (!item) {
    throw Object.assign(new Error('Product not found'), { status: 404 });
  }
  if (data.code && data.code !== item.code) {
    const exists = await products.findOne({ where: { code: data.code } });
    if (exists) {
      throw Object.assign(new Error('Product code already exists'), { status: 400 });
    }
  }
  await item.update(data);
  return item;
};

export const deleteProduct = async (id: number) => {
  const item = await products.findByPk(id);
  if (!item) {
    throw Object.assign(new Error('Product not found'), { status: 404 });
  }
  await item.destroy();
};
