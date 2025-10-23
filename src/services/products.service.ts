import { sequelize } from '../config/dbconect.js';
import { initModels } from '../models/init-models.js';
import type { productsCreationAttributes, productsAttributes } from '../models/products.js';

// Lazily acquire models to allow Jest to mock init-models per test and avoid module-time DB wiring
const getModels = () => initModels(sequelize);

export const listProducts = async () => getModels().products.findAll();

export const getProductById = async (id: number) => getModels().products.findByPk(id);

export const createProduct = async (data: productsCreationAttributes) => {
  // Unique code validation
  if (data.code) {
    const exists = await getModels().products.findOne({ where: { code: data.code } });
    if (exists) {
      throw Object.assign(new Error('Product code already exists'), { status: 400 });
    }
  }
  return getModels().products.create(data as productsAttributes);
};

export const updateProduct = async (id: number, data: Partial<productsAttributes>) => {
  const item = await getModels().products.findByPk(id);
  if (!item) {
    throw Object.assign(new Error('Product not found'), { status: 404 });
  }
  if (data.code && data.code !== item.code) {
    const exists = await getModels().products.findOne({ where: { code: data.code } });
    if (exists) {
      throw Object.assign(new Error('Product code already exists'), { status: 400 });
    }
  }
  await item.update(data);
  return item;
};

export const deleteProduct = async (id: number) => {
  const item = await getModels().products.findByPk(id);
  if (!item) {
    throw Object.assign(new Error('Product not found'), { status: 404 });
  }
  await item.destroy();
};
