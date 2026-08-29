"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import KunafaExplodeCanvas from "@/components/KunafaExplodeCanvas";
import AnatomySection from "@/components/AnatomySection";
import FlavorRadar from "@/components/FlavorRadar";
import OrderModal from "@/components/OrderModal";
import Footer from "@/components/Footer";

export default function Home() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#030303] text-white selection:bg-[#EFB80D]/30 selection:text-[#EFB80D] overflow-x-hidden">
      {/* 1. Glassmorphism Top Navigation */}
      <Navbar
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
        onScrollToSection={scrollToSection}
      />

      {/* 2. Core Sticky Scrollytelling Canvas (400vh) */}
      <section id="voyage" className="relative w-full">
        <KunafaExplodeCanvas
          onOpenOrderModal={() => setIsOrderModalOpen(true)}
          onExploreAnatomy={() => scrollToSection("anatomy")}
        />
      </section>

      {/* 3. Interactive Deconstructed Anatomy (4 Pillars) */}
      <AnatomySection />

      {/* 4. Tasting Laboratory & Thermal Timeline */}
      <FlavorRadar />

      {/* 5. Luxury Atelier Footer & Secret Batch Dispatch */}
      <Footer onOpenOrderModal={() => setIsOrderModalOpen(true)} />

      {/* 6. VIP Tasting Box Reservation Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </main>
  );
}
