import { sequelize } from '../config/dbconect.js';
import { initModels } from '../models/init-models.js';
import type { ordersCreationAttributes } from '../models/orders.js';

// Lazily acquire models to facilitate mocking in tests
const getModels = () => initModels(sequelize);

export const createOrder = async (data: { customer_id: number; items: Array<{ product_id: number; quantity: number }> }) => {
  // Validate stock for each item
  for (const item of data.items) {
    const product = await getModels().products.findByPk(item.product_id);
    if (!product) {
      throw Object.assign(new Error(`Product ${item.product_id} not found`), { status: 404 });
    }
    if (product.stock < item.quantity) {
      throw Object.assign(new Error(`Insufficient stock for product ${product.code}`), { status: 400 });
    }
  }
  // Create order and details in a transaction
  return await sequelize.transaction(async (t) => {
    const order = await getModels().orders.create({ customer_id: data.customer_id } as ordersCreationAttributes, { transaction: t });
    let total = 0;
    for (const item of data.items) {
  const product = await getModels().products.findByPk(item.product_id, { transaction: t });
  if (!product) throw Object.assign(new Error(`Product ${item.product_id} not found`), { status: 404 });
  await getModels().order_details.create({ order_id: (order as any).id, product_id: item.product_id, quantity: item.quantity }, { transaction: t });
  await (product as any).update({ stock: (product as any).stock - item.quantity }, { transaction: t });
  total += Number(product.price) * item.quantity;
    }
    await (order as any).update({ total }, { transaction: t });
    return order;
  });
};

export const listOrders = async (filters: { customer_id?: number; product_id?: number }) => {
  const where: any = {};
  if (filters.customer_id) where.customer_id = filters.customer_id;
  // If filtering by product, need to join order_details
  if (filters.product_id) {
    return getModels().orders.findAll({
      include: [{
        model: getModels().order_details,
        as: 'order_details',
        where: { product_id: filters.product_id },
      }],
      where,
    });
  }
  return getModels().orders.findAll({
    include: [{ model: getModels().order_details, as: 'order_details' }],
    where,
  });
};
