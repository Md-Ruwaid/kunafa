import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Flame } from "lucide-react";
import SwashAccent from "@/components/SwashAccent";
import CtaPill from "@/components/CtaPill";

export const MENU_ITEMS = [
  {
    id: "classic-gold",
    name: "The Royal Captain Classic",
    category: "Classic",
    tag: "BEST SELLER",
    price: "$28",
    description:
      "Clarified A2 ghee kataifi encasing molten 18-hr desalinated Akawi cheese, bathed in Damascus rose and orange blossom attar.",
    image: "/kunafa-frames/ezgif-frame-001.webp",
    specs: "48 dB Acoustic Snap • 45cm Cheese Pull",
  },
  {
    id: "aleppo-pistachio",
    name: "Aleppo Emerald Crown",
    category: "Classic",
    tag: "CHEF SIGNATURE",
    price: "$34",
    description:
      "Double-loaded with raw, first-harvest green Aleppo pistachios, cardamom-infused nectar, and rich buffalo clotted ashta cream.",
    image: "/kunafa-frames/ezgif-frame-050.webp",
    specs: "First-Crop G1 Pistachio • Ashta Foam",
  },
  {
    id: "salted-caramel-kunafa",
    name: "Toasted Terracotta & Salted Caramel",
    category: "Fusion",
    tag: "BEST SELLER",
    price: "$32",
    description:
      "Smoked sea-salt caramel drizzle infused into roasted kataifi nests, layered with molten Nablusi curd and crushed pecan pralines.",
    image: "/kunafa-frames/ezgif-frame-075.webp",
    specs: "Smoked Maldon Salt • Caramel Crunch",
  },
  {
    id: "dark-chocolate-fondant",
    name: "Dark Valrhona & Tahini Fondant",
    category: "Fusion",
    tag: "NEW RELEASE",
    price: "$36",
    description:
      "72% Valrhona dark chocolate molten core enveloped by toasted sesame kataifi and date syrup reduction.",
    image: "/kunafa-frames/ezgif-frame-100.webp",
    specs: "72% Single-Origin Cocoa • Organic Tahini",
  },
];

export default function MenuPreview() {
  return (
    <section className="py-28 px-4 sm:px-8 bg-[#030303] text-white border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#EFB80D] bg-[#EFB80D]/10 border border-[#EFB80D]/25 px-4 py-1.5 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE ARTISANAL PLATTERS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#FFF8EC] leading-tight">
              Best Sellers from the <SwashAccent>Hearth</SwashAccent>
            </h2>
          </div>

          <CtaPill href="/menu" variant="ghost" size="md">
            VIEW FULL MENU ({MENU_ITEMS.length} CREATIONS)
          </CtaPill>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {MENU_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group bg-[#241509]/60 hover:bg-[#241509] border border-[#E7DCC9]/15 hover:border-[#EFB80D]/50 rounded-[20px] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Image Container with 1.02 hover zoom */}
                <div className="relative w-full h-48 rounded-[16px] overflow-hidden bg-[#030303] mb-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute top-3 left-3 bg-[#EFB80D] text-[#2B1B12] font-mono text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {item.tag}
                  </div>
                </div>

                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-display font-semibold text-lg text-[#FFF8EC] group-hover:text-[#EFB80D] transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <span className="font-mono text-base font-bold text-[#EFB80D] shrink-0 ml-2">
                    {item.price}
                  </span>
                </div>

                <p className="font-sans text-xs text-[#B3A697] leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-[#7A6A5B]">
                <span>{item.specs}</span>
                <Link
                  href="/menu"
                  className="text-[#EFB80D] hover:underline flex items-center gap-1 font-semibold focus-visible:outline-2 focus-visible:outline-[#EFB80D] rounded p-0.5"
                >
                  <span>Order</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-6 sm:p-8 rounded-[20px] bg-[#1a0f06] border border-[#EFB80D]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#EFB80D]/10 border border-[#EFB80D]/30 flex items-center justify-center text-[#EFB80D]">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="font-display font-semibold text-base text-[#FFF8EC]">
                Need a Grand Platter for Events?
              </div>
              <div className="font-sans text-xs text-[#B3A697]">
                We fire live copper platters at your private gatherings and celebrations.
              </div>
            </div>
          </div>

          <CtaPill href="/catering" size="md">
            EXPLORE CATERING
          </CtaPill>
        </div>
      </div>
    </section>
  );
}
