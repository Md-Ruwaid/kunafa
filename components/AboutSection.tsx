import React from "react";
import { Anchor, Award, Users, TrendingUp, Star, MapPin } from "lucide-react";
import SwashAccent from "@/components/SwashAccent";

export default function AboutSection() {
  const stats = [
    { value: "5", label: "Active Outlets", icon: MapPin },
    { value: "3+", label: "Years Sailing", icon: Anchor },
    { value: "50K+", label: "Happy Voyagers", icon: Users },
    { value: "4.8★", label: "Google Rating", icon: Star },
  ];

  return (
    <section id="about" className="py-28 px-4 sm:px-8 bg-white border-t border-[#E7DCC9]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Founder Story */}
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#EFB80D] bg-[#EFB80D]/10 border border-[#EFB80D]/30 px-4 py-1.5 rounded-full mb-6">
              <Anchor className="w-3.5 h-3.5" />
              <span>THE CAPTAIN'S STORY</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#2B1B12] leading-tight mb-6">
              Born from a <SwashAccent>Royal</SwashAccent> Recipe
            </h2>

            <div className="space-y-4 font-sans text-sm sm:text-base text-[#7A6A5B] leading-relaxed">
              <p>
                Captain Kunafa was founded by <span className="text-[#2B1B12] font-semibold">Saud bin Nasar Khulagi</span> — a man who grew up watching his grandmother press golden kataifi into copper pans over wood-fired hearths in the Levant. He carried that recipe across the Arabian Sea to Hyderabad.
              </p>
              <p>
                What started as a single copper-pan stall in Barkas quickly became the city's most talked-about dessert destination. Today, the fleet has grown to 5 outposts across Hyderabad — each one a port of call for anyone craving the authentic crunch and molten heart of real kunafa.
              </p>
              <p>
                Every tray is still pressed, roasted, and poured by hand. No shortcuts. No freezers. Just the original recipe, faithfully executed at scale.
              </p>
            </div>

            {/* Founder Tag */}
            <div className="mt-8 flex items-center gap-4 p-4 bg-[#FFF8EC] border border-[#E7DCC9] rounded-2xl">
              <div className="w-14 h-14 rounded-full bg-[#EFB80D]/20 border-2 border-[#EFB80D]/40 flex items-center justify-center text-[#EFB80D] font-display font-bold text-xl shrink-0">
                S
              </div>
              <div>
                <div className="font-display font-semibold text-[#2B1B12]">Saud bin Nasar Khulagi</div>
                <div className="font-mono text-xs text-[#7A6A5B] uppercase tracking-wider mt-0.5">
                  Founder & Captain — Captain Kunafa
                </div>
              </div>
            </div>
          </div>

          {/* Right — Stats Grid */}
          <div className="grid grid-cols-2 gap-5">
            {stats.map(({ value, label, icon: Icon }, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#FFF8EC] border border-[#E7DCC9] rounded-[20px] hover:border-[#EFB80D]/40 hover:shadow-md transition-all text-center"
              >
                <div className="w-10 h-10 rounded-full bg-[#EFB80D]/10 border border-[#EFB80D]/30 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-[#EFB80D]" />
                </div>
                <div className="font-display text-4xl font-semibold text-[#2B1B12] mb-1">{value}</div>
                <div className="font-mono text-xs uppercase tracking-wider text-[#7A6A5B]">{label}</div>
              </div>
            ))}

            {/* Guarantee note */}
            <div className="col-span-2 p-5 bg-[#2B1B12] rounded-[20px] text-center">
              <div className="font-display text-[#EFB80D] text-lg font-semibold mb-1 italic">
                "Fresh-pressed. Every order. Always."
              </div>
              <div className="font-mono text-xs text-[#B3A697] uppercase tracking-widest">
                The Captain's Guarantee — Hyderabad
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
