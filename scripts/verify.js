const { Client } = require("pg");
const client = new Client({
  connectionString:
    "postgresql://postgres:ROTATED@db.tzawxmqkoetvlyqovvbt.supabase.co:5432/postgres",
  ssl: { rejectUnauthorized: false },
});

(async () => {
  await client.connect();
  const res = await client.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema='public'"
  );
  console.log("Tables:", res.rows.map((r) => r.table_name));
  await client.end();
})();
