"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Compass, MapPin, Clock, Phone, Navigation, Sparkles } from "lucide-react";
import SwashAccent from "@/components/SwashAccent";
import { ShipHelm } from "@/components/NauticalElements";

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
    name: "Barkas Flagship",
    shortName: "Barkas Flagship",
    area: "Old City — Central Hearth",
    code: "HYD-01",
    address: "Main Road, Opp. Al-Jubail Hotel, Barkas, Hyderabad",
    phone: "+91 90000 00001",
    hours: "01:00 PM – 02:00 AM",
    x: 140,
    y: 200,
    mobileX: 75,
    mobileY: 50,
    mobileLabelX: 105,
    mobileLabelY: 48,
    mobileTextAnchor: "start",
    highlight: "The 2021 Founding Hearth",
    lat: "17.3115° N",
    lng: "78.4871° E",
    description:
      "Where Captain Kunafa began in 2021. Live open woodfire-style copper hearths roasting our signature 18-hr mountain Akawi recipe fresh for every voyager.",
  },
  {
    id: "malakpet",
    name: "Malakpet Haven",
    shortName: "Malakpet Haven",
    area: "Moosarambagh Corridor",
    code: "HYD-02",
    address: "Near Super Bazar, Main Road, Malakpet, Hyderabad",
    phone: "+91 90000 00002",
    hours: "02:00 PM – 01:30 AM",
    x: 310,
    y: 120,
    mobileX: 285,
    mobileY: 145,
    mobileLabelX: 255,
    mobileLabelY: 143,
    mobileTextAnchor: "end",
    highlight: "High-Volume Night Counter",
    lat: "17.3753° N",
    lng: "78.4983° E",
    description:
      "A fast-paced evening dock serving steaming hot take-away platters, famous for double-pistachio loaded crispy crowns and instant rose-attar syrups.",
  },
  {
    id: "tolichowki",
    name: "Tolichowki Port",
    shortName: "Tolichowki Port",
    area: "Paramount Colony — Qutb Shahi Belt",
    code: "HYD-03",
    address: "Paramount Colony Gate, Tolichowki, Hyderabad",
    phone: "+91 90000 00003",
    hours: "01:00 PM – 02:00 AM",
    x: 480,
    y: 200,
    mobileX: 75,
    mobileY: 240,
    mobileLabelX: 105,
    mobileLabelY: 238,
    mobileTextAnchor: "start",
    highlight: "Late-Night Gathering Spot",
    lat: "17.4014° N",
    lng: "78.4111° E",
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
    mobileLabelX: 255,
    mobileLabelY: 333,
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
    mobileLabelY: 396,
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

    const onScroll = () => {
      updateScrollMetrics();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updatePathLength);
    window.addEventListener("orientationchange", updatePathLength);

    updateScrollMetrics();
    renderLoop();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updatePathLength);
      window.removeEventListener("orientationchange", updatePathLength);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const handleJumpToBranch = useCallback((index: number) => {
    setActiveBranchIndex(index);
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const containerTop = rect.top + scrollY;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;

    const branchProgressMap = [0.05, 0.25, 0.50, 0.75, 0.95];
    const targetScrollY = containerTop + (branchProgressMap[index] || 0) * totalScrollable;

    const lenis = (window as unknown as { lenis?: { scrollTo: (n: number) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(targetScrollY);
    } else {
      window.scrollTo({ top: targetScrollY, behavior: "smooth" });
    }
  }, []);

  const activeBranch = BRANCHES[activeBranchIndex];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360vh] sm:h-[420vh] bg-[#050505] text-[#FFF8EC]"
    >
      {/* Sticky Fullscreen Chart Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-3 xs:px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-8 pt-10 sm:pt-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFB80D]/15 border border-[#EFB80D]/30 text-[#EFB80D] font-mono text-[9px] sm:text-xs uppercase tracking-widest font-black mb-2">
            <Compass className="w-3.5 h-3.5 text-[#EFB80D]" />
            <span>HYDERABAD VOYAGE MAP</span>
          </div>

          <h2 className="font-display text-xl xs:text-2xl sm:text-4xl font-semibold text-white leading-tight mb-1 sm:mb-2">
            The Captain&apos;s <SwashAccent color="gold">Chart</SwashAccent>
          </h2>

          <p className="font-sans text-[11px] sm:text-sm text-white/80 line-clamp-1 sm:line-clamp-none">
            Follow the golden maritime route across Hyderabad&apos;s 5 signature hearths.
          </p>
        </div>



        {/* Interactive Nautical Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 items-center">
          {/* SVG Route Visualization */}
          <div className="lg:col-span-7 bg-[#111111] rounded-[18px] sm:rounded-[24px] p-2.5 sm:p-5 relative overflow-hidden flex flex-col justify-center border border-white/10 shadow-lg">
            
            {/* MOBILE & TABLET: Vertical S-Curve Nautical Chart (viewBox: 0 0 360 480) */}
            <div className="block lg:hidden relative w-full h-[270px] xs:h-[300px] sm:h-[340px] select-none">
              <svg
                viewBox="0 0 360 480"
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-full absolute inset-0"
              >
                <defs>
                  {/* Glowing text filter */}
                  <filter id="goldTextGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="1" stdDeviation="3" floodColor="#EFB80D" floodOpacity="0.4" />
                  </filter>
                </defs>

                {/* Symmetrical Guide Grid Lines */}
                <line x1="75" y1="30" x2="75" y2="450" stroke="#222222" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="180" y1="30" x2="180" y2="450" stroke="#222222" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="285" y1="30" x2="285" y2="450" stroke="#222222" strokeWidth="1" strokeDasharray="4 4" />

                {/* Symmetrical Ghost Route */}
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

                {/* Mobile Symmetrical Branch Stops with Prominent Highlighted Labels */}
                {BRANCHES.map((branch, idx) => {
                  const isCurrent = idx === activeBranchIndex;

                  return (
                    <g
                      key={`mobile-${branch.id}`}
                      onClick={() => handleJumpToBranch(idx)}
                      className="cursor-pointer"
                    >
                      {/* Active Highlight Badge Pill Behind Text */}
                      {isCurrent && (
                        <rect
                          x={
                            branch.mobileTextAnchor === "start"
                              ? branch.mobileLabelX - 6
                              : branch.mobileTextAnchor === "end"
                              ? branch.mobileLabelX - 150
                              : branch.mobileLabelX - 75
                          }
                          y={
                            branch.mobileTextAnchor === "middle"
                              ? branch.mobileLabelY - 16
                              : branch.mobileLabelY - 14
                          }
                          width={branch.mobileTextAnchor === "middle" ? 150 : 156}
                          height={36}
                          rx={8}
                          fill="#000000"
                          fillOpacity="0.85"
                          stroke="#EFB80D"
                          strokeWidth="1.5"
                        />
                      )}

                      {/* Outer Ring */}
                      <circle
                        cx={branch.mobileX}
                        cy={branch.mobileY}
                        r={isCurrent ? 16 : 10}
                        fill={isCurrent ? "#EFB80D" : "#333333"}
                        stroke="#FFFFFF"
                        strokeWidth={isCurrent ? "3" : "2"}
                      />
                      {/* Inner Dot */}
                      <circle
                        cx={branch.mobileX}
                        cy={branch.mobileY}
                        r={isCurrent ? 7 : 4}
                        fill={isCurrent ? "#000000" : "#EFB80D"}
                      />

                      {/* Branch Name Label */}
                      <text
                        x={branch.mobileLabelX}
                        y={branch.mobileLabelY}
                        textAnchor={branch.mobileTextAnchor}
                        fill={isCurrent ? "#EFB80D" : "#FFFFFF"}
                        fontFamily="var(--font-fraunces), serif"
                        fontWeight={isCurrent ? "900" : "700"}
                        fontSize={isCurrent ? "16.5" : "12.5"}
                        filter={isCurrent ? "url(#goldTextGlow)" : undefined}
                      >
                        {branch.shortName}
                      </text>

                      {/* Code Tag */}
                      <text
                        x={branch.mobileLabelX}
                        y={
                          branch.mobileTextAnchor === "middle"
                            ? branch.mobileY + 24
                            : branch.mobileLabelY + 16
                        }
                        textAnchor={branch.mobileTextAnchor}
                        fill={isCurrent ? "#FFFFFF" : "#C4B5A5"}
                        fontFamily="var(--font-ibm-mono), monospace"
                        fontSize={isCurrent ? "11.5" : "10"}
                        fontWeight={isCurrent ? "900" : "700"}
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
                <defs>
                  <filter id="desktopTextGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="1" stdDeviation="3" floodColor="#EFB80D" floodOpacity="0.4" />
                  </filter>
                </defs>

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

                {/* Symmetrical Branch Markers with Highlighted Selection */}
                {BRANCHES.map((branch, idx) => {
                  const isCurrent = idx === activeBranchIndex;

                  return (
                    <g
                      key={`desktop-${branch.id}`}
                      onClick={() => handleJumpToBranch(idx)}
                      className="cursor-pointer"
                    >
                      {/* Active Background Highlight Pill */}
                      {isCurrent && (
                        <rect
                          x={branch.x - 90}
                          y={branch.y - 36}
                          width={180}
                          height={28}
                          rx={7}
                          fill="#000000"
                          fillOpacity="0.85"
                          stroke="#EFB80D"
                          strokeWidth="1.5"
                        />
                      )}

                      <circle
                        cx={branch.x}
                        cy={branch.y}
                        r={isCurrent ? 16 : 10}
                        fill={isCurrent ? "#EFB80D" : "#444444"}
                        stroke="#FFFFFF"
                        strokeWidth={isCurrent ? "3" : "2"}
                      />
                      <circle
                        cx={branch.x}
                        cy={branch.y}
                        r={isCurrent ? 7 : 4}
                        fill={isCurrent ? "#000000" : "#EFB80D"}
                      />

                      <text
                        x={branch.x}
                        y={branch.y - 18}
                        textAnchor="middle"
                        fill={isCurrent ? "#EFB80D" : "#FFFFFF"}
                        fontFamily="var(--font-fraunces), serif"
                        fontWeight={isCurrent ? "900" : "700"}
                        fontSize={isCurrent ? "17" : "13"}
                        filter={isCurrent ? "url(#desktopTextGlow)" : undefined}
                      >
                        {branch.name}
                      </text>
                      <text
                        x={branch.x}
                        y={branch.y + 24}
                        textAnchor="middle"
                        fill={isCurrent ? "#FFFFFF" : "#C4B5A5"}
                        fontFamily="var(--font-ibm-mono), monospace"
                        fontSize={isCurrent ? "12" : "11"}
                        fontWeight={isCurrent ? "900" : "700"}
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
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-black px-2 py-0.5 rounded-full bg-[#EFB80D] text-[#000000]">
                        {activeBranch.code}
                      </span>
                      <span className="font-sans text-[11px] text-white/80 font-semibold">
                        {activeBranch.area}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-lg sm:text-2xl text-white">
                      {activeBranch.name}
                    </h3>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-[#1c1c1c] border border-white/10 flex items-center justify-center shrink-0">
                    <ShipHelm size={20} className="text-[#EFB80D]" />
                  </div>
                </div>

                {/* Highlight Banner */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#EFB80D]/15 border border-[#EFB80D]/30 text-[#EFB80D] font-mono text-[10px] sm:text-xs font-bold mb-3">
                  <Sparkles className="w-3 h-3 text-[#EFB80D]" />
                  <span>{activeBranch.highlight}</span>
                </div>

                {/* Description */}
                <p className="font-sans text-xs sm:text-sm text-white/90 leading-relaxed mb-4">
                  {activeBranch.description}
                </p>

                {/* Meta details */}
                <div className="space-y-2 border-t border-white/10 pt-3 mb-4 font-sans text-xs text-white/80">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#EFB80D] shrink-0 mt-0.5" />
                    <span>{activeBranch.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#EFB80D] shrink-0" />
                    <span>{activeBranch.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#EFB80D] shrink-0" />
                    <span>{activeBranch.phone}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(activeBranch.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-[#EFB80D] hover:bg-white text-[#000000] font-sans font-black text-xs py-2.5 rounded-xl transition-all cursor-pointer active:scale-95 shadow-sm"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#000000]" />
                    <span>Navigate</span>
                  </a>
                  <a
                    href={`https://wa.me/${activeBranch.phone.replace(/[^0-9]/g, "")}?text=Hi%20Captain%20Kunafa%20${encodeURIComponent(activeBranch.name)}!%20I'd%20like%20to%20order.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-[#1c1c1c] hover:bg-white hover:text-black text-white font-sans font-bold text-xs py-2.5 rounded-xl border border-white/10 transition-all cursor-pointer active:scale-95"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Branch</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
