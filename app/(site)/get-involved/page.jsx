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
import { useLanguage } from "@/components/providers/LanguageProvider";

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
  const [expandedCards, setExpandedCards] = useState({});
  const { t, language } = useLanguage();

  // Helper to get localized field
  const getLocalized = (item, field) => {
    if (!item) return "";
    // If current language is default (en), return base field
    if (language === "en") return item[field];
    // Otherwise try to find localized field (e.g. title_es)
    const localizedValue = item[`${field}_${language}`];
    // Fallback to base field if localized is empty
    return localizedValue || item[field];
  };

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
          t("common.error")
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
            {t("getInvolved.hero.titleTop")}
            <br />
            <span className="bg-linear-to-r from-purple-400 via-amber-400 to-purple-400 bg-clip-text text-transparent">
              {t("getInvolved.hero.titleGradient")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4"
          >
            {t("getInvolved.hero.subtitle")}
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
              {t("getInvolved.hero.ctaPrimary")}
            </Link>
            <Link
              href={c.hero.ctas.secondary.href}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white rounded-xl border-2 border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-500/70 transition-all"
            >
              {t("getInvolved.hero.ctaSecondary")}
            </Link>
          </motion.div>
        </div>
      </section>
      <Section variant="secondary">
        <Container>
          <SectionTitle
            title={t("getInvolved.positions.title")}
            subtitle={t("getInvolved.positions.subtitle")}
          />

          {positionsError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-200 rounded-2xl px-4 py-3 mb-6 text-sm">
              {positionsError}
            </div>
          )}

          {positionsLoading ? (
            <p className="text-center text-white/60 py-10">
              {t("getInvolved.positions.loading")}
            </p>
          ) : positions.length === 0 ? (
            <div className="text-center text-white/60 py-12">
              <p className="text-lg font-semibold mb-2">
                {t("getInvolved.positions.empty")}
              </p>
              <p className="text-sm text-white/50">
                {t("getInvolved.positions.emptyDesc")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {positions.map((position, i) => {
                const isExpanded = expandedCards[position.id];
                const description = getLocalized(position, "description") || "No description provided.";
                const shouldTruncate = description.length > 100;
                const displayDescription = isExpanded || !shouldTruncate 
                  ? description 
                  : description.substring(0, 100) + "...";

                return (
                  <motion.div
                    key={position.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-[#161b22] border-2 border-white/10 rounded-xl p-5 hover:border-purple-500/50 transition-all flex flex-col gap-3.5"
                  >
                    {/* Header with icon and badges */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xl font-bold text-white mb-2 pr-8 group-hover:text-purple-400 transition-colors leading-tight">
                          {getLocalized(position, "title") || "Untitled Position"}
                        </h4>
                        <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-white/60">
                          <span className="flex items-center gap-1">
                            💼 {getLocalized(position, "type") || "Role"}
                          </span>
                          <span className="flex items-center gap-1">
                            📍 {getLocalized(position, "location") || t("getInvolved.positions.location")}
                          </span>
                          {getLocalized(position, "commitment") && (
                            <span className="flex items-center gap-1">
                              ⏱️ {getLocalized(position, "commitment")}
                            </span>
                          )}
                        </div>
                      </div>

                    {/* Description with expand/collapse */}
                    <div className="flex-grow">
                      <p className="text-white/70 text-[10px] leading-relaxed">
                        {displayDescription}
                      </p>
                      {shouldTruncate && (
                        <button
                          onClick={() => setExpandedCards(prev => ({
                            ...prev,
                            [position.id]: !prev[position.id]
                          }))}
                          className="text-purple-400 text-[10px] font-semibold mt-0.5 hover:text-purple-300 transition-colors"
                        >
                          {isExpanded ? t("common.showLess") : t("common.readMore")}
                        </button>
                      )}
                    </div>

                    {/* Skills */}
                    {Array.isArray(position.skills) &&
                      position.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {position.skills.slice(0, 3).map((skill, idx) => (
                            <span
                              key={position.id + '-' + idx}
                              className="text-[9px] px-1.5 py-0.5 bg-white/5 text-white/70 rounded-full border border-white/10"
                            >
                              {skill}
                            </span>
                          ))}
                          {position.skills.length > 3 && (
                            <span className="text-[9px] px-1.5 py-0.5 text-white/50">
                              +{position.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                    {/* Apply button */}
                    <button
                      onClick={() => setSelectedPosition(position)}
                      className="w-full px-3 py-2 bg-gradient-to-r from-purple-500 to-amber-500 text-white text-xs font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/40 transition-all"
                    >
                      {t("common.applyNow")}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </Container>
      </Section>
      <VolunteerForm anchorId="volunteer" />

      {/* Why It Matters */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            {t("getInvolved.why.title")}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-10 sm:mb-12 leading-relaxed max-w-3xl mx-auto">
            {t("getInvolved.why.description")}
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
                  {t(`getInvolved.why.p${i + 1}Title`)}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {t(`getInvolved.why.p${i + 1}Desc`)}
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
            {t("getInvolved.how.title")}
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
                  {t(`getInvolved.how.s${i + 1}Title`)}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {t(`getInvolved.how.s${i + 1}Desc`)}
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
            {t("getInvolved.faq.title")}
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
            {t("getInvolved.cta.title")}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/70 mb-8 leading-relaxed">
            {t("getInvolved.cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href={c.finalCta.buttons.primary.href}
              className="inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold text-white rounded-xl border-2 border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-500/70 transition-all"
            >
              {t("getInvolved.cta.primary")}
            </Link>
            <Link
              href={c.finalCta.buttons.secondary.href}
              className="inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold text-white rounded-xl border-2 border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/40 transition-all"
            >
              {t("getInvolved.cta.secondary")}
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
