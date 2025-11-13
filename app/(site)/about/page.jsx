//TODO - renew this page to make it unified as other opages colros statemsnt everythign ahs to be purpsoefull ready for deploy and real data

"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { team, foundingStory, storyPanels, programs } from "@/data/content";

export default function AboutPage() {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReduced(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1020]">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(245,158,11,0.12)_0%,transparent_50%)]" />
        {!prefersReduced && (
          <motion.div
            aria-hidden
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(139,92,246,0.25) 1px, transparent 1px),linear-gradient(90deg, rgba(139,92,246,0.25) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
            animate={{ backgroundPosition: ["0 0", "50px 50px"] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          />
        )}

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.h1
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 uppercase leading-tight"
          >
            Our Story
          </motion.h1>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Building Technology That Works For Everyone
          </motion.p>

          {/* Founding Story (from data) */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-[#0f1528] border-2 border-white/10 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-linear-to-r from-purple-500 to-amber-500 rounded-full flex items-center justify-center border-2 border-white/20 relative">
                    <span className="absolute -top-2 -left-2 text-xs text-white/50 font-semibold">
                      since
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-white">
                      {foundingStory.year}
                    </span>
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {foundingStory.title}
                  </h3>
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                    {foundingStory.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Story Panels */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#0f1528]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-3 sm:mb-4">
            Our Journey
          </h2>
          <p className="text-white/70 text-center mb-10 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
            The story of how we&apos;re building a better alternative
          </p>

          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {storyPanels.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPanel(index)}
                className={`h-2 rounded-full transition-all ${
                  currentPanel === index
                    ? "bg-linear-to-r from-purple-500 to-amber-500 w-12"
                    : "bg-white/20 hover:bg-white/40 w-2"
                }`}
                aria-label={`Go to panel ${index + 1}`}
              />
            ))}
          </div>

          <motion.div
            key={currentPanel}
            initial={prefersReduced ? false : { opacity: 0, x: 100 }}
            animate={prefersReduced ? {} : { opacity: 1, x: 0 }}
            exit={prefersReduced ? {} : { opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className={`relative bg-linear-to-br ${storyPanels[currentPanel].bgColor} border-2 border-white/10 rounded-2xl p-8 sm:p-12 min-h-[400px] sm:min-h-[500px] flex flex-col items-center justify-center text-center`}
          >
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-r from-purple-500 to-amber-500 rounded-full flex items-center justify-center font-black text-lg sm:text-2xl text-white border-2 border-white/20">
              {currentPanel + 1}
            </div>
            <motion.div
              initial={prefersReduced ? false : { scale: 0 }}
              animate={prefersReduced ? {} : { scale: 1 }}
              transition={{ delay: 0.1, type: "spring", bounce: 0.5 }}
              className="text-6xl sm:text-8xl lg:text-9xl mb-6"
            >
              {storyPanels[currentPanel].illustration}
            </motion.div>
            <motion.h3
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 uppercase"
            >
              {storyPanels[currentPanel].title}
            </motion.h3>
            <motion.div
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={prefersReduced ? {} : { opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 border border-white/20 rounded-xl px-6 py-3 mb-4 max-w-2xl"
            >
              <p className="text-lg sm:text-xl text-amber-300 font-semibold">
                {storyPanels[currentPanel].caption}
              </p>
            </motion.div>
            <motion.p
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={prefersReduced ? {} : { opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed"
            >
              {storyPanels[currentPanel].description}
            </motion.p>

            <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 flex justify-between px-3 sm:px-4">
              <button
                onClick={() => setCurrentPanel(Math.max(0, currentPanel - 1))}
                disabled={currentPanel === 0}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/80 hover:bg-purple-500 rounded-full flex items-center justify-center font-bold text-xl sm:text-2xl text-white disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 transition-all border-2 border-white/20"
                aria-label="Previous panel"
              >
                ←
              </button>
              <button
                onClick={() =>
                  setCurrentPanel(
                    Math.min(storyPanels.length - 1, currentPanel + 1)
                  )
                }
                disabled={currentPanel === storyPanels.length - 1}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/80 hover:bg-purple-500 rounded-full flex items-center justify-center font-bold text-xl sm:text-2xl text-white disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 transition-all border-2 border-white/20"
                aria-label="Next panel"
              >
                →
              </button>
            </div>
          </motion.div>

          <p className="text-center text-white/40 text-xs sm:text-sm mt-4">
            {currentPanel + 1} of {storyPanels.length}
          </p>
        </div>
      </section>

      {/* What We're Building */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-3 sm:mb-4"
          >
            What We&apos;re Building
          </motion.h2>
          <p className="text-center text-white/70 text-sm sm:text-base lg:text-lg mb-10 sm:mb-12 max-w-2xl mx-auto">
            Two platforms proving that nonprofit tech can work
          </p>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {programs.map((p, i) => (
              <motion.div
                key={p.id}
                initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group bg-linear-to-br ${p.color} border-2 border-white/20 rounded-2xl p-6 sm:p-8 hover:border-white/40 transition-all relative`}
              >
                {p.comingSoon && (
                  <span className="absolute top-4 right-4 text-white rounded-full bg-black/50 px-3 py-1 font-semibold text-xs">
                    COMING SOON
                  </span>
                )}
                <div className="relative z-10">
                  <div className="text-5xl sm:text-6xl mb-4">{p.icon}</div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {p.title}
                  </h3>
                  <p className="text-white/90 font-semibold mb-3 text-sm">
                    {p.tagline}
                  </p>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6">
                    {p.description}
                  </p>
                  {p.comingSoon ? (
                    <div className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-5 py-2.5 rounded-xl text-sm border border-white/20">
                      {p.status}
                    </div>
                  ) : (
                    <Link
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-2.5 rounded-xl transition-all text-sm border border-white/20"
                    >
                      Learn More →
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Profiles Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#0f1528]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-3 sm:mb-4"
          >
            Meet The Team
          </motion.h2>
          <p className="text-center text-white/70 text-sm sm:text-base mb-10 sm:mb-12 max-w-2xl mx-auto">
            The people building community-owned technology
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {team.leadership.map((m, idx) => (
              <motion.div
                key={m.email ?? idx}
                initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#161b22] border-2 border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all text-center"
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full bg-linear-to-br from-purple-500 to-amber-500 p-1">
                  <div className="w-full h-full rounded-full bg-[#161b22] flex items-center justify-center text-5xl sm:text-6xl">
                    {m.image}
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{m.name}</h3>
                <p className="text-purple-400 font-semibold mb-3 text-sm">{m.title}</p>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  {m.bio}
                </p>
                {m.linkedin && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors text-sm font-semibold"
                  >
                    <span>🔗</span>
                    <span>LinkedIn</span>
                  </a>
                )}
              </motion.div>
            ))}
          </div>

          {/* Advisory/Supporting Roles */}
          <div className="border-t border-white/10 pt-10 sm:pt-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">
              Advisory & Support
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {team.advisory.map((a, i) => (
                <motion.div
                  key={a.role}
                  initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                  whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#161b22] border border-white/10 rounded-xl p-5 text-center"
                >
                  <div className="text-3xl sm:text-4xl mb-3">{a.icon}</div>
                  <h4 className="text-base sm:text-lg font-bold text-white mb-2">
                    {a.role}
                  </h4>
                  <p className="text-white/60 text-sm">{a.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 sm:mt-12 text-center"
          >
            <Link
              href="/volunteer"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white rounded-xl border-2 border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-500/70 transition-all"
            >
              Join Our Team
            </Link>
          </motion.div>
        </div>
      </section>

      {/* The Mission */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, scale: 0.95 }}
            whileInView={prefersReduced ? {} : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-linear-to-br from-purple-600/90 to-amber-600/90 border-2 border-white/20 rounded-2xl p-8 sm:p-12"
          >
            <div className="text-5xl sm:text-6xl mb-6">⚡</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Technology Should Serve People, Not Extract From Them
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed">
              That&apos;s our entire mission. That&apos;s why we exist.
              That&apos;s what keeps us building.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-[#0f1528] to-[#0B1020]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl sm:text-7xl mb-6">🤝</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Join The Movement
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/70 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
              Whether you code, organize, or just believe in fairer
              tech—there&apos;s a place for you here.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/get-involved"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white rounded-xl border-2 border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-500/70 transition-all"
              >
                Get Involved
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white rounded-xl border-2 border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/40 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
