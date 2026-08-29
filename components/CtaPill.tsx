"use client";

import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

interface CtaPillProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  withPulse?: boolean;
  icon?: boolean;
}

export default function CtaPill({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className = "",
  withPulse = true,
  icon = true,
}: CtaPillProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  }[size];

  const variantClasses = {
    primary: `bg-[#EFB80D] hover:bg-[#ffc926] text-[#2B1B12] font-semibold ${
      withPulse ? "animate-pulse-gold" : ""
    } shadow-[0_0_20px_rgba(239,184,13,0.3)] hover:scale-105 active:scale-95`,
    ghost:
      "bg-transparent hover:bg-white/5 text-white/80 hover:text-[#EFB80D] border border-white/15 hover:border-[#EFB80D]/40",
    secondary:
      "bg-[#241509] hover:bg-[#2B1B12] text-[#EFB80D] border border-[#EFB80D]/30 hover:border-[#EFB80D]",
  }[variant];

  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-full font-sans tracking-wide transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EFB80D] focus-visible:outline-offset-2 ${sizeClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses} onClick={onClick}>
        {icon && variant === "primary" && <Sparkles className="w-4 h-4 shrink-0 text-[#2B1B12]" />}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClasses}>
      {icon && variant === "primary" && <Sparkles className="w-4 h-4 shrink-0 text-[#2B1B12]" />}
      <span>{children}</span>
    </button>
  );
}
