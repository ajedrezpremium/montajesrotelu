"use client";

import { motion } from "framer-motion";
import { Factory, Warehouse, Wrench, Wind } from "lucide-react";

const facilityHighlights = [
  {
    icon: Factory,
    title: "5,000+ m² Facilities",
    desc: "Covered workshops with advanced manufacturing equipment and climate-controlled welding areas.",
  },
  {
    icon: Warehouse,
    title: "Overhead Cranes up to 40T",
    desc: "Heavy lifting capacity for large component handling and assembly operations.",
  },
  {
    icon: Wrench,
    title: "CNC & Robotic Equipment",
    desc: "CNC plasma cutting, robotic welding stations, and precision forming machinery.",
  },
  {
    icon: Wind,
    title: "Strategic Location",
    desc: "Pontevedra, Spain — near major maritime routes and port facilities for global exports.",
  },
];

export default function Facilities() {
  return (
    <section className="relative py-24 sm:py-32 bg-steel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-orange text-xs uppercase tracking-[0.2em] font-medium">
            Facilities
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3">
            Where engineering becomes reality
          </h2>
          <p className="mt-4 text-zinc-500 max-w-2xl mx-auto">
            Our facilities are equipped with state-of-the-art machinery to handle projects of any scale and complexity.
          </p>
        </motion.div>

        <div className="relative overflow-hidden rounded-sm mb-8">
          <div className="aspect-video bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center border border-zinc-800/50">
            <div className="text-center p-8">
              <Factory className="mx-auto text-orange/30 mb-4" size={48} />
              <p className="text-zinc-600 text-sm">Aerial view — Pontevedra facilities</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilityHighlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-5 bg-black/30 border border-zinc-800/30 rounded-sm"
              >
                <Icon className="text-orange/60 mb-3" size={22} />
                <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
