import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    "postgresql://postgres:ROTATED@db.tzawxmqkoetvlyqovvbt.supabase.co:5432/postgres",
  ssl: { rejectUnauthorized: false },
  max: 3,
});

export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
}
