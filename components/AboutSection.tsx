import React from "react";
import { Anchor, Award, Users, TrendingUp, Star, MapPin, Sparkles } from "lucide-react";
import SwashAccent from "@/components/SwashAccent";
import { CompassRose, ShipHelm, CaptainSeal, WaveDivider } from "@/components/NauticalElements";

export default function AboutSection() {
  const storyMilestones = [
    {
      step: "01",
      title: "The Levantine Origin",
      subtitle: "Family Heirloom Recipe",
      desc: "Passed down through generations of Levantine hearth-spinners, mastering the delicate tension of paper-thin kataifi dough and cold-curd Akawi cheese.",
    },
    {
      step: "02",
      title: "Arrival in Hyderabad",
      subtitle: "Barkas Port — 2021",
      desc: "Founder Saud bin Nasar Khulagi brought the original copper-pan craft to the historic Arab quarters of Barkas, firing the first live hearth in Hyderabad.",
    },
    {
      step: "03",
      title: "The 205°C Science",
      subtitle: "Acoustic 48 dB Crunch",
      desc: "Every tray is roasted at exactly 205°C in clarified grass-fed ghee, creating a resonant crisp exterior encasing molten 18-hour desalinated curd.",
    },
    {
      step: "04",
      title: "Fleet of 5 Outposts",
      subtitle: "City-Wide Destination",
      desc: "From Old City to the HITEC corridor, each location is a dedicated port for fresh-pressed kunafa served steaming directly to your table.",
    },
  ];

  const stats = [
    { value: "5", label: "Active Outposts", sub: "Hyderabad Fleet", icon: MapPin },
    { value: "205°C", label: "Copper Hearth", sub: "Precision Sear", icon: FlameIcon },
    { value: "50K+", label: "Trays Served", sub: "Since 2021", icon: Users },
    { value: "4.8★", label: "Google Rating", sub: "500+ Reviews", icon: Star },
  ];

  function FlameIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    );
  }

  return (
    <section id="about" className="py-28 px-4 sm:px-8 bg-white border-t border-[#E7DCC9] relative overflow-hidden">
      {/* Background nautical chart grid & watermarks */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(218,112,52,0.04)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />
      <div className="absolute top-10 right-10 opacity-15 pointer-events-none hidden lg:block">
        <CompassRose size={220} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#EFB80D] bg-[#EFB80D]/10 border border-[#EFB80D]/30 px-4 py-1.5 rounded-full mb-4">
            <ShipHelm size={15} className="text-[#DA7034]" />
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

        {/* Narrative Grid: Left Bio + Right Story Progression */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Founder Persona & Guarantee (5 cols) */}
          <div className="lg:col-span-5 bg-[#FFF8EC] border border-[#E7DCC9] rounded-[24px] p-7 sm:p-9 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#EFB80D]/10 rounded-full blur-2xl pointer-events-none" />

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
                Growing up in a household where the aroma of clarified ghee and simmering orange blossom syrup signaled family celebrations, Saud learned the exacting alchemy of Levantine pastry from the matriarchs of his family.
              </p>
              <p>
                Recognizing that most commercial desserts sacrificed cheese quality for shelf-life, he set out to restore the true artisanal standard: <strong className="text-[#2B1B12]">cold-desalinated Akawi curd, spun kataifi nests roasted live in copper, and raw Aleppo green emerald pistachios</strong>.
              </p>
              <p className="italic text-[#2B1B12] font-display text-base border-l-2 border-[#DA7034] pl-4">
                "If the crunch doesn't echo when the knife cuts the disc, it doesn't leave the kitchen."
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E7DCC9] flex items-center justify-between">
              <CaptainSeal />
            </div>
          </div>

          {/* Right Column: 4-Step Story Arc (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {storyMilestones.map((m, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E7DCC9] rounded-[20px] p-6 hover:border-[#DA7034]/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#DA7034] px-2.5 py-1 rounded-full bg-[#DA7034]/10 border border-[#DA7034]/20">
                      PHASE {m.step}
                    </span>
                    <span className="font-mono text-[10px] text-[#7A6A5B] uppercase tracking-widest">
                      {m.subtitle}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-[#2B1B12] mb-2">
                    {m.title}
                  </h3>
                  <p className="font-sans text-xs text-[#7A6A5B] leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E7DCC9]/60 font-mono text-[10px] text-[#EFB80D] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EFB80D]" />
                  <span>AUTHENTIC STANDARD</span>
                </div>
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
