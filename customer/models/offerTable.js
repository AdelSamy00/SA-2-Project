import { DataTypes } from 'sequelize';
import { db } from '../config/connection.js';

export const Offer = db.define(
  'offer',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
    },
  },
  {
    timestamps: false,
  }
);
await Offer.sync({ alter: true });
