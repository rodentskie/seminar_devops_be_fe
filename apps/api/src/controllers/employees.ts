import type { Request, Response } from 'express';
import { ValidationError } from 'joi';
import { Pool } from 'pg';

import { IEmployees } from '@seminar/types';

import { employeeSchema } from '../models';
import {
  checkEmployeeEmail,
  checkEmployeeName,
  deleteEmployee,
  insertEmployee,
  selectAllEmployees,
  selectSingleEmployee,
  updateEmployee,
} from '../queries';

export const createEmployees =
  (pool: Pool) =>
  async (req: Request, res: Response): Promise<Response> => {
    const { error, value } = employeeSchema.validate(req.body) as {
      error: ValidationError;
      value: IEmployees;
    };

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // check user email
    const checkEmail = await checkEmployeeEmail(value.email, pool);
    if (checkEmail instanceof Error) {
      return res.status(400).json({ error: checkEmail.message });
    }
    if (checkEmail) {
      return res.status(400).json({ error: 'Employee email already exist.' });
    }

    // check user full name
    const checkName = await checkEmployeeName(
      value.firstName,
      value.lastName,
      pool
    );

    if (checkName instanceof Error) {
      return res.status(400).json({ error: checkName.message });
    }

    if (checkName) {
      return res.status(400).json({ error: 'Employee name already exist.' });
    }

    // insert
    const data = await insertEmployee(value, pool);
    if (data instanceof Error) {
      return res.status(400).json({ error: data.message });
    }

    return res.send({ message: 'Employee created successfully.' });
  };

export const getAllEmployees =
  (pool: Pool) =>
  async (req: Request, res: Response): Promise<Response> => {
    const data = await selectAllEmployees(pool);
    if (data instanceof Error) {
      return res.status(400).json({ error: data.message });
    }

    return res.json({ data });
  };

export const getSingleEmployee =
  (pool: Pool) =>
  async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    const data = await selectSingleEmployee(id, pool);
    if (data instanceof Error) {
      return res.status(400).json({ error: data.message });
    }

    return res.json({ data });
  };

export const updateSingleEmployee =
  (pool: Pool) =>
  async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    const { error, value } = employeeSchema.validate(req.body) as {
      error: ValidationError;
      value: IEmployees;
    };

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // check if employee exist
    const checkExist = await selectSingleEmployee(id, pool);
    if (checkExist instanceof Error) {
      return res.status(400).json({ error: checkExist.message });
    }

    if (!checkExist) {
      return res.status(400).json({ error: 'Employee does not exist.' });
    }

    // check user email
    const checkEmail = await checkEmployeeEmail(value.email, pool, id);
    if (checkEmail instanceof Error) {
      return res.status(400).json({ error: checkEmail.message });
    }
    if (checkEmail) {
      return res.status(400).json({ error: 'Employee email already exist.' });
    }

    // check user full name
    const checkName = await checkEmployeeName(
      value.firstName,
      value.lastName,
      pool,
      id
    );

    if (checkName instanceof Error) {
      return res.status(400).json({ error: checkName.message });
    }

    if (checkName) {
      return res.status(400).json({ error: 'Employee name already exist.' });
    }

    //  update
    const result = await updateEmployee(value, pool, id);
    if (result instanceof Error) {
      return res.status(400).json({ error: result.message });
    }

    return res.sendStatus(204);
  };

export const deleteSingleEmployee =
  (pool: Pool) =>
  async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    // check if employee exist
    const checkExist = await selectSingleEmployee(id, pool);
    if (checkExist instanceof Error) {
      return res.status(400).json({ error: checkExist.message });
    }

    if (!checkExist) {
      return res.status(400).json({ error: 'Employee does not exist.' });
    }

    //  delete
    const result = await deleteEmployee(pool, id);
    if (result instanceof Error) {
      return res.status(400).json({ error: result.message });
    }

    return res.sendStatus(204);
  };
