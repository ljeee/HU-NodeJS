import * as Sequelize from 'sequelize';
import { DataTypes, Model, type Optional } from 'sequelize';
import type { orders, ordersId } from './orders.js';
import type { products, productsId } from './products.js';

export interface order_detailsAttributes {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
}

export type order_detailsPk = "id";
export type order_detailsId = order_details[order_detailsPk];
export type order_detailsOptionalAttributes = "id";
export type order_detailsCreationAttributes = Optional<order_detailsAttributes, order_detailsOptionalAttributes>;

export class order_details extends Model<order_detailsAttributes, order_detailsCreationAttributes> implements order_detailsAttributes {
  id!: number;
  order_id!: number;
  product_id!: number;
  quantity!: number;

  // order_details belongsTo orders via order_id
  order!: orders;
  getOrder!: Sequelize.BelongsToGetAssociationMixin<orders>;
  setOrder!: Sequelize.BelongsToSetAssociationMixin<orders, ordersId>;
  createOrder!: Sequelize.BelongsToCreateAssociationMixin<orders>;
  // order_details belongsTo products via product_id
  product!: products;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<products>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<products, productsId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<products>;

  static initModel(sequelize: Sequelize.Sequelize): typeof order_details {
    return order_details.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'order_details',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "order_details_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
