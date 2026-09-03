"use client";

import React, { useEffect, useRef, useCallback } from "react";
import SwashAccent from "@/components/SwashAccent";
import { getCachedFrames } from "@/lib/preloader";

// Frame Sequence Config
const DESKTOP_FRAMES = 199;
const DESKTOP_WIDTH = 1280;
const DESKTOP_HEIGHT = 720;

const MOBILE_FRAMES = 193;
const MOBILE_WIDTH = 720;
const MOBILE_HEIGHT = 1280;

function pad(n: number): string {
  return String(n).padStart(3, "0");
}

// Balanced, continuous frame distribution curve:
// Smooth, natural opening without rushing or skipping frames at initial scroll
// Stage 1 (0.00 -> 0.22 scroll): Gentle initial lift & steam (0.00 -> 0.25 frames)
// Stage 2 (0.22 -> 0.46 scroll): Crisp crust separation & molten cheese stretch (0.25 -> 0.55 frames)
// Stage 3 (0.46 -> 0.70 scroll): Energetic cheese heart explosion (0.55 -> 0.85 frames)
// Stage 4 (0.70 -> 0.94 scroll): Slower, deliberate reassembly (0.85 -> 1.00 frames)
// Tail Buffer (0.94 -> 1.00 scroll): Frame held at 1.0 so AboutSection eases up smoothly without snapping
function getFrameProgress(progress: number, isMobile: boolean): number {
  if (isMobile) {
    if (progress <= 0.20) {
      const t = progress / 0.20;
      return t * 0.24;
    }
    if (progress <= 0.44) {
      const t = (progress - 0.20) / 0.24;
      return 0.24 + t * 0.28;
    }
    if (progress <= 0.68) {
      const t = (progress - 0.44) / 0.24;
      return 0.52 + t * 0.32;
    }
    if (progress <= 0.94) {
      const t = (progress - 0.68) / 0.26;
      return 0.84 + Math.pow(t, 0.9) * 0.16;
    }
    return 1.0;
  }

  // Desktop smooth continuous curve with balanced pacing across all frames
  if (progress <= 0.22) {
    const t = progress / 0.22;
    return t * 0.25;
  }
  if (progress <= 0.46) {
    const t = (progress - 0.22) / 0.24;
    return 0.25 + t * 0.30;
  }
  if (progress <= 0.70) {
    const t = (progress - 0.46) / 0.24;
    return 0.55 + t * 0.30;
  }
  if (progress <= 0.94) {
    const t = (progress - 0.70) / 0.24;
    return 0.85 + Math.pow(t, 0.9) * 0.15;
  }
  return 1.0;
}

// Structured story acts: Origin → Craft (explosion and reassembly speak for themselves visually)
const ACTS = [
  {
    range: [0, 0.25] as [number, number],
    align: "center" as const,
    headline: (
      <>
        Hyderabad&apos;s Most <SwashAccent color="gold">Talked-About</SwashAccent> Kunafa
      </>
    ),
    body: "Hand-pressed on live copper hearths. 100% clarified ghee, molten mountain Akawi curd, drenched in Damascus rose attar. Fresh every single order.",
  },
  {
    range: [0.28, 0.52] as [number, number],
    align: "left" as const,
    headline: (
      <>
        Deconstructed <SwashAccent color="gold">Golden Crisp</SwashAccent> &amp; Heat
      </>
    ),
    body: "Individual spun strands of clarified-butter pastry lift away under acoustic heat. Copper-pan roasted at precisely 205°C for the signature snap.",
  },
];

// Helper: Calculate opacity with smooth fade in / hold / fade out
function getActOpacity(progress: number, range: [number, number]): number {
  const [start, end] = range;
  const fadeIn = 0.035;
  const fadeOut = 0.035;

  if (progress < start || progress > end) return 0;
  // Act 1 starts at 0, so it is fully visible immediately on page load
  if (start === 0) {
    if (progress > end - fadeOut) return (end - progress) / fadeOut;
    return 1;
  }
  if (progress < start + fadeIn) return (progress - start) / fadeIn;
  if (progress > end - fadeOut) return (end - progress) / fadeOut;
  return 1;
}

// Helper: Calculate subtle parallax horizontal drift
function getActX(
  progress: number,
  range: [number, number],
  align: "center" | "left" | "right"
): number {
  if (align === "center") return 0;
  const [start] = range;
  const fadeIn = 0.035;
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
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const hasPreloadedMobileRef = useRef(false);
  const hasPreloadedDesktopRef = useRef(false);
  const isInViewRef = useRef(true);

  // All scroll state lives in refs — zero React re-renders during scroll
  const progressRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);
  const layoutRef = useRef({ width: 0, height: 0, dpr: 1, isMobile: false });

  // High-performance continuous sub-frame draw with dual-frame alpha blending
  // Creates hundreds of smooth virtual in-between frames for buttery 60-120fps motion
  const drawFrame = useCallback((exactIndex: number) => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    const { width, height, dpr, isMobile } = layoutRef.current;
    if (width === 0 || height === 0) return;

    const totalFrames = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;
    const frameWidth = isMobile ? MOBILE_WIDTH : DESKTOP_WIDTH;
    const frameHeight = isMobile ? MOBILE_HEIGHT : DESKTOP_HEIGHT;
    const images = isMobile ? mobileImagesRef.current : desktopImagesRef.current;

    const clampedIndex = Math.max(0, Math.min(totalFrames - 1, exactIndex));
    const floorIndex = Math.floor(clampedIndex);
    const ceilIndex = Math.min(totalFrames - 1, floorIndex + 1);
    const blend = clampedIndex - floorIndex;

    const isReady = (img?: HTMLImageElement): boolean =>
      Boolean(img && img.complete && img.naturalWidth > 0);

    let targetImg1 = images[floorIndex];
    let targetImg2 = images[ceilIndex];

    if (!isReady(targetImg1)) {
      // Rapid fallback: find the nearest loaded frame in either direction
      for (let dist = 1; dist < totalFrames; dist++) {
        const prev = floorIndex - dist;
        const next = floorIndex + dist;
        if (prev >= 0 && isReady(images[prev])) {
          targetImg1 = images[prev];
          break;
        }
        if (next < totalFrames && isReady(images[next])) {
          targetImg1 = images[next];
          break;
        }
      }
    }
    if (!isReady(targetImg1)) return;

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
      ? Math.max(0, (height - drawHeight) / 2 + 35)
      : (height - drawHeight) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    try {
      // Draw base floor frame
      ctx.drawImage(targetImg1, offsetX, offsetY, drawWidth, drawHeight);

      // Micro-blend ceil frame for seamless continuous sub-frame transition
      if (blend > 0.015 && floorIndex !== ceilIndex && isReady(targetImg2)) {
        ctx.globalAlpha = blend;
        ctx.drawImage(targetImg2, offsetX, offsetY, drawWidth, drawHeight);
        ctx.globalAlpha = 1.0;
      }

      lastDrawnFrameRef.current = clampedIndex;
    } catch {
      // Safe fallback
    }

    ctx.restore();
  }, []);

  // Progressive Frame Preloader: Eagerly loads first 8-10 frames, background-loads the rest
  const preloadFrameSet = useCallback(
    (kind: "mobile" | "desktop") => {
      const isMob = kind === "mobile";
      if (isMob && hasPreloadedMobileRef.current) return;
      if (!isMob && hasPreloadedDesktopRef.current) return;

      const cached = getCachedFrames(kind);
      if (cached && cached.length > 0) {
        if (isMob) {
          hasPreloadedMobileRef.current = true;
          mobileImagesRef.current = cached;
        } else {
          hasPreloadedDesktopRef.current = true;
          desktopImagesRef.current = cached;
        }
        drawFrame(0);
        return;
      }

      if (isMob) hasPreloadedMobileRef.current = true;
      else hasPreloadedDesktopRef.current = true;

      const count = isMob ? MOBILE_FRAMES : DESKTOP_FRAMES;
      const folder = isMob ? "/mobile-view-framesv2" : "/Kunafa-animations-v2";
      // Both desktop and mobile now use ultra-optimized WebP
      const ext = "webp";
      const loadedArr: HTMLImageElement[] = new Array(count);

      const loadSingle = (i: number) => {
        const idx = i - 1;
        if (loadedArr[idx]) return;
        const img = new Image();
        img.src = `${folder}/ezgif-frame-${pad(i)}.${ext}`;
        img.decoding = "async";
        loadedArr[idx] = img;

        img.onload = () => {
          if (i === 1) {
            if (isMob) mobileImagesRef.current[0] = img;
            else desktopImagesRef.current[0] = img;
            // Draw initial frame as soon as frame 1 completes loading
            drawFrame(0);
          }
        };
      };

      // Stage 1: Load frame 1 immediately for instant paint
      loadSingle(1);

      // Stage 2: Eagerly load all frames for instant smooth playback
      for (let i = 2; i <= count; i++) {
        loadSingle(i);
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
      const isMobile = window.innerWidth < 768 || canvas.clientWidth < 768;
      const rawDpr = window.devicePixelRatio || 1;
      // Full Retina / OLED sub-pixel fidelity (supports up to 3x DPR without blurriness)
      const dpr = Math.min(rawDpr, 3);

      const width = canvas.clientWidth || (typeof window !== "undefined" ? window.innerWidth : 800);
      const height = canvas.clientHeight || (typeof window !== "undefined" ? window.innerHeight : 600);
      const targetW = Math.round(width * dpr);
      const targetH = Math.round(height * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      layoutRef.current = { width, height, dpr, isMobile };

      // Lazily preload opposite frame sequence if user crosses 768px breakpoint
      if (isMobile) preloadFrameSet("mobile");
      else preloadFrameSet("desktop");

      // Re-acquire context after resize
      const ctx = canvas.getContext("2d", { alpha: false });
      if (ctx) ctxRef.current = ctx;

      // Redraw current frame with sub-frame precision
      const totalFrames = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;
      const frameProgress = getFrameProgress(progressRef.current, isMobile);
      const exactFrame = frameProgress * (totalFrames - 1);
      drawFrame(exactFrame);
    };

    const ctx = canvas.getContext("2d", { alpha: false });
    if (ctx) ctxRef.current = ctx;
    updateLayout();

    const ro = new ResizeObserver(() => updateLayout());
    ro.observe(canvas);

    return () => ro.disconnect();
  }, [drawFrame, preloadFrameSet]);

  // Initial preload of active viewport frame sequence
  useEffect(() => {
    const isMobileInitial = typeof window !== "undefined" ? window.innerWidth < 768 : false;
    preloadFrameSet(isMobileInitial ? "mobile" : "desktop");
  }, [preloadFrameSet]);

  // Single high-performance RAF loop — completely paused when offscreen via IntersectionObserver
  useEffect(() => {
    let animFrame = 0;
    let isRunning = true;
    let cachedTotalScrollable = 1;
    let smoothProgress = 0;

    const measureLayout = () => {
      if (containerRef.current) {
        cachedTotalScrollable = Math.max(1, containerRef.current.offsetHeight - window.innerHeight);
      }
    };

    measureLayout();
    window.addEventListener("resize", measureLayout, { passive: true });
    window.addEventListener("orientationchange", measureLayout, { passive: true });

    const tick = () => {
      if (!isRunning) return;

      // If offscreen, do NOT schedule further frames — save battery and CPU
      if (!isInViewRef.current) {
        animFrame = 0;
        return;
      }

      const currentScrollY = window.scrollY;

      if (cachedTotalScrollable <= 1) {
        measureLayout();
      }

      const maxScroll = Math.max(1, cachedTotalScrollable);
      const targetProgress = Math.max(0, Math.min(1, currentScrollY / maxScroll));
      const isMobile = layoutRef.current.isMobile;

      // Responsive momentum lerp: immediate tracking without spongey buffer
      const lerpFactor = isMobile ? 0.12 : 0.18;
      const diff = targetProgress - smoothProgress;
      if (Math.abs(diff) > 0.00005) {
        smoothProgress += diff * lerpFactor;
      } else {
        smoothProgress = targetProgress;
      }

      progressRef.current = smoothProgress;

      // Continuous sub-frame rendering: blends adjacent frames on every micro-movement
      const totalFrames = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;
      const frameProgress = getFrameProgress(smoothProgress, isMobile);
      const exactFrame = frameProgress * (totalFrames - 1);

      if (Math.abs(exactFrame - lastDrawnFrameRef.current) > 0.01) {
        drawFrame(exactFrame);
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

      // Update scroll tutorial arrow indicator (fades out smoothly on first scroll progress 0.0 -> 0.035)
      if (scrollIndicatorRef.current) {
        const indicatorOpacity = Math.max(0, 1 - smoothProgress / 0.035);
        if (indicatorOpacity <= 0.01) {
          if (scrollIndicatorRef.current.style.visibility !== "hidden") {
            scrollIndicatorRef.current.style.opacity = "0";
            scrollIndicatorRef.current.style.visibility = "hidden";
          }
        } else {
          scrollIndicatorRef.current.style.opacity = String(indicatorOpacity);
          scrollIndicatorRef.current.style.visibility = "visible";
        }
      }

      animFrame = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (!animFrame && isRunning && isInViewRef.current) {
        animFrame = requestAnimationFrame(tick);
      }
    };

    // IntersectionObserver to truly pause/resume RAF loop
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined" && containerRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          const wasInView = isInViewRef.current;
          isInViewRef.current = entry.isIntersecting;
          if (entry.isIntersecting && !wasInView) {
            startLoop();
          }
        },
        { rootMargin: "0px 0px 0px 0px" }
      );
      observer.observe(containerRef.current);
    }

    startLoop();

    return () => {
      isRunning = false;
      if (observer) observer.disconnect();
      window.removeEventListener("resize", measureLayout);
      window.removeEventListener("orientationchange", measureLayout);
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [drawFrame]);

  return (
    <div
      ref={containerRef}
      id="story"
      className="relative w-full h-[350vh] sm:h-[300vh] bg-[#030303] will-change-transform"
    >
      {/* Sticky viewport with dvh dynamic mobile browser bar handling */}
      <div className="sticky top-0 h-[100dvh] h-screen w-full overflow-hidden bg-[#030303]">
        {/* Instant SSR/First-Paint LCP Hero Poster */}
        <picture className="absolute inset-0 w-full h-full pointer-events-none -z-0">
          <source media="(max-width: 767px)" srcSet="/mobile-view-framesv2/ezgif-frame-001.webp" type="image/webp" />
          <source media="(min-width: 768px)" srcSet="/Kunafa-animations-v2/ezgif-frame-001.webp" type="image/webp" />
          <img
            src="/mobile-view-framesv2/ezgif-frame-001.webp"
            alt="Captain Kunafa Hero"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="w-full h-full object-contain"
          />
        </picture>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none transform-gpu z-10"
        />

        {/* Edge blends */}
        <div className="absolute top-0 inset-x-0 h-24 sm:h-28 bg-gradient-to-b from-[#030303] via-[#030303]/80 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 inset-x-0 h-24 sm:h-28 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent pointer-events-none z-10" />

        {/* Prominent 2D Center Scroll Indicator — Large, centered, clean flat style, disappears on first scroll */}
        <div
          ref={scrollIndicatorRef}
          style={{ opacity: 1, visibility: "visible" }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 select-none pt-40 sm:pt-48"
        >
          <div className="flex flex-col items-center gap-2.5 animate-bounce">
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-white/90 uppercase font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Scroll to Explore
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 sm:w-7 sm:h-7 text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* Text Story Overlays — Styled with Tailwind, transforms managed via RAF ref updates */}
        {ACTS.map((act, i) => (
          <div
            key={i}
            ref={(el) => {
              overlayRefs.current[i] = el;
            }}
            style={{ opacity: 0, visibility: "hidden" }}
            className={`absolute inset-x-0 top-0 h-[100dvh] h-screen flex flex-col pointer-events-none z-20 px-6 sm:px-12 md:px-16 ${
              act.align === "center"
                ? "items-center justify-start pt-20 sm:pt-24 text-center"
                : act.align === "left"
                ? "items-start justify-center text-left"
                : "items-end justify-center text-right"
            }`}
          >
            {/* Desktop Inner Container for Parallax Slide */}
            <div
              data-desktop
              className={`max-w-xl flex flex-col will-change-transform ${
                act.align === "center"
                  ? "items-center text-center"
                  : act.align === "left"
                  ? "items-start text-left"
                  : "items-end text-right"
              }`}
            >
              {/* Act Heading */}
              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                {act.headline}
              </h2>

              {/* Act Body Narrative */}
              {act.body && (
                <p className="mt-3 sm:mt-4 font-sans text-xs sm:text-base text-white/85 leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] max-w-lg">
                  {act.body}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
