const { Client } = require("pg");

async function run() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  console.log("Connected");

  await client.query(`ALTER TABLE projects ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE`);
  console.log("Added slug column");

  // Generate slugs for existing projects without one
  const { rows } = await client.query("SELECT id, title FROM projects WHERE slug IS NULL");
  for (const row of rows) {
    const slug = row.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    await client.query("UPDATE projects SET slug=$1 WHERE id=$2", [slug, row.id]);
    console.log(`  [${row.id}] ${row.title} → ${slug}`);
  }

  await client.end();
  console.log("Done");
}

run().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
