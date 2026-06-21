const { Client } = require("pg");

async function run() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  console.log("Connected");

  // Drop old policies
  await client.query('DROP POLICY IF EXISTS "Allow authenticated all projects" ON projects');
  await client.query('DROP POLICY IF EXISTS "Allow authenticated read contacts" ON contacts');
  console.log("Dropped old policies");

  // Allow anon all on projects
  await client.query(`
    CREATE POLICY "Allow anon all projects"
    ON projects FOR ALL TO anon USING (true) WITH CHECK (true)
  `);
  console.log("Created anon projects policy");

  // Allow anon select contacts
  await client.query(`
    CREATE POLICY "Allow anon read contacts"
    ON contacts FOR SELECT TO anon USING (true)
  `);
  console.log("Created anon contacts select policy");

  // Allow anon update contacts
  await client.query(`
    CREATE POLICY "Allow anon update contacts"
    ON contacts FOR UPDATE TO anon USING (true) WITH CHECK (true)
  `);
  console.log("Created anon contacts update policy");

  await client.end();
  console.log("Done");
}

run().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
