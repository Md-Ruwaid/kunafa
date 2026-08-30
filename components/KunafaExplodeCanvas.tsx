"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SwashAccent from "@/components/SwashAccent";

const TOTAL_FRAMES = 100;
const FRAME_WIDTH = 1280;
const FRAME_HEIGHT = 720;

// Structured story acts: Origin → Craft → Core Science → The Promise
const ACTS = [
  {
    range: [0, 0.22] as [number, number],
    align: "center" as const,
    headline: (
      <>
        Hyderabad&apos;s Most <SwashAccent color="gold">Talked-About</SwashAccent> Kunafa
      </>
    ),
    body: "Hand-pressed on live copper hearths. 100% clarified ghee, molten mountain Akawi curd, drenched in Damascus rose attar. Fresh every single order.",
  },
  {
    range: [0.25, 0.50] as [number, number],
    align: "left" as const,
    headline: (
      <>
        Deconstructed <SwashAccent color="gold">Golden Crisp</SwashAccent> &amp; Heat
      </>
    ),
    body: "Individual spun strands of clarified-butter pastry lift away under acoustic heat. Copper-pan roasted at precisely 205°C for the signature snap.",
  },
  {
    range: [0.53, 0.78] as [number, number],
    align: "right" as const,
    headline: (
      <>
        The Molten <SwashAccent color="gold">Akawi &amp; Nablusi</SwashAccent> Heart
      </>
    ),
    body: "18-hour cold-desalinated mountain Akawi and Nablusi curd, unfurling under heat with raw first-harvest Aleppo emerald pistachios.",
  },
  {
    range: [0.82, 1.0] as [number, number],
    align: "center" as const,
    headline: (
      <>
        Reassembled to <SwashAccent color="gold">Perfection</SwashAccent>
      </>
    ),
    body: "Since 2021, over 50,000 voyagers across Hyderabad have tasted the original recipe. From Barkas to our branches — fresh-pressed, every time.",
  },
];

function getActOpacity(progress: number, range: [number, number]): number {
  const [start, end] = range;
  const fadeIn = 0.04;
  const fadeOut = 0.04;
  if (progress < start) return 0;
  if (progress > end) return 0;

  // First act should be fully visible at the start
  if (start === 0 && progress < fadeIn) return 1;
  // Last act should remain visible towards the bottom
  if (end >= 0.99 && progress > end - fadeOut) return 1;

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
  const fadeIn = 0.04;
  if (progress < start + fadeIn) {
    const t = (progress - start) / fadeIn;
    return align === "left" ? -16 * (1 - t) : 16 * (1 - t);
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

  const lastDrawnIndexRef = useRef(0);

  // Continuous sub-frame rendering with dual-frame blending for maximum smoothness
  const drawFrame = useCallback((exactIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const frameFloor = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.floor(exactIndex)));
    const frameCeil = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.ceil(exactIndex)));
    const blend = exactIndex - frameFloor;

    let img1 = imagesRef.current[frameFloor];
    let img2 = imagesRef.current[frameCeil];

    if (!img1 || !img1.complete || img1.naturalWidth === 0) {
      img1 = imagesRef.current[lastDrawnIndexRef.current];
    }
    if (!img1 || !img1.complete || img1.naturalWidth === 0) return;

    // Cap DPR at 2 for mobile GPU efficiency
    const dpr = Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const targetW = Math.round(width * dpr);
    const targetH = Math.round(height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "#030303";
    ctx.fillRect(0, 0, width, height);

    const isMobile = width < 768;
    const baseScale = Math.min(width / FRAME_WIDTH, height / FRAME_HEIGHT);
    const scale = isMobile ? baseScale * 1.05 : baseScale * 1.15;

    const drawWidth = FRAME_WIDTH * scale;
    const drawHeight = FRAME_HEIGHT * scale;
    const offsetX = (width - drawWidth) / 2;
    const offsetY = isMobile
      ? Math.max(0, (height - drawHeight) / 2 + 55)
      : (height - drawHeight) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    try {
      ctx.drawImage(img1, offsetX, offsetY, drawWidth, drawHeight);

      // Micro-blend next frame for seamless sub-frame continuous animation
      if (blend > 0.02 && img2 && img2.complete && img2.naturalWidth > 0 && frameFloor !== frameCeil) {
        ctx.globalAlpha = blend;
        ctx.drawImage(img2, offsetX, offsetY, drawWidth, drawHeight);
        ctx.globalAlpha = 1.0;
      }

      lastDrawnIndexRef.current = frameFloor;
    } catch {
      // Safe fallback
    }

    ctx.restore();
  }, []);

  // Preload all frames
  useEffect(() => {
    let mounted = true;
    const loadedImages: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let count = 0;
    const pad = (n: number) => String(n).padStart(3, "0");

    // Preload explosion sequence frames
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const idx = i - 1;
      img.src = `/Kunafa-animations-v2/ezgif-frame-${pad(i)}.png`;

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
        if (!mounted) return;
        count++;
        setLoadedCount(count);
        if (count >= TOTAL_FRAMES) {
          imagesRef.current = loadedImages;
          setIsLoaded(true);
          drawFrame(0);
        }
      };

      loadedImages[idx] = img;
    }

    imagesRef.current = loadedImages;
    return () => {
      mounted = false;
    };
  }, [drawFrame]);

  // Single synchronized scroll handler with requestAnimationFrame
  useEffect(() => {
    let animFrame: number;
    let lastProgress = -1;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / totalScrollable));
      setProgress(p);

      // Smooth continuous floating frame index
      const exactFrame = p * (TOTAL_FRAMES - 1);
      if (Math.abs(p - lastProgress) > 0.0005) {
        lastProgress = p;
        drawFrame(exactFrame);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("orientationchange", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("orientationchange", onScroll);
      cancelAnimationFrame(animFrame);
    };
  }, [drawFrame]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[700vh] sm:h-[750vh] bg-[#030303]"
    >
      {/* Preloader / Initial Loading indicator — Clean, Textless Luxury Loader */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030303]"
          >
            <div className="relative flex flex-col items-center">
              {/* Minimalist Captain Gold Spinner */}
              <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-[#0c0c0c] shadow-2xl mb-5">
                <div className="w-7 h-7 rounded-full border-2 border-[#EFB80D] border-t-transparent animate-spin" />
              </div>

              {/* Ultra-slim progress indicator without text */}
              <div className="w-36 h-0.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#EFB80D] transition-all duration-150 ease-out shadow-[0_0_8px_#EFB80D]"
                  style={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }}
                />
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

        {/* Text Overlay Layer — z-20, positioned without blocking the central visual */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {ACTS.map((act, idx) => {
            const opacity = getActOpacity(progress, act.range);
            const translateX = getActX(progress, act.range, act.align);

            if (opacity <= 0.001) return null;

            return (
              <div
                key={idx}
                className="absolute inset-0 pointer-events-none"
                style={{
                  opacity,
                  willChange: "opacity, transform",
                }}
              >
                {/* ── MOBILE VIEW: Positioned strictly ABOVE the video at the top ── */}
                <div className="md:hidden absolute top-0 inset-x-0 pt-16 sm:pt-20 px-4 sm:px-6 text-center">
                  <div className="max-w-md mx-auto py-2">
                    <h2 className="font-display font-bold text-2xl sm:text-3xl leading-tight text-[#FFF8EC] mb-2">
                      {act.headline}
                    </h2>
                    <p className="font-sans text-xs sm:text-sm text-white/85 leading-relaxed">
                      {act.body}
                    </p>
                  </div>
                </div>

                {/* ── DESKTOP VIEW: Placed at top or flanked left/right leaving central video clear ── */}
                <div
                  className={`hidden md:flex absolute inset-0 items-center ${
                    act.align === "left"
                      ? "justify-start pl-12 lg:pl-20 xl:pl-28"
                      : act.align === "right"
                      ? "justify-end pr-12 lg:pr-20 xl:pr-28"
                      : "items-start pt-24 lg:pt-28 justify-center text-center"
                  }`}
                  style={{
                    transform: `translate3d(${translateX}px, 0, 0)`,
                  }}
                >
                  <div
                    className={`max-w-md lg:max-w-lg ${
                      act.align === "center"
                        ? "text-center mx-auto"
                        : "text-left"
                    }`}
                  >
                    <h2
                      className={`font-display font-bold leading-[1.15] text-[#FFF8EC] mb-3 lg:mb-4 ${
                        act.align === "center"
                          ? "text-4xl lg:text-6xl"
                          : "text-3xl lg:text-5xl"
                      }`}
                    >
                      {act.headline}
                    </h2>
                    <p className="font-sans text-sm lg:text-base text-white/85 leading-relaxed">
                      {act.body}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transparent bottom fade gradient into next section */}
        <div className="absolute inset-x-0 bottom-0 h-32 sm:h-48 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent pointer-events-none z-10" />

        {/* Mobile scroll hint */}
        <div className="absolute bottom-4 inset-x-0 z-20 flex justify-center pointer-events-none md:hidden">
          <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-white/60 bg-[#030303] px-3 py-1 rounded-full border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EFB80D]" />
            <span>SCROLL TO SAIL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
