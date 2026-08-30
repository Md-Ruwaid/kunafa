"use client";

import React, { useEffect, useRef, useCallback } from "react";
import SwashAccent from "@/components/SwashAccent";

// Frame Sequence Config
const DESKTOP_FRAMES = 100;
const DESKTOP_WIDTH = 1280;
const DESKTOP_HEIGHT = 720;

const MOBILE_FRAMES = 50;
const MOBILE_WIDTH = 720;
const MOBILE_HEIGHT = 1280;

function pad(n: number): string {
  return String(n).padStart(3, "0");
}

// Mobile non-linear frame distribution curve:
// Gives plenty of slow, smooth scroll time to the first two phrases / initial levitation
function getFrameProgress(progress: number, isMobile: boolean): number {
  return isMobile ? Math.pow(progress, 1.7) : progress;
}

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
    body: "Served sizzling hot within 60 seconds of pan flip. Taste authentic Levantine perfection.",
  },
];

// Helper: Calculate opacity with smooth fade in / hold / fade out
function getActOpacity(progress: number, range: [number, number]): number {
  const [start, end] = range;
  const fadeIn = 0.04;
  const fadeOut = 0.04;

  if (progress < start || progress > end) return 0;
  if (progress < start + fadeIn) return (progress - start) / fadeIn;
  if (progress > end - fadeOut) return (end - progress) / fadeOut;
  return 1;
}

// Helper: Calculate subtle parallax horizontal entry translate
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

  const hasPreloadedMobileRef = useRef(false);
  const hasPreloadedDesktopRef = useRef(false);
  const isInViewRef = useRef(true);

  // All scroll state lives in refs — zero React re-renders during scroll
  const progressRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);
  const layoutRef = useRef({ width: 0, height: 0, dpr: 1, isMobile: false });

  // High-performance frame draw supporting responsive portrait mobile (130 frames) & landscape desktop (100 frames)
  const drawFrame = useCallback((frameIndex: number) => {
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
      // Rapid fallback: find the nearest loaded frame in either direction
      for (let dist = 1; dist < totalFrames; dist++) {
        const prev = clampedIndex - dist;
        const next = clampedIndex + dist;
        if (prev >= 0 && images[prev]?.complete && images[prev]?.naturalWidth > 0) {
          targetImg = images[prev];
          break;
        }
        if (next < totalFrames && images[next]?.complete && images[next]?.naturalWidth > 0) {
          targetImg = images[next];
          break;
        }
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

  // Frame preloader function guarded to only download required sequence
  const preloadFrameSet = useCallback(
    (kind: "mobile" | "desktop") => {
      const isMob = kind === "mobile";
      if (isMob && hasPreloadedMobileRef.current) return;
      if (!isMob && hasPreloadedDesktopRef.current) return;

      if (isMob) hasPreloadedMobileRef.current = true;
      else hasPreloadedDesktopRef.current = true;

      const count = isMob ? MOBILE_FRAMES : DESKTOP_FRAMES;
      const folder = isMob ? "/mobile-view-framesv2" : "/Kunafa-animations-v2";
      const ext = isMob ? "webp" : "png";
      const loadedArr: HTMLImageElement[] = new Array(count);

      for (let i = 1; i <= count; i++) {
        const img = new Image();
        const idx = i - 1;
        img.src = `${folder}/ezgif-frame-${pad(i)}.${ext}`;
        loadedArr[idx] = img;

        img.onload = () => {
          if (i === 1) {
            if (isMob) mobileImagesRef.current[0] = img;
            else desktopImagesRef.current[0] = img;
            drawFrame(0);
          }
        };
      }

      if (isMob) mobileImagesRef.current = loadedArr;
      else desktopImagesRef.current = loadedArr;
    },
    [drawFrame]
  );

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

      // Lazily preload opposite frame sequence if user crosses 768px breakpoint
      if (isMobile) preloadFrameSet("mobile");
      else preloadFrameSet("desktop");

      // Re-acquire context after resize
      ctxRef.current = canvas.getContext("2d", { alpha: false });

      // Redraw current frame at new size
      const totalFrames = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;
      const frameProgress = getFrameProgress(progressRef.current, isMobile);
      const targetFrame = Math.round(frameProgress * (totalFrames - 1));
      drawFrame(targetFrame);
    };

    const ro = new ResizeObserver(updateLayout);
    ro.observe(canvas);
    updateLayout();

    return () => ro.disconnect();
  }, [drawFrame, preloadFrameSet]);

  // Initial preload of active viewport frame sequence
  useEffect(() => {
    const isMobileInitial = typeof window !== "undefined" ? window.innerWidth < 768 : false;
    preloadFrameSet(isMobileInitial ? "mobile" : "desktop");
  }, [preloadFrameSet]);

  // Single high-performance RAF loop — paused when offscreen via IntersectionObserver
  useEffect(() => {
    let animFrame: number;
    let isRunning = true;
    let cachedTotalScrollable = 0;
    let smoothProgress = 0;

    const measureLayout = () => {
      if (containerRef.current) {
        cachedTotalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      }
    };

    measureLayout();
    window.addEventListener("resize", measureLayout, { passive: true });

    // IntersectionObserver to pause loop when container is off-screen
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined" && containerRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isInViewRef.current = entry.isIntersecting;
        },
        { rootMargin: "50% 0px 50% 0px" }
      );
      observer.observe(containerRef.current);
    }

    const tick = () => {
      if (!isRunning) return;

      // Skip processing when scrolled far outside the hero viewport
      if (!isInViewRef.current) {
        animFrame = requestAnimationFrame(tick);
        return;
      }

      const currentScrollY = window.scrollY;

      if (cachedTotalScrollable <= 0) {
        measureLayout();
      }

      if (cachedTotalScrollable > 0) {
        const targetProgress = Math.max(0, Math.min(1, currentScrollY / cachedTotalScrollable));
        const isMobile = layoutRef.current.isMobile;
        const lerpFactor = isMobile ? 0.08 : 0.14;

        // Continuous smooth lerp for buttery, stutter-free 60-120 FPS momentum
        const diff = targetProgress - smoothProgress;
        if (Math.abs(diff) > 0.00005) {
          smoothProgress += diff * lerpFactor;
        } else {
          smoothProgress = targetProgress;
        }

        progressRef.current = smoothProgress;

        // Draw the correct frame for current device
        const totalFrames = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;
        const frameProgress = getFrameProgress(smoothProgress, isMobile);
        const targetFrame = Math.round(frameProgress * (totalFrames - 1));

        if (targetFrame !== lastDrawnFrameRef.current) {
          drawFrame(targetFrame);
        }

        // Update text overlay opacity/transforms directly via DOM — zero React re-renders
        for (let i = 0; i < ACTS.length; i++) {
          const el = overlayRefs.current[i];
          if (!el) continue;

          const opacity = getActOpacity(smoothProgress, ACTS[i].range);
          const translateX = getActX(smoothProgress, ACTS[i].range, ACTS[i].align);

          if (opacity <= 0.001) {
            if (el.style.visibility !== "hidden") {
              el.style.opacity = "0";
              el.style.visibility = "hidden";
            }
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

      animFrame = requestAnimationFrame(tick);
    };

    animFrame = requestAnimationFrame(tick);

    return () => {
      isRunning = false;
      if (observer) observer.disconnect();
      window.removeEventListener("resize", measureLayout);
      cancelAnimationFrame(animFrame);
    };
  }, [drawFrame]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[850vh] sm:h-[550vh] bg-[#030303]"
    >
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

              {/* Desktop Typography */}
              <div
                className={`hidden md:flex absolute inset-0 items-center px-8 lg:px-16 ${
                  act.align === "left"
                    ? "justify-start"
                    : act.align === "right"
                    ? "justify-end"
                    : "justify-center"
                }`}
              >
                <div
                  data-desktop
                  className={`max-w-xl transition-transform duration-75 ease-out ${
                    act.align === "center" ? "text-center max-w-2xl" : ""
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
