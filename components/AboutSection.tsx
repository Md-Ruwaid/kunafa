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

        {/* Pop-in Solid #EFB80D Gold About Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[#EFB80D] text-[#000000] rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 lg:p-14 relative overflow-hidden flex flex-col justify-between"
        >
          <div>
            {/* Header Identity */}
            <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#000000] text-[#EFB80D] flex items-center justify-center shrink-0">
                <ShipHelm size={28} className="text-[#EFB80D]" />
              </div>
              <div>
                <div className="font-display font-black text-2xl sm:text-3xl text-[#000000] leading-tight">
                  Welcome Aboard
                </div>
                <div className="font-mono text-[10px] sm:text-xs text-[#000000]/80 font-black uppercase tracking-wider mt-0.5">
                  Hyderabad's Premier Levantine Haven
                </div>
              </div>
            </div>

            {/* Narrative requested by User */}
            <div className="space-y-4 sm:space-y-5 font-sans text-sm sm:text-base lg:text-lg text-[#000000] font-semibold leading-relaxed border-t border-[#000000]/20 pt-6">
              <p>
                Welcome aboard <strong>Captain Kunafa</strong>, your ultimate destination for an exceptional journey through the delectable world of Kunafa in Hyderabad.
              </p>
              <p>
                Nestled in the heart of Hyderabad, Captain Kunafa is your haven for indulgence. Whether you’re a Kunafa enthusiast or a first-time explorer, our extensive menu has something for everyone.
              </p>
              <p className="font-display font-black text-base sm:text-xl text-[#000000] italic border-l-4 border-[#000000] pl-4 sm:pl-5 my-2">
                "Captain Kunafa invites you to embark on a sweet adventure like no other."
              </p>
            </div>
          </div>

          {/* Footer Seal & Founder Badge */}
          <div className="mt-8 sm:mt-10 pt-6 border-t border-[#000000]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CaptainSeal />
            <div className="font-mono text-[10px] sm:text-[11px] text-[#000000] font-black uppercase tracking-wider">
              Founded by Saud bin Nasar Khulagi · Barkas
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
