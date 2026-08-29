import React from "react";
import Link from "next/link";
import Image from "next/image";

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
    sm: "w-8 h-10",
    md: "w-10 h-12",
    lg: "w-14 h-16",
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
      {/* Official Captain Kunafa Mascot Logo */}
      <Image
        src="/logo.png"
        alt="Captain Kunafa Mascot"
        width={48}
        height={58}
        className={`${iconSizes} object-contain shrink-0 group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_2px_10px_rgba(239,184,13,0.35)]`}
      />

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
