"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis with mobile touch sync for buttery-smooth inertial momentum
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    const lenis = new Lenis({
      duration: isTouch ? 0.8 : 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.1,
      syncTouch: true,
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
    };
  }, []);

  return <>{children}</>;
}
