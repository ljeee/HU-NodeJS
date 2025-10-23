import * as Sequelize from 'sequelize';
import { DataTypes, Model, type Optional } from 'sequelize';

export interface usersAttributes {
  instance_id?: string;
  id: string;
  aud?: string;
  role?: string;
  email?: string;
  encrypted_password?: string;
  email_confirmed_at?: Date;
  invited_at?: Date;
  confirmation_token?: string;
  confirmation_sent_at?: Date;
  recovery_token?: string;
  recovery_sent_at?: Date;
  email_change_token_new?: string;
  email_change?: string;
  email_change_sent_at?: Date;
  last_sign_in_at?: Date;
  raw_app_meta_data?: object;
  raw_user_meta_data?: object;
  is_super_admin?: boolean;
  created_at?: Date;
  updated_at?: Date;
  phone?: string;
  phone_confirmed_at?: Date;
  phone_change?: string;
  phone_change_token?: string;
  phone_change_sent_at?: Date;
  confirmed_at?: Date;
  email_change_token_current?: string;
  email_change_confirm_status?: number;
  banned_until?: Date;
  reauthentication_token?: string;
  reauthentication_sent_at?: Date;
  is_sso_user: boolean;
  deleted_at?: Date;
  is_anonymous: boolean;
}

export type usersPk = "id";
export type usersId = users[usersPk];
export type usersOptionalAttributes =
  | "instance_id"
  | "aud"
  | "role"
  | "email"
  | "encrypted_password"
  | "email_confirmed_at"
  | "invited_at"
  | "confirmation_token"
  | "confirmation_sent_at"
  | "recovery_token"
  | "recovery_sent_at"
  | "email_change_token_new"
  | "email_change"
  | "email_change_sent_at"
  | "last_sign_in_at"
  | "raw_app_meta_data"
  | "raw_user_meta_data"
  | "is_super_admin"
  | "created_at"
  | "updated_at"
  | "phone"
  | "phone_confirmed_at"
  | "phone_change"
  | "phone_change_token"
  | "phone_change_sent_at"
  | "confirmed_at"
  | "email_change_token_current"
  | "email_change_confirm_status"
  | "banned_until"
  | "reauthentication_token"
  | "reauthentication_sent_at"
  | "deleted_at";
export type usersCreationAttributes = Optional<usersAttributes, usersOptionalAttributes>;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  instance_id?: string;
  id!: string;
  aud?: string;
  role?: string;
  email?: string;
  encrypted_password?: string;
  email_confirmed_at?: Date;
  invited_at?: Date;
  confirmation_token?: string;
  confirmation_sent_at?: Date;
  recovery_token?: string;
  recovery_sent_at?: Date;
  email_change_token_new?: string;
  email_change?: string;
  email_change_sent_at?: Date;
  last_sign_in_at?: Date;
  raw_app_meta_data?: object;
  raw_user_meta_data?: object;
  is_super_admin?: boolean;
  created_at?: Date;
  updated_at?: Date;
  phone?: string;
  phone_confirmed_at?: Date;
  phone_change?: string;
  phone_change_token?: string;
  phone_change_sent_at?: Date;
  confirmed_at?: Date;
  email_change_token_current?: string;
  email_change_confirm_status?: number;
  banned_until?: Date;
  reauthentication_token?: string;
  reauthentication_sent_at?: Date;
  is_sso_user!: boolean;
  deleted_at?: Date;
  is_anonymous!: boolean;

  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    return users.init({
      instance_id: {
        type: DataTypes.UUID,
        allowNull: true
      },
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      aud: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      role: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      encrypted_password: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      email_confirmed_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      invited_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      confirmation_token: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      confirmation_sent_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      recovery_token: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      recovery_sent_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      email_change_token_new: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      email_change: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      email_change_sent_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      last_sign_in_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      raw_app_meta_data: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      raw_user_meta_data: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      is_super_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      phone: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "NULL"
      },
      phone_confirmed_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      phone_change: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: ""
      },
      phone_change_token: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: ""
      },
      phone_change_sent_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      confirmed_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      email_change_token_current: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: ""
      },
      email_change_confirm_status: {
        type: DataTypes.SMALLINT,
        allowNull: true,
        defaultValue: 0
      },
      banned_until: {
        type: DataTypes.DATE,
        allowNull: true
      },
      reauthentication_token: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: ""
      },
      reauthentication_sent_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      is_sso_user: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails."
      },
      is_anonymous: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, {
      sequelize,
      tableName: 'users',
      schema: 'auth',
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: "confirmation_token_idx",
          unique: true,
          fields: [
            { name: "confirmation_token" },
          ]
        },
        {
          name: "email_change_token_current_idx",
          unique: true,
          fields: [
            { name: "email_change_token_current" },
          ]
        },
        {
          name: "email_change_token_new_idx",
          unique: true,
          fields: [
            { name: "email_change_token_new" },
          ]
        },
        {
          name: "reauthentication_token_idx",
          unique: true,
          fields: [
            { name: "reauthentication_token" },
          ]
        },
        {
          name: "recovery_token_idx",
          unique: true,
          fields: [
            { name: "recovery_token" },
          ]
        },
        {
          name: "users_email_partial_key",
          unique: true,
          fields: [
            { name: "email" },
          ]
        },
        {
          name: "users_instance_id_email_idx",
          fields: [
            { name: "instance_id" },
          ]
        },
        {
          name: "users_instance_id_idx",
          fields: [
            { name: "instance_id" },
          ]
        },
        {
          name: "users_is_anonymous_idx",
          fields: [
            { name: "is_anonymous" },
          ]
        },
        {
          name: "users_phone_key",
          unique: true,
          fields: [
            { name: "phone" },
          ]
        },
        {
          name: "users_pkey",
          unique: true,
          fields: [
            { name: "id" },
          ]
        },
      ]
    });
  }
}
