"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  involvementPathways,
  faqs,
  getInvolvedContent as c,
} from "@/data/content";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  ApplicationModal,
  VolunteerForm,
} from "@/components/ui/ApplicationModal";
import GetInvolvedBackground from "@/components/ui/GetInvolvedBackground";

const safeTimestamp = (value) => {
  if (!value) return 0;
  if (typeof value?.toDate === "function") {
    return value.toDate().getTime();
  }
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? 0 : time;
};

export default function GetInvolvedPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [positions, setPositions] = useState([]);
  const [positionsLoading, setPositionsLoading] = useState(true);
  const [positionsError, setPositionsError] = useState("");
  const [selectedPosition, setSelectedPosition] = useState(null);

  useEffect(() => {
    async function loadPositions() {
      try {
        setPositionsError("");
        const snapshot = await getDocs(collection(db, "positions"));
        const data = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort(
            (a, b) => safeTimestamp(b.createdAt) - safeTimestamp(a.createdAt)
          );
        setPositions(data);
      } catch (error) {
        console.error("Error loading positions:", error);
        setPositionsError(
          "Unable to load open positions right now. Please try again later."
        );
      } finally {
        setPositionsLoading(false);
      }
    }
    loadPositions();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1020] relative overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <GetInvolvedBackground />
        {/* Dark overlay to make animation more subtle */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto text-center z-10 px-4">
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
      <Section variant="secondary">
        <Container>
          <SectionTitle
            title="Open Positions"
            subtitle="Specific roles we're actively recruiting for right now."
          />

          {positionsError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-200 rounded-2xl px-4 py-3 mb-6 text-sm">
              {positionsError}
            </div>
          )}

          {positionsLoading ? (
            <p className="text-center text-white/60 py-10">
              Loading opportunities...
            </p>
          ) : positions.length === 0 ? (
            <div className="text-center text-white/60 py-12">
              <p className="text-lg font-semibold mb-2">
                No open positions right now
              </p>
              <p className="text-sm text-white/50">
                Submit the volunteer interest form below and we&apos;ll reach
                out when something is a good fit.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {positions.map((position, i) => (
                <motion.div
                  key={position.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-[#161b22] border-2 border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all flex flex-col gap-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-5xl">{position.icon || "💼"}</div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs font-bold px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
                        {position.type || "Role"}
                      </span>
                      <span className="text-xs text-white/60">
                        📍 {position.location || "Remote"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {position.title}
                    </h3>
                    <p className="text-purple-400 text-sm font-semibold mb-3">
                      {position.commitment || "Flexible"}
                    </p>
                    <p className="text-white/70 text-sm leading-relaxed mb-3">
                      {position.description}
                    </p>
                  </div>

                  {Array.isArray(position.skills) &&
                    position.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {position.skills.map((skill, idx) => (
                          <span
                            key={position.id + '-' + idx}
                            className="text-xs px-2 py-1 bg-white/5 text-white/70 rounded-full border border-white/10"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                  <button
                    onClick={() => setSelectedPosition(position)}
                    className="w-full mt-auto px-4 py-3 bg-gradient-to-r from-purple-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/40 transition-all"
                  >
                    Apply Now
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </Container>
      </Section>
      <VolunteerForm anchorId="volunteer" />

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
                key={faq.question + '-' + i}
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
      <AnimatePresence>
        {selectedPosition && (
          <ApplicationModal
            position={selectedPosition}
            onClose={() => setSelectedPosition(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
