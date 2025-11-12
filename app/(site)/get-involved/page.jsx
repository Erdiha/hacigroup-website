"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  involvementPathways,
  faqs,
  getInvolvedContent as c,
} from "@/data/content";

export default function GetInvolvedPage() {
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <div className="min-h-screen bg-[#0B1020]">
      {/* ---------- HERO ---------- */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(245,158,11,0.12)_0%,transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-6 py-3 mb-8"
          >
            <span className="text-4xl">{c.hero.badgeIcon}</span>
            <span className="text-white font-bold">{c.hero.badgeText}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6"
            style={{
              textShadow: "3px 3px 0px #8b5cf6, 6px 6px 0px #f59e0b",
              WebkitTextStroke: "2px black",
            }}
          >
            {c.hero.titleTop}
            <br />
            <span className="bg-linear-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
              {c.hero.titleGradient}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-3xl mx-auto mb-12"
          >
            {c.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href={c.hero.ctas.primary.href}
              className="inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-purple-500 to-amber-500 text-white font-black rounded-full border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all uppercase"
            >
              {c.hero.ctas.primary.label}
            </Link>
            <Link
              href={c.hero.ctas.secondary.href}
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/20 transition-all"
            >
              {c.hero.ctas.secondary.label}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ---------- WAYS ---------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f1528]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-white text-center mb-4 uppercase">
            {c.ways.title}
          </h2>
          <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
            {c.ways.subtitle}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {involvementPathways.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-[#161b22] border-2 border-white/10 rounded-2xl p-8 hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-6xl mb-3">{p.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {p.title}
                    </h3>
                    <p className="text-amber-400 text-sm font-semibold">
                      {p.tagline}
                    </p>
                  </div>
                </div>
                <p className="text-white/80 mb-6">{p.description}</p>
                <div className="space-y-2 mb-6">
                  {p.benefits.map((b) => (
                    <div
                      key={b}
                      className="flex items-center gap-2 text-sm text-white/70"
                    >
                      <span className="text-green-400">✓</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={p.href}
                  className="block w-full px-6 py-3 bg-linear-to-r from-purple-500 to-amber-500 text-white font-bold text-center rounded-xl hover:scale-105 transition-all"
                >
                  {p.cta} →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WHY ---------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-6 uppercase">
            {c.why.title}
          </h2>
          <p className="text-xl text-white/80 mb-12 leading-relaxed max-w-3xl mx-auto">
            {c.why.blurb}
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {c.why.pillars.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#161b22] border-2 border-white/10 rounded-2xl p-6"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-white/70 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- HOW ---------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f1528]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black text-white text-center mb-12 uppercase">
            {c.how.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {c.how.steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-linear-to-r from-purple-500 to-amber-500 rounded-full flex items-center justify-center text-3xl font-black text-white mx-auto mb-4 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-white/70 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-white text-center mb-12 uppercase">
            {c.faqsTitle}
          </h2>
          <div className="space-y-4">
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
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-white font-bold pr-4">
                    {faq.question}
                  </span>
                  <span className="text-white/50 text-2xl shrink-0">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 pt-3 border-t-2 border-white/10">
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

      {/* ---------- FINAL CTA ---------- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-[#0f1528] to-[#0B1020] text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-7xl mb-6">{c.finalCta.icon}</div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 uppercase">
            {c.finalCta.title}
          </h2>
          <p className="text-xl text-white/70 mb-8">{c.finalCta.blurb}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={c.finalCta.buttons.primary.href}
              className="inline-flex items-center justify-center px-10 py-5 bg-linear-to-r from-purple-500 to-amber-500 text-white font-black rounded-full border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all uppercase text-lg"
            >
              {c.finalCta.buttons.primary.label}
            </Link>
            <Link
              href={c.finalCta.buttons.secondary.href}
              className="inline-flex items-center justify-center px-10 py-5 bg-white text-[#0B1020] font-black rounded-full border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all uppercase text-lg"
            >
              {c.finalCta.buttons.secondary.label}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
