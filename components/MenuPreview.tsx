"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import SwashAccent from "@/components/SwashAccent";
import CircularGallery, { GalleryItem } from "@/components/CircularGallery";

const GALLERY_ITEMS: GalleryItem[] = [
  {
    image: "/platters/platter-original.png",
  },
  {
    image: "/platters/platter-pistachio.png",
  },
  {
    image: "/platters/platter-biscoff.png",
  },
  {
    image: "/platters/platter-choco.png",
  },
];

export default function MenuPreview() {
  return (
    <section
      id="menu"
      className="py-20 sm:py-28 px-4 sm:px-8 bg-[#050505] text-[#FFF8EC] border-t border-[#222222] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-3 sm:mb-4">
            Handcrafted with <SwashAccent color="gold">Uncompromising Precision</SwashAccent>
          </h2>
        </div>

        {/* 3D WebGL CircularGallery Showcase from React Bits - Mobile Optimized */}
        <div className="relative w-full mb-12 sm:mb-16">
          <div className="relative h-[320px] xs:h-[360px] sm:h-[460px] lg:h-[520px] w-full rounded-[24px] sm:rounded-[32px] bg-[#0c0c0c] border border-white/10 shadow-2xl overflow-hidden">
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

        {/* Quick WhatsApp Order Callout Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/919000000000?text=Hi%20Captain%20Kunafa!%20I'd%20like%20to%20place%20an%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 bg-[#EFB80D] hover:bg-white text-[#000000] font-sans font-black text-xs sm:text-sm px-8 py-4 rounded-full transition-all cursor-pointer hover:scale-105 shadow-lg"
          >
            <MessageCircle className="w-4 h-4 text-[#000000]" />
            <span>Order Fresh Platter on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}

