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

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);

  // Razor-sharp single frame drawing with high performance & no ghosting
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndex));
    let targetImg = imagesRef.current[clampedIndex];

    if (!targetImg || !targetImg.complete || targetImg.naturalWidth === 0) {
      targetImg = imagesRef.current[lastDrawnFrameRef.current];
    }
    if (!targetImg || !targetImg.complete || targetImg.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

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
      ctx.drawImage(targetImg, offsetX, offsetY, drawWidth, drawHeight);
      lastDrawnFrameRef.current = clampedIndex;
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

  // Inertial LERP continuous animation loop for ultra-smooth 60/120fps motion
  useEffect(() => {
    let animFrame: number;
    let isRunning = true;

    const updateTarget = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / totalScrollable));
      targetProgressRef.current = p;
    };

    const renderLoop = () => {
      if (!isRunning) return;

      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * 0.18;
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      const p = currentProgressRef.current;
      setProgress(p);

      const targetFrame = Math.round(p * (TOTAL_FRAMES - 1));
      if (targetFrame !== lastDrawnFrameRef.current) {
        drawFrame(targetFrame);
      }

      animFrame = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget, { passive: true });
    window.addEventListener("orientationchange", updateTarget, { passive: true });
    updateTarget();
    animFrame = requestAnimationFrame(renderLoop);

    return () => {
      isRunning = false;
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
      window.removeEventListener("orientationchange", updateTarget);
      cancelAnimationFrame(animFrame);
    };
  }, [drawFrame]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[700vh] sm:h-[750vh] bg-[#030303]"
    >
      {/* Preloader / Initial Loading indicator — Single Elegant Loading Line */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#030303]"
          >
            {/* Single Loading Line */}
            <div className="w-48 sm:w-64 h-1 bg-white/10 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-[#EFB80D] transition-all duration-150 ease-out shadow-[0_0_12px_#EFB80D]"
                style={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }}
              />
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
