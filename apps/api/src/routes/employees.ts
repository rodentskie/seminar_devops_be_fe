import { Router } from 'express';
import { Pool } from 'pg';

import {
  createEmployees,
  getAllEmployees,
  getSingleEmployee,
  updateSingleEmployee,
  deleteSingleEmployee,
} from '../controllers/employees';

export const employeesRoutes = (pool: Pool): Router => {
  const router = Router();

  router.get('/', getAllEmployees(pool));
  router.get('/:id', getSingleEmployee(pool));

  router.post('/', createEmployees(pool));

  router.patch('/:id', updateSingleEmployee(pool));
  router.delete('/:id', deleteSingleEmployee(pool));

  return router;
};
