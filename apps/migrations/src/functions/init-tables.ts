import { dbConnect } from '@seminar/pg';
import { Pool } from 'pg';
import { config } from 'dotenv';

config();

export const initializeTable = async () => {
  const pool = dbConnect();

  await createEmployeesTable(pool);
  await pool.end();
};

async function createEmployeesTable(pool: Pool): Promise<void> {
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS employees (
          id BIGSERIAL PRIMARY KEY,
          firstName VARCHAR(255) NOT NULL,
          lastName VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          age SMALLINT NOT NULL CHECK (age > 0 AND age < 150)
      );
    `;

  try {
    await pool.query(createTableQuery);
    console.log('Employees table created successfully');
  } catch (error) {
    console.error('Error creating employees table:', error);
    throw error;
  }
}
