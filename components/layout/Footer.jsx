"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { siteMetadata, navigation } from "@/data/content";
import AnimatedBrand from "../ui/AnimatedBrand";
import { useLanguage } from "@/components/providers/LanguageProvider";

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
  const { t } = useLanguage();

  return (
    <footer className="relative bg-primary border-t border-white/10">
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
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-white text-2xl font-black uppercase tracking-tight">
              {/* {siteMetadata.name} */}
              <AnimatedBrand showLogo={false} />
            </h3>
            <p className="mt-3 text-white/75 font-semibold leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="mt-6">
              <a
                href="mailto:contact@hacigroup.org"
                className="text-sm font-bold text-white/50 hover:text-amber-400 transition-colors"
              >
                contact@hacigroup.org
              </a>
            </div>
          </div>

          {/* ---------- NAVIGATION ---------- */}
          <nav className="grid grid-cols-2 gap-8 text-sm">
            {/* Programs */}
            <div>
              <p className="text-secondary font-black uppercase tracking-wide mb-3 ">
                {t("footer.programs")}
              </p>
              <ul className="space-y-2">
                {[
                  { href: "/get-involved", label: t("nav.getInvolved") },
                  { href: "/donate", label: t("nav.donate") }
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-secondary hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Organization */}
            <div>
              <p className="text-secondary font-black uppercase tracking-wide mb-3">
                {t("footer.organization")}
              </p>
              <ul className="space-y-2">
                {[
                  { href: "/about", label: t("nav.about") },
                  { href: "/contact", label: t("nav.contact") }
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-secondary hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* ---------- BOTTOM BAR ---------- */}
        <div className="mt-12 pt-8 border-t border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs">
            © {year} {siteMetadata.name} — Nonprofit technology for neighbors.
          </p>
          <div className="flex items-center gap-4 text-xs">
            {[
              { href: "/privacy", label: t("footer.privacy") },
              { href: "/terms", label: t("footer.terms") },
              { href: "/cookies", label: t("footer.cookies") }
            ].map((item, i) => (
              <React.Fragment key={item.href}>
                {i > 0 && <span className="text-white/20">•</span>}
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
