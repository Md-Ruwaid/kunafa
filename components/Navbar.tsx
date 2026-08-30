"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import BrandName from "@/components/BrandName";
import { buildWhatsAppLink, BRAND_PHONE_DISPLAY } from "@/lib/contact";
import { scrollToWithLenis } from "@/lib/lenis";

const navLinks = [
  { label: "Home", href: "#story", id: "story" },
  { label: "About Us", href: "#about", id: "about" },
  { label: "Menu", href: "#menu", id: "menu" },
  { label: "Locations", href: "#locations", id: "locations" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("story");
  const storySectionRef = useRef<HTMLElement | null>(null);

  // Navbar background on scroll — always stays fixed at top
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile drawer is open (5.1)
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Keyboard and resize listeners
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

  // Track active section for nav highlighting
  useEffect(() => {
    const storyEl = document.getElementById("story");
    storySectionRef.current = storyEl;

    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const updateActiveSection = () => {
      const story = storySectionRef.current;
      if (!story) return;

      const storyBottom = story.offsetTop + story.offsetHeight;
      const scrollBottom = window.scrollY + window.innerHeight;

      // Keep Home active while inside the hero scrollytelling track
      if (scrollBottom < storyBottom - window.innerHeight * 0.15) {
        setActiveSection("story");
        return;
      }

      // Otherwise pick the section with the largest visible area
      let bestId = "story";
      let bestRatio = 0;

      for (const section of sections) {
        if (section.id === "story") continue;
        const rect = section.getBoundingClientRect();
        const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        if (visible <= 0) continue;
        const ratio = visible / window.innerHeight;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = section.id;
        }
      }

      setActiveSection(bestId);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const handleLink = (href: string, sectionId: string) => {
    setMobileOpen(false);
    setActiveSection(sectionId);
    scrollToWithLenis(href);
  };

  const orderWhatsAppUrl = buildWhatsAppLink(
    BRAND_PHONE_DISPLAY,
    "Hi Captain Kunafa! I'd like to order fresh kunafa."
  );

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-2.5 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-300 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl ${
          scrolled
            ? "bg-[#0a0a0a] border border-[#222222]"
            : "bg-[#0a0a0a] border border-white/10"
        }`}
      >
        {/* Wordmark with Official Captain Kunafa Logo */}
        <button
          type="button"
          onClick={() => {
            setMobileOpen(false);
            setActiveSection("story");
            scrollToWithLenis(0);
          }}
          className="flex items-center gap-2 sm:gap-3 group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EFB80D] rounded-md text-left"
        >
          <Image
            src="/logo.png"
            alt="Captain Kunafa Logo"
            width={38}
            height={46}
            className="h-8 sm:h-10 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_2px_8px_rgba(239,184,13,0.35)]"
            priority
          />
          <div className="flex flex-col">
            <BrandName className="text-sm sm:text-base md:text-lg text-white leading-tight">
              CAPTAIN <span className="text-[#EFB80D]">KUNAFA</span>
            </BrandName>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.href}
                type="button"
                aria-current={isActive ? "page" : undefined}
                onClick={() => handleLink(link.href, link.id)}
                className={`font-sans text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-md font-semibold transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EFB80D] ${
                  isActive
                    ? "bg-[#EFB80D] text-[#000000]"
                    : "text-white hover:text-[#000000] hover:bg-[#EFB80D]"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Header Right: Tactile 3D WhatsApp Order CTA + Mobile Toggle */}
        <div className="flex items-center gap-2">
          <a
            href={orderWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 btn-tactile-base btn-tactile-gold font-sans font-bold text-xs px-3.5 py-2 rounded-md"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>Order Online</span>
          </a>

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-8 h-8 rounded-md bg-[#EFB80D] text-[#000000] flex items-center justify-center cursor-pointer font-bold shadow-sm"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4 text-[#000000]" /> : <Menu className="w-4 h-4 text-[#000000]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/80"
            onClick={() => setMobileOpen(false)}
          />
          <div
            id="mobile-nav-drawer"
            className="md:hidden relative z-50 mt-2 max-w-xs sm:max-w-sm mx-auto bg-[#111111] border border-[#EFB80D]/40 rounded-xl p-3 flex flex-col gap-1 shadow-2xl"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
              <button
                key={link.href}
                type="button"
                onClick={() => handleLink(link.href, link.id)}
                className={`font-sans text-sm font-semibold text-left px-3.5 py-2.5 rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#EFB80D] text-[#000000]"
                    : "text-white hover:bg-[#EFB80D] hover:text-[#000000] active:bg-[#EFB80D]"
                }`}
              >
                {link.label}
              </button>
              );
            })}
            <a
              href={orderWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex items-center justify-center gap-2 btn-tactile-base btn-tactile-gold font-sans font-bold text-xs py-3 rounded-lg w-full"
            >
              Order on WhatsApp
            </a>
          </div>
        </>
      )}
    </header>
  );
}
