import React from "react";

interface SwashAccentProps {
  children: React.ReactNode;
  color?: "gold" | "teal" | "crimson" | "terracotta";
  className?: string;
}

export default function SwashAccent({
  children,
  color = "gold",
  className = "",
}: SwashAccentProps) {
  let colorClass = "text-[#EFB80D]";
  if (color === "teal" || color === "terracotta") {
    colorClass = "text-[#239BAF]";
  } else if (color === "crimson") {
    colorClass = "text-[#E05344]";
  }

  return (
    <span
      className={`font-display italic font-semibold ${colorClass} ${className}`}
    >
      {children}
    </span>
  );
}
