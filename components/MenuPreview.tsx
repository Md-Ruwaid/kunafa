"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import SwashAccent from "@/components/SwashAccent";

type Category = "All" | "Classic" | "Fusion" | "Best Sellers";

const MENU_ITEMS = [
  {
    id: "classic-original",
    name: "Captain's Original",
    category: "Classic" as Category,
    tag: "SIGNATURE",
    tagBg: "bg-[#EFB80D]",
    description: "The one that started it all. Clarified ghee kataifi, molten Akawi cheese, orange blossom nectar. Pressed to 48 dB acoustic crunch.",
    price: "₹180",
    bestSeller: true,
  },
  {
    id: "pistachio-crown",
    name: "Pistachio Crown",
    category: "Classic" as Category,
    tag: "BEST SELLER",
    tagBg: "bg-[#EFB80D]",
    description: "Double-loaded with crushed raw pistachios, cardamom nectar, and buffalo cream. Requests outpace supply every weekend.",
    price: "₹220",
    bestSeller: true,
  },
  {
    id: "choco-kunafa",
    name: "Choco Kunafa",
    category: "Fusion" as Category,
    tag: "CROWD FAVOURITE",
    tagBg: "bg-[#DA7034]",
    description: "Dark chocolate molten filling inside crisp kataifi, finished with cocoa dust and date caramel drizzle. Hyderabad's answer to a lava cake.",
    price: "₹240",
    bestSeller: true,
  },
  {
    id: "salted-caramel",
    name: "Salted Caramel Kunafa",
    category: "Fusion" as Category,
    tag: "SEASONAL",
    tagBg: "bg-[#DA7034]",
    description: "Smoked sea-salt caramel ribboned through molten Nablusi curd, pecan praline crunch on top.",
    price: "₹230",
    bestSeller: false,
  },
  {
    id: "biscoff-kunafa",
    name: "Biscoff Bliss",
    category: "Fusion" as Category,
    tag: "NEW",
    tagBg: "bg-[#2B1B12]",
    description: "Lotus Biscoff spread baked into the kataifi nest, cream cheese core, crushed Biscoff crumble finish.",
    price: "₹250",
    bestSeller: false,
  },
  {
    id: "mini-cups",
    name: "Mini Captain Cups (4 pcs)",
    category: "Classic" as Category,
    tag: "SHAREABLE",
    tagBg: "bg-[#EFB80D]",
    description: "Individual portion cups — perfect for gifting or group orders. Classic Akawi filling with rose water glaze.",
    price: "₹160",
    bestSeller: false,
  },
];

const CATEGORIES: Category[] = ["All", "Best Sellers", "Classic", "Fusion"];

export default function MenuPreview() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered = MENU_ITEMS.filter(item => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Best Sellers") return item.bestSeller;
    return item.category === activeCategory;
  });

  return (
    <section className="py-28 px-4 sm:px-8 bg-white text-[#2B1B12] border-t border-[#E7DCC9]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#EFB80D] bg-[#EFB80D]/10 border border-[#EFB80D]/30 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE PLATTERS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#2B1B12] leading-tight">
            Fresh from the <SwashAccent>Copper Pan</SwashAccent>
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`font-sans text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EFB80D] ${
                activeCategory === cat
                  ? "bg-[#EFB80D] text-[#2B1B12] font-bold shadow-[0_0_15px_rgba(239,184,13,0.3)] scale-105"
                  : "bg-[#FFF8EC] text-[#7A6A5B] border border-[#E7DCC9] hover:border-[#EFB80D]/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filtered.map(item => (
            <div
              key={item.id}
              className="group bg-[#FFF8EC] hover:bg-white border border-[#E7DCC9] hover:border-[#EFB80D]/50 rounded-[20px] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image placeholder — shows first frame still */}
              <div className="relative w-full h-44 rounded-[16px] overflow-hidden bg-[#030303] mb-5">
                <img
                  src="/kunafa-frames/ezgif-frame-050.webp"
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className={`absolute top-3 left-3 ${item.tagBg} text-white font-mono text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider`}>
                  {item.tag}
                </div>
                <div className="absolute bottom-3 right-3 bg-white/90 text-[#2B1B12] font-display font-semibold text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                  {item.price}
                </div>
              </div>

              <h3 className="font-display font-semibold text-lg text-[#2B1B12] group-hover:text-[#DA7034] transition-colors leading-snug mb-2">
                {item.name}
              </h3>
              <p className="font-sans text-xs text-[#7A6A5B] leading-relaxed">
                {item.description}
              </p>

              {item.bestSeller && (
                <div className="mt-3 pt-3 border-t border-[#E7DCC9] font-mono text-[10px] text-[#EFB80D] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EFB80D]" /> HIGH DEMAND — SELLS OUT DAILY
                </div>
              )}
            </div>
          ))}
        </div>

        {/* WhatsApp order strip */}
        <div className="p-6 sm:p-8 rounded-[20px] bg-[#FFF8EC] border border-[#25D366]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-display font-semibold text-lg text-[#2B1B12] mb-1">
              Ready to Order? We're one tap away.
            </div>
            <div className="font-sans text-sm text-[#7A6A5B]">
              WhatsApp your nearest outlet directly — they'll confirm availability and prep time.
            </div>
          </div>
          <a
            href="https://wa.me/919000000000?text=Hi%20Captain%20Kunafa!%20I'd%20like%20to%20place%20an%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20b858] text-white font-semibold font-sans px-7 py-3.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,211,102,0.25)] focus-visible:outline-2 focus-visible:outline-[#EFB80D]"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Order on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
