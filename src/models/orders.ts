import * as Sequelize from 'sequelize';
import { DataTypes, Model, type Optional } from 'sequelize';
import type { customers, customersId } from './customers.js';

export interface ordersAttributes {
  id: number;
  customer_id: number;
  total?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type ordersPk = "id";
export type ordersId = orders[ordersPk];
export type ordersOptionalAttributes = "id" | "total" | "created_at" | "updated_at";
export type ordersCreationAttributes = Optional<ordersAttributes, ordersOptionalAttributes>;

export class orders extends Model<ordersAttributes, ordersCreationAttributes> implements ordersAttributes {
  id!: number;
  customer_id!: number;
  total?: number;
  created_at?: Date;
  updated_at?: Date;

  // orders belongsTo customers via customer_id
  customer!: customers;
  getCustomer!: Sequelize.BelongsToGetAssociationMixin<customers>;
  setCustomer!: Sequelize.BelongsToSetAssociationMixin<customers, customersId>;
  createCustomer!: Sequelize.BelongsToCreateAssociationMixin<customers>;

  static initModel(sequelize: Sequelize.Sequelize): typeof orders {
    return orders.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'id'
      }
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'orders',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "orders_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
