"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Flame, Shield, TrendingUp, Award, MapPin } from "lucide-react";
import SwashAccent from "@/components/SwashAccent";
import CtaPill from "@/components/CtaPill";

export default function FranchisePage() {
  const valueProps = [
    {
      step: "01",
      title: "Patented Copper-Hearth Model",
      icon: Flame,
      summary:
        "High-turnover, small-footprint artisanal kitchen design operating at 205°C precision with rapid 2-minute plating.",
      copy: "[PLACEHOLDER — awaiting client copy: Detailed equipment specifications and energy efficiency ratios]",
    },
    {
      step: "02",
      title: "Proprietary Supply Chain Logistics",
      icon: Shield,
      summary:
        "Direct-from-source single-estate Aleppo pistachios, clarified A2 ghee, and 18-hour cold-washed mountain Akawi curd.",
      copy: "[PLACEHOLDER — awaiting client copy: Centralized distribution network and cold-chain compliance guarantees]",
    },
    {
      step: "03",
      title: "Proven Flagship Unit Economics",
      icon: TrendingUp,
      summary:
        "Consistent high margins across premier commercial destinations in Dubai Mall, Riyadh Front, and Galata Port.",
      copy: "[PLACEHOLDER — awaiting client copy: Historical average unit volume (AUV) and payback timeline disclosures]",
    },
    {
      step: "04",
      title: "Comprehensive Captain’s Training Academy",
      icon: Award,
      summary:
        "Full culinary certifications for master kataifi spinners, hearth pitmasters, and operational managers.",
      copy: "[PLACEHOLDER — awaiting client copy: 4-week immersion curriculum and post-opening audit framework]",
    },
  ];

  return (
    <main className="min-h-screen bg-[#030303] text-[#FFF8EC] pt-32 pb-28 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#EFB80D] bg-[#EFB80D]/10 border border-[#EFB80D]/25 px-4 py-1.5 rounded-full mb-4">
            <Compass className="w-4 h-4" />
            <span>GLOBAL EXPANSION FLEET</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-semibold text-[#FFF8EC] mb-6 leading-tight">
            Captain Kunafa <SwashAccent>Franchise Fleet</SwashAccent>
          </h1>

          <p className="font-sans text-base text-[#B3A697] leading-relaxed mb-8">
            Partner with the world’s foremost artisanal kunafa atelier. We bring royal Middle Eastern heritage and high-precision culinary engineering to prime global markets.
          </p>

          <CtaPill href="mailto:franchise@captainkunafa.com" size="lg">
            INQUIRE FOR TERRITORY ALLOCATION
          </CtaPill>
        </div>

        {/* Value Prop Cards with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {valueProps.map((vp, idx) => {
            const Icon = vp.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="bg-[#241509] border border-[#E7DCC9]/15 hover:border-[#EFB80D]/50 rounded-[20px] p-8 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#EFB80D]/10 border border-[#EFB80D]/30 flex items-center justify-center text-[#EFB80D]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs text-[#EFB80D] tracking-widest font-bold">
                      PROPOSITION {vp.step}
                    </span>
                  </div>

                  <h3 className="font-display font-semibold text-2xl text-[#FFF8EC] mb-3">
                    {vp.title}
                  </h3>

                  <p className="font-sans text-sm text-[#B3A697] leading-relaxed mb-6">
                    {vp.summary}
                  </p>
                </div>

                <div className="p-4 rounded-[16px] bg-[#1a0f06] border border-dashed border-[#EFB80D]/30 font-mono text-xs text-[#EFB80D]/80">
                  {vp.copy}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Territory Allocation Callout */}
        <div className="bg-[#241509] border border-[#EFB80D]/30 rounded-[20px] p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#EFB80D] mb-4">
              <MapPin className="w-4 h-4" />
              <span>TARGET EXPANSION HUBS: LONDON • RIYADH • SINGAPORE • NEW YORK</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#FFF8EC] mb-4">
              Ready to Command a <SwashAccent>Flagship Hearth</SwashAccent>?
            </h2>

            <p className="font-sans text-sm text-[#B3A697] mb-8 leading-relaxed">
              Territory exclusivity is granted strictly on a per-region evaluation. Connect directly with our executive franchise director.
            </p>

            <CtaPill href="mailto:franchise@captainkunafa.com" size="lg">
              REQUEST FRANCHISE DOSSIER
            </CtaPill>
          </div>
        </div>
      </div>
    </main>
  );
}
