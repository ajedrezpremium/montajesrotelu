"use client";

import { motion } from "framer-motion";
import { ShieldCheck, FileCheck, Leaf, HardHat } from "lucide-react";

const certs = [
  {
    icon: ShieldCheck,
    title: "EN 1090 EXC1 / EXC2 / EXC3",
    desc: "Execution classes for steel structures — from simple to most demanding structural applications.",
  },
  {
    icon: FileCheck,
    title: "ISO 3834-2",
    desc: "Complete quality requirements for fusion welding of metallic materials — highest level.",
  },
  {
    icon: Leaf,
    title: "Environmental Management",
    desc: "Committed to sustainable manufacturing processes and environmental responsibility.",
  },
  {
    icon: HardHat,
    title: "Occupational Health & Safety",
    desc: "Safety-first culture with certified OHS management systems and continuous training.",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-24 sm:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-orange text-xs uppercase tracking-[0.2em] font-medium">
            Certifications
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3">
            Certified quality. Proven reliability.
          </h2>
          <p className="mt-4 text-zinc-500 max-w-2xl mx-auto">
            Our certifications are not just documents — they are the foundation
            of trust our clients place in us.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certs.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center p-6 sm:p-8 border border-zinc-800/50 rounded-sm hover:border-orange/20 transition-all duration-500 group"
              >
                <div className="w-14 h-14 mx-auto mb-5 bg-zinc-800/50 rounded-sm flex items-center justify-center group-hover:bg-orange/10 transition-colors">
                  <Icon className="text-orange" size={28} />
                </div>
                <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
                  {cert.title}
                </h3>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  {cert.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
