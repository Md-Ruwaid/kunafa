"use client";

import React, { useState } from "react";
import { Flame, CheckCircle, Users, Clock, Star } from "lucide-react";
import SwashAccent from "@/components/SwashAccent";

const packages = [
  {
    name: "First Mate",
    subtitle: "Small Gatherings",
    guests: "Up to 50 guests",
    serves: "2–4 trays",
    startingAt: "₹4,500",
    perTray: "₹1,200–1,800/tray",
    minimum: "Min. 2 trays",
    features: [
      "Classic + 1 fusion flavour",
      "Live copper-pan service",
      "Branded presentation box",
      "1 uniformed server",
    ],
    highlight: false,
  },
  {
    name: "First Officer",
    subtitle: "Weddings & Corporate",
    guests: "50–150 guests",
    serves: "6–12 trays",
    startingAt: "₹14,000",
    perTray: "₹1,100–1,500/tray",
    minimum: "Min. 6 trays",
    features: [
      "Full menu: Classic, Fusion & Seasonal",
      "Live copper-pan + press station",
      "Branded canopy & signage",
      "2–3 uniformed servers",
      "Complimentary tasting tray",
    ],
    highlight: true,
  },
  {
    name: "Captain's Fleet",
    subtitle: "Large Scale Events",
    guests: "150+ guests",
    serves: "15+ trays",
    startingAt: "Custom quote",
    perTray: "Volume pricing",
    minimum: "Min. 15 trays",
    features: [
      "Complete menu exclusivity",
      "Multiple live stations",
      "Full branded event setup",
      "Dedicated event captain",
      "Pre-event tasting session",
      "Custom flavour on request",
    ],
    highlight: false,
  },
];

export default function CateringSection() {
  const [form, setForm] = useState({ name: "", phone: "", date: "", guests: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `*Catering Inquiry — Captain Kunafa*\n\nName: ${form.name}\nPhone: ${form.phone}\nEvent Date: ${form.date}\nGuest Count: ${form.guests}\nNotes: ${form.notes || "No additional notes"}`
    );
    window.open(`https://wa.me/919000000000?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="catering" className="py-28 px-4 sm:px-8 bg-white border-t border-[#E7DCC9]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#EFB80D] bg-[#EFB80D]/10 border border-[#EFB80D]/30 px-4 py-1.5 rounded-full mb-4">
            <Flame className="w-3.5 h-3.5" />
            <span>LIVE EVENT CATERING</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#2B1B12] leading-tight mb-4">
            We Bring the <SwashAccent>Copper Hearth</SwashAccent> to You
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#7A6A5B]">
            From intimate gatherings to 500-person weddings — our master kunafa spinners set up live stations at your venue and press every tray fresh in front of your guests.
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`rounded-[20px] p-6 sm:p-8 border flex flex-col ${pkg.highlight ? "bg-[#2B1B12] border-[#EFB80D]/40" : "bg-[#FFF8EC] border-[#E7DCC9]"}`}
            >
              {pkg.highlight && (
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#EFB80D] mb-3">MOST REQUESTED</div>
              )}
              <div>
                <h3 className={`font-display text-2xl font-semibold mb-1 ${pkg.highlight ? "text-[#FFF8EC]" : "text-[#2B1B12]"}`}>
                  {pkg.name}
                </h3>
                <div className={`font-sans text-sm mb-4 ${pkg.highlight ? "text-[#B3A697]" : "text-[#7A6A5B]"}`}>
                  {pkg.subtitle}
                </div>
              </div>

              <div className={`text-3xl font-display font-semibold mb-1 ${pkg.highlight ? "text-[#EFB80D]" : "text-[#2B1B12]"}`}>
                {pkg.startingAt}
              </div>
              <div className={`font-mono text-xs mb-5 ${pkg.highlight ? "text-[#7A6A5B]" : "text-[#B3A697]"}`}>
                {pkg.perTray} · {pkg.minimum}
              </div>

              <div className={`flex gap-4 mb-5 font-mono text-[11px] ${pkg.highlight ? "text-[#B3A697]" : "text-[#7A6A5B]"}`}>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {pkg.guests}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {pkg.serves}</span>
              </div>

              <ul className="space-y-2 flex-1">
                {pkg.features.map((f, i) => (
                  <li key={i} className={`flex items-start gap-2 font-sans text-sm ${pkg.highlight ? "text-[#FFF8EC]/80" : "text-[#7A6A5B]"}`}>
                    <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.highlight ? "text-[#EFB80D]" : "text-[#EFB80D]"}`} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust Strip */}
        <div className="flex flex-wrap justify-center gap-6 mb-16 font-mono text-xs text-[#7A6A5B] text-center">
          {[
            { icon: Star, text: "4.8★ avg event rating" },
            { icon: Users, text: "200+ events catered" },
            { icon: Clock, text: "Setup within 45 min" },
            { icon: Flame, text: "All equipment provided" },
          ].map(({ icon: Icon, text }, idx) => (
            <div key={idx} className="flex items-center gap-2 px-5 py-2.5 bg-[#FFF8EC] border border-[#E7DCC9] rounded-full">
              <Icon className="w-4 h-4 text-[#EFB80D]" />
              {text}
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#2B1B12] text-center mb-8">
            Book Your <SwashAccent>Live Station</SwashAccent>
          </h3>

          {submitted ? (
            <div className="p-10 bg-[#FFF8EC] border border-[#EFB80D]/40 rounded-[20px] text-center">
              <div className="w-16 h-16 rounded-full bg-[#EFB80D]/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-[#EFB80D]" />
              </div>
              <h4 className="font-display font-semibold text-xl text-[#2B1B12] mb-2">Inquiry Sent!</h4>
              <p className="font-sans text-sm text-[#7A6A5B]">Our catering team will reach you on WhatsApp within a few hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-[#FFF8EC] border border-[#E7DCC9] rounded-[20px] p-6 sm:p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A6A5B] mb-1.5">Name *</label>
                  <input required type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-[#E7DCC9] bg-white font-sans text-sm text-[#2B1B12] placeholder:text-[#B3A697] focus:outline-none focus:border-[#EFB80D] focus:ring-2 focus:ring-[#EFB80D]/20 transition" />
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A6A5B] mb-1.5">Phone *</label>
                  <input required type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 rounded-xl border border-[#E7DCC9] bg-white font-sans text-sm text-[#2B1B12] placeholder:text-[#B3A697] focus:outline-none focus:border-[#EFB80D] focus:ring-2 focus:ring-[#EFB80D]/20 transition" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A6A5B] mb-1.5">Event Date *</label>
                  <input required type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-[#E7DCC9] bg-white font-sans text-sm text-[#2B1B12] focus:outline-none focus:border-[#EFB80D] focus:ring-2 focus:ring-[#EFB80D]/20 transition" />
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A6A5B] mb-1.5">Guest Count *</label>
                  <input required type="number" min="10" value={form.guests} onChange={e => setForm(f => ({ ...f, guests: e.target.value }))}
                    placeholder="e.g. 80"
                    className="w-full px-4 py-3 rounded-xl border border-[#E7DCC9] bg-white font-sans text-sm text-[#2B1B12] placeholder:text-[#B3A697] focus:outline-none focus:border-[#EFB80D] focus:ring-2 focus:ring-[#EFB80D]/20 transition" />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A6A5B] mb-1.5">Event Details (optional)</label>
                <textarea rows={3} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  placeholder="Venue, occasion type, dietary requirements…"
                  className="w-full px-4 py-3 rounded-xl border border-[#E7DCC9] bg-white font-sans text-sm text-[#2B1B12] placeholder:text-[#B3A697] focus:outline-none focus:border-[#EFB80D] focus:ring-2 focus:ring-[#EFB80D]/20 transition resize-none" />
              </div>

              <button type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#EFB80D] hover:bg-[#ffc926] text-[#2B1B12] font-semibold font-sans px-6 py-4 rounded-full transition-all hover:scale-[1.02] active:scale-95 focus-visible:outline-2 focus-visible:outline-[#EFB80D] cursor-pointer shadow-[0_0_20px_rgba(239,184,13,0.25)]">
                <Flame className="w-4 h-4" />
                Book via WhatsApp
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
