import React from "react";

interface SwashAccentProps {
  children: React.ReactNode;
  color?: "gold";
  className?: string;
}

export default function SwashAccent({
  children,
  className = "",
}: SwashAccentProps) {
  return (
    <span
      className={`font-display italic font-semibold text-[#EFB80D] ${className}`}
    >
      {children}
    </span>
  );
}
