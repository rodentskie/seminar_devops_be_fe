import { Pool, type PoolConfig } from 'pg';

export const dbConnect = (): Pool => {
  const config: PoolConfig = {
    user: process.env.PG_USER || 'user',
    host: process.env.PG_HOST || 'host',
    database: process.env.PG_DATABASE || 'db',
    password: process.env.PG_PASSWORD || 'password',
    port: Number(process.env.PG_PORT) || 5432,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    max: 20,
  };

  return new Pool(config);
};
