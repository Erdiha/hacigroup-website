// File: components/sections/StatsStrip.jsx
"use client";

import { motion } from "framer-motion";

const STATS = [
  {
    value: "0%",
    label: "Profit to Shareholders",
    sublabel: "We’re a nonprofit.",
  },
  { value: "2", label: "Active Programs", sublabel: "NELA Ride • Handy Hack" },
  { value: "∞", label: "Community Impact", sublabel: "People over profit." },
  { value: "100%", label: "Price Transparency", sublabel: "No surge games." },
];

export default function StatsStrip() {
  return (
    <section
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0B1020] to-[#0f1528] overflow-hidden"
      aria-labelledby="stats-title"
    >
      {/* soft accents */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,_rgba(139,92,246,0.10)_0%,_transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_72%,_rgba(245,158,11,0.08)_0%,_transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl">
        <header className="text-center mb-10">
          <h2
            id="stats-title"
            className="text-3xl sm:text-4xl font-black text-white uppercase"
          >
            What We Stand On
          </h2>
          <p className="mt-3 text-white/70 max-w-xl mx-auto font-semibold">
            Numbers that explain our values, not hide them.
          </p>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45, ease: "easeOut" }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-white font-extrabold uppercase tracking-wide mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-white/60 font-semibold">
                {stat.sublabel}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
