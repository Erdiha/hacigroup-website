"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  involvementPathways,
  faqs,
  getInvolvedContent as c,
} from "@/data/content";
import GlobeText from "@/components/ui/GlobeText";

export default function GetInvolvedPage() {
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <div className="min-h-screen bg-[#0B1020]">
      {/* Hero */}
      <section className="relative py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Globe Text Background Animation */}
        <GlobeText text="Join the Movement" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(245,158,11,0.12)_0%,transparent_50%)]" />
        <div className="relative max-w-5xl mx-auto text-center">
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8"
          >
            <span className="text-2xl sm:text-3xl lg:text-4xl">
              {c.hero.badgeIcon}
            </span>
            <span className="text-white font-bold text-sm sm:text-base">
              {c.hero.badgeText}
            </span>
          </motion.div> */}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight px-4"
          >
            {c.hero.titleTop}
            <br />
            <span className="bg-linear-to-r from-purple-400 via-amber-400 to-purple-400 bg-clip-text text-transparent">
              {c.hero.titleGradient}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4"
          >
            {c.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
          >
            <Link
              href={c.hero.ctas.primary.href}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white rounded-xl border-2 border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/40 transition-all"
            >
              {c.hero.ctas.primary.label}
            </Link>
            <Link
              href={c.hero.ctas.secondary.href}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white rounded-xl border-2 border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-500/70 transition-all"
            >
              {c.hero.ctas.secondary.label}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Ways to Get Involved */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#0f1528]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-3 sm:mb-4">
            {c.ways.title}
          </h2>
          <p className="text-white/70 text-center mb-10 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
            {c.ways.subtitle}
          </p>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {involvementPathways.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-[#161b22] border-2 border-white/10 rounded-2xl p-6 sm:p-8 hover:border-purple-500/50 transition-all"
              >
                <div className="mb-6">
                  <div className="text-5xl sm:text-6xl mb-3">{p.icon}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    {p.title}
                  </h3>
                  <p className="text-purple-400 text-xs sm:text-sm font-semibold">
                    {p.tagline}
                  </p>
                </div>
                <p className="text-white/80 mb-6 text-sm sm:text-base leading-relaxed">
                  {p.description}
                </p>
                <div className="space-y-2 mb-6">
                  {p.benefits.map((b) => (
                    <div
                      key={b}
                      className="flex items-center gap-2 text-xs sm:text-sm text-white/70"
                    >
                      <span className="text-purple-400 shrink-0">✓</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={p.href}
                  className="block w-full px-6 py-3 bg-linear-to-r from-purple-500 to-amber-500 text-white font-bold text-center rounded-xl hover:opacity-90 transition-all text-sm sm:text-base"
                >
                  {p.cta} →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            {c.why.title}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-10 sm:mb-12 leading-relaxed max-w-3xl mx-auto">
            {c.why.blurb}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
            {c.why.pillars.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#161b22] border-2 border-white/10 rounded-2xl p-6"
              >
                <div className="text-4xl sm:text-5xl mb-4">{item.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#0f1528]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-10 sm:mb-12">
            {c.how.title}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {c.how.steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-linear-to-r from-purple-500 to-amber-500 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-black text-white mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-10 sm:mb-12">
            {c.faqsTitle}
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {faqs.general.map((faq, i) => (
              <motion.div
                key={`${faq.question}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#161b22] border-2 border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-5 sm:px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-white font-bold pr-4 text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <span className="text-white/50 text-xl sm:text-2xl shrink-0">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 sm:px-6 pb-4 pt-3 border-t-2 border-white/10">
                    <p className="text-white/70 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-[#0f1528] to-[#0B1020] text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-5xl sm:text-6xl lg:text-7xl mb-6">
            {c.finalCta.icon}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            {c.finalCta.title}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/70 mb-8 leading-relaxed">
            {c.finalCta.blurb}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href={c.finalCta.buttons.primary.href}
              className="inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold text-white rounded-xl border-2 border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-500/70 transition-all"
            >
              {c.finalCta.buttons.primary.label}
            </Link>
            <Link
              href={c.finalCta.buttons.secondary.href}
              className="inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold text-white rounded-xl border-2 border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/40 transition-all"
            >
              {c.finalCta.buttons.secondary.label}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
