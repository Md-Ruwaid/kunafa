"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowDown, ChevronRight, Layers, Volume2, VolumeX } from "lucide-react";
import { audio } from "@/lib/audio";

const TOTAL_FRAMES = 100;
const FRAME_WIDTH = 1280;
const FRAME_HEIGHT = 720;

interface KunafaExplodeCanvasProps {
  onOpenOrderModal?: () => void;
  onExploreAnatomy?: () => void;
}

export default function KunafaExplodeCanvas({
  onOpenOrderModal,
  onExploreAnatomy,
}: KunafaExplodeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  // Framer Motion Scroll hook on container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Dynamic Phase calculation
  const getPhaseName = (progress: number) => {
    if (progress < 0.2) return "PHASE I: ROYAL ORIGIN";
    if (progress < 0.5) return "PHASE II: KATAIFI EXPANSION";
    if (progress < 0.8) return "PHASE III: CORE DISASSEMBLY";
    return "PHASE IV: GOLDEN REASSEMBLY";
  };

  // Preload all 100 frames
  useEffect(() => {
    let active = true;
    const loadedImages: HTMLImageElement[] = [];
    let loaded = 0;

    const padZero = (n: number) => String(n).padStart(3, "0");

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      // Primary webp format with instant fallback
      img.src = `/kunafa-frames/ezgif-frame-${padZero(i)}.webp`;

      img.onload = () => {
        if (!active) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) {
          setImages(loadedImages);
          // Slight delay for smooth preloader outro
          setTimeout(() => {
            if (active) setIsLoaded(true);
          }, 350);
        }
      };

      img.onerror = () => {
        // Fallback to png if webp fails
        img.src = `/kunafa-frames/ezgif-frame-${padZero(i)}.png`;
      };

      loadedImages.push(img);
    }

    return () => {
      active = false;
    };
  }, []);

  // Canvas drawing routine with contain-fit scaling and High-DPI support
  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !images[index]) return;

      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Background clear to exact #030303
      ctx.fillStyle = "#030303";
      ctx.fillRect(0, 0, displayWidth, displayHeight);

      // Calculate Contain Fit for 16:9 (1280x720)
      const img = images[index];
      const scale = Math.min(displayWidth / FRAME_WIDTH, displayHeight / FRAME_HEIGHT);
      const drawWidth = FRAME_WIDTH * scale;
      const drawHeight = FRAME_HEIGHT * scale;
      const offsetX = (displayWidth - drawWidth) / 2;
      const offsetY = (displayHeight - drawHeight) / 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      ctx.restore();
    },
    [images]
  );

  // Synchronize frame with scroll progress
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    // Draw initial frame
    renderFrame(0);

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const clamped = Math.max(0, Math.min(1, latest));
      const targetFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(clamped * TOTAL_FRAMES)
      );

      setScrollPercentage(Math.round(clamped * 100));
      setCurrentFrame((prev) => {
        if (prev !== targetFrame) {
          audio.playFrameTick(targetFrame);
          renderFrame(targetFrame);
          return targetFrame;
        }
        return prev;
      });
    });

    const handleResize = () => {
      renderFrame(currentFrame);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded, images, scrollYProgress, renderFrame, currentFrame]);

  // Framer Motion Opacity & Transform mappings for 4 Acts
  // Act 1: 0% - 20%
  const act1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.22], [1, 0.9, 0]);
  const act1Y = useTransform(scrollYProgress, [0, 0.2], [0, -40]);

  // Act 2: 24% - 48% (Left aligned - Kataifi Explosion)
  const act2Opacity = useTransform(scrollYProgress, [0.22, 0.30, 0.42, 0.48], [0, 1, 1, 0]);
  const act2X = useTransform(scrollYProgress, [0.22, 0.30, 0.48], [-40, 0, -30]);

  // Act 3: 52% - 76% (Right aligned - Molten Core)
  const act3Opacity = useTransform(scrollYProgress, [0.50, 0.58, 0.70, 0.76], [0, 1, 1, 0]);
  const act3X = useTransform(scrollYProgress, [0.50, 0.58, 0.76], [40, 0, 30]);

  // Act 4: 80% - 100% (Centered CTA - Reassembled)
  const act4Opacity = useTransform(scrollYProgress, [0.80, 0.88, 1], [0, 1, 1]);
  const act4Y = useTransform(scrollYProgress, [0.80, 0.90], [50, 0]);

  const toggleSound = () => {
    const unmuted = audio.toggleMute();
    setIsMuted(!unmuted);
  };

  const scrollToNext = () => {
    if (typeof window !== "undefined") {
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[#030303]">
      {/* 1. High-End Preloader */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030303] text-white select-none"
          >
            {/* Ambient gold glow */}
            <div className="absolute w-96 h-96 rounded-full bg-[#EFB80D]/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
              {/* Spinning luxury emblem */}
              <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-dashed border-[#EFB80D]/30"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="absolute inset-2 rounded-full border-t-2 border-r-2 border-[#EFB80D]"
                />
                <Sparkles className="w-6 h-6 text-[#EFB80D] animate-pulse" />
              </div>

              {/* Functional Title */}
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#EFB80D] mb-2">
                CAPTAIN KUNAFA
              </span>

              <h2 className="font-display text-2xl font-semibold text-white/95 mb-4">
                LOADING <span className="accent-italic">VOYAGE…</span>
              </h2>

              {/* Progress Bar & Frame Counter */}
              <div className="w-full bg-white/10 h-[2px] rounded-full overflow-hidden mb-3 relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#DA7034] via-[#EFB80D] to-[#EFB80D]"
                  style={{ width: `${Math.round((loadedCount / TOTAL_FRAMES) * 100)}%` }}
                />
              </div>

              <div className="flex items-center justify-between w-full font-mono text-[11px] text-white/50 tracking-wider">
                <span>FRAME [{String(loadedCount).padStart(3, "0")} / {TOTAL_FRAMES}]</span>
                <span className="text-[#EFB80D]">
                  {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#030303]">
        {/* HTML5 Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain pointer-events-none"
          style={{ width: "100%", height: "100%", display: "block" }}
        />

        {/* Ambient Top & Bottom Seamless Blends */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#030303] via-[#030303]/60 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#030303] via-[#030303]/60 to-transparent pointer-events-none z-10" />

        {/* 3. High-Performance Telemetry HUD (Plex Mono) */}
        {isLoaded && (
          <>
            {/* Top Right Live Telemetry */}
            <div className="absolute top-6 right-6 z-30 hidden md:flex items-center gap-3 font-mono text-[11px] tracking-widest text-white/50 bg-[#0a0a0a]/80 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#EFB80D] animate-ping" />
              <span className="text-[#EFB80D] font-medium">LIVE</span>
              <span className="text-white/30">|</span>
              <span>FRAME {String(currentFrame + 1).padStart(3, "0")} / {TOTAL_FRAMES}</span>
              <span className="text-white/30">|</span>
              <span className="text-white/80">{scrollPercentage}%</span>
            </div>

            {/* Bottom HUD Bar */}
            <div className="absolute bottom-6 inset-x-6 z-30 flex items-center justify-between pointer-events-none">
              {/* Left HUD: Phase Badge */}
              <div className="font-mono text-[11px] tracking-widest uppercase text-white/60 bg-black/60 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md pointer-events-auto">
                <span className="text-[#EFB80D] font-semibold">ACT: </span>
                {getPhaseName(scrollPercentage / 100)}
              </div>

              {/* Center Progress Dots */}
              <div className="hidden lg:flex items-center gap-2 bg-black/60 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md pointer-events-auto">
                {[0, 30, 60, 90].map((step, idx) => {
                  const isActive = scrollPercentage >= step && scrollPercentage < step + 30;
                  return (
                    <div key={idx} className="flex items-center gap-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          isActive
                            ? "w-6 bg-[#EFB80D]"
                            : scrollPercentage >= step
                            ? "w-2 bg-[#EFB80D]/40"
                            : "w-1.5 bg-white/20"
                        }`}
                      />
                      <span className={`font-mono text-[9px] ${isActive ? "text-[#EFB80D]" : "text-white/30"}`}>
                        0{idx + 1}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Right HUD: Sound & Quick Scroll Controls */}
              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  onClick={toggleSound}
                  className="flex items-center gap-2 font-mono text-[11px] text-white/70 hover:text-[#EFB80D] bg-black/60 hover:bg-black/90 border border-white/10 hover:border-[#EFB80D]/40 px-3.5 py-1.5 rounded-full backdrop-blur-md transition-all cursor-pointer"
                  title="Toggle Procedural Audio"
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-white/40" />
                      <span className="hidden sm:inline">SOUND: OFF</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-[#EFB80D]" />
                      <span className="hidden sm:inline text-[#EFB80D]">SOUND: ON</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}

        {/* 4. Story Text Overlays */}
        {/* ACT 1 (0% Scroll): Centered Hero */}
        <motion.div
          style={{ opacity: act1Opacity, y: act1Y }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 z-20 pointer-events-none"
        >
          <div className="max-w-3xl flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#EFB80D] bg-[#EFB80D]/10 border border-[#EFB80D]/20 px-3.5 py-1 rounded-full mb-6 backdrop-blur-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#EFB80D]" />
              <span>THE ARTISANAL VOYAGE</span>
            </motion.div>

            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold text-white/95 leading-[1.1] tracking-tight mb-6">
              The Royal Alchemy of <span className="accent-italic">Captain</span> Kunafa
            </h1>

            <p className="font-sans text-base sm:text-lg md:text-xl text-white/60 max-w-xl font-normal leading-relaxed mb-8">
              Hand-spun golden kataifi encasing molten artisanal Akawi cheese, bathed in warm orange blossom nectar.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto">
              <button
                onClick={scrollToNext}
                className="group flex items-center gap-3 bg-[#EFB80D] hover:bg-[#ffc926] text-[#030303] font-sans font-semibold text-sm px-7 py-3.5 rounded-full shadow-[0_0_30px_rgba(239,184,13,0.3)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Begin Disassembly Scroll</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </button>

              <button
                onClick={() => {
                  audio.playChime(659);
                  onOpenOrderModal?.();
                }}
                className="flex items-center gap-2 text-white/80 hover:text-[#EFB80D] font-sans text-sm px-6 py-3.5 rounded-full border border-white/15 hover:border-[#EFB80D]/40 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all cursor-pointer"
              >
                <span>Reserve Batch</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Animated Scroll Prompt Indicator */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="mt-12 flex flex-col items-center gap-2 opacity-60"
            >
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">
                SCROLL TO DETONATE
              </span>
              <div className="w-[1px] h-8 bg-gradient-to-b from-[#EFB80D] to-transparent" />
            </motion.div>
          </div>
        </motion.div>

        {/* ACT 2 (30% Scroll): Left-Aligned Feature #1 (Pastry Expands) */}
        <motion.div
          style={{ opacity: act2Opacity, x: act2X }}
          className="absolute inset-y-0 left-0 w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-12 md:pl-20 z-20 pointer-events-none"
        >
          <div className="max-w-lg glass-panel p-8 sm:p-10 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Terracotta glow pill */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#DA7034]/15 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#DA7034] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DA7034]" />
              <span>01 / STRUCTURAL EXPANSION</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white/90 leading-tight mb-4">
              Deconstructed <span className="accent-italic">Crisp</span> & Tension
            </h2>

            <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed mb-6 font-normal">
              Individual strands of clarified-butter kataifi gently separate under thermal expansion. 
              Crisped to a resonant 48 dB audible crunch at precisely 205°C copper-pan roasting.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 font-mono text-xs">
              <div>
                <div className="text-white/40 uppercase text-[10px] tracking-wider mb-1">ROAST SPEC</div>
                <div className="text-[#EFB80D] font-medium text-sm">Ghee Clarified Kataifi</div>
              </div>
              <div>
                <div className="text-white/40 uppercase text-[10px] tracking-wider mb-1">CRUNCH METRIC</div>
                <div className="text-[#DA7034] font-medium text-sm">48 dB Acoustic Snap</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ACT 3 (60% Scroll): Right-Aligned Feature #2 (Core Disassembled) */}
        <motion.div
          style={{ opacity: act3Opacity, x: act3X }}
          className="absolute inset-y-0 right-0 w-full md:w-1/2 flex flex-col justify-center items-end px-6 sm:px-12 md:pr-20 z-20 pointer-events-none"
        >
          <div className="max-w-lg glass-panel p-8 sm:p-10 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden text-left">
            {/* Captain Gold glow accent */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#EFB80D]/15 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#EFB80D] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EFB80D]" />
              <span>02 / ZERO-GRAVITY CORE</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white/90 leading-tight mb-4">
              The Molten <span className="accent-italic">Akawi</span> Heart
            </h2>

            <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed mb-6 font-normal">
              Suspended in microgravity, the desalinated Nablusi and sweet Akawi cheese core unfurls 
              with raw Aleppo emerald pistachios and crystallized orange blossom pearls.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 font-mono text-xs">
              <div>
                <div className="text-white/40 uppercase text-[10px] tracking-wider mb-1">CHEESE FORMULA</div>
                <div className="text-[#EFB80D] font-medium text-sm">70% Akawi / 30% Nablusi</div>
              </div>
              <div>
                <div className="text-white/40 uppercase text-[10px] tracking-wider mb-1">PISTACHIO GRADE</div>
                <div className="text-white/90 font-medium text-sm">First-Harvest Aleppo</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ACT 4 (90% Scroll): Centered CTA & Reassembly */}
        <motion.div
          style={{ opacity: act4Opacity, y: act4Y }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 z-20 pointer-events-none"
        >
          <div className="max-w-2xl flex flex-col items-center glass-panel-gold p-8 sm:p-12 rounded-3xl border border-[#EFB80D]/30 shadow-[0_0_60px_rgba(239,184,13,0.15)] relative">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#EFB80D] bg-[#EFB80D]/10 border border-[#EFB80D]/20 px-3.5 py-1 rounded-full mb-4">
              <span>FINALE / SYNTHESIS</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold text-white/95 leading-tight mb-4">
              Reassembled to <span className="accent-italic">Perfection</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-white/70 max-w-lg leading-relaxed mb-8 font-normal">
              The golden disc unites into an unparalleled symphony of crunch, molten warmth, and floral sweetness. 
              Baked strictly on-order in numbered batches.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto">
              <button
                onClick={() => {
                  audio.playChime(784);
                  onOpenOrderModal?.();
                }}
                className="group flex items-center gap-3 bg-[#EFB80D] hover:bg-[#ffc926] text-[#030303] font-sans font-semibold text-base px-8 py-4 rounded-full shadow-[0_0_35px_rgba(239,184,13,0.4)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Reserve Today’s Batch</span>
                <Sparkles className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  audio.playChime(523);
                  onExploreAnatomy?.();
                }}
                className="flex items-center gap-2 text-white/90 hover:text-[#EFB80D] font-sans text-sm px-6 py-4 rounded-full border border-white/20 hover:border-[#EFB80D]/50 bg-black/40 hover:bg-black/60 backdrop-blur-md transition-all cursor-pointer"
              >
                <Layers className="w-4 h-4 text-[#EFB80D]" />
                <span>Explore Anatomy Lab</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
