import express from 'express';
import { Server } from 'http';

export const start = async (): Promise<Server> => {
  const host = process.env.HOST ?? 'localhost';
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;

  const app = express();

  app.get('/', (req, res) => {
    res.send({ message: 'Hello API' });
  });

  const server = app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
  });

  return server;
};

export const stop = async (server: Server): Promise<void> => {
  await new Promise((resolve) => server.close(resolve));
};
