"use client";

import React from "react";
import Image from "next/image";
import { Shield, Phone, ArrowUp } from "lucide-react";
import BrandName from "@/components/BrandName";
import { buildWhatsAppLink, BRAND_PHONE_DISPLAY } from "@/lib/contact";
import { scrollToWithLenis } from "@/lib/lenis";

export default function Footer() {
  const scrollToTop = () => {
    scrollToWithLenis(0);
  };

  return (
    <footer className="bg-[#030303] text-[#FFF8EC] border-t border-[#222222] pt-16 sm:pt-20 pb-10 sm:pb-12 px-4 sm:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 pb-12 sm:pb-16 border-b border-white/10">
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5">
            <div className="mb-4 sm:mb-5">
              <BrandName className="text-xl sm:text-2xl md:text-3xl text-white">
                KUNAFA
              </BrandName>
            </div>
            <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed max-w-sm mb-5 sm:mb-6 font-medium">
              Hyderabad&apos;s premier authentic Levantine dessert brand. Founded in 2021 by Saud bin Nasar Khulagi. Hand-pressed on live copper pans across our city branches.
            </p>
            <div className="font-mono text-[11px] sm:text-xs text-white font-bold space-y-1">
              <div>CENTRAL KITCHEN &amp; HQ: <span className="text-[#EFB80D]">BARKAS, HYDERABAD · 500005</span></div>
              <div>HOTLINE: <span className="text-[#EFB80D]">{BRAND_PHONE_DISPLAY}</span></div>
            </div>
          </div>

          {/* Quick Nav (3 cols) */}
          <div className="md:col-span-3">
            <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-white font-bold mb-3 sm:mb-4">
              QUICK LINKS
            </div>
            <ul className="space-y-2 font-sans text-xs text-white/80 font-medium">
              {[
                { label: "Home", href: "#story" },
                { label: "About Us", href: "#about" },
                { label: "Our Menu", href: "#menu" },
                { label: "Our Locations", href: "#locations" },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="hover:text-[#EFB80D] hover:underline transition-colors py-0.5 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quality Standards & Inquiries (4 cols) */}
          <div className="md:col-span-4">
            <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-white font-bold mb-3 sm:mb-4">
              OUR QUALITY PROMISE
            </div>
            <div className="space-y-2.5 sm:space-y-3 font-sans text-xs text-white/85 mb-5 sm:mb-6 font-medium">
              <div className="flex items-start gap-2 sm:gap-2.5">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EFB80D] shrink-0 mt-0.5" />
                <span>100% Grass-Fed Clarified A2 Ghee — zero palm oil.</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-2.5">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EFB80D] shrink-0 mt-0.5" />
                <span>18-hour cold desalinated mountain Akawi &amp; Nablusi curd.</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-2.5">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EFB80D] shrink-0 mt-0.5" />
                <span>Raw first-harvest Aleppo emerald green pistachios.</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={buildWhatsAppLink(BRAND_PHONE_DISPLAY, "Hi! I'd like to order fresh kunafa.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile-base btn-tactile-gold inline-flex items-center gap-2 font-sans text-xs font-bold px-6 py-2.5 rounded-lg"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright & Back to Top */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[10px] sm:text-xs text-white/50 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} <BrandName className="text-white/70">KUNAFA</BrandName>. ALL RIGHTS RESERVED. HYDERABAD, INDIA.
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[#EFB80D] hover:text-white transition-colors cursor-pointer font-bold"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Oversized wordmark. Breaks out of the footer's horizontal padding and
          bottom padding so the letterforms run edge to edge and sit on the
          footer's bottom edge. Decorative only — the brand name above is the
          real text. */}
      <div
        aria-hidden="true"
        className="footer-wordmark-wrap pointer-events-none select-none mt-8 sm:mt-10 -mx-4 sm:-mx-8 -mb-10 sm:-mb-12"
      >
        <div className="footer-wordmark-line">
          <span className="footer-wordmark">kunafa</span>
          <Image
            src="/cap-cutout.webp"
            alt=""
            width={900}
            height={635}
            sizes="30vw"
            className="footer-wordmark-cap"
          />
        </div>
      </div>
    </footer>
  );
}
