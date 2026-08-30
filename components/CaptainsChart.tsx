"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  MessageCircle,
  ExternalLink,
  Layers,
  Map as MapIcon,
} from "lucide-react";
import SwashAccent from "@/components/SwashAccent";
import BrandName from "@/components/BrandName";
import type { BranchLocation } from "@/components/CaptainsMap";

// ─── 4 Official Captain Kunafa Branches in Hyderabad ────────────────────────

const BRANCHES: BranchLocation[] = [
  {
    id: "barkas",
    name: "Barkas",
    area: "Old City, Hyderabad",
    code: "HYD-01",
    address: "Main Road, Opp. Al-Jubail Hotel, Barkas, Hyderabad",
    phone: "+91 90000 00001",
    hours: "01:00 PM – 02:00 AM",
    highlight: "Original Location (Est. 2021)",
    description:
      "The founding location of Captain Kunafa. Freshly prepared on live copper pans with authentic mountain Akawi cheese and clarified ghee.",
    lat: 17.3115,
    lng: 78.4871,
    mapUrl: "https://maps.app.goo.gl/y5wwh2sxghvovp5n6",
    embedQuery: "Captain+Kunafa+Barkas+Hyderabad",
  },
  {
    id: "malakpet",
    name: "Malakpet",
    area: "Main Road, Malakpet",
    code: "HYD-02",
    address: "Near Super Bazar, Main Road, Malakpet, Hyderabad",
    phone: "+91 90000 00002",
    hours: "02:00 PM – 01:30 AM",
    highlight: "Dine-in & Takeaway",
    description:
      "Serving freshly prepared Kunafa with premium Aleppo pistachios, artisanal toppings, and authentic rose syrup.",
    lat: 17.3753,
    lng: 78.4983,
    mapUrl: "https://maps.app.goo.gl/MM6KRGcwqYmFpFAY7",
    embedQuery: "Captain+Kunafa+Malakpet+Hyderabad",
  },
  {
    id: "tolichowki",
    name: "Tolichowki",
    area: "Paramount Colony, Tolichowki",
    code: "HYD-03",
    address: "Paramount Colony Gate, Tolichowki, Hyderabad",
    phone: "+91 90000 00003",
    hours: "01:00 PM – 02:00 AM",
    highlight: "Late Night Dine-in",
    description:
      "A popular late-night destination featuring live preparation counters, chocolate infusions, and traditional cream varieties.",
    lat: 17.4014,
    lng: 78.4111,
    mapUrl: "https://maps.app.goo.gl/Kd7TQcDZaQmBaMXt5",
    embedQuery: "Captain+Kunafa+Tolichowki+Hyderabad",
  },
  {
    id: "jubileehills",
    name: "Jubilee Hills",
    area: "Road No. 36, Jubilee Hills",
    code: "HYD-04",
    address: "Road No. 36, Near Peddamma Temple, Jubilee Hills, Hyderabad",
    phone: "+91 90000 00004",
    hours: "12:00 PM – 01:30 AM",
    highlight: "Premium Dine-in Lounge",
    description:
      "Our flagship lounge featuring full table service, seasonal specialties, and sharing assortments.",
    lat: 17.4325,
    lng: 78.4071,
    mapUrl: "https://maps.app.goo.gl/oYpmAV1PJbHGApUB6",
    embedQuery: "Captain+Kunafa+Jubilee+Hills+Hyderabad",
  },
];

// Dynamically imported Leaflet map (SSR disabled for window/DOM access)
const CaptainsMap = dynamic(() => import("@/components/CaptainsMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#0a0a0a] flex flex-col items-center justify-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-[#EFB80D] border-t-transparent animate-spin" />
      <span className="font-mono text-xs text-white/60">Loading Map...</span>
    </div>
  ),
});

export default function CaptainsChart() {
  const [activeBranchIndex, setActiveBranchIndex] = useState(0);
  const [mapMode, setMapMode] = useState<"nautical" | "google">("nautical");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // IntersectionObserver to smoothly initialize on viewport entry
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSelectBranch = useCallback((idx: number) => {
    setActiveBranchIndex(idx);
  }, []);

  const activeBranch = BRANCHES[activeBranchIndex];
  const waNumber = activeBranch.phone.replace(/\D/g, "");

  return (
    <section
      ref={sectionRef}
      id="locations"
      className="relative w-full bg-[#050505] text-[#FFF8EC] py-16 sm:py-24 px-4 sm:px-8 border-t border-[#222222]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-2 sm:mb-3">
            Our <SwashAccent color="gold">Locations</SwashAccent>
          </h2>
        </div>

        {/* Branch Quick Select Tabs */}
        <div
          role="group"
          aria-label="Select a Captain Kunafa branch"
          className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-6 sm:mb-8"
        >
          {BRANCHES.map((branch, idx) => {
            const isCurrent = idx === activeBranchIndex;
            return (
              <button
                key={branch.id}
                id={`branch-btn-${branch.id}`}
                type="button"
                aria-label={`View ${branch.name} on map`}
                aria-pressed={isCurrent}
                onClick={() => handleSelectBranch(idx)}
                className={`font-mono text-[10.5px] sm:text-xs px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg border transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EFB80D]
                  ${
                    isCurrent
                      ? "btn-tactile-gold font-black shadow-[0_0_20px_rgba(239,184,13,0.3)]"
                      : "btn-tactile-dark text-white/80 font-semibold"
                  }`}
              >
                <span>{branch.code} · {branch.name}</span>
              </button>
            );
          })}
        </div>

        {/* Map & Active Branch Spotlight Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
          {/* Map Container with Mode Controls */}
          <div className="lg:col-span-7 flex flex-col rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#0c0c0c]">
            {/* Map Top Bar with Live Mode Toggle & Google Maps Direct Link */}
            <div className="flex items-center justify-between px-3.5 sm:px-5 py-2.5 bg-[#121212] border-b border-white/10 z-20">
              <div className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs text-white/80 font-bold">
                <MapPin className="w-3.5 h-3.5 text-[#EFB80D]" />
                <span className="truncate">{activeBranch.name}</span>
              </div>

              <div className="flex items-center gap-2">
                {/* View Mode Toggle */}
                <div className="flex items-center bg-[#1c1c1c] p-0.5 rounded-md border border-white/10 text-[10px] sm:text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setMapMode("google")}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded transition-all cursor-pointer ${
                      mapMode === "google"
                        ? "bg-[#EFB80D] text-black font-black shadow-sm"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <MapIcon className="w-3 h-3" />
                    <span>Google Maps</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapMode("nautical")}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded transition-all cursor-pointer ${
                      mapMode === "nautical"
                        ? "bg-[#EFB80D] text-black font-black shadow-sm"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <Layers className="w-3 h-3" />
                    <span className="hidden xs:inline">Interactive Map</span>
                  </button>
                </div>

                {/* Direct Google Maps Shortlink */}
                <a
                  href={activeBranch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open in Google Maps application"
                  className="hidden sm:inline-flex items-center gap-1 text-[#EFB80D] hover:text-white font-mono text-[11px] font-bold transition-colors"
                >
                  <span>Open App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Main Interactive Map Viewport */}
            <div
              className="relative w-full bg-[#111111]"
              style={{ height: "min(460px, 58vw)", minHeight: 320 }}
            >
              {isVisible ? (
                mapMode === "google" ? (
                  <iframe
                    key={activeBranch.id}
                    title={`Real Google Maps Location for ${activeBranch.name}`}
                    src={`https://maps.google.com/maps?q=${activeBranch.embedQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-full border-0"
                    loading="eager"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <CaptainsMap
                    branches={BRANCHES}
                    activeBranchIndex={activeBranchIndex}
                    onSelectBranch={handleSelectBranch}
                    isVisible={isVisible}
                  />
                )
              ) : (
                <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-[#EFB80D] border-t-transparent animate-spin" />
                </div>
              )}
            </div>
          </div>

          {/* Active Branch Spotlight Card */}
          <div className="lg:col-span-5">
            <div aria-live="polite" aria-atomic="true">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeBranch.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="bg-[#121212] border-2 border-[#EFB80D] rounded-xl p-5 sm:p-7 relative overflow-hidden shadow-2xl"
                >
                  {/* Header */}
                  <div className="mb-3">
                    <div className="text-xs text-white/80 font-semibold mb-1">
                      {activeBranch.area}
                    </div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                      {activeBranch.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm text-white/90 leading-relaxed mb-4 font-medium">
                    {activeBranch.description.includes("Captain Kunafa") ? (
                      <>
                        {activeBranch.description.split("Captain Kunafa").map((part, i, arr) => (
                          <React.Fragment key={i}>
                            {part}
                            {i < arr.length - 1 && <BrandName />}
                          </React.Fragment>
                        ))}
                      </>
                    ) : (
                      activeBranch.description
                    )}
                  </p>

                  {/* Meta details */}
                  <div className="space-y-2.5 border-t border-white/10 pt-3.5 mb-5 font-sans text-xs text-white/85 font-medium">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#EFB80D] shrink-0 mt-0.5" />
                      <span>{activeBranch.address}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#EFB80D] shrink-0" />
                      <span>{activeBranch.hours}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#EFB80D] shrink-0" />
                      <span>{activeBranch.phone}</span>
                    </div>
                  </div>

                  {/* Actions — Official Google Maps Link, WhatsApp & Direct Call */}
                  <div className="grid grid-cols-3 gap-2">
                    {/* Real Google Maps Shortlink */}
                    <a
                      href={activeBranch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Get directions to ${activeBranch.name} on Google Maps`}
                      className="btn-tactile-gold flex flex-col items-center justify-center gap-1 font-sans font-black text-[10px] sm:text-xs py-2.5 rounded-lg"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Directions</span>
                    </a>

                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/91${waNumber.slice(-10)}?text=Hi%20Captain%20Kunafa%20${encodeURIComponent(activeBranch.name)}!%20I'd%20like%20to%20order.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`WhatsApp ${activeBranch.name}`}
                      className="btn-tactile-dark flex flex-col items-center justify-center gap-1 font-sans font-bold text-[10px] sm:text-xs py-2.5 rounded-lg hover:text-[#25D366]"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    {/* Direct Phone Call */}
                    <a
                      href={`tel:${activeBranch.phone.replace(/\s/g, "")}`}
                      aria-label={`Call ${activeBranch.name}`}
                      className="btn-tactile-dark flex flex-col items-center justify-center gap-1 font-sans font-bold text-[10px] sm:text-xs py-2.5 rounded-lg hover:text-white"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
