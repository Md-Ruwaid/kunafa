"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { registerLenis, unregisterLenis } from "@/lib/lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis for buttery-smooth inertial momentum scrolling
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
    });

    let animFrame: number;

    function raf(time: number) {
      lenis.raf(time);
      animFrame = requestAnimationFrame(raf);
    }

    animFrame = requestAnimationFrame(raf);

    // Make lenis accessible globally for any components that need to trigger scroll jumps
    (window as unknown as { lenis: unknown }).lenis = lenis;
    // Applies any scroll lock requested before this effect ran (child effects
    // run first, so SitePreloader can lock scrolling before Lenis exists).
    registerLenis(lenis);

    return () => {
      cancelAnimationFrame(animFrame);
      unregisterLenis();
      delete (window as unknown as { lenis?: unknown }).lenis;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
