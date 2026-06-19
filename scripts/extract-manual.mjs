import fs from "fs";
import path from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

async function main() {
  const pdfPath = path.resolve("public/manuals/manual-basico-soldadura-sweiss.pdf");
  const buffer = fs.readFileSync(pdfPath);
  const data = await pdfParse(buffer);

  const text = data.text.replace(/\s+/g, " ").trim();
  const chunkSize = 2000;
  const overlap = 200;
  const chunks = [];

  for (let i = 0; i < text.length; i += chunkSize - overlap) {
    const chunk = text.slice(i, i + chunkSize).trim();
    if (chunk.length > 50) {
      chunks.push(chunk);
    }
  }

  const output = {
    title: "Manual Básico de Soldadura - SWEISS",
    source: "/manuals/manual-basico-soldadura-sweiss.pdf",
    totalPages: data.numpages,
    chunks,
  };

  fs.writeFileSync(
    path.resolve("src/lib/manual-knowledge.json"),
    JSON.stringify(output, null, 2)
  );

  console.log(`Extracted ${chunks.length} chunks from ${data.numpages} pages`);
  console.log(`Total text length: ${text.length} chars`);
}

main().catch(console.error);
