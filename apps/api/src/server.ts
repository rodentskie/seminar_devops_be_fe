import express from 'express';
import { Server } from 'http';
import cors from 'cors';

import { employeesRoutes } from './routes';

export const start = async (): Promise<Server> => {
  const host = process.env.HOST ?? 'localhost';
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;

  const app = express();

  // accessible to any
  app.use(cors());

  // Body Parser middleware to handle raw JSON files
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.get('/', (req, res) => {
    res.send({ message: 'Hello seminar' });
  });

  app.use('/api/employees', employeesRoutes());

  const server = app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
  });

  return server;
};

export const stop = async (server: Server): Promise<void> => {
  await new Promise((resolve) => server.close(resolve));
};
