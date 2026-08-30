"use client";

import React, { useEffect, useRef, useCallback } from "react";
import SwashAccent from "@/components/SwashAccent";
import { frameSrc, getCachedFrame, primeFrame } from "@/lib/heroFrameCache";

// Frame Sequence Config
const DESKTOP_FRAMES = 100;
const DESKTOP_WIDTH = 1280;
const DESKTOP_HEIGHT = 720;

const MOBILE_FRAMES = 130;
const MOBILE_WIDTH = 720;
const MOBILE_HEIGHT = 1280;

const LOAD_BATCH = 10;

// Mobile non-linear frame distribution curve:
// Spends ~80% of the scroll track savoring the slow levitation and initial lift (frames 1-85)
// and concentrates the fully exploded end frame to only the last 20% of scroll
function getFrameProgress(progress: number, isMobile: boolean): number {
  return isMobile ? Math.pow(progress, 1.75) : progress;
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
    body: "",
  },
];

const FADE_IN = 0.07;
const FADE_OUT = 0.07;

function easeOutCubic(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return 1 - Math.pow(1 - clamped, 3);
}

function getActOpacity(progress: number, range: [number, number]): number {
  const [start, end] = range;

  if (progress < start || progress > end) return 0;
  // Opening act starts at scroll 0 — visible immediately on load
  if (start === 0) return 1;
  if (progress < start + FADE_IN) {
    return easeOutCubic((progress - start) / FADE_IN);
  }
  if (progress > end - FADE_OUT) {
    return easeOutCubic((end - progress) / FADE_OUT);
  }
  return 1;
}

function getActX(
  progress: number,
  range: [number, number],
  align: "left" | "right" | "center"
): number {
  if (align === "center" || range[0] === 0) return 0;
  const [start] = range;
  if (progress < start + FADE_IN) {
    const t = easeOutCubic((progress - start) / FADE_IN);
    return align === "left" ? -20 * (1 - t) : 20 * (1 - t);
  }
  if (progress > range[1] - FADE_OUT) {
    const t = easeOutCubic((range[1] - progress) / FADE_OUT);
    return align === "left" ? -12 * (1 - t) : 12 * (1 - t);
  }
  return 0;
}

function getActY(progress: number, range: [number, number]): number {
  const [start, end] = range;
  if (start === 0) return 0;
  if (progress < start + FADE_IN) {
    const t = easeOutCubic((progress - start) / FADE_IN);
    return 14 * (1 - t);
  }
  if (progress > end - FADE_OUT) {
    const t = easeOutCubic((end - progress) / FADE_OUT);
    return -10 * (1 - t);
  }
  return 0;
}

type LayoutState = {
  width: number;
  height: number;
  dpr: number;
  isMobile: boolean;
  scale: number;
  offsetX: number;
  offsetY: number;
  drawWidth: number;
  drawHeight: number;
};

type OverlayInnerRefs = {
  desktop: HTMLDivElement | null;
  mobile: HTMLDivElement | null;
};

export default function KunafaExplodeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const desktopImagesRef = useRef<HTMLImageElement[]>([]);
  const mobileImagesRef = useRef<HTMLImageElement[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayInnerRefs = useRef<OverlayInnerRefs[]>([]);

  const preloadStateRef = useRef({ mobile: false, desktop: false });
  const isInViewRef = useRef(true);

  const progressRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);
  const layoutRef = useRef<LayoutState>({
    width: 0,
    height: 0,
    dpr: 1,
    isMobile: false,
    scale: 1,
    offsetX: 0,
    offsetY: 0,
    drawWidth: 0,
    drawHeight: 0,
  });

  const drawFrame = useCallback((frameIndex: number) => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    const layout = layoutRef.current;
    const { width, height, dpr, isMobile, offsetX, offsetY, drawWidth, drawHeight } =
      layout;
    if (width === 0 || height === 0) return;

    const totalFrames = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;
    const images = isMobile ? mobileImagesRef.current : desktopImagesRef.current;

    const clampedIndex = Math.max(0, Math.min(totalFrames - 1, frameIndex));
    let targetImg = images[clampedIndex];

    if (!targetImg?.complete || targetImg.naturalWidth === 0) {
      for (let dist = 1; dist < totalFrames; dist++) {
        const prev = clampedIndex - dist;
        const next = clampedIndex + dist;
        if (prev >= 0 && images[prev]?.complete && images[prev].naturalWidth > 0) {
          targetImg = images[prev];
          break;
        }
        if (next < totalFrames && images[next]?.complete && images[next].naturalWidth > 0) {
          targetImg = images[next];
          break;
        }
      }
    }
    if (!targetImg?.complete || targetImg.naturalWidth === 0) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#030303";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(targetImg, offsetX, offsetY, drawWidth, drawHeight);
    lastDrawnFrameRef.current = clampedIndex;
  }, []);

  const preloadFrameSet = useCallback(
    (kind: "mobile" | "desktop") => {
      const isMob = kind === "mobile";
      if (isMob ? preloadStateRef.current.mobile : preloadStateRef.current.desktop) return;

      if (isMob) preloadStateRef.current.mobile = true;
      else preloadStateRef.current.desktop = true;

      const count = isMob ? MOBILE_FRAMES : DESKTOP_FRAMES;
      const folder = isMob ? "/mobile-view-kunafa" : "/Kunafa-animations-v2";
      const loadedArr: HTMLImageElement[] = new Array(count);

      const assignFrame = (index: number) => {
        const src = frameSrc(folder, index);
        const img = getCachedFrame(src);
        loadedArr[index - 1] = img;
        return img;
      };

      // Frame 1: highest priority — paint hero immediately
      const first = assignFrame(1);
      void primeFrame(first.src, true).then(() => drawFrame(0));

      // Frames 2–20: early scroll range
      for (let i = 2; i <= Math.min(20, count); i++) assignFrame(i);

      // Remaining frames: idle batches to avoid network congestion
      let cursor = 21;
      const loadBatch = (deadline?: IdleDeadline) => {
        const budget = deadline ? Math.min(LOAD_BATCH, deadline.timeRemaining() > 8 ? LOAD_BATCH : 4) : LOAD_BATCH;
        const end = Math.min(cursor + budget, count + 1);
        for (let i = cursor; i < end; i++) assignFrame(i);
        cursor = end;
        if (cursor <= count) {
          if (typeof requestIdleCallback !== "undefined") {
            requestIdleCallback(loadBatch, { timeout: 2500 });
          } else {
            setTimeout(loadBatch, 48);
          }
        }
      };

      if (count > 20) {
        if (typeof requestIdleCallback !== "undefined") {
          requestIdleCallback(loadBatch, { timeout: 1200 });
        } else {
          setTimeout(loadBatch, 64);
        }
      }

      if (isMob) mobileImagesRef.current = loadedArr;
      else desktopImagesRef.current = loadedArr;
    },
    [drawFrame]
  );

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
      const frameWidth = isMobile ? MOBILE_WIDTH : DESKTOP_WIDTH;
      const frameHeight = isMobile ? MOBILE_HEIGHT : DESKTOP_HEIGHT;
      const scale = Math.max(width / frameWidth, height / frameHeight);
      const drawWidth = frameWidth * scale;
      const drawHeight = frameHeight * scale;

      layoutRef.current = {
        width,
        height,
        dpr,
        isMobile,
        scale,
        offsetX: (width - drawWidth) / 2,
        offsetY: (height - drawHeight) / 2,
        drawWidth,
        drawHeight,
      };

      if (isMobile) preloadFrameSet("mobile");
      else preloadFrameSet("desktop");

      if (!ctxRef.current) {
        ctxRef.current = canvas.getContext("2d", {
          alpha: false,
          desynchronized: true,
        });
      }

      const totalFrames = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;
      const frameProgress = getFrameProgress(progressRef.current, isMobile);
      drawFrame(Math.round(frameProgress * (totalFrames - 1)));
    };

    const ro = new ResizeObserver(updateLayout);
    ro.observe(canvas);
    updateLayout();

    return () => ro.disconnect();
  }, [drawFrame, preloadFrameSet]);

  useEffect(() => {
    let scrollRaf = 0;
    let cachedTotalScrollable = 0;

    const measureLayout = () => {
      if (containerRef.current) {
        cachedTotalScrollable =
          containerRef.current.offsetHeight - window.innerHeight;
      }
    };

    const applyOverlayState = (p: number) => {
      for (let i = 0; i < ACTS.length; i++) {
        const el = overlayRefs.current[i];
        if (!el) continue;

        const opacity = getActOpacity(p, ACTS[i].range);
        const translateX = getActX(p, ACTS[i].range, ACTS[i].align);
        const translateY = getActY(p, ACTS[i].range);
        const transform = `translate3d(${translateX}px, ${translateY}px, 0)`;

        if (opacity <= 0.001) {
          el.style.opacity = "0";
          el.style.visibility = "hidden";
        } else {
          el.style.opacity = String(opacity);
          el.style.visibility = "visible";
          const { desktop, mobile } = overlayInnerRefs.current[i] ?? {};
          if (desktop) desktop.style.transform = transform;
          // Mobile overlays stay fixed in place — no scroll-driven slide
          if (mobile) mobile.style.transform = "none";
        }
      }
    };

    const updateFromScroll = () => {
      scrollRaf = 0;
      if (!isInViewRef.current) return;

      if (cachedTotalScrollable <= 0) measureLayout();

      const p =
        cachedTotalScrollable > 0
          ? Math.max(0, Math.min(1, window.scrollY / cachedTotalScrollable))
          : 0;
      progressRef.current = p;

      const { isMobile } = layoutRef.current;
      const totalFrames = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;
      const targetFrame = Math.round(
        getFrameProgress(p, isMobile) * (totalFrames - 1)
      );

      if (targetFrame !== lastDrawnFrameRef.current) {
        drawFrame(targetFrame);
      }

      applyOverlayState(p);
    };

    const onScroll = () => {
      if (!scrollRaf) scrollRaf = requestAnimationFrame(updateFromScroll);
    };

    measureLayout();
    updateFromScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measureLayout, { passive: true });

    let observer: IntersectionObserver | null = null;
    if (containerRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isInViewRef.current = entry.isIntersecting;
          if (entry.isIntersecting) onScroll();
        },
        { rootMargin: "50% 0px 50% 0px" }
      );
      observer.observe(containerRef.current);
    }

    return () => {
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measureLayout);
      observer?.disconnect();
    };
  }, [drawFrame]);

  return (
    <div
      id="story"
      ref={containerRef}
      className="relative w-full h-[900vh] sm:h-[750vh] bg-transparent"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[#030303]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#030303]/60 to-transparent pointer-events-none z-10" />

        <div className="absolute inset-0 z-20 pointer-events-none">
          {ACTS.map((act, idx) => (
            <div
              key={idx}
              ref={(el) => {
                overlayRefs.current[idx] = el;
              }}
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: idx === 0 ? 1 : 0,
                visibility: idx === 0 ? "visible" : "hidden",
              }}
            >
              <div className="md:hidden absolute inset-0 flex items-center justify-center px-5 sm:px-6 text-center pt-16 pb-24">
                <div
                  ref={(el) => {
                    if (!overlayInnerRefs.current[idx]) {
                      overlayInnerRefs.current[idx] = { desktop: null, mobile: null };
                    }
                    overlayInnerRefs.current[idx].mobile = el;
                  }}
                  data-mobile
                  className="hero-act-mobile-panel w-full max-w-lg mx-auto py-5 px-5 sm:px-6"
                >
                  {idx === 0 && (
                    <div
                      aria-hidden
                      className="flex items-center justify-center gap-2.5 mb-3 hero-act-headline--enter"
                    >
                      <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#EFB80D]/80" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#EFB80D]">
                        Est. Hyderabad
                      </span>
                      <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#EFB80D]/80" />
                    </div>
                  )}
                  <h2
                    className={`font-display font-bold leading-[1.08] text-[#FFF8EC] mb-3 ${
                      idx === 0
                        ? "text-[2rem] sm:text-4xl hero-act-headline hero-act-headline--enter"
                        : "text-[1.75rem] sm:text-[2.125rem] hero-act-headline"
                    }`}
                  >
                    {act.headline}
                  </h2>
                  {act.body && (
                    <p
                      className={`font-sans text-sm sm:text-base text-white/92 leading-relaxed ${
                        idx === 0
                          ? "hero-act-body hero-act-body--enter"
                          : "hero-act-body"
                      }`}
                    >
                      {act.body}
                    </p>
                  )}
                  {idx === 0 && (
                    <div aria-hidden className="hero-act-divider hero-act-divider--enter" />
                  )}
                </div>
              </div>

              <div
                className={`hidden md:flex absolute inset-x-0 px-8 lg:px-16 ${
                  idx === 0
                    ? "top-0 pt-24 lg:pt-28 justify-center items-start"
                    : `inset-y-0 items-center ${
                        act.align === "left"
                          ? "justify-start"
                          : act.align === "right"
                          ? "justify-end"
                          : "justify-center"
                      }`
                }`}
              >
                <div
                  ref={(el) => {
                    if (!overlayInnerRefs.current[idx]) {
                      overlayInnerRefs.current[idx] = { desktop: null, mobile: null };
                    }
                    overlayInnerRefs.current[idx].desktop = el;
                  }}
                  data-desktop
                  className={
                    act.align === "center" || idx === 0
                      ? "text-center max-w-2xl"
                      : "max-w-xl"
                  }
                >
                  {idx === 0 && (
                    <div
                      aria-hidden
                      className="flex items-center justify-center gap-3 mb-4 hero-act-headline--enter"
                    >
                      <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#EFB80D]/80" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#EFB80D]">
                        Est. Hyderabad
                      </span>
                      <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#EFB80D]/80" />
                    </div>
                  )}
                  <h2
                    className={`font-display font-bold leading-[1.15] text-[#FFF8EC] mb-3 lg:mb-4 ${
                      idx === 0
                        ? "text-4xl lg:text-6xl hero-act-headline hero-act-headline--enter"
                        : act.align === "center"
                        ? "text-4xl lg:text-6xl hero-act-headline"
                        : "text-3xl lg:text-5xl hero-act-headline"
                    }`}
                  >
                    {act.headline}
                  </h2>
                  {act.body && (
                    <p
                      className={`font-sans text-sm lg:text-base text-white/90 leading-relaxed ${
                        idx === 0
                          ? "hero-act-body hero-act-body--enter max-w-xl mx-auto"
                          : "hero-act-body"
                      }`}
                    >
                      {act.body}
                    </p>
                  )}
                  {idx === 0 && (
                    <div aria-hidden className="hero-act-divider hero-act-divider--enter" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

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
