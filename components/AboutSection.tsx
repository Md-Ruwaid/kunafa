import React from "react";
import SwashAccent from "@/components/SwashAccent";
import { CompassRose, CaptainSeal } from "@/components/NauticalElements";

export default function AboutSection() {
  const craftPillars = [
    {
      title: "18-Hour Cold Desalination",
      desc: "Fresh mountain Akawi and Nablusi curd soaked in cold water rotations to extract excess salt while retaining pure milky stretch.",
    },
    {
      title: "205°C Precision Copper Sear",
      desc: "Spun kataifi dough roasted in clarified A2 grass-fed ghee over custom burners, delivering a resonant 48 dB audible crunch.",
    },
    {
      title: "Aleppo Emerald Pistachios",
      desc: "First-harvest Syrian green pistachios, hand-crushed and sprinkled generously over warm orange blossom and Damascus rose attar.",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 sm:py-28 px-4 sm:px-8 bg-[#050505] text-[#FFF8EC] border-t border-[#EFB80D]/30 relative overflow-hidden"
    >
      {/* Background gold chart grid & watermark */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(239,184,13,0.08)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />
      <div className="absolute top-10 right-10 opacity-10 pointer-events-none hidden lg:block text-[#EFB80D]">
        <CompassRose size={220} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-3 sm:mb-4">
            From the Levant to Hyderabad:{" "}
            <SwashAccent color="gold">The Maestro's Craft</SwashAccent>
          </h2>

          <p className="font-sans text-xs sm:text-base text-white/70 leading-relaxed">
            The narrative of Captain Kunafa is not marketing rhetoric — it is an uncompromising heirloom journey charted by{" "}
            <span className="text-[#EFB80D] font-bold">Saud bin Nasar Khulagi</span>.
          </p>
        </div>

        {/* Founder Story & Craft Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left Column: Founder Persona (6 cols) */}
          <div className="lg:col-span-6 bg-[#0d0d0d] border-2 border-[#EFB80D] rounded-[20px] sm:rounded-[24px] p-5 sm:p-9 shadow-[0_10px_35px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#EFB80D]/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-3.5 sm:gap-4 mb-5 sm:mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#EFB80D] text-[#050505] flex items-center justify-center font-display font-black text-2xl sm:text-3xl shrink-0 shadow-[0_0_20px_rgba(239,184,13,0.45)]">
                  S
                </div>
                <div>
                  <div className="font-display font-bold text-lg sm:text-xl text-white">
                    Saud bin Nasar Khulagi
                  </div>
                  <div className="inline-block bg-[#EFB80D] text-[#050505] font-mono text-[10px] sm:text-xs uppercase tracking-wider font-bold px-2 py-0.5 rounded-md mt-0.5">
                    Founder &amp; Recipe Maestro
                  </div>
                  <div className="font-mono text-[9px] sm:text-[10px] text-white/50 mt-1">
                    Barkas, Hyderabad · Est. 2021
                  </div>
                </div>
              </div>

              <div className="space-y-3.5 font-sans text-xs sm:text-sm text-white/80 leading-relaxed border-t border-[#EFB80D]/20 pt-5">
                <p>
                  Growing up in a household where the aroma of clarified ghee and simmering orange blossom syrup signaled celebrations, Saud learned the exacting alchemy of Levantine pastry from his family elders.
                </p>
                <p>
                  In 2021, he brought the original shallow copper pans to the historic quarters of Barkas. Today, across our branches in Hyderabad, every single tray is prepared from scratch — never pre-baked, never reheated.
                </p>
                <p className="italic text-[#EFB80D] font-display text-sm sm:text-base border-l-4 border-[#EFB80D] pl-3 sm:pl-4">
                  "If the crunch doesn't echo when the knife cuts the disc, it doesn't leave our hearth."
                </p>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#EFB80D]/20 flex items-center justify-between">
              <CaptainSeal />
            </div>
          </div>

          {/* Right Column: 3 Core Pillars (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-3 sm:gap-4">
            {craftPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-[#0d0d0d] border border-[#EFB80D]/40 hover:border-[#EFB80D] rounded-[18px] sm:rounded-[22px] p-5 sm:p-7 transition-all flex-1 flex flex-col justify-center shadow-md hover:shadow-[0_0_20px_rgba(239,184,13,0.15)]"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 mb-1.5 sm:mb-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#EFB80D] text-[#050505] flex items-center justify-center font-mono text-xs font-black shrink-0 shadow-sm">
                    0{idx + 1}
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-white">
                    {pillar.title}
                  </h3>
                </div>
                <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed pl-10 sm:pl-12">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
