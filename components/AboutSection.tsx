"use client";

import React from "react";
import BrandName from "@/components/BrandName";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-30 -mt-[100vh] min-h-screen flex flex-col justify-center items-center py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#050505] text-[#FFF8EC] rounded-t-[40px] sm:rounded-t-[64px] border-t-2 border-[#EFB80D]/40 shadow-[0_-50px_120px_rgba(0,0,0,1)]"
    >
      <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8 my-auto">
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
          About <BrandName className="text-[#EFB80D]" />
        </h2>

        <div className="space-y-5 sm:space-y-6 font-sans text-base sm:text-lg md:text-xl text-white/90 font-normal leading-relaxed">
          <p>
            Welcome aboard <strong className="text-white font-bold"><BrandName /></strong>, your ultimate destination for an exceptional journey through the delectable world of Kunafa in Hyderabad.
          </p>
          <p className="text-white/80">
            Nestled in the heart of Hyderabad, <BrandName /> is your haven for indulgence. Whether you’re a Kunafa enthusiast or a first-time explorer, our extensive menu has something for everyone.
          </p>
          <p className="font-display italic font-semibold text-xl sm:text-3xl text-[#EFB80D] pt-4">
            &ldquo;<BrandName className="text-[#EFB80D]" /> invites you to embark on a sweet adventure like no other.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
