import React from "react";
import KunafaExplodeCanvas from "@/components/KunafaExplodeCanvas";
import CaptainsChart from "@/components/CaptainsChart";
import MenuPreview from "@/components/MenuPreview";
import ShipsLog from "@/components/ShipsLog";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#030303]">
      {/* 1. Core Sticky Kunafa Explode Canvas (400vh) */}
      <KunafaExplodeCanvas />

      {/* 2. The Captain's Chart (Animated SVG Route across 5 Outposts) */}
      <CaptainsChart />

      {/* 3. Menu Best Sellers Preview */}
      <MenuPreview />

      {/* 4. Ship's Log Reviews */}
      <ShipsLog />
    </main>
  );
}
