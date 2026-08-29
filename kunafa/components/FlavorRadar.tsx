"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Flame, Thermometer, Sparkles, CheckCircle2, Clock } from "lucide-react";
import { audio } from "@/lib/audio";

export default function FlavorRadar() {
  const [activeMetric, setActiveMetric] = useState(0);

  const metrics = [
    {
      name: "Acoustic Snap",
      value: 96,
      display: "48 dB",
      desc: "Ultra-fine kataifi micro-threads roasted with clarified ghee to deliver maximum soundwave resonance on first fork cut.",
    },
    {
      name: "Molten Tensile Stretch",
      value: 98,
      display: "45 cm",
      desc: "Desalinated mountain Akawi curd formulated for continuous unbroken cheese elasticity when lifted hot.",
    },
    {
      name: "Brix Sweetness Balance",
      value: 84,
      display: "64° Brix",
      desc: "Attar reduction infused with natural citrus blossom and cane honey, balanced to never overwhelm the savory cheese core.",
    },
    {
      name: "Thermal Heat Retention",
      value: 92,
      display: "22 Mins",
      desc: "Retains optimum 60°C core melting temperature inside cast iron serving platters.",
    },
  ];

  return (
    <section id="alchemy" className="relative py-28 px-4 sm:px-8 bg-[#030303] text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Tasting Lab Info */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#EFB80D] bg-[#EFB80D]/10 border border-[#EFB80D]/20 px-4 py-1.5 rounded-full mb-6 w-fit">
              <Activity className="w-3.5 h-3.5" />
              <span>THE TASTING LABORATORY</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-white/95 leading-tight mb-6">
              Precision Engineering in Every <span className="accent-italic">Bite</span>
            </h2>

            <p className="font-sans text-white/60 text-base leading-relaxed mb-8">
              We do not treat Kunafa as simple pastry. We calibrate thermodynamics, acoustic snap frequencies, 
              and viscoelastic cheese rheology to produce a transcendent multi-sensory spectacle.
            </p>

            {/* Interactive Metric Selectors */}
            <div className="flex flex-col gap-3">
              {metrics.map((m, idx) => {
                const isActive = activeMetric === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      audio.playChime(480 + idx * 60);
                      setActiveMetric(idx);
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#111111] border-[#EFB80D]/80 shadow-[0_0_20px_rgba(239,184,13,0.12)]"
                        : "bg-white/[0.02] border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-display font-medium text-white/90 text-sm sm:text-base">
                        {m.name}
                      </span>
                      <span className="font-mono text-sm font-semibold text-[#EFB80D]">
                        {m.display}
                      </span>
                    </div>

                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-2">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#DA7034] to-[#EFB80D]"
                        initial={{ width: 0 }}
                        animate={{ width: `${m.value}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>

                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="font-sans text-xs text-white/60 pt-1"
                      >
                        {m.desc}
                      </motion.p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Thermal Curve & Quality Seals */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Timeline Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <div className="flex items-center gap-2 font-mono text-xs text-white/70">
                  <Thermometer className="w-4 h-4 text-[#EFB80D]" />
                  <span>THERMAL SERVING CURVE</span>
                </div>
                <span className="font-mono text-xs text-[#EFB80D]">OPTIMUM AT 62°C</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#DA7034]/20 border border-[#DA7034] flex items-center justify-center shrink-0 font-mono text-xs text-[#DA7034]">
                    01
                  </div>
                  <div>
                    <div className="font-mono text-xs text-[#DA7034] font-medium">205°C — ROAST EXTRACTION</div>
                    <div className="text-xs text-white/60">Copper platter searing seals the golden butter shell.</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#EFB80D]/20 border border-[#EFB80D] flex items-center justify-center shrink-0 font-mono text-xs text-[#EFB80D]">
                    02
                  </div>
                  <div>
                    <div className="font-mono text-xs text-[#EFB80D] font-medium">85°C — ATTAR NECTAR CASCADE</div>
                    <div className="text-xs text-white/60">Blossom syrup is infused hot to crystallize the exterior.</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center shrink-0 font-mono text-xs text-emerald-400">
                    03
                  </div>
                  <div>
                    <div className="font-mono text-xs text-emerald-400 font-medium">62°C — PEAK ELASTICITY WINDOW</div>
                    <div className="text-xs text-white/60">Cheese core reaches supreme 45cm stretch for optimal dining.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Standard Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
                <CheckCircle2 className="w-5 h-5 text-[#EFB80D] mb-3" />
                <div>
                  <div className="font-display font-medium text-sm text-white/90 mb-1">100% Grass-Fed Ghee</div>
                  <div className="font-mono text-[10px] text-white/40">Pure clarified butter base</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
                <Sparkles className="w-5 h-5 text-[#DA7034] mb-3" />
                <div>
                  <div className="font-display font-medium text-sm text-white/90 mb-1">Single-Estate Pistachio</div>
                  <div className="font-mono text-[10px] text-white/40">Hand-crushed Aleppo grade</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
