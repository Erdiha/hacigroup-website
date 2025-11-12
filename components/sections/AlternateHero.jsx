"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroNetwork() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [cursor, setCursor] = useState({ x: -9999, y: -9999 });
  const [prefersReduced, setPrefersReduced] = useState(false);

  // Detect reduced-motion safely on the client
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReduced(mq.matches);
    update();
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  // Canvas network (skipped if reduced motion)
  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = Math.max(container.clientHeight, 600));

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const base = 70;
    const nodeCount = Math.min(
      160,
      Math.max(48, Math.floor((width * height) / 18000 + base))
    );
    const maxSpeed = 0.25;
    const linkDist = Math.min(180, Math.max(90, Math.sqrt(width * height) / 9));
    const hoverRadius = Math.min(160, Math.max(80, linkDist * 0.9));

    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * maxSpeed,
      vy: (Math.random() - 0.5) * maxSpeed,
      r: 1.6 + Math.random() * 1.8,
      baseR: 1.6 + Math.random() * 1.8,
    }));

    let rafId = 0;
    let mouse = { x: -9999, y: -9999 };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      setCursor({ x: e.clientX, y: e.clientY });
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      setCursor({ x: -9999, y: -9999 });
    };

    const onResize = () => {
      width = canvas.width = container.clientWidth;
      height = canvas.height = Math.max(container.clientHeight, 600);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Links
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            const alpha = 0.12 * (1 - dist / linkDist);
            ctx.strokeStyle = `rgba(167, 139, 250, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const mDist = Math.hypot(mdx, mdy);
        const inHover = mDist < hoverRadius;
        const targetR = inHover
          ? n.baseR + 2.5 * (1 - mDist / hoverRadius)
          : n.baseR;
        n.r += (targetR - n.r) * 0.12;

        const nodeAlpha = inHover ? 0.9 : 0.65;
        ctx.fillStyle = `rgba(251, 191, 36, ${nodeAlpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(124, 58, 237, 0.8)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(0.8, n.r * 0.35), 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [prefersReduced]);

  // Framer Motion variants for subtle load-in (no syntax errors)
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  const stagger = {
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0B1020]"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0B1020] via-[#0b1224] to-[#0f1528] opacity-90" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Cursor-following gradient glow */}
      {!prefersReduced && (
        <div
          aria-hidden
          style={{
            left: cursor.x - 200,
            top: cursor.y - 200,
            transform: "translateZ(0)",
            background:
              "radial-gradient(200px 200px at center, rgba(139,92,246,0.20), rgba(245,158,11,0.10) 60%, rgba(15,21,40,0) 70%)",
          }}
          className="pointer-events-none absolute z-10 h-[400px] w-[400px] rounded-full mix-blend-screen will-change-transform"
        />
      )}

      {/* Content */}
      <motion.div
        className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm mb-8"
          variants={item}
        >
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-white/80">
            Building Technology for Social Good
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white"
          variants={containerVariants}
        >
          Empowering Communities
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-amber-400 to-purple-400 bg-clip-text text-transparent">
            Through Technology
          </span>
        </motion.h1>

        <motion.p
          className="mx-auto max-w-3xl text-lg sm:text-xl text-white/70 mb-10 leading-relaxed"
          variants={item}
        >
          HaciGroup is a nonprofit innovation hub building equitable platforms
          that put people first. From driver‑centric rideshare to accessible
          home services, we’re reimagining essentials with transparency,
          dignity, and community at the core.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={item}
        >
          <Link
            href="/programs"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40"
            style={{
              backgroundImage: "linear-gradient(90deg, #8b5cf6, #f59e0b)",
            }}
          >
            <span className="relative z-10">Explore Our Programs</span>
          </Link>
          <Link
            href="/impact"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/20 rounded-full hover:bg:white/5 hover:border-white/30 transition-all"
          >
            See Our Impact
            <svg
              className="ml-2 w-5 h-5"
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

        <motion.div
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
          variants={item}
        >
          {[
            { value: "2", label: "Active Programs" },
            { value: "100%", label: "Nonprofit Model" },
            { value: "∞", label: "Community Impact" },
          ].map((s) => (
            <motion.div key={s.label} className="text-center" variants={item}>
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent mb-2">
                {s.value}
              </div>
              <div className="text-sm text-white/60">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 0.8 },
          y: { duration: 2, repeat: Infinity },
        }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
          <div className="w-1 h-3 bg-white/50 rounded-full mx-auto" />
        </div>
      </motion.div>
    </section>
  );
}
