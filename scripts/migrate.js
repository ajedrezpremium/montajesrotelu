const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

const sql = fs.readFileSync(
  path.join(__dirname, "..", "supabase", "migrations", "00001_initial.sql"),
  "utf8"
);

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  console.log("Connecting to Supabase...");
  await client.connect();
  console.log("Running migration...");
  await client.query(sql);
  console.log("Migration completed successfully!");
  await client.end();
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
