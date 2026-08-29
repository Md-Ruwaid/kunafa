"use client";

import React, { useState } from "react";
import { Sparkles, Volume2, VolumeX, Menu, X, ShieldCheck } from "lucide-react";
import { audio } from "@/lib/audio";

interface NavbarProps {
  onOpenOrderModal: () => void;
  onScrollToSection: (id: string) => void;
}

export default function Navbar({ onOpenOrderModal, onScrollToSection }: NavbarProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const unmuted = audio.toggleMute();
    setIsMuted(!unmuted);
  };

  const navLinks = [
    { label: "VOYAGE", id: "voyage" },
    { label: "ANATOMY", id: "anatomy" },
    { label: "ALCHEMY", id: "alchemy" },
    { label: "TASTING LAB", id: "tasting" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-4 sm:px-8 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand Logo */}
        <button
          onClick={() => {
            audio.playChime(520);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-[#EFB80D]/10 border border-[#EFB80D]/30 flex items-center justify-center group-hover:border-[#EFB80D] transition-colors shadow-[0_0_15px_rgba(239,184,13,0.15)]">
            <span className="font-display font-bold text-lg text-[#EFB80D]">C</span>
          </div>
          <div>
            <div className="font-display font-semibold text-lg text-white/95 tracking-wide flex items-center gap-1.5">
              <span>CAPTAIN</span>
              <span className="accent-italic text-sm">KUNAFA</span>
            </div>
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
              ROYAL ATELIER
            </div>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0a0a0a]/80 border border-white/10 px-5 py-2 rounded-full backdrop-blur-xl shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                audio.playChime(440);
                onScrollToSection(link.id);
              }}
              className="font-mono text-xs text-white/60 hover:text-[#EFB80D] px-3.5 py-1.5 rounded-full transition-colors uppercase tracking-wider cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          {/* Live Batch Indicator */}
          <div className="hidden lg:flex items-center gap-2 bg-[#0a0a0a]/80 border border-white/10 px-3.5 py-2 rounded-full backdrop-blur-xl font-mono text-[11px] text-white/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-white/40">BATCH:</span>
            <span className="text-[#EFB80D] font-medium">#084 READY</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="w-10 h-10 rounded-full bg-[#0a0a0a]/80 border border-white/10 hover:border-[#EFB80D]/40 flex items-center justify-center text-white/60 hover:text-[#EFB80D] backdrop-blur-xl transition-all cursor-pointer"
            title={isMuted ? "Unmute sound" : "Mute sound"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-white/40" /> : <Volume2 className="w-4 h-4 text-[#EFB80D]" />}
          </button>

          {/* Reserve CTA */}
          <button
            onClick={() => {
              audio.playChime(659);
              onOpenOrderModal();
            }}
            className="hidden sm:flex items-center gap-2 bg-[#EFB80D] hover:bg-[#ffc926] text-[#030303] font-sans font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-[0_0_20px_rgba(239,184,13,0.3)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>RESERVE</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-[#0a0a0a]/80 border border-white/10 flex items-center justify-center text-white/80 backdrop-blur-xl cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-sm mx-auto bg-[#0a0a0a]/95 border border-white/15 rounded-2xl p-5 backdrop-blur-2xl shadow-2xl pointer-events-auto flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                audio.playChime(440);
                onScrollToSection(link.id);
                setMobileMenuOpen(false);
              }}
              className="font-mono text-xs text-left text-white/70 hover:text-[#EFB80D] px-3 py-2 rounded-lg hover:bg-white/5 uppercase tracking-wider"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="font-mono text-[10px] text-white/40">BATCH #084 LIVE</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="bg-[#EFB80D] text-[#030303] font-semibold text-xs px-4 py-2 rounded-full"
            >
              RESERVE BATCH
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
