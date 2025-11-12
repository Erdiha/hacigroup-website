"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefers(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return prefers;
}

export default function CTABanner() {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-[#0f1528] to-[#0B1020] overflow-hidden text-center">
      {/* Subtle animated grid */}
      {!prefersReduced && (
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
          animate={{ backgroundPosition: ["0px 0px", "50px 50px"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      )}

      <div className="relative max-w-3xl mx-auto z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight"
        >
          We’re Taking Technology Back.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xl text-white/85 mb-10 font-medium"
        >
          Every ride, every repair, every app we build — it’s owned by the
          people who use it. That’s how we start fixing what’s broken.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/donate"
            className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-black text-white rounded-2xl border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
            style={{
              backgroundImage: "linear-gradient(90deg, #8b5cf6, #f59e0b)",
            }}
          >
            <span className="flex items-center gap-2 uppercase">
              Join the Rebuild
              <svg
                className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </Link>

          <Link
            href="/get-involved"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-black text-white rounded-2xl bg-[#161b22] border-4 border-white/30 hover:bg-[#1c2128] hover:border-white/50 transition-all uppercase"
          >
            Pitch In Locally
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
