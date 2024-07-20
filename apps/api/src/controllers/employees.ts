import type { Request, Response } from 'express';
import { ValidationError } from 'joi';
import { Pool } from 'pg';

import { IEmployees } from '@seminar/types';

import { employeeSchema } from '../models';
import {
  checkEmployeeEmail,
  checkEmployeeName,
  insertEmployee,
  selectAllEmployees,
  selectSingleEmployee,
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
    console.log(data);
    return res.json({ data });
  };
