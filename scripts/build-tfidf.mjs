import fs from "fs";
import path from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const STOP_WORDS = new Set([
  "de", "la", "que", "el", "en", "y", "a", "los", "se", "del", "las", "un", "por", "con",
  "no", "una", "su", "para", "es", "al", "lo", "como", "más", "pero", "sus", "le", "ya",
  "este", "entre", "porque", "todo", "esta", "sin", "the", "and", "for", "are", "but",
  "not", "you", "all", "can", "had", "her", "was", "one", "our", "out", "has", "have",
  "been", "les", "des", "sur", "dans", "une", "pas", "plus", "sont", "avec", "und",
  "die", "der", "das", "ist", "nicht", "ein", "eine", "sich", "auch", "auf", "für",
  "bei", "mit", "von", "werden", "wird", "zum", "als", "es", "sie", "nach",
]);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-záéíóúüñ0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

function buildIndex(chunks) {
  const docCount = chunks.length;
  const termDocs = new Map();
  const docVectors = [];

  for (let di = 0; di < docCount; di++) {
    const tokens = tokenize(chunks[di]);
    const tf = new Map();
    for (const t of tokens) {
      tf.set(t, (tf.get(t) || 0) + 1);
    }
    // Normalize TF
    const maxFreq = Math.max(...tf.values(), 1);
    const vector = new Map();
    for (const [term, count] of tf) {
      vector.set(term, count / maxFreq);
      termDocs.set(term, (termDocs.get(term) || 0) + 1);
    }
    docVectors.push(vector);
  }

  // IDF
  const idf = new Map();
  for (const [term, docs] of termDocs) {
    idf.set(term, Math.log((docCount - docs + 0.5) / (docs + 0.5) + 1));
  }

  // Compute TF-IDF vectors and normalize
  const vectors = docVectors.map((tfv) => {
    const v = new Map();
    let normSq = 0;
    for (const [term, tf] of tfv) {
      const val = tf * (idf.get(term) || 0);
      v.set(term, val);
      normSq += val * val;
    }
    const norm = Math.sqrt(normSq) || 1;
    for (const [term, val] of v) {
      v.set(term, val / norm);
    }
    return v;
  });

  return { vectors, idf: [...idf.entries()] };
}

// Load all knowledge files
const knowledgeDir = "src/lib";
const files = fs.readdirSync(knowledgeDir).filter((f) => f.startsWith("knowledge-") && f.endsWith(".json"));

const allChunks = [];

for (const file of files) {
  const data = JSON.parse(fs.readFileSync(path.join(knowledgeDir, file), "utf-8"));
  for (const chunk of data.chunks) {
    allChunks.push({
      text: chunk,
      source: `${data.title}`,
    });
  }
}

console.log(`Indexing ${allChunks.length} chunks...`);
const { vectors, idf } = buildIndex(allChunks.map((c) => c.text));

// Serialize vectors as arrays for JSON
const serialized = vectors.map((v) => [...v.entries()]);

const output = {
  chunks: allChunks,
  vectors: serialized,
  idf,
};

fs.writeFileSync(
  path.resolve("src/lib/tfidf-index.json"),
  JSON.stringify(output, null, 2)
);

console.log(`Done. Indexed ${allChunks.length} chunks with ${idf.length} unique terms.`);
