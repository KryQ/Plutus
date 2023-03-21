import {Sequelize} from "sequelize";

const isProduction = process.env.NODE_ENV === 'production';

const db = new Sequelize(isProduction ? 'postgres://postgres:mysecretpassword@db:5432/plutus' : 'postgres://postgres:plutus@localhost:6661/plutus');

try {
  await db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


export default db;
