"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { siteMetadata, navigation } from "@/data/content";

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

export default function SiteFooter() {
  const prefersReduced = usePrefersReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0B1020] border-t border-white/10">
      {/* Subtle background animation */}
      {!prefersReduced && (
        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,92,246,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.25) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
          animate={{ backgroundPosition: ["0 0", "50px 50px"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_22%,_rgba(139,92,246,0.10)_0%,_transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_80%,_rgba(245,158,11,0.08)_0%,_transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* ---------- TOP: BRAND & STATEMENT ---------- */}
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="text-white text-2xl font-black uppercase tracking-tight">
              {siteMetadata.name}
            </h3>
            <p className="mt-3 text-white/75 font-semibold leading-relaxed">
              {siteMetadata.description}
            </p>
          </div>

          {/* ---------- NAVIGATION ---------- */}
          <nav className="grid grid-cols-2 gap-8 text-sm">
            {/* Programs */}
            <div>
              <p className="text-white/60 font-bold uppercase tracking-wide mb-3">
                Programs
              </p>
              <ul className="space-y-2">
                {navigation.footer.programs.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Organization */}
            <div>
              <p className="text-white/60 font-bold uppercase tracking-wide mb-3">
                Organization
              </p>
              <ul className="space-y-2">
                {navigation.footer.organization.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* ---------- NEWSLETTER ---------- */}
          <form
            action="/subscribe"
            method="post"
            className="bg-[#0f1528] border border-white/10 rounded-2xl p-4 sm:p-5"
          >
            <label
              htmlFor="email"
              className="block text-white font-bold uppercase text-xs tracking-wide mb-2"
            >
              Get updates (no spam, ever)
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@neighbor.net"
                className="w-full rounded-xl bg-[#0B1020] border border-white/20 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
              />
              <button
                type="submit"
                className="shrink-0 inline-flex items-center justify-center px-3 py-0 font-black text-white rounded-xl border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:-translate-x-px hover:-translate-y-px transition-all"
                style={{
                  backgroundImage: "linear-gradient(90deg, #8b5cf6, #f59e0b)",
                }}
              >
                Subscribe
              </button>
            </div>
            <p className="mt-2 text-[11px] text-white/50">
              We’ll email only when there’s real progress to share.
            </p>
          </form>
        </div>

        {/* ---------- BOTTOM BAR ---------- */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs">
            © {year} {siteMetadata.name} — Nonprofit technology for neighbors.
          </p>
          <div className="flex items-center gap-4 text-xs">
            {navigation.footer.legal.map((item, i) => (
              <React.Fragment key={item.href}>
                {i > 0 && <span className="text-white/20">•</span>}
                <Link
                  href={item.href}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
