import tfidfData from "./tfidf-index.json";

interface Chunk {
  text: string;
  source: string;
}

interface IndexData {
  chunks: Chunk[];
  vectors: [string, number][][];
  idf: [string, number][];
}

const data = tfidfData as IndexData;

// Preload IDF as Map for token scoring fallback
const idfMap = new Map<string, number>(data.idf);

const STOP_WORDS = new Set([
  "de", "la", "que", "el", "en", "y", "a", "los", "se", "del", "las", "un", "por", "con",
  "no", "una", "su", "para", "es", "al", "lo", "como", "más", "pero", "sus", "le", "ya",
  "este", "entre", "porque", "todo", "esta", "sin", "the", "and", "for", "are", "but",
  "not", "you", "all", "can", "had", "her", "was", "one", "our", "out", "has", "have",
  "been", "les", "des", "sur", "dans", "une", "pas", "plus", "sont", "avec", "und",
  "die", "der", "das", "ist", "nicht", "ein", "eine", "sich", "auch", "auf", "für",
  "bei", "mit", "von", "werden", "wird", "zum", "als", "es", "sie", "nach",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-záéíóúüñ0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

function buildQueryVector(query: string): Map<string, number> {
  const tokens = tokenize(query);
  if (tokens.length === 0) return new Map();

  const tf = new Map<string, number>();
  for (const t of tokens) tf.set(t, (tf.get(t) || 0) + 1);

  const maxFreq = Math.max(...tf.values(), 1);
  const vec = new Map<string, number>();
  let normSq = 0;

  for (const [term, count] of tf) {
    const val = (count / maxFreq) * (idfMap.get(term) || 1);
    vec.set(term, val);
    normSq += val * val;
  }

  const norm = Math.sqrt(normSq) || 1;
  for (const [term, val] of vec) vec.set(term, val / norm);

  return vec;
}

function cosineSimilarity(
  queryVec: Map<string, number>,
  docVec: [string, number][]
): number {
  let dot = 0;
  const qMap = queryVec;
  for (const [term, val] of docVec) {
    const qv = qMap.get(term);
    if (qv !== undefined) dot += qv * val;
  }
  return dot;
}

export function searchManual(query: string, topK = 3): { text: string; source: string }[] {
  const queryVec = buildQueryVector(query);
  if (queryVec.size === 0) return [];

  const scored = data.vectors
    .map((vec, i) => ({
      index: i,
      score: cosineSimilarity(queryVec, vec),
    }))
    .filter((s) => s.score > 0.01)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return scored.map((s) => ({
    text: data.chunks[s.index].text,
    source: data.chunks[s.index].source,
  }));
}

export function getManualInfo() {
  const seen = new Set<string>();
  const infos: { title: string; source: string; totalPages: number }[] = [];

  for (const chunk of data.chunks) {
    if (!seen.has(chunk.source)) {
      seen.add(chunk.source);
      infos.push({
        title: chunk.source,
        source: chunk.source,
        totalPages: 62,
      });
    }
  }

  return infos;
}
