"use client";

import React, { useState } from "react";
import { Sparkles, ShoppingBag, Check, Flame, Award, Droplets } from "lucide-react";
import SwashAccent from "@/components/SwashAccent";
import CtaPill from "@/components/CtaPill";
import confetti from "canvas-confetti";

interface MenuItem {
  id: string;
  name: string;
  category: "Classic" | "Fusion";
  isBestSeller?: boolean;
  tag: string;
  price: number;
  description: string;
  image: string;
  specs: string;
  servings: string;
}

const ALL_MENU_ITEMS: MenuItem[] = [
  {
    id: "classic-gold",
    name: "The Royal Captain Classic",
    category: "Classic",
    isBestSeller: true,
    tag: "BEST SELLER",
    price: 28,
    description:
      "Clarified A2 ghee kataifi encasing molten 18-hr desalinated Akawi cheese, bathed in Damascus rose and orange blossom attar.",
    image: "/kunafa-frames/ezgif-frame-001.webp",
    specs: "48 dB Acoustic Snap • 45cm Cheese Pull",
    servings: "2-3 Explorers (8-inch)",
  },
  {
    id: "aleppo-pistachio",
    name: "Aleppo Emerald Crown",
    category: "Classic",
    isBestSeller: true,
    tag: "CHEF SIGNATURE",
    price: 34,
    description:
      "Double-loaded with raw, first-harvest green Aleppo pistachios, cardamom-infused nectar, and rich buffalo clotted ashta cream.",
    image: "/kunafa-frames/ezgif-frame-050.webp",
    specs: "First-Crop G1 Pistachio • Ashta Foam",
    servings: "2-3 Explorers (8-inch)",
  },
  {
    id: "nablusi-crisp",
    name: "Ancient Nablusi Hearth",
    category: "Classic",
    isBestSeller: false,
    tag: "HERITAGE",
    price: 26,
    description:
      "Traditional brine-cured Nablusi cheese with fine orange-hued semolina crust, finished with light wildflower honey.",
    image: "/kunafa-frames/ezgif-frame-025.webp",
    specs: "Semolina Crust • 100% Nablusi Curd",
    servings: "2-3 Explorers (8-inch)",
  },
  {
    id: "salted-caramel-kunafa",
    name: "Toasted Terracotta & Salted Caramel",
    category: "Fusion",
    isBestSeller: true,
    tag: "BEST SELLER",
    price: 32,
    description:
      "Smoked sea-salt caramel drizzle infused into roasted kataifi nests, layered with molten Nablusi curd and crushed pecan pralines.",
    image: "/kunafa-frames/ezgif-frame-075.webp",
    specs: "Smoked Maldon Salt • Caramel Crunch",
    servings: "3-4 Explorers (9-inch)",
  },
  {
    id: "dark-chocolate-fondant",
    name: "Dark Valrhona & Tahini Fondant",
    category: "Fusion",
    isBestSeller: false,
    tag: "NEW RELEASE",
    price: 36,
    description:
      "72% Valrhona dark chocolate molten core enveloped by toasted sesame kataifi and date syrup reduction.",
    image: "/kunafa-frames/ezgif-frame-100.webp",
    specs: "72% Single-Origin Cocoa • Organic Tahini",
    servings: "2-3 Explorers (8-inch)",
  },
  {
    id: "saffron-cardamom-ashta",
    name: "Saffron Blossom & Clotted Ashta",
    category: "Fusion",
    isBestSeller: false,
    tag: "ROYAL EDITION",
    price: 38,
    description:
      "Kashmir saffron steeped syrup poured over hand-whipped buffalo milk ashta with whole roasted almonds and gold leaf.",
    image: "/kunafa-frames/ezgif-frame-085.webp",
    specs: "Kashmir Saffron • 24k Edible Gold",
    servings: "3-4 Explorers (9-inch)",
  },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<"All" | "Classic" | "Fusion" | "Best Sellers">("All");
  const [orderedItem, setOrderedItem] = useState<MenuItem | null>(null);

  const handleCategoryChange = (cat: "All" | "Classic" | "Fusion" | "Best Sellers") => {
    setActiveCategory(cat);
  };

  const categories: ("All" | "Classic" | "Fusion" | "Best Sellers")[] = [
    "All",
    "Classic",
    "Fusion",
    "Best Sellers",
  ];

  const filteredItems = ALL_MENU_ITEMS.filter((item) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Best Sellers") return item.isBestSeller;
    return item.category === activeCategory;
  });

  const handleQuickOrder = (item: MenuItem) => {
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#EFB80D", "#DA7034", "#FFFFFF"],
    });
    setOrderedItem(item);
  };

  return (
    <main className="min-h-screen bg-[#030303] text-[#FFF8EC] pt-32 pb-28 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#EFB80D] bg-[#EFB80D]/10 border border-[#EFB80D]/25 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span>ARTISANAL ATELIER MENU</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-semibold text-[#FFF8EC] mb-6 leading-tight">
            The Captain’s <SwashAccent>Platters</SwashAccent>
          </h1>

          <p className="font-sans text-base text-[#B3A697] leading-relaxed">
            Every platter is baked to order in individual cast iron pans. Fired at 205°C and served piping hot with custom blossom attar reductions.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`font-sans text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EFB80D] focus-visible:outline-offset-2 ${
                  isActive
                    ? "bg-[#EFB80D] text-[#2B1B12] font-bold shadow-[0_0_20px_rgba(239,184,13,0.35)] scale-105"
                    : "bg-[#241509] text-[#FFF8EC]/70 hover:text-[#EFB80D] border border-[#E7DCC9]/15 hover:border-[#EFB80D]/40"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Menu Grid: 4px lift + shadow deepen + 1.02 scale on image */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-[#241509] border border-[#E7DCC9]/15 hover:border-[#EFB80D]/60 rounded-[20px] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Photo container with 1.02 hover zoom */}
                <div className="relative w-full h-56 rounded-[16px] overflow-hidden bg-[#030303] mb-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute top-3 left-3 bg-[#EFB80D] text-[#2B1B12] font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {item.tag}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#241509]/90 border border-white/10 text-white/80 font-mono text-[10px] px-2.5 py-1 rounded-full backdrop-blur-md">
                    {item.servings}
                  </div>
                </div>

                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-display font-semibold text-xl text-[#FFF8EC] group-hover:text-[#EFB80D] transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <span className="font-mono text-xl font-bold text-[#EFB80D] shrink-0 ml-3">
                    ${item.price}
                  </span>
                </div>

                <p className="font-sans text-sm text-[#B3A697] leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div>
                <div className="py-3 border-t border-[#E7DCC9]/10 mb-4 font-mono text-xs text-[#7A6A5B]">
                  {item.specs}
                </div>

                <button
                  type="button"
                  onClick={() => handleQuickOrder(item)}
                  className="w-full flex items-center justify-center gap-2 bg-[#EFB80D] hover:bg-[#ffc926] text-[#2B1B12] font-sans font-bold text-xs uppercase tracking-wider py-3.5 rounded-full shadow-[0_0_20px_rgba(239,184,13,0.25)] transition-all active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EFB80D]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ORDER FRESH PLATTER</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Confirmation Drawer / Banner */}
        {orderedItem && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#241509] border border-[#EFB80D] rounded-[20px] p-6 shadow-2xl max-w-sm animate-in slide-in-from-bottom-5">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex items-center gap-2 text-[#EFB80D] font-mono text-xs">
                <Check className="w-4 h-4" />
                <span>ADDED TO FRESH BATCH</span>
              </div>
              <button
                type="button"
                onClick={() => setOrderedItem(null)}
                className="text-white/40 hover:text-white text-xs font-mono"
              >
                ✕
              </button>
            </div>
            <div className="font-display font-semibold text-base text-[#FFF8EC] mb-1">
              {orderedItem.name}
            </div>
            <div className="font-mono text-xs text-[#B3A697] mb-4">
              Dispatching from nearest copper hearth (${orderedItem.price}.00)
            </div>
            <CtaPill href="/catering" size="sm" className="w-full" onClick={() => setOrderedItem(null)}>
              CONFIRM WITH ATELIER
            </CtaPill>
          </div>
        )}
      </div>
    </main>
  );
}
