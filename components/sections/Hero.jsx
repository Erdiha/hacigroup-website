"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  // Reduced motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReduced(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d1117]">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(139,123,216,0.15)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,_rgba(251,191,36,0.12)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(139,123,216,0.08)_0%,_transparent_70%)]" />
        {!prefersReduced && (
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(139,123,216,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,123,216,0.3) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
            animate={{ backgroundPosition: ["0px 0px", "50px 50px"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        {/* Headline */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, scale: 0.95 }}
          animate={prefersReduced ? {} : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white uppercase leading-tight mb-8">
            <motion.span
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-block bg-linear-to-r from-purple-400 via-amber-400 to-purple-400 bg-clip-text text-transparent"
              style={{ WebkitTextStroke: "1px rgba(0,0,0,0.2)" }}
            >
              Fair Technology
            </motion.span>
            <br />
            <motion.span
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-block text-white"
              style={{
                textShadow: "3px 3px 0px #8b7bd8, 6px 6px 0px #fbbf24",
                WebkitTextStroke: "1px black",
              }}
            >
              For Everyone
            </motion.span>
          </h1>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl sm:text-2xl lg:text-3xl text-white/90 font-semibold max-w-4xl mx-auto mb-12"
          >
            A nonprofit technology platform delivering{" "}
            <span className="text-amber-400">better value</span> for riders and{" "}
            <span className="text-green-400">better earnings</span> for drivers
          </motion.p>
        </motion.div>

        {/* Visual Flow Animation */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 30 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-5xl mx-auto mb-16"
        >
          <div className="relative">
            {/* Three pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Rider */}
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, x: -50 }}
                animate={prefersReduced ? {} : { opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="bg-[#161b22] border-4 border-amber-500/50 rounded-3xl p-8 text-center relative"
              >
                <div className="text-6xl mb-4">🚶</div>
                <h3 className="text-2xl font-black text-white uppercase mb-2">
                  Riders
                </h3>
                <p className="text-white/70 text-sm">
                  Pay 20% less than traditional platforms
                </p>
                {!prefersReduced && (
                  <motion.div
                    className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:block"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                  >
                    <svg
                      className="w-8 h-8 text-purple-400"
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
                  </motion.div>
                )}
              </motion.div>

              {/* Platform */}
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, scale: 0.8 }}
                animate={prefersReduced ? {} : { opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="bg-linear-to-br from-purple-500/20 to-amber-500/20 border-4 border-purple-500/50 rounded-3xl p-8 text-center relative"
              >
                <div className="text-6xl mb-4">🤝</div>
                <h3 className="text-3xl font-black bg-linear-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent uppercase mb-2">
                  Our Platform
                </h3>
                <p className="text-white/90 text-sm font-semibold">
                  10% operations cost
                  <br />
                  <span className="text-white/60">0% profit extraction</span>
                </p>
                {!prefersReduced && (
                  <motion.div
                    className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:block"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                  >
                    <svg
                      className="w-8 h-8 text-green-400"
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
                  </motion.div>
                )}
              </motion.div>

              {/* Driver */}
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, x: 50 }}
                animate={prefersReduced ? {} : { opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="bg-[#161b22] border-4 border-green-500/50 rounded-3xl p-8 text-center"
              >
                <div className="text-6xl mb-4">👤</div>
                <h3 className="text-2xl font-black text-white uppercase mb-2">
                  Drivers
                </h3>
                <p className="text-white/70 text-sm">Earn 90% of every fare</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
