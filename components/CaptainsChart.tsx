"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Compass, Anchor } from "lucide-react";
import SwashAccent from "@/components/SwashAccent";

export default function CaptainsChart() {
  const chartRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: chartRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0.15, 0.75], [0, 1]);

  const ports = [
    { name: "Dubai", label: "Flagship Fashion Ave", x: 120, y: 180, code: "DXB-01" },
    { name: "Alserkal", label: "Artisanal Lab Warehouse 42", x: 260, y: 120, code: "DXB-02" },
    { name: "Doha", label: "Mina Harbour District", x: 420, y: 220, code: "DOH-01" },
    { name: "Riyadh", label: "Boulevard Royal Outpost", x: 600, y: 150, code: "RUH-01" },
    { name: "Istanbul", label: "Galata Port Historic Pier", x: 780, y: 80, code: "IST-01" },
  ];

  return (
    <section ref={chartRef} className="py-28 px-4 sm:px-8 bg-[#FFF8EC] text-[#2B1B12] relative overflow-hidden border-t border-[#E7DCC9]">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#EFB80D] bg-[#EFB80D]/10 border border-[#EFB80D]/30 px-4 py-1.5 rounded-full mb-4">
            <Compass className="w-4 h-4" />
            <span>THE CAPTAIN'S CHART</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#2B1B12] mb-4 leading-tight">
            Charting the <SwashAccent>Golden Voyage</SwashAccent>
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#7A6A5B]">
            Follow the naval trade winds connecting our 5 flagship copper-hearth kitchens across the Middle East.
          </p>
        </div>

        {/* Interactive SVG Chart Container */}
        <div className="bg-white border border-[#E7DCC9] rounded-[20px] p-6 sm:p-10 shadow-md relative overflow-hidden mb-12">
          {/* Subtle grid */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(239,184,13,0.08)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

          {/* SVG Map Path */}
          <div className="relative w-full h-[320px] overflow-x-auto">
            <svg
              viewBox="0 0 900 300"
              className="w-[900px] h-[300px] absolute inset-0 select-none"
            >
              {/* Latitude grid lines */}
              <line x1="0" y1="75" x2="900" y2="75" stroke="#E7DCC9" strokeOpacity="0.6" strokeDasharray="4 4" />
              <line x1="0" y1="150" x2="900" y2="150" stroke="#E7DCC9" strokeOpacity="0.6" strokeDasharray="4 4" />
              <line x1="0" y1="225" x2="900" y2="225" stroke="#E7DCC9" strokeOpacity="0.6" strokeDasharray="4 4" />

              {/* Ghost path */}
              <path
                d="M 120 180 Q 190 150, 260 120 T 420 220 T 600 150 T 780 80"
                fill="none"
                stroke="#E7DCC9"
                strokeOpacity="0.8"
                strokeWidth="3"
                strokeDasharray="6 6"
              />

              {/* Animated gold line */}
              <motion.path
                d="M 120 180 Q 190 150, 260 120 T 420 220 T 600 150 T 780 80"
                fill="none"
                stroke="#EFB80D"
                strokeWidth="4"
                strokeLinecap="round"
                style={{ pathLength }}
              />

              {/* Port markers */}
              {ports.map((port, idx) => (
                <g key={idx}>
                  <circle cx={port.x} cy={port.y} r="14" fill="#EFB80D" fillOpacity="0.15" />
                  <circle cx={port.x} cy={port.y} r="6" fill="#EFB80D" />
                  <circle cx={port.x} cy={port.y} r="2" fill="#FFF8EC" />

                  <text
                    x={port.x}
                    y={port.y - 20}
                    textAnchor="middle"
                    fill="#2B1B12"
                    fontFamily="var(--font-fraunces), serif"
                    fontWeight="600"
                    fontSize="13"
                  >
                    {port.name}
                  </text>
                  <text
                    x={port.x}
                    y={port.y + 24}
                    textAnchor="middle"
                    fill="#7A6A5B"
                    fontFamily="var(--font-ibm-mono), monospace"
                    fontSize="9"
                    letterSpacing="0.1em"
                  >
                    {port.code}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="pt-4 border-t border-[#E7DCC9] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#7A6A5B]">
            <div className="flex items-center gap-2">
              <Anchor className="w-4 h-4 text-[#EFB80D]" />
              <span>NAVIGATION STATUS: ALL 5 OUTPOSTS FIRING IN COPPER</span>
            </div>
            <span className="text-[#EFB80D]">REAL-TIME DESPATCH ACTIVE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
