"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import {
  Clock,
  ExternalLink,
  Layers,
  Map as MapIcon,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";
import BrandName from "@/components/BrandName";
import {
  GlassCard,
  SectionAmbient,
  SectionArabesque,
  SectionEyebrow,
  SectionMotion,
  StatLedger,
  useSectionReveal,
} from "@/components/SectionPrimitives";
import type { BranchLocation } from "@/components/CaptainsMap";
import { buildWhatsAppLink } from "@/lib/contact";

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
    description: [
      "The founding location of ",
      "BRAND",
      ". Freshly prepared on live copper pans with authentic mountain Akawi cheese and clarified ghee.",
    ],
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
    description: [
      "Serving freshly prepared Kunafa with premium Aleppo pistachios, artisanal toppings, and authentic rose syrup.",
    ],
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
    description: [
      "A popular late-night destination featuring live preparation counters, chocolate infusions, and traditional cream varieties.",
    ],
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
    description: [
      "Our flagship lounge featuring full table service, seasonal specialties, and sharing assortments.",
    ],
    lat: 17.4325,
    lng: 78.4071,
    mapUrl: "https://maps.app.goo.gl/oYpmAV1PJbHGApUB6",
    embedQuery: "Captain+Kunafa+Jubilee+Hills+Hyderabad",
  },
  {
    id: "aerocity",
    name: "Aero City",
    area: "Aero City, Shamshabad",
    code: "HYD-05",
    address: "PLACEHOLDER — Aero City, Shamshabad Road, Hyderabad",
    phone: "+91 90000 00005",
    hours: "12:00 PM – 01:00 AM",
    highlight: "Airport Corridor Outlet",
    description: [
      "Conveniently situated along the airport corridor, offering fresh-pressed Kunafa to travelers and dessert lovers across South Hyderabad.",
    ],
    lat: 17.2403,
    lng: 78.4294,
    mapUrl: "https://maps.google.com/?q=Captain+Kunafa+Aero+City+Hyderabad",
    embedQuery: "Captain+Kunafa+Aero+City+Hyderabad",
  },
];

const LOCATION_STATS = [
  { value: "05", label: "Branches" },
  { value: "2021", label: "Since Barkas" },
  { value: "02AM", label: "Late Nights" },
  { value: "Live", label: "Copper Press" },
] as const;

const CaptainsMap = dynamic(() => import("@/components/CaptainsMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#0a0a0a]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#EFB80D] border-t-transparent" />
      <span className="font-mono text-xs text-white/60">Loading Map...</span>
    </div>
  ),
});

export default function CaptainsChart() {
  const [activeBranchIndex, setActiveBranchIndex] = useState(0);
  const [mapMode, setMapMode] = useState<"nautical" | "google">("nautical");
  const mapInitRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView, container, item } = useSectionReveal();

  useEffect(() => {
    const el = mapInitRef.current;
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
  const branchWhatsAppUrl = buildWhatsAppLink(
    activeBranch.phone,
    `Hi Captain Kunafa ${activeBranch.name}! I'd like to order.`
  );

  return (
    <section
      ref={ref}
      id="locations"
      className="relative w-full overflow-hidden border-t border-[#EFB80D]/20 bg-[#050505] px-4 py-20 text-[#FFF8EC] sm:px-6 sm:py-28 lg:px-8"
    >
      <SectionAmbient glowPosition="left" />
      <SectionArabesque patternId="locations-arabesque" />

      <SectionMotion
        inView={inView}
        container={container}
        className="relative z-10 mx-auto w-full max-w-6xl"
      >
        <motion.div variants={item}>
          <SectionEyebrow>The Fleet</SectionEyebrow>
        </motion.div>

        <motion.h2
          variants={item}
          className="text-center font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Captain&apos;s{" "}
          <span className="about-gold-text">Chart</span>
        </motion.h2>

        <motion.p
          variants={item}
          className="mx-auto mt-4 max-w-2xl text-center font-mono text-[10px] uppercase tracking-[0.28em] text-white/45 sm:text-xs"
        >
          Five harbours across Hyderabad
        </motion.p>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-center font-sans text-base leading-relaxed text-white/65 sm:text-lg"
        >
          From the founding hearth in Barkas to Jubilee Hills and beyond — find
          your nearest <BrandName /> and walk in for a live copper press.
        </motion.p>

        {/* Branch selector */}
        <motion.div
          variants={item}
          role="group"
          aria-label="Select a Captain Kunafa branch"
          className="mt-10 flex flex-wrap justify-center gap-2 sm:mt-12 sm:gap-2.5"
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
                className={`cursor-pointer rounded-lg border px-3.5 py-2 font-mono text-[10.5px] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#EFB80D] sm:px-5 sm:py-2.5 sm:text-xs ${
                  isCurrent
                    ? "btn-tactile-base btn-tactile-gold font-black shadow-[0_0_20px_rgba(239,184,13,0.3)]"
                    : "btn-tactile-base btn-tactile-dark font-semibold text-white/80"
                }`}
              >
                <span>{branch.name}</span>
                <span className="ml-1.5 hidden text-[9px] opacity-60 sm:inline">
                  {branch.code}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Map + branch card */}
        <div
          ref={mapInitRef}
          className="mt-8 flex flex-col items-center gap-6 sm:mt-10"
        >
          <motion.div variants={item} className="w-full">
            <GlassCard className="overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-3.5 py-2.5 sm:px-5">
                <div className="flex min-w-0 items-center gap-1.5 font-mono text-[11px] font-bold text-white/80 sm:text-xs">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-[#EFB80D]" />
                  <span className="truncate">{activeBranch.name}</span>
                  <span className="hidden text-white/40 sm:inline">
                    · {activeBranch.code}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center rounded-md border border-white/10 bg-[#1c1c1c] p-0.5 font-mono text-[10px] sm:text-xs">
                    <button
                      type="button"
                      onClick={() => setMapMode("google")}
                      className={`flex cursor-pointer items-center gap-1 rounded px-2.5 py-1 transition-all ${
                        mapMode === "google"
                          ? "bg-[#EFB80D] font-black text-black shadow-sm"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      <MapIcon className="h-3 w-3" />
                      <span>Google</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMapMode("nautical")}
                      className={`flex cursor-pointer items-center gap-1 rounded px-2.5 py-1 transition-all ${
                        mapMode === "nautical"
                          ? "bg-[#EFB80D] font-black text-black shadow-sm"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      <Layers className="h-3 w-3" />
                      <span className="hidden xs:inline">Chart</span>
                    </button>
                  </div>

                  <a
                    href={activeBranch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open in Google Maps application"
                    className="hidden items-center gap-1 font-mono text-[11px] font-bold text-[#EFB80D] transition-colors hover:text-white sm:inline-flex"
                  >
                    <span>Open App</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div
                className="relative w-full bg-[#111111]"
                style={{ height: "min(460px, 58vw)", minHeight: 320 }}
              >
                {isVisible ? (
                  mapMode === "google" ? (
                    <iframe
                      key={activeBranch.id}
                      title={`Google Maps location for ${activeBranch.name}`}
                      src={`https://maps.google.com/maps?q=${activeBranch.embedQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                      className="h-full w-full border-0"
                      loading="eager"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  ) : (
                    <CaptainsMap
                      branches={BRANCHES}
                      activeBranchIndex={activeBranchIndex}
                      onSelectBranch={handleSelectBranch}
                    />
                  )
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#0a0a0a]">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#EFB80D] border-t-transparent" />
                  </div>
                )}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={item} className="mx-auto w-full max-w-4xl">
            <div aria-live="polite" aria-atomic="true">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeBranch.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <GlassCard className="border-[#EFB80D]/30 p-5 sm:p-7">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                          {activeBranch.area}
                        </p>
                        <h3 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
                          {activeBranch.name}
                        </h3>
                      </div>
                      <span className="shrink-0 rounded-full border border-[#EFB80D]/25 bg-[#EFB80D]/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[#EFB80D]">
                        {activeBranch.highlight}
                      </span>
                    </div>

                    <p className="mb-5 font-sans text-sm leading-relaxed text-white/75">
                      {activeBranch.description.map((chunk, i) =>
                        chunk === "BRAND" ? <BrandName key={i} /> : chunk
                      )}
                    </p>

                    <ul className="space-y-3 border-t border-white/10 pt-4 font-sans text-xs text-white/85">
                      <li className="flex items-start gap-2.5">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#EFB80D]" />
                        <span>{activeBranch.address}</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Clock className="h-4 w-4 shrink-0 text-[#EFB80D]" />
                        <span>{activeBranch.hours}</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Phone className="h-4 w-4 shrink-0 text-[#EFB80D]" />
                        <span>{activeBranch.phone}</span>
                      </li>
                    </ul>

                    <div className="mt-5 grid grid-cols-3 gap-2">
                      <a
                        href={activeBranch.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Get directions to ${activeBranch.name} on Google Maps`}
                        className="btn-tactile-base btn-tactile-gold flex flex-col items-center justify-center gap-1 rounded-lg py-2.5 font-sans text-[10px] font-black sm:text-xs"
                      >
                        <Navigation className="h-3.5 w-3.5" />
                        <span>Directions</span>
                      </a>
                      <a
                        href={branchWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp ${activeBranch.name}`}
                        className="btn-tactile-base btn-tactile-dark flex flex-col items-center justify-center gap-1 rounded-lg py-2.5 font-sans text-[10px] font-bold hover:text-[#25D366] sm:text-xs"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>WhatsApp</span>
                      </a>
                      <a
                        href={`tel:${activeBranch.phone.replace(/\s/g, "")}`}
                        aria-label={`Call ${activeBranch.name}`}
                        className="btn-tactile-base btn-tactile-dark flex flex-col items-center justify-center gap-1 rounded-lg py-2.5 font-sans text-[10px] font-bold hover:text-white sm:text-xs"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        <span>Call</span>
                      </a>
                    </div>
                  </GlassCard>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <motion.div variants={item} className="mt-10 sm:mt-12">
          <StatLedger stats={LOCATION_STATS} />
        </motion.div>
      </SectionMotion>
    </section>
  );
}
