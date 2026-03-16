// knexfile.ts
// ────────────────────────────────────────────────
import 'ts-node/register';

import type { Knex } from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

const config: Record<string, Knex.Config> = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Kesandu123@',
      database: process.env.DB_NAME || 'demo',
    },
    migrations: {
      directory: './src/config/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './src/seeds',
    },
    
    pool: {
      min: 2,
      max: 10,
    },
  },
};

export default config;