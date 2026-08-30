import React from "react";
import KunafaExplodeCanvas from "@/components/KunafaExplodeCanvas";
import AboutSection from "@/components/AboutSection";
import MenuPreview from "@/components/MenuPreview";
import CaptainsChart from "@/components/CaptainsChart";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#050505]">
      {/* 1. Scrollytelling Voyage Canvas */}
      <section id="story" className="relative">
        <KunafaExplodeCanvas />
      </section>

      {/* 2. About Us */}
      <section id="about">
        <AboutSection />
      </section>

      {/* 3. The Artisanal Platters Menu */}
      <section id="menu">
        <MenuPreview />
      </section>

      {/* 4. The Captain's Chart — Hyderabad Branches */}
      <section id="locations">
        <CaptainsChart />
      </section>
    </main>
  );
}

