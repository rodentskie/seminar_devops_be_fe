import { Pool } from 'pg';

import { IEmployees } from '@seminar/types';

export const checkEmployeeEmail = async (
  email: string,
  pool: Pool,
  id: string | null = null
): Promise<boolean | Error> => {
  try {
    const query = id
      ? 'SELECT EXISTS(SELECT 1 FROM employees WHERE email = $1 AND id <> $2)'
      : 'SELECT EXISTS(SELECT 1 FROM employees WHERE email = $1)';
    const values = id ? [email, id] : [email];

    const result = await pool.query(query, values);
    return result.rows[0].exists;
  } catch (error) {
    console.error('Error checking employee email:', error);
    // throw error;
    return error instanceof Error ? error : new Error('Unknown error occurred');
  }
};

export const checkEmployeeName = async (
  firstName: string,
  lastName: string,
  pool: Pool,
  id: string | null = null
): Promise<boolean | Error> => {
  try {
    const query = id
      ? `
      SELECT EXISTS(
        SELECT 1 
        FROM employees 
        WHERE LOWER(firstName) = LOWER($1) 
        AND LOWER(lastName) = LOWER($2) AND id <> $3
      )`
      : `
      SELECT EXISTS(
        SELECT 1 
        FROM employees 
        WHERE LOWER(firstName) = LOWER($1) 
        AND LOWER(lastName) = LOWER($2)
      )`;
    const values = id ? [firstName, lastName, id] : [firstName, lastName];

    const result = await pool.query(query, values);
    return result.rows[0].exists;
  } catch (error) {
    console.error('Error checking employee name:', error);
    return error instanceof Error ? error : new Error('Unknown error occurred');
  }
};

export const insertEmployee = async (
  employee: IEmployees,
  pool: Pool
): Promise<number | Error> => {
  try {
    const query = `
      INSERT INTO employees (firstName, lastName, email, age)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;

    const values = [
      employee.firstName,
      employee.lastName,
      employee.email,
      employee.age,
    ];

    const result = await pool.query(query, values);
    return result.rows[0].id;
  } catch (error) {
    console.error('Error inserting employee:', error);
    return error instanceof Error ? error : new Error('Unknown error occurred');
  }
};

export const selectAllEmployees = async (
  pool: Pool
): Promise<IEmployees[] | Error> => {
  try {
    const query = `
      SELECT * FROM employees;
    `;

    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error inserting employee:', error);
    return error instanceof Error ? error : new Error('Unknown error occurred');
  }
};

export const selectSingleEmployee = async (
  id: string,
  pool: Pool
): Promise<IEmployees[] | Error> => {
  try {
    const query = `
      SELECT * FROM employees WHERE id = $1;
    `;
    const values = [id];

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error inserting employee:', error);
    return error instanceof Error ? error : new Error('Unknown error occurred');
  }
};

export const updateEmployee = async (
  employee: IEmployees,
  pool: Pool,
  id: string
): Promise<number | Error> => {
  try {
    const setClause = Object.entries(employee)
      .map(([key, value], index) => `${key} = $${index + 2}`)
      .join(', ');

    const values = Object.values(employee);

    const query = `
      UPDATE employees
      SET ${setClause}
      WHERE id = $1
    `;

    const result = await pool.query(query, [id, ...values]);
    return result.rowCount;
  } catch (error) {
    console.error('Error inserting employee:', error);
    return error instanceof Error ? error : new Error('Unknown error occurred');
  }
};

export const deleteEmployee = async (
  pool: Pool,
  id: string
): Promise<number | Error> => {
  try {
    const query = `
      DELETE FROM employees WHERE id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rowCount;
  } catch (error) {
    console.error('Error inserting employee:', error);
    return error instanceof Error ? error : new Error('Unknown error occurred');
  }
};
