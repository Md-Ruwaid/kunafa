import React from "react";
import SitePreloader from "@/components/SitePreloader";
import KunafaExplodeCanvas from "@/components/KunafaExplodeCanvas";
import AboutSection from "@/components/AboutSection";
import MenuPreview from "@/components/MenuPreview";
import CaptainsChart from "@/components/CaptainsChart";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#050505]">
      {/* Global Site Loading Page (locks website until loading complete) */}
      <SitePreloader />

      {/* 1. Scrollytelling Voyage Canvas */}
      <KunafaExplodeCanvas />

      {/* 2. About Us */}
      <AboutSection />

      {/* 3. The Artisanal Platters Menu */}
      <MenuPreview />

      {/* 4. The Captain's Chart — Hyderabad Branches */}
      <CaptainsChart />
    </main>
  );
}
