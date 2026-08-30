"use client";

import React, { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ChefHat, Flame, Leaf, Quote, Timer } from "lucide-react";
import BrandName from "@/components/BrandName";

const MANIFEST = [
  {
    icon: Flame,
    label: "Copper Hearth",
    detail: "Hand-pressed live at 205°C for the signature snap",
  },
  {
    icon: Timer,
    label: "18-Hour Cure",
    detail: "Cold-desalinated mountain Akawi and Nablusi curd",
  },
  {
    icon: ChefHat,
    label: "Clarified Ghee",
    detail: "One hundred percent pure — never vegetable oil",
  },
  {
    icon: Leaf,
    label: "Aleppo Pistachio",
    detail: "First-harvest emerald kernels, hand-shelled",
  },
] as const;

const STATS = [
  { value: "2021", label: "Est. Barkas" },
  { value: "05", label: "Branches" },
  { value: "205°C", label: "Hearth Heat" },
  { value: "100%", label: "Pure Ghee" },
] as const;

const SEAL_TEXT = "CAPTAIN KUNAFA \u00B7 AUTHENTIC LEVANTINE DESSERT HOUSE \u00B7 ";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15% 0px" });
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.09,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
  };

  const item: Variants = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.2 : 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-30 -mt-[100vh] min-h-screen flex flex-col justify-center items-center py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#050505]/85 backdrop-blur-xl text-[#FFF8EC] rounded-t-2xl sm:rounded-t-3xl border-t-2 border-[#EFB80D]/40 shadow-[0_-50px_120px_rgba(0,0,0,0.8)] overflow-hidden"
    >
      {/* Ambient layers ---------------------------------------------------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden"
      >
        <div className="about-edge-sweep h-px w-1/3" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(239,184,13,0.16),transparent_65%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -right-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(35,155,175,0.12),transparent_68%)] blur-2xl"
      />

      {/* Levantine eight-point tessellation */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
      >
        <defs>
          <pattern
            id="about-arabesque"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="14"
              y="14"
              width="28"
              height="28"
              fill="none"
              stroke="#EFB80D"
              strokeWidth="1"
            />
            <rect
              x="14"
              y="14"
              width="28"
              height="28"
              fill="none"
              stroke="#EFB80D"
              strokeWidth="1"
              transform="rotate(45 28 28)"
            />
            <circle cx="28" cy="28" r="2" fill="#EFB80D" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#about-arabesque)" />
      </svg>

      {/* Drawer handle — signals the panel sliding over the voyage canvas */}
      <div
        aria-hidden
        className="absolute top-3 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-[#EFB80D]/70 to-transparent"
      />

      {/* Content ----------------------------------------------------------- */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10 w-full max-w-6xl mx-auto my-auto"
      >
        {/* Eyebrow */}
        <motion.div
          variants={item}
          className="flex items-center justify-center gap-3 sm:gap-4 mb-5 sm:mb-7"
        >
          <span className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#EFB80D]/60" />
          <span className="font-mono text-[9.5px] sm:text-[11px] uppercase tracking-[0.32em] text-[#EFB80D]">
            Our Story
          </span>
          <span className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#EFB80D]/60" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          variants={item}
          className="font-display text-center text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white"
        >
          The House of{" "}
          <span className="block sm:inline">
            <BrandName className="about-gold-text" />
          </span>
        </motion.h2>

        <motion.p
          variants={item}
          className="mt-4 sm:mt-5 text-center font-mono text-[10px] sm:text-xs uppercase tracking-[0.28em] text-white/45"
        >
          Barkas &middot; Hyderabad &middot; Since 2021
        </motion.p>

        {/* Narrative + Manifest */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Narrative */}
          <motion.div variants={item} className="lg:col-span-7">
            <p className="font-display text-xl sm:text-2xl lg:text-[1.75rem] leading-snug text-white">
              Hyderabad&apos;s premier destination for authentic Middle Eastern
              and Levantine desserts.
            </p>

            <p className="mt-5 font-sans text-base sm:text-lg leading-relaxed text-white/75">
              <strong className="font-bold text-white">
                <BrandName />
              </strong>{" "}
              began on a single live copper hearth in Barkas. Every tray is
              still built the same way — time-honoured recipes, premium
              clarified ghee, and authentic mountain Akawi cheese, spun to order
              rather than held under glass.
            </p>

            <p className="mt-4 font-sans text-base sm:text-lg leading-relaxed text-white/60">
              From the original crisp to pistachio, Biscoff, and chocolate, our
              menu offers a refined dessert experience for every palate.
            </p>

            {/* Pull quote */}
            <figure className="relative mt-8 sm:mt-10 pl-6 sm:pl-8">
              <span
                aria-hidden
                className="absolute left-0 top-1 bottom-1 w-px bg-gradient-to-b from-[#EFB80D]/70 via-[#EFB80D]/25 to-transparent"
              />
              <Quote
                aria-hidden
                className="absolute -left-1 -top-3 h-6 w-6 text-[#EFB80D]/30"
              />
              <blockquote className="font-display italic font-semibold text-xl sm:text-2xl lg:text-3xl leading-snug text-[#EFB80D]">
                Authentic Middle Eastern desserts, crafted with uncompromising
                quality and passion.
              </blockquote>
              <figcaption className="mt-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-white/40">
                The Captain&apos;s Promise
              </figcaption>
            </figure>
          </motion.div>

          {/* Craft manifest card */}
          <motion.div variants={item} className="lg:col-span-5">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-7 shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-md">
              {/* Rotating wax seal */}
              <div
                aria-hidden
                className="absolute -top-9 -right-6 hidden h-24 w-24 sm:block"
              >
                <div className="absolute inset-0 rounded-full bg-[#050505] shadow-[0_0_0_1px_rgba(239,184,13,0.35),0_10px_30px_rgba(0,0,0,0.6)]" />
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                  <defs>
                    <path
                      id="about-seal-path"
                      d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    />
                  </defs>
                  <g className="about-seal-rotate">
                    <text
                      className="font-mono"
                      fill="#EFB80D"
                      fontSize="8.5"
                      letterSpacing="1.6"
                    >
                      <textPath href="#about-seal-path" startOffset="0">
                        {SEAL_TEXT}
                      </textPath>
                    </text>
                  </g>
                  <circle
                    cx="50"
                    cy="50"
                    r="26"
                    fill="none"
                    stroke="#EFB80D"
                    strokeOpacity="0.3"
                  />
                  <rect
                    x="36"
                    y="36"
                    width="28"
                    height="28"
                    fill="none"
                    stroke="#EFB80D"
                    strokeOpacity="0.55"
                  />
                  <rect
                    x="36"
                    y="36"
                    width="28"
                    height="28"
                    fill="none"
                    stroke="#EFB80D"
                    strokeOpacity="0.55"
                    transform="rotate(45 50 50)"
                  />
                </svg>
              </div>

              <h3 className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-white/50">
                Craft Manifest
              </h3>

              <ul className="mt-5 space-y-4">
                {MANIFEST.map(({ icon: Icon, label, detail }) => (
                  <li
                    key={label}
                    className="group flex gap-3.5 rounded-xl border border-transparent p-2.5 -mx-2.5 transition-colors duration-200 hover:border-[#EFB80D]/25 hover:bg-[#EFB80D]/[0.06]"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#EFB80D]/25 bg-[#EFB80D]/10 transition-colors duration-200 group-hover:border-[#EFB80D]/50">
                      <Icon className="h-4 w-4 text-[#EFB80D]" />
                    </span>
                    <span>
                      <span className="block font-sans text-sm font-bold text-white">
                        {label}
                      </span>
                      <span className="mt-0.5 block font-sans text-[13px] leading-relaxed text-white/60">
                        {detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Stat ledger */}
        <motion.dl
          variants={item}
          className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10"
        >
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="bg-[#050505]/85 px-4 py-5 sm:py-6 text-center"
            >
              <dt className="sr-only">{label}</dt>
              <dd>
                <span className="block font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#EFB80D]">
                  {value}
                </span>
                <span className="mt-1.5 block font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.22em] text-white/50">
                  {label}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
