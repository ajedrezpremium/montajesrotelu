"use client";

import { motion } from "framer-motion";
import { Zap, Wind, Ship, Thermometer } from "lucide-react";

const capabilities = [
  {
    icon: Zap,
    title: "Hydroelectric Solutions",
    description:
      "Penstocks, spiral cases, draft tubes, gates, and custom hydraulic components for hydroelectric plants of all sizes.",
    items: [
      "Penstocks & pressure pipes",
      "Spiral cases (Francis & Kaplan)",
      "Draft tubes",
      "Gates & stoplogs",
    ],
  },
  {
    icon: Wind,
    title: "Offshore Wind",
    description:
      "High precision structural nodes and components for offshore wind energy platforms and subsea environments.",
    items: [
      "Structural nodes",
      "Boat landings",
      "Structural pipes",
      "Transition pieces",
    ],
  },
  {
    icon: Ship,
    title: "Shipbuilding & Naval",
    description:
      "Complex metal structures and components for the naval industry under international classification society standards.",
    items: [
      "Hull blocks & sections",
      "Shaft line supports",
      "Deck structures",
      "Propulsion components",
    ],
  },
  {
    icon: Thermometer,
    title: "Pressure Equipment",
    description:
      "Design and manufacture of pressure vessels, tanks and special components under PED and ASME codes.",
    items: [
      "Pressure vessels",
      "Storage tanks",
      "Heat exchangers",
      "Special components",
    ],
  },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative py-24 sm:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-orange text-xs uppercase tracking-[0.2em] font-medium">
            Industrial Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3">
            Engineering solutions for the most demanding industries
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group p-6 sm:p-8 bg-gradient-to-br from-zinc-900/60 to-black border border-zinc-800/50 rounded-sm hover:border-zinc-700/50 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 bg-orange/10 rounded-sm flex items-center justify-center">
                    <Icon className="text-orange" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{cap.title}</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                  {cap.description}
                </p>
                <ul className="space-y-2">
                  {cap.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-zinc-500 text-sm"
                    >
                      <span className="w-1 h-1 bg-orange/60 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
