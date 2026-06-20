const { Client } = require("pg");

async function run() {
  const client = new Client({
    connectionString: "postgresql://postgres:ROTATED@db.tzawxmqkoetvlyqovvbt.supabase.co:5432/postgres",
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  console.log("Connected");

  await client.query(`
    CREATE TABLE IF NOT EXISTS team_members (
      id BIGSERIAL PRIMARY KEY, created_at TIMESTAMPTZ DEFAULT NOW(), name TEXT NOT NULL,
      role TEXT, description TEXT, initials TEXT, avatar TEXT, "order" INT DEFAULT 0, published BOOLEAN DEFAULT true
    )
  `);
  await client.query(`ALTER TABLE team_members ENABLE ROW LEVEL SECURITY`);
  await client.query(`DROP POLICY IF EXISTS "anon all team_members" ON team_members`);
  await client.query(`CREATE POLICY "anon all team_members" ON team_members FOR ALL TO anon USING (true) WITH CHECK (true)`);

  await client.query(`DELETE FROM team_members`);
  await client.query(`
    INSERT INTO team_members (name, role, description, initials, "order") VALUES
    ('José Ramón Pardo', 'General Manager', 'Over 30 years of leadership in steel fabrication and industrial project management.', 'JP', 1),
    ('Juan Carlos López', 'Technical Director', 'Expert in welding engineering and heavy fabrication. Oversees all technical approvals.', 'JL', 2),
    ('María Rodríguez', 'Quality Manager', 'Responsible for ISO 3834-2 and EN 1090 compliance. Leads the NDT team.', 'MR', 3),
    ('Ángel Fernández', 'Production Manager', 'Manages workshop operations and production planning.', 'AF', 4)
  `);

  console.log("Team seeded");
  await client.end();
  console.log("Done");
}
run().catch(e => { console.error(e.message); process.exit(1); });
