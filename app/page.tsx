import React from "react";
import dynamic from "next/dynamic";
import SitePreloader from "@/components/SitePreloader";
import KunafaExplodeCanvas from "@/components/KunafaExplodeCanvas";
import AboutSection from "@/components/AboutSection";

// Dynamically split heavy below-the-fold 3D/Map chunks to eliminate initial JS execution delay
const MenuPreview = dynamic(() => import("@/components/MenuPreview"), {
  ssr: true,
  loading: () => (
    <section className="py-20 px-4 bg-[#050505] min-h-[400px] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#EFB80D] border-t-transparent animate-spin" />
    </section>
  ),
});

const CaptainsChart = dynamic(() => import("@/components/CaptainsChart"), {
  ssr: true,
  loading: () => (
    <section className="py-20 px-4 bg-[#050505] min-h-[500px] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#EFB80D] border-t-transparent animate-spin" />
    </section>
  ),
});

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
      <div className="cv-auto-section">
        <MenuPreview />
      </div>

      {/* 4. The Captain's Chart — Hyderabad Branches */}
      <div className="cv-auto-section">
        <CaptainsChart />
      </div>
    </main>
  );
}
