import fs from "fs";
import path from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

const manuals = [
  {
    id: "sweiss",
    filename: "manual-basico-soldadura-sweiss.pdf",
    title: "Manual Básico de Soldadura — SWEISS",
    lang: "ES",
    size: "9.4 MB",
    pages: 0,
    year: "2025",
    cover: "https://img.freepik.com/free-vector/welding-cartoon-banner-with-workers_33099-493.jpg",
    descKey: "library.desc.sweiss",
  },
  {
    id: "dcm",
    filename: "guia-soldadura-basica-dcm.pdf",
    title: "Guía de Introducción a la Soldadura — DCM",
    lang: "ES",
    size: "8.8 MB",
    pages: 0,
    year: "2024",
    cover: "https://img.freepik.com/free-vector/industrial-welding-concept-illustration_114360-14298.jpg",
    descKey: "library.desc.dcm",
  },
];

async function main() {
  const allChunks = {};

  for (const manual of manuals) {
    const pdfPath = path.resolve("public/manuals", manual.filename);
    if (!fs.existsSync(pdfPath)) {
      console.log(`Skipping ${manual.filename} — not found`);
      continue;
    }
    const buffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(buffer);
    manual.pages = data.numpages;

    const text = data.text.replace(/\s+/g, " ").trim();
    const chunkSize = 2000;
    const overlap = 200;
    const chunks = [];

    for (let i = 0; i < text.length; i += chunkSize - overlap) {
      const chunk = text.slice(i, i + chunkSize).trim();
      if (chunk.length > 50) chunks.push(chunk);
    }

    allChunks[manual.id] = {
      title: manual.title,
      source: `/manuals/${manual.filename}`,
      totalPages: manual.pages,
      chunks,
    };

    console.log(`${manual.id}: ${chunks.length} chunks from ${manual.pages} pages (${text.length} chars)`);
  }

  // Serialize per-manual knowledge files
  for (const [id, data] of Object.entries(allChunks)) {
    fs.writeFileSync(
      path.resolve(`src/lib/knowledge-${id}.json`),
      JSON.stringify(data, null, 2)
    );
  }

  // Write combined metadata for Library
  const libraryMeta = manuals.map((m) => ({
    id: m.id,
    title: m.title,
    lang: m.lang,
    size: m.size,
    pages: m.pages,
    year: m.year,
    cover: m.cover,
    descKey: m.descKey,
    url: `/manuals/${m.filename}`,
  }));

  fs.writeFileSync(
    path.resolve("src/lib/library-data.json"),
    JSON.stringify(libraryMeta, null, 2)
  );

  console.log("\nDone. Library metadata written.");
}

main().catch(console.error);
