"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AnimatedBrand({
  showLogo,
  showText = true,
  size = 48,
  glow = true,
  animate = true,
  hover = true,
  className = "",
}) {
  const glowFilter = glow
    ? "drop-shadow(0 0 18px rgba(245,158,11,0.4))"
    : "none";

  return (
    <motion.div
      className={`flex items-center gap-1 font-semibold tracking-tight select-none ${className}`}
      initial={animate ? { opacity: 0, scale: 0.9, filter: "none" } : false}
      animate={animate ? { opacity: 1, scale: 1, filter: glowFilter } : false}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={hover ? { scale: 1.03 } : {}}
    >
      {/* Logo */}
      {showLogo && (
        <motion.div
          className="relative rounded-full bg-black/10 flex items-center justify-center overflow-hidden aspect-square border border-white"
          initial={animate ? { rotate: -10, opacity: 0, scale: 0.6 } : false}
          animate={animate ? { rotate: 0, opacity: 1, scale: 1 } : false}
          transition={{ delay: 0.1, duration: 0.4 }}
          style={{ width: size, height: size }}
        >
          <Image
            src="/logo.png"
            alt="HaciGroup Logo"
            width={size}
            height={size}
            className="object-contain rounded-full bg-transparent"
          />
        </motion.div>
      )}

      {/* Brand Text */}
      {showText && (
        <motion.div
          className="relative overflow-hidden text-xl"
          initial={animate ? { clipPath: "inset(0 100% 0 0)" } : false}
          animate={animate ? { clipPath: "inset(0 0% 0 0)" } : false}
          transition={{ delay: 0.25, duration: 0.55, ease: "easeOut" }}
        >
          <span className="whitespace-nowrap">
            <span style={{ color: "rgb(var(--brand-amber))" }}>Haci</span>
            <span className="text-white">Group</span>
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
