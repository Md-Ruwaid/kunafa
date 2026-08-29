import React from "react";
import Link from "next/link";
import { Compass } from "lucide-react";

interface WordmarkProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showSubtitle?: boolean;
}

export default function Wordmark({
  size = "md",
  className = "",
  showSubtitle = true,
}: WordmarkProps) {
  const iconSizes = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-base",
    lg: "w-12 h-12 text-xl",
  }[size];

  const titleSizes = {
    sm: "text-base",
    md: "text-lg sm:text-xl",
    lg: "text-2xl sm:text-3xl",
  }[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-[#EFB80D] focus-visible:outline-offset-2 rounded-lg p-1 ${className}`}
    >
      {/* Compass Mark */}
      <div
        className={`${iconSizes} rounded-full bg-[#1C120C] border border-[#EFB80D]/40 flex items-center justify-center text-[#EFB80D] shadow-[0_0_15px_rgba(239,184,13,0.2)] group-hover:border-[#EFB80D] group-hover:rotate-45 transition-all duration-500`}
      >
        <Compass className="w-5 h-5" />
      </div>

      {/* Wordmark */}
      <div className="flex flex-col">
        <span className={`font-display font-semibold text-white/95 leading-tight tracking-wide ${titleSizes}`}>
          CAPTAIN <span className="font-display italic font-semibold text-[#EFB80D]">KUNAFA</span>
        </span>
        {showSubtitle && (
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#C4B5A5] font-bold">
            ROYAL LEVANTINE ATELIER
          </span>
        )}
      </div>
    </Link>
  );
}
