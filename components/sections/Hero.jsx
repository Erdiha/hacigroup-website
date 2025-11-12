"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const FARE_UL = 50; // Uber/Lyft example fare
  const FARE_NELA = 40; // NELA ~20% cheaper
  const TARGETS = { drivers: 247, saved: 94580 };

  const [comparison, setComparison] = useState("uberlyft");
  const [counter, setCounter] = useState({ drivers: 0, saved: 0 });
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

  // Counters
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((p) => {
        const n = {
          drivers: Math.min(p.drivers + 1, TARGETS.drivers),
          saved: Math.min(p.saved + 127, TARGETS.saved),
        };
        if (n.drivers === TARGETS.drivers && n.saved === TARGETS.saved)
          clearInterval(interval);
        return n;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  // Display data
  const comparisonData = {
    uberlyft: {
      platform: "Uber / Lyft",
      rider: `$${FARE_UL}`,
      driver: "$18", // shown with ≈ in UI
      company: "$32", // shown with ≈ in UI
      driverPct: "≈ 35% of rider payment (effective)",
      companyPct: "≈ 65% platform + external fees",
      bg: "from-red-500/20 to-red-600/10",
      companyLabel: "Company/Platform Take",
      driverColor: "text-red-500",
      companyColor: "text-purple-400",
      isApprox: true,
    },
    nela: {
      platform: "NELA Ride (20% cheaper)",
      rider: `$${FARE_NELA}`,
      driver: `$${Math.round(FARE_NELA * 0.9)}`, // $36
      company: `$${Math.round(FARE_NELA * 0.1)}`, // $4
      driverPct: "90% of fare",
      companyPct: "10% ops cost",
      bg: "from-green-500/20 to-emerald-600/10",
      companyLabel: "Ops Cost",
      driverColor: "text-green-500",
      companyColor: "text-purple-400",
      isApprox: false,
    },
  };

  const tabs = [
    { id: "uberlyft", label: "Uber/Lyft" },
    { id: "nela", label: "NELA Ride" },
  ];

  const isUL = comparison === "uberlyft";
  const data = comparisonData[comparison];

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
        {/* Badge */}
        {/* <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: -20 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-3 bg-[#161b22] border-2 border-purple-500/30 rounded-full px-6 py-3 backdrop-blur-sm">
            <div className="relative">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping" />
            </div>
            <span className="text-white font-bold uppercase text-sm tracking-wider">
              100% Nonprofit • 0% Extraction
            </span>
          </div>
        </motion.div> */}

        {/* Headline */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, scale: 0.95 }}
          animate={prefersReduced ? {} : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white uppercase leading-none mb-6">
            <motion.span
              initial={prefersReduced ? false : { x: -50, opacity: 0 }}
              animate={prefersReduced ? {} : { x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block"
              style={{
                textShadow: "4px 4px 0px #8b7bd8, 8px 8px 0px #fbbf24",
                WebkitTextStroke: "2px black",
              }}
            >
              Stop
            </motion.span>
            <br />
            <motion.span
              initial={prefersReduced ? false : { x: 50, opacity: 0 }}
              animate={prefersReduced ? {} : { x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-purple-400 via-amber-400 to-purple-400 bg-clip-text text-transparent"
              style={{ WebkitTextStroke: "2px rgba(0,0,0,0.3)" }}
            >
              Extraction
            </motion.span>
          </h1>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl sm:text-2xl lg:text-3xl text-white/80 font-bold max-w-4xl mx-auto mb-4"
          >
            See the <span className="text-amber-400">real difference</span>{" "}
            between platform capitalism and nonprofit tech
          </motion.p>
        </motion.div>

        {/* Comparison */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 30 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-6xl mx-auto mb-12"
        >
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setComparison(t.id)}
                className={`px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-black uppercase text-base sm:text-lg border-4 transition-all ${
                  comparison === t.id
                    ? (t.id === "uberlyft" ? "bg-red-500" : "bg-green-500") +
                      " border-black text-white shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
                    : "bg-[#161b22] border-white/20 text-white/50 hover:border-white/40"
                }`}
                aria-pressed={comparison === t.id}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={comparison}
              initial={
                prefersReduced
                  ? false
                  : { opacity: 0, x: comparison === "uberlyft" ? -50 : 50 }
              }
              animate={prefersReduced ? {} : { opacity: 1, x: 0 }}
              exit={
                prefersReduced
                  ? {}
                  : { opacity: 0, x: comparison === "uberlyft" ? 50 : -50 }
              }
              transition={{ duration: 0.3 }}
              className={`bg-linear-to-br ${data.bg} border-4 border-black rounded-3xl p-8 sm:p-12 backdrop-blur-sm`}
            >
              <div className="text-center mb-8">
                <h3 className="text-4xl sm:text-5xl font-black text-white uppercase mb-2">
                  {data.platform}
                </h3>
                <p className="text-white/70 text-lg">
                  A ${comparison === "uberlyft" ? FARE_UL : FARE_NELA} ride
                  breakdown
                </p>
              </div>

              {/* 3 cards: Driver • Rider • Company */}
              <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {/* Rider Pays */}
                <div className="bg-[#161b22] border-4 border-amber-500/50 rounded-2xl p-6 text-center">
                  <div className="text-5xl mb-2">💰</div>
                  <div className="text-5xl sm:text-6xl font-black text-amber-400 mb-2">
                    {data.rider}
                  </div>
                  <div className="text-white/80 font-bold uppercase text-sm">
                    Rider Pays
                  </div>
                  <div className="text-white/50 text-xs mt-2">Total fare</div>
                </div>

                {/* Company / Platform */}
                <div className="bg-[#161b22] border-4 border-white/20 rounded-2xl p-6 text-center">
                  <div className="text-5xl mb-2">{isUL ? "🚗" : "🏛️"}</div>
                  {data.isApprox ? (
                    <div
                      className={`flex items-baseline justify-center gap-1 text-6xl sm:text-7xl font-black font-mono ${data.companyColor} mb-2`}
                    >
                      <span className="text-4xl opacity-70 translate-y-[4px]">
                        ≈
                      </span>
                      <span>{data.company}</span>
                    </div>
                  ) : (
                    <div
                      className={`text-6xl sm:text-7xl font-black font-mono ${data.companyColor} mb-2`}
                    >
                      {data.company}
                    </div>
                  )}
                  <div className="text-white/80 font-bold uppercase text-sm">
                    {data.companyLabel}
                  </div>
                  <div className="text-white/50 text-xs mt-2">
                    {data.companyPct}
                  </div>
                </div>
                {/* Driver Gets */}
                <div className="bg-[#161b22] border-4 border-white/20 rounded-2xl p-6 text-center">
                  <div className="text-5xl mb-2">👤</div>
                  {data.isApprox ? (
                    <div
                      className={`flex items-baseline justify-center gap-1 text-6xl sm:text-7xl font-black font-mono ${data.driverColor} mb-2`}
                    >
                      <span className="text-4xl opacity-70 translate-y-[4px]">
                        ≈
                      </span>
                      <span>{data.driver}</span>
                    </div>
                  ) : (
                    <div
                      className={`text-6xl sm:text-7xl font-black font-mono ${data.driverColor} mb-2`}
                    >
                      {data.driver}
                    </div>
                  )}
                  <div className="text-white/80 font-bold uppercase text-sm">
                    Driver Gets
                  </div>
                  <div className="text-white/50 text-xs mt-2">
                    {data.driverPct}
                  </div>
                </div>
              </div>

              {/* Footnote */}
              <div className="mt-8 bg-black/30 border-2 border-white/20 rounded-xl p-6 max-w-3xl mx-auto">
                <p className="text-white/90 text-center text-sm sm:text-base font-semibold">
                  All platforms have ops costs. Uber/Lyft also add fees and
                  margin; results vary by time and place. NELA keeps fares ~20%
                  lower and caps the platform share at 10% (ops only, no
                  profit).
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Impact */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 30 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="max-w-5xl mx-auto mb-12"
        >
          <div className="bg-[#161b22] border-4 border-purple-500/30 rounded-3xl p-8 sm:p-12">
            <h3 className="text-3xl sm:text-4xl font-black text-white text-center uppercase mb-8">
              Real-Time Impact
            </h3>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="text-center">
                <motion.div
                  className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent mb-2"
                  key={counter.drivers}
                >
                  {counter.drivers}+
                </motion.div>
                <div className="text-white/80 font-bold uppercase">
                  Drivers Earning More
                </div>
                <div className="text-white/50 text-sm mt-2">
                  vs traditional platforms
                </div>
              </div>
              <div className="text-center">
                <motion.div
                  className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent mb-2"
                  key={counter.saved}
                >
                  ${counter.saved.toLocaleString()}+
                </motion.div>
                <div className="text-white/80 font-bold uppercase">
                  Saved from Extraction
                </div>
                <div className="text-white/50 text-sm mt-2">
                  kept in community
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 30 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            type="button"
            className="group relative px-10 py-5 bg-linear-to-r from-purple-500 to-amber-500 rounded-2xl border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
          >
            <span className="text-white font-black uppercase text-lg flex items-center gap-2">
              Join The Revolution
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
          </button>
          <button
            type="button"
            className="px-10 py-5 bg-[#161b22] border-4 border-white/30 rounded-2xl hover:bg-[#1c2128] hover:border-white/50 transition-all backdrop-blur-sm"
          >
            <span className="text-white font-black uppercase text-lg">
              Learn How It Works
            </span>
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={prefersReduced ? {} : { opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.5 },
            y: { duration: 2, repeat: Infinity },
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
            <div className="w-1 h-3 bg-amber-400 rounded-full mx-auto animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
