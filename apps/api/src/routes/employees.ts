import { Router } from 'express';
import { Pool } from 'pg';

import {
  createEmployees,
} from '../controllers/employees';

export const employeesRoutes = (pool: Pool): Router => {
  const router = Router();


  router.post('/', createEmployees(pool));


  return router;
};
