"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { team, foundingStory, storyPanels, programs } from "@/data/content";

export default function AboutPage() {
  const [currentPanel, setCurrentPanel] = useState(0);

  return (
    <div className="min-h-screen bg-[#0B1020]">
      {/* Hero - Comic Book Style */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden border-b-4 border-amber-500">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            className="inline-block mb-6"
          >
            <div className="text-9xl">📖</div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-4 tracking-tight"
            style={{
              textShadow: "4px 4px 0px #a855f7, 8px 8px 0px #f59e0b",
              WebkitTextStroke: "2px black",
            }}
          >
            OUR STORY
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-amber-400 font-bold uppercase tracking-wider mb-12"
          >
            Building Technology That Works For Everyone
          </motion.p>

          {/* Founding Story (from data) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-3xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="shrink-0">
                  <div
                    className=" bg-linear-to-br  rounded-full flex items-center justify-center 
                  text-4xl font-black text-white border-4 border-black shadow-lg p-4 relative"
                  >
                    <span className="absolute top-0 text-xs left-0 bg-transparent">
                      since
                    </span>
                    <span className="w-full h-full flex justify-center items-center ">
                      {foundingStory.year}
                    </span>
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-black text-white mb-3">
                    {foundingStory.title}
                  </h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    {foundingStory.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Comic-style corner fold */}
        <div className="absolute top-0 right-0 w-32 h-32">
          <div className="absolute top-0 right-0 border-t-60 border-t-amber-500 border-l-60 border-l-transparent" />
        </div>
      </section>

      {/* Interactive Story Panels (already from data) */}
      <section className="py-16 px-4 bg-[#0f1528]">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center gap-2 mb-12 flex-wrap">
            {storyPanels.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPanel(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentPanel === index
                    ? "bg-amber-500 w-12"
                    : "bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to panel ${index + 1}`}
              />
            ))}
          </div>

          <motion.div
            key={currentPanel}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className={`relative bg-linear-to-br ${storyPanels[currentPanel].bgColor} border-4 border-white/20 rounded-3xl p-12 min-h-[500px] flex flex-col items-center justify-center text-center shadow-2xl`}
          >
            <div className="absolute top-4 left-4 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center font-black text-2xl border-4 border-black">
              {currentPanel + 1}
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
              className="text-9xl mb-8 filter drop-shadow-2xl"
            >
              {storyPanels[currentPanel].illustration}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl font-black text-white mb-6 uppercase"
              style={{ textShadow: "3px 3px 0px rgba(0,0,0,0.5)" }}
            >
              {storyPanels[currentPanel].title}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl px-8 py-4 mb-6 max-w-2xl"
            >
              <p className="text-2xl text-amber-300 font-bold italic">
                &ldquo;{storyPanels[currentPanel].caption}&rdquo;
              </p>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-white/80 max-w-2xl leading-relaxed"
            >
              {storyPanels[currentPanel].description}
            </motion.p>

            <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4">
              <button
                onClick={() => setCurrentPanel(Math.max(0, currentPanel - 1))}
                disabled={currentPanel === 0}
                className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center font-bold text-2xl disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 transition-all border-4 border-black"
                aria-label="Previous panel"
              >
                ←
              </button>
              <button
                onClick={() =>
                  setCurrentPanel(
                    Math.min(storyPanels.length - 1, currentPanel + 1)
                  )
                }
                disabled={currentPanel === storyPanels.length - 1}
                className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center font-bold text-2xl disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 transition-all border-4 border-black"
                aria-label="Next panel"
              >
                →
              </button>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-white/40 text-sm mt-6"
          >
            Click arrows or dots to navigate • {currentPanel + 1} of{" "}
            {storyPanels.length}
          </motion.p>
        </div>
      </section>

      {/* What We're Building (from data.programs) */}
      <section className="py-24 px-4 bg-linear-to-b from-transparent to-[#0f1528]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-6xl font-black text-white text-center mb-4 uppercase"
            style={{
              textShadow: "3px 3px 0px #a855f7, 6px 6px 0px #f59e0b",
              WebkitTextStroke: "2px black",
            }}
          >
            What We&apos;re Building
          </motion.h2>
          <p className="text-center text-white/60 text-lg mb-16 max-w-2xl mx-auto">
            Two platforms proving that nonprofit tech can work
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, rotate: i % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
                className={`bg-linear-to-br ${p.color} border-4 border-black rounded-3xl p-8 shadow-2xl relative overflow-hidden`}
              >
                {p.comingSoon && (
                  <span className="absolute top-5 right-5 text-white rounded-full bg-black px-3 py-1 font-bold text-xs">
                    COMING SOON
                  </span>
                )}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                <div className="relative z-10">
                  <div className="text-7xl mb-4">{p.icon}</div>
                  <h3 className="text-4xl font-black text-white mb-2 uppercase">
                    {p.title}
                  </h3>
                  <p
                    className={`${
                      i % 2 === 0 ? "text-purple-200" : "text-amber-100"
                    } font-bold mb-4 uppercase tracking-wide text-sm`}
                  >
                    {p.tagline}
                  </p>
                  <p className="text-white/90 text-lg leading-relaxed mb-6">
                    {p.description}
                  </p>
                  {p.comingSoon ? (
                    <div className="inline-flex items-center gap-2 bg-white/20 text-white font-black px-6 py-3 rounded-full uppercase text-sm border-4 border-black">
                      {p.status}
                    </div>
                  ) : (
                    <Link
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-purple-700 font-black px-6 py-3 rounded-full hover:scale-105 transition-all uppercase text-sm border-4 border-black shadow-lg"
                    >
                      Learn More →
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Profiles Section (from data.team) */}
      <section className="py-24 px-4 bg-[#0f1528]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-black text-white text-center mb-4 uppercase"
            style={{
              textShadow: "3px 3px 0px #a855f7",
              WebkitTextStroke: "1px black",
            }}
          >
            Meet The Team
          </motion.h2>
          <p className="text-center text-white/70 text-lg mb-12 max-w-2xl mx-auto">
            The people building community-owned technology
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {team.leadership.map((m, idx) => (
              <motion.div
                key={m.email ?? idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#161b22] border-2 border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-linear-to-br from-purple-500 to-amber-500 p-1">
                  <div className="w-full h-full rounded-full bg-[#161b22] flex items-center justify-center text-6xl">
                    {m.image}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{m.name}</h3>
                <p className="text-purple-400 font-semibold mb-3">{m.title}</p>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  {m.bio}
                </p>
                {m.linkedin && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors text-sm font-semibold"
                  >
                    <span>🔗</span>
                    <span>LinkedIn</span>
                  </a>
                )}
              </motion.div>
            ))}
          </div>

          {/* Advisory/Supporting Roles (from data.team.advisory) */}
          <div className="border-t-2 border-white/10 pt-12">
            <h3 className="text-3xl font-black text-white text-center mb-8 uppercase">
              Advisory & Support
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {team.advisory.map((a, i) => (
                <motion.div
                  key={a.role}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#161b22] border-2 border-white/10 rounded-xl p-5 text-center"
                >
                  <div className="text-4xl mb-3">{a.icon}</div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {a.role}
                  </h4>
                  <p className="text-white/60 text-sm">{a.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-white/70 mb-6">
              Want to add your profile image? Replace the 👤 emoji with your
              photo URL in the data file.
            </p>
            <Link
              href="/volunteer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-purple-500 to-amber-500 text-white font-black rounded-full border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all uppercase"
            >
              Join Our Team
            </Link>
          </motion.div>
        </div>
      </section>

      {/* The Mission (unchanged copy) */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-linear-to-br from-purple-600 to-amber-600 border-8 border-black rounded-3xl p-12 shadow-2xl"
          >
            <div className="text-7xl mb-6">⚡</div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 uppercase leading-tight">
              Technology Should Serve People, Not Extract From Them
            </h2>
            <p className="text-2xl text-white/90 leading-relaxed">
              That&apos;s our entire mission. That&apos;s why we exist.
              That&apos;s what keeps us building.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Join CTA (unchanged) */}
      <section className="py-24 px-4 bg-linear-to-b from-[#0f1528] to-[#0B1020]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-8xl mb-6">🤝</div>
            <h2
              className="text-5xl sm:text-6xl font-black text-white mb-6 uppercase"
              style={{
                textShadow: "3px 3px 0px #a855f7",
                WebkitTextStroke: "1px black",
              }}
            >
              Join The Movement
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              Whether you code, organize, or just believe in fairer
              tech—there&apos;s a place for you here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-involved"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-black text-white bg-linear-to-r from-purple-500 to-amber-500 rounded-full hover:scale-105 transition-all uppercase border-4 border-black shadow-xl"
              >
                Get Involved
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-black text-white bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all uppercase border-4 border-white/30"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
