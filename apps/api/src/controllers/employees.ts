import type { Request, Response } from 'express';
import { IEmployees } from '@seminar/types';

export const createEmployees = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { firstName, lastName, age } = req.body as IEmployees;

  if (!firstName || firstName.trim() === '') {
    return res.status(400).send({
      message: 'Please enter first name.',
    });
  }

  return res.send({ message: 'Hello seminar wee' });
};
