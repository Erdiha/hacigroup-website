"use client";

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

export default function SectionTitle({
  title,
  subtitle,
  centered = true,
  gradient = false,
  className = "",
}) {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`
        ${centered ? "text-center" : ""}
        mb-12 md:mb-16
        ${className}
      `.trim()}
    >
      <h2
        className={`
          text-4xl sm:text-5xl lg:text-6xl 
          font-black uppercase
          ${gradient ? "gradient-text" : "text-primary"}
          mb-4
        `.trim()}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
