"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function GlobeText({
  text = "Join the Movement",
  className = "",
}) {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const svg = (
    <svg
      viewBox="15 00 1000 300"
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <path id="globePath" d="M 80,200 Q 500,40 920,200" fill="none" />
      </defs>

      <text
        fontSize="60"
        letterSpacing="5"
        className={`font-bold select-none ${className}`}
        fill="currentColor" // FILLED text, no seams
        opacity="0.08" // very subtle, adjust as needed
      >
        <textPath
          href="#globePath"
          startOffset="50%"
          textAnchor="middle"
          textLength="820"
          lengthAdjust="spacingAndGlyphs"
        >
          {text}
        </textPath>
      </text>
    </svg>
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/5 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl">
        {prefersReduced ? (
          <div>{svg}</div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.div
              initial={{ x: -18 }}
              animate={{ x: 18 }}
              transition={{
                duration: 16,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              {svg}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
