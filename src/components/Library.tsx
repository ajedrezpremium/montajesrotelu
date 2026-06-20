"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Download, FileText, Filter, X } from "lucide-react";
import { useLang } from "@/lib/language";
import libraryData from "@/lib/library-data.json";

interface Manual {
  id: string;
  title: string;
  lang: string;
  size: string;
  pages: number;
  year: string;
  cover: string;
  descKey: string;
  url: string;
  tags: string[];
}

const manuals = libraryData as Manual[];

const allTags = [...new Set(manuals.flatMap((m) => m.tags))].sort();

export default function Library() {
  const { t } = useLang();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);

  const filtered = activeTag
    ? manuals.filter((m) => m.tags.includes(activeTag))
    : manuals;

  return (
    <>
      <AnimatePresence>
        {viewerUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setViewerUrl(null)}
          >
            <button
              onClick={() => setViewerUrl(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full h-full max-w-6xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`${viewerUrl}#view=FitH`}
                className="w-full h-full border-0"
                title="PDF Viewer"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="library" className="relative py-24 bg-steel/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs tracking-[0.2em] text-orange uppercase mb-4">
            ROTELU
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-4">
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm leading-relaxed">
            {t("library.subtitle")}
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <Filter size={13} className="text-zinc-500" />
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1 text-[11px] uppercase tracking-wider rounded-sm transition-all ${
              !activeTag
                ? "bg-orange text-white"
                : "bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700"
            }`}
          >
            {t("library.filter")}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-1 text-[11px] font-mono tracking-wider rounded-sm transition-all ${
                activeTag === tag
                  ? "bg-orange text-white"
                  : "bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((manual, i) => (
            <motion.div
              key={manual.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              layout
              className="group bg-zinc-900/80 border border-zinc-800 hover:border-orange/40 transition-all duration-500 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={manual.cover}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 flex gap-1.5 flex-wrap justify-end">
                  <span className="px-2 py-1 text-[10px] font-mono bg-zinc-900/80 text-zinc-400 border border-zinc-700">
                    PDF
                  </span>
                  <span className="px-2 py-1 text-[10px] font-mono bg-zinc-900/80 text-zinc-400 border border-zinc-700">
                    {manual.pages}p
                  </span>
                  <span className="px-2 py-1 text-[10px] font-mono bg-zinc-900/80 text-zinc-400 border border-zinc-700">
                    {manual.lang}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen size={14} className="text-orange shrink-0" />
                  <span className="text-xs text-zinc-500">{manual.year}</span>
                </div>
                <h3 className="text-sm font-semibold text-heading mb-2 leading-relaxed line-clamp-2">
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed mb-4 line-clamp-3">
                  {t(manual.descKey)}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {manual.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 text-[9px] font-mono bg-zinc-800 text-zinc-500 border border-zinc-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                  <span className="text-[11px] text-zinc-600">{manual.size}</span>
                  <button
                    onClick={() => setViewerUrl(manual.url)}
                    className="inline-flex items-center gap-1.5 text-xs text-orange hover:text-orange/80 transition-colors group"
                  >
                    <FileText size={12} />
                    {t("library.view")}
                    <Download size={12} className="transition-transform group-hover:translate-y-0.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-zinc-600 text-sm mt-8">
            No manuals match this filter.
          </p>
        )}
      </div>
    </section>
    </>
  );
}
