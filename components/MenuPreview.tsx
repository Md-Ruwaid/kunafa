"use client";

import React from "react";
import dynamic from "next/dynamic";
import { MessageCircle, Sparkles } from "lucide-react";
import SwashAccent from "@/components/SwashAccent";
import type { GalleryItem } from "@/components/CircularGallery";
import { buildWhatsAppLink, BRAND_PHONE_DISPLAY } from "@/lib/contact";

const CircularGallery = dynamic(() => import("@/components/CircularGallery"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#0c0c0c]">
      <div className="w-8 h-8 rounded-full border-2 border-[#EFB80D] border-t-transparent animate-spin" />
    </div>
  ),
});

export const SIGNATURE_MENU_ITEMS = [
  {
    id: "classic-cream",
    name: "Classic Cream Kunafa",
    image: "/platters/platter-original.png",
  },
  {
    id: "emerald-pistachio",
    name: "Emerald Pistachio Kunafa",
    image: "/platters/platter-pistachio.png",
  },
  {
    id: "lotus-biscoff",
    name: "Lotus Biscoff Kunafa",
    image: "/platters/platter-biscoff.png",
  },
  {
    id: "belgian-chocolate",
    name: "Belgian Chocolate Kunafa",
    image: "/platters/platter-choco.png",
  },
];

const GALLERY_ITEMS: GalleryItem[] = SIGNATURE_MENU_ITEMS.map((item) => ({
  image: item.image,
  text: item.name,
}));

export default function MenuPreview() {
  return (
    <section
      id="menu"
      className="py-20 sm:py-28 px-4 sm:px-8 bg-[#050505] text-[#FFF8EC] border-t border-[#222222] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFB80D]/10 border border-[#EFB80D]/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#EFB80D]" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#EFB80D]">
              Fresh Copper-Pan Specialties
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-3 sm:mb-4">
            Our Signature <SwashAccent color="gold">Menu</SwashAccent>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#C4B5A5] max-w-xl mx-auto">
            Swipe or drag the 3D platter showcase to explore our handcrafted authentic varieties.
          </p>
        </div>

        {/* 3D WebGL CircularGallery Showcase from React Bits - Mobile Optimized */}
        <div className="relative w-full mb-10 sm:mb-12">
          <div className="relative h-[320px] xs:h-[360px] sm:h-[460px] lg:h-[520px] w-full rounded-xl bg-[#0c0c0c] border border-white/10 shadow-2xl overflow-hidden">
            <CircularGallery
              items={GALLERY_ITEMS}
              bend={2.5}
              borderRadius={0.06}
              scrollSpeed={1.8}
              scrollEase={0.06}
            />

            {/* Subtle Gradient Overlays for Depth */}
            <div className="absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-[#0c0c0c] to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-[#0c0c0c] to-transparent pointer-events-none z-10" />
          </div>
        </div>

        {/* Central WhatsApp Hotline CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <a
            href={buildWhatsAppLink(BRAND_PHONE_DISPLAY, "Hi Captain Kunafa! I would like to place an order.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile-base btn-tactile-gold flex items-center justify-center gap-2.5 font-sans font-bold text-xs sm:text-sm px-8 py-3.5 rounded-lg shadow-lg"
          >
            <MessageCircle className="w-4 h-4 text-[#000000]" />
            <span>Order via WhatsApp Hotline ({BRAND_PHONE_DISPLAY})</span>
          </a>
        </div>
      </div>
    </section>
  );
}
