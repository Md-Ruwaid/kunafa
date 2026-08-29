"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowDown, ChevronRight, Layers, Volume2, VolumeX } from "lucide-react";
import CtaPill from "@/components/CtaPill";
import SwashAccent from "@/components/SwashAccent";
import { audio } from "@/lib/audio";

const TOTAL_FRAMES = 100;
const FRAME_WIDTH = 1280;
const FRAME_HEIGHT = 720;

export default function KunafaExplodeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  // Framer Motion Scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Canvas drawing routine with High-DPI support and contain-fit scaling
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Exact #030303 background clear
    ctx.fillStyle = "#030303";
    ctx.fillRect(0, 0, width, height);

    // Contain fit calculation for 16:9
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

  // Preload frames
  useEffect(() => {
    let mounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;

    const pad = (n: number) => String(n).padStart(3, "0");

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/kunafa-frames/ezgif-frame-${pad(i)}.webp`;

      img.onload = () => {
        if (!mounted) return;
        count++;
        setLoadedCount(count);
        // Draw frame 0 as soon as it arrives
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
        // Fallback to png
        img.src = `/kunafa-frames/ezgif-frame-${pad(i)}.png`;
      };

      loadedImages[i - 1] = img;
    }

    imagesRef.current = loadedImages;

    return () => {
      mounted = false;
    };
  }, [drawFrame]);

  // Robust, Direct Window Scroll + Framer Motion Synced Listener
  useEffect(() => {
    let animFrame: number;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      const targetFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(progress * TOTAL_FRAMES)
      );

      const percent = Math.round(progress * 100);
      setScrollPercentage(percent);

      if (targetFrame !== currentFrame) {
        setCurrentFrame(targetFrame);
        audio.playFrameTick(targetFrame);
        drawFrame(targetFrame);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Initial render call
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(animFrame);
    };
  }, [drawFrame, currentFrame]);

  // Framer Motion Opacity mappings
  const act1Opacity = useTransform(scrollYProgress, [0, 0.16, 0.23], [1, 0.9, 0]);
  const act1Y = useTransform(scrollYProgress, [0, 0.22], [0, -30]);

  const act2Opacity = useTransform(scrollYProgress, [0.22, 0.30, 0.42, 0.49], [0, 1, 1, 0]);
  const act2X = useTransform(scrollYProgress, [0.22, 0.30, 0.49], [-40, 0, -30]);

  const act3Opacity = useTransform(scrollYProgress, [0.50, 0.58, 0.70, 0.77], [0, 1, 1, 0]);
  const act3X = useTransform(scrollYProgress, [0.50, 0.58, 0.77], [40, 0, 30]);

  const act4Opacity = useTransform(scrollYProgress, [0.80, 0.88, 1], [0, 1, 1]);
  const act4Y = useTransform(scrollYProgress, [0.80, 0.90], [40, 0]);

  const toggleSound = () => {
    const unmuted = audio.toggleMute();
    setIsMuted(!unmuted);
  };

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[#030303]">
      {/* Preloader */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030303] text-white select-none"
          >
            <div className="flex flex-col items-center max-w-sm px-6 text-center">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#EFB80D] animate-spin mb-6" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#EFB80D] mb-2">
                CAPTAIN KUNAFA
              </span>
              <h2 className="font-display text-2xl font-semibold text-white/95 mb-4">
                LOADING <SwashAccent>VOYAGE…</SwashAccent>
              </h2>
              <div className="w-full bg-white/10 h-[2px] rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-[#EFB80D] transition-all duration-150"
                  style={{ width: `${Math.round((loadedCount / TOTAL_FRAMES) * 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between w-full font-mono text-[11px] text-white/50">
                <span>FRAME [{String(loadedCount).padStart(3, "0")} / {TOTAL_FRAMES}]</span>
                <span className="text-[#EFB80D]">{Math.round((loadedCount / TOTAL_FRAMES) * 100)}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#030303]">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain pointer-events-none block"
        />

        {/* Ambient Top & Bottom Blends */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#030303] to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none z-10" />

        {/* Telemetry HUD */}
        <div className="absolute top-20 sm:top-24 right-4 sm:right-8 z-30 flex items-center gap-3 font-mono text-[11px] text-white/60 bg-[#241509]/80 border border-[#E7DCC9]/15 px-4 py-1.5 rounded-full backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#EFB80D] animate-ping" />
          <span className="text-[#EFB80D]">LIVE</span>
          <span>FRAME {String(currentFrame + 1).padStart(3, "0")} / {TOTAL_FRAMES}</span>
          <span className="text-white/40">|</span>
          <span>{scrollPercentage}%</span>
        </div>

        {/* Bottom Sound & Hint */}
        <div className="absolute bottom-6 inset-x-6 z-30 flex items-center justify-between pointer-events-none">
          <div className="font-mono text-[11px] tracking-widest uppercase text-white/60 bg-[#241509]/80 border border-[#E7DCC9]/15 px-3.5 py-1.5 rounded-full backdrop-blur-md pointer-events-auto">
            <span className="text-[#EFB80D] font-semibold">STAGE: </span>
            {scrollPercentage < 25
              ? "01 ROYAL ORIGIN"
              : scrollPercentage < 55
              ? "02 KATAIFI EXPANSION"
              : scrollPercentage < 80
              ? "03 MOLTEN DISASSEMBLY"
              : "04 GOLDEN REASSEMBLY"}
          </div>

          <button
            type="button"
            onClick={toggleSound}
            className="pointer-events-auto flex items-center gap-2 font-mono text-[11px] text-white/70 hover:text-[#EFB80D] bg-[#241509]/80 border border-[#E7DCC9]/15 px-3.5 py-1.5 rounded-full backdrop-blur-md cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EFB80D]"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-white/40" /> : <Volume2 className="w-3.5 h-3.5 text-[#EFB80D]" />}
            <span className="hidden sm:inline">{isMuted ? "SOUND: OFF" : "SOUND: ON"}</span>
          </button>
        </div>

        {/* 4 Story Acts */}
        {/* Act 1: 0% Scroll */}
        <motion.div
          style={{ opacity: act1Opacity, y: act1Y }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 z-20 pointer-events-none"
        >
          <div className="max-w-3xl flex flex-col items-center">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#EFB80D] bg-[#EFB80D]/10 border border-[#EFB80D]/25 px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE ROYAL LEVANTINE VOYAGE</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold text-[#FFF8EC] leading-[1.1] mb-6">
              The Royal Alchemy of <SwashAccent>Captain</SwashAccent> Kunafa
            </h1>

            <p className="font-sans text-base sm:text-lg text-white/60 max-w-xl mb-8 leading-relaxed">
              Hand-spun golden kataifi encasing molten artisanal Akawi cheese, drenched in orange blossom nectar.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto">
              <CtaPill href="/menu" size="lg">
                EXPLORE MENU
              </CtaPill>
              <button
                type="button"
                onClick={() => window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" })}
                className="flex items-center gap-2 text-white/80 hover:text-[#EFB80D] font-sans text-sm px-6 py-4 rounded-full border border-white/15 hover:border-[#EFB80D]/40 bg-white/5 backdrop-blur-sm transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EFB80D]"
              >
                <span>Scroll to Detonate</span>
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Act 2: 30% Scroll (Left aligned) */}
        <motion.div
          style={{ opacity: act2Opacity, x: act2X }}
          className="absolute inset-y-0 left-0 w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-12 md:pl-20 z-20 pointer-events-none"
        >
          <div className="max-w-lg bg-[#241509]/85 border border-[#E7DCC9]/15 p-8 rounded-[20px] shadow-2xl backdrop-blur-xl">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#DA7034] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DA7034]" />
              <span>01 / KATAIFI TENSION</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#FFF8EC] mb-4">
              Deconstructed <SwashAccent>Crisp</SwashAccent> & Tension
            </h2>
            <p className="font-sans text-sm text-white/65 leading-relaxed mb-4">
              Individual strands of clarified-butter pastry lift away under acoustic heat. 
              Copper-pan roasted at precisely 205°C to deliver a resonant 48 dB audible crunch.
            </p>
            <div className="font-mono text-xs text-[#EFB80D]">
              ROAST METRIC: 205°C COPPER SEAR
            </div>
          </div>
        </motion.div>

        {/* Act 3: 60% Scroll (Right aligned) */}
        <motion.div
          style={{ opacity: act3Opacity, x: act3X }}
          className="absolute inset-y-0 right-0 w-full md:w-1/2 flex flex-col justify-center items-end px-6 sm:px-12 md:pr-20 z-20 pointer-events-none"
        >
          <div className="max-w-lg bg-[#241509]/85 border border-[#E7DCC9]/15 p-8 rounded-[20px] shadow-2xl backdrop-blur-xl text-left">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#EFB80D] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EFB80D]" />
              <span>02 / ZERO-GRAVITY CORE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#FFF8EC] mb-4">
              The Molten <SwashAccent>Akawi</SwashAccent> Heart
            </h2>
            <p className="font-sans text-sm text-white/65 leading-relaxed mb-4">
              Suspended in microgravity, 18-hour desalinated mountain Akawi curd unfurls with 
              raw first-harvest Aleppo emerald pistachios and Damascus rosewater.
            </p>
            <div className="font-mono text-xs text-[#EFB80D]">
              CHEESE BLEND: 70% AKAWI / 30% NABLUSI
            </div>
          </div>
        </motion.div>

        {/* Act 4: 90% Scroll (Centered Finale) */}
        <motion.div
          style={{ opacity: act4Opacity, y: act4Y }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 z-20 pointer-events-none"
        >
          <div className="max-w-2xl bg-[#241509]/90 border border-[#EFB80D]/30 p-8 sm:p-12 rounded-[20px] shadow-[0_0_50px_rgba(239,184,13,0.15)] backdrop-blur-2xl">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#EFB80D] mb-3">
              FINALE & SYNTHESIS
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#FFF8EC] mb-4">
              Reassembled to <SwashAccent>Perfection</SwashAccent>
            </h2>
            <p className="font-sans text-sm sm:text-base text-white/70 max-w-lg mx-auto mb-8 leading-relaxed">
              The golden disc unites into an unparalleled symphony of crunch, molten warmth, and floral sweetness.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
              <CtaPill href="/menu" size="lg">
                ORDER FRESH PLATTER
              </CtaPill>
              <CtaPill href="/franchise" variant="secondary" size="lg">
                JOIN THE FLEET
              </CtaPill>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
