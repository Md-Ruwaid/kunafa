"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Flame, Droplets, Sparkles, Award, Shield } from "lucide-react";
import { audio } from "@/lib/audio";

interface LayerData {
  id: string;
  step: string;
  name: string;
  accentWord: string;
  role: string;
  description: string;
  specs: { label: string; value: string }[];
  highlight: string;
  color: string;
  icon: typeof Flame;
}

const LAYERS: LayerData[] = [
  {
    id: "kataifi",
    step: "01",
    name: "Crispy Golden",
    accentWord: "Kataifi",
    role: "The Structural Crust",
    description:
      "Ultra-fine shredded wheat pastry spun by master artisans, drenched in clarified grass-fed ghee, and copper-pan roasted at 205°C to achieve our signature 48 dB acoustic snap.",
    specs: [
      { label: "Caramelization Temp", value: "205°C" },
      { label: "Acoustic Crispness", value: "48 dB Snap" },
      { label: "Fat Foundation", value: "A2 Clarified Ghee" },
      { label: "Pastry Strand Gauge", value: "0.4 mm Micro-thread" },
    ],
    highlight: "Crisped to acoustic perfection with zero sogginess.",
    color: "#EFB80D",
    icon: Flame,
  },
  {
    id: "cheese",
    step: "02",
    name: "Molten Akawi &",
    accentWord: "Nablusi",
    role: "The Elastic Heart",
    description:
      "A secret 70/30 equilibrium of fresh mountain Akawi and traditional brine-cured Nablusi cheese, continuously desalinated for 18 hours in cold filtered spring water to unlock velvet melt elasticity.",
    specs: [
      { label: "Desalination Cycle", value: "18 Hours Cold-Wash" },
      { label: "Cheese Tensile Pull", value: "45 cm Continuous Stretch" },
      { label: "Melting Point", value: "62°C Viscous Flow" },
      { label: "Salt Level", value: "< 0.4% Balanced Sweet" },
    ],
    highlight: "Unrivaled stretch and savory-sweet richness.",
    color: "#DA7034",
    icon: Droplets,
  },
  {
    id: "pistachio",
    step: "03",
    name: "First-Harvest Aleppo",
    accentWord: "Pistachio",
    role: "The Emerald Crown",
    description:
      "Early-harvest green pistachios picked in the cool dawn from ancient groves in Aleppo. Stone-ground into a textured crumble that provides rich nutty tannins against the sweet pastry.",
    specs: [
      { label: "Harvest Window", value: "August First-Crop" },
      { label: "Nut Color Index", value: "Vibrant Emerald G1" },
      { label: "Grind Particle Size", value: "1.5 mm Crushed" },
      { label: "Aroma Profile", value: "Toasted Floral Earth" },
    ],
    highlight: "Raw intensity and emerald visual brilliance.",
    color: "#4ade80",
    icon: Sparkles,
  },
  {
    id: "attar",
    step: "04",
    name: "Orange Blossom",
    accentWord: "Attar",
    role: "The Golden Infusion",
    description:
      "A low-temperature reduction of organic cane nectar infused with copper-distilled Damascus orange blossoms, wild lemon peel, and whole cardamom pods. Poured hot at the moment of serving.",
    specs: [
      { label: "Sugar Density", value: "64° Brix Optimal" },
      { label: "Floral Essence", value: "Distilled Citrus Blossom" },
      { label: "Infusion Time", value: "4 Hours Low-Simmer" },
      { label: "Serving Temperature", value: "85°C Flash Pour" },
    ],
    highlight: "Hydrates the crust while preserving supreme crunch.",
    color: "#EFB80D",
    icon: Award,
  },
];

export default function AnatomySection() {
  const [selectedLayerId, setSelectedLayerId] = useState<string>("kataifi");

  const currentLayer = LAYERS.find((l) => l.id === selectedLayerId) || LAYERS[0];

  return (
    <section id="anatomy" className="relative py-28 px-4 sm:px-8 bg-[#030303] text-white border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EFB80D]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#EFB80D] bg-[#EFB80D]/10 border border-[#EFB80D]/20 px-4 py-1.5 rounded-full mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>DISSECTED ANATOMY</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-white/95 leading-tight mb-4">
            The 4 Pillars of <span className="accent-italic">Alchemy</span>
          </h2>

          <p className="font-sans text-white/60 text-sm sm:text-base">
            Every layer in Captain Kunafa is engineered for contrasting temperature, acoustic crunch, and molten elasticity.
          </p>
        </div>

        {/* Layer Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {LAYERS.map((layer) => {
            const isSelected = layer.id === selectedLayerId;
            return (
              <button
                key={layer.id}
                onClick={() => {
                  audio.playChime(500 + LAYERS.indexOf(layer) * 80);
                  setSelectedLayerId(layer.id);
                }}
                className={`flex flex-col p-4 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? "bg-[#111111] border-[#EFB80D] shadow-[0_0_25px_rgba(239,184,13,0.15)]"
                    : "bg-[#080808] border-white/10 hover:border-white/20 hover:bg-[#0d0d0d]"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="font-mono text-xs text-white/40">{layer.step}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#EFB80D] animate-ping" />
                  )}
                </div>

                <div className="font-display font-semibold text-sm sm:text-base text-white/90 mb-1">
                  {layer.name} <span className="accent-italic">{layer.accentWord}</span>
                </div>

                <div className="font-mono text-[10px] text-white/50 uppercase tracking-wider">
                  {layer.role}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Layer Details Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLayer.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Story & Role */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#EFB80D]">
                    STAGE {currentLayer.step} OF 04
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="font-mono text-xs uppercase text-white/40">
                    {currentLayer.role}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-4xl font-semibold text-white/95 mb-4">
                  {currentLayer.name} <span className="accent-italic">{currentLayer.accentWord}</span>
                </h3>

                <p className="font-sans text-white/70 text-sm sm:text-base leading-relaxed mb-6">
                  {currentLayer.description}
                </p>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#EFB80D] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-mono text-xs uppercase tracking-wider text-white/50 mb-0.5">
                      CHEF’S BENCHMARK
                    </div>
                    <div className="text-sm text-white/90 font-medium">
                      {currentLayer.highlight}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: High-Precision Telemetry Grid */}
              <div className="lg:col-span-5 bg-[#070707] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#EFB80D] pb-3 border-b border-white/10 flex items-center justify-between">
                  <span>LAB MEASUREMENTS</span>
                  <span>ISO 9001 TASTE</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentLayer.specs.map((spec, i) => (
                    <div key={i} className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                      <div className="font-mono text-[10px] text-white/40 uppercase tracking-wider mb-1">
                        {spec.label}
                      </div>
                      <div className="font-mono text-sm font-semibold text-white/90">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between font-mono text-[11px] text-white/40">
                  <span>SAMPLE BATCH: #084-K</span>
                  <span className="text-emerald-400">PASSED QA</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
