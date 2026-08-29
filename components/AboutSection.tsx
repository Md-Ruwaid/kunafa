"use client";

import React from "react";
import { motion } from "framer-motion";
import SwashAccent from "@/components/SwashAccent";
import { CaptainSeal, ShipHelm } from "@/components/NauticalElements";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 sm:py-28 px-4 sm:px-8 bg-[#050505] text-[#FFF8EC] border-t border-[#222222] relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header with subtle pop animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-3 sm:mb-4">
            About <SwashAccent color="gold">Captain Kunafa</SwashAccent>
          </h2>
          <p className="font-sans text-xs sm:text-base text-white/70">
            A sweet adventure rooted in heirloom Middle-Eastern heritage.
          </p>
        </motion.div>

        {/* Pop-in About Card with balanced white & gold palette */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[#121212] border-2 border-[#EFB80D] rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 lg:p-14 relative overflow-hidden flex flex-col justify-between shadow-2xl"
        >
          <div>
            {/* Header Identity with White & Gold Elements */}
            <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#EFB80D] text-[#000000] flex items-center justify-center shrink-0 shadow-md">
                <ShipHelm size={28} className="text-[#000000]" />
              </div>
              <div>
                <div className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">
                  Welcome Aboard
                </div>
                <div className="inline-block bg-white text-black font-mono text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md mt-1">
                  Hyderabad's Premier Levantine Haven
                </div>
              </div>
            </div>

            {/* Narrative requested by User with high readability white text */}
            <div className="space-y-4 sm:space-y-5 font-sans text-sm sm:text-base lg:text-lg text-white/90 font-medium leading-relaxed border-t border-white/10 pt-6">
              <p>
                Welcome aboard <strong className="text-white font-bold">Captain Kunafa</strong>, your ultimate destination for an exceptional journey through the delectable world of Kunafa in Hyderabad.
              </p>
              <p className="text-white/80">
                Nestled in the heart of Hyderabad, Captain Kunafa is your haven for indulgence. Whether you’re a Kunafa enthusiast or a first-time explorer, our extensive menu has something for everyone.
              </p>
              <div className="bg-[#1a1a1a] border-l-4 border-[#EFB80D] p-4 sm:p-5 rounded-r-xl my-3">
                <p className="font-display font-semibold text-base sm:text-xl text-white italic">
                  "Captain Kunafa invites you to embark on a sweet adventure like no other."
                </p>
              </div>
            </div>
          </div>

          {/* Footer Seal & Founder Badge */}
          <div className="mt-8 sm:mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CaptainSeal />
            <div className="font-mono text-[10px] sm:text-[11px] text-white/70 font-semibold uppercase tracking-wider">
              Founded by <span className="text-[#EFB80D] font-bold">Saud bin Nasar Khulagi</span> · Barkas
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
