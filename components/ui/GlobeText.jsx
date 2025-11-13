"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * GlobeText - Text that curves along an invisible globe's surface
 * Static curved text with subtle fade-in animation on page load
 *
 * IMPORTANT: This component is absolutely positioned and does NOT affect layout.
 * Place it inside a container with position: relative and overflow: hidden.
 *
 * @param {string} text - The text to display
 * @param {string} className - Additional CSS classes for text styling
 */
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

  // Skip animation if reduced motion is preferred
  if (prefersReduced) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl">
        <motion.svg
          viewBox="0 0 1000 300"
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
        >
          <defs>
            {/* Define the curved path - arc that simulates globe surface */}
            <path id="globePath" d="M 100,200 Q 500,50 900,200" fill="none" />
          </defs>

          {/* Text follows the curved path */}
          <text
            className={`font-black fill-white/10 select-none ${className}`}
            fontSize="80"
            letterSpacing="8"
          >
            <textPath href="#globePath" startOffset="50%" textAnchor="middle">
              {text}
            </textPath>
          </text>
        </motion.svg>
      </div>
    </div>
  );
}
