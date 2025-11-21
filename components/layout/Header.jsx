"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedBrand from "@/components/ui/AnimatedBrand";
import { navigation, siteMetadata } from "@/data/content";
import Image from "next/image";
import Container from "@/components/ui/Container";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Fallback only if navigation.main is missing/empty
  const navItems =
    navigation?.main && navigation.main.length > 0
      ? navigation.main
      : [
          { href: "/about", label: "About" },
          { href: "/get-involved", label: "Get Involved" },
        ];

  const isActive = (href) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 bg-primary/90 backdrop-blur-md b">
      <Container className="h-16 flex items-center justify-between">
        <div className="flex items-center  w-fit justify-center">
          <Link
            href="/"
            aria-label={siteMetadata?.name ?? "Home"}
            className="font-semibold tracking-tight text-xl flex items-center"
          >
            <AnimatedBrand showLogo={false} />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-7 text-sm justify-center">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center justify-center transition-colors ${
                  active ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
                {!active && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-white/40 origin-center scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-300"
                  />
                )}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-white/90 hover:bg-white/5 transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-5 bg-current transition-transform ${
                open ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition-transform ${
                open ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/10 overflow-hidden"
          >
            <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block py-2 ${
                    isActive(item.href) ? "text-white" : "text-white/70"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {/* <Link
                href="/donate"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex w-fit items-center rounded-lg px-4 py-2 bg-gradient-to-r from-purple-500 to-amber-500 text-white font-medium"
              >
                Donate
              </Link> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
