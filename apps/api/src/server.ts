import express from 'express';
import { Server } from 'http';
import cors from 'cors';
import { Pool } from 'pg';
import { config } from 'dotenv';

import { dbConnect } from '@seminar/pg';

// import { employeesRoutes } from './routes';

config();

export const start = async (): Promise<{ server: Server; pool: Pool }> => {
  const host = process.env.HOST ?? 'localhost';
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;

  const app = express();
  const pool = dbConnect();

  // accessible to any
  app.use(cors());

  // Body Parser middleware to handle raw JSON files
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.get('/', (_, res) => {
    res.send({ message: 'Hello seminar' });
  });

  // app.use('/api/employees', employeesRoutes(pool));

  const server = app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
  });

  return { server, pool };
};

export const stop = async (server: Server): Promise<void> => {
  await new Promise((resolve) => server.close(resolve));
};
