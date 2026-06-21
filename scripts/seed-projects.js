const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const projects = [
  {
    title: "Hydroelectric Penstocks — Gorona del Viento",
    client: "Gorona del Viento",
    sector: "Hydroelectric",
    country: "Spain",
    year: "2018",
    description: "Fabrication of two penstocks weighing 1,686 tonnes for a hydroelectric plant with a 625-metre head and an average gradient of 40%. The penstocks were manufactured from P265GH and S460N steel plates with thicknesses up to 40 mm. All longitudinal and circumferential welds were executed using submerged arc welding (SAW) and inspected 100% by ultrasonic testing (UT) and radiography (RT).",
    dimensions: "4.2 m × 60 m each",
    weight: "1,686 tons total",
    material: "P265GH / S460N",
    highlights: JSON.stringify(["1,686 tonnes total weight", "625 m head", "100% NDT (UT + RT)", "SAW welded seams"]),
    images: JSON.stringify([
      "https://www.rotelu.es/wp-content/uploads/2018/10/4_1_01_ESP-400x284.png",
      "https://www.rotelu.es/wp-content/uploads/2018/10/4_1_02_ESP-400x284.png",
    ]),
    published: true,
  },
  {
    title: "Offshore Nodes — Wikinger & East Anglia One",
    client: "Navantia / Iberdrola",
    sector: "Offshore Wind",
    country: "North Sea",
    year: "2017",
    description: "Fabrication of structural nodes and boat landings for offshore wind jackets. Weld rejection rate below 0.25%. The nodes were manufactured from EN 10225 S355G10+M steel with complex 3D geometries. All critical welds were subjected to magnetic particle (MT) and ultrasonic testing (UT).",
    dimensions: "12.5 × 8.2 × 6.0 m",
    weight: "85 tons per node",
    material: "EN 10225 S355G10+M",
    highlights: JSON.stringify(["Weld rejection < 0.25%", "Complex 3D geometry", "EN 10225 offshore steel", "IACS classification"]),
    images: JSON.stringify([
      "https://www.rotelu.es/wp-content/uploads/2018/10/4_2_01_ESP-400x284.png",
      "https://www.rotelu.es/wp-content/uploads/2018/10/4_2_02_ESP-400x284.png",
    ]),
    published: true,
  },
  {
    title: "Pressure Vessels & Storage Tanks",
    client: "Repsol / CLH / Various",
    sector: "Pressure Equipment",
    country: "Spain / Portugal",
    year: "2000–2024",
    description: "Over 4,000 tanks installed across Galicia and northern Portugal for liquid fuels. Fabrication of pressure vessels for industrial applications including oil & gas, chemical, and energy sectors. All equipment manufactured under PED 2014/68/EU directive with ASME VIII design codes.",
    dimensions: "3.8 m × 12 m",
    weight: "45 tons per vessel",
    material: "SA-516 Gr.70 / 316L",
    highlights: JSON.stringify(["4,000+ tanks installed", "PED 2014/68/EU certified", "ASME VIII design", "30+ years experience"]),
    images: JSON.stringify([
      "https://www.rotelu.es/wp-content/uploads/2018/10/4_4_01_ESP-400x284.png",
      "https://www.rotelu.es/wp-content/uploads/2018/10/4_4_02_ESP-400x284.png",
    ]),
    published: true,
  },
  {
    title: "Naval Blocks — Various Vessels",
    client: "Navantia / Various",
    sector: "Shipbuilding",
    country: "Spain",
    year: "2022",
    description: "Prefabrication of blocks for vessels and naval equipment under Classification Society (IACS) requirements. Including curved and flat block sections for commercial vessels, naval ships, and offshore units. All welding performed by certified welders under EN 287/ISO 9606.",
    dimensions: "20 × 6 × 4 m",
    weight: "72 tons per block",
    material: "Naval steel Grade A / AH / DH",
    highlights: JSON.stringify(["IACS classification", "EN 287/ISO 9606 welders", "Complex curved blocks", "DNV / BV approved"]),
    images: JSON.stringify([
      "https://www.rotelu.es/wp-content/uploads/2018/10/4_3_01_ESP-400x284.png",
      "https://www.rotelu.es/wp-content/uploads/2018/10/4_3_02_ESP-400x284.png",
    ]),
    published: true,
  },
];

(async () => {
  await client.connect();
  console.log("Connected to Supabase PostgreSQL");

  for (const p of projects) {
    const res = await client.query(
      `INSERT INTO projects (title, client, sector, country, year, description, dimensions, weight, material, highlights, images, published)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       ON CONFLICT DO NOTHING`,
      [p.title, p.client, p.sector, p.country, p.year, p.description, p.dimensions, p.weight, p.material, p.highlights, p.images, p.published]
    );
    console.log(`Inserted: ${p.title} — ${res.rowCount} row(s)`);
  }

  await client.end();
  console.log("Done.");
})();
