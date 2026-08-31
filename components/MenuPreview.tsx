"use client";

import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
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

// ─── Signature Menu Configurations ──────────────────────────────────────────
// PLACEHOLDER — Pricing & item details. Replace with real client data before launch.
export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string; // e.g. "₹260"
  isPlaceholderPrice?: boolean;
  image: string;
  tag?: string;
}

export const SIGNATURE_MENU_ITEMS: MenuItem[] = [
  {
    id: "classic-cream",
    name: "Classic Cream Kunafa",
    category: "Heritage Classic",
    description:
      "Crisp golden shredded kataifi pastry layered with thick clotted ashta cream, finished with warm Damascus rose sugar attar.",
    price: "₹260", // PLACEHOLDER — Update with verified client price
    isPlaceholderPrice: true,
    image: "/platters/platter-original.png",
    tag: "Original Recipe",
  },
  {
    id: "emerald-pistachio",
    name: "Emerald Pistachio Kunafa",
    category: "Royal Nut Special",
    description:
      "Loaded with first-harvest Aleppo emerald pistachios, authentic mountain Akawi curd, and pure clarified ghee snap.",
    price: "₹340", // PLACEHOLDER — Update with verified client price
    isPlaceholderPrice: true,
    image: "/platters/platter-pistachio.png",
    tag: "Captain's Pick",
  },
  {
    id: "lotus-biscoff",
    name: "Lotus Biscoff Kunafa",
    category: "Modern Fusion",
    description:
      "Spun golden pastry layered with melted speculoos cookie butter spread and topped with caramelized Biscoff crumbles.",
    price: "₹320", // PLACEHOLDER — Update with verified client price
    isPlaceholderPrice: true,
    image: "/platters/platter-biscoff.png",
    tag: "Trending",
  },
  {
    id: "belgian-chocolate",
    name: "Belgian Chocolate Kunafa",
    category: "Indulgent Chocolate",
    description:
      "Decadent melted 54% dark Belgian chocolate fondue infused with molten cheese pull and roasted hazelnut dust.",
    price: "₹310", // PLACEHOLDER — Update with verified client price
    isPlaceholderPrice: true,
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
            Swipe the 3D platter showcase or explore our handcrafted authentic varieties below.
          </p>
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

        {/* Typed Menu Cards with Pricing & Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12">
          {SIGNATURE_MENU_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between bg-[#0a0a0a] rounded-xl border border-white/10 hover:border-[#EFB80D]/40 p-5 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(239,184,13,0.12)]"
            >
              <div>
                {/* Platter Thumbnail & Tag */}
                <div className="relative h-44 w-full rounded-lg overflow-hidden bg-[#141414] mb-4 border border-white/5">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.tag && (
                    <span className="absolute top-2.5 left-2.5 bg-[#EFB80D] text-black font-mono font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded shadow-md">
                      {item.tag}
                    </span>
                  )}
                </div>

                {/* Category Badge */}
                <span className="font-mono text-[11px] text-[#EFB80D] uppercase tracking-widest block mb-1">
                  {item.category}
                </span>

                {/* Item Name */}
                <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs text-[#C4B5A5] leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Price & Order Action */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-2">
                <div>
                  <div className="font-display text-lg font-bold text-[#EFB80D]">
                    {item.price}
                  </div>
                  {item.isPlaceholderPrice && (
                    <span className="font-mono text-[9px] text-[#9A8B7D] block leading-none">
                      (Approx. est.)
                    </span>
                  )}
                </div>
                <a
                  href={buildWhatsAppLink(
                    BRAND_PHONE_DISPLAY,
                    `Hi Captain Kunafa! I'd like to order: ${item.name}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile-base btn-tactile-gold px-3.5 py-1.5 rounded-md font-sans text-xs font-bold flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Order</span>
                </a>
              </div>
            </div>
          ))}
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
