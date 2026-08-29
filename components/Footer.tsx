import React from "react";
import { MapPin, Anchor, Shield } from "lucide-react";

const outlets = [
  { city: "Dubai", label: "Dubai Mall — Fashion Avenue", code: "DXB-01", status: "Flagship" },
  { city: "Dubai", label: "Alserkal Avenue — Warehouse 42", code: "DXB-02", status: "Artisanal Lab" },
  { city: "Riyadh", label: "Riyadh Front — Boulevard", code: "RUH-01", status: "Open Service" },
  { city: "Doha", label: "Mina Port — Harbour District", code: "DOH-01", status: "Harbour Outpost" },
  { city: "Istanbul", label: "Galata Port — Bosphorus Pier", code: "IST-01", status: "Historic Haven" },
];

export default function Footer() {
  return (
    <footer className="bg-[#2B1B12] text-[#FFF8EC] border-t border-[#E7DCC9]/15 pt-20 pb-12 px-4 sm:px-8 relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#EFB80D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* 5 Outlets Grid */}
        <div className="mb-16">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#EFB80D] mb-6 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>PORT LOCATIONS & OUTPOSTS</span>
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
                    {outlet.label}
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

        {/* Bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-[#E7DCC9]/10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#EFB80D]/10 border border-[#EFB80D]/30 flex items-center justify-center">
                <Anchor className="w-5 h-5 text-[#EFB80D]" />
              </div>
              <span className="font-display font-semibold text-lg text-white/95">
                CAPTAIN <span className="italic text-[#EFB80D]">KUNAFA</span>
              </span>
            </div>
            <p className="font-sans text-sm text-[#B3A697] leading-relaxed max-w-sm mb-6">
              Hand-spun golden kataifi encasing molten Akawi and Nablusi cheese, drenched in Damascus rose and orange blossom nectar.
            </p>
            <div className="font-mono text-[11px] text-[#7A6A5B] space-y-1">
              <div>FLEET HEADQUARTERS: DUBAI, UAE</div>
              <div>ORIGIN: 31.9522° N, 35.2332° E</div>
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="font-mono text-xs uppercase tracking-wider text-[#EFB80D] mb-4">
              CAPTAIN'S GUARANTEE
            </div>
            <div className="space-y-3 font-sans text-xs text-[#B3A697]">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-[#EFB80D] shrink-0 mt-0.5" />
                <span>100% Grass-Fed Clarified Ghee — zero palm oil.</span>
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

          <div className="md:col-span-3">
            <div className="font-mono text-xs uppercase tracking-wider text-[#EFB80D] mb-4">
              CONNECT
            </div>
            <div className="space-y-2 font-sans text-sm text-[#B3A697]">
              <div>franchise@captainkunafa.com</div>
              <div>catering@captainkunafa.com</div>
              <div>press@captainkunafa.com</div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#7A6A5B]">
          <div>© {new Date().getFullYear()} CAPTAIN KUNAFA. ALL RIGHTS RESERVED.</div>
          <div className="text-[#EFB80D]">EST. 2024</div>
        </div>
      </div>
    </footer>
  );
}
