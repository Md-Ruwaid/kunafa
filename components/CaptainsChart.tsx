"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Compass, Anchor, MapPin, Phone, Navigation } from "lucide-react";
import SwashAccent from "@/components/SwashAccent";

const outlets = [
  { name: "Barkas", label: "Old City — Flagship", x: 180, y: 200, code: "HYD-01", address: "Barkas, Old City, Hyderabad", phone: "+91 90000 00001", hours: "12:00 – 01:00" },
  { name: "Malakpet", label: "South Hyderabad", x: 320, y: 140, code: "HYD-02", address: "Malakpet, Hyderabad", phone: "+91 90000 00002", hours: "12:00 – 01:00" },
  { name: "Tolichowki", label: "West Hyderabad", x: 460, y: 230, code: "HYD-03", address: "Tolichowki, Hyderabad", phone: "+91 90000 00003", hours: "12:00 – 01:00" },
  { name: "Aero City", label: "Airport Corridor", x: 620, y: 120, code: "HYD-04", address: "Aero City, Shamshabad, Hyderabad", phone: "+91 90000 00004", hours: "10:00 – 02:00" },
  { name: "Jubilee Hills", label: "HITEC Corridor", x: 780, y: 180, code: "HYD-05", address: "Jubilee Hills, Hyderabad", phone: "+91 90000 00005", hours: "12:00 – 01:00" },
];

export default function CaptainsChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: chartRef, offset: ["start end", "end start"] });
  const pathLength = useTransform(scrollYProgress, [0.15, 0.75], [0, 1]);

  return (
    <section ref={chartRef} id="locations" className="py-28 px-4 sm:px-8 bg-[#FFF8EC] text-[#2B1B12] relative overflow-hidden border-t border-[#E7DCC9]">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#EFB80D] bg-[#EFB80D]/10 border border-[#EFB80D]/30 px-4 py-1.5 rounded-full mb-4">
            <Compass className="w-4 h-4" />
            <span>5 OUTPOSTS ACROSS HYDERABAD</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#2B1B12] mb-4 leading-tight">
            Find Your Nearest <SwashAccent>Port of Call</SwashAccent>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#7A6A5B]">
            From Old City to HITEC corridor — a Captain Kunafa outpost is never far away.
          </p>
        </div>

        {/* SVG Chart */}
        <div className="bg-white border border-[#E7DCC9] rounded-[20px] p-6 sm:p-10 shadow-md relative overflow-hidden mb-10">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(239,184,13,0.07)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
          <div className="relative w-full h-[300px] overflow-x-auto">
            <svg viewBox="0 0 960 290" className="w-[960px] h-[290px] absolute inset-0 select-none">
              <line x1="0" y1="72" x2="960" y2="72" stroke="#E7DCC9" strokeOpacity="0.8" strokeDasharray="4 4" />
              <line x1="0" y1="145" x2="960" y2="145" stroke="#E7DCC9" strokeOpacity="0.8" strokeDasharray="4 4" />
              <line x1="0" y1="218" x2="960" y2="218" stroke="#E7DCC9" strokeOpacity="0.8" strokeDasharray="4 4" />

              <path d="M 180 200 Q 250 160, 320 140 T 460 230 T 620 120 T 780 180"
                fill="none" stroke="#E7DCC9" strokeOpacity="0.9" strokeWidth="2.5" strokeDasharray="6 5" />
              <motion.path d="M 180 200 Q 250 160, 320 140 T 460 230 T 620 120 T 780 180"
                fill="none" stroke="#EFB80D" strokeWidth="4" strokeLinecap="round" style={{ pathLength }} />

              {outlets.map((port, idx) => (
                <g key={idx}>
                  <circle cx={port.x} cy={port.y} r="16" fill="#EFB80D" fillOpacity="0.12" />
                  <circle cx={port.x} cy={port.y} r="7" fill="#EFB80D" />
                  <circle cx={port.x} cy={port.y} r="2.5" fill="#FFF8EC" />
                  <text x={port.x} y={port.y - 22} textAnchor="middle" fill="#2B1B12"
                    fontFamily="var(--font-fraunces), serif" fontWeight="600" fontSize="12.5">{port.name}</text>
                  <text x={port.x} y={port.y + 27} textAnchor="middle" fill="#7A6A5B"
                    fontFamily="var(--font-ibm-mono), monospace" fontSize="8.5" letterSpacing="0.1em">{port.code}</text>
                </g>
              ))}
            </svg>
          </div>
          <div className="pt-4 border-t border-[#E7DCC9] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#7A6A5B]">
            <div className="flex items-center gap-2"><Anchor className="w-4 h-4 text-[#EFB80D]" /><span>ALL 5 OUTPOSTS FIRING IN COPPER — HYDERABAD</span></div>
            <span className="text-[#EFB80D]">EST. 2021</span>
          </div>
        </div>

        {/* Outlet Detail Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {outlets.map((outlet, idx) => (
            <div key={idx} className="bg-white border border-[#E7DCC9] rounded-[20px] p-5 hover:border-[#EFB80D]/40 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#EFB80D] mb-0.5">{outlet.code}</div>
                  <h3 className="font-display font-semibold text-lg text-[#2B1B12]">{outlet.name}</h3>
                  <div className="font-sans text-xs text-[#7A6A5B]">{outlet.label}</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
              </div>
              <div className="space-y-2 font-mono text-[11px] text-[#7A6A5B] border-t border-[#E7DCC9] pt-3">
                <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#EFB80D] shrink-0" />{outlet.address}</div>
                <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-[#EFB80D] shrink-0" />{outlet.phone}</div>
                <div className="flex items-center gap-2"><Navigation className="w-3.5 h-3.5 text-[#EFB80D] shrink-0" />{outlet.hours}</div>
              </div>
              <a
                href={`https://wa.me/${outlet.phone.replace(/\D/g, "")}?text=Hi%20Captain%20Kunafa%20${outlet.name}!%20I'd%20like%20to%20enquire.`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-full border border-[#25D366]/40 text-[#25D366] font-mono text-[11px] uppercase tracking-wider hover:bg-[#25D366]/5 hover:border-[#25D366] transition-all focus-visible:outline-2 focus-visible:outline-[#EFB80D]"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Chat on WhatsApp
              </a>
            </div>
          ))}

          {/* Franchise CTA card */}
          <div className="bg-[#2B1B12] border border-[#EFB80D]/30 rounded-[20px] p-5 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#EFB80D] mb-2">COMING SOON</div>
              <h3 className="font-display font-semibold text-lg text-[#FFF8EC] mb-2">Your City?</h3>
              <p className="font-sans text-sm text-[#B3A697]">We're expanding beyond Hyderabad. Enquire about a franchise in your city.</p>
            </div>
            <button
              type="button"
              onClick={() => { const el = document.querySelector("#franchise"); el?.scrollIntoView({ behavior: "smooth" }); }}
              className="mt-5 w-full py-2.5 rounded-full bg-[#EFB80D] text-[#2B1B12] font-mono text-[11px] uppercase tracking-wider font-bold hover:bg-[#ffc926] transition-all cursor-pointer"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
