"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { activeFrameKind, frameUrl } from "@/lib/frames";
import { setLenisEnabled } from "@/lib/lenis";

interface SitePreloaderProps {
  onComplete?: () => void;
}

/**
 * Number of leading hero frames that must actually decode before the page is
 * released. The canvas requests the full sequence itself; these are the frames
 * needed for the opening beats, and they come from cache once the gate lifts.
 */
const GATED_FRAMES = 16;

/** Hard ceiling. A stalled or failing network must never trap the visitor. */
const MAX_WAIT_MS = 7000;

export default function SitePreloader({ onComplete }: SitePreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let mounted = true;
    let released = false;

    // Lock scrolling. Both halves are required: overflow stops native scroll,
    // setLenisEnabled stops Lenis, which ignores overflow entirely.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setLenisEnabled(false);

    const unlock = () => {
      document.body.style.overflow = previousOverflow;
      setLenisEnabled(true);
    };

    const release = () => {
      if (released || !mounted) return;
      released = true;
      setProgress(100);
      // Let the bar paint its full state before the overlay fades out.
      window.setTimeout(() => {
        if (!mounted) return;
        setIsDone(true);
        unlock();
        onComplete?.();
      }, 180);
    };

    // ---- Real asset tracking ------------------------------------------------
    const kind = activeFrameKind();
    const urls = Array.from({ length: GATED_FRAMES }, (_, i) => frameUrl(kind, i + 1));

    // Fonts count as one unit alongside the frames so the bar reflects both.
    const totalUnits = urls.length + 1;
    let completedUnits = 0;

    const advance = () => {
      completedUnits += 1;
      if (mounted) {
        // Cap the tracked portion at 96% — the last step is the release itself.
        setProgress(Math.min(96, Math.round((completedUnits / totalUnits) * 100)));
      }
      if (completedUnits >= totalUnits) release();
    };

    const images: HTMLImageElement[] = [];
    for (const url of urls) {
      const img = new Image();
      // Errors must still advance: a missing frame is not a reason to hang.
      img.onload = advance;
      img.onerror = advance;
      img.src = url;
      // Cached images may already be complete before the handlers attach.
      if (img.complete && img.naturalWidth > 0) {
        img.onload = null;
        img.onerror = null;
        advance();
      } else {
        images.push(img);
      }
    }

    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(advance).catch(advance);
    } else {
      advance();
    }

    const ceiling = window.setTimeout(release, MAX_WAIT_MS);

    return () => {
      mounted = false;
      window.clearTimeout(ceiling);
      for (const img of images) {
        img.onload = null;
        img.onerror = null;
      }
      unlock();
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
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] select-none"
          role="status"
          aria-live="polite"
          aria-label="Loading Kunafa"
        >
          {/* Single Minimalist Gold Loading Line */}
          <div className="w-44 sm:w-60 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#EFB80D] shadow-[0_0_10px_#EFB80D] transition-[width] duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
