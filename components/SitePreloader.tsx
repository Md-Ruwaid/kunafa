"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    let current = 0;

    const interval = setInterval(() => {
      if (!mounted) return;
      current += 5;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          if (!mounted) return;
          setIsDone(true);
          document.body.style.overflow = "";
          if (onComplete) onComplete();
        }, 150);
      } else {
        setProgress(current);
      }
    }, 20);

    return () => {
      mounted = false;
      clearInterval(interval);
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
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] select-none"
        >
          {/* Single Minimalist Gold Loading Line */}
          <div className="w-44 sm:w-60 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#EFB80D] shadow-[0_0_10px_#EFB80D]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
