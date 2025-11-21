"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function TeamCard({ member }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* MOBILE LAYOUT (< md) - Focus Card */}
      <motion.div
        layout
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          md:hidden
          relative overflow-hidden rounded-2xl border border-white/10 bg-[#13182b] transition-all duration-300 cursor-pointer group
          ${isExpanded ? "ring-2 ring-brand-purple shadow-lg shadow-brand-purple/20" : ""}
        `}
      >
        {/* Image Container */}
        <div className={`relative w-full ${isExpanded ? "h-64" : "h-80"} transition-all duration-300`}>
          {member.photoUrl ? (
            <Image
              src={member.photoUrl}
              alt={member.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#080c1a] text-6xl">
              {member.image || "👤"}
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#13182b] via-transparent to-transparent opacity-90" />
          
          <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-amber mb-1">
              {member.title}
            </p>
            <h3 className="text-2xl font-black text-white leading-tight">
              {member.name}
            </h3>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-5 pb-5"
            >
              <div className="pt-4 border-t border-white/10 mt-2">
                <p className="text-sm text-white/70 leading-relaxed mb-4">
                  {member.bio}
                </p>
                
                <div className="flex flex-wrap gap-4 text-xs font-semibold">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-white/50 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      Email
                    </a>
                  )}
                  {member.linkedin && (
                    <Link
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-brand-amber hover:text-amber-200 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      LinkedIn
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isExpanded && (
          <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md rounded-full p-1.5 text-white/50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          </div>
        )}
      </motion.div>

      {/* DESKTOP LAYOUT (>= md) - Original Static Style */}
      <div className="hidden md:block border border-white/10 rounded-2xl bg-[#13182b] h-full">
        <div className="p-5 space-y-4 h-full flex flex-col">
          <div className="grid gap-4 grid-cols-[140px_1fr] items-start">
            {/* Avatar */}
            <div className="relative h-40 rounded-xl overflow-hidden bg-[#080c1a]">
              {member.photoUrl ? (
                <Image
                  src={member.photoUrl}
                  alt={`${member.name} headshot`}
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  {member.image || "👤"}
                </div>
              )}
            </div>
            
            {/* Header Info */}
            <div className="text-left pt-2">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">
                {member.title}
              </p>
              <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
            </div>
          </div>

          {/* Bio & Links */}
          <div className="flex flex-col flex-1">
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              {member.bio}
            </p>
            <div className="mt-auto flex flex-wrap items-center gap-3 text-xs text-white/60 pt-4 border-t border-white/5">
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="underline hover:text-white transition-colors"
                >
                  {member.email}
                </a>
              )}
              {member.linkedin && (
                <Link
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-amber hover:text-amber-200 font-semibold transition-colors"
                >
                  LinkedIn →
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
