"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // On mobile devices, native hardware-accelerated touch momentum is vastly superior,
    // ultra-responsive, and completely free of artificial drag or resistance.
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (isMobile) {
      // Keep 100% native, instant-response touch momentum on mobile
      return;
    }

    // Initialize Lenis on desktop for buttery-smooth inertial momentum scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      syncTouch: false,
    });

    let animFrame: number;

    function raf(time: number) {
      lenis.raf(time);
      animFrame = requestAnimationFrame(raf);
    }

    animFrame = requestAnimationFrame(raf);

    // Make lenis accessible globally for any components that need to trigger scroll jumps
    (window as unknown as { lenis: unknown }).lenis = lenis;

    return () => {
      cancelAnimationFrame(animFrame);
      lenis.destroy();
      (window as unknown as { lenis: unknown }).lenis = null;
    };
  }, []);

  return <>{children}</>;
}
