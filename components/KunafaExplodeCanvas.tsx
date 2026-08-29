"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SwashAccent from "@/components/SwashAccent";
import { CompassRose, ShipHelm, CaptainSeal } from "@/components/NauticalElements";

const TOTAL_FRAMES = 100;
const FRAME_WIDTH = 1280;
const FRAME_HEIGHT = 720;

// Structured story acts: Origin → Craft → Core Science → The Promise
const ACTS = [
  {
    range: [0, 0.22] as [number, number],
    align: "center" as const,
    badge: "ROYAL LEVANTINE ATELIER",
    label: null,
    headline: (
      <>
        Hyderabad's Most{" "}
        <span className="font-display italic font-semibold text-[#EFB80D]">Talked-About</span>{" "}
        Kunafa
      </>
    ),
    body: "Hand-pressed on live copper hearths. 100% clarified ghee, molten mountain Akawi curd, drenched in Damascus rose attar. Fresh every single order.",
    coords: "17.3115° N, 78.4871° E · BARKAS HQ",
  },
  {
    range: [0.25, 0.50] as [number, number],
    align: "left" as const,
    badge: null,
    label: "ACT I · THE KATAIFI TENSION",
    labelColor: "#EFB80D",
    headline: (
      <>
        Deconstructed{" "}
        <span className="font-display italic font-semibold text-[#EFB80D]">Golden Crisp</span>{" "}
        &amp; Heat
      </>
    ),
    body: "Individual spun strands of clarified-butter pastry lift away under acoustic heat. Copper-pan roasted at precisely 205°C for the signature snap.",
    metric: "ROAST: 205°C COPPER SEAR · 48 dB ACOUSTIC CRUNCH",
    coords: null,
  },
  {
    range: [0.53, 0.78] as [number, number],
    align: "right" as const,
    badge: null,
    label: "ACT II · THE MOLTEN CORE",
    labelColor: "#EFB80D",
    headline: (
      <>
        The Molten{" "}
        <span className="font-display italic font-semibold text-[#EFB80D]">Akawi &amp; Nablusi</span>{" "}
        Heart
      </>
    ),
    body: "18-hour cold-desalinated mountain Akawi and Nablusi curd, unfurling under heat with raw first-harvest Aleppo emerald pistachios.",
    metric: "CHEESE BLEND: 70% AKAWI / 30% NABLUSI · 45CM PULL",
    coords: null,
  },
  {
    range: [0.82, 1.0] as [number, number],
    align: "center" as const,
    badge: null,
    label: "ACT III · THE CAPTAIN'S PROMISE",
    labelColor: "#EFB80D",
    headline: (
      <>
        Reassembled to{" "}
        <span className="font-display italic font-semibold text-[#EFB80D]">Perfection</span>
      </>
    ),
    body: "Since 2021, over 50,000 voyagers across Hyderabad have tasted the original recipe. From Barkas to our branches — fresh-pressed, every time.",
    metric: "SERVED FRESH ACROSS OUR BRANCHES IN HYDERABAD",
    coords: "HYDERABAD · EST. 2021",
  },
];

function getActOpacity(progress: number, range: [number, number]): number {
  const [start, end] = range;
  const fadeIn = 0.05;
  const fadeOut = 0.05;
  if (progress < start) return 0;
  if (progress > end) return 0;
  if (progress < start + fadeIn) return (progress - start) / fadeIn;
  if (progress > end - fadeOut) return (end - progress) / fadeOut;
  return 1;
}

function getActX(
  progress: number,
  range: [number, number],
  align: "left" | "right" | "center"
): number {
  if (align === "center") return 0;
  const [start] = range;
  const fadeIn = 0.05;
  if (progress < start + fadeIn) {
    const t = (progress - start) / fadeIn;
    return align === "left" ? -20 * (1 - t) : 20 * (1 - t);
  }
  return 0;
}

export default function KunafaExplodeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Canvas drawing with mobile performance & containment
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Cap DPR at 2 for mobile GPU battery/memory efficiency
    const dpr = Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "#030303";
    ctx.fillRect(0, 0, width, height);

    const scale = Math.min(width / FRAME_WIDTH, height / FRAME_HEIGHT);
    const drawWidth = FRAME_WIDTH * scale;
    const drawHeight = FRAME_HEIGHT * scale;
    const offsetX = (width - drawWidth) / 2;
    const offsetY = (height - drawHeight) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  }, []);

  // Preload all frames
  useEffect(() => {
    let mounted = true;
    const loadedImages: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let count = 0;
    const pad = (n: number) => String(n).padStart(3, "0");

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const idx = i - 1;
      img.src = `/kunafa-frames/ezgif-frame-${pad(i)}.webp`;

      img.onload = () => {
        if (!mounted) return;
        loadedImages[idx] = img;
        count++;
        setLoadedCount(count);
        if (i === 1) {
          imagesRef.current[0] = img;
          drawFrame(0);
        }
        if (count >= TOTAL_FRAMES) {
          imagesRef.current = loadedImages;
          setIsLoaded(true);
          drawFrame(0);
        }
      };

      img.onerror = () => {
        img.src = `/kunafa-frames/ezgif-frame-${pad(i)}.png`;
      };

      loadedImages[idx] = img;
    }

    imagesRef.current = loadedImages;
    return () => {
      mounted = false;
    };
  }, [drawFrame]);

  // Single scroll handler
  useEffect(() => {
    let animFrame: number;
    let lastFrame = -1;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / totalScrollable));
      setProgress(p);

      const targetFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(p * TOTAL_FRAMES)
      );
      if (targetFrame !== lastFrame) {
        lastFrame = targetFrame;
        drawFrame(targetFrame);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(animFrame);
    };
  }, [drawFrame]);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[#030303]">
      {/* Preloader */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030303] select-none p-4"
          >
            <div className="flex flex-col items-center max-w-xs sm:max-w-sm px-4 text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-dashed border-[#EFB80D] animate-spin mb-5 flex items-center justify-center">
                <ShipHelm size={22} className="text-[#DA7034]" />
              </div>
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#EFB80D] mb-2">
                CAPTAIN KUNAFA
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white/95 mb-4">
                LOADING <SwashAccent color="terracotta">VOYAGE…</SwashAccent>
              </h2>
              <div className="w-full bg-white/10 h-[2px] rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-[#DA7034] to-[#EFB80D] transition-all duration-150"
                  style={{
                    width: `${Math.round((loadedCount / TOTAL_FRAMES) * 100)}%`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between w-full font-mono text-[10px] sm:text-[11px] text-white/50">
                <span>
                  FRAME [{String(loadedCount).padStart(3, "0")} / {TOTAL_FRAMES}]
                </span>
                <span className="text-[#EFB80D]">
                  {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#030303]">
        {/* Canvas behind everything */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />

        {/* Seamless edge blends */}
        <div className="absolute top-0 inset-x-0 h-24 sm:h-28 bg-gradient-to-b from-[#030303] via-[#030303]/80 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 inset-x-0 h-24 sm:h-28 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent pointer-events-none z-10" />

        {/* Text Overlay Layer — z-20, sits IN FRONT of canvas */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center">
          {ACTS.map((act, idx) => {
            const opacity = getActOpacity(progress, act.range);
            const translateX = getActX(progress, act.range, act.align);

            if (opacity === 0) return null;

            return (
              <div
                key={idx}
                className={`absolute inset-y-0 flex items-center px-4 sm:px-8 md:px-16 ${
                  act.align === "left"
                    ? "left-0 w-full md:w-[50%] justify-start"
                    : act.align === "right"
                    ? "right-0 w-full md:w-[50%] justify-end"
                    : "inset-x-0 justify-center"
                }`}
                style={{
                  opacity,
                  transform: `translateX(${translateX}px)`,
                  transition: "none",
                }}
              >
                {/* Mobile backdrop container for crystal-clear readability */}
                <div
                  className={`w-full max-w-lg ${
                    act.align === "center"
                      ? "text-center mx-auto"
                      : "text-left bg-[#030303]/60 md:bg-transparent border border-white/10 md:border-0 p-5 sm:p-6 md:p-0 rounded-[20px] backdrop-blur-md md:backdrop-blur-none"
                  }`}
                >
                  {/* Badge */}
                  {act.badge && (
                    <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#EFB80D] bg-[#EFB80D]/10 border border-[#EFB80D]/30 px-3.5 py-1.5 rounded-full mb-3 sm:mb-5 backdrop-blur-md">
                      <ShipHelm size={13} className="text-[#DA7034]" />
                      <span>{act.badge}</span>
                    </div>
                  )}

                  {/* Label pill */}
                  {act.label && (
                    <div
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] mb-2.5 sm:mb-3 px-3 py-1 rounded-full bg-[#2B1B12]/85 border border-white/10 backdrop-blur-md"
                      style={{
                        color:
                          (act as { labelColor?: string }).labelColor ??
                          "#EFB80D",
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background:
                            (act as { labelColor?: string }).labelColor ??
                            "#EFB80D",
                        }}
                      />
                      {act.label}
                    </div>
                  )}

                  {/* Headline */}
                  <h2
                    className={`font-display font-bold leading-[1.15] text-[#FFF8EC] mb-3 sm:mb-4 ${
                      act.align === "center"
                        ? "text-3xl sm:text-5xl md:text-7xl"
                        : "text-2xl sm:text-4xl md:text-5xl"
                    }`}
                  >
                    {act.headline}
                  </h2>

                  {/* Body copy */}
                  <p className="font-sans text-xs sm:text-sm md:text-base text-white/80 leading-relaxed mb-3.5 sm:mb-4 max-w-lg">
                    {act.body}
                  </p>

                  {/* Metric tag or Coords */}
                  {"metric" in act && act.metric && (
                    <div className="font-mono text-[10px] sm:text-xs text-[#EFB80D] tracking-wider bg-[#2B1B12]/80 inline-block px-3 py-1 rounded-md border border-[#EFB80D]/20">
                      {act.metric}
                    </div>
                  )}

                  {act.coords && (
                    <div className="font-mono text-[10px] sm:text-[11px] text-[#DA7034] tracking-widest mt-2 uppercase">
                      {act.coords}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile scroll hint */}
        <div className="absolute bottom-4 inset-x-0 z-20 flex justify-center pointer-events-none md:hidden">
          <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-white/60 bg-[#030303]/70 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DA7034] animate-pulse" />
            <span>SCROLL TO SAIL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
