"use client";

import React, { useState } from "react";
import { Flame, CheckCircle, Users, Clock, Star, Phone, Sparkles } from "lucide-react";
import SwashAccent from "@/components/SwashAccent";
import { ShipHelm, CaptainSeal } from "@/components/NauticalElements";

const packages = [
  {
    name: "The First Mate",
    subtitle: "Private Parties & Dinners",
    guests: "25 – 50 Guests",
    serves: "4 – 6 Master Trays",
    startingAt: "₹4,800",
    perTray: "₹1,200/tray · Min. 4 trays",
    features: [
      "Classic Akawi + 1 Fusion Flavour",
      "Live shallow copper-pan preparation",
      "Uniformed master dessert artisan",
      "Eco-luxury brass serving platters",
      "Setup within 35 minutes",
    ],
    highlight: false,
  },
  {
    name: "The First Officer",
    subtitle: "Weddings, Mehendis & Receptions",
    guests: "50 – 150 Guests",
    serves: "8 – 14 Master Trays",
    startingAt: "₹12,500",
    perTray: "₹1,100/tray · Min. 8 trays",
    features: [
      "Complete Menu: Classic, Pistachio & Choco",
      "2 Dual Live Copper Burner Stations",
      "Custom branded event canopy & signage",
      "2 Trained Levantine dessert chefs",
      "Complimentary pre-event tasting box",
      "Live cheese stretch demonstration",
    ],
    highlight: true,
  },
  {
    name: "The Captain's Royal Fleet",
    subtitle: "Grand Galas & Corporate Summits",
    guests: "150 – 500+ Guests",
    serves: "16+ Master Trays",
    startingAt: "Custom Quote",
    perTray: "Volume tier pricing",
    features: [
      "Full menu exclusivity including Biscoff & Caramel",
      "3+ Live copper-pan master stations",
      "Dedicated Captain Kunafa event manager",
      "Custom flavor creation for the celebration",
      "VIP dessert gifting boxes for delegates",
      "Continuous live service for 4+ hours",
    ],
    highlight: false,
  },
];

export default function CateringSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    guests: "50–100",
    venue: "",
    packageChoice: "The First Officer",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `*Captain Kunafa — Live Catering Booking*\n\n` +
      `• *Name:* ${form.name}\n` +
      `• *Phone:* ${form.phone}\n` +
      `• *Event Date:* ${form.date}\n` +
      `• *Guest Count:* ${form.guests}\n` +
      `• *Package:* ${form.packageChoice}\n` +
      `• *Venue / Locality:* ${form.venue || "Hyderabad"}\n` +
      `• *Notes:* ${form.notes || "Live station requested"}`
    );
    window.open(`https://wa.me/919000000000?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="catering" className="py-28 px-4 sm:px-8 bg-white border-t border-[#E7DCC9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-18">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#DA7034] bg-[#DA7034]/10 border border-[#DA7034]/25 px-4 py-1.5 rounded-full mb-4">
            <Flame className="w-3.5 h-3.5 text-[#EFB80D]" />
            <span>LIVE HEARTH EVENT CATERING</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#2B1B12] leading-tight mb-4">
            We Bring the <SwashAccent color="terracotta">Live Copper Hearth</SwashAccent> to Your Venue
          </h2>

          <p className="font-sans text-base text-[#7A6A5B]">
            Transform your wedding, reception, or corporate gala. Our master artisans roast, press, and pour golden kunafa live before your guests.
          </p>
        </div>

        {/* 3 Package Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mb-20 items-stretch">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`rounded-[24px] p-7 sm:p-8 border flex flex-col justify-between transition-all duration-300 ${
                pkg.highlight
                  ? "bg-[#2B1B12] border-2 border-[#EFB80D] text-[#FFF8EC] shadow-2xl scale-[1.02] relative"
                  : "bg-[#FFF8EC] border-[#E7DCC9] text-[#2B1B12] hover:border-[#DA7034]/50 shadow-md"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#DA7034] text-white font-mono text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-md">
                  MOST REQUESTED FOR WEDDINGS
                </div>
              )}

              <div>
                <div className="font-mono text-xs text-[#DA7034] uppercase tracking-widest font-semibold mb-1">
                  PACKAGE 0{idx + 1}
                </div>
                <h3 className={`font-display font-bold text-2xl mb-1 ${pkg.highlight ? "text-white" : "text-[#2B1B12]"}`}>
                  {pkg.name}
                </h3>
                <div className={`font-sans text-xs mb-5 ${pkg.highlight ? "text-[#B3A697]" : "text-[#7A6A5B]"}`}>
                  {pkg.subtitle}
                </div>

                <div className="font-sans text-3xl font-extrabold text-[#DA7034] mb-1">
                  {pkg.startingAt}
                </div>
                <div className={`font-mono text-xs mb-6 ${pkg.highlight ? "text-[#B3A697]" : "text-[#7A6A5B]"}`}>
                  {pkg.perTray}
                </div>

                <div className={`flex gap-4 mb-6 font-mono text-xs border-y border-[#E7DCC9]/40 py-3 ${pkg.highlight ? "text-[#B3A697]" : "text-[#7A6A5B]"}`}>
                  <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-[#DA7034]" /> {pkg.guests}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#DA7034]" /> {pkg.serves}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 font-sans text-xs sm:text-sm">
                      <CheckCircle className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                      <span className={pkg.highlight ? "text-[#FFF8EC]/90" : "text-[#7A6A5B]"}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => {
                  setForm((f) => ({ ...f, packageChoice: pkg.name }));
                  const el = document.querySelector("#catering-form");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`w-full py-3.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  pkg.highlight
                    ? "bg-[#EFB80D] hover:bg-[#ffc926] text-[#2B1B12] shadow-md"
                    : "bg-white hover:bg-[#DA7034] text-[#2B1B12] hover:text-white border border-[#E7DCC9]"
                }`}
              >
                Select {pkg.name}
              </button>
            </div>
          ))}
        </div>

        {/* Live Booking Form */}
        <div id="catering-form" className="max-w-3xl mx-auto bg-[#FFF8EC] border-2 border-[#E7DCC9] rounded-[28px] p-7 sm:p-12 shadow-lg">
          <div className="text-center max-w-lg mx-auto mb-8">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#DA7034] font-semibold mb-2">
              <ShipHelm size={15} />
              <span>INSTANT EVENT INQUIRY</span>
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#2B1B12]">
              Book Your <SwashAccent color="terracotta">Live Kunafa Station</SwashAccent>
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#7A6A5B] mt-1">
              Select your date and expected guest size — our catering captain will reply with an exact menu quote within 2 hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 bg-white border-2 border-[#25D366] rounded-[20px] text-center">
              <CheckCircle className="w-12 h-12 text-[#25D366] mx-auto mb-3" />
              <h4 className="font-display font-bold text-xl text-[#2B1B12] mb-1">
                Event Details Sent via WhatsApp!
              </h4>
              <p className="font-sans text-xs text-[#7A6A5B]">
                Our master catering chef will confirm equipment availability for your date.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A6A5B] font-semibold mb-1.5">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Ayesha Siddiqui"
                    className="w-full px-4 py-3 rounded-xl border border-[#E7DCC9] bg-white font-sans text-sm text-[#2B1B12] focus:outline-none focus:border-[#DA7034] focus:ring-2 focus:ring-[#DA7034]/20 transition"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A6A5B] font-semibold mb-1.5">
                    WhatsApp Phone *
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl border border-[#E7DCC9] bg-white font-sans text-sm text-[#2B1B12] focus:outline-none focus:border-[#DA7034] focus:ring-2 focus:ring-[#DA7034]/20 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A6A5B] font-semibold mb-1.5">
                    Event Date *
                  </label>
                  <input
                    required
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-[#E7DCC9] bg-white font-sans text-sm text-[#2B1B12] focus:outline-none focus:border-[#DA7034] focus:ring-2 focus:ring-[#DA7034]/20 transition"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A6A5B] font-semibold mb-1.5">
                    Guest Count
                  </label>
                  <select
                    value={form.guests}
                    onChange={(e) => setForm((f) => ({ ...f, guests: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-[#E7DCC9] bg-white font-sans text-sm text-[#2B1B12] focus:outline-none focus:border-[#DA7034] focus:ring-2 focus:ring-[#DA7034]/20 transition"
                  >
                    <option value="25–50 guests">25 – 50 guests</option>
                    <option value="50–100 guests">50 – 100 guests</option>
                    <option value="100–250 guests">100 – 250 guests</option>
                    <option value="250+ guests">250+ guests (Grand Gala)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A6A5B] font-semibold mb-1.5">
                    Selected Package
                  </label>
                  <select
                    value={form.packageChoice}
                    onChange={(e) => setForm((f) => ({ ...f, packageChoice: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-[#E7DCC9] bg-white font-sans text-sm text-[#2B1B12] focus:outline-none focus:border-[#DA7034] focus:ring-2 focus:ring-[#DA7034]/20 transition"
                  >
                    <option value="The First Mate">The First Mate (₹4,800+)</option>
                    <option value="The First Officer">The First Officer (₹12,500+)</option>
                    <option value="The Captain's Royal Fleet">Royal Fleet (Custom)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A6A5B] font-semibold mb-1.5">
                  Venue Address / Locality
                </label>
                <input
                  type="text"
                  value={form.venue}
                  onChange={(e) => setForm((f) => ({ ...f, venue: e.target.value }))}
                  placeholder="e.g. Banquet Hall in Jubilee Hills / Lawn in Gandipet"
                  className="w-full px-4 py-3 rounded-xl border border-[#E7DCC9] bg-white font-sans text-sm text-[#2B1B12] focus:outline-none focus:border-[#DA7034] focus:ring-2 focus:ring-[#DA7034]/20 transition"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A6A5B] font-semibold mb-1.5">
                  Special Notes or Flavour Requests
                </label>
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  placeholder="Any dietary preferences, time of service, or specific requests…"
                  className="w-full px-4 py-3 rounded-xl border border-[#E7DCC9] bg-white font-sans text-sm text-[#2B1B12] focus:outline-none focus:border-[#DA7034] focus:ring-2 focus:ring-[#DA7034]/20 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20b858] text-white font-sans font-bold text-sm py-4 rounded-full transition-all hover:scale-[1.01] active:scale-95 shadow-md cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Request Live Station Quote on WhatsApp</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
