import React from "react";

interface BrandNameProps {
  className?: string;
  children?: React.ReactNode;
}

export default function BrandName({
  className = "",
  children,
}: BrandNameProps) {
  return (
    <span className={`font-brand tracking-wider ${className}`}>
      {children || "Captain Kunafa"}
    </span>
  );
}
