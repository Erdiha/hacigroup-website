"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { homepage, programs } from "@/data/content";
import Section from "@/components/ui/Section";

// ==========================================
// UTILITY HOOKS
// ==========================================
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

// ==========================================
// HERO SECTION
// ==========================================
function HeroSection() {
  const prefersReduced = usePrefersReducedMotion();
  const { hero } = homepage;

  return (
    <Section
      variant="primary"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 radial-purple" />
      <div className="absolute inset-0 radial-amber" />
      {!prefersReduced && (
        <div className="absolute inset-0 animated-grid" aria-hidden="true" />
      )}

      <Container className="relative z-10 w-full pt-16 pb-16">
        {/* Badge */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, scale: 0.95 }}
          animate={prefersReduced ? {} : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-10 md:mb-14"
        >
          {/* <div className="inline-flex items-center gap-2 rounded-full border border-subtle bg-white/5 px-4 py-2 backdrop-blur-sm mb-8">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-secondary">{hero.badge}</span>
          </div> */}

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-primary uppercase leading-tight mb-6 sm:mb-8">
            <motion.span
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-block gradient-text"
            >
              {hero.title.line1}
            </motion.span>
            <br />
            <motion.span
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-block text-primary"
            >
              {hero.title.line2}
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-sm sm:text-lg lg:text-xl text-secondary font-medium max-w-4xl mx-auto mb-8 sm:mb-10"
          >
            {hero.subtitle}
          </motion.p>
        </motion.div>

        {/* Visual Flow */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 30 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {/* Rider */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, x: -30 }}
              animate={prefersReduced ? {} : { opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="card border-2 md:border-4 border-amber-400/50 text-center p-4 md:p-6"
            >
              <div className="text-4xl md:text-6xl mb-3">🚶</div>
              <h3 className="text-lg md:text-2xl font-black text-primary uppercase mb-2">
                Riders
              </h3>
              <p className="text-sm md:text-base text-secondary">
                Pay 20% less
              </p>
            </motion.div>

            {/* Platform */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, scale: 0.9 }}
              animate={prefersReduced ? {} : { opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              className="card border-2 md:border-4 border-purple-400/50 bg-gradient-to-br from-purple-400/20 to-amber-400/20 text-center p-4 md:p-6"
            >
              <div className="text-4xl md:text-6xl mb-3">🤝</div>
              <h3 className="text-xl md:text-3xl font-black gradient-text uppercase mb-2">
                Platform
              </h3>
              <p className="text-sm md:text-base text-primary font-semibold">
                10% ops cost
                <br />
                <span className="text-xs md:text-sm text-muted">0% profit</span>
              </p>
            </motion.div>

            {/* Driver */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, x: 30 }}
              animate={prefersReduced ? {} : { opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
              className="card border-2 md:border-4 border-green-400/50 text-center p-4 md:p-6"
            >
              <div className="text-4xl md:text-6xl mb-3">👤</div>
              <h3 className="text-lg md:text-2xl font-black text-primary uppercase mb-2">
                Drivers
              </h3>
              <p className="text-sm md:text-base text-secondary">Earn 90%</p>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

// ==========================================
// COMPARISON SECTION
// ==========================================
function ComparisonSection() {
  const prefersReduced = usePrefersReducedMotion();
  const { comparison } = homepage;
  const [activeTab, setActiveTab] = useState("uberlyft");
  const [counters, setCounters] = useState({ drivers: 0, saved: 0 });

  // Animated counters
  useEffect(() => {
    const interval = setInterval(() => {
      setCounters((prev) => {
        const next = {
          drivers: Math.min(prev.drivers + 1, comparison.stats.drivers),
          saved: Math.min(prev.saved + 127, comparison.stats.saved),
        };
        if (
          next.drivers === comparison.stats.drivers &&
          next.saved === comparison.stats.saved
        ) {
          clearInterval(interval);
        }
        return next;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [comparison.stats]);

  const comparisonData = {
    uberlyft: {
      platform: "Uber / Lyft",
      rider: `$${comparison.fareUberLyft}`,
      driver: "$18",
      company: "$32",
      driverPct: "≈ 35% of rider payment",
      companyPct: "≈ 65% platform + fees",
      isApprox: true,
    },
    nela: {
      platform: "NELA Ride (20% cheaper)",
      rider: `$${comparison.fareNela}`,
      driver: `$${Math.round(comparison.fareNela * 0.9)}`,
      company: `$${Math.round(comparison.fareNela * 0.1)}`,
      driverPct: "90% of fare",
      companyPct: "10% ops cost",
      isApprox: false,
    },
  };

  const data = comparisonData[activeTab];
  const tabs = [
    { id: "uberlyft", label: "Uber/Lyft", color: "bg-red-500" },
    { id: "nela", label: "NELA Ride", color: "bg-green-500" },
  ];

  return (
    <Section variant="secondary">
      <Container>
        <SectionTitle title={comparison.title} subtitle={comparison.subtitle} />

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-6 md:px-8 py-3 md:py-4 rounded-2xl font-black uppercase text-base md:text-lg
                border-4 border-black transition-all
                ${
                  activeTab === tab.id
                    ? `${tab.color} text-white shadow-[4px_4px_0_0_rgba(0,0,0,1)]`
                    : "bg-tertiary border-subtle text-muted hover:border-medium"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={
              prefersReduced
                ? false
                : { opacity: 0, x: activeTab === "uberlyft" ? -50 : 50 }
            }
            animate={prefersReduced ? {} : { opacity: 1, x: 0 }}
            exit={
              prefersReduced
                ? {}
                : { opacity: 0, x: activeTab === "uberlyft" ? 50 : -50 }
            }
            transition={{ duration: 0.3 }}
            className="bg-tertiary border-4 border-black rounded-3xl p-8 md:p-12 max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-5xl font-black text-primary uppercase mb-2">
                {data.platform}
              </h3>
              <p className="text-secondary text-lg">
                A $
                {activeTab === "uberlyft"
                  ? comparison.fareUberLyft
                  : comparison.fareNela}{" "}
                ride breakdown
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {/* Rider Pays */}
              <div className="card border-4 border-amber-400/50 text-center">
                <div className="text-5xl mb-2">💰</div>
                <div className="text-5xl md:text-6xl font-black text-amber-400 mb-2">
                  {data.rider}
                </div>
                <div className="text-secondary font-bold uppercase text-sm">
                  Rider Pays
                </div>
              </div>

              {/* Company/Platform */}
              <div className="card border-4 border-medium text-center">
                <div className="text-5xl mb-2">
                  {activeTab === "uberlyft" ? "🚗" : "🛡️"}
                </div>
                <div className="text-5xl md:text-6xl font-black text-purple-400 mb-2 flex items-baseline justify-center gap-1">
                  {data.isApprox && (
                    <span className="text-3xl opacity-70">≈</span>
                  )}
                  <span>{data.company}</span>
                </div>
                <div className="text-secondary font-bold uppercase text-sm">
                  {activeTab === "uberlyft" ? "Platform Take" : "Ops Cost"}
                </div>
              </div>

              {/* Driver Gets */}
              <div className="card border-4 border-medium text-center">
                <div className="text-5xl mb-2">👤</div>
                <div
                  className={`text-5xl md:text-6xl font-black mb-2 flex items-baseline justify-center gap-1 ${
                    activeTab === "uberlyft" ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {data.isApprox && (
                    <span className="text-3xl opacity-70">≈</span>
                  )}
                  <span>{data.driver}</span>
                </div>
                <div className="text-secondary font-bold uppercase text-sm">
                  Driver Gets
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Impact Stats */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 30 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mt-16"
        >
          <div className="card border-4 border-purple-400/30 p-8 md:p-12">
            <h3 className="text-3xl md:text-4xl font-black text-primary text-center uppercase mb-8">
              Our Impact
            </h3>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-black gradient-text mb-2">
                  {counters.drivers}+
                </div>
                <div className="text-secondary font-bold uppercase">
                  Active Drivers
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-black gradient-text mb-2">
                  ${counters.saved.toLocaleString()}+
                </div>
                <div className="text-secondary font-bold uppercase">
                  Returned to Community
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

// ==========================================
// PROGRAM CARDS SECTION
// ==========================================
function ProgramCardsSection() {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <Section variant="primary">
      <Container>
        <SectionTitle
          title="Our Programs"
          subtitle="Practical tools that move money and power back into the community"
        />

        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program, i) => (
            <motion.article
              key={program.id}
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-full card border-4 border-black p-8 shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              <div className="text-5xl mb-4">{program.icon}</div>
              <h3 className="text-2xl font-bold text-primary mb-2">
                {program.title}
              </h3>
              <p className="text-sm font-semibold gradient-text mb-4">
                {program.tagline}
              </p>
              <p className="text-secondary mb-6">{program.description}</p>

              <div className="absolute bottom-2.5 right-2.5">
                <a
                  href={program.href}
                  aria-disabled={program.comingSoon}
                  target={program.comingSoon ? undefined : "_blank"}
                  rel={program.comingSoon ? undefined : "noopener noreferrer"}
                  onClick={(e) => program.comingSoon && e.preventDefault()}
                  className={`
                    inline-flex items-center px-6 py-3 rounded-full border-2 text-sm font-bold uppercase transition-all
                    ${
                      program.comingSoon
                        ? "border-subtle text-muted cursor-not-allowed animate-pulse"
                        : "border-medium text-primary hover:border-amber-400 hover:text-amber-400"
                    }
                  `}
                >
                  {program.comingSoon ? "Coming Soon" : "Learn More"}
                  {!program.comingSoon && (
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
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ==========================================
// STATS STRIP SECTION
// ==========================================
function StatsStripSection() {
  const prefersReduced = usePrefersReducedMotion();
  const { stats } = homepage;

  return (
    <Section variant="secondary">
      <Container>
        <SectionTitle
          title="What We Stand On"
          subtitle="Numbers that explain our values, not hide them"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={
                prefersReduced ? false : { opacity: 0, y: 14, scale: 0.98 }
              }
              whileInView={prefersReduced ? {} : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-black gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-primary font-extrabold uppercase tracking-wide mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-muted font-semibold">
                {stat.sublabel}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ==========================================
// CTA BANNER SECTION
// ==========================================
function CTABannerSection() {
  const prefersReduced = usePrefersReducedMotion();
  const { cta } = homepage;

  return (
    <Section variant="primary" className="text-center">
      {!prefersReduced && (
        <div className="absolute inset-0 animated-grid" aria-hidden="true" />
      )}

      <Container className="relative z-10">
        <motion.h2
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-6xl font-black text-primary mb-6"
        >
          {cta.title}
        </motion.h2>

        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-secondary mb-10 font-medium max-w-3xl mx-auto"
        >
          {cta.description}
        </motion.p>

        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href={cta.cta.href}
            className="btn-gradient inline-flex items-center"
          >
            {cta.cta.text}
            <svg
              className="w-5 h-5 ml-2"
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
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ComparisonSection />
      <ProgramCardsSection />
      <StatsStripSection />
      <CTABannerSection />
    </>
  );
}
