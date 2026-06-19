"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl sm:text-5xl font-bold text-white">
        {count}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-zinc-500 uppercase tracking-wider">{label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative py-20 sm:py-28 bg-steel border-y border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-orange text-xs uppercase tracking-[0.2em] font-medium">
            The numbers that speak
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
            Una trayectoria forjada en acero
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          <Counter end={35} suffix="+" label="Years of Experience" />
          <Counter end={1988} label="Established" />
          <Counter end={100} suffix="%" label="Quality Commitment" />
          <Counter end={120} suffix="+" label="Major Projects" />
          <Counter end={15} suffix="+" label="International Clients" />
        </div>
      </div>
    </section>
  );
}
