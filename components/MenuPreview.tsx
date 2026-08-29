import React from "react";
import { Sparkles, Flame } from "lucide-react";
import SwashAccent from "@/components/SwashAccent";

const MENU_ITEMS = [
  {
    id: "classic-gold",
    name: "The Royal Captain Classic",
    tag: "SIGNATURE",
    description:
      "Clarified A2 ghee kataifi encasing molten 18-hr desalinated Akawi cheese, bathed in Damascus rose and orange blossom attar.",
    image: "/kunafa-frames/ezgif-frame-001.webp",
    specs: "48 dB Acoustic Snap · 45cm Cheese Pull",
  },
  {
    id: "aleppo-pistachio",
    name: "Aleppo Emerald Crown",
    tag: "CHEF'S SELECTION",
    description:
      "Double-loaded with raw first-harvest green Aleppo pistachios, cardamom-infused nectar, and rich buffalo clotted ashta cream.",
    image: "/kunafa-frames/ezgif-frame-050.webp",
    specs: "First-Crop G1 Pistachio · Ashta Foam",
  },
  {
    id: "salted-caramel",
    name: "Toasted Terracotta & Salted Caramel",
    tag: "SEASONAL",
    description:
      "Smoked sea-salt caramel drizzle infused into roasted kataifi nests, layered with molten Nablusi curd and crushed pecan pralines.",
    image: "/kunafa-frames/ezgif-frame-075.webp",
    specs: "Smoked Maldon Salt · Caramel Crunch",
  },
  {
    id: "dark-chocolate",
    name: "Dark Valrhona & Tahini Fondant",
    tag: "NEW CREATION",
    description:
      "72% Valrhona dark chocolate molten core enveloped by toasted sesame kataifi and date syrup reduction.",
    image: "/kunafa-frames/ezgif-frame-100.webp",
    specs: "72% Single-Origin Cocoa · Organic Tahini",
  },
];

export default function MenuPreview() {
  return (
    <section className="py-28 px-4 sm:px-8 bg-white text-[#2B1B12] border-t border-[#E7DCC9]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#EFB80D] bg-[#EFB80D]/10 border border-[#EFB80D]/30 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE ARTISANAL PLATTERS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#2B1B12] leading-tight">
            Crafted from the <SwashAccent>Golden Hearth</SwashAccent>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {MENU_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group bg-[#FFF8EC] hover:bg-white border border-[#E7DCC9] hover:border-[#EFB80D]/50 rounded-[20px] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative w-full h-48 rounded-[16px] overflow-hidden bg-[#030303] mb-5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute top-3 left-3 bg-[#EFB80D] text-[#2B1B12] font-mono text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {item.tag}
                </div>
              </div>

              <h3 className="font-display font-semibold text-lg text-[#2B1B12] group-hover:text-[#DA7034] transition-colors leading-snug mb-2">
                {item.name}
              </h3>

              <p className="font-sans text-xs text-[#7A6A5B] leading-relaxed mb-4">
                {item.description}
              </p>

              <div className="pt-3 border-t border-[#E7DCC9] font-mono text-[10px] text-[#B3A697]">
                {item.specs}
              </div>
            </div>
          ))}
        </div>

        {/* Catering callout */}
        <div id="catering" className="p-6 sm:p-10 rounded-[20px] bg-[#FFF8EC] border border-[#EFB80D]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#EFB80D]/10 border border-[#EFB80D]/40 flex items-center justify-center text-[#EFB80D]">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="font-display font-semibold text-base text-[#2B1B12]">
                Live Copper Hearths for Private Events
              </div>
              <div className="font-sans text-xs text-[#7A6A5B] mt-0.5">
                We bring our master spinners and cast-iron stations to your celebration.
              </div>
            </div>
          </div>
          <a
            href="mailto:catering@captainkunafa.com"
            className="shrink-0 font-mono text-xs uppercase tracking-wider text-[#EFB80D] border border-[#EFB80D]/50 hover:border-[#EFB80D] hover:bg-[#EFB80D]/10 px-6 py-3 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-[#EFB80D]"
          >
            GET IN TOUCH
          </a>
        </div>
      </div>
    </section>
  );
}
