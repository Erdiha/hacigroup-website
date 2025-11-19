"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollToHash = () => {
      const { hash } = window.location;
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          return true;
        }
      }
      return false;
    };

    requestAnimationFrame(() => {
      if (!scrollToHash()) {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    });
  }, [pathname]);

  return null;
}
