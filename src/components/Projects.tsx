"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Weight, Ruler } from "lucide-react";

const projects = [
  {
    title: "Offshore Structural Nodes",
    client: "Confidencial",
    sector: "Offshore Wind",
    country: "North Sea",
    year: "2024",
    description:
      "Manufacture of high precision structural nodes subjected to extreme marine conditions. Complete fabrication, welding and quality control under international standards.",
    dimensions: "12.5 × 8.2 × 6.0 m",
    weight: "85 tons",
    material: "EN 10225 S460G10+M",
    highlights: [
      "Certified welding (EN ISO 3834-2)",
      "Tolerances ±1mm",
      "100% NDT inspection",
    ],
  },
  {
    title: "Hydroelectric Penstock",
    client: "Confidencial",
    sector: "Hydroelectric",
    country: "South America",
    year: "2023",
    description:
      "Heavy duty penstock for high-pressure hydroelectric plant. Designed to withstand extreme pressures and severe environmental conditions.",
    dimensions: "4.2 m diameter × 60 m length",
    weight: "120 tons",
    material: "P265GH / S460N",
    highlights: [
      "High-pressure welding certified",
      "Bending & forming of thick plates",
      "Hydraulic testing 1.3× design pressure",
    ],
  },
  {
    title: "Pressure Vessels for Industrial Plant",
    client: "Confidencial",
    sector: "Pressure Equipment",
    country: "Europe",
    year: "2024",
    description:
      "Design and fabrication of pressure vessels for chemical processing plant, manufactured under PED directive and ASME Section VIII standards.",
    dimensions: "3.8 m diameter × 12 m",
    weight: "45 tons",
    material: "SA-516 Gr.70 / 316L",
    highlights: [
      "PED 2014/68/EU certified",
      "Post-weld heat treatment (PWHT)",
      "Full radiographic examination",
    ],
  },
  {
    title: "Naval Structure Components",
    client: "Confidencial",
    sector: "Shipbuilding",
    country: "Spain",
    year: "2023",
    description:
      "Complex structural components for naval construction under DNV classification standards.",
    dimensions: "20 × 6 × 4 m",
    weight: "72 tons",
    material: "Naval steel A / AH / DH",
    highlights: [
      "DNV-GL classification",
      "WPS qualified procedures",
      "Marine coating systems",
    ],
  },
];

export default function Projects() {
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
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3">
            Projects that speak for themselves
          </h2>
          <p className="mt-4 text-zinc-500 max-w-2xl mx-auto">
            Each project is a testament to our engineering capability, precision,
            and commitment to quality.
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

              <div className="relative p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-orange/10 text-orange text-xs rounded-sm uppercase tracking-wider">
                        {project.sector}
                      </span>
                      <span className="text-zinc-600 text-xs flex items-center gap-1">
                        <Calendar size={12} />
                        {project.year}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                      {project.title}
                    </h3>

                    <p className="text-zinc-400 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-zinc-500 text-sm">
                        <MapPin size={14} className="text-orange/60" />
                        {project.country}
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
                        {project.material}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-zinc-800/50 text-zinc-400 text-xs rounded-sm"
                        >
                          {h}
                        </span>
                      ))}
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
            Request full project portfolio
          </a>
        </motion.div>
      </div>
    </section>
  );
}
