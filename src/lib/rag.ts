import manualData from "./manual-knowledge.json";

interface ManualKnowledge {
  title: string;
  source: string;
  totalPages: number;
  chunks: string[];
}

const data = manualData as ManualKnowledge;

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-záéíóúüñ0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

function scoreChunk(chunk: string, queryTerms: string[]): number {
  const lower = chunk.toLowerCase();
  let score = 0;
  for (const term of queryTerms) {
    const count = (lower.match(new RegExp(term, "g")) || []).length;
    score += count * (term.length > 6 ? 3 : term.length > 4 ? 2 : 1);
  }
  return score;
}

export function searchManual(query: string, topK = 3): string[] {
  const terms = tokenize(query);
  if (terms.length === 0) return [];

  const scored = data.chunks
    .map((chunk) => ({ chunk, score: scoreChunk(chunk, terms) }))
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return scored.map((c) => c.chunk);
}

export function getManualInfo() {
  return {
    title: data.title,
    source: data.source,
    totalPages: data.totalPages,
  };
}
