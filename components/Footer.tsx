"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Check, Compass, Shield, Heart } from "lucide-react";
import { audio } from "@/lib/audio";

interface FooterProps {
  onOpenOrderModal: () => void;
}

export default function Footer({ onOpenOrderModal }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    audio.playChime(600);
    setSubscribed(true);
  };

  return (
    <footer id="tasting" className="relative bg-[#030303] text-white border-t border-white/10 pt-20 pb-12 px-4 sm:px-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#EFB80D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top Callout Box */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#EFB80D]/20 mb-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-lg">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#EFB80D] mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>THE CAPTAIN’S TABLE</span>
            </div>
            <h3 className="font-display text-2xl sm:text-4xl font-semibold text-white/95 leading-tight mb-2">
              Ready for the Real <span className="accent-italic">Alchemy</span>?
            </h3>
            <p className="font-sans text-sm text-white/60">
              Limited to 100 copper platters per sunset service. Freshly baked, never reheated.
            </p>
          </div>

          <button
            onClick={() => {
              audio.playChime(700);
              onOpenOrderModal();
            }}
            className="shrink-0 flex items-center gap-3 bg-[#EFB80D] hover:bg-[#ffc926] text-[#030303] font-sans font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-[0_0_30px_rgba(239,184,13,0.3)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>RESERVE TODAY’S BATCH</span>
            <Sparkles className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Column Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#EFB80D]/10 border border-[#EFB80D]/30 flex items-center justify-center">
                <span className="font-display font-bold text-base text-[#EFB80D]">C</span>
              </div>
              <span className="font-display font-semibold text-lg text-white/95">
                CAPTAIN <span className="accent-italic">KUNAFA</span>
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-white/50 leading-relaxed mb-6">
              Reinventing royal Levantine dessert craftsmanship through acoustic thermodynamics, 
              single-estate botanicals, and zero-compromise ingredients.
            </p>
            <div className="font-mono text-[11px] text-white/40 space-y-1">
              <div>ORIGIN: 31.9522° N, 35.2332° E</div>
              <div>ATELIER DISPATCH: 17:00 — 23:00 GMT</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <div className="font-mono text-xs uppercase tracking-wider text-white/40 mb-4">
              VOYAGE
            </div>
            <ul className="space-y-2.5 font-mono text-xs text-white/70">
              <li><a href="#voyage" className="hover:text-[#EFB80D] transition-colors">01 / Explosion</a></li>
              <li><a href="#anatomy" className="hover:text-[#EFB80D] transition-colors">02 / Anatomy</a></li>
              <li><a href="#alchemy" className="hover:text-[#EFB80D] transition-colors">03 / Lab Specs</a></li>
              <li><a href="#tasting" className="hover:text-[#EFB80D] transition-colors">04 / Tasting Box</a></li>
            </ul>
          </div>

          {/* Standards */}
          <div className="md:col-span-2">
            <div className="font-mono text-xs uppercase tracking-wider text-white/40 mb-4">
              STANDARDS
            </div>
            <ul className="space-y-2.5 font-mono text-xs text-white/70">
              <li className="flex items-center gap-1.5"><Shield className="w-3 h-3 text-[#EFB80D]" /> Grass-Fed Ghee</li>
              <li className="flex items-center gap-1.5"><Shield className="w-3 h-3 text-[#EFB80D]" /> Mountain Akawi</li>
              <li className="flex items-center gap-1.5"><Shield className="w-3 h-3 text-[#EFB80D]" /> Damascus Attar</li>
              <li className="flex items-center gap-1.5"><Shield className="w-3 h-3 text-[#EFB80D]" /> Aleppo G1 Crop</li>
            </ul>
          </div>

          {/* Newsletter / Secret Dispatch */}
          <div className="md:col-span-4">
            <div className="font-mono text-xs uppercase tracking-wider text-white/40 mb-4">
              SECRET BATCH DISPATCH
            </div>
            <p className="font-sans text-xs text-white/50 mb-3">
              Receive private notifications 15 minutes before seasonal Aleppo harvest platters go live.
            </p>

            {!subscribed ? (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter captain email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#EFB80D] grow font-mono"
                />
                <button
                  type="submit"
                  className="bg-[#EFB80D] hover:bg-[#ffc926] text-[#030303] px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="p-3 rounded-xl bg-[#EFB80D]/10 border border-[#EFB80D]/30 flex items-center gap-2 font-mono text-xs text-[#EFB80D]">
                <Check className="w-4 h-4" />
                <span>VOYAGER SUBSCRIBED</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-white/40">
          <div>
            © {new Date().getFullYear()} CAPTAIN KUNAFA ATELIER. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>TERMS OF VOYAGE</span>
            <span>PRIVACY PROTOCOL</span>
            <span className="text-[#EFB80D]">EST. 2024</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
