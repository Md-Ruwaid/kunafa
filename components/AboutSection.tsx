import React from "react";
import SwashAccent from "@/components/SwashAccent";
import { CompassRose, CaptainSeal } from "@/components/NauticalElements";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 sm:py-28 px-4 sm:px-8 bg-[#050505] text-[#FFF8EC] border-t border-[#222222] relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-3 sm:mb-4">
            From the Levant to Hyderabad:{" "}
            <SwashAccent color="gold">The Maestro's Craft</SwashAccent>
          </h2>

          <p className="font-sans text-xs sm:text-base text-white/70 leading-relaxed">
            The narrative of Captain Kunafa is not marketing rhetoric — it is an uncompromising heirloom journey charted by{" "}
            <span className="text-[#EFB80D] font-bold">Saud bin Nasar Khulagi</span>.
          </p>
        </div>

        {/* Founder Story - Solid #EFB80D Gold Filled Card */}
        <div className="bg-[#EFB80D] text-[#000000] rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 lg:p-12 relative overflow-hidden flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#000000] text-[#EFB80D] flex items-center justify-center font-display font-black text-3xl sm:text-4xl shrink-0">
                S
              </div>
              <div>
                <div className="font-display font-black text-2xl sm:text-3xl text-[#000000]">
                  Saud bin Nasar Khulagi
                </div>
                <div className="inline-block bg-[#000000] text-[#EFB80D] font-mono text-xs uppercase tracking-wider font-black px-3 py-1 rounded-md mt-1">
                  Founder &amp; Recipe Maestro
                </div>
                <div className="font-mono text-[10px] sm:text-xs text-[#000000]/75 font-bold mt-1">
                  Barkas, Hyderabad · Est. 2021
                </div>
              </div>
            </div>

            <div className="space-y-4 font-sans text-sm sm:text-base text-[#000000] font-medium leading-relaxed border-t border-[#000000]/20 pt-6">
              <p>
                Growing up in a household where the aroma of clarified ghee and simmering orange blossom syrup signaled celebrations, Saud learned the exacting alchemy of Levantine pastry from his family elders.
              </p>
              <p>
                In 2021, he brought the original shallow copper pans to the historic quarters of Barkas. Today, across our branches in Hyderabad, every single tray is prepared from scratch — never pre-baked, never reheated.
              </p>
              <p className="italic text-[#000000] font-display font-black text-base sm:text-lg border-l-4 border-[#000000] pl-4 sm:pl-5 my-4">
                "If the crunch doesn't echo when the knife cuts the disc, it doesn't leave our hearth."
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#000000]/20 flex items-center justify-between">
            <CaptainSeal />
          </div>
        </div>
      </div>
    </section>
  );
}
