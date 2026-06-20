"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Weight, Ruler, X, ChevronLeft, ChevronRight, Award, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/language";
import { getProjects, type Project } from "@/lib/supabase";

const fallbackProjects: Project[] = [
  {
    id: 1, title: "hydro.title", slug: "", client: null, sector: "hydro.sector", country: "hydro.country",
    year: "hydro.year", description: "hydro.desc", dimensions: "4.2 m × 60 m", weight: "120 tons",
    material: "hydro.material",
    highlights: ["1,686 tonnes total weight", "625 m head", "100% NDT (UT + RT)", "SAW welded seams"],
    images: [
      "https://www.rotelu.es/wp-content/uploads/2018/10/4_1_01_ESP-400x284.png",
      "https://www.rotelu.es/wp-content/uploads/2018/10/4_1_02_ESP-400x284.png",
    ],
  },
  {
    id: 2, title: "offshore.title", slug: "", client: null, sector: "offshore.sector", country: "offshore.country",
    year: "offshore.year", description: "offshore.desc", dimensions: "12.5 × 8.2 × 6.0 m", weight: "85 tons",
    material: "offshore.material",
    highlights: ["Weld rejection < 0.25%", "Complex 3D geometry", "EN 10225 offshore steel", "IACS classification"],
    images: [
      "https://www.rotelu.es/wp-content/uploads/2018/10/4_2_01_ESP-400x284.png",
      "https://www.rotelu.es/wp-content/uploads/2018/10/4_2_02_ESP-400x284.png",
    ],
  },
  {
    id: 3, title: "pressure.title", slug: "", client: null, sector: "pressure.sector", country: "pressure.country",
    year: "pressure.year", description: "pressure.desc", dimensions: "3.8 m × 12 m", weight: "45 tons",
    material: "pressure.material",
    highlights: ["4,000+ tanks installed", "PED 2014/68/EU certified", "ASME VIII design", "30+ years experience"],
    images: [
      "https://www.rotelu.es/wp-content/uploads/2018/10/4_4_01_ESP-400x284.png",
      "https://www.rotelu.es/wp-content/uploads/2018/10/4_4_02_ESP-400x284.png",
    ],
  },
  {
    id: 4, title: "naval.title", slug: "", client: null, sector: "naval.sector", country: "naval.country",
    year: "naval.year", description: "naval.desc", dimensions: "20 × 6 × 4 m", weight: "72 tons",
    material: "naval.material",
    highlights: ["IACS classification", "EN 287/ISO 9606 welders", "Complex curved blocks", "DNV / BV approved"],
    images: [
      "https://www.rotelu.es/wp-content/uploads/2018/10/4_3_01_ESP-400x284.png",
      "https://www.rotelu.es/wp-content/uploads/2018/10/4_3_02_ESP-400x284.png",
    ],
  },
];

export default function Projects() {
  const { t } = useLang();
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  useEffect(() => {
    getProjects().then((data) => {
      if (data.length > 0) setProjects(data);
    });
  }, []);

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-orange text-xs uppercase tracking-[0.2em] font-medium">
            {t("projects.tag")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3">
            {t("projects.title")}
          </h2>
          <p className="mt-4 text-zinc-500 max-w-2xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        <div className="grid gap-8">
          {projects.map((project, index) => {
            const title = t(project.title);
            const sector = t(project.sector);
            const country = t(project.country);
            const year = t(project.year);
            const desc = t(project.description);
            const material = t(project.material);
            const image = project.images[0] || fallbackProjects[index]?.images[0] || "";

            return (
              <motion.div
                key={project.id || index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-gradient-to-br from-zinc-900/80 to-black border border-zinc-800/50 overflow-hidden hover:border-zinc-700/50 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange/0 via-orange/0 to-orange/[0.02] group-hover:to-orange/[0.04] transition-all duration-700" />

                <div className="relative">
                  <button
                    onClick={() => setLightbox({ images: project.images, index: 0 })}
                    className="w-full text-left"
                  >
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-48 sm:h-56 object-cover border-b border-zinc-800/50 hover:opacity-90 transition-opacity"
                    />
                  </button>
                </div>

                <div className="relative p-6 sm:p-8 lg:p-10">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-orange/10 text-orange text-xs uppercase tracking-wider">
                          {sector}
                        </span>
                        <span className="text-zinc-600 text-xs flex items-center gap-1">
                          <Calendar size={12} />
                          {year}
                        </span>
                        {project.client && (
                          <span className="text-zinc-600 text-xs">
                            {project.client}
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                        {title}
                      </h3>

                      <p className="text-zinc-400 leading-relaxed mb-6">
                        {desc}
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-zinc-500 text-sm">
                          <MapPin size={14} className="text-orange/60" />
                          {country}
                        </div>
                        <div className="flex items-center gap-2 text-zinc-500 text-sm">
                          <Ruler size={14} className="text-orange/60" />
                          {project.dimensions}
                        </div>
                        <div className="flex items-center gap-2 text-zinc-500 text-sm">
                          <Weight size={14} className="text-orange/60" />
                          {project.weight}
                        </div>
                        <div className="text-zinc-500 text-sm">
                          <span className="text-orange/60 font-medium">Material:</span>{" "}
                          {material}
                        </div>
                      </div>

                      {project.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.highlights.map((h, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-zinc-800/80 text-zinc-400 text-[11px] border border-zinc-700/50"
                            >
                              <Award size={11} className="text-orange/60" />
                              {h}
                            </span>
                          ))}
                        </div>
                      )}

                      {project.slug && (
                        <div className="mt-6">
                          <Link
                            href={`/projects/${project.slug}`}
                            className="inline-flex items-center gap-2 text-sm text-orange hover:text-orange/80 transition-colors"
                          >
                            View Details <ArrowRight size={14} />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                  {project.images.length > 1 && (
                    <div className="mt-6 pt-6 border-t border-zinc-800/50">
                      <div className="flex gap-2 overflow-x-auto pb-1">
                        {project.images.map((img, i) => (
                          <button
                            key={i}
                            onClick={() => setLightbox({ images: project.images, index: i })}
                            className={`shrink-0 w-16 h-12 overflow-hidden border-2 transition-all ${
                              i === 0 ? "border-orange/40" : "border-transparent hover:border-zinc-600"
                            }`}
                          >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-700 text-zinc-400 text-sm hover:border-orange hover:text-orange transition-all duration-300"
          >
            {t("projects.viewAll")}
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white z-10"
            >
              <X size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((prev) =>
                  prev ? { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length } : null
                );
              }}
              className="absolute left-4 text-white/60 hover:text-white z-10"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((prev) =>
                  prev ? { ...prev, index: (prev.index + 1) % prev.images.length } : null
                );
              }}
              className="absolute right-4 text-white/60 hover:text-white z-10"
            >
              <ChevronRight size={32} />
            </button>

            <motion.img
              key={lightbox.index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={lightbox.images[lightbox.index]}
              alt=""
              className="max-w-[90vw] max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-4 text-white/40 text-xs">
              {lightbox.index + 1} / {lightbox.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
