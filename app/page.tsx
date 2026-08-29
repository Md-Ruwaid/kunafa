import React from "react";
import KunafaExplodeCanvas from "@/components/KunafaExplodeCanvas";
import AboutSection from "@/components/AboutSection";
import CaptainsChart from "@/components/CaptainsChart";
import MenuPreview from "@/components/MenuPreview";
import FranchiseSection from "@/components/FranchiseSection";
import CateringSection from "@/components/CateringSection";
import ShipsLog from "@/components/ShipsLog";
import WhatsAppButton from "@/components/WhatsAppButton";
import { WaveDivider } from "@/components/NauticalElements";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#FFF8EC]">
      {/* Floating WhatsApp Quick Action */}
      <WhatsAppButton />

      {/* 1. Scrollytelling Hero — 400vh Canvas with Alternating Text Acts */}
      <section id="story" className="relative">
        <KunafaExplodeCanvas />
        {/* Seamless Nautical Wave Transition from Dark Void to Cream Sea */}
        <div className="absolute -bottom-1 inset-x-0 z-30 pointer-events-none">
          <WaveDivider fill="#FFF8EC" />
        </div>
      </section>

      {/* 2. The Founder's Chronicle & Craft Heritage (Saud bin Nasar Khulagi) */}
      <section id="about">
        <AboutSection />
      </section>

      {/* 3. The Captain's Chart — 5 Hyderabad Outposts */}
      <section id="locations">
        <CaptainsChart />
      </section>

      {/* 4. The Artisanal Platters Menu with Category Filters & Pricing */}
      <section id="menu">
        <MenuPreview />
      </section>

      {/* 5. Franchise Partnership Fleet with 3 Tiers & WhatsApp Funnel */}
      <FranchiseSection />

      {/* 6. Live Copper Hearth Wedding & Event Catering */}
      <CateringSection />

      {/* 7. Ship's Logbook — 4.8★ Verified Google Reviews */}
      <section id="reviews">
        <ShipsLog />
      </section>
    </main>
  );
}
