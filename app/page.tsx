import React from "react";
import KunafaExplodeCanvas from "@/components/KunafaExplodeCanvas";
import CaptainsChart from "@/components/CaptainsChart";
import MenuPreview from "@/components/MenuPreview";
import ShipsLog from "@/components/ShipsLog";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#FFF8EC]">
      {/* 1. Scrollytelling hero — 400vh canvas with text overlays */}
      <section id="story">
        <KunafaExplodeCanvas />
      </section>

      {/* 2. Craft — Captain's Chart (SVG animated route) */}
      <section id="craft">
        <CaptainsChart />
      </section>

      {/* 3. Menu — Brand showcase (no ordering) */}
      <section id="menu">
        <MenuPreview />
      </section>

      {/* 4. Reviews */}
      <section id="franchise">
        <ShipsLog />
      </section>
    </main>
  );
}
