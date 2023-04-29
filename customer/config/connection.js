import { Sequelize } from 'sequelize';
import dotevn from 'dotenv';

dotevn.config();
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;
console.log(DB_NAME, DB_USER, DB_PASSWORD, DB_HOST);

export const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false,
});

try {
  await db.authenticate();
  console.log('DataBase Connection Successfully.');
} catch (error) {
  console.error("we cann't connect to DataBase;", error);
}
