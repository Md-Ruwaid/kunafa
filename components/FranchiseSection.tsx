"use client";

import React, { useState } from "react";
import { CheckCircle, TrendingUp, Shield, Users, MapPin, Phone, MessageCircle, Award, ArrowUpRight } from "lucide-react";
import SwashAccent from "@/components/SwashAccent";
import { ShipHelm, CompassRose, CaptainSeal } from "@/components/NauticalElements";

const valueProps = [
  {
    icon: TrendingUp,
    title: "Proven Unit Economics",
    body: "Our Barkas flagship unit crossed ₹12L/month revenue within 8 months. High-margin product mix (68–72% gross margins) with rapid inventory turnover and low wastage.",
  },
  {
    icon: Shield,
    title: "Territorial Exclusivity (3 km)",
    body: "Guaranteed geographical protection. No other Captain Kunafa outlet will be approved within a 3-kilometer radius of your territory, safeguarding your local market share.",
  },
  {
    icon: Users,
    title: "15-Day Master Copper Training",
    body: "Hands-on culinary training at our Barkas central hearth. Your chefs master authentic 205°C copper sear, cheese desalination ratios, and live guest presentation.",
  },
  {
    icon: MapPin,
    title: "Turnkey Setup & Copper Hardware",
    body: "Complete architectural guidance, custom branded copper pans, specialized gas/charcoal hearth burners, POS software, and initial raw ingredient inventory supply.",
  },
  {
    icon: CheckCircle,
    title: "Launch Marketing & WhatsApp CRM",
    body: "High-impact social media launch campaign, food influencer collaborations, and integration with our regional customer database to drive immediate Day-1 footfalls.",
  },
  {
    icon: MessageCircle,
    title: "Direct Founder & Ops Support",
    body: "Direct hotline to Saud bin Nasar Khulagi's operations team. Weekly performance reviews during the first 90 days and ongoing supply chain assurance.",
  },
];

const tiers = [
  {
    name: "Kiosk / Food Court",
    investment: "₹8L – ₹12L",
    size: "100 – 150 sq ft",
    royalty: "6%",
    roi: "10 – 14 months",
    idealFor: "Malls, high-street food hubs, airport transit",
    featured: false,
  },
  {
    name: "Artisanal Outpost",
    investment: "₹16L – ₹22L",
    size: "250 – 400 sq ft",
    royalty: "7%",
    roi: "12 – 16 months",
    idealFor: "Prime neighborhood high-streets with live outdoor seating",
    featured: true,
  },
  {
    name: "Flagship Tasting Lounge",
    investment: "₹28L – ₹38L",
    size: "500 – 800 sq ft",
    royalty: "8%",
    roi: "14 – 18 months",
    idealFor: "Destination dining districts (e.g. Jubilee Hills, HITEC)",
    featured: false,
  },
];

const budgetOptions = ["₹8L – ₹15L", "₹15L – ₹25L", "₹25L – ₹40L", "₹40L+"];

export default function FranchiseSection() {
  const [form, setForm] = useState({
    name: "",
    city: "",
    phone: "",
    budget: "₹15L – ₹25L",
    locality: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `*Captain Kunafa — Franchise Application*\n\n` +
      `• *Name:* ${form.name}\n` +
      `• *City / State:* ${form.city}\n` +
      `• *Phone / WhatsApp:* ${form.phone}\n` +
      `• *Investment Budget:* ${form.budget}\n` +
      `• *Target Locality:* ${form.locality || "Open to suggestions"}\n` +
      `• *Notes:* ${form.message || "Requesting franchise prospectus"}`
    );
    window.open(`https://wa.me/919000000000?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="franchise" className="py-28 px-4 sm:px-8 bg-[#FFF8EC] border-t border-[#E7DCC9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-18">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#DA7034] bg-[#DA7034]/10 border border-[#DA7034]/25 px-4 py-1.5 rounded-full mb-4">
            <ShipHelm size={14} className="text-[#EFB80D]" />
            <span>COMMERCIAL PARTNERSHIP FLEET</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#2B1B12] leading-tight mb-4">
            Join the Fleet: <SwashAccent color="terracotta">Own a Captain's Outpost</SwashAccent>
          </h2>

          <p className="font-sans text-base text-[#7A6A5B]">
            A high-growth dessert franchise model with authentic Levantine heritage, unmatched word-of-mouth appeal, and complete operational backing.
          </p>
        </div>

        {/* 3 Investment Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-20 items-stretch">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-[24px] p-7 sm:p-8 border flex flex-col justify-between transition-all duration-300 ${
                tier.featured
                  ? "bg-[#2B1B12] border-2 border-[#EFB80D] text-[#FFF8EC] shadow-2xl scale-[1.02] relative"
                  : "bg-white border-[#E7DCC9] text-[#2B1B12] hover:border-[#DA7034]/50 shadow-md"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#EFB80D] text-[#2B1B12] font-mono text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-md">
                  MOST POPULAR FORMAT
                </div>
              )}

              <div>
                <div className="font-mono text-xs text-[#DA7034] uppercase tracking-widest font-semibold mb-1">
                  TIER {String(idx + 1).padStart(2, "0")}
                </div>
                <h3 className={`font-display font-bold text-2xl mb-2 ${tier.featured ? "text-white" : "text-[#2B1B12]"}`}>
                  {tier.name}
                </h3>
                <div className="font-sans text-3xl font-extrabold text-[#DA7034] mb-3">
                  {tier.investment}
                </div>
                <p className={`font-sans text-xs mb-6 leading-relaxed ${tier.featured ? "text-[#B3A697]" : "text-[#7A6A5B]"}`}>
                  {tier.idealFor}
                </p>

                <div className="space-y-3 font-mono text-xs border-t border-dashed border-[#E7DCC9]/40 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className={tier.featured ? "text-[#B3A697]" : "text-[#7A6A5B]"}>Floor Requirement</span>
                    <span className="font-semibold">{tier.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={tier.featured ? "text-[#B3A697]" : "text-[#7A6A5B]"}>Royalty Fee</span>
                    <span className="font-semibold">{tier.royalty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={tier.featured ? "text-[#B3A697]" : "text-[#7A6A5B]"}>Est. Breakeven</span>
                    <span className="font-bold text-[#EFB80D]">{tier.roi}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setForm((f) => ({ ...f, budget: tier.investment }));
                  const el = document.querySelector("#franchise-form");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`w-full py-3.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  tier.featured
                    ? "bg-[#EFB80D] hover:bg-[#ffc926] text-[#2B1B12] shadow-md"
                    : "bg-[#FFF8EC] hover:bg-[#DA7034] text-[#2B1B12] hover:text-white border border-[#E7DCC9]"
                }`}
              >
                Apply for {tier.name.split(" ")[0]}
              </button>
            </div>
          ))}
        </div>

        {/* 6 Value Propositions */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#2B1B12]">
              Why Partner with <SwashAccent color="terracotta">Captain Kunafa</SwashAccent>?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#7A6A5B] mt-2">
              Every system is documented and operationalized so you hit the ground running.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {valueProps.map(({ icon: Icon, title, body }, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 bg-white border border-[#E7DCC9] rounded-[22px] hover:border-[#DA7034]/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF8EC] border border-[#EFB80D]/40 flex items-center justify-center mb-4 text-[#DA7034]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-[#2B1B12] mb-2">
                    {title}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-[#7A6A5B] leading-relaxed">
                    {body}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E7DCC9] font-mono text-[10px] text-[#DA7034] font-semibold">
                  PILLAR 0{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Capture Application Funnel */}
        <div id="franchise-form" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-white border-2 border-[#E7DCC9] rounded-[28px] p-7 sm:p-12 shadow-xl">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#DA7034] mb-3 font-semibold">
              <CompassRose size={16} />
              <span>DIRECT INQUIRY DESK</span>
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#2B1B12] mb-4">
              Request the Official <SwashAccent color="terracotta">Prospectus</SwashAccent>
            </h3>
            <p className="font-sans text-sm text-[#7A6A5B] leading-relaxed mb-6">
              Complete this brief form to receive the confidential investment deck and schedule a direct consultation with Saud bin Nasar Khulagi.
            </p>

            <div className="space-y-3 font-sans text-xs text-[#7A6A5B] border-t border-[#E7DCC9] pt-6 mb-6">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>Confidential review within 24 hours</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>Complimentary tasting session at Barkas HQ</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>Direct access to financial P&amp;L model</span>
              </div>
            </div>

            <div className="p-4 bg-[#FFF8EC] border border-[#E7DCC9] rounded-xl flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#DA7034] shrink-0" />
              <div className="font-mono text-xs text-[#2B1B12]">
                Franchise Hotline: <span className="font-bold">+91 90000 00001</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-10 bg-[#FFF8EC] border-2 border-[#25D366] rounded-[24px] text-center">
                <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-4 text-[#25D366]">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-display font-bold text-2xl text-[#2B1B12] mb-2">
                  Prospectus Dispatched via WhatsApp!
                </h4>
                <p className="font-sans text-sm text-[#7A6A5B] max-w-md mx-auto">
                  Our franchise operations director will connect with you shortly on WhatsApp with the complete territory feasibility report.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A6A5B] font-semibold mb-1.5">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="e.g. Tariq Mansoor"
                      className="w-full px-4 py-3 rounded-xl border border-[#E7DCC9] bg-[#FFF8EC] font-sans text-sm text-[#2B1B12] focus:outline-none focus:border-[#DA7034] focus:ring-2 focus:ring-[#DA7034]/20 transition"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A6A5B] font-semibold mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-[#E7DCC9] bg-[#FFF8EC] font-sans text-sm text-[#2B1B12] focus:outline-none focus:border-[#DA7034] focus:ring-2 focus:ring-[#DA7034]/20 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A6A5B] font-semibold mb-1.5">
                      Target City / State *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                      placeholder="e.g. Hyderabad / Bengaluru"
                      className="w-full px-4 py-3 rounded-xl border border-[#E7DCC9] bg-[#FFF8EC] font-sans text-sm text-[#2B1B12] focus:outline-none focus:border-[#DA7034] focus:ring-2 focus:ring-[#DA7034]/20 transition"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A6A5B] font-semibold mb-1.5">
                      Preferred Locality
                    </label>
                    <input
                      type="text"
                      value={form.locality}
                      onChange={(e) => setForm((f) => ({ ...f, locality: e.target.value }))}
                      placeholder="e.g. Gachibowli, Secunderabad"
                      className="w-full px-4 py-3 rounded-xl border border-[#E7DCC9] bg-[#FFF8EC] font-sans text-sm text-[#2B1B12] focus:outline-none focus:border-[#DA7034] focus:ring-2 focus:ring-[#DA7034]/20 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A6A5B] font-semibold mb-1.5">
                    Investment Capital Range *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgetOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, budget: opt }))}
                        className={`py-2.5 px-3 rounded-xl font-mono text-xs border transition-all cursor-pointer text-center ${
                          form.budget === opt
                            ? "bg-[#DA7034] border-[#DA7034] text-white font-bold shadow-sm"
                            : "border-[#E7DCC9] bg-[#FFF8EC] text-[#7A6A5B] hover:border-[#DA7034]/40"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A6A5B] font-semibold mb-1.5">
                    Business Experience / Questions
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Tell us about your background, existing F&B operations, or timeline…"
                    className="w-full px-4 py-3 rounded-xl border border-[#E7DCC9] bg-[#FFF8EC] font-sans text-sm text-[#2B1B12] focus:outline-none focus:border-[#DA7034] focus:ring-2 focus:ring-[#DA7034]/20 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20b858] text-white font-sans font-bold text-sm py-4 rounded-full transition-all hover:scale-[1.01] active:scale-95 shadow-md cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Submit Application via WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
