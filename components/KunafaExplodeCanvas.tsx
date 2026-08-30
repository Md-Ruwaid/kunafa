"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SwashAccent from "@/components/SwashAccent";

// Desktop configuration (16:9 landscape)
const DESKTOP_FRAMES = 100;
const DESKTOP_WIDTH = 1280;
const DESKTOP_HEIGHT = 720;

// Mobile configuration (9:16 portrait)
const MOBILE_FRAMES = 130;
const MOBILE_WIDTH = 720;
const MOBILE_HEIGHT = 1280;

// Structured story acts: Origin → Craft → Core Science → The Promise
const ACTS = [
  {
    range: [0, 0.23] as [number, number],
    align: "center" as const,
    headline: (
      <>
        Hyderabad&apos;s Most <SwashAccent color="gold">Talked-About</SwashAccent> Kunafa
      </>
    ),
    body: "Hand-pressed on live copper hearths. 100% clarified ghee, molten mountain Akawi curd, drenched in Damascus rose attar. Fresh every single order.",
  },
  {
    range: [0.25, 0.46] as [number, number],
    align: "left" as const,
    headline: (
      <>
        Deconstructed <SwashAccent color="gold">Golden Crisp</SwashAccent> &amp; Heat
      </>
    ),
    body: "Individual spun strands of clarified-butter pastry lift away under acoustic heat. Copper-pan roasted at precisely 205°C for the signature snap.",
  },
  {
    range: [0.49, 0.70] as [number, number],
    align: "right" as const,
    headline: (
      <>
        The Molten <SwashAccent color="gold">Akawi &amp; Nablusi</SwashAccent> Heart
      </>
    ),
    body: "18-hour cold-desalinated mountain Akawi and Nablusi curd, unfurling under heat with raw first-harvest Aleppo emerald pistachios.",
  },
  {
    range: [0.73, 0.89] as [number, number],
    align: "center" as const,
    headline: (
      <>
        Reassembled to <SwashAccent color="gold">Perfection</SwashAccent>
      </>
    ),
    body: "",
  },
];

function getActOpacity(progress: number, range: [number, number]): number {
  const [start, end] = range;
  const fadeIn = 0.04;
  const fadeOut = 0.04;
  if (progress < start) return 0;
  if (progress > end) return 0;

  // First act fully visible at the start
  if (start === 0 && progress < fadeIn) return 1;

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
  const desktopImagesRef = useRef<HTMLImageElement[]>([]);
  const mobileImagesRef = useRef<HTMLImageElement[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [loadedCount, setLoadedCount] = useState(0);
  const [totalTargetFrames, setTotalTargetFrames] = useState(DESKTOP_FRAMES);
  const [isLoaded, setIsLoaded] = useState(false);

  // All scroll state lives in refs — zero React re-renders during scroll
  const progressRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);
  const layoutRef = useRef({ width: 0, height: 0, dpr: 1, isMobile: false });

  // High-performance frame draw supporting responsive portrait mobile (130 frames) & landscape desktop (100 frames)
  const drawFrame = useCallback((frameIndex: number, currentProgress: number = 0) => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    const { width, height, dpr, isMobile } = layoutRef.current;
    if (width === 0 || height === 0) return;

    const totalFrames = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;
    const frameWidth = isMobile ? MOBILE_WIDTH : DESKTOP_WIDTH;
    const frameHeight = isMobile ? MOBILE_HEIGHT : DESKTOP_HEIGHT;
    const images = isMobile ? mobileImagesRef.current : desktopImagesRef.current;

    const clampedIndex = Math.max(0, Math.min(totalFrames - 1, frameIndex));
    let targetImg = images[clampedIndex];

    if (!targetImg || !targetImg.complete || targetImg.naturalWidth === 0) {
      if (lastDrawnFrameRef.current >= 0 && images[lastDrawnFrameRef.current]?.complete) {
        targetImg = images[lastDrawnFrameRef.current];
      }
    }
    if (!targetImg || !targetImg.complete || targetImg.naturalWidth === 0) return;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "#030303";
    ctx.fillRect(0, 0, width, height);

    const baseScale = Math.min(width / frameWidth, height / frameHeight);

    // Responsive scaling:
    // Mobile (portrait 720x1280): fits phone aspect ratio naturally with subtle 1.05x framing
    // Desktop (landscape 1280x720): crisp 1.15x cinematic framing
    const scaleMultiplier = isMobile ? 1.05 : 1.15;
    const scale = baseScale * scaleMultiplier;

    const drawWidth = frameWidth * scale;
    const drawHeight = frameHeight * scale;
    const offsetX = (width - drawWidth) / 2;
    const offsetY = isMobile
      ? Math.max(0, (height - drawHeight) / 2 + 40)
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

  // Cache canvas layout dimensions via ResizeObserver — runs only on resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateLayout = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const targetW = Math.round(width * dpr);
      const targetH = Math.round(height * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      const isMobile = width < 768;
      layoutRef.current = { width, height, dpr, isMobile };

      // Re-acquire context after resize
      ctxRef.current = canvas.getContext("2d", { alpha: false });

      // Redraw current frame at new size
      const totalFrames = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;
      const frameProgress = isMobile ? Math.pow(progressRef.current, 1.75) : progressRef.current;
      const targetFrame = Math.round(frameProgress * (totalFrames - 1));
      drawFrame(targetFrame, progressRef.current);
    };

    const ro = new ResizeObserver(updateLayout);
    ro.observe(canvas);
    updateLayout();

    return () => ro.disconnect();
  }, [drawFrame]);

  // Preload frame sequences (mobile 130 frames, desktop 100 frames)
  useEffect(() => {
    let mounted = true;
    const isMobileInitial = typeof window !== "undefined" ? window.innerWidth < 768 : false;
    const targetCount = isMobileInitial ? MOBILE_FRAMES : DESKTOP_FRAMES;
    setTotalTargetFrames(targetCount);

    const pad = (n: number) => String(n).padStart(3, "0");

    // Preload Mobile Frames (130 frames, 720x1280 portrait)
    const mobileLoaded: HTMLImageElement[] = new Array(MOBILE_FRAMES);
    let mobileCount = 0;

    for (let i = 1; i <= MOBILE_FRAMES; i++) {
      const img = new Image();
      const idx = i - 1;
      img.src = `/mobile-view-kunafa/ezgif-frame-${pad(i)}.png`;

      img.onload = () => {
        if (!mounted) return;
        mobileLoaded[idx] = img;
        mobileCount++;
        if (isMobileInitial) {
          setLoadedCount(mobileCount);
          if (i === 1) {
            mobileImagesRef.current[0] = img;
            drawFrame(0, 0);
          }
          if (mobileCount >= MOBILE_FRAMES) {
            mobileImagesRef.current = mobileLoaded;
            setIsLoaded(true);
            drawFrame(0, 0);
          }
        }
      };

      img.onerror = () => {
        if (!mounted) return;
        mobileCount++;
        if (isMobileInitial && mobileCount >= MOBILE_FRAMES) {
          mobileImagesRef.current = mobileLoaded;
          setIsLoaded(true);
          drawFrame(0, 0);
        }
      };

      mobileLoaded[idx] = img;
    }
    mobileImagesRef.current = mobileLoaded;

    // Preload Desktop Frames (100 frames, 1280x720 landscape)
    const desktopLoaded: HTMLImageElement[] = new Array(DESKTOP_FRAMES);
    let desktopCount = 0;

    for (let i = 1; i <= DESKTOP_FRAMES; i++) {
      const img = new Image();
      const idx = i - 1;
      img.src = `/Kunafa-animations-v2/ezgif-frame-${pad(i)}.png`;

      img.onload = () => {
        if (!mounted) return;
        desktopLoaded[idx] = img;
        desktopCount++;
        if (!isMobileInitial) {
          setLoadedCount(desktopCount);
          if (i === 1) {
            desktopImagesRef.current[0] = img;
            drawFrame(0, 0);
          }
          if (desktopCount >= DESKTOP_FRAMES) {
            desktopImagesRef.current = desktopLoaded;
            setIsLoaded(true);
            drawFrame(0, 0);
          }
        }
      };

      img.onerror = () => {
        if (!mounted) return;
        desktopCount++;
        if (!isMobileInitial && desktopCount >= DESKTOP_FRAMES) {
          desktopImagesRef.current = desktopLoaded;
          setIsLoaded(true);
          drawFrame(0, 0);
        }
      };

      desktopLoaded[idx] = img;
    }
    desktopImagesRef.current = desktopLoaded;

    return () => {
      mounted = false;
    };
  }, [drawFrame]);

  // Single RAF loop — reads Lenis-smoothed scroll directly, updates canvas + text overlays via DOM
  useEffect(() => {
    let animFrame: number;
    let isRunning = true;

    const tick = () => {
      if (!isRunning) return;

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;
        if (totalScrollable > 0) {
          const scrolled = -rect.top;
          const p = Math.max(0, Math.min(1, scrolled / totalScrollable));
          progressRef.current = p;

          // Draw the correct frame for current device
          const isMobile = layoutRef.current.isMobile;
          const totalFrames = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;

          // Non-linear frame distribution for mobile:
          // Spends ~80% of the scroll track savoring the slow levitation and initial lift (frames 1-85)
          // and concentrates the fully exploded end frame to only the last 20% of scroll
          const frameProgress = isMobile ? Math.pow(p, 1.75) : p;
          const targetFrame = Math.round(frameProgress * (totalFrames - 1));

          if (targetFrame !== lastDrawnFrameRef.current) {
            drawFrame(targetFrame, p);
          }

          // Update text overlay opacity/transforms directly via DOM — zero React re-renders
          for (let i = 0; i < ACTS.length; i++) {
            const el = overlayRefs.current[i];
            if (!el) continue;

            const opacity = getActOpacity(p, ACTS[i].range);
            const translateX = getActX(p, ACTS[i].range, ACTS[i].align);

            if (opacity <= 0.001) {
              el.style.opacity = "0";
              el.style.visibility = "hidden";
            } else {
              el.style.opacity = String(opacity);
              el.style.visibility = "visible";
              const desktopInner = el.querySelector<HTMLElement>("[data-desktop]");
              if (desktopInner) {
                desktopInner.style.transform = `translate3d(${translateX}px, 0, 0)`;
              }
            }
          }
        }
      }

      animFrame = requestAnimationFrame(tick);
    };

    animFrame = requestAnimationFrame(tick);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animFrame);
    };
  }, [drawFrame]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[900vh] sm:h-[750vh] bg-[#030303]"
    >
      {/* Preloader — Single Elegant Loading Line */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#030303]"
          >
            <div className="w-48 sm:w-64 h-1 bg-white/10 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-[#EFB80D] transition-all duration-150 ease-out shadow-[0_0_12px_#EFB80D]"
                style={{ width: `${(loadedCount / totalTargetFrames) * 100}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#030303]">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />

        {/* Edge blends */}
        <div className="absolute top-0 inset-x-0 h-24 sm:h-28 bg-gradient-to-b from-[#030303] via-[#030303]/80 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 inset-x-0 h-24 sm:h-28 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent pointer-events-none z-10" />

        {/* Text Overlay Layer — DOM-driven, zero React re-renders */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {ACTS.map((act, idx) => (
            <div
              key={idx}
              ref={(el) => { overlayRefs.current[idx] = el; }}
              className="absolute inset-0 pointer-events-none"
              style={{ opacity: 0, visibility: "hidden", willChange: "opacity" }}
            >
              {/* Mobile Typography — Placed above the canvas visual */}
              <div className="md:hidden absolute top-0 inset-x-0 pt-16 sm:pt-20 px-4 sm:px-6 text-center">
                <div className="max-w-md mx-auto py-2">
                  <h2 className="font-display font-bold text-2xl sm:text-3xl leading-tight text-[#FFF8EC] mb-2">
                    {act.headline}
                  </h2>
                  {act.body && (
                    <p className="font-sans text-xs sm:text-sm text-white/85 leading-relaxed">
                      {act.body}
                    </p>
                  )}
                </div>
              </div>

              {/* Desktop Typography — Positioned at top or flanked left/right */}
              <div
                data-desktop
                className={`hidden md:flex absolute inset-0 items-center ${
                  act.align === "left"
                    ? "justify-start pl-12 lg:pl-20 xl:pl-28"
                    : act.align === "right"
                    ? "justify-end pr-12 lg:pr-20 xl:pr-28"
                    : "items-start pt-24 lg:pt-28 justify-center text-center"
                }`}
                style={{ willChange: "transform" }}
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
                  {act.body && (
                    <p className="font-sans text-sm lg:text-base text-white/85 leading-relaxed">
                      {act.body}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 sm:h-48 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent pointer-events-none z-10" />

        {/* Mobile scroll hint */}
        <div className="absolute bottom-5 inset-x-0 z-20 flex justify-center pointer-events-none md:hidden">
          <div className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-widest text-[#EFB80D] bg-[#111111]/90 px-3.5 py-1.5 rounded-full border border-[#EFB80D]/30 shadow-lg backdrop-blur-md animate-bounce">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EFB80D]" />
            <span>SWIPE TO EXPLORE ↓</span>
          </div>
        </div>
      </div>
    </div>
  );
}
