"use client";

import React, { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

export function useSectionReveal() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
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
      transition: {
        duration: reduceMotion ? 0.2 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return { ref, inView, container, item };
}

export function SectionAmbient({
  showEdgeSweep = true,
  glowPosition = "center",
}: {
  showEdgeSweep?: boolean;
  glowPosition?: "center" | "left" | "right";
}) {
  const glowClass =
    glowPosition === "left"
      ? "-top-32 -left-24"
      : glowPosition === "right"
        ? "-top-32 -right-24"
        : "-top-40 left-1/2 -translate-x-1/2";

  return (
    <>
      {showEdgeSweep && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden"
        >
          <div className="about-edge-sweep h-px w-1/3" />
        </div>
      )}
      <div
        aria-hidden
        className={`pointer-events-none absolute ${glowClass} h-[480px] w-[760px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(239,184,13,0.14),transparent_65%)] blur-2xl`}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-20 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(35,155,175,0.1),transparent_68%)] blur-2xl"
      />
    </>
  );
}

export function SectionArabesque({ patternId }: { patternId: string }) {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
    >
      <defs>
        <pattern
          id={patternId}
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
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5 sm:mb-7">
      <span className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#EFB80D]/60" />
      <span className="font-mono text-[9.5px] sm:text-[11px] uppercase tracking-[0.32em] text-[#EFB80D]">
        {children}
      </span>
      <span className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#EFB80D]/60" />
    </div>
  );
}

export function SectionMotion({
  inView,
  container,
  className = "",
  children,
}: {
  inView: boolean;
  container: Variants;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function GlassCard({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}

export function StatLedger({
  stats,
}: {
  stats: readonly { value: string; label: string }[];
}) {
  return (
    <dl className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
      {stats.map(({ value, label }) => (
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
    </dl>
  );
}
