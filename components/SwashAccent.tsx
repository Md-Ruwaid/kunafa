import React from "react";

interface SwashAccentProps {
  children: React.ReactNode;
  color?: "terracotta" | "gold";
  className?: string;
}

export default function SwashAccent({
  children,
  color = "terracotta",
  className = "",
}: SwashAccentProps) {
  const colorClass =
    color === "gold" ? "text-[#EFB80D]" : "text-[#DA7034]";

  return (
    <span
      className={`font-display italic font-semibold ${colorClass} ${className}`}
    >
      {children}
    </span>
  );
}
