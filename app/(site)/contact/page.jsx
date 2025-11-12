// File: app/contact/page.jsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefers(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return prefers;
}

export default function ContactPage() {
  const prefersReduced = usePrefersReducedMotion();
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    // Honeypot: abort if filled
    if (form.elements["website"].value) return;

    setStatus({ state: "loading", msg: "Sending..." });
    try {
      const payload = {
        name: form.elements["name"].value,
        email: form.elements["email"].value,
        reason: form.elements["reason"].value,
        message: form.elements["message"].value,
      };
      // TODO: create /api/contact to forward to email/CRM
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus({ state: "success", msg: "Thanks — we’ll reply soon." });
      form.reset();
    } catch {
      setStatus({
        state: "error",
        msg: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <main className="relative min-h-[80vh] bg-[#0B1020] overflow-hidden">
      {/* ambient glows + slow grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(139,92,246,0.12)_0%,transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_78%,rgba(245,158,11,0.10)_0%,transparent_50%)]" />
      {!prefersReduced && (
        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,92,246,0.25) 1px, transparent 1px),linear-gradient(90deg, rgba(139,92,246,0.25) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
          animate={{ backgroundPosition: ["0 0", "50px 50px"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        />
      )}

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-6xl font-black text-white uppercase">
            Contact HaciGroup
          </h1>
          <p className="mt-4 text-white/75 text-lg sm:text-xl">
            We’re building nonprofit tech with neighbors. Reach out — we
            actually read these.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="lg:col-span-2 bg-[#0f1528] border border-white/10 rounded-2xl p-6 sm:p-8"
          >
            <form onSubmit={onSubmit} className="space-y-5">
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="block text-white/70 text-sm font-semibold mb-2">
                    Your Name
                  </span>
                  <input
                    name="name"
                    required
                    placeholder="Rosa Delgado"
                    className="w-full rounded-xl bg-[#0B1020] border border-white/20 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
                  />
                </label>
                <label className="block">
                  <span className="block text-white/70 text-sm font-semibold mb-2">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@neighbor.net"
                    className="w-full rounded-xl bg-[#0B1020] border border-white/20 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
                  />
                </label>
              </div>

              <label className="block">
                <span className="block text-white/70 text-sm font-semibold mb-2">
                  Reason
                </span>
                <select
                  name="reason"
                  defaultValue="General question"
                  className="w-full rounded-xl bg-[#0B1020] border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white/40"
                >
                  <option>General question</option>
                  <option>Volunteer</option>
                  <option>Partnership</option>
                  <option>Press / Media</option>
                  <option>Donation / Sponsorship</option>
                </select>
              </label>

              <label className="block">
                <span className="block text-white/70 text-sm font-semibold mb-2">
                  Message
                </span>
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell us a bit about what you have in mind."
                  className="w-full rounded-xl bg-[#0B1020] border border-white/20 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
                />
              </label>

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <p className="text-white/50 text-xs">
                  We’ll never sell your info. Replies typically within 2–3
                  business days.
                </p>
                <button
                  type="submit"
                  disabled={status.state === "loading"}
                  className="shrink-0 inline-flex items-center justify-center px-6 py-3 font-black text-white rounded-xl border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:-translate-x-px hover:-translate-y-px transition-all"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #8b5cf6, #f59e0b)",
                  }}
                >
                  {status.state === "loading" ? "Sending…" : "Send Message"}
                </button>
              </div>

              {status.state !== "idle" && (
                <div
                  className={`mt-3 rounded-lg px-4 py-3 text-sm font-semibold ${
                    status.state === "success"
                      ? "bg-green-500/15 border border-green-500/30 text-green-300"
                      : status.state === "error"
                      ? "bg-red-500/15 border border-red-500/30 text-red-300"
                      : "bg-white/10 border border-white/20 text-white/70"
                  }`}
                >
                  {status.msg}
                </div>
              )}
            </form>
          </motion.div>

          {/* Sidebar: direct info */}
          <motion.aside
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="bg-[#0f1528] border border-white/10 rounded-2xl p-6 sm:p-8"
          >
            <h2 className="text-white text-xl font-black uppercase mb-4">
              Reach Us
            </h2>
            <ul className="space-y-3 text-white/80">
              <li>
                <span className="text-white/50">Email:</span>{" "}
                <a href="mailto:hello@haci.group" className="hover:underline">
                  hello@haci.group
                </a>
              </li>
              <li>
                <span className="text-white/50">Press:</span>{" "}
                <a href="mailto:press@haci.group" className="hover:underline">
                  press@haci.group
                </a>
              </li>
              <li>
                <span className="text-white/50">Partnerships:</span>{" "}
                <a
                  href="mailto:partners@haci.group"
                  className="hover:underline"
                >
                  partners@haci.group
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <h3 className="text-white text-sm font-bold uppercase mb-2">
                Mailing Address
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                HaciGroup
                <br /> PO Box 0000
                <br /> Los Angeles, CA 90000
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-white text-sm font-bold uppercase mb-2">
                Media Kit
              </h3>
              <Link
                href="/media-kit"
                className="inline-flex items-center gap-2 text-amber-400 font-semibold hover:underline"
              >
                View assets →
              </Link>
            </div>

            <div className="mt-6">
              <h3 className="text-white text-sm font-bold uppercase mb-2">
                Follow
              </h3>
              <div className="flex items-center gap-4 text-white/70">
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  X
                </a>
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  IG
                </a>
                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>
    </main>
  );
}
