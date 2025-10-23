import * as Sequelize from 'sequelize';
import { DataTypes, Model, type Optional } from 'sequelize';

export interface productsAttributes {
  id: number;
  code: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
}

export type productsPk = "id";
export type productsId = products[productsPk];
export type productsOptionalAttributes = "id" | "description";
export type productsCreationAttributes = Optional<productsAttributes, productsOptionalAttributes>;

export class products extends Model<productsAttributes, productsCreationAttributes> implements productsAttributes {
  id!: number;
  code!: string;
  name!: string;
  description?: string;
  price!: number;
  stock!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof products {
    return products.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "products_code_key"
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'products',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "products_code_key",
        unique: true,
        fields: [
          { name: "code" },
        ]
      },
      {
        name: "products_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
