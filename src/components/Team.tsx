"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/language";
import { getTeamMembers, type TeamMember } from "@/lib/supabase";

const fallbackMembers = [
  { key: "member1" }, { key: "member2" }, { key: "member3" }, { key: "member4" },
];

export default function Team() {
  const { t } = useLang();
  const [members, setMembers] = useState<TeamMember[] | null>(null);

  useEffect(() => {
    getTeamMembers().then((d) => { if (d.length > 0) setMembers(d); });
  }, []);

  return (
    <section className="relative py-24 sm:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-orange text-xs uppercase tracking-[0.2em] font-medium">{t("team.tag")}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3">{t("team.title")}</h2>
          <p className="mt-4 text-zinc-500 max-w-2xl mx-auto">{t("team.subtitle")}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(members ?? fallbackMembers).map((m: any, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center p-6 sm:p-8 border border-zinc-800/50 rounded-sm hover:border-zinc-700/50 transition-all duration-500">
              <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-full flex items-center justify-center border border-zinc-700/50">
                <span className="text-2xl font-bold text-orange">
                  {members ? m.initials : String(t(`team.${m.key}.name`)).charAt(0)}
                </span>
              </div>
              <h3 className="font-bold text-white text-sm mb-1">{members ? m.name : t(`team.${m.key}.name`)}</h3>
              <p className="text-orange text-xs mb-3">{members ? m.role : t(`team.${m.key}.role`)}</p>
              <p className="text-zinc-500 text-xs leading-relaxed">{members ? m.description : t(`team.${m.key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
