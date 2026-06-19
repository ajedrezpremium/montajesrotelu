"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Weight, Ruler } from "lucide-react";
import { useLang } from "@/lib/language";

const projects = [
  {
    key: "hydro",
    image: "https://www.rotelu.es/wp-content/uploads/2018/10/4_1_01_ESP-400x284.png",
  },
  {
    key: "offshore",
    image: "https://www.rotelu.es/wp-content/uploads/2018/10/4_2_01_ESP-400x284.png",
  },
  {
    key: "pressure",
    image: "https://www.rotelu.es/wp-content/uploads/2018/10/4_4_01_ESP-400x284.png",
  },
  {
    key: "naval",
    image: "https://www.rotelu.es/wp-content/uploads/2018/10/4_3_01_ESP-400x284.png",
  },
];

export default function Projects() {
  const { t } = useLang();

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
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-gradient-to-br from-zinc-900/80 to-black border border-zinc-800/50 rounded-sm overflow-hidden hover:border-zinc-700/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange/0 via-orange/0 to-orange/[0.02] group-hover:to-orange/[0.04] transition-all duration-700" />

              <div className="relative">
                <img
                  src={project.image}
                  alt={t(`${project.key}.title`)}
                  className="w-full h-48 sm:h-56 object-cover border-b border-zinc-800/50"
                />
              </div>

              <div className="relative p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-orange/10 text-orange text-xs rounded-sm uppercase tracking-wider">
                        {t(`${project.key}.sector`)}
                      </span>
                      <span className="text-zinc-600 text-xs flex items-center gap-1">
                        <Calendar size={12} />
                        {t(`${project.key}.year`)}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                      {t(`${project.key}.title`)}
                    </h3>

                    <p className="text-zinc-400 leading-relaxed mb-6">
                      {t(`${project.key}.desc`)}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-zinc-500 text-sm">
                        <MapPin size={14} className="text-orange/60" />
                        {t(`${project.key}.country`)}
                      </div>
                      <div className="flex items-center gap-2 text-zinc-500 text-sm">
                        <Ruler size={14} className="text-orange/60" />
                        {project.key === "hydro" && "4.2 m × 60 m"}
                        {project.key === "offshore" && "12.5 × 8.2 × 6.0 m"}
                        {project.key === "pressure" && "3.8 m × 12 m"}
                        {project.key === "naval" && "20 × 6 × 4 m"}
                      </div>
                      <div className="flex items-center gap-2 text-zinc-500 text-sm">
                        <Weight size={14} className="text-orange/60" />
                        {project.key === "hydro" && "120 tons"}
                        {project.key === "offshore" && "85 tons"}
                        {project.key === "pressure" && "45 tons"}
                        {project.key === "naval" && "72 tons"}
                      </div>
                      <div className="text-zinc-500 text-sm">
                        <span className="text-orange/60 font-medium">Material:</span>{" "}
                        {t(`${project.key}.material`)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-700 text-zinc-400 text-sm rounded-sm hover:border-orange hover:text-orange transition-all duration-300"
          >
            {t("projects.viewAll")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
