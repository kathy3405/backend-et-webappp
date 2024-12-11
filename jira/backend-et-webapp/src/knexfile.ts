import dotenv from 'dotenv';
import { Knex } from 'knex';

dotenv.config();
interface KnexConfig {
  development: Knex.Config;
}

// Cấu hình database
const knexConfig: KnexConfig = {
  development: {
    client: 'mssql',
    connection: {
      host: process.env.DB_HOST || 'defaultHost',
      user: process.env.DB_USER || 'defaultUser',
      password: process.env.DB_PASSWORD || 'defaultPassword',
      database: process.env.DB_NAME || 'defaultDatabase',
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './migrations',
    },
  },
};

export default knexConfig;
