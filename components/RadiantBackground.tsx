"use client";

import React from "react";

/**
 * RadiantBackground Component
 * Adds an ultra-premium, high-performance ambient magical background glow effect
 * behind all SPA content, contrasting Captain Gold, Aegean Teal, and Damascus Rose
 * against the deep warm dark theme.
 */
export default function RadiantBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full overflow-hidden bg-[#030303]"
    >
      {/* 1. Hero Golden Sunburst Radiant (Top Left) */}
      <div
        className="animate-radiant-pulse absolute -top-[10%] -left-[10%] h-[600px] w-[600px] sm:h-[800px] sm:w-[800px] rounded-full opacity-35 blur-[120px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(239,184,13,0.45) 0%, rgba(224,83,68,0.15) 50%, rgba(5,5,5,0) 80%)",
        }}
      />

      {/* 2. Top Right Damascus Rose Spark Aura */}
      <div
        className="animate-radiant-float-1 absolute -top-[5%] -right-[15%] h-[550px] w-[550px] sm:h-[700px] sm:w-[700px] rounded-full opacity-25 blur-[140px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(224,83,68,0.35) 0%, rgba(239,184,13,0.1) 60%, rgba(3,3,3,0) 80%)",
        }}
      />

      {/* 3. Middle Aegean Teal & Gold Oasis Glow (Center Viewport) */}
      <div
        className="animate-radiant-float-2 absolute top-[35%] left-[20%] h-[700px] w-[700px] sm:h-[900px] sm:w-[900px] rounded-full opacity-30 blur-[160px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(35,155,175,0.3) 0%, rgba(239,184,13,0.2) 45%, rgba(5,5,5,0) 75%)",
        }}
      />

      {/* 4. Lower Mid Damascus Rose Accent Orb */}
      <div
        className="animate-radiant-float-1 absolute top-[60%] -right-[10%] h-[600px] w-[600px] sm:h-[750px] sm:w-[750px] rounded-full opacity-25 blur-[150px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(224,83,68,0.3) 0%, rgba(35,155,175,0.15) 50%, rgba(3,3,3,0) 80%)",
        }}
      />

      {/* 5. Bottom Branch & Map Warm Copper/Gold Hearth Glow */}
      <div
        className="animate-radiant-pulse absolute -bottom-[15%] left-[15%] h-[700px] w-[700px] sm:h-[950px] sm:w-[950px] rounded-full opacity-35 blur-[150px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(239,184,13,0.4) 0%, rgba(36,21,9,0.5) 60%, rgba(3,3,3,0) 85%)",
        }}
      />

      {/* 6. Subtle Micro-Grid Ambient Texture & Vignette */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(rgba(239, 184, 13, 0.4) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* 7. Soft Vignette Framing */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 40%, rgba(3,3,3,0.7) 100%)",
        }}
      />
    </div>
  );
}
