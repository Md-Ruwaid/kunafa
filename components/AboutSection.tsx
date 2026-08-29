import React from "react";
import { Anchor, Star, MapPin, Users, Flame, Shield, Sparkles } from "lucide-react";
import SwashAccent from "@/components/SwashAccent";
import { CompassRose, ShipHelm, CaptainSeal } from "@/components/NauticalElements";

export default function AboutSection() {
  const stats = [
    { value: "5", label: "Active Outposts", sub: "Hyderabad Fleet", icon: MapPin },
    { value: "205°C", label: "Copper Hearth", sub: "Precision Sear", icon: Flame },
    { value: "50K+", label: "Trays Served", sub: "Since 2021", icon: Users },
    { value: "4.8★", label: "Google Rating", sub: "520+ Reviews", icon: Star },
  ];

  const craftPillars = [
    {
      title: "18-Hour Desalination",
      desc: "Fresh mountain Akawi and Nablusi curd soaked in cold water rotations to extract excess salt while retaining pure milky stretch.",
    },
    {
      title: "205°C Copper Roasting",
      desc: "Spun kataifi dough seared in clarified A2 grass-fed ghee over custom burners, delivering a resonant 48 dB audible crunch.",
    },
    {
      title: "Aleppo Emerald Pistachios",
      desc: "First-harvest Syrian green pistachios, hand-crushed and sprinkled generously over warm orange blossom and Damascus rose attar.",
    },
  ];

  return (
    <section
      id="about"
      className="py-28 px-4 sm:px-8 bg-white border-t border-[#E7DCC9] relative overflow-hidden"
    >
      {/* Background nautical chart grid & watermark */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(218,112,52,0.04)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />
      <div className="absolute top-10 right-10 opacity-15 pointer-events-none hidden lg:block">
        <CompassRose size={220} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#DA7034] bg-[#DA7034]/10 border border-[#DA7034]/25 px-4 py-1.5 rounded-full mb-4">
            <ShipHelm size={15} className="text-[#EFB80D]" />
            <span>THE FOUNDER'S CHRONICLE</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#2B1B12] leading-tight mb-4">
            From the Levant to Hyderabad:{" "}
            <SwashAccent color="terracotta">The Maestro's Craft</SwashAccent>
          </h2>

          <p className="font-sans text-base text-[#7A6A5B] leading-relaxed">
            The narrative of Captain Kunafa is not marketing rhetoric — it is an uncompromising heirloom journey charted by{" "}
            <span className="text-[#2B1B12] font-semibold">Saud bin Nasar Khulagi</span>.
          </p>
        </div>

        {/* Founder Story & Craft Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          {/* Left Column: Founder Persona (6 cols) */}
          <div className="lg:col-span-6 bg-[#FFF8EC] border border-[#E7DCC9] rounded-[24px] p-7 sm:p-9 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#EFB80D]/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[#2B1B12] border-2 border-[#EFB80D] flex items-center justify-center text-[#EFB80D] font-display font-bold text-2xl shrink-0 shadow-md">
                  S
                </div>
                <div>
                  <div className="font-display font-bold text-xl text-[#2B1B12]">
                    Saud bin Nasar Khulagi
                  </div>
                  <div className="font-mono text-xs text-[#DA7034] uppercase tracking-wider font-semibold">
                    Founder &amp; Recipe Maestro
                  </div>
                  <div className="font-mono text-[10px] text-[#7A6A5B]">
                    Barkas, Hyderabad · Est. 2021
                  </div>
                </div>
              </div>

              <div className="space-y-4 font-sans text-sm text-[#7A6A5B] leading-relaxed border-t border-[#E7DCC9] pt-6">
                <p>
                  Growing up in a household where the aroma of clarified ghee and simmering orange blossom syrup signaled celebrations, Saud learned the exacting alchemy of Levantine pastry from his family elders.
                </p>
                <p>
                  In 2021, he brought the original shallow copper pans to the historic quarters of Barkas. Today, across 5 outposts in Hyderabad, every single tray is prepared from scratch — never pre-baked, never reheated.
                </p>
                <p className="italic text-[#2B1B12] font-display text-base border-l-2 border-[#DA7034] pl-4">
                  "If the crunch doesn't echo when the knife cuts the disc, it doesn't leave our hearth."
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E7DCC9] flex items-center justify-between">
              <CaptainSeal />
            </div>
          </div>

          {/* Right Column: 3 Core Pillars of Artisanal Quality (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            {craftPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E7DCC9] rounded-[22px] p-6 sm:p-7 hover:border-[#DA7034]/50 hover:shadow-md transition-all flex-1 flex flex-col justify-center"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#FFF8EC] border border-[#EFB80D]/40 flex items-center justify-center font-mono text-xs font-bold text-[#DA7034]">
                    0{idx + 1}
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#2B1B12]">
                    {pillar.title}
                  </h3>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#7A6A5B] leading-relaxed pl-11">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map(({ value, label, sub, icon: Icon }, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#FFF8EC] border border-[#E7DCC9] rounded-[20px] hover:border-[#EFB80D]/50 hover:shadow-md transition-all text-center"
            >
              <div className="w-11 h-11 rounded-full bg-white border border-[#EFB80D]/40 flex items-center justify-center mx-auto mb-3 text-[#DA7034] shadow-sm">
                <Icon className="w-5 h-5" />
              </div>
              <div className="font-display text-3xl sm:text-4xl font-bold text-[#2B1B12] mb-1">
                {value}
              </div>
              <div className="font-mono text-xs uppercase tracking-wider text-[#DA7034] font-semibold">
                {label}
              </div>
              <div className="font-mono text-[10px] text-[#7A6A5B] mt-0.5">
                {sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
