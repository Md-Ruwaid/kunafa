import React from "react";
import KunafaExplodeCanvas from "@/components/KunafaExplodeCanvas";
import AboutSection from "@/components/AboutSection";
import CaptainsChart from "@/components/CaptainsChart";
import MenuPreview from "@/components/MenuPreview";
import FranchiseSection from "@/components/FranchiseSection";
import CateringSection from "@/components/CateringSection";
import ShipsLog from "@/components/ShipsLog";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#FFF8EC]">
      {/* Floating WhatsApp CTA */}
      <WhatsAppButton />

      {/* 1. Scrollytelling Hero — canvas animation with text overlays */}
      <section id="story">
        <KunafaExplodeCanvas />
      </section>

      {/* 2. About / Founder Story */}
      <section id="about">
        <AboutSection />
      </section>

      {/* 3. Locations — 5 Hyderabad Outposts */}
      <section id="craft">
        <CaptainsChart />
      </section>

      {/* 4. Menu — Categorised with pricing */}
      <section id="menu">
        <MenuPreview />
      </section>

      {/* 5. Franchise — Investment tiers + full value props + inquiry form */}
      <FranchiseSection />

      {/* 6. Catering — Packages + booking form */}
      <CateringSection />

      {/* 7. Reviews — 6 real Hyderabad outlets */}
      <section id="reviews">
        <ShipsLog />
      </section>
    </main>
  );
}
