import React from "react";
import KunafaExplodeCanvas from "@/components/KunafaExplodeCanvas";
import AboutSection from "@/components/AboutSection";
import CaptainsChart from "@/components/CaptainsChart";
import MenuPreview from "@/components/MenuPreview";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#050505]">
      {/* Floating WhatsApp Quick Action */}
      <WhatsAppButton />

      {/* 1. Scrollytelling Voyage Canvas */}
      <section id="story" className="relative">
        <KunafaExplodeCanvas />
      </section>

      {/* 2. About Us — Pops in directly after the voyage scroll */}
      <section id="about">
        <AboutSection />
      </section>

      {/* 3. The Captain's Chart — Hyderabad Branches */}
      <section id="locations">
        <CaptainsChart />
      </section>

      {/* 4. The Artisanal Platters Menu */}
      <section id="menu">
        <MenuPreview />
      </section>
    </main>
  );
}
