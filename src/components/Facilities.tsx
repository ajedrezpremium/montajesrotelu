"use client";

import { motion } from "framer-motion";
import { Factory } from "lucide-react";
import { useLang } from "@/lib/language";

const facilityImages = [
  "https://www.rotelu.es/wp-content/uploads/2018/10/2_01_ESP-400x284.png",
  "https://www.rotelu.es/wp-content/uploads/2018/10/2_02_ESP-400x284.png",
  "https://www.rotelu.es/wp-content/uploads/2018/10/2_05_ESP-400x284.png",
  "https://www.rotelu.es/wp-content/uploads/2018/10/2_06_ESP-400x284.png",
];

const facilityItems = [
  { key: "item1" },
  { key: "item2" },
  { key: "item3" },
  { key: "item4" },
];

export default function Facilities() {
  const { t } = useLang();

  return (
    <section id="facilities" className="relative py-24 sm:py-32 bg-steel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-orange text-xs uppercase tracking-[0.2em] font-medium">
            {t("fac.tag")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3">
            {t("fac.title")}
          </h2>
          <p className="mt-4 text-zinc-500 max-w-2xl mx-auto">
            {t("fac.subtitle")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {facilityImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="overflow-hidden rounded-sm border border-zinc-800/50"
            >
              <img
                src={img}
                alt={t(`fac.${facilityItems[i].key}.title`)}
                className="w-full h-40 object-cover"
              />
            </motion.div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilityItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-5 bg-black/30 border border-zinc-800/30 rounded-sm"
            >
              <Factory className="text-orange/60 mb-3" size={22} />
              <h3 className="text-sm font-bold text-white mb-1">{t(`fac.${item.key}.title`)}</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">{t(`fac.${item.key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
