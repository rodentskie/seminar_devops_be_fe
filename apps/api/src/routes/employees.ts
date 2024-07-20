import { Router } from 'express';
import { Pool } from 'pg';

import { createEmployees } from '../controllers/employees';

export const employeesRoutes = (pool: Pool): Router => {
  const router = Router();

  router.get('/', (_, res) => {
    res.send({ message: 'Hello API employees routes' });
  });

  router.post('/', createEmployees(pool));

  return router;
};
