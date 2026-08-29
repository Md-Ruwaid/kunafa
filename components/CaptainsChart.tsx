"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Compass, Anchor, MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";
import SwashAccent from "@/components/SwashAccent";
import { CompassRose, ShipHelm } from "@/components/NauticalElements";

const outlets = [
  {
    name: "Barkas Port",
    area: "Old City Flagship",
    code: "HYD-01",
    address: "Main Road, Opp. Grand Mosque, Barkas, Hyderabad",
    phone: "+91 90000 00001",
    hours: "12:00 PM – 01:30 AM",
    x: 150,
    y: 200,
    highlight: "Original Hearth · Est. 2021",
    lat: "17.3115° N",
    lng: "78.4871° E",
  },
  {
    name: "Malakpet Outpost",
    area: "South Hyderabad",
    code: "HYD-02",
    address: "Near Metro Station, Chanchalguda Road, Malakpet",
    phone: "+91 90000 00002",
    hours: "12:00 PM – 01:00 AM",
    x: 320,
    y: 130,
    highlight: "Live Seating & Takeaway",
    lat: "17.3753° N",
    lng: "78.4983° E",
  },
  {
    name: "Tolichowki Haven",
    area: "West Hyderabad",
    code: "HYD-03",
    address: "Paramount Colony Road, Tolichowki, Hyderabad",
    phone: "+91 90000 00003",
    hours: "12:00 PM – 01:30 AM",
    x: 480,
    y: 220,
    highlight: "Late-Night Family Hub",
    lat: "17.4042° N",
    lng: "78.4116° E",
  },
  {
    name: "Aero City Anchor",
    area: "Airport Corridor",
    code: "HYD-04",
    address: "Commercial Zone, Shamshabad International Airport Corridor",
    phone: "+91 90000 00004",
    hours: "10:00 AM – 02:30 AM",
    x: 640,
    y: 110,
    highlight: "Extended Flight Hours",
    lat: "17.2403° N",
    lng: "78.4294° E",
  },
  {
    name: "Jubilee Hills Flagship",
    area: "HITEC & West Corridor",
    code: "HYD-05",
    address: "Road No. 36, Near Peddamma Temple, Jubilee Hills",
    phone: "+91 90000 00005",
    hours: "12:00 PM – 01:30 AM",
    x: 810,
    y: 170,
    highlight: "Artisanal Tasting Room",
    lat: "17.4325° N",
    lng: "78.4071° E",
  },
];

export default function CaptainsChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: chartRef,
    offset: ["start end", "end start"],
  });
  const pathLength = useTransform(scrollYProgress, [0.15, 0.75], [0, 1]);

  return (
    <section
      ref={chartRef}
      id="locations"
      className="py-28 px-4 sm:px-8 bg-[#FFF8EC] text-[#2B1B12] relative overflow-hidden border-t border-[#E7DCC9]"
    >
      {/* Background nautical coordinates & watermarks */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(239,184,13,0.08)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#DA7034] bg-[#DA7034]/10 border border-[#DA7034]/25 px-4 py-1.5 rounded-full mb-4">
            <Compass className="w-3.5 h-3.5 text-[#EFB80D]" />
            <span>THE 5 HYDERABAD OUTPOSTS</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#2B1B12] mb-4 leading-tight">
            Charting the <SwashAccent color="terracotta">Hyderabad Fleet</SwashAccent>
          </h2>

          <p className="font-sans text-base text-[#7A6A5B]">
            From our founding copper hearth in Barkas to Jubilee Hills — pinpoint your nearest port of call with live opening hours and instant WhatsApp ordering.
          </p>
        </div>

        {/* Interactive Nautical SVG Chart Container */}
        <div className="bg-white border-2 border-[#E7DCC9] rounded-[24px] p-6 sm:p-10 shadow-[0_10px_35px_rgba(43,27,18,0.06)] relative overflow-hidden mb-12">
          {/* Compass rose watermark */}
          <div className="absolute right-6 top-6 opacity-10 pointer-events-none hidden md:block">
            <CompassRose size={180} />
          </div>

          {/* SVG Map Path */}
          <div className="relative w-full h-[280px] sm:h-[320px] overflow-x-auto">
            <svg
              viewBox="0 0 960 280"
              className="w-[960px] h-[280px] absolute inset-0 select-none"
            >
              {/* Latitude grid lines */}
              <line x1="0" y1="70" x2="960" y2="70" stroke="#E7DCC9" strokeOpacity="0.8" strokeDasharray="4 4" />
              <line x1="0" y1="140" x2="960" y2="140" stroke="#E7DCC9" strokeOpacity="0.8" strokeDasharray="4 4" />
              <line x1="0" y1="210" x2="960" y2="210" stroke="#E7DCC9" strokeOpacity="0.8" strokeDasharray="4 4" />

              {/* Coordinates Labels */}
              <text x="20" y="65" fill="#B3A697" fontSize="8" fontFamily="var(--font-ibm-mono)">17.43° N</text>
              <text x="20" y="135" fill="#B3A697" fontSize="8" fontFamily="var(--font-ibm-mono)">17.37° N</text>
              <text x="20" y="205" fill="#B3A697" fontSize="8" fontFamily="var(--font-ibm-mono)">17.24° N</text>

              {/* Background Ghost Path */}
              <path
                d="M 150 200 Q 235 155, 320 130 T 480 220 T 640 110 T 810 170"
                fill="none"
                stroke="#E7DCC9"
                strokeOpacity="0.9"
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />

              {/* Animated Gold/Terracotta Line */}
              <motion.path
                d="M 150 200 Q 235 155, 320 130 T 480 220 T 640 110 T 810 170"
                fill="none"
                stroke="#DA7034"
                strokeWidth="4"
                strokeLinecap="round"
                style={{ pathLength }}
              />

              {/* Port Markers */}
              {outlets.map((port, idx) => (
                <g key={idx}>
                  <circle cx={port.x} cy={port.y} r="18" fill="#EFB80D" fillOpacity="0.15" />
                  <circle cx={port.x} cy={port.y} r="7" fill="#DA7034" />
                  <circle cx={port.x} cy={port.y} r="2.5" fill="#FFF8EC" />

                  {/* Text labels */}
                  <text
                    x={port.x}
                    y={port.y - 24}
                    textAnchor="middle"
                    fill="#2B1B12"
                    fontFamily="var(--font-fraunces), serif"
                    fontWeight="700"
                    fontSize="13"
                  >
                    {port.name}
                  </text>
                  <text
                    x={port.x}
                    y={port.y + 26}
                    textAnchor="middle"
                    fill="#DA7034"
                    fontFamily="var(--font-ibm-mono), monospace"
                    fontSize="8.5"
                    fontWeight="600"
                    letterSpacing="0.1em"
                  >
                    {port.code} · {port.lat}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="pt-4 border-t border-[#E7DCC9] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#7A6A5B]">
            <div className="flex items-center gap-2">
              <ShipHelm size={16} className="text-[#DA7034]" />
              <span>NAVIGATION STATUS: ALL 5 COPPER HEARTHS ACTIVE IN HYDERABAD</span>
            </div>
            <span className="text-[#DA7034] font-semibold">100% ARTISANAL WOOD &amp; COPPER SEAR</span>
          </div>
        </div>

        {/* 5 Detailed Location Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {outlets.map((outlet, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E7DCC9] rounded-[20px] p-6 hover:border-[#DA7034]/50 hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-[#DA7034] tracking-wider uppercase">
                      {outlet.code} · {outlet.lat}
                    </span>
                    <h3 className="font-display font-bold text-xl text-[#2B1B12] group-hover:text-[#DA7034] transition-colors mt-0.5">
                      {outlet.name}
                    </h3>
                    <div className="font-sans text-xs text-[#7A6A5B] font-medium">
                      {outlet.area}
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    OPEN
                  </span>
                </div>

                <div className="font-mono text-[11px] text-[#EFB80D] bg-[#2B1B12] px-3 py-1 rounded-lg inline-block mb-4 font-medium">
                  {outlet.highlight}
                </div>

                <div className="space-y-2.5 font-sans text-xs text-[#7A6A5B] border-t border-[#E7DCC9] pt-4">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#DA7034] shrink-0 mt-0.5" />
                    <span className="leading-snug">{outlet.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#DA7034] shrink-0" />
                    <span className="font-mono text-[11px]">{outlet.hours}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#DA7034] shrink-0" />
                    <span className="font-mono text-[11px]">{outlet.phone}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#E7DCC9] flex items-center gap-2">
                <a
                  href={`https://wa.me/${outlet.phone.replace(/\D/g, "")}?text=Hi%20Captain%20Kunafa%20${encodeURIComponent(outlet.name)}!%20I'd%20like%20to%20place%20an%20order%20for%20fresh%20kunafa.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white font-sans text-xs font-semibold py-3 rounded-full transition-all hover:scale-[1.02] shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Order at {outlet.name.split(" ")[0]}</span>
                </a>
              </div>
            </div>
          ))}

          {/* 6th Card: Expansion / Franchise Callout */}
          <div className="bg-[#2B1B12] border-2 border-[#EFB80D]/40 rounded-[20px] p-6 flex flex-col justify-between text-[#FFF8EC] relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#EFB80D]/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <span className="font-mono text-[10px] font-bold text-[#EFB80D] tracking-widest uppercase">
                EXPANSION CALL
              </span>
              <h3 className="font-display font-bold text-2xl text-white mt-1 mb-2">
                Launch an Outpost in Your Locality
              </h3>
              <p className="font-sans text-xs text-[#B3A697] leading-relaxed mb-4">
                We are expanding across Secunderabad, Gachibowli, Kondapur, and beyond Telangana. Complete setup, equipment, and master recipe onboarding provided.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const el = document.querySelector("#franchise");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#EFB80D] hover:bg-[#ffc926] text-[#2B1B12] font-sans font-bold text-xs py-3.5 rounded-full transition-all hover:scale-[1.02] cursor-pointer shadow-md"
            >
              <span>Explore Franchise Program</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
