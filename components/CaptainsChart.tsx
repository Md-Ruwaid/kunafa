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

interface Branch {
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

const BRANCHES: Branch[] = [
  {
    id: "barkas",
    name: "Barkas Branch",
    area: "Old City — Central Hearth & HQ",
    code: "HYD-01",
    address: "Main Road, Opp. Grand Mosque, Barkas, Hyderabad",
    phone: "+91 90000 00001",
    hours: "12:00 PM – 01:30 AM",
    x: 140,
    y: 220,
    highlight: "Origin Flagship · Est. 2021",
    lat: "17.3115° N",
    lng: "78.4871° E",
    description:
      "The founding hearth of Captain Kunafa. Where Saud bin Nasar Khulagi first introduced live copper roasting in Hyderabad. Famous for the original 48 dB acoustic crunch.",
  },
  {
    id: "malakpet",
    name: "Malakpet Branch",
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
      "Rapid-service live counter right on the Chanchalguda metro corridor. Serving sizzling Pistachio Crown and Classic Akawi platters fresh to south Hyderabad families.",
  },
  {
    id: "tolichowki",
    name: "Tolichowki Branch",
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
      "A bustling late-night dessert haven with multiple copper burners firing simultaneously. Renowned for Dark Choco Lava Kunafa and fresh buffalo ashta cream.",
  },
  {
    id: "aerocity",
    name: "Aero City Branch",
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
      "Open until 2:30 AM for travelers. Special insulated thermal takeaway packaging guarantees your kunafa arrives crisp, fragrant, and steaming warm.",
  },
  {
    id: "jubileehills",
    name: "Jubilee Hills Branch",
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
      "The premier destination tasting room. Premium table service, full dessert menu including Lotus Biscoff Royale and celebration sharing boxes.",
  },
];

// Continuous smooth curve through all branch centers
const ROUTE_PATH_D = "M 140 220 C 210 160, 240 140, 310 140 C 380 140, 410 240, 480 240 C 550 240, 580 110, 650 110 C 720 110, 750 180, 820 180";

export default function CaptainsChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const shipGroupRef = useRef<SVGGElement>(null);
  const hudProgressRef = useRef<HTMLSpanElement>(null);
  const hudPercentRef = useRef<HTMLSpanElement>(null);

  const [activeBranchIndex, setActiveBranchIndex] = useState(0);

  // High-precision RAF loop
  useEffect(() => {
    let animFrame: number;
    let targetProgress = 0;
    let currentProgress = 0;
    let totalPathLength = 1000;
    let lastBranchIdx = -1;

    const updatePathLength = () => {
      if (pathRef.current) {
        totalPathLength = pathRef.current.getTotalLength() || 1000;
        pathRef.current.style.strokeDasharray = `${totalPathLength}`;
        pathRef.current.style.strokeDashoffset = `${totalPathLength * (1 - currentProgress)}`;
      }
    };

    updatePathLength();

    const updateScrollMetrics = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      targetProgress = Math.max(0, Math.min(1, scrolled / totalScrollable));
    };

    const renderLoop = () => {
      currentProgress += (targetProgress - currentProgress) * 0.12;

      if (Math.abs(targetProgress - currentProgress) < 0.0002) {
        currentProgress = targetProgress;
      }

      // Update Path stroke-dashoffset in golden glow
      if (pathRef.current) {
        const offset = totalPathLength * (1 - currentProgress);
        pathRef.current.style.strokeDashoffset = `${offset}`;
      }

      // Update Ship Coordinates along spline
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

      // Branch activation thresholds
      let currentIdx = 0;
      if (currentProgress < 0.125) currentIdx = 0;
      else if (currentProgress < 0.375) currentIdx = 1;
      else if (currentProgress < 0.625) currentIdx = 2;
      else if (currentProgress < 0.875) currentIdx = 3;
      else currentIdx = 4;

      if (currentIdx !== lastBranchIdx) {
        lastBranchIdx = currentIdx;
        setActiveBranchIndex(currentIdx);
        if (hudProgressRef.current) {
          hudProgressRef.current.textContent = BRANCHES[currentIdx].name.toUpperCase();
        }
      }

      animFrame = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("scroll", updateScrollMetrics, { passive: true });
    window.addEventListener("resize", () => {
      updatePathLength();
      updateScrollMetrics();
    });

    updateScrollMetrics();
    animFrame = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", updateScrollMetrics);
      window.removeEventListener("resize", updateScrollMetrics);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const activeBranch = BRANCHES[activeBranchIndex];

  const handleJumpToBranch = useCallback((index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const totalScrollable = rect.height - window.innerHeight;
    const targetProgress = index / (BRANCHES.length - 1);

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
      className="relative w-full h-[320vh] sm:h-[350vh] bg-[#050505] border-t border-[#EFB80D]/20"
    >
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between p-3 sm:p-6 lg:p-8 overflow-hidden bg-[#050505]">
        {/* Ambient Chart Background */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(239,184,13,0.06)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
        <div className="absolute top-12 right-12 opacity-10 pointer-events-none hidden xl:block text-[#EFB80D]">
          <CompassRose size={260} />
        </div>

        {/* 1. Header & Golden Stepper Tabs */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-14 sm:pt-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-2 sm:mb-3">
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.2em] text-[#EFB80D] bg-[#EFB80D]/10 border border-[#EFB80D]/30 px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-full mb-0.5 font-semibold">
                <Compass className="w-3 h-3 text-[#EFB80D]" />
                <span>VOYAGE OF THE HYDERABAD BRANCHES</span>
              </div>
              <h2 className="font-display text-lg sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                From Barkas to <SwashAccent color="gold">Jubilee Hills</SwashAccent>
              </h2>
            </div>

            {/* Live Voyage HUD in Gold */}
            <div className="flex items-center gap-2 bg-[#0d0d0d] border border-[#EFB80D]/40 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full shadow-[0_0_15px_rgba(239,184,13,0.15)] text-[11px] sm:text-xs">
              <div className="w-2 h-2 rounded-full bg-[#EFB80D] animate-ping shrink-0" />
              <span className="font-mono font-bold text-white truncate max-w-[140px] sm:max-w-none">
                <span ref={hudProgressRef} className="text-[#EFB80D] uppercase">{BRANCHES[0].name}</span>
              </span>
              <span ref={hudPercentRef} className="font-mono text-[10px] sm:text-[11px] text-[#EFB80D]/70">
                (0%)
              </span>
            </div>
          </div>

          {/* Stepper Navigation Tabs in #EFB80D Gold */}
          <div className="grid grid-cols-5 gap-1 sm:gap-2.5 bg-[#0d0d0d]/90 border border-[#EFB80D]/30 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl shadow-lg backdrop-blur-md">
            {BRANCHES.map((branch, idx) => {
              const isPassed = idx < activeBranchIndex;
              const isCurrent = idx === activeBranchIndex;

              return (
                <button
                  key={branch.id}
                  type="button"
                  onClick={() => handleJumpToBranch(idx)}
                  className={`flex items-center justify-center gap-1 py-1.5 sm:py-2 px-1 sm:px-2.5 rounded-lg sm:rounded-xl font-mono text-[9px] sm:text-xs transition-all cursor-pointer truncate ${
                    isCurrent
                      ? "bg-[#EFB80D] text-[#050505] font-bold shadow-[0_0_15px_rgba(239,184,13,0.4)] scale-[1.02]"
                      : isPassed
                      ? "bg-[#EFB80D]/20 text-[#EFB80D] font-semibold border border-[#EFB80D]/30"
                      : "bg-[#151515] text-white/60 hover:text-white hover:bg-[#1a1a1a]"
                  }`}
                >
                  <span className="sm:hidden">0{idx + 1}</span>
                  <span className="hidden sm:inline">0{idx + 1}. {branch.name.split(" ")[0]}</span>
                  {isPassed && (
                    <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#EFB80D] hidden sm:inline shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Main Center Section: SVG Chart + Spotlight Card */}
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 items-center my-auto">
          {/* Map Chart Container */}
          <div className="lg:col-span-7 bg-[#0d0d0d] border-2 border-[#EFB80D]/30 rounded-[18px] sm:rounded-[24px] p-3 sm:p-5 shadow-[0_10px_40px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col justify-center">
            <div className="flex justify-between font-mono text-[8px] sm:text-[9px] text-[#EFB80D]/60 border-b border-[#EFB80D]/15 pb-1 mb-1">
              <span>LAT: 17.24° – 17.43° N</span>
              <span className="text-[#EFB80D]">HYDERABAD MARITIME CHART</span>
              <span>LNG: 78.40° – 78.50° E</span>
            </div>

            <div className="relative w-full h-[150px] sm:h-[220px] lg:h-[270px] select-none">
              <svg
                viewBox="0 0 960 320"
                className="w-full h-full absolute inset-0"
              >
                {/* Guide Grid */}
                <line x1="40" y1="80" x2="920" y2="80" stroke="#EFB80D" strokeOpacity="0.1" strokeDasharray="4 4" />
                <line x1="40" y1="160" x2="920" y2="160" stroke="#EFB80D" strokeOpacity="0.1" strokeDasharray="4 4" />
                <line x1="40" y1="240" x2="920" y2="240" stroke="#EFB80D" strokeOpacity="0.1" strokeDasharray="4 4" />

                {/* Ghost Path */}
                <path
                  d={ROUTE_PATH_D}
                  fill="none"
                  stroke="#333333"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                />

                {/* Active Animated Trail in Glowing Captain Gold */}
                <path
                  ref={pathRef}
                  d={ROUTE_PATH_D}
                  fill="none"
                  stroke="#EFB80D"
                  strokeWidth="5"
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_8px_rgba(239,184,13,0.6)]"
                />

                {/* Sailing Vessel Group */}
                <g ref={shipGroupRef}>
                  <circle r="22" fill="#EFB80D" fillOpacity="0.2" className="animate-pulse" />
                  <circle r="14" fill="#050505" stroke="#EFB80D" strokeWidth="2.5" />
                  <g transform="scale(0.7) translate(-12, -12)">
                    <path
                      d="M12 2L15 8H9L12 2ZM4 13L12 11L20 13L17 19H7L4 13Z"
                      fill="#EFB80D"
                    />
                  </g>
                </g>

                {/* Branch Markers */}
                {BRANCHES.map((branch, idx) => {
                  const isCurrent = idx === activeBranchIndex;
                  const isPassed = idx < activeBranchIndex;

                  return (
                    <g
                      key={branch.id}
                      onClick={() => handleJumpToBranch(idx)}
                      className="cursor-pointer"
                    >
                      {isCurrent && (
                        <>
                          <circle cx={branch.x} cy={branch.y} r="26" fill="#EFB80D" fillOpacity="0.25" className="animate-ping" />
                          <circle cx={branch.x} cy={branch.y} r="18" fill="#EFB80D" fillOpacity="0.45" />
                        </>
                      )}

                      <circle
                        cx={branch.x}
                        cy={branch.y}
                        r={isCurrent ? 10 : 7}
                        fill={isCurrent ? "#EFB80D" : isPassed ? "#EFB80D" : "#333333"}
                        stroke="#050505"
                        strokeWidth="2"
                      />
                      <circle
                        cx={branch.x}
                        cy={branch.y}
                        r={isCurrent ? 4 : 2}
                        fill={isCurrent ? "#050505" : "#EFB80D"}
                      />

                      <text
                        x={branch.x}
                        y={branch.y - 16}
                        textAnchor="middle"
                        fill={isCurrent ? "#EFB80D" : "#FFFFFF"}
                        fontFamily="var(--font-fraunces), serif"
                        fontWeight={isCurrent ? "800" : "600"}
                        fontSize="13"
                      >
                        {branch.name}
                      </text>
                      <text
                        x={branch.x}
                        y={branch.y + 20}
                        textAnchor="middle"
                        fill={isCurrent ? "#EFB80D" : "#888888"}
                        fontFamily="var(--font-ibm-mono), monospace"
                        fontSize="9"
                        fontWeight="600"
                      >
                        {branch.code}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Active Branch Spotlight Card in Black & Gold */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBranch.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-[#0d0d0d] border-2 border-[#EFB80D] rounded-[18px] sm:rounded-[24px] p-4 sm:p-6 shadow-[0_10px_35px_rgba(239,184,13,0.15)] relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] sm:text-xs font-bold text-[#050505] bg-[#EFB80D] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {activeBranch.code} · STOP 0{activeBranchIndex + 1}/05
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE SERVICE OPEN
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                    {activeBranch.name}
                  </h3>
                  <span className="font-sans text-[11px] sm:text-xs text-[#EFB80D] font-semibold">
                    {activeBranch.area}
                  </span>
                </div>

                <p className="font-sans text-xs text-white/70 leading-relaxed my-2 line-clamp-2 sm:line-clamp-none">
                  {activeBranch.description}
                </p>

                <div className="space-y-1.5 font-sans text-xs text-white/70 border-t border-[#EFB80D]/20 pt-2.5 mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#EFB80D] shrink-0" />
                    <span className="truncate text-white font-medium text-[11px] sm:text-xs">
                      {activeBranch.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] sm:text-[11px] font-mono">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#EFB80D]" /> {activeBranch.hours}</span>
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-[#EFB80D]" /> {activeBranch.phone}</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${activeBranch.phone.replace(
                    /\D/g,
                    ""
                  )}?text=Hi%20Captain%20Kunafa%20${encodeURIComponent(
                    activeBranch.name
                  )}!%20I'd%20like%20to%20order%20fresh%20kunafa.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#EFB80D] hover:bg-[#ffca28] text-[#050505] font-sans text-xs sm:text-sm font-bold py-2.5 sm:py-3.5 rounded-full transition-all hover:scale-[1.01] shadow-[0_0_20px_rgba(239,184,13,0.3)] cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Order from {activeBranch.name}</span>
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 3. Bottom Guide */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pb-1 flex items-center justify-between font-mono text-[9px] sm:text-[11px] text-white/50">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EFB80D]" />
            <span className="truncate">BRANCH VOYAGE: BARKAS ➔ MALAKPET ➔ TOLICHOWKI ➔ AERO CITY ➔ JUBILEE HILLS</span>
          </div>
          <div className="text-[#EFB80D] font-semibold hidden sm:block">
            {activeBranchIndex === BRANCHES.length - 1
              ? "VOYAGE COMPLETED · SCROLL FOR PLATTERS MENU ↓"
              : "SCROLL TO COMPLETE JOURNEY TO JUBILEE HILLS"}
          </div>
        </div>
      </div>
    </div>
  );
}
