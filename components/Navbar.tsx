"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Wordmark from "@/components/Wordmark";
import CtaPill from "@/components/CtaPill";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Franchise", href: "/franchise" },
    { label: "Catering", href: "/catering" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-8 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand Logo & Wordmark */}
        <Wordmark size="md" />

        {/* Desktop Nav Links (Ghost Links) */}
        <nav className="hidden md:flex items-center gap-1 bg-[#241509]/80 border border-[#E7DCC9]/15 px-5 py-2 rounded-full backdrop-blur-xl shadow-2xl">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-xs uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#EFB80D] focus-visible:outline-offset-2 ${
                  isActive
                    ? "bg-[#EFB80D]/15 text-[#EFB80D] font-semibold border border-[#EFB80D]/30"
                    : "text-[#FFF8EC]/70 hover:text-[#EFB80D] hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <CtaPill href="/menu" size="sm">
              ORDER ONLINE
            </CtaPill>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-[#241509]/90 border border-[#EFB80D]/30 text-[#FFF8EC] flex items-center justify-center backdrop-blur-xl focus-visible:outline-2 focus-visible:outline-[#EFB80D] focus-visible:outline-offset-2 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-3 max-w-sm mx-auto bg-[#241509]/95 border border-[#EFB80D]/20 rounded-2xl p-5 backdrop-blur-2xl shadow-2xl pointer-events-auto flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`font-sans text-sm px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-[#EFB80D]/20 text-[#EFB80D] font-semibold"
                    : "text-[#FFF8EC]/80 hover:bg-white/5 hover:text-[#EFB80D]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-white/10 mt-1">
            <CtaPill href="/menu" size="md" className="w-full" onClick={() => setMobileOpen(false)}>
              ORDER ONLINE
            </CtaPill>
          </div>
        </div>
      )}
    </header>
  );
}
