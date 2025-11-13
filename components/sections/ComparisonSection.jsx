"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ComparisonSection() {
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
    <section className="relative py-20 bg-[#0d1117]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase mb-6">
            See The{" "}
            <span className="bg-linear-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
              Difference
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-white/70 max-w-3xl mx-auto">
            Compare our transparent pricing model with traditional rideshare platforms
          </p>
        </motion.div>

        {/* Comparison */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 30 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-6xl mx-auto mb-16"
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

              {/* 3 cards: Rider • Platform • Driver */}
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

        {/* Impact Stats */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 30 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-[#161b22] border-4 border-purple-500/30 rounded-3xl p-8 sm:p-12">
            <h3 className="text-3xl sm:text-4xl font-black text-white text-center uppercase mb-8">
              Our Impact
            </h3>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="text-center">
                <motion.div
                  className="text-5xl sm:text-6xl font-black bg-linear-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent mb-2"
                  key={counter.drivers}
                >
                  {counter.drivers}+
                </motion.div>
                <div className="text-white/80 font-bold uppercase">
                  Active Drivers
                </div>
                <div className="text-white/50 text-sm mt-2">
                  earning fair wages with us
                </div>
              </div>
              <div className="text-center">
                <motion.div
                  className="text-5xl sm:text-6xl font-black bg-linear-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent mb-2"
                  key={counter.saved}
                >
                  ${counter.saved.toLocaleString()}+
                </motion.div>
                <div className="text-white/80 font-bold uppercase">
                  Returned to Community
                </div>
                <div className="text-white/50 text-sm mt-2">
                  in additional earnings & savings
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
