"use client";

import React, { useState } from "react";
import { MessageCircle, Sparkles, MoveHorizontal } from "lucide-react";
import SwashAccent from "@/components/SwashAccent";
import { ShipHelm } from "@/components/NauticalElements";
import CircularGallery, { GalleryItem } from "@/components/CircularGallery";

type Category = "All" | "Best Sellers" | "Classic" | "Fusion";

const GALLERY_ITEMS: GalleryItem[] = [
  {
    image: "https://captainkunafa.com/wp-content/uploads/2024/01/Group-104666.png",
    text: "The Captain's Original Akawi",
  },
  {
    image: "https://captainkunafa.com/wp-content/uploads/2024/01/Group-104667.png",
    text: "Aleppo Emerald Pistachio Crown",
  },
  {
    image: "https://captainkunafa.com/wp-content/uploads/2024/01/Group-104664.png",
    text: "Lotus Biscoff Royale",
  },
  {
    image: "https://captainkunafa.com/wp-content/uploads/2024/01/Group-104665.png",
    text: "Dark Choco & Hazelnut Lava",
  },
];

const MENU_ITEMS = [
  {
    id: "captain-original",
    name: "The Captain's Original",
    category: "Classic" as Category,
    tag: "ROYAL SIGNATURE",
    description:
      "Clarified A2 ghee kataifi encasing molten 18-hr desalinated Akawi cheese, bathed in Damascus rose and orange blossom attar.",
    price: "₹180",
    bestSeller: true,
    image: "https://captainkunafa.com/wp-content/uploads/2024/01/Group-104666.png",
  },
  {
    id: "aleppo-pistachio",
    name: "Aleppo Emerald Crown",
    category: "Classic" as Category,
    tag: "BEST SELLER",
    description:
      "Double-loaded with raw first-harvest green Aleppo pistachios, crushed cardamom nectar, and rich buffalo clotted ashta cream.",
    price: "₹220",
    bestSeller: true,
    image: "https://captainkunafa.com/wp-content/uploads/2024/01/Group-104667.png",
  },
  {
    id: "choco-kunafa",
    name: "Dark Choco & Hazelnut Lava",
    category: "Fusion" as Category,
    tag: "CROWD OBSESSION",
    description:
      "72% dark chocolate molten core enveloped by toasted kataifi strands and roasted hazelnut praline drizzle. Hyderabad's favourite dessert crossover.",
    price: "₹240",
    bestSeller: true,
    image: "https://captainkunafa.com/wp-content/uploads/2024/01/Group-104665.png",
  },
  {
    id: "lotus-biscoff",
    name: "Lotus Biscoff Royale",
    category: "Fusion" as Category,
    tag: "CHEF'S SPECIAL",
    description:
      "Warm spiced Belgian speculoos cream baked into the crispy pastry nest, filled with sweet cream cheese and topped with crunchy Biscoff crumble.",
    price: "₹250",
    bestSeller: true,
    image: "https://captainkunafa.com/wp-content/uploads/2024/01/Group-104664.png",
  },
  {
    id: "salted-caramel",
    name: "Toasted Salted Caramel",
    category: "Fusion" as Category,
    tag: "SEASONAL",
    description:
      "Smoked sea-salt caramel drizzle infused into roasted kataifi nests, layered with molten Nablusi curd and crushed pecan crunch.",
    price: "₹230",
    bestSeller: false,
    image: "https://captainkunafa.com/wp-content/uploads/2024/01/Group-104666.png",
  },
  {
    id: "mini-cups",
    name: "Captain's Mini Platter (4 pcs)",
    category: "Classic" as Category,
    tag: "SHARING BOX",
    description:
      "Four individual mini copper-pan nests featuring Classic Akawi, Pistachio, Choco, and Biscoff. Ideal for family gifting and tasting.",
    price: "₹340",
    bestSeller: true,
    image: "https://captainkunafa.com/wp-content/uploads/2024/01/Group-104667.png",
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
    <section id="menu" className="py-20 sm:py-28 px-4 sm:px-8 bg-[#050505] text-[#FFF8EC] border-t border-[#222222] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFB80D]/15 border border-[#EFB80D]/30 text-[#EFB80D] font-mono text-[10px] sm:text-xs uppercase tracking-widest font-black mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#EFB80D]" />
            <span>3D ROTATING SHOWCASE</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-3 sm:mb-4">
            Handcrafted with <SwashAccent color="gold">Uncompromising Precision</SwashAccent>
          </h2>

          <p className="font-sans text-xs sm:text-base text-white/70">
            Every portion is baked fresh upon order in traditional shallow copper pans. Zero frozen ingredients. Zero microwave reheating.
          </p>
        </div>

        {/* 3D WebGL CircularGallery Showcase from React Bits */}
        <div className="relative w-full mb-16 sm:mb-20">
          <div className="relative h-[380px] xs:h-[430px] sm:h-[500px] lg:h-[540px] w-full rounded-[24px] sm:rounded-[32px] bg-[#0c0c0c] border border-white/10 shadow-2xl overflow-hidden">
            <CircularGallery
              items={GALLERY_ITEMS}
              bend={2.5}
              textColor="#FFFFFF"
              borderRadius={0.06}
              scrollSpeed={2.2}
              scrollEase={0.03}
            />

            {/* Subtle Gradient Overlays for Depth */}
            <div className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#0c0c0c] to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#0c0c0c] to-transparent pointer-events-none z-10" />

            {/* Interactive Drag Hint Pill */}
            <div className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none z-20">
              <div className="flex items-center gap-2 font-mono text-[9.5px] sm:text-xs uppercase tracking-widest text-black bg-white font-black px-4 py-1.5 rounded-full shadow-lg">
                <MoveHorizontal className="w-3.5 h-3.5 text-black" />
                <span>DRAG OR SCROLL TO ROTATE 3D GALLERY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs: Crisp White & Gold Balance */}
        <div className="flex justify-center gap-2.5 mb-10 sm:mb-14 overflow-x-auto pb-2 px-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`font-sans text-xs uppercase tracking-wider px-6 sm:px-8 py-3 rounded-full transition-all duration-150 cursor-pointer shrink-0 ${
                activeCategory === cat
                  ? "bg-[#EFB80D] text-[#000000] font-black scale-105 shadow-sm"
                  : "bg-[#1a1a1a] text-white hover:bg-white hover:text-black font-semibold border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid with Official Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 mb-14 sm:mb-16">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-[#111111] hover:bg-[#161616] rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 transition-all duration-200 border border-white/10 flex flex-col justify-between group"
            >
              <div>
                {/* Photo Container with Official High-Res Images */}
                <div className="relative w-full h-44 sm:h-52 rounded-[16px] sm:rounded-[18px] overflow-hidden bg-[#080808] mb-4 sm:mb-5 flex items-center justify-center p-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3">
                    <span
                      className="font-mono text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider bg-white text-black shadow-sm"
                    >
                      {item.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 bg-[#EFB80D] text-[#000000] font-display font-black text-sm sm:text-base px-3.5 py-1 rounded-full shadow-sm">
                    {item.price}
                  </div>
                </div>

                <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-[#EFB80D] transition-colors leading-snug mb-1.5 sm:mb-2">
                  {item.name}
                </h3>

                <p className="font-sans text-xs text-white/80 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div>
                <a
                  href={`https://wa.me/919000000000?text=Hi%20Captain%20Kunafa!%20I'd%20like%20to%20order%20${encodeURIComponent(item.name)}%20(${item.price}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#EFB80D] hover:bg-white text-[#000000] font-sans text-xs font-black py-3.5 rounded-full transition-all cursor-pointer active:scale-95 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-[#000000]" />
                  <span>Quick WhatsApp Order</span>
                </a>
              </div>
            </div>
          ))}
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
