import type { Sequelize } from "sequelize";
import { customers as _customers } from "./customers.js";
import type { customersAttributes, customersCreationAttributes } from "./customers.js";
import { orders as _orders } from "./orders.js";
import type { ordersAttributes, ordersCreationAttributes } from "./orders.js";
import { products as _products } from "./products.js";
import type { productsAttributes, productsCreationAttributes } from "./products.js";
import { users as _users } from "./users.js";
import type { usersAttributes, usersCreationAttributes } from "./users.js";
import { order_details as _order_details } from "./order_details.js";

export {
  _customers as customers,
  _orders as orders,
  _products as products,
  _users as users
};

export type {
  customersAttributes,
  customersCreationAttributes,
  ordersAttributes,
  ordersCreationAttributes,
  productsAttributes,
  productsCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const customers = _customers.initModel(sequelize);
  const orders = _orders.initModel(sequelize);
  const products = _products.initModel(sequelize);
  const users = _users.initModel(sequelize);
  const order_details = _order_details.initModel(sequelize);

  orders.belongsTo(customers, { as: "customer", foreignKey: "customer_id"});
  customers.hasMany(orders, { as: "orders", foreignKey: "customer_id"});
  order_details.belongsTo(orders, { as: "order", foreignKey: "order_id" });
  orders.hasMany(order_details, { as: "order_details", foreignKey: "order_id" });
  order_details.belongsTo(products, { as: "product", foreignKey: "product_id" });
  products.hasMany(order_details, { as: "order_details", foreignKey: "product_id" });

  return {
    customers: customers,
    orders: orders,
    products: products,
    users: users,
    order_details: order_details,
  };
}
