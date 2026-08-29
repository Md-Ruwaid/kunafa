"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
} from "lucide-react";
import SwashAccent from "@/components/SwashAccent";
import { CompassRose, ShipHelm } from "@/components/NauticalElements";

interface Branch {
  id: string;
  name: string;
  shortName: string;
  area: string;
  code: string;
  address: string;
  phone: string;
  hours: string;
  x: number;
  y: number;
  mobileX: number;
  mobileY: number;
  mobileLabelX: number;
  mobileLabelY: number;
  mobileTextAnchor: "start" | "end" | "middle";
  highlight: string;
  lat: string;
  lng: string;
  description: string;
}

const BRANCHES: Branch[] = [
  {
    id: "barkas",
    name: "Barkas Branch",
    shortName: "Barkas Flagship",
    area: "Old City — Central Hearth & HQ",
    code: "HYD-01",
    address: "Main Road, Opp. Grand Mosque, Barkas, Hyderabad",
    phone: "+91 90000 00001",
    hours: "12:00 PM – 01:30 AM",
    x: 140,
    y: 200,
    mobileX: 75,
    mobileY: 50,
    mobileLabelX: 102,
    mobileLabelY: 53,
    mobileTextAnchor: "start",
    highlight: "Origin Flagship · Est. 2021",
    lat: "17.3115° N",
    lng: "78.4871° E",
    description:
      "The founding hearth of Captain Kunafa. Where Saud bin Nasar Khulagi first introduced live copper roasting in Hyderabad. Famous for the original 48 dB acoustic crunch.",
  },
  {
    id: "malakpet",
    name: "Malakpet Branch",
    shortName: "Malakpet Haven",
    area: "South Hyderabad — Chanchalguda",
    code: "HYD-02",
    address: "Near Metro Pillar 1142, Chanchalguda Road, Malakpet",
    phone: "+91 90000 00002",
    hours: "12:00 PM – 01:00 AM",
    x: 310,
    y: 120,
    mobileX: 285,
    mobileY: 145,
    mobileLabelX: 258,
    mobileLabelY: 148,
    mobileTextAnchor: "end",
    highlight: "Live Seating & Takeaway",
    lat: "17.3753° N",
    lng: "78.4983° E",
    description:
      "Rapid-service live counter right on the Chanchalguda metro corridor. Serving sizzling Pistachio Crown and Classic Akawi platters fresh to south Hyderabad families.",
  },
  {
    id: "tolichowki",
    name: "Tolichowki Branch",
    shortName: "Tolichowki Port",
    area: "West Hyderabad — Paramount Colony",
    code: "HYD-03",
    address: "Paramount Colony Main Road, Tolichowki, Hyderabad",
    phone: "+91 90000 00003",
    hours: "12:00 PM – 01:30 AM",
    x: 480,
    y: 200,
    mobileX: 75,
    mobileY: 240,
    mobileLabelX: 102,
    mobileLabelY: 243,
    mobileTextAnchor: "start",
    highlight: "Late-Night Family Hub",
    lat: "17.4042° N",
    lng: "78.4116° E",
    description:
      "A bustling late-night dessert haven with multiple copper burners firing simultaneously. Renowned for Dark Choco Lava Kunafa and fresh buffalo ashta cream.",
  },
  {
    id: "aerocity",
    name: "Aero City Branch",
    shortName: "Aero City Anchor",
    area: "Airport Corridor — Shamshabad",
    code: "HYD-04",
    address: "Commercial Zone, Shamshabad International Airport Corridor",
    phone: "+91 90000 00004",
    hours: "10:00 AM – 02:30 AM",
    x: 650,
    y: 120,
    mobileX: 285,
    mobileY: 335,
    mobileLabelX: 258,
    mobileLabelY: 338,
    mobileTextAnchor: "end",
    highlight: "Airport Corridor Terminal",
    lat: "17.2403° N",
    lng: "78.4294° E",
    description:
      "Open until 2:30 AM for travelers. Special insulated thermal takeaway packaging guarantees your kunafa arrives crisp, fragrant, and steaming warm.",
  },
  {
    id: "jubileehills",
    name: "Jubilee Hills Branch",
    shortName: "Jubilee Hills",
    area: "HITEC Corridor — Road No. 36",
    code: "HYD-05",
    address: "Road No. 36, Near Peddamma Temple, Jubilee Hills, Hyderabad",
    phone: "+91 90000 00005",
    hours: "12:00 PM – 01:30 AM",
    x: 820,
    y: 200,
    mobileX: 180,
    mobileY: 430,
    mobileLabelX: 180,
    mobileLabelY: 408,
    mobileTextAnchor: "middle",
    highlight: "Artisanal Tasting Lounge",
    lat: "17.4325° N",
    lng: "78.4071° E",
    description:
      "The premier destination tasting room. Premium table service, full dessert menu including Lotus Biscoff Royale and celebration sharing boxes.",
  },
];

// Perfectly Symmetrical Harmonic Wave Path for Desktop (viewBox: 0 0 960 320)
const ROUTE_PATH_D = "M 140 200 C 225 200, 225 120, 310 120 C 395 120, 395 200, 480 200 C 565 200, 565 120, 650 120 C 735 120, 735 200, 820 200";

// Perfectly Symmetrical S-Curve Wave Path for Mobile Portrait (viewBox: 0 0 360 480)
const ROUTE_PATH_VERTICAL_D = "M 75 50 C 180 50, 285 97.5, 285 145 C 285 192.5, 75 192.5, 75 240 C 75 287.5, 285 287.5, 285 335 C 285 382.5, 180 382.5, 180 430";

export default function CaptainsChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const shipGroupRef = useRef<SVGGElement>(null);
  const pathRefMobile = useRef<SVGPathElement>(null);
  const shipGroupMobileRef = useRef<SVGGElement>(null);

  const [activeBranchIndex, setActiveBranchIndex] = useState(0);

  // High-precision synchronized RAF loop for both Desktop & Mobile Vertical
  useEffect(() => {
    let animFrame: number;
    let targetProgress = 0;
    let currentProgress = 0;
    let totalPathLength = 1000;
    let totalPathLengthMobile = 800;
    let lastBranchIdx = -1;

    const updatePathLength = () => {
      if (pathRef.current) {
        totalPathLength = pathRef.current.getTotalLength() || 1000;
        pathRef.current.style.strokeDasharray = `${totalPathLength}`;
        pathRef.current.style.strokeDashoffset = `${totalPathLength * (1 - currentProgress)}`;
      }
      if (pathRefMobile.current) {
        totalPathLengthMobile = pathRefMobile.current.getTotalLength() || 800;
        pathRefMobile.current.style.strokeDasharray = `${totalPathLengthMobile}`;
        pathRefMobile.current.style.strokeDashoffset = `${totalPathLengthMobile * (1 - currentProgress)}`;
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

      // Update Desktop Path & Ship
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

      // Update Mobile Vertical Path & Ship
      if (pathRefMobile.current) {
        const offset = totalPathLengthMobile * (1 - currentProgress);
        pathRefMobile.current.style.strokeDashoffset = `${offset}`;
      }
      if (pathRefMobile.current && shipGroupMobileRef.current) {
        const currentLen = currentProgress * totalPathLengthMobile;
        const pt = pathRefMobile.current.getPointAtLength(currentLen);
        const nextPt = pathRefMobile.current.getPointAtLength(
          Math.min(totalPathLengthMobile, currentLen + 2)
        );
        const angle =
          (Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x) * 180) / Math.PI;

        shipGroupMobileRef.current.setAttribute(
          "transform",
          `translate(${pt.x}, ${pt.y}) rotate(${angle})`
        );
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
      }

      animFrame = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("scroll", updateScrollMetrics, { passive: true });
    window.addEventListener("resize", () => {
      updatePathLength();
      updateScrollMetrics();
    });
    window.addEventListener("orientationchange", () => {
      updatePathLength();
      updateScrollMetrics();
    });

    updateScrollMetrics();
    animFrame = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", updateScrollMetrics);
      window.removeEventListener("resize", updateScrollMetrics);
      window.removeEventListener("orientationchange", updateScrollMetrics);
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
      className="relative w-full h-[320vh] sm:h-[350vh] bg-[#050505] border-t border-[#222222]"
    >
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between p-3 sm:p-6 lg:p-8 overflow-hidden bg-[#050505]">
        {/* Ambient Chart Background */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
        <div className="absolute top-12 right-12 opacity-5 pointer-events-none hidden xl:block text-[#EFB80D]">
          <CompassRose size={260} />
        </div>

        {/* 1. Section Header */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-12 sm:pt-16">
          <div className="text-center sm:text-left">
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              From Barkas to <SwashAccent color="gold">Jubilee Hills</SwashAccent>
            </h2>
          </div>
        </div>

        {/* 2. Main Center Section: Symmetrical Vertical Mobile Chart + Symmetrical Horizontal Desktop Chart + Spotlight Card */}
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 items-center my-auto">
          
          {/* Symmetrical Map Chart Container */}
          <div className="lg:col-span-7 bg-[#111111] rounded-[20px] sm:rounded-[24px] p-3 sm:p-5 relative overflow-hidden flex flex-col justify-center border border-white/10 shadow-xl">
            
            {/* MOBILE ONLY: Symmetrical Vertical Serpentine Voyage Animation (viewBox: 0 0 360 480) */}
            <div className="block lg:hidden relative w-full h-[240px] xs:h-[260px] sm:h-[300px] select-none">
              <svg
                viewBox="0 0 360 480"
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-full absolute inset-0"
              >
                {/* Symmetrical Nautical Vertical Guide Lines */}
                <line x1="75" y1="30" x2="75" y2="450" stroke="#222222" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="180" y1="30" x2="180" y2="450" stroke="#222222" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="285" y1="30" x2="285" y2="450" stroke="#222222" strokeWidth="1" strokeDasharray="4 4" />

                {/* Symmetrical Ghost Path (Vertical) */}
                <path
                  d={ROUTE_PATH_VERTICAL_D}
                  fill="none"
                  stroke="#282828"
                  strokeWidth="4"
                  strokeDasharray="6 6"
                />

                {/* Symmetrical Active Animated Trail in Solid Captain Gold */}
                <path
                  ref={pathRefMobile}
                  d={ROUTE_PATH_VERTICAL_D}
                  fill="none"
                  stroke="#EFB80D"
                  strokeWidth="6"
                  strokeLinecap="round"
                />

                {/* Mobile Sailing Vessel with Halo & Nautical Helm */}
                <g ref={shipGroupMobileRef}>
                  <circle r="16" fill="#EFB80D" stroke="#FFFFFF" strokeWidth="3" />
                  <g transform="scale(0.8) translate(-12, -12)">
                    <path
                      d="M12 2L15 8H9L12 2ZM4 13L12 11L20 13L17 19H7L4 13Z"
                      fill="#000000"
                    />
                  </g>
                </g>

                {/* Mobile Symmetrical Branch Stops with Clear Side Labels */}
                {BRANCHES.map((branch, idx) => {
                  const isCurrent = idx === activeBranchIndex;

                  return (
                    <g
                      key={`mobile-${branch.id}`}
                      onClick={() => handleJumpToBranch(idx)}
                      className="cursor-pointer"
                    >
                      {/* Outer Ring */}
                      <circle
                        cx={branch.mobileX}
                        cy={branch.mobileY}
                        r={isCurrent ? 15 : 10}
                        fill={isCurrent ? "#EFB80D" : "#333333"}
                        stroke="#FFFFFF"
                        strokeWidth={isCurrent ? "3" : "2"}
                      />
                      {/* Inner Dot */}
                      <circle
                        cx={branch.mobileX}
                        cy={branch.mobileY}
                        r={isCurrent ? 6 : 4}
                        fill={isCurrent ? "#000000" : "#EFB80D"}
                      />

                      {/* Branch Name Label */}
                      <text
                        x={branch.mobileLabelX}
                        y={branch.mobileLabelY}
                        textAnchor={branch.mobileTextAnchor}
                        fill="#FFFFFF"
                        fontFamily="var(--font-fraunces), serif"
                        fontWeight={isCurrent ? "900" : "700"}
                        fontSize={isCurrent ? "14.5" : "12.5"}
                      >
                        {branch.shortName}
                      </text>

                      {/* Code Tag */}
                      <text
                        x={branch.mobileLabelX}
                        y={
                          branch.mobileTextAnchor === "middle"
                            ? branch.mobileY + 22
                            : branch.mobileLabelY + 16
                        }
                        textAnchor={branch.mobileTextAnchor}
                        fill={isCurrent ? "#EFB80D" : "#C4B5A5"}
                        fontFamily="var(--font-ibm-mono), monospace"
                        fontSize="10"
                        fontWeight="700"
                      >
                        {branch.code}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* DESKTOP ONLY: Symmetrical Horizontal Maritime Chart Animation (viewBox: 0 0 960 320) */}
            <div className="hidden lg:block relative w-full h-[280px] select-none">
              <svg
                viewBox="0 0 960 320"
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-full absolute inset-0"
              >
                {/* Symmetrical Guide Grid */}
                <line x1="40" y1="120" x2="920" y2="120" stroke="#333333" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="40" y1="160" x2="920" y2="160" stroke="#333333" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="40" y1="200" x2="920" y2="200" stroke="#333333" strokeWidth="1" strokeDasharray="4 4" />

                {/* Symmetrical Ghost Path */}
                <path
                  d={ROUTE_PATH_D}
                  fill="none"
                  stroke="#2c2c2c"
                  strokeWidth="4"
                  strokeDasharray="6 6"
                />

                {/* Active Animated Symmetrical Trail in Crisp Solid #EFB80D */}
                <path
                  ref={pathRef}
                  d={ROUTE_PATH_D}
                  fill="none"
                  stroke="#EFB80D"
                  strokeWidth="6"
                  strokeLinecap="round"
                />

                {/* Sailing Vessel Group in Crisp Solid Gold with White Accent */}
                <g ref={shipGroupRef}>
                  <circle r="16" fill="#EFB80D" stroke="#FFFFFF" strokeWidth="3" />
                  <g transform="scale(0.8) translate(-12, -12)">
                    <path
                      d="M12 2L15 8H9L12 2ZM4 13L12 11L20 13L17 19H7L4 13Z"
                      fill="#000000"
                    />
                  </g>
                </g>

                {/* Symmetrical Branch Markers with Solid Filled Gold & White Text */}
                {BRANCHES.map((branch, idx) => {
                  const isCurrent = idx === activeBranchIndex;

                  return (
                    <g
                      key={`desktop-${branch.id}`}
                      onClick={() => handleJumpToBranch(idx)}
                      className="cursor-pointer"
                    >
                      <circle
                        cx={branch.x}
                        cy={branch.y}
                        r={isCurrent ? 15 : 10}
                        fill={isCurrent ? "#EFB80D" : "#444444"}
                        stroke="#FFFFFF"
                        strokeWidth={isCurrent ? "3" : "2"}
                      />
                      <circle
                        cx={branch.x}
                        cy={branch.y}
                        r={isCurrent ? 6 : 4}
                        fill={isCurrent ? "#000000" : "#EFB80D"}
                      />

                      <text
                        x={branch.x}
                        y={branch.y - 18}
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontFamily="var(--font-fraunces), serif"
                        fontWeight={isCurrent ? "900" : "700"}
                        fontSize={isCurrent ? "15" : "13"}
                      >
                        {branch.name}
                      </text>
                      <text
                        x={branch.x}
                        y={branch.y + 24}
                        textAnchor="middle"
                        fill={isCurrent ? "#EFB80D" : "#C4B5A5"}
                        fontFamily="var(--font-ibm-mono), monospace"
                        fontSize="11"
                        fontWeight="700"
                      >
                        {branch.code}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Active Branch Spotlight Card */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBranch.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="bg-[#121212] border-2 border-[#EFB80D] rounded-[18px] sm:rounded-[24px] p-4 sm:p-6 relative overflow-hidden shadow-xl"
              >
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <h3 className="font-display font-bold text-lg sm:text-2xl text-white">
                    {activeBranch.name}
                  </h3>
                  <span className="font-sans text-[10.5px] sm:text-xs text-[#EFB80D] font-bold">
                    {activeBranch.area}
                  </span>
                </div>

                <div className="inline-block bg-white text-black font-mono text-[9.5px] sm:text-[11px] font-black px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md my-1.5 sm:my-2.5 shadow-sm">
                  {activeBranch.highlight}
                </div>

                <p className="font-sans text-xs text-white/85 font-medium leading-relaxed mb-2.5 sm:mb-3 line-clamp-2 sm:line-clamp-none">
                  {activeBranch.description}
                </p>

                <div className="space-y-1 font-sans text-xs text-white/90 font-medium border-t border-white/10 pt-2.5 sm:pt-3 mb-3 sm:mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#EFB80D] shrink-0" />
                    <span className="truncate text-white font-semibold text-[10.5px] sm:text-xs">
                      {activeBranch.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] sm:text-[11px] font-mono text-white/80">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#EFB80D]" /> {activeBranch.hours}</span>
                    <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-[#EFB80D]" /> {activeBranch.phone}</span>
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
                  className="w-full flex items-center justify-center gap-2 bg-[#EFB80D] hover:bg-white text-[#000000] font-sans text-xs sm:text-sm font-black py-2.5 sm:py-3.5 rounded-full transition-all hover:scale-[1.01] cursor-pointer shadow-md"
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
        <div className="relative z-10 max-w-7xl mx-auto w-full pb-1 flex items-center justify-between font-mono text-[9px] sm:text-[11px] text-white/60">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#EFB80D]" />
            <span className="truncate">BRANCH VOYAGE: BARKAS ➔ MALAKPET ➔ TOLICHOWKI ➔ AERO CITY ➔ JUBILEE HILLS</span>
          </div>
          <div className="text-white font-bold hidden sm:block">
            {activeBranchIndex === BRANCHES.length - 1
              ? "VOYAGE COMPLETED · SCROLL FOR PLATTERS MENU ↓"
              : "SCROLL TO COMPLETE JOURNEY TO JUBILEE HILLS"}
          </div>
        </div>
      </div>
    </div>
  );
}
