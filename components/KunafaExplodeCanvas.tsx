"use client";

import React, { useEffect, useRef, useCallback } from "react";
import SwashAccent from "@/components/SwashAccent";
import {
  DESKTOP_FRAMES,
  DESKTOP_HEIGHT,
  DESKTOP_WIDTH,
  MOBILE_BREAKPOINT,
  MOBILE_FRAMES,
  MOBILE_HEIGHT,
  MOBILE_WIDTH,
  activeFrameKind,
  frameUrl,
} from "@/lib/frames";

/**
 * AboutSection is pulled up over this container with `-mt-[100vh]`, so the last
 * viewport of the runway is spent underneath it. Scroll progress is normalised
 * against the runway MINUS that overlap, which makes the sequence finish exactly
 * as AboutSection starts to cover it. Keep in sync with AboutSection's margin.
 */
const ABOUT_OVERLAP_VIEWPORTS = 1;

// Mobile non-linear frame distribution curve:
// Stage 1 (0 -> 0.32 scroll): Ultra-slow, steady initial levitation (frames 0 to 10) for Phrase 1
// Stage 2 (0.32 -> 0.60 scroll): Gentle separation (frames 10 to 35) for Phrase 2
// Stage 3 (0.60 -> 0.82 scroll): Molten cheese heart explosion (frames 35 to 90) for Phrase 3
// Stage 4 (0.82 -> 1.00 scroll): Smooth crisp reassembly (frames 90 to 130) for Phrase 4
function getFrameProgress(progress: number, isMobile: boolean): number {
  if (!isMobile) return progress;

  if (progress <= 0.32) {
    const t = progress / 0.32;
    return Math.pow(t, 2.0) * 0.08;
  }
  if (progress <= 0.60) {
    const t = (progress - 0.32) / 0.28;
    return 0.08 + Math.pow(t, 1.3) * 0.20;
  }
  if (progress <= 0.82) {
    const t = (progress - 0.60) / 0.22;
    return 0.28 + t * 0.42;
  }
  const t = (progress - 0.82) / 0.18;
  return 0.70 + Math.pow(t, 0.9) * 0.30;
}

// Structured story acts: Origin → Craft → Core Science → The Promise
const ACTS = [
  {
    range: [0, 0.28] as [number, number],
    align: "center" as const,
    headline: (
      <>
        Hyderabad&apos;s Most <SwashAccent color="gold">Talked-About</SwashAccent> Kunafa
      </>
    ),
    plainHeadline: "Hyderabad’s Most Talked-About Kunafa",
    body: "Hand-pressed on live copper hearths. 100% clarified ghee, molten mountain Akawi curd, drenched in Damascus rose attar. Fresh every single order.",
  },
  {
    range: [0.32, 0.56] as [number, number],
    align: "left" as const,
    headline: (
      <>
        Deconstructed <SwashAccent color="gold">Golden Crisp</SwashAccent> &amp; Heat
      </>
    ),
    plainHeadline: "Deconstructed Golden Crisp & Heat",
    body: "Individual spun strands of clarified-butter pastry lift away under acoustic heat. Copper-pan roasted at precisely 205°C for the signature snap.",
  },
  {
    range: [0.60, 0.80] as [number, number],
    align: "right" as const,
    headline: (
      <>
        The Molten <SwashAccent color="gold">Akawi &amp; Nablusi</SwashAccent> Heart
      </>
    ),
    plainHeadline: "The Molten Akawi & Nablusi Heart",
    body: "18-hour cold-desalinated mountain Akawi and Nablusi curd, unfurling under heat with raw first-harvest Aleppo emerald pistachios.",
  },
  {
    range: [0.84, 0.98] as [number, number],
    align: "center" as const,
    headline: (
      <>
        Reassembled to <SwashAccent color="gold">Perfection</SwashAccent>
      </>
    ),
    plainHeadline: "Reassembled to Perfection",
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

// Helper: Calculate subtle parallax horizontal drift
function getActX(
  progress: number,
  range: [number, number],
  align: "center" | "left" | "right"
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
      const loadedArr: HTMLImageElement[] = new Array(count);

      for (let i = 1; i <= count; i++) {
        const img = new Image();
        const idx = i - 1;
        img.src = frameUrl(kind, i);
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

      const isMobile = width < MOBILE_BREAKPOINT;
      layoutRef.current = { width, height, dpr, isMobile };

      // Lazily preload opposite frame sequence if the user crosses the breakpoint
      if (isMobile) preloadFrameSet("mobile");
      else preloadFrameSet("desktop");

      // Re-acquire context after resize
      const ctx = canvas.getContext("2d", { alpha: false });
      if (ctx) ctxRef.current = ctx;

      // Redraw current frame
      const totalFrames = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;
      const frameProgress = getFrameProgress(progressRef.current, isMobile);
      const frame = Math.round(frameProgress * (totalFrames - 1));
      drawFrame(frame);
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
    preloadFrameSet(activeFrameKind());
  }, [preloadFrameSet]);

  // Single high-performance RAF loop — paused when offscreen via IntersectionObserver
  useEffect(() => {
    let animFrame: number;
    let isRunning = true;
    let cachedTotalScrollable = 0;
    let smoothProgress = 0;

    const measureLayout = () => {
      if (containerRef.current) {
        // Sticky panel costs one viewport; AboutSection covers the next one.
        const consumed = window.innerHeight * (1 + ABOUT_OVERLAP_VIEWPORTS);
        cachedTotalScrollable = containerRef.current.offsetHeight - consumed;
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
        // Gentler lerp on mobile to completely absorb touch spikes
        const lerpFactor = isMobile ? 0.055 : 0.14;

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
      id="story"
      className="relative w-full h-[1200vh] md:h-[550vh] bg-[#030303]"
    >
      {/*
        Screen-reader copy of the story. The animated overlays below are driven by
        RAF and spend most of their life at `visibility: hidden`, which removes
        them from the accessibility tree — so the narrative is published once here
        in reading order and the visual layer is marked aria-hidden.
      */}
      <div className="sr-only">
        <h2>The Kunafa Story</h2>
        {ACTS.map((act, i) => (
          <section key={i}>
            <h3>{act.plainHeadline}</h3>
            <p>{act.body}</p>
          </section>
        ))}
      </div>

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#030303]">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Edge blends */}
        <div className="absolute top-0 inset-x-0 h-24 sm:h-28 bg-gradient-to-b from-[#030303] via-[#030303]/80 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 inset-x-0 h-24 sm:h-28 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent pointer-events-none z-10" />

        {/* Text Story Overlays — Styled with Tailwind, transforms managed via RAF ref updates */}
        {ACTS.map((act, i) => (
          <div
            key={i}
            ref={(el) => {
              overlayRefs.current[i] = el;
            }}
            aria-hidden="true"
            style={{ opacity: 0, visibility: "hidden" }}
            className={`absolute inset-x-0 top-0 h-screen flex flex-col pointer-events-none z-20 px-6 sm:px-12 md:px-16 ${
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
              className={`max-w-xl flex flex-col ${
                act.align === "center"
                  ? "items-center text-center"
                  : act.align === "left"
                  ? "items-start text-left"
                  : "items-end text-right"
              }`}
            >
              {/* Act Heading */}
              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                {act.headline}
              </h2>

              {/* Act Body Narrative */}
              {act.body && (
                <p className="mt-3 sm:mt-4 font-sans text-xs sm:text-base text-white/85 leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-lg">
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
