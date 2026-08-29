"use client";

import React from "react";
import { Shield, Phone, ArrowUp } from "lucide-react";
import { ShipHelm } from "@/components/NauticalElements";

export default function Footer() {
  const scrollToTop = () => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (n: number) => void } }).lenis;
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#030303] text-[#FFF8EC] border-t border-[#222222] pt-16 sm:pt-20 pb-10 sm:pb-12 px-4 sm:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 pb-12 sm:pb-16 border-b border-white/10">
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3.5 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#EFB80D] text-[#000000] flex items-center justify-center shrink-0">
                <ShipHelm size={22} className="text-[#000000] sm:w-[24px] sm:h-[24px]" />
              </div>
              <span className="font-display font-bold text-lg sm:text-xl text-white">
                CAPTAIN <span className="italic text-[#EFB80D]">KUNAFA</span>
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-white/75 leading-relaxed max-w-sm mb-5 sm:mb-6">
              Hyderabad's premier authentic Levantine dessert brand. Founded in 2021 by Saud bin Nasar Khulagi. Hand-pressed on live copper hearths across our city branches.
            </p>
            <div className="font-mono text-[11px] sm:text-xs text-[#EFB80D] font-bold space-y-1">
              <div>CENTRAL HEARTH &amp; HQ: BARKAS, HYDERABAD · 500005</div>
              <div>HOTLINE: +91 90000 00001</div>
            </div>
          </div>

          {/* Quick Nav (3 cols) */}
          <div className="md:col-span-3">
            <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#EFB80D] font-bold mb-3 sm:mb-4">
              VOYAGE NAVIGATION
            </div>
            <ul className="space-y-2 font-sans text-xs text-white/80">
              {[
                { label: "The Scrollytelling Story", href: "#story" },
                { label: "Saud's Levantine Chronicle", href: "#about" },
                { label: "Hyderabad Branches", href: "#locations" },
                { label: "Copper Hearth Platters", href: "#menu" },
                { label: "Ship's Logbook Reviews", href: "#reviews" },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="hover:text-[#EFB80D] transition-colors py-0.5 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quality Standards & Inquiries (4 cols) */}
          <div className="md:col-span-4">
            <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#EFB80D] font-bold mb-3 sm:mb-4">
              THE CAPTAIN'S GUARANTEE
            </div>
            <div className="space-y-2.5 sm:space-y-3 font-sans text-xs text-white/80 mb-5 sm:mb-6">
              <div className="flex items-start gap-2 sm:gap-2.5">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EFB80D] shrink-0 mt-0.5" />
                <span>100% Grass-Fed Clarified A2 Ghee — zero palm oil.</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-2.5">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EFB80D] shrink-0 mt-0.5" />
                <span>18-hour cold desalinated mountain Akawi &amp; Nablusi curd.</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-2.5">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EFB80D] shrink-0 mt-0.5" />
                <span>Raw first-harvest Aleppo emerald green pistachios.</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/919000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#EFB80D] hover:bg-[#ffca28] text-[#000000] font-sans text-xs font-black px-6 py-3 rounded-full transition-all active:scale-95 hover:scale-105"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Direct WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright & Back to Top */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[10px] sm:text-xs text-white/50 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} CAPTAIN KUNAFA. ALL RIGHTS RESERVED. HYDERABAD, INDIA.
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[#EFB80D] hover:text-white transition-colors cursor-pointer font-bold"
          >
            <span>Back to Top of Voyage</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
