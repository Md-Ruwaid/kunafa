"use client";

import React, { useEffect, useState } from "react";
import BrandName from "@/components/BrandName";
import { preloadAllSiteAssets } from "@/lib/preloader";

interface SitePreloaderProps {
  onComplete?: () => void;
}

export default function SitePreloader({ onComplete }: SitePreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Lock scroll while preloading
    document.body.style.overflow = "hidden";

    let mounted = true;

    preloadAllSiteAssets(
      (pct) => {
        if (!mounted) return;
        setProgress((prev) => Math.max(prev, pct));
      },
      () => {
        if (!mounted) return;
        setProgress(100);
        setIsFading(true);
        setTimeout(() => {
          if (!mounted) return;
          setIsDone(true);
          document.body.style.overflow = "";
          if (onComplete) onComplete();
        }, 300);
      }
    );

    return () => {
      mounted = false;
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] select-none px-6 transition-opacity duration-300 pointer-events-none ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Brand Name & Loading Status */}
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-2">
          <BrandName className="text-[#EFB80D]" />
        </h1>
        <p className="font-sans text-xs sm:text-sm text-white/60 font-normal">
          Preparing your artisanal experience...
        </p>
      </div>

      {/* Minimalist 2D Progress Line */}
      <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-[#EFB80D] transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage Counter */}
      <span className="font-mono text-xs text-[#EFB80D] tracking-widest font-semibold">
        {progress}%
      </span>
    </div>
  );
}
