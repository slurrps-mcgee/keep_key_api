import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { UserModel }from '../models/user.model'; // Adjust the import path as necessary

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'database',
  username: process.env.DB_USER || 'username',
  password: process.env.DB_PASS || 'password',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 1433,
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  },
  logging: false,
  models: [UserModel], // Register models for syncing
});

// Test the database connection
sequelize.authenticate()
  .then(() => console.log('Database connection established.'))
  .catch((err) => console.error('Unable to connect to the database:', err));

// Sync all models with the database (create tables if they don't exist)
sequelize.sync({alter: true}) // Use `alter: true` to update the database schema without losing data
  .then(() => console.log('All models were synchronized successfully.'))
  .catch((err) => console.error('Sequelize sync error:', err));

export default sequelize;