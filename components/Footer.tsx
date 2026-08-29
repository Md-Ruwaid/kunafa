"use client";

import React from "react";
import { MapPin, Anchor, Shield, Phone, Mail, Clock, ArrowUp } from "lucide-react";
import { ShipHelm, CompassRose, CaptainSeal } from "@/components/NauticalElements";

const outlets = [
  { city: "Barkas Port", area: "Old City Flagship", code: "HYD-01", hours: "12:00 PM – 01:30 AM", phone: "+91 90000 00001" },
  { city: "Malakpet Haven", area: "Chanchalguda Metro", code: "HYD-02", hours: "12:00 PM – 01:00 AM", phone: "+91 90000 00002" },
  { city: "Tolichowki Haven", area: "Paramount Colony", code: "HYD-03", hours: "12:00 PM – 01:30 AM", phone: "+91 90000 00003" },
  { city: "Aero City Anchor", area: "Shamshabad Corridor", code: "HYD-04", hours: "10:00 AM – 02:30 AM", phone: "+91 90000 00004" },
  { city: "Jubilee Hills", area: "Road No. 36 Flagship", code: "HYD-05", hours: "12:00 PM – 01:30 AM", phone: "+91 90000 00005" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#2B1B12] text-[#FFF8EC] border-t-2 border-[#EFB80D]/30 pt-20 pb-12 px-4 sm:px-8 relative overflow-hidden">
      {/* Subtle compass rose watermark */}
      <div className="absolute -bottom-10 right-10 opacity-5 pointer-events-none">
        <CompassRose size={350} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* 5 Hyderabad Outposts Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#EFB80D] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#DA7034]" />
              <span>THE 5 PORTS OF CALL — HYDERABAD</span>
            </div>
            <span className="font-mono text-[10px] text-[#B3A697] uppercase">
              17.3115° N, 78.4871° E
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {outlets.map((outlet, idx) => (
              <div
                key={idx}
                className="p-5 rounded-[18px] bg-[#1a0f06] border border-[#EFB80D]/20 hover:border-[#DA7034] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-[#DA7034] font-bold">
                      {outlet.code}
                    </span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-[#EFB80D]/10 text-[#EFB80D] border border-[#EFB80D]/20">
                      ACTIVE
                    </span>
                  </div>
                  <div className="font-display font-bold text-sm text-[#FFF8EC] mb-0.5">
                    {outlet.city}
                  </div>
                  <div className="font-sans text-xs text-[#B3A697]">
                    {outlet.area}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[10px] text-[#7A6A5B] space-y-1">
                  <div className="flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{outlet.hours}</span>
                  </div>
                  <div className="text-white/60">{outlet.phone}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-[#E7DCC9]/15">
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#FFF8EC] border-2 border-[#EFB80D] flex items-center justify-center">
                <ShipHelm size={22} className="text-[#DA7034]" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                CAPTAIN <span className="italic text-[#DA7034]">KUNAFA</span>
              </span>
            </div>
            <p className="font-sans text-sm text-[#B3A697] leading-relaxed max-w-sm mb-6">
              Hyderabad's premier authentic Levantine dessert brand. Founded in 2021 by Saud bin Nasar Khulagi. Hand-pressed on live copper hearths across 5 city outposts.
            </p>
            <div className="font-mono text-xs text-[#DA7034] space-y-1">
              <div>CENTRAL HEARTH &amp; HQ: BARKAS, HYDERABAD · 500005</div>
              <div>HOTLINE: +91 90000 00001</div>
            </div>
          </div>

          {/* Quick Nav (3 cols) */}
          <div className="md:col-span-3">
            <div className="font-mono text-xs uppercase tracking-wider text-[#EFB80D] font-bold mb-4">
              VOYAGE NAVIGATION
            </div>
            <ul className="space-y-2 font-sans text-xs text-[#B3A697]">
              {[
                { label: "The Scrollytelling Story", href: "#story" },
                { label: "Saud's Levantine Chronicle", href: "#about" },
                { label: "5 Hyderabad Outposts", href: "#locations" },
                { label: "Copper Hearth Platters", href: "#menu" },
                { label: "Ship's Logbook Reviews", href: "#reviews" },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="hover:text-[#DA7034] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quality Standards & Inquiries (4 cols) */}
          <div className="md:col-span-4">
            <div className="font-mono text-xs uppercase tracking-wider text-[#EFB80D] font-bold mb-4">
              THE CAPTAIN'S GUARANTEE
            </div>
            <div className="space-y-3 font-sans text-xs text-[#B3A697] mb-6">
              <div className="flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-[#DA7034] shrink-0 mt-0.5" />
                <span>100% Grass-Fed Clarified A2 Ghee — zero palm oil.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-[#DA7034] shrink-0 mt-0.5" />
                <span>18-hour cold desalinated mountain Akawi &amp; Nablusi curd.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-[#DA7034] shrink-0 mt-0.5" />
                <span>Raw first-harvest Aleppo emerald green pistachios.</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/919000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white font-sans text-xs font-semibold px-4 py-2 rounded-full transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Direct WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#7A6A5B]">
          <div>
            © {new Date().getFullYear()} CAPTAIN KUNAFA. ALL RIGHTS RESERVED. HYDERABAD, INDIA.
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[#DA7034] hover:text-[#EFB80D] transition-colors cursor-pointer"
          >
            <span>Back to Top of Voyage</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
