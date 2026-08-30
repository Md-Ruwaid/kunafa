"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import BrandName from "@/components/BrandName";

interface SitePreloaderProps {
  onComplete?: () => void;
}

const CRITICAL_IMAGES = [
  "/logo.png",
  "/platters/platter-original.png",
  "/platters/platter-pistachio.png",
  "/platters/platter-biscoff.png",
  "/platters/platter-choco.png",
];

export default function SitePreloader({ onComplete }: SitePreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [statusText, setStatusText] = useState("Firing the live copper hearth...");

  useEffect(() => {
    // Lock body scroll while preloader is active
    document.body.style.overflow = "hidden";

    let mounted = true;
    let loadedAssets = 0;
    const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;

    // Build list of assets to preload: critical images + first 15 frames of hero
    const folder = isMobile ? "/mobile-view-framesv2" : "/Kunafa-animations-v2";
    const pad = (n: number) => String(n).padStart(3, "0");
    const frameUrls: string[] = [];
    for (let i = 1; i <= 15; i++) {
      frameUrls.push(`${folder}/ezgif-frame-${pad(i)}.png`);
    }

    const allUrls = [...CRITICAL_IMAGES, ...frameUrls];
    const totalAssets = allUrls.length;

    allUrls.forEach((url) => {
      const img = new window.Image();
      img.src = url;
      const onAssetDone = () => {
        if (!mounted) return;
        loadedAssets++;
        const targetPercent = Math.min(100, Math.round((loadedAssets / totalAssets) * 100));
        setProgress((prev) => Math.max(prev, targetPercent));
      };
      img.onload = onAssetDone;
      img.onerror = onAssetDone;
    });

    // Smooth progress incrementer to ensure fluid animation even on ultra-fast networks
    let currentVal = 0;
    const interval = setInterval(() => {
      if (!mounted) return;

      currentVal += 3;
      if (currentVal >= 90 && loadedAssets < totalAssets * 0.5) {
        currentVal = 90; // Wait for assets to catch up
      }

      setProgress((prev) => {
        const next = Math.min(100, Math.max(prev, currentVal));
        if (next < 35) {
          setStatusText("Firing the live copper hearth...");
        } else if (next < 70) {
          setStatusText("Desalinating mountain Akawi curd...");
        } else if (next < 95) {
          setStatusText("Spun pastry at 205°C acoustic snap...");
        } else {
          setStatusText("Welcome aboard · Opening website...");
        }

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (!mounted) return;
            setIsDone(true);
            document.body.style.overflow = "";
            if (onComplete) onComplete();
          }, 350);
        }
        return next;
      });
    }, 40);

    // Safety fallback: maximum 3.2s to guarantee site always opens smoothly
    const maxTimer = setTimeout(() => {
      if (!mounted) return;
      setProgress(100);
      setStatusText("Welcome aboard · Opening website...");
      setTimeout(() => {
        if (!mounted) return;
        setIsDone(true);
        document.body.style.overflow = "";
        if (onComplete) onComplete();
      }, 250);
    }, 3200);

    return () => {
      mounted = false;
      clearInterval(interval);
      clearTimeout(maxTimer);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="site-preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-[#FFF8EC] select-none overflow-hidden px-4"
        >
          {/* Subtle Ambient Radial Gold Glow */}
          <div className="absolute w-96 h-96 rounded-full bg-[#EFB80D]/10 blur-3xl pointer-events-none -top-10 -left-10" />
          <div className="absolute w-96 h-96 rounded-full bg-[#EFB80D]/10 blur-3xl pointer-events-none -bottom-10 -right-10" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-sm sm:max-w-md mx-auto">
            {/* Animated Official Crest / Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative mb-5"
            >
              <div className="absolute inset-0 rounded-full bg-[#EFB80D]/20 blur-xl animate-pulse" />
              <Image
                src="/logo.png"
                alt="Captain Kunafa Crest"
                width={80}
                height={96}
                priority
                className="relative h-16 sm:h-20 w-auto object-contain drop-shadow-[0_0_24px_rgba(239,184,13,0.6)]"
              />
            </motion.div>

            {/* Brand Wordmark in Luckiest Guy Font */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="mb-1.5"
            >
              <BrandName className="text-2xl sm:text-3xl md:text-4xl text-white tracking-widest leading-none">
                CAPTAIN <span className="text-[#EFB80D]">KUNAFA</span>
              </BrandName>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white/70 mb-8"
            >
              Authentic Levantine Recipe · Live Hearth
            </motion.p>

            {/* Precision Luxury Progress Bar */}
            <div className="w-56 sm:w-72 h-2 bg-[#141414] rounded-full overflow-hidden border border-[#EFB80D]/30 p-0.5 shadow-2xl mb-3.5">
              <motion.div
                className="h-full bg-gradient-to-r from-[#b88a03] via-[#EFB80D] to-[#FFF8EC] rounded-full shadow-[0_0_12px_#EFB80D]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Percentage & Live Status */}
            <div className="flex items-center justify-between w-56 sm:w-72 font-mono text-[11px] text-[#EFB80D] font-bold mb-2">
              <span className="truncate text-left text-white/60 text-[10px] font-normal">
                {statusText}
              </span>
              <span className="shrink-0 ml-2 font-mono tracking-wider">
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
