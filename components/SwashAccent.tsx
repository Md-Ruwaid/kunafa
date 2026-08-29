import React from "react";

interface SwashAccentProps {
  children: React.ReactNode;
  color?: "gold" | "terracotta";
  className?: string;
}

export default function SwashAccent({
  children,
  color = "gold",
  className = "",
}: SwashAccentProps) {
  const colorClass =
    color === "terracotta" ? "text-[#DA7034]" : "text-[#EFB80D]";

  return (
    <span
      className={`font-display italic font-semibold ${colorClass} ${className}`}
    >
      {children}
    </span>
  );
}
