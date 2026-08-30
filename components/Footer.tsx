"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUp,
  ChefHat,
  Leaf,
  MessageCircle,
  ShieldCheck,
  Timer,
} from "lucide-react";
import BrandName from "@/components/BrandName";
import {
  GlassCard,
  SectionAmbient,
  SectionArabesque,
  SectionMotion,
  useSectionReveal,
} from "@/components/SectionPrimitives";
import { buildWhatsAppLink, BRAND_PHONE_DISPLAY } from "@/lib/contact";
import { scrollToWithLenis } from "@/lib/lenis";

const QUICK_LINKS = [
  { label: "Home", href: "#story" },
  { label: "About Us", href: "#about" },
  { label: "Our Menu", href: "#menu" },
  { label: "Our Locations", href: "#locations" },
] as const;

const QUALITY_MANIFEST = [
  {
    icon: ShieldCheck,
    label: "Pure A2 Ghee",
    detail: "100% grass-fed clarified ghee — zero palm oil",
  },
  {
    icon: Timer,
    label: "18-Hour Cure",
    detail: "Cold-desalinated mountain Akawi & Nablusi curd",
  },
  {
    icon: Leaf,
    label: "Aleppo Pistachio",
    detail: "Raw first-harvest emerald green pistachios",
  },
  {
    icon: ChefHat,
    label: "Live Copper Press",
    detail: "Hand-pressed fresh on every single order",
  },
] as const;

const SEAL_TEXT =
  "CAPTAIN KUNAFA \u00B7 HYDERABAD \u00B7 AUTHENTIC LEVANTINE DESSERT HOUSE \u00B7 ";

export default function Footer() {
  const { ref, inView, container, item } = useSectionReveal();

  const scrollToTop = () => {
    scrollToWithLenis(0);
  };

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden border-t border-[#EFB80D]/25 bg-[#030303]/90 px-4 pb-10 pt-16 text-[#FFF8EC] backdrop-blur-xl sm:px-6 sm:pb-12 sm:pt-20 lg:px-8"
    >
      <SectionAmbient showEdgeSweep={false} glowPosition="center" />
      <SectionArabesque patternId="footer-arabesque" />

      <SectionMotion
        inView={inView}
        container={container}
        className="relative z-10 mx-auto w-full max-w-6xl"
      >
        {/* Top brand row */}
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 sm:gap-12 sm:pb-16 md:grid-cols-12">
          <motion.div variants={item} className="md:col-span-5">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-2 rounded-full bg-[radial-gradient(circle,rgba(239,184,13,0.2),transparent_70%)] blur-md"
                />
                <Image
                  src="/logo.png"
                  alt="Captain Kunafa"
                  width={52}
                  height={62}
                  className="relative h-12 w-auto shrink-0 object-contain drop-shadow-[0_4px_16px_rgba(239,184,13,0.35)] sm:h-16"
                />
              </div>
              <div>
                <BrandName className="text-lg text-white sm:text-xl">
                  CAPTAIN <span className="text-[#EFB80D]">KUNAFA</span>
                </BrandName>
                <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.24em] text-white/40 sm:text-[10px]">
                  Est. 2021 · Barkas, Hyderabad
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm font-sans text-sm leading-relaxed text-white/70">
              Hyderabad&apos;s premier authentic Levantine dessert brand. Founded
              by Saud bin Nasar Khulagi — hand-pressed on live copper pans
              across five city branches.
            </p>

            <div className="mt-5 space-y-1.5 font-mono text-[11px] text-white sm:text-xs">
              <div>
                CENTRAL HQ:{" "}
                <span className="text-[#EFB80D]">
                  BARKAS, HYDERABAD · 500005
                </span>
              </div>
              <div>
                HOTLINE:{" "}
                <span className="text-[#EFB80D]">{BRAND_PHONE_DISPLAY}</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="md:col-span-3">
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-white/50">
              Quick Links
            </h3>
            <ul className="space-y-2.5 font-sans text-sm text-white/75">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 py-0.5 transition-colors duration-200 hover:text-[#EFB80D]"
                  >
                    <span
                      aria-hidden
                      className="h-px w-0 bg-[#EFB80D] transition-all duration-200 group-hover:w-3"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={item} className="md:col-span-4">
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-white/50">
              Quality Manifest
            </h3>
            <ul className="space-y-3">
              {QUALITY_MANIFEST.map(({ icon: Icon, label, detail }) => (
                <li key={label} className="flex gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#EFB80D]/25 bg-[#EFB80D]/10">
                    <Icon className="h-3.5 w-3.5 text-[#EFB80D]" />
                  </span>
                  <span>
                    <span className="block font-sans text-sm font-bold text-white">
                      {label}
                    </span>
                    <span className="mt-0.5 block font-sans text-[12px] leading-relaxed text-white/55">
                      {detail}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* CTA band */}
        <motion.div variants={item} className="mt-10 sm:mt-12">
          <GlassCard className="flex flex-col items-center justify-between gap-6 p-6 sm:flex-row sm:p-8">
            <div className="text-center sm:text-left">
              <p className="font-display text-xl font-semibold text-white sm:text-2xl">
                Pressed fresh, served hot.
              </p>
              <p className="mt-1.5 font-sans text-sm text-white/60">
                Order from any branch via WhatsApp — we&apos;ll have it ready.
              </p>
            </div>
            <a
              href={buildWhatsAppLink(
                BRAND_PHONE_DISPLAY,
                "Hi Captain Kunafa! I'd like to order fresh kunafa."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile-base btn-tactile-gold inline-flex shrink-0 items-center gap-2 rounded-lg px-6 py-2.5 font-sans text-xs font-bold"
            >
              <MessageCircle className="h-3.5 w-3.5 text-[#000000]" />
              <span>Order on WhatsApp</span>
            </a>
          </GlassCard>
        </motion.div>

        {/* Bottom bar with seal */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row"
        >
          <div className="text-center font-mono text-[10px] text-white/45 sm:text-left sm:text-xs">
            © {new Date().getFullYear()}{" "}
            <BrandName className="text-white/65">CAPTAIN KUNAFA</BrandName>.
            ALL RIGHTS RESERVED. HYDERABAD, INDIA.
          </div>

          <div className="flex items-center gap-5">
            {/* Mini seal */}
            <div aria-hidden className="relative hidden h-14 w-14 sm:block">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <defs>
                  <path
                    id="footer-seal-path"
                    d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  />
                </defs>
                <g className="about-seal-rotate">
                  <text
                    className="font-mono"
                    fill="#EFB80D"
                    fontSize="7.5"
                    letterSpacing="1.4"
                    opacity="0.7"
                  >
                    <textPath href="#footer-seal-path" startOffset="0">
                      {SEAL_TEXT}
                    </textPath>
                  </text>
                </g>
                <circle
                  cx="50"
                  cy="50"
                  r="20"
                  fill="none"
                  stroke="#EFB80D"
                  strokeOpacity="0.35"
                />
              </svg>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-[#EFB80D]/25 bg-[#EFB80D]/10 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#EFB80D] transition-colors duration-200 hover:border-[#EFB80D]/50 hover:bg-[#EFB80D]/20 hover:text-white sm:text-xs"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      </SectionMotion>
    </footer>
  );
}
