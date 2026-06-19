"use client";

import { motion } from "framer-motion";
import { BookOpen, Download, FileText } from "lucide-react";
import { useLang } from "@/lib/language";

const manuals = [
  {
    id: "sweiss",
    cover: "https://img.freepik.com/free-vector/welding-cartoon-banner-with-workers_33099-493.jpg",
    pages: 72,
    language: "ES",
    format: "PDF",
    size: "9.4 MB",
    url: "/manuals/manual-basico-soldadura-sweiss.pdf",
  },
];

export default function Library() {
  const { t } = useLang();

  return (
    <section id="library" className="relative py-24 bg-steel/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs tracking-[0.2em] text-orange uppercase mb-4">
            ROTELU
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t("library.title")}
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm leading-relaxed">
            {t("library.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {manuals.map((manual, i) => (
            <motion.div
              key={manual.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-zinc-900/80 border border-zinc-800 hover:border-orange/40 transition-all duration-500 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={manual.cover}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 flex gap-2">
                  <span className="px-2 py-1 text-[10px] font-mono bg-zinc-900/80 text-zinc-400 border border-zinc-700">
                    {manual.format}
                  </span>
                  <span className="px-2 py-1 text-[10px] font-mono bg-zinc-900/80 text-zinc-400 border border-zinc-700">
                    {manual.pages}p
                  </span>
                  <span className="px-2 py-1 text-[10px] font-mono bg-zinc-900/80 text-zinc-400 border border-zinc-700">
                    {manual.language}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen size={14} className="text-orange shrink-0" />
                  <span className="text-xs text-zinc-500">SWEISS — 2025</span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-2 leading-relaxed">
                  Manual Básico de Soldadura
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed mb-4 line-clamp-3">
                  {t("library.desc.sweiss")}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                  <span className="text-[11px] text-zinc-600">{manual.size}</span>
                  <a
                    href={manual.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-orange hover:text-orange/80 transition-colors group"
                  >
                    <FileText size={12} />
                    {t("library.view")}
                    <Download size={12} className="transition-transform group-hover:translate-y-0.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
