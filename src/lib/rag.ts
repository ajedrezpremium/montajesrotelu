import sweissData from "./knowledge-sweiss.json";
import dcmData from "./knowledge-dcm.json";

interface ManualKnowledge {
  title: string;
  source: string;
  totalPages: number;
  chunks: string[];
}

const manuals: Record<string, ManualKnowledge> = {
  sweiss: sweissData as ManualKnowledge,
  dcm: dcmData as ManualKnowledge,
};

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

export function searchManual(query: string, topK = 3): { text: string; source: string }[] {
  const terms = tokenize(query);
  if (terms.length === 0) return [];

  const results: { text: string; source: string; score: number }[] = [];

  for (const [id, manual] of Object.entries(manuals)) {
    for (const chunk of manual.chunks) {
      const score = scoreChunk(chunk, terms);
      if (score > 0) {
        results.push({ text: chunk, source: `${manual.title} (${id})`, score });
      }
    }
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(({ text, source }) => ({ text, source }));
}

export function getManualInfo() {
  return Object.entries(manuals).map(([id, m]) => ({
    id,
    title: m.title,
    source: m.source,
    totalPages: m.totalPages,
  }));
}
