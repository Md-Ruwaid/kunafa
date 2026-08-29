"use client";

import React, { useState } from "react";
import { Sparkles, MessageCircle, Flame, Star, Award } from "lucide-react";
import SwashAccent from "@/components/SwashAccent";
import { ShipHelm } from "@/components/NauticalElements";

type Category = "All" | "Best Sellers" | "Classic" | "Fusion";

const MENU_ITEMS = [
  {
    id: "captain-original",
    name: "The Captain's Original",
    category: "Classic" as Category,
    tag: "ROYAL SIGNATURE",
    tagColor: "bg-[#EFB80D] text-[#2B1B12]",
    description:
      "Clarified A2 ghee kataifi encasing molten 18-hr desalinated Akawi cheese, bathed in Damascus rose and orange blossom attar.",
    price: "₹180",
    specs: "48 dB Acoustic Snap · 45cm Molten Pull",
    bestSeller: true,
    image: "/kunafa-frames/ezgif-frame-001.webp",
  },
  {
    id: "aleppo-pistachio",
    name: "Aleppo Emerald Crown",
    category: "Classic" as Category,
    tag: "BEST SELLER",
    tagColor: "bg-[#DA7034] text-white",
    description:
      "Double-loaded with raw first-harvest green Aleppo pistachios, crushed cardamom nectar, and rich buffalo clotted ashta cream.",
    price: "₹220",
    specs: "First-Crop G1 Pistachio · Ashta Foam",
    bestSeller: true,
    image: "/kunafa-frames/ezgif-frame-050.webp",
  },
  {
    id: "choco-kunafa",
    name: "Dark Choco & Hazelnut Lava",
    category: "Fusion" as Category,
    tag: "CROWD OBSESSION",
    tagColor: "bg-[#2B1B12] text-[#EFB80D]",
    description:
      "72% dark chocolate molten core enveloped by toasted kataifi strands and roasted hazelnut praline drizzle. Hyderabad's favourite dessert crossover.",
    price: "₹240",
    specs: "72% Single-Origin Cocoa · Nut Praline",
    bestSeller: true,
    image: "/kunafa-frames/ezgif-frame-075.webp",
  },
  {
    id: "salted-caramel",
    name: "Toasted Salted Caramel",
    category: "Fusion" as Category,
    tag: "SEASONAL",
    tagColor: "bg-[#DA7034] text-white",
    description:
      "Smoked sea-salt caramel drizzle infused into roasted kataifi nests, layered with molten Nablusi curd and crushed pecan crunch.",
    price: "₹230",
    specs: "Smoked Maldon Salt · Caramel Nectar",
    bestSeller: false,
    image: "/kunafa-frames/ezgif-frame-100.webp",
  },
  {
    id: "lotus-biscoff",
    name: "Lotus Biscoff Royale",
    category: "Fusion" as Category,
    tag: "CHEF'S SPECIAL",
    tagColor: "bg-[#EFB80D] text-[#2B1B12]",
    description:
      "Warm spiced Belgian speculoos cream baked into the crispy pastry nest, filled with sweet cream cheese and topped with crunchy Biscoff crumble.",
    price: "₹250",
    specs: "Belgian Speculoos · Cream Curd",
    bestSeller: false,
    image: "/kunafa-frames/ezgif-frame-030.webp",
  },
  {
    id: "mini-cups",
    name: "Captain's Mini Platter (4 pcs)",
    category: "Classic" as Category,
    tag: "SHARING BOX",
    tagColor: "bg-[#2B1B12] text-[#FFF8EC]",
    description:
      "Four individual mini copper-pan nests featuring Classic Akawi, Pistachio, Choco, and Biscoff. Ideal for family gifting and tasting.",
    price: "₹340",
    specs: "4 Flavour Sampler · Gift Box",
    bestSeller: true,
    image: "/kunafa-frames/ezgif-frame-080.webp",
  },
];

const CATEGORIES: Category[] = ["All", "Best Sellers", "Classic", "Fusion"];

export default function MenuPreview() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered = MENU_ITEMS.filter((item) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Best Sellers") return item.bestSeller;
    return item.category === activeCategory;
  });

  return (
    <section id="menu" className="py-28 px-4 sm:px-8 bg-white text-[#2B1B12] border-t border-[#E7DCC9] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#DA7034] bg-[#DA7034]/10 border border-[#DA7034]/25 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#EFB80D]" />
            <span>THE COPPER HEARTH PLATTERS</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#2B1B12] leading-tight mb-4">
            Handcrafted with <SwashAccent color="terracotta">Uncompromising Precision</SwashAccent>
          </h2>

          <p className="font-sans text-base text-[#7A6A5B]">
            Every portion is baked fresh upon order in traditional shallow copper pans. Zero frozen ingredients. Zero microwave reheating.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-14">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`font-sans text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EFB80D] ${
                activeCategory === cat
                  ? "bg-[#DA7034] text-white font-bold shadow-[0_4px_20px_rgba(218,112,52,0.35)] scale-105"
                  : "bg-[#FFF8EC] text-[#7A6A5B] border border-[#E7DCC9] hover:border-[#DA7034]/50 hover:text-[#2B1B12]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-16">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group bg-[#FFF8EC] hover:bg-white border border-[#E7DCC9] hover:border-[#DA7034]/50 rounded-[24px] p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Photo Preview Container */}
                <div className="relative w-full h-48 rounded-[18px] overflow-hidden bg-[#030303] mb-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`font-mono text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm ${item.tagColor}`}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 text-[#2B1B12] font-display font-bold text-base px-3.5 py-1 rounded-full shadow-md backdrop-blur-sm border border-[#E7DCC9]">
                    {item.price}
                  </div>
                </div>

                <h3 className="font-display font-bold text-xl text-[#2B1B12] group-hover:text-[#DA7034] transition-colors leading-snug mb-2">
                  {item.name}
                </h3>

                <p className="font-sans text-xs text-[#7A6A5B] leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div>
                <div className="pt-3 border-t border-[#E7DCC9] font-mono text-[10.5px] text-[#DA7034] font-medium mb-4 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DA7034]" />
                  <span>{item.specs}</span>
                </div>

                <a
                  href={`https://wa.me/919000000000?text=Hi%20Captain%20Kunafa!%20I'd%20like%20to%20order%20${encodeURIComponent(item.name)}%20(${item.price}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#2B1B12] hover:bg-[#DA7034] text-white font-sans text-xs font-semibold py-3 rounded-full transition-colors cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#EFB80D]" />
                  <span>Quick WhatsApp Order</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Promise Callout Strip */}
        <div className="p-7 sm:p-10 rounded-[24px] bg-[#2B1B12] text-[#FFF8EC] border-2 border-[#EFB80D]/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-60 h-60 bg-[#DA7034]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-5 relative z-10">
            <div className="w-14 h-14 rounded-full bg-[#EFB80D]/10 border-2 border-[#EFB80D] flex items-center justify-center text-[#EFB80D] shrink-0">
              <ShipHelm size={28} className="text-[#DA7034]" />
            </div>
            <div>
              <div className="font-display font-bold text-xl sm:text-2xl text-white mb-1">
                Ordering for an Office, Gathering, or Celebration?
              </div>
              <div className="font-sans text-xs sm:text-sm text-[#B3A697]">
                We pack fresh party platters in insulated copper thermal cases for immediate delivery across Hyderabad.
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/919000000000?text=Hi%20Captain%20Kunafa!%20I'd%20like%20to%20order%20bulk%20platters%20for%20a%20gathering."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2.5 bg-[#EFB80D] hover:bg-[#ffc926] text-[#2B1B12] font-sans font-bold text-xs px-8 py-4 rounded-full transition-all hover:scale-105 shadow-md relative z-10"
          >
            <span>Order Bulk Platters</span>
          </a>
        </div>
      </div>
    </section>
  );
}
