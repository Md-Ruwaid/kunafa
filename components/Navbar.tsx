"use client";

import React, { useState } from "react";
import { Compass, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Story", href: "#story" },
  { label: "Craft", href: "#craft" },
  { label: "Menu", href: "#menu" },
  { label: "Franchise", href: "#franchise" },
  { label: "Catering", href: "#catering" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLink = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Wordmark */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EFB80D] focus-visible:outline-offset-2 rounded-lg"
        >
          <div className="w-9 h-9 rounded-full bg-[#FFF8EC] border border-[#EFB80D]/50 shadow flex items-center justify-center group-hover:border-[#EFB80D] transition-all duration-500">
            <Compass className="w-5 h-5 text-[#EFB80D] group-hover:rotate-45 transition-transform duration-500" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-semibold text-lg text-[#2B1B12] tracking-wide leading-tight">
              CAPTAIN <span className="italic text-[#EFB80D]">KUNAFA</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#7A6A5B]">
              ROYAL LEVANTINE ATELIER
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-white/80 border border-[#E7DCC9] px-5 py-2 rounded-full backdrop-blur-xl shadow-md">
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleLink(link.href)}
              className="font-sans text-xs uppercase tracking-wider px-4 py-2 rounded-full text-[#7A6A5B] hover:text-[#EFB80D] hover:bg-[#FFF8EC] transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EFB80D]"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-10 h-10 rounded-full bg-white border border-[#E7DCC9] text-[#2B1B12] flex items-center justify-center shadow backdrop-blur-xl cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EFB80D]"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-3 max-w-xs mx-auto bg-white border border-[#E7DCC9] rounded-2xl p-5 shadow-xl flex flex-col gap-2">
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleLink(link.href)}
              className="font-sans text-sm text-left px-4 py-3 rounded-xl text-[#2B1B12] hover:bg-[#FFF8EC] hover:text-[#EFB80D] transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
