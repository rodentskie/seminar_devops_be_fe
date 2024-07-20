import { Router } from 'express';
import { createEmployees } from '../controllers/employees';

export const employeesRoutes = (): Router => {
  const router = Router();

  router.get('/', (_, res) => {
    res.send({ message: 'Hello API employees routes' });
  });

  router.post('/', createEmployees);

  return router;
};
