import * as Sequelize from 'sequelize';
import { DataTypes, Model, type Optional } from 'sequelize';

export interface usersAttributes {
  email: string;
  name: string;
  role: string;
  password: string;
}

export type usersPk = "email";
export type usersId = users[usersPk];
export type usersOptionalAttributes = never;
export type usersCreationAttributes = Optional<usersAttributes, usersOptionalAttributes>;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  email!: string;
  name!: string;
  role!: string;
  password!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    return users.init({
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    role: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
  }
}
