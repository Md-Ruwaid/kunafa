"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Compass,
  Anchor,
  MapPin,
  Phone,
  Clock,
  Navigation,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import SwashAccent from "@/components/SwashAccent";
import { CompassRose, ShipHelm } from "@/components/NauticalElements";

interface Outlet {
  id: string;
  name: string;
  area: string;
  code: string;
  address: string;
  phone: string;
  hours: string;
  x: number;
  y: number;
  highlight: string;
  lat: string;
  lng: string;
  description: string;
}

const OUTLETS: Outlet[] = [
  {
    id: "barkas",
    name: "Barkas Port",
    area: "Old City — Central Hearth & HQ",
    code: "HYD-01",
    address: "Main Road, Opp. Grand Mosque, Barkas, Hyderabad",
    phone: "+91 90000 00001",
    hours: "12:00 PM – 01:30 AM",
    x: 150,
    y: 220,
    highlight: "Origin Port · Est. 2021",
    lat: "17.3115° N",
    lng: "78.4871° E",
    description:
      "The birthplace of Captain Kunafa. Where Saud bin Nasar Khulagi first fired the live copper hearths. Authentic wood-fired sears and the legendary 48 dB acoustic crunch.",
  },
  {
    id: "malakpet",
    name: "Malakpet Haven",
    area: "South Hyderabad — Chanchalguda",
    code: "HYD-02",
    address: "Near Metro Pillar 1142, Chanchalguda Road, Malakpet",
    phone: "+91 90000 00002",
    hours: "12:00 PM – 01:00 AM",
    x: 320,
    y: 140,
    highlight: "Live Seating & Takeaway Hub",
    lat: "17.3753° N",
    lng: "78.4983° E",
    description:
      "Rapid-service copper counter right next to the Metro corridor. Serving piping hot Pistachio Crown and Classic Akawi trays to south Hyderabad families.",
  },
  {
    id: "tolichowki",
    name: "Tolichowki Haven",
    area: "West Hyderabad — Paramount Colony",
    code: "HYD-03",
    address: "Paramount Colony Main Road, Tolichowki, Hyderabad",
    phone: "+91 90000 00003",
    hours: "12:00 PM – 01:30 AM",
    x: 490,
    y: 240,
    highlight: "Late-Night Family Gathering Hub",
    lat: "17.4042° N",
    lng: "78.4116° E",
    description:
      "A bustling evening haven. Multiple live burners in continuous service, famous for the Dark Choco Lava Kunafa and fresh buffalo ashta cream.",
  },
  {
    id: "aerocity",
    name: "Aero City Anchor",
    area: "Airport Corridor — Shamshabad",
    code: "HYD-04",
    address: "Commercial Zone, Shamshabad International Airport Corridor",
    phone: "+91 90000 00004",
    hours: "10:00 AM – 02:30 AM",
    x: 660,
    y: 110,
    highlight: "Late-Night Flight Terminal",
    lat: "17.2403° N",
    lng: "78.4294° E",
    description:
      "Open until 2:30 AM for travelers. Special insulated thermal takeaway packaging guarantees your kunafa arrives crisp and warm anywhere across the city.",
  },
  {
    id: "jubileehills",
    name: "Jubilee Hills Flagship",
    area: "HITEC Corridor — Road No. 36",
    code: "HYD-05",
    address: "Road No. 36, Near Peddamma Temple, Jubilee Hills, Hyderabad",
    phone: "+91 90000 00005",
    hours: "12:00 PM – 01:30 AM",
    x: 830,
    y: 180,
    highlight: "Artisanal Tasting Room & Lounge",
    lat: "17.4325° N",
    lng: "78.4071° E",
    description:
      "The premier destination tasting room. Premium copper table service, full dessert menu including Lotus Biscoff Royale and custom celebration platters.",
  },
];

// SVG Route Path coordinates
const ROUTE_PATH_D = "M 150 220 Q 235 160, 320 140 T 490 240 T 660 110 T 830 180";

export default function CaptainsChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [shipPos, setShipPos] = useState({ x: 150, y: 220, angle: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  // Framer motion scroll progress over the sticky 350vh track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate live ship coordinate and active port index along the path
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (p) => {
      const clampedP = Math.max(0, Math.min(1, p));
      setScrollProgress(clampedP);

      // Determine active port based on progress thresholds
      // 0.00 - 0.20 => Barkas (0)
      // 0.20 - 0.40 => Malakpet (1)
      // 0.40 - 0.60 => Tolichowki (2)
      // 0.60 - 0.80 => Aero City (3)
      // 0.80 - 1.00 => Jubilee Hills (4)
      const currentIdx = Math.min(
        OUTLETS.length - 1,
        Math.floor(clampedP * OUTLETS.length)
      );
      setActiveIndex(currentIdx);

      // Interpolate ship (x, y) along the exact SVG path
      const pathEl = pathRef.current;
      if (pathEl) {
        const totalLen = pathEl.getTotalLength();
        const currentLen = clampedP * totalLen;
        const pt = pathEl.getPointAtLength(currentLen);

        // Calculate heading angle
        const nextPt = pathEl.getPointAtLength(
          Math.min(totalLen, currentLen + 2)
        );
        const angle =
          (Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x) * 180) / Math.PI;

        setShipPos({ x: pt.x, y: pt.y, angle });
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const activeOutlet = OUTLETS[activeIndex];

  // Helper to jump scroll when a user clicks on a port step
  const handleJumpToPort = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const totalScrollable = rect.height - window.innerHeight;
    const targetProgress = index / (OUTLETS.length - 1);
    window.scrollTo({
      top: scrollTop + targetProgress * totalScrollable,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={containerRef}
      id="locations"
      className="relative w-full h-[350vh] bg-[#FFF8EC] border-t border-[#E7DCC9]"
    >
      {/* Sticky Viewport Container: Pins firmly to screen while user scrolls through the 5 ports */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between p-4 sm:p-6 lg:p-8 overflow-hidden bg-[#FFF8EC]">
        {/* Subtle nautical background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(218,112,52,0.06)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-12 right-12 opacity-10 pointer-events-none hidden xl:block">
          <CompassRose size={260} />
        </div>

        {/* 1. Top Bar: Header & Voyage Stepper */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-16 sm:pt-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-[#DA7034] bg-[#DA7034]/10 border border-[#DA7034]/25 px-3.5 py-1 rounded-full mb-1.5 font-semibold">
                <Compass className="w-3.5 h-3.5 text-[#EFB80D]" />
                <span>VOYAGE OF THE 5 HYDERABAD PORTS</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#2B1B12] leading-tight">
                From Barkas to <SwashAccent color="terracotta">Jubilee Hills</SwashAccent>
              </h2>
            </div>

            {/* Live Voyage Status Badge */}
            <div className="flex items-center gap-3 bg-white border border-[#E7DCC9] px-4 py-2 rounded-full shadow-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-[#DA7034] animate-ping" />
              <span className="font-mono text-xs font-bold text-[#2B1B12]">
                PORT 0{activeIndex + 1} / 05:{" "}
                <span className="text-[#DA7034] uppercase">
                  {activeOutlet.name}
                </span>
              </span>
              <span className="font-mono text-[11px] text-[#7A6A5B]">
                ({Math.round(scrollProgress * 100)}% SAILED)
              </span>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-3 bg-white/80 border border-[#E7DCC9] p-1.5 rounded-2xl shadow-sm backdrop-blur-sm">
            {OUTLETS.map((outlet, idx) => {
              const isPassed = idx < activeIndex;
              const isCurrent = idx === activeIndex;

              return (
                <button
                  key={outlet.id}
                  type="button"
                  onClick={() => handleJumpToPort(idx)}
                  className={`flex items-center justify-center gap-1.5 py-2 px-1 sm:px-3 rounded-xl font-mono text-[10px] sm:text-xs transition-all cursor-pointer truncate ${
                    isCurrent
                      ? "bg-[#DA7034] text-white font-bold shadow-md scale-[1.02]"
                      : isPassed
                      ? "bg-[#EFB80D]/20 text-[#2B1B12] font-semibold"
                      : "bg-[#FFF8EC]/60 text-[#7A6A5B] hover:bg-[#FFF8EC]"
                  }`}
                >
                  <span className="hidden sm:inline">0{idx + 1}.</span>
                  <span className="truncate">{outlet.name.split(" ")[0]}</span>
                  {isPassed && (
                    <CheckCircle className="w-3 h-3 text-[#DA7034] hidden md:inline shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Main Center Grid: Interactive Animated Map + Active Port Spotlight Card */}
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto">
          {/* Left / Center Map Canvas (7 cols on desktop) */}
          <div className="lg:col-span-7 bg-white border-2 border-[#E7DCC9] rounded-[24px] p-4 sm:p-6 shadow-md relative overflow-hidden flex flex-col justify-center">
            {/* Latitude Grid Labels */}
            <div className="flex justify-between font-mono text-[9px] text-[#B3A697] border-b border-[#E7DCC9]/40 pb-2 mb-2">
              <span>LAT: 17.24° N – 17.43° N</span>
              <span>HYDERABAD MARITIME CHART</span>
              <span>LNG: 78.40° E – 78.50° E</span>
            </div>

            {/* SVG Chart Area */}
            <div className="relative w-full h-[220px] sm:h-[280px] select-none">
              <svg
                viewBox="0 0 960 320"
                className="w-full h-full absolute inset-0"
              >
                {/* Horizontal Guide Lines */}
                <line x1="40" y1="80" x2="920" y2="80" stroke="#E7DCC9" strokeOpacity="0.7" strokeDasharray="4 4" />
                <line x1="40" y1="160" x2="920" y2="160" stroke="#E7DCC9" strokeOpacity="0.7" strokeDasharray="4 4" />
                <line x1="40" y1="240" x2="920" y2="240" stroke="#E7DCC9" strokeOpacity="0.7" strokeDasharray="4 4" />

                {/* Background Ghost Path */}
                <path
                  d={ROUTE_PATH_D}
                  fill="none"
                  stroke="#E7DCC9"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                />

                {/* Glowing Animated Voyage Path drawn in real-time by scroll */}
                <path
                  ref={pathRef}
                  d={ROUTE_PATH_D}
                  fill="none"
                  stroke="#DA7034"
                  strokeWidth="5"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: pathRef.current
                      ? pathRef.current.getTotalLength()
                      : 1000,
                    strokeDashoffset: pathRef.current
                      ? pathRef.current.getTotalLength() * (1 - scrollProgress)
                      : 1000,
                    transition: "stroke-dashoffset 0.05s linear",
                  }}
                />

                {/* Sailing Ship / Helm Vessel moving along the line */}
                <g
                  transform={`translate(${shipPos.x}, ${shipPos.y})`}
                  style={{
                    transition: "transform 0.05s linear",
                  }}
                >
                  {/* Glowing halo around ship */}
                  <circle r="22" fill="#EFB80D" fillOpacity="0.2" className="animate-pulse" />
                  <circle r="14" fill="#2B1B12" stroke="#EFB80D" strokeWidth="2.5" />
                  {/* Ship icon oriented towards heading */}
                  <g transform={`rotate(${shipPos.angle}) scale(0.7) translate(-12, -12)`}>
                    <path
                      d="M12 2L15 8H9L12 2ZM4 13L12 11L20 13L17 19H7L4 13Z"
                      fill="#EFB80D"
                    />
                  </g>
                </g>

                {/* 5 Port Anchor Nodes */}
                {OUTLETS.map((outlet, idx) => {
                  const isPassed = idx < activeIndex;
                  const isCurrent = idx === activeIndex;

                  return (
                    <g
                      key={outlet.id}
                      onClick={() => handleJumpToPort(idx)}
                      className="cursor-pointer"
                    >
                      {/* Concentric Pulse on Active Port */}
                      {isCurrent && (
                        <>
                          <circle cx={outlet.x} cy={outlet.y} r="26" fill="#DA7034" fillOpacity="0.18" className="animate-ping" />
                          <circle cx={outlet.x} cy={outlet.y} r="18" fill="#EFB80D" fillOpacity="0.3" />
                        </>
                      )}

                      {/* Base Marker */}
                      <circle
                        cx={outlet.x}
                        cy={outlet.y}
                        r={isCurrent ? 10 : 7}
                        fill={isCurrent ? "#DA7034" : isPassed ? "#EFB80D" : "#E7DCC9"}
                        stroke="#2B1B12"
                        strokeWidth="2"
                      />
                      <circle
                        cx={outlet.x}
                        cy={outlet.y}
                        r={isCurrent ? 4 : 2}
                        fill="#FFF8EC"
                      />

                      {/* Port Label */}
                      <text
                        x={outlet.x}
                        y={outlet.y - 18}
                        textAnchor="middle"
                        fill={isCurrent ? "#DA7034" : "#2B1B12"}
                        fontFamily="var(--font-fraunces), serif"
                        fontWeight={isCurrent ? "800" : "600"}
                        fontSize={isCurrent ? "14" : "12"}
                      >
                        {outlet.name}
                      </text>
                      <text
                        x={outlet.x}
                        y={outlet.y + 22}
                        textAnchor="middle"
                        fill={isCurrent ? "#DA7034" : "#7A6A5B"}
                        fontFamily="var(--font-ibm-mono), monospace"
                        fontSize="9"
                        fontWeight="600"
                        letterSpacing="0.08em"
                      >
                        {outlet.code}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Bottom Chart Status Strip */}
            <div className="pt-2 border-t border-[#E7DCC9]/60 flex items-center justify-between font-mono text-[10px] text-[#7A6A5B]">
              <div className="flex items-center gap-1.5">
                <ShipHelm size={14} className="text-[#DA7034]" />
                <span>SCROLL DOWN TO ADVANCE SHIP ACROSS OUTPOSTS</span>
              </div>
              <span className="text-[#DA7034] font-bold">
                {scrollProgress >= 0.95
                  ? "✓ ARRIVED AT JUBILEE HILLS"
                  : `➔ NEXT: ${OUTLETS[Math.min(OUTLETS.length - 1, activeIndex + 1)].name}`}
              </span>
            </div>
          </div>

          {/* Right Spotlight Card for Currently Visited Port (5 cols on desktop) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeOutlet.id}
                initial={{ opacity: 0, y: 15, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="bg-white border-2 border-[#DA7034] rounded-[24px] p-6 sm:p-7 shadow-xl relative overflow-hidden"
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-white bg-[#DA7034] px-3 py-1 rounded-full uppercase tracking-wider">
                    {activeOutlet.code} · STOP 0{activeIndex + 1} OF 05
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE SERVICE OPEN
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#2B1B12] mb-1">
                  {activeOutlet.name}
                </h3>
                <div className="font-sans text-xs text-[#DA7034] font-semibold mb-3">
                  {activeOutlet.area}
                </div>

                {/* Highlight Badge */}
                <div className="inline-block bg-[#2B1B12] text-[#EFB80D] font-mono text-[11px] px-3.5 py-1.5 rounded-lg font-medium mb-4">
                  {activeOutlet.highlight}
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#7A6A5B] leading-relaxed mb-5">
                  {activeOutlet.description}
                </p>

                {/* Address & Hours Detail */}
                <div className="space-y-2.5 font-sans text-xs text-[#7A6A5B] border-t border-[#E7DCC9] pt-4 mb-6">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#DA7034] shrink-0 mt-0.5" />
                    <span className="leading-snug text-[#2B1B12] font-medium">
                      {activeOutlet.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#DA7034] shrink-0" />
                    <span className="font-mono text-[11px]">
                      {activeOutlet.hours}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#DA7034] shrink-0" />
                    <span className="font-mono text-[11px]">
                      {activeOutlet.phone}
                    </span>
                  </div>
                </div>

                {/* Direct WhatsApp Action for this specific branch */}
                <a
                  href={`https://wa.me/${activeOutlet.phone.replace(
                    /\D/g,
                    ""
                  )}?text=Hi%20Captain%20Kunafa%20${encodeURIComponent(
                    activeOutlet.name
                  )}!%20I'd%20like%20to%20order%20fresh%20kunafa.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20b858] text-white font-sans text-xs sm:text-sm font-bold py-3.5 rounded-full transition-all hover:scale-[1.01] shadow-md cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Order Directly from {activeOutlet.name}</span>
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 3. Bottom Guide / Scroll Completion Indicator */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pb-2 flex items-center justify-between font-mono text-[11px] text-[#7A6A5B]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EFB80D]" />
            <span>PORT VOYAGE: BARKAS ➔ MALAKPET ➔ TOLICHOWKI ➔ AERO CITY ➔ JUBILEE HILLS</span>
          </div>
          <div className="text-[#DA7034] font-semibold hidden sm:block">
            {scrollProgress >= 0.98
              ? "VOYAGE COMPLETED · SCROLL FOR PLATTERS MENU ↓"
              : "SCROLL TO COMPLETE JOURNEY TO JUBILEE HILLS"}
          </div>
        </div>
      </div>
    </div>
  );
}
