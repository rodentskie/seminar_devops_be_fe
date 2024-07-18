import { Pool } from 'pg';
import { dbConnect } from './pg';

describe('dbConnect', () => {
  it('should work', () => {
    const pool = dbConnect();
    expect(pool).toBeInstanceOf(Pool);
  });
});
