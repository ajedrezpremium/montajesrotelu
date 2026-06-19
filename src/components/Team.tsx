"use client";

import { motion } from "framer-motion";

const team = [
  { name: "Ingeniería", role: "Engineering Department", desc: "Expert engineers specialized in heavy steel structures, FEA analysis and welding engineering." },
  { name: "Soldadura", role: "Certified Welding", desc: "ISO 9606 certified welders with decades of experience in critical welding applications." },
  { name: "Calidad", role: "Quality Control", desc: "Certified NDT inspectors ensuring every weld and component meets the highest standards." },
  { name: "Dirección", role: "Management", desc: "Leadership team with over 100 years of combined experience in the steel fabrication industry." },
];

export default function Team() {
  return (
    <section className="relative py-24 sm:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-orange text-xs uppercase tracking-[0.2em] font-medium">
            Our Team
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3">
            The strength of steel begins with people
          </h2>
          <p className="mt-4 text-zinc-500 max-w-2xl mx-auto">
            Behind every great structure is a team of skilled professionals committed to excellence.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center p-6 sm:p-8 border border-zinc-800/50 rounded-sm hover:border-zinc-700/50 transition-all duration-500"
            >
              <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-full flex items-center justify-center border border-zinc-700/50">
                <span className="text-2xl font-bold text-orange">
                  {member.name.charAt(0)}
                </span>
              </div>
              <h3 className="font-bold text-white text-sm mb-1">{member.name}</h3>
              <p className="text-orange text-xs mb-3">{member.role}</p>
              <p className="text-zinc-500 text-xs leading-relaxed">{member.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
