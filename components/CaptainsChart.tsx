"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  MapPin,
  Phone,
  Clock,
  CheckCircle,
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
    x: 140,
    y: 220,
    highlight: "Origin Port · Est. 2021",
    lat: "17.3115° N",
    lng: "78.4871° E",
    description:
      "The birthplace of Captain Kunafa. Where Saud bin Nasar Khulagi first fired the live copper hearths with authentic wood-fired sears and the legendary 48 dB crunch.",
  },
  {
    id: "malakpet",
    name: "Malakpet Haven",
    area: "South Hyderabad — Chanchalguda",
    code: "HYD-02",
    address: "Near Metro Pillar 1142, Chanchalguda Road, Malakpet",
    phone: "+91 90000 00002",
    hours: "12:00 PM – 01:00 AM",
    x: 310,
    y: 140,
    highlight: "Live Seating & Takeaway",
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
    x: 480,
    y: 240,
    highlight: "Late-Night Family Hub",
    lat: "17.4042° N",
    lng: "78.4116° E",
    description:
      "A bustling evening haven with multiple live burners in continuous service, famous for Dark Choco Lava Kunafa and fresh buffalo ashta cream.",
  },
  {
    id: "aerocity",
    name: "Aero City Anchor",
    area: "Airport Corridor — Shamshabad",
    code: "HYD-04",
    address: "Commercial Zone, Shamshabad International Airport Corridor",
    phone: "+91 90000 00004",
    hours: "10:00 AM – 02:30 AM",
    x: 650,
    y: 110,
    highlight: "Airport Corridor Terminal",
    lat: "17.2403° N",
    lng: "78.4294° E",
    description:
      "Open late till 2:30 AM for travelers. Special insulated thermal takeaway packaging guarantees your kunafa arrives crisp and warm.",
  },
  {
    id: "jubileehills",
    name: "Jubilee Hills Flagship",
    area: "HITEC Corridor — Road No. 36",
    code: "HYD-05",
    address: "Road No. 36, Near Peddamma Temple, Jubilee Hills, Hyderabad",
    phone: "+91 90000 00005",
    hours: "12:00 PM – 01:30 AM",
    x: 820,
    y: 180,
    highlight: "Artisanal Tasting Lounge",
    lat: "17.4325° N",
    lng: "78.4071° E",
    description:
      "The premier destination tasting room. Premium copper table service, full dessert menu including Lotus Biscoff Royale and custom celebration platters.",
  },
];

const ROUTE_PATH_D = "M 140 220 Q 225 160, 310 140 T 480 240 T 650 110 T 820 180";

export default function CaptainsChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const shipGroupRef = useRef<SVGGElement>(null);
  const hudProgressRef = useRef<HTMLSpanElement>(null);
  const hudPercentRef = useRef<HTMLSpanElement>(null);

  const [activePortIndex, setActivePortIndex] = useState(0);

  // High-performance RAF lerp animation loop
  useEffect(() => {
    let animFrame: number;
    let targetProgress = 0;
    let currentProgress = 0;
    let totalPathLength = 1000;
    let lastActiveIdx = -1;

    if (pathRef.current) {
      totalPathLength = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = `${totalPathLength}`;
      pathRef.current.style.strokeDashoffset = `${totalPathLength}`;
    }

    const updateScrollMetrics = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      targetProgress = Math.max(0, Math.min(1, scrolled / totalScrollable));
    };

    const renderLoop = () => {
      currentProgress += (targetProgress - currentProgress) * 0.14;

      if (Math.abs(targetProgress - currentProgress) < 0.0005) {
        currentProgress = targetProgress;
      }

      if (pathRef.current) {
        const offset = totalPathLength * (1 - currentProgress);
        pathRef.current.style.strokeDashoffset = `${offset}`;
      }

      if (pathRef.current && shipGroupRef.current) {
        const currentLen = currentProgress * totalPathLength;
        const pt = pathRef.current.getPointAtLength(currentLen);
        const nextPt = pathRef.current.getPointAtLength(
          Math.min(totalPathLength, currentLen + 2)
        );
        const angle =
          (Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x) * 180) / Math.PI;

        shipGroupRef.current.setAttribute(
          "transform",
          `translate(${pt.x}, ${pt.y}) rotate(${angle})`
        );
      }

      const percent = Math.round(currentProgress * 100);
      if (hudPercentRef.current) {
        hudPercentRef.current.textContent = `(${percent}%)`;
      }

      const currentIdx = Math.min(
        OUTLETS.length - 1,
        Math.floor(currentProgress * OUTLETS.length + 0.05)
      );

      if (currentIdx !== lastActiveIdx) {
        lastActiveIdx = currentIdx;
        setActivePortIndex(currentIdx);
        if (hudProgressRef.current) {
          hudProgressRef.current.textContent = OUTLETS[currentIdx].name.toUpperCase();
        }
      }

      animFrame = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("scroll", updateScrollMetrics, { passive: true });
    window.addEventListener("resize", updateScrollMetrics, { passive: true });
    updateScrollMetrics();
    animFrame = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", updateScrollMetrics);
      window.removeEventListener("resize", updateScrollMetrics);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const activeOutlet = OUTLETS[activePortIndex];

  const handleJumpToPort = useCallback((index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const totalScrollable = rect.height - window.innerHeight;
    const targetProgress = index / (OUTLETS.length - 1);

    const lenis = (window as unknown as { lenis?: { scrollTo: (y: number) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(scrollTop + targetProgress * totalScrollable);
    } else {
      window.scrollTo({
        top: scrollTop + targetProgress * totalScrollable,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      id="locations"
      className="relative w-full h-[320vh] sm:h-[350vh] bg-[#FFF8EC] border-t border-[#E7DCC9]"
    >
      {/* Sticky Viewport: Optimized for mobile viewports */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between p-3 sm:p-6 lg:p-8 overflow-hidden bg-[#FFF8EC]">
        {/* Ambient Chart Background */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(218,112,52,0.06)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
        <div className="absolute top-12 right-12 opacity-10 pointer-events-none hidden xl:block">
          <CompassRose size={260} />
        </div>

        {/* 1. Header & Mobile-Optimized Stepper */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-14 sm:pt-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-2 sm:mb-3">
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.2em] text-[#DA7034] bg-[#DA7034]/10 border border-[#DA7034]/25 px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-full mb-0.5 font-semibold">
                <Compass className="w-3 h-3 text-[#EFB80D]" />
                <span>THE 5 HYDERABAD PORTS</span>
              </div>
              <h2 className="font-display text-lg sm:text-3xl lg:text-4xl font-bold text-[#2B1B12] leading-tight">
                Barkas to <SwashAccent color="terracotta">Jubilee Hills</SwashAccent>
              </h2>
            </div>

            {/* Live Voyage HUD */}
            <div className="flex items-center gap-2 bg-white border border-[#E7DCC9] px-3 py-1 sm:px-4 sm:py-1.5 rounded-full shadow-sm text-[11px] sm:text-xs">
              <div className="w-2 h-2 rounded-full bg-[#DA7034] animate-ping shrink-0" />
              <span className="font-mono font-bold text-[#2B1B12] truncate max-w-[140px] sm:max-w-none">
                <span ref={hudProgressRef} className="text-[#DA7034] uppercase">{OUTLETS[0].name}</span>
              </span>
              <span ref={hudPercentRef} className="font-mono text-[10px] sm:text-[11px] text-[#7A6A5B]">
                (0%)
              </span>
            </div>
          </div>

          {/* Stepper Navigation */}
          <div className="grid grid-cols-5 gap-1 sm:gap-2.5 bg-white/90 border border-[#E7DCC9] p-1 sm:p-1.5 rounded-xl sm:rounded-2xl shadow-sm backdrop-blur-sm">
            {OUTLETS.map((outlet, idx) => {
              const isPassed = idx < activePortIndex;
              const isCurrent = idx === activePortIndex;

              return (
                <button
                  key={outlet.id}
                  type="button"
                  onClick={() => handleJumpToPort(idx)}
                  className={`flex items-center justify-center gap-1 py-1.5 sm:py-2 px-1 sm:px-2.5 rounded-lg sm:rounded-xl font-mono text-[9px] sm:text-xs transition-all cursor-pointer truncate ${
                    isCurrent
                      ? "bg-[#DA7034] text-white font-bold shadow-md scale-[1.02]"
                      : isPassed
                      ? "bg-[#EFB80D]/20 text-[#2B1B12] font-semibold"
                      : "bg-[#FFF8EC]/60 text-[#7A6A5B] hover:bg-[#FFF8EC]"
                  }`}
                >
                  <span className="sm:hidden">0{idx + 1}</span>
                  <span className="hidden sm:inline">0{idx + 1}. {outlet.name.split(" ")[0]}</span>
                  {isPassed && (
                    <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#DA7034] hidden sm:inline shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Main Center Section: SVG Chart + Spotlight Card */}
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 items-center my-auto">
          {/* Map Chart Container */}
          <div className="lg:col-span-7 bg-white border-2 border-[#E7DCC9] rounded-[18px] sm:rounded-[24px] p-3 sm:p-5 shadow-sm relative overflow-hidden flex flex-col justify-center">
            <div className="flex justify-between font-mono text-[8px] sm:text-[9px] text-[#B3A697] border-b border-[#E7DCC9]/40 pb-1 mb-1">
              <span>LAT: 17.24° – 17.43° N</span>
              <span>HYDERABAD MARITIME CHART</span>
              <span>LNG: 78.40° – 78.50° E</span>
            </div>

            <div className="relative w-full h-[150px] sm:h-[220px] lg:h-[270px] select-none">
              <svg
                viewBox="0 0 960 320"
                className="w-full h-full absolute inset-0"
              >
                {/* Guide Grid */}
                <line x1="40" y1="80" x2="920" y2="80" stroke="#E7DCC9" strokeOpacity="0.7" strokeDasharray="4 4" />
                <line x1="40" y1="160" x2="920" y2="160" stroke="#E7DCC9" strokeOpacity="0.7" strokeDasharray="4 4" />
                <line x1="40" y1="240" x2="920" y2="240" stroke="#E7DCC9" strokeOpacity="0.7" strokeDasharray="4 4" />

                {/* Ghost Path */}
                <path
                  d={ROUTE_PATH_D}
                  fill="none"
                  stroke="#E7DCC9"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                />

                {/* Active Animated Trail */}
                <path
                  ref={pathRef}
                  d={ROUTE_PATH_D}
                  fill="none"
                  stroke="#DA7034"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                {/* Sailing Vessel Group */}
                <g ref={shipGroupRef}>
                  <circle r="22" fill="#EFB80D" fillOpacity="0.25" className="animate-pulse" />
                  <circle r="14" fill="#2B1B12" stroke="#EFB80D" strokeWidth="2.5" />
                  <g transform="scale(0.7) translate(-12, -12)">
                    <path
                      d="M12 2L15 8H9L12 2ZM4 13L12 11L20 13L17 19H7L4 13Z"
                      fill="#EFB80D"
                    />
                  </g>
                </g>

                {/* 5 Port Markers */}
                {OUTLETS.map((outlet, idx) => {
                  const isCurrent = idx === activePortIndex;
                  const isPassed = idx < activePortIndex;

                  return (
                    <g
                      key={outlet.id}
                      onClick={() => handleJumpToPort(idx)}
                      className="cursor-pointer"
                    >
                      {isCurrent && (
                        <>
                          <circle cx={outlet.x} cy={outlet.y} r="26" fill="#DA7034" fillOpacity="0.18" className="animate-ping" />
                          <circle cx={outlet.x} cy={outlet.y} r="18" fill="#EFB80D" fillOpacity="0.35" />
                        </>
                      )}

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

                      <text
                        x={outlet.x}
                        y={outlet.y - 16}
                        textAnchor="middle"
                        fill={isCurrent ? "#DA7034" : "#2B1B12"}
                        fontFamily="var(--font-fraunces), serif"
                        fontWeight={isCurrent ? "800" : "600"}
                        fontSize="13"
                      >
                        {outlet.name}
                      </text>
                      <text
                        x={outlet.x}
                        y={outlet.y + 20}
                        textAnchor="middle"
                        fill={isCurrent ? "#DA7034" : "#7A6A5B"}
                        fontFamily="var(--font-ibm-mono), monospace"
                        fontSize="9"
                        fontWeight="600"
                      >
                        {outlet.code}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Active Port Spotlight Card */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeOutlet.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-white border-2 border-[#DA7034] rounded-[18px] sm:rounded-[24px] p-4 sm:p-6 shadow-lg relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] sm:text-xs font-bold text-white bg-[#DA7034] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase tracking-wider">
                    {activeOutlet.code} · STOP 0{activePortIndex + 1}/05
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    OPEN
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#2B1B12]">
                    {activeOutlet.name}
                  </h3>
                  <span className="font-sans text-[11px] sm:text-xs text-[#DA7034] font-semibold">
                    {activeOutlet.area}
                  </span>
                </div>

                <p className="font-sans text-xs text-[#7A6A5B] leading-relaxed my-2 line-clamp-2 sm:line-clamp-none">
                  {activeOutlet.description}
                </p>

                <div className="space-y-1.5 font-sans text-xs text-[#7A6A5B] border-t border-[#E7DCC9] pt-2.5 mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#DA7034] shrink-0" />
                    <span className="truncate text-[#2B1B12] font-medium text-[11px] sm:text-xs">
                      {activeOutlet.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] sm:text-[11px] font-mono">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#DA7034]" /> {activeOutlet.hours}</span>
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-[#DA7034]" /> {activeOutlet.phone}</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${activeOutlet.phone.replace(
                    /\D/g,
                    ""
                  )}?text=Hi%20Captain%20Kunafa%20${encodeURIComponent(
                    activeOutlet.name
                  )}!%20I'd%20like%20to%20order%20fresh%20kunafa.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white font-sans text-xs sm:text-sm font-bold py-2.5 sm:py-3.5 rounded-full transition-all hover:scale-[1.01] shadow-sm cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Order from {activeOutlet.name}</span>
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 3. Bottom Guide */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pb-1 flex items-center justify-between font-mono text-[9px] sm:text-[11px] text-[#7A6A5B]">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EFB80D]" />
            <span className="truncate">BARKAS ➔ MALAKPET ➔ TOLICHOWKI ➔ AERO CITY ➔ JUBILEE HILLS</span>
          </div>
          <div className="text-[#DA7034] font-semibold hidden sm:block">
            {activePortIndex === OUTLETS.length - 1
              ? "VOYAGE COMPLETED · SCROLL FOR PLATTERS MENU ↓"
              : "SCROLL TO COMPLETE JOURNEY TO JUBILEE HILLS"}
          </div>
        </div>
      </div>
    </div>
  );
}
