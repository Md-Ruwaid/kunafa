import React from "react";
import { MapPin, Anchor, Shield } from "lucide-react";

const outlets = [
  { city: "Barkas", label: "Old City Flagship", code: "HYD-01", hours: "12:00 – 01:00" },
  { city: "Malakpet", label: "South Hyderabad", code: "HYD-02", hours: "12:00 – 01:00" },
  { city: "Tolichowki", label: "West Hyderabad", code: "HYD-03", hours: "12:00 – 01:00" },
  { city: "Aero City", label: "Airport Corridor", code: "HYD-04", hours: "10:00 – 02:00" },
  { city: "Jubilee Hills", label: "HITEC Corridor", code: "HYD-05", hours: "12:00 – 01:00" },
];

export default function Footer() {
  return (
    <footer className="bg-[#2B1B12] text-[#FFF8EC] border-t border-[#E7DCC9]/15 pt-20 pb-12 px-4 sm:px-8 relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#EFB80D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* 5 Outlets */}
        <div className="mb-16">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#EFB80D] mb-6 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>5 OUTPOSTS — HYDERABAD</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {outlets.map((outlet, idx) => (
              <div key={idx} className="p-5 rounded-[16px] bg-[#1a0f06] border border-[#E7DCC9]/10 hover:border-[#EFB80D]/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[11px] text-[#EFB80D] font-medium">{outlet.code}</span>
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-[#EFB80D]/10 text-[#EFB80D] border border-[#EFB80D]/20">
                    OPEN
                  </span>
                </div>
                <div className="font-display font-semibold text-sm text-[#FFF8EC] mb-0.5">{outlet.city}</div>
                <div className="font-sans text-xs text-[#B3A697]">{outlet.label}</div>
                <div className="mt-3 pt-2.5 border-t border-white/5 font-mono text-[10px] text-[#7A6A5B] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {outlet.hours}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Grid */}
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
              Hyderabad's home for authentic Middle Eastern kunafa — hand-pressed on copper, served fresh since 2021.
              Founded by Saud bin Nasar Khulagi.
            </p>
            <div className="font-mono text-[11px] text-[#7A6A5B] space-y-1">
              <div>FLEET HQ: BARKAS, HYDERABAD — 500005</div>
              <div>+91 90000 00001</div>
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="font-mono text-xs uppercase tracking-wider text-[#EFB80D] mb-4">CAPTAIN'S GUARANTEE</div>
            <div className="space-y-3 font-sans text-xs text-[#B3A697]">
              {[
                "Fresh-pressed every single order — never reheated.",
                "Authentic Akawi and Nablusi cheese sourced directly.",
                "First-harvest pistachios — never the stale grocery kind.",
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-[#EFB80D] shrink-0 mt-0.5" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-xs uppercase tracking-wider text-[#EFB80D] mb-4">CONNECT</div>
            <div className="space-y-2 font-sans text-sm text-[#B3A697]">
              <div>franchise@captainkunafa.com</div>
              <div>catering@captainkunafa.com</div>
              <div>press@captainkunafa.com</div>
              <a
                href="https://wa.me/919000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 text-[#25D366] hover:text-[#20b858] transition-colors font-semibold"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#7A6A5B]">
          <div>© {new Date().getFullYear()} CAPTAIN KUNAFA. ALL RIGHTS RESERVED. HYDERABAD.</div>
          <div className="text-[#EFB80D]">EST. 2021</div>
        </div>
      </div>
    </footer>
  );
}
