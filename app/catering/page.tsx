import React from "react";
import { Sparkles, Calendar, Utensils } from "lucide-react";
import SwashAccent from "@/components/SwashAccent";
import CtaPill from "@/components/CtaPill";

export default function CateringPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-[#FFF8EC]">
      {/* Full-Bleed Photography Hero Pattern */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-8 pt-32 pb-20 overflow-hidden">
        {/* Background Atmosphere Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/kunafa-frames/ezgif-frame-001.webp"
            alt="Captain Kunafa Live Catering Hearth"
            className="w-full h-full object-cover opacity-20 filter blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-[#030303]/60" />
        </div>

        {/* Hero Content with Generous Whitespace */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#EFB80D] bg-[#EFB80D]/10 border border-[#EFB80D]/25 px-4 py-1.5 rounded-full mb-8">
            <Utensils className="w-4 h-4" />
            <span>PRIVATE & ROYAL CATERING</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold text-[#FFF8EC] mb-8 leading-[1.15]">
            Live Copper Hearths for <SwashAccent>Private Gatherings</SwashAccent>
          </h1>

          {/* Minimal Single-Paragraph Copy per PRD */}
          <p className="font-sans text-lg sm:text-xl text-[#B3A697] max-w-2xl mx-auto leading-relaxed mb-12 font-normal">
            Captain Kunafa brings our live copper cooking stations, master spinners, and molten artisanal platters directly to your private celebrations, corporate galas, and royal banquets.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CtaPill href="mailto:catering@captainkunafa.com" size="lg">
              RESERVE PRIVATE SERVICE
            </CtaPill>
            <CtaPill href="/menu" variant="ghost" size="lg">
              EXPLORE TASTING MENU
            </CtaPill>
          </div>
        </div>
      </section>

      {/* Visual Feature Strip */}
      <section className="py-20 px-4 sm:px-8 border-t border-[#E7DCC9]/10 bg-[#241509]/60">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-[20px] bg-[#1a0f06] border border-[#E7DCC9]/10 text-center">
            <div className="font-mono text-xs text-[#EFB80D] uppercase tracking-wider mb-2">
              01 / LIVE HEARTH
            </div>
            <div className="font-display font-semibold text-lg text-[#FFF8EC] mb-2">
              On-Site Copper Firing
            </div>
            <p className="font-sans text-xs text-[#B3A697]">
              Every platter baked hot in front of guests for maximum acoustic crunch.
            </p>
          </div>

          <div className="p-8 rounded-[20px] bg-[#1a0f06] border border-[#E7DCC9]/10 text-center">
            <div className="font-mono text-xs text-[#EFB80D] uppercase tracking-wider mb-2">
              02 / BESPOKE NECTARS
            </div>
            <div className="font-display font-semibold text-lg text-[#FFF8EC] mb-2">
              Custom Attar Infusions
            </div>
            <p className="font-sans text-xs text-[#B3A697]">
              Tailored orange blossom, rosewater, and cardamoms syrup blends.
            </p>
          </div>

          <div className="p-8 rounded-[20px] bg-[#1a0f06] border border-[#E7DCC9]/10 text-center">
            <div className="font-mono text-xs text-[#EFB80D] uppercase tracking-wider mb-2">
              03 / CAPTAIN SERVICE
            </div>
            <div className="font-display font-semibold text-lg text-[#FFF8EC] mb-2">
              Master Pastry Chefs
            </div>
            <p className="font-sans text-xs text-[#B3A697]">
              Dedicated culinary fleet handling setup, live plating, and service.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
