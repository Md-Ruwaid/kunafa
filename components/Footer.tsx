import React from "react";
import Link from "next/link";
import Wordmark from "@/components/Wordmark";
import CtaPill from "@/components/CtaPill";
import { MapPin, Compass, Shield } from "lucide-react";

export default function Footer() {
  const outlets = [
    { city: "Dubai", location: "Dubai Mall — Fashion Avenue", status: "Flagship" },
    { city: "Dubai", location: "Alserkal Avenue — Warehouse 42", status: "Artisanal Lab" },
    { city: "Riyadh", location: "Riyadh Front — Boulevard", status: "Open Service" },
    { city: "Doha", location: "Doha Port — Mina District", status: "Harbour Outpost" },
    { city: "Istanbul", location: "Galata Port — Bosphorus Pier", status: "Historic Haven" },
  ];

  return (
    <footer className="bg-[#241509] text-[#FFF8EC] border-t border-[#E7DCC9]/15 pt-20 pb-12 px-4 sm:px-8 relative overflow-hidden">
      {/* Background subtle glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#EFB80D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Outlets & Callout Banner */}
        <div className="bg-[#2B1B12] border border-[#EFB80D]/20 rounded-[20px] p-8 sm:p-12 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#EFB80D] mb-3">
              <Compass className="w-4 h-4" />
              <span>THE CAPTAIN’S FLEET</span>
            </div>
            <h3 className="font-display text-2xl sm:text-4xl font-semibold text-[#FFF8EC] leading-tight mb-2">
              Baked Fresh Across <span className="font-display italic font-semibold text-[#EFB80D]">5 Flagship Outposts</span>
            </h3>
            <p className="font-sans text-sm text-[#B3A697] leading-relaxed">
              Every platter is fired in individual copper pans at 205°C and served within 2 minutes of caramelization.
            </p>
          </div>

          <div className="shrink-0">
            <CtaPill href="/menu" size="lg">
              ORDER FRESH PLATTER
            </CtaPill>
          </div>
        </div>

        {/* 5 Outlets Grid */}
        <div className="mb-16">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#EFB80D] mb-6 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>PORT LOCATIONS & OUTLETS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {outlets.map((outlet, idx) => (
              <div
                key={idx}
                className="p-5 rounded-[16px] bg-[#1a0f06] border border-[#E7DCC9]/10 hover:border-[#EFB80D]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] text-[#EFB80D] font-medium">
                      0{idx + 1} / {outlet.city}
                    </span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-[#EFB80D]/10 text-[#EFB80D] border border-[#EFB80D]/20">
                      {outlet.status}
                    </span>
                  </div>
                  <div className="font-display font-medium text-sm text-[#FFF8EC] leading-snug">
                    {outlet.location}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[10px] text-[#7A6A5B] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Daily 12:00 — 01:00</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Navigation & Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-[#E7DCC9]/10">
          <div className="md:col-span-5">
            <Wordmark size="md" className="mb-4" />
            <p className="font-sans text-sm text-[#B3A697] leading-relaxed max-w-sm mb-6">
              Hand-spun golden kataifi encasing molten Akawi and Nablusi cheese, drenched in Damascus rose and orange blossom nectar.
            </p>
            <div className="font-mono text-[11px] text-[#7A6A5B] space-y-1">
              <div>FLEET HEADQUARTERS: DUBAI, UAE</div>
              <div>ORIGIN: 31.9522° N, 35.2332° E</div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-xs uppercase tracking-wider text-[#EFB80D] mb-4">
              VOYAGE ROUTES
            </div>
            <ul className="space-y-2.5 font-sans text-sm text-[#B3A697]">
              <li>
                <Link href="/" className="hover:text-[#EFB80D] transition-colors focus-visible:outline-2 focus-visible:outline-[#EFB80D] focus-visible:outline-offset-2 rounded">
                  Home Voyage
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#EFB80D] transition-colors focus-visible:outline-2 focus-visible:outline-[#EFB80D] focus-visible:outline-offset-2 rounded">
                  Artisanal Menu
                </Link>
              </li>
              <li>
                <Link href="/franchise" className="hover:text-[#EFB80D] transition-colors focus-visible:outline-2 focus-visible:outline-[#EFB80D] focus-visible:outline-offset-2 rounded">
                  Franchise Fleet
                </Link>
              </li>
              <li>
                <Link href="/catering" className="hover:text-[#EFB80D] transition-colors focus-visible:outline-2 focus-visible:outline-[#EFB80D] focus-visible:outline-offset-2 rounded">
                  Private Catering
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="font-mono text-xs uppercase tracking-wider text-[#EFB80D] mb-4">
              CAPTAIN’S GUARANTEE
            </div>
            <div className="space-y-3 font-sans text-xs text-[#B3A697]">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-[#EFB80D] shrink-0 mt-0.5" />
                <span>100% Grass-Fed Clarified Ghee with zero palm oil.</span>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-[#EFB80D] shrink-0 mt-0.5" />
                <span>Cold-washed 18-hour desalinated mountain Akawi curd.</span>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-[#EFB80D] shrink-0 mt-0.5" />
                <span>Hand-crushed first-crop Aleppo emerald pistachios.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#7A6A5B]">
          <div>
            © {new Date().getFullYear()} CAPTAIN KUNAFA. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>DECK ESPRESSO THEME</span>
            <span className="text-[#EFB80D]">EST. 2024</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
