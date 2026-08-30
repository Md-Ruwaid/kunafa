"use client";

import React, { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Croissant,
  MessageCircle,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import BrandName from "@/components/BrandName";
import {
  SectionMotion,
  StatLedger,
  useSectionReveal,
} from "@/components/SectionPrimitives";
import type {
  CircularGalleryHandle,
  GalleryItem,
} from "@/components/CircularGallery";
import { buildWhatsAppLink, BRAND_PHONE_DISPLAY } from "@/lib/contact";

const CircularGallery = dynamic(() => import("@/components/CircularGallery"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#EFB80D] border-t-transparent" />
    </div>
  ),
});

const PLATTERS = [
  {
    image: "/platters/platter-original.png",
    name: "Original Kunafa",
    tagline: "Clarified ghee, Akawi heart, rose attar",
    icon: Croissant,
    tag: "House Classic",
  },
  {
    image: "/platters/platter-pistachio.png",
    name: "Pistachio Royale",
    tagline: "First-harvest Aleppo emerald pistachios",
    icon: Sparkles,
    tag: "Best Seller",
  },
  {
    image: "/platters/platter-biscoff.png",
    name: "Biscoff Crunch",
    tagline: "Caramelised biscuit infusion, live-pressed",
    icon: UtensilsCrossed,
    tag: "Seasonal Favourite",
  },
  {
    image: "/platters/platter-choco.png",
    name: "Chocolate Noir",
    tagline: "Dark cocoa melt over copper-roasted strands",
    icon: UtensilsCrossed,
    tag: "Indulgent",
  },
] as const;

const GALLERY_ITEMS: GalleryItem[] = PLATTERS.map(({ image }) => ({ image }));

const MENU_STATS = [
  { value: "04", label: "Signatures" },
  { value: "Live", label: "Copper Press" },
  { value: "Fresh", label: "Every Order" },
  { value: "48dB", label: "Crisp Snap" },
] as const;

export default function MenuPreview() {
  const { ref, inView, container, item } = useSectionReveal();
  const reduceMotion = useReducedMotion();
  const galleryRef = useRef<CircularGalleryHandle>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback((index: number) => {
    const next =
      ((index % PLATTERS.length) + PLATTERS.length) % PLATTERS.length;
    galleryRef.current?.goToIndex(next);
    setActiveIndex(next);
  }, []);

  const activePlatter = PLATTERS[activeIndex];

  return (
    <section
      ref={ref}
      id="menu"
      className="relative overflow-hidden border-t border-[#EFB80D]/15 px-4 py-20 text-[#FFF8EC] sm:px-6 sm:py-28 lg:px-8"
    >
      <SectionMotion
        inView={inView}
        container={container}
        className="relative z-10 mx-auto w-full max-w-6xl"
      >
        {/* Header — navbar typography, no blur/glow */}
        <motion.p
          variants={item}
          className="text-center font-sans text-xs font-semibold uppercase tracking-wider text-[#EFB80D]"
        >
          The Platters
        </motion.p>

        <motion.h2
          variants={item}
          className="mt-3 text-center font-sans text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl lg:text-5xl"
        >
          Signature{" "}
          <span className="text-[#EFB80D]">Menu</span>
        </motion.h2>

        <motion.p
          variants={item}
          className="mx-auto mt-3 max-w-xl text-center font-sans text-xs font-semibold uppercase tracking-wider text-white/50"
        >
          Spun to order &middot; Never held under glass
        </motion.p>

        <motion.p
          variants={item}
          className="mx-auto mt-5 max-w-2xl text-center font-sans text-sm leading-relaxed text-white/70 sm:text-base"
        >
          From the original crisp to pistachio, Biscoff, and chocolate — every
          platter at <BrandName /> is pressed live on copper and served at peak
          heat.
        </motion.p>

        {/* Gallery showcase */}
        <motion.div variants={item} className="mt-10 sm:mt-14">
          <div className="menu-gallery-frame relative overflow-hidden rounded-2xl border border-[#EFB80D]/25">
            {/* Animated scanline */}
            <div
              aria-hidden
              className="menu-gallery-scanline pointer-events-none absolute inset-x-0 top-0 z-20 h-1/2"
            />

            <div className="relative h-[340px] w-full overflow-hidden xs:h-[380px] sm:h-[480px] lg:h-[540px]">
              <CircularGallery
                ref={galleryRef}
                items={GALLERY_ITEMS}
                bend={2.5}
                borderRadius={0.06}
                scrollSpeed={2.4}
                scrollEase={0.08}
                onActiveIndexChange={setActiveIndex}
              />

              {/* Edge fades — transparent, no solid fill */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#030303]/80 to-transparent sm:w-24" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#030303]/80 to-transparent sm:w-24" />

              {/* Corner brackets — spring in */}
              {[
                "left-3 top-3 border-l border-t",
                "right-3 top-3 border-r border-t",
                "bottom-3 left-3 border-b border-l",
                "bottom-3 right-3 border-b border-r",
              ].map((pos, i) => (
                <motion.span
                  key={pos}
                  aria-hidden
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: 0.3 + i * 0.08,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`pointer-events-none absolute z-20 h-6 w-6 border-[#EFB80D]/60 ${pos}`}
                />
              ))}

              {/* Swipe hints */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-4 z-20 flex items-center sm:left-6"
              >
                <ChevronLeft className="menu-gallery-swipe-left h-5 w-5 text-[#EFB80D]/70" />
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-4 z-20 flex items-center sm:right-6"
              >
                <ChevronRight className="menu-gallery-swipe-right h-5 w-5 text-[#EFB80D]/70" />
              </div>

              {/* Active platter readout */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-6 pb-5 pt-16 sm:px-10 sm:pb-7">
                <div className="mx-auto max-w-md text-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={
                        reduceMotion ? false : { opacity: 0, y: 14, filter: "blur(4px)" }
                      }
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={
                        reduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, y: -10, filter: "blur(4px)" }
                      }
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="font-sans text-[10px] font-semibold uppercase tracking-wider text-[#EFB80D] sm:text-xs">
                        {String(activeIndex + 1).padStart(2, "0")} /{" "}
                        {String(PLATTERS.length).padStart(2, "0")}
                      </p>
                      <p className="mt-1 font-sans text-lg font-bold uppercase tracking-wide text-white sm:text-xl">
                        {activePlatter.name}
                      </p>
                      <p className="mt-1 font-sans text-xs text-white/65 sm:text-sm">
                        {activePlatter.tagline}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Footer controls */}
            <div className="flex items-center justify-between border-t border-[#EFB80D]/15 px-4 py-3 sm:px-6 sm:py-4">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-white/45 sm:text-xs">
                Drag to explore
              </span>

              <div
                className="flex items-center gap-2"
                role="tablist"
                aria-label="Platter gallery navigation"
              >
                {PLATTERS.map((platter, idx) => (
                  <button
                    key={platter.name}
                    type="button"
                    role="tab"
                    aria-selected={idx === activeIndex}
                    aria-label={`View ${platter.name}`}
                    onClick={() => goTo(idx)}
                    className={`menu-gallery-dot h-1.5 cursor-pointer rounded-full bg-[#EFB80D] ${
                      idx === activeIndex
                        ? "menu-gallery-dot--active"
                        : "w-1.5 opacity-35 hover:opacity-70"
                    }`}
                  />
                ))}
              </div>

              <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-[#EFB80D] sm:text-xs">
                04 Varieties
              </span>
            </div>
          </div>
        </motion.div>

        {/* Signature cards — border only, no fill */}
        <motion.div
          variants={item}
          className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 md:grid-cols-2 lg:grid-cols-4"
        >
          {PLATTERS.map((platter, idx) => {
            const Icon = platter.icon;
            const isActive = idx === activeIndex;
            return (
              <motion.button
                key={platter.name}
                type="button"
                onClick={() => goTo(idx)}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className={`group cursor-pointer rounded-xl border p-4 text-left transition-colors duration-200 sm:p-5 ${
                  isActive
                    ? "border-[#EFB80D]/50"
                    : "border-white/10 hover:border-[#EFB80D]/30"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors duration-200 ${
                      isActive
                        ? "border-[#EFB80D]/50 bg-[#EFB80D]/15"
                        : "border-[#EFB80D]/20 group-hover:border-[#EFB80D]/40"
                    }`}
                  >
                    <Icon className="h-4 w-4 text-[#EFB80D]" />
                  </span>
                  <span className="font-sans text-[9px] font-semibold uppercase tracking-wider text-[#EFB80D]">
                    {platter.tag}
                  </span>
                </div>
                <h3 className="mt-3 font-sans text-sm font-bold uppercase tracking-wide text-white">
                  {platter.name}
                </h3>
                <p className="mt-1.5 font-sans text-xs leading-relaxed text-white/55">
                  {platter.tagline}
                </p>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div variants={item} className="mt-10 sm:mt-12">
          <StatLedger stats={MENU_STATS} />
        </motion.div>

        {/* Order CTA — border only */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center sm:mt-12"
        >
          <div className="w-full max-w-xl rounded-2xl border border-[#EFB80D]/20 p-6 text-center sm:p-8">
            <p className="font-sans text-lg font-bold uppercase tracking-wide text-white sm:text-xl">
              Ready to order?
            </p>
            <p className="mt-2 font-sans text-sm text-white/60">
              Message us on WhatsApp — we&apos;ll have your platter pressed
              fresh.
            </p>
            <a
              href={buildWhatsAppLink(
                BRAND_PHONE_DISPLAY,
                "Hi Captain Kunafa! I'd like to place an order."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile-base btn-tactile-gold mt-6 inline-flex items-center justify-center gap-2.5 rounded-lg px-7 py-3 font-sans text-xs font-bold sm:text-sm"
            >
              <MessageCircle className="h-4 w-4 text-[#000000]" />
              <span>Order on WhatsApp</span>
            </a>
          </div>
        </motion.div>
      </SectionMotion>
    </section>
  );
}
