"use client";

import React, { useState, useEffect } from "react";
import { Compass, Menu, X, Phone, Anchor } from "lucide-react";
import { ShipHelm } from "@/components/NauticalElements";

const navLinks = [
  { label: "Voyage", href: "#story" },
  { label: "The Story", href: "#about" },
  { label: "5 Branches", href: "#locations" },
  { label: "Platters", href: "#menu" },
  { label: "Logbook", href: "#reviews" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on Esc key or resize
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handleLink = (href: string) => {
    setMobileOpen(false);
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: string) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(href);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-2.5 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-300 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full ${
          scrolled
            ? "bg-white/95 border border-[#E7DCC9] shadow-[0_8px_30px_rgba(43,27,18,0.08)] backdrop-blur-xl"
            : "bg-white/75 border border-[#E7DCC9]/70 backdrop-blur-md"
        }`}
      >
        {/* Wordmark with Nautical Helm */}
        <button
          type="button"
          onClick={() => {
            setMobileOpen(false);
            const lenis = (window as unknown as { lenis?: { scrollTo: (n: number) => void } }).lenis;
            if (lenis) lenis.scrollTo(0);
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EFB80D] rounded-lg text-left"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FFF8EC] border-2 border-[#EFB80D] shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shrink-0">
            <ShipHelm size={18} className="text-[#DA7034] group-hover:rotate-45 transition-transform duration-700 sm:w-[22px] sm:h-[22px]" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-base sm:text-lg text-[#2B1B12] tracking-wide leading-tight">
              CAPTAIN <span className="italic font-semibold text-[#DA7034]">KUNAFA</span>
            </span>
            <span className="font-mono text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.2em] text-[#7A6A5B]">
              HYDERABAD · EST. 2021
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleLink(link.href)}
              className="font-sans text-xs uppercase tracking-wider px-3.5 py-2 rounded-full text-[#7A6A5B] hover:text-[#DA7034] hover:bg-[#FFF8EC] transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EFB80D]"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Header Right: WhatsApp Order CTA + Mobile Toggle */}
        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/919000000000?text=Hi%20Captain%20Kunafa!%20I'd%20like%20to%20order%20fresh%20kunafa."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20b858] text-white font-sans font-semibold text-xs px-3.5 py-2 rounded-full shadow-sm hover:shadow-md transition-all hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#EFB80D]"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 rounded-full bg-[#FFF8EC] border border-[#E7DCC9] text-[#2B1B12] flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EFB80D]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Backdrop & Drawer */}
      {mobileOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-40 bg-[#2B1B12]/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="md:hidden relative z-50 mt-2.5 max-w-xs sm:max-w-sm mx-auto bg-white border-2 border-[#E7DCC9] rounded-[20px] p-4 shadow-2xl flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => handleLink(link.href)}
                className="font-sans text-sm font-medium text-left px-4 py-3 rounded-xl text-[#2B1B12] hover:bg-[#FFF8EC] hover:text-[#DA7034] active:bg-[#FFF8EC] transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://wa.me/919000000000?text=Hi%20Captain%20Kunafa!%20I'd%20like%20to%20order%20fresh%20kunafa."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 bg-[#25D366] text-white font-sans font-bold text-xs py-3.5 rounded-xl shadow-md"
            >
              Order on WhatsApp
            </a>
          </div>
        </>
      )}
    </header>
  );
}
