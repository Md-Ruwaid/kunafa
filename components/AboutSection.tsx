"use client";

import React from "react";
import SwashAccent from "@/components/SwashAccent";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-20 bg-[#050505] text-[#FFF8EC] py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          About <SwashAccent color="gold">Captain Kunafa</SwashAccent>
        </h2>

        <div className="space-y-4 font-sans text-base sm:text-lg md:text-xl text-white/85 font-normal leading-relaxed">
          <p>
            Welcome aboard <strong className="text-white font-bold">Captain Kunafa</strong>, your ultimate destination for an exceptional journey through the delectable world of Kunafa in Hyderabad.
          </p>
          <p className="text-white/75">
            Nestled in the heart of Hyderabad, Captain Kunafa is your haven for indulgence. Whether you’re a Kunafa enthusiast or a first-time explorer, our extensive menu has something for everyone.
          </p>
          <p className="font-display italic font-semibold text-lg sm:text-2xl text-[#EFB80D] pt-4">
            &ldquo;Captain Kunafa invites you to embark on a sweet adventure like no other.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}



