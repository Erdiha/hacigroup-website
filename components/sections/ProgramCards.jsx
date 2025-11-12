// File: components/sections/ProgramCards.jsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { programs } from "@/data/content";

export default function ProgramCards() {
  return (
    <section
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#0B1020] overflow-hidden"
      aria-labelledby="programs-title"
    >
      {/* soft radial accents */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.12)_0%,transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(245,158,11,0.10)_0%,transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <motion.h2
            id="programs-title"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-black text-white mb-4 uppercase"
          >
            Our Programs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-white/80 max-w-2xl mx-auto font-semibold"
          >
            Practical tools that move money and power back into the community.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 relative ">
          {programs.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.45 }}
              className="h-full"
            >
              <div className="group relative h-full overflow-hidden rounded-3xl bg-transparent border-4 border-black p-8 shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5">
                <div className="text-5xl mb-4 ">{p.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {p.title}
                </h3>
                <p
                  className={`text-sm font-semibold bg-linear-to-r ${p.color} bg-clip-text text-transparent mb-4 rounded-full`}
                >
                  {p.tagline}
                </p>
                <p className="text-white/70 mb-6">{p.description}</p>

                {/* Learn More button */}
                <div className="flex justify-start absolute bottom-2.5  right-2.5 shadow-amber shadow-2xl rounded-full">
                  <Link
                    href={p.href}
                    aria-disabled={p.comingSoon}
                    tabIndex={p.comingSoon ? -1 : 0}
                    onClick={(e) => p.comingSoon && e.preventDefault()}
                    className={`inline-flex items-center px-6 py-3 rounded-full border-2 text-sm font-bold uppercase transition-all ${
                      p.comingSoon
                        ? "border-white/20 text-white/40 cursor-not-allowed animate-pulse"
                        : "border-white/40 text-white hover:border-amber-400 hover:text-amber-400"
                    }`}
                  >
                    {p.comingSoon ? "Coming Soon" : "Learn More"}
                    {!p.comingSoon && (
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    )}
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
