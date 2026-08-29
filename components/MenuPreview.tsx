"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import SwashAccent from "@/components/SwashAccent";
import { ShipHelm } from "@/components/NauticalElements";
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
              scrollSpeed={2.5}
              scrollEase={0.10}
            />

            {/* Subtle Gradient Overlays for Depth */}
            <div className="absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-[#0c0c0c] to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-[#0c0c0c] to-transparent pointer-events-none z-10" />
          </div>
        </div>

        {/* Quick WhatsApp Order Callout Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 sm:mb-16">
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

        {/* Gathering / Bulk Platter Banner with Balanced Contrast */}
        <div className="p-6 sm:p-10 rounded-[20px] sm:rounded-[24px] bg-[#121212] border-2 border-[#EFB80D] text-white flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 relative overflow-hidden text-center sm:text-left shadow-xl">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 relative z-10">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#EFB80D] text-[#000000] flex items-center justify-center shrink-0 shadow-md">
              <ShipHelm size={26} className="text-[#000000]" />
            </div>
            <div>
              <div className="font-display font-bold text-lg sm:text-2xl text-white mb-1">
                Ordering for an Office, Gathering, or Celebration?
              </div>
              <div className="font-sans text-xs sm:text-sm text-white/80 font-medium">
                We pack fresh party platters in insulated copper thermal cases for immediate delivery across Hyderabad.
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/919000000000?text=Hi%20Captain%20Kunafa!%20I'd%20like%20to%20order%20bulk%20platters%20for%20a%20gathering."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 bg-[#EFB80D] hover:bg-white text-[#000000] font-sans font-black text-xs px-8 py-3.5 rounded-full transition-all hover:scale-105 relative z-10 shadow-md"
          >
            <span>Order Bulk Platters</span>
          </a>
        </div>
      </div>
    </section>
  );
}
