"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BrandName from "@/components/BrandName";
import { preloadAllSiteAssets } from "@/lib/preloader";

interface SitePreloaderProps {
  onComplete?: () => void;
}

export default function SitePreloader({ onComplete }: SitePreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Lock body scroll while preloader is active
    document.body.style.overflow = "hidden";

    let mounted = true;

    // Track real asset download & GPU texture decoding
    preloadAllSiteAssets(
      (pct) => {
        if (!mounted) return;
        setProgress((prev) => Math.max(prev, pct));
      },
      () => {
        if (!mounted) return;
        setProgress(100);
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

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="site-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] select-none px-6"
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
            <motion.div
              className="h-full bg-[#EFB80D]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.2 }}
            />
          </div>

          {/* Percentage Counter */}
          <span className="font-mono text-xs text-[#EFB80D] tracking-widest font-semibold">
            {progress}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
