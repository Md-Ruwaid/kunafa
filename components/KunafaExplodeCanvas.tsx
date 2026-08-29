"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SwashAccent from "@/components/SwashAccent";
import { ShipHelm } from "@/components/NauticalElements";
import FoldText from "@/components/FoldText";

const TOTAL_FRAMES = 100;
const FRAME_WIDTH = 1280;
const FRAME_HEIGHT = 720;

// Official Captain Kunafa Platter Imagery to sit in the canvas animation frames
const PRODUCT_IMAGES = [
  "https://captainkunafa.com/wp-content/uploads/2024/01/Group-104666.png", // Act 0: The Captain's Original Akawi
  "https://captainkunafa.com/wp-content/uploads/2024/01/Group-104667.png", // Act 1: Aleppo Emerald Pistachio Crown
  "https://captainkunafa.com/wp-content/uploads/2024/01/Group-104665.png", // Act 2: Molten Akawi / Dark Choco Lava
  "https://captainkunafa.com/wp-content/uploads/2024/01/Group-104664.png", // Act 3: Lotus Biscoff Royale
];

// Structured story acts: Origin → Craft → Core Science → The Promise
const ACTS = [
  {
    range: [0, 0.22] as [number, number],
    align: "center" as const,
    headline: (
      <FoldText
        text="Hyderabad's Most Talked-About Kunafa"
        splitBy="word"
        hinge="left"
        trigger="mount"
        duration={0.7}
        stagger={0.06}
        ease="power3.out"
        perspective={700}
        creaseShading={0.55}
        fontSize="inherit"
        fontWeight="inherit"
        color="#FFF8EC"
        highlightWords={["Talked-About"]}
        highlightColor="#EFB80D"
      />
    ),
    body: "Hand-pressed on live copper hearths. 100% clarified ghee, molten mountain Akawi curd, drenched in Damascus rose attar. Fresh every single order.",
  },
  {
    range: [0.25, 0.50] as [number, number],
    align: "left" as const,
    headline: (
      <FoldText
        text="Deconstructed Golden Crisp & Heat"
        splitBy="word"
        hinge="top"
        trigger="mount"
        duration={0.65}
        stagger={0.05}
        ease="power3.out"
        perspective={700}
        creaseShading={0.55}
        fontSize="inherit"
        fontWeight="inherit"
        color="#FFF8EC"
        highlightWords={["Golden", "Crisp"]}
        highlightColor="#EFB80D"
      />
    ),
    body: "Individual spun strands of clarified-butter pastry lift away under acoustic heat. Copper-pan roasted at precisely 205°C for the signature snap.",
  },
  {
    range: [0.53, 0.78] as [number, number],
    align: "right" as const,
    headline: (
      <FoldText
        text="The Molten Akawi & Nablusi Heart"
        splitBy="word"
        hinge="bottom"
        trigger="mount"
        duration={0.65}
        stagger={0.05}
        ease="power3.out"
        perspective={700}
        creaseShading={0.55}
        fontSize="inherit"
        fontWeight="inherit"
        color="#FFF8EC"
        highlightWords={["Akawi", "Nablusi"]}
        highlightColor="#EFB80D"
      />
    ),
    body: "18-hour cold-desalinated mountain Akawi and Nablusi curd, unfurling under heat with raw first-harvest Aleppo emerald pistachios.",
  },
  {
    range: [0.82, 1.0] as [number, number],
    align: "center" as const,
    headline: (
      <FoldText
        text="Reassembled to Perfection"
        splitBy="word"
        hinge="left"
        trigger="mount"
        duration={0.7}
        stagger={0.05}
        ease="power3.out"
        perspective={700}
        creaseShading={0.55}
        fontSize="inherit"
        fontWeight="inherit"
        color="#FFF8EC"
        highlightWords={["Perfection"]}
        highlightColor="#EFB80D"
      />
    ),
    body: "Since 2021, over 50,000 voyagers across Hyderabad have tasted the original recipe. From Barkas to our branches — fresh-pressed, every time.",
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
  const productImagesRef = useRef<HTMLImageElement[]>([]);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Canvas drawing with subtle zoom-in, explosion sequence AND official product images
  const drawFrame = useCallback((index: number, currentProgress = 0) => {
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

    // Subtle zoom-in (1.14x) so the kunafa is prominent and delicious while preserving full explosion visibility
    const baseScale = Math.min(width / FRAME_WIDTH, height / FRAME_HEIGHT);
    const scale = baseScale * 1.14;

    const drawWidth = FRAME_WIDTH * scale;
    const drawHeight = FRAME_HEIGHT * scale;
    const offsetX = (width - drawWidth) / 2;
    const offsetY = (height - drawHeight) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    // Render official Captain Kunafa platter pictures directly on the canvas animation frames
    ACTS.forEach((act, actIdx) => {
      const prodImg = productImagesRef.current[actIdx];
      if (!prodImg || !prodImg.complete) return;

      const actOpacity = getActOpacity(currentProgress, act.range);
      if (actOpacity <= 0) return;

      ctx.save();
      ctx.globalAlpha = Math.min(1, actOpacity * 0.95);

      const isMobile = width < 768;
      const maxDim = isMobile ? Math.min(width * 0.44, height * 0.35, 240) : Math.min(width * 0.35, height * 0.48, 360);

      let prodX = width * 0.5;
      let prodY = height * 0.5;

      if (act.align === "left") {
        prodX = isMobile ? width * 0.5 : width * 0.74;
        prodY = isMobile ? height * 0.68 : height * 0.5;
      } else if (act.align === "right") {
        prodX = isMobile ? width * 0.5 : width * 0.26;
        prodY = isMobile ? height * 0.68 : height * 0.5;
      } else {
        prodX = width * 0.5;
        prodY = isMobile ? height * 0.66 : height * 0.60;
      }

      // Draw subtle ambient gold aura behind the official platter
      const glow = ctx.createRadialGradient(prodX, prodY, 10, prodX, prodY, maxDim * 0.65);
      glow.addColorStop(0, "rgba(239, 184, 13, 0.25)");
      glow.addColorStop(0.5, "rgba(239, 184, 13, 0.08)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(prodX, prodY, maxDim * 0.65, 0, Math.PI * 2);
      ctx.fill();

      // Draw the official platter image
      const aspect = prodImg.naturalHeight / (prodImg.naturalWidth || 1);
      const pWidth = maxDim;
      const pHeight = maxDim * aspect;
      ctx.drawImage(prodImg, prodX - pWidth / 2, prodY - pHeight / 2, pWidth, pHeight);
      ctx.restore();
    });

    ctx.restore();
  }, []);

  // Preload all frames & official product imagery
  useEffect(() => {
    let mounted = true;
    const loadedImages: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let count = 0;
    const pad = (n: number) => String(n).padStart(3, "0");

    // Preload official product images
    PRODUCT_IMAGES.forEach((url, idx) => {
      const prodImg = new Image();
      prodImg.crossOrigin = "anonymous";
      prodImg.src = url;
      prodImg.onload = () => {
        if (!mounted) return;
        productImagesRef.current[idx] = prodImg;
      };
      productImagesRef.current[idx] = prodImg;
    });

    // Preload explosion sequence frames
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
          drawFrame(0, 0);
        }
        if (count >= TOTAL_FRAMES) {
          imagesRef.current = loadedImages;
          setIsLoaded(true);
          drawFrame(0, 0);
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

  // Single scroll handler synchronized with frame and progress
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
      if (targetFrame !== lastFrame || Math.abs(p - progress) > 0.005) {
        lastFrame = targetFrame;
        drawFrame(targetFrame, p);
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
  }, [drawFrame, progress]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[550vh] sm:h-[600vh] bg-[#030303]"
    >
      {/* Preloader / Initial Loading indicator */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030303] text-[#FFF8EC]"
          >
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center">
                <ShipHelm size={32} className="text-[#EFB80D]" />
              </div>
            </div>

            <div className="font-display font-bold text-xl tracking-wider mb-2">
              CAPTAIN <span className="text-[#EFB80D]">KUNAFA</span>
            </div>

            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#C4B5A5] mb-6">
              HEATING COPPER HEARTHS
            </div>

            <div className="w-48 h-1 bg-[#111111] rounded-full overflow-hidden mb-3 border border-white/5">
              <div
                className="h-full bg-[#EFB80D] transition-all duration-150 ease-out"
                style={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] sm:text-xs text-white/50">
                LOADING EXPERIENCE
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-[#EFB80D]">
                {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#030303]">
        {/* Canvas behind everything - Contained with subtle zoom and official product platters */}
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
                    ? "left-0 w-full md:w-[50%] justify-center md:justify-start"
                    : act.align === "right"
                    ? "right-0 w-full md:w-[50%] justify-center md:justify-end"
                    : "inset-x-0 justify-center"
                }`}
                style={{
                  opacity,
                  transform: `translateX(${translateX}px)`,
                  transition: "none",
                }}
              >
                {/* Mobile-optimized typography container */}
                <div
                  className={`w-full max-w-lg ${
                    act.align === "center"
                      ? "text-center mx-auto"
                      : "text-center md:text-left mx-auto md:mx-0 p-4 md:p-0"
                  }`}
                >
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
                  <p className="font-sans text-xs sm:text-sm md:text-base text-white/85 leading-relaxed max-w-lg mx-auto md:mx-0">
                    {act.body}
                  </p>
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
