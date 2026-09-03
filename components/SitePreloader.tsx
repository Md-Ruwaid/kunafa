"use client";

import React, { useEffect, useState } from "react";
import BrandName from "@/components/BrandName";
import { preloadAllSiteAssets } from "@/lib/preloader";

const KUNAFA_TALES = [
  {
    title: "10th-Century Royal Levant",
    text: "Originating in medieval Damascus and Nablus, Kunafa was first prepared by master royal confectioners for the Caliphs as an imperial delicacy.",
  },
  {
    title: "The Spun Kataifi Craft",
    text: "Delicate wheat filaments are hand-shredded, brushed with cold-pressed ghee, and toasted to amber perfection over live copper hearths.",
  },
  {
    title: "The Molten Akawi Heart",
    text: "Beneath the golden acoustic crust lies sweet, un-salted Akawi curd cheese that stretches molten and fragrant with every single pull.",
  },
  {
    title: "The 48 dB Acoustic Crunch",
    text: "Crowned with freshly crushed green Aleppo pistachios and scented with sweet orange blossom — an unmistakable signature crunch in every bite.",
  },
  {
    title: "Handcrafted in Hyderabad",
    text: "Founded by Saud bin Nasar Khulagi, bringing centuries of Levantine live-pan tradition fresh to your table across Hyderabad.",
  },
];

interface SitePreloaderProps {
  onComplete?: () => void;
}

export default function SitePreloader({ onComplete }: SitePreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [currentTaleIndex, setCurrentTaleIndex] = useState(0);
  const [taleFading, setTaleFading] = useState(false);

  // Cycle through heritage stories every 3.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setTaleFading(true);
      setTimeout(() => {
        setCurrentTaleIndex((prev) => (prev + 1) % KUNAFA_TALES.length);
        setTaleFading(false);
      }, 350);
    }, 3800);

    return () => clearInterval(interval);
  }, []);

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
        }, 400);
      }
    );

    return () => {
      mounted = false;
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (isDone) return null;

  const tale = KUNAFA_TALES[currentTaleIndex];

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] select-none px-6 transition-opacity duration-400 pointer-events-none ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute w-72 h-72 rounded-full bg-[#EFB80D]/5 blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="relative flex flex-col items-center text-center mb-6">
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-1">
          <BrandName className="text-[#EFB80D]" />
        </h1>
        <span className="font-mono text-[10px] sm:text-xs text-white/40 tracking-[0.25em] uppercase">
          Artisanal Levantine Kunafa
        </span>
      </div>

      {/* Story Card: Origin & Heritage Phrase */}
      <div className="relative max-w-sm sm:max-w-md w-full bg-[#0a0a0a]/90 border border-white/10 rounded-xl p-4 sm:p-5 text-center mb-6 shadow-2xl backdrop-blur-sm">
        <div
          className={`transition-opacity duration-350 ease-in-out ${
            taleFading ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="inline-block font-mono text-[9px] sm:text-[10px] text-[#EFB80D] uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#EFB80D]/10 border border-[#EFB80D]/20 mb-2">
            {tale.title}
          </span>
          <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed font-light italic">
            &ldquo;{tale.text}&rdquo;
          </p>
        </div>
      </div>

      {/* 2D Gold Progress Line */}
      <div className="w-56 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden mb-2.5">
        <div
          className="h-full bg-gradient-to-r from-[#b88a03] to-[#EFB80D] transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage & Status */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-[#EFB80D] tracking-widest font-semibold">
          {progress}%
        </span>
        <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider">
          {progress < 100 ? "Loading Master Frames..." : "Ready to Experience"}
        </span>
      </div>
    </div>
  );
}
