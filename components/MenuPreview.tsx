"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import SwashAccent from "@/components/SwashAccent";
import CircularGallery, { GalleryItem } from "@/components/CircularGallery";
import { buildWhatsAppLink, BRAND_PHONE_DISPLAY } from "@/lib/contact";

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
            Our Signature <SwashAccent color="gold">Menu</SwashAccent>
          </h2>
        </div>

        {/* 3D WebGL CircularGallery Showcase from React Bits - Mobile Optimized */}
        <div className="relative w-full mb-12 sm:mb-16">
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

        {/* Quick WhatsApp Order Callout Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={buildWhatsAppLink(BRAND_PHONE_DISPLAY, "Hi Captain Kunafa! I'd like to place an order.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile-base btn-tactile-gold flex items-center justify-center gap-2.5 font-sans font-bold text-xs sm:text-sm px-7 py-3 rounded-lg"
          >
            <MessageCircle className="w-4 h-4 text-[#000000]" />
            <span>Order on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}

