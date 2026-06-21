const { Client } = require("pg");

async function run() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  console.log("Connected");

  await client.query(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id BIGSERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      name TEXT NOT NULL,
      role TEXT,
      company TEXT,
      text TEXT NOT NULL,
      years TEXT,
      avatar TEXT,
      published BOOLEAN DEFAULT true
    )
  `);
  console.log("Created testimonials table");

  await client.query(`
    ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY
  `);
  console.log("Enabled RLS");

  await client.query(`
    DROP POLICY IF EXISTS "anon select testimonials" ON testimonials
  `);
  await client.query(`
    CREATE POLICY "anon select testimonials"
    ON testimonials FOR SELECT TO anon USING (true)
  `);
  console.log("Created anon select policy");

  await client.query(`
    DROP POLICY IF EXISTS "anon all testimonials" ON testimonials
  `);
  await client.query(`
    CREATE POLICY "anon all testimonials"
    ON testimonials FOR ALL TO anon USING (true) WITH CHECK (true)
  `);
  console.log("Created anon all policy");

  // Seed initial testimonials
  await client.query(`DELETE FROM testimonials`);
  await client.query(`
    INSERT INTO testimonials (name, role, company, text, years) VALUES
    ('José María González', 'Iberdrola Engineering', 'Iberdrola',
     'Rotelu delivered exceptional quality on the Gorona del Viento penstocks. Their welding and dimensional control exceeded our expectations.',
     '10+ years'),
    ('Dr. Klaus Weber', 'Iberdrola Renovables (Wikinger Project)', 'Iberdrola',
     'The offshore node fabrication for Wikinger achieved the lowest rejection rate we have seen across all suppliers. A truly reliable partner.',
     '5+ years'),
    ('Manuel Silva', 'Repsol Petróleo', 'Repsol',
     'We have worked with Rotelu for over 15 years on pressure vessel supply. Their consistency and on-time delivery are unmatched.',
     '15+ years')
  `);
  console.log("Seeded testimonials");

  await client.end();
  console.log("Done");
}

run().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
