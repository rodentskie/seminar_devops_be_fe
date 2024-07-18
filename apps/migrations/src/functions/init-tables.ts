import { dbConnect } from '@seminar/pg';
import { Pool } from 'pg';
import { config } from 'dotenv';

config();

export const initializeTable = async () => {
  const pool = dbConnect();

  await createEmployeesTable(pool);
};

async function createEmployeesTable(pool: Pool): Promise<void> {
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS employees (
        id BIGSERIAL PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        age SMALLINT NOT NULL CHECK (age > 0 AND age <= 32767)
      );
    `;

  try {
    await pool.query(createTableQuery);
    console.log('Employees table created successfully');
    await pool.end()
  } catch (error) {
    console.error('Error creating employees table:', error);
    throw error;
  }
}
