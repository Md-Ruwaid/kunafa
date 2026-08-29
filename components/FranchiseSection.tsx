"use client";

import React, { useState } from "react";
import { CheckCircle, TrendingUp, Shield, Users, MapPin, Phone, MessageCircle } from "lucide-react";
import SwashAccent from "@/components/SwashAccent";

const valueProps = [
  {
    icon: TrendingUp,
    title: "Proven Revenue Model",
    body: "Our flagship Barkas outlet crossed ₹12L/month within 8 months of launch. The model is stress-tested across 5 distinct Hyderabad micro-markets — from old city to HITEC corridor.",
  },
  {
    icon: Shield,
    title: "Territorial Exclusivity",
    body: "Each franchise partner receives a protected zone — no Captain Kunafa outlet within 3 km of your location. Your market, your growth, your returns.",
  },
  {
    icon: Users,
    title: "Full Training & Onboarding",
    body: "15-day hands-on copper-pan training at our Barkas master kitchen. Your team learns the original recipe, press technique, and live service standards before Day 1.",
  },
  {
    icon: MapPin,
    title: "Site & Setup Support",
    body: "We help you identify the right locality for your market, advise on fit-out layout, and supply the branded copper equipment and signage package.",
  },
  {
    icon: CheckCircle,
    title: "Marketing & Brand Assets",
    body: "Pre-made social content, launch campaign templates, and access to our WhatsApp broadcast list in your city — we activate demand before you open the doors.",
  },
  {
    icon: MessageCircle,
    title: "Ongoing Operations Desk",
    body: "Direct line to the Captain's ops team via WhatsApp. Weekly check-ins for the first 3 months, monthly review calls thereafter — you're never sailing alone.",
  },
];

const tiers = [
  { name: "Kiosk", investment: "₹8–12L", size: "80–120 sq ft", royalty: "6%", roi: "12–18 months" },
  { name: "Outpost", investment: "₹15–22L", size: "200–350 sq ft", royalty: "7%", roi: "14–20 months" },
  { name: "Flagship", investment: "₹25–35L", size: "400–600 sq ft", royalty: "8%", roi: "16–24 months" },
];

const budgetOptions = ["₹5–10L", "₹10–20L", "₹20–35L", "₹35L+"];

export default function FranchiseSection() {
  const [form, setForm] = useState({ name: "", city: "", phone: "", budget: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `*Franchise Inquiry — Captain Kunafa*\n\nName: ${form.name}\nCity: ${form.city}\nPhone: ${form.phone}\nBudget: ${form.budget}\n\nMessage: ${form.message || "No additional message"}`
    );
    window.open(`https://wa.me/919000000000?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="franchise" className="py-28 px-4 sm:px-8 bg-[#FFF8EC] border-t border-[#E7DCC9]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#EFB80D] bg-[#EFB80D]/10 border border-[#EFB80D]/30 px-4 py-1.5 rounded-full mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>JOIN THE FLEET</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#2B1B12] leading-tight mb-4">
            Own a <SwashAccent>Captain's</SwashAccent> Outpost
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#7A6A5B]">
            We've built the recipe, the brand, and the playbook. You bring the ambition — we'll help you chart the rest.
          </p>
        </div>

        {/* Investment Tiers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-[20px] border ${idx === 1 ? "bg-[#2B1B12] border-[#EFB80D]/40 text-[#FFF8EC]" : "bg-white border-[#E7DCC9] text-[#2B1B12]"}`}
            >
              {idx === 1 && (
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#EFB80D] mb-3">MOST POPULAR</div>
              )}
              <div className={`font-display text-2xl font-semibold mb-1 ${idx === 1 ? "text-[#EFB80D]" : "text-[#2B1B12]"}`}>
                {tier.name}
              </div>
              <div className="font-sans text-2xl font-bold mb-4">{tier.investment}</div>
              <div className="space-y-2 font-mono text-xs">
                {[
                  ["Floor Area", tier.size],
                  ["Royalty Fee", tier.royalty],
                  ["Est. ROI Period", tier.roi],
                ].map(([k, v]) => (
                  <div key={k} className={`flex justify-between ${idx === 1 ? "text-[#B3A697]" : "text-[#7A6A5B]"}`}>
                    <span>{k}</span>
                    <span className={idx === 1 ? "text-[#EFB80D]" : "text-[#2B1B12] font-semibold"}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Value Props Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {valueProps.map(({ icon: Icon, title, body }, idx) => (
            <div key={idx} className="p-6 bg-white border border-[#E7DCC9] rounded-[20px] hover:border-[#EFB80D]/40 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-full bg-[#EFB80D]/10 border border-[#EFB80D]/30 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-[#EFB80D]" />
              </div>
              <h3 className="font-display font-semibold text-lg text-[#2B1B12] mb-2">{title}</h3>
              <p className="font-sans text-sm text-[#7A6A5B] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#2B1B12] mb-4">
              Ready to <SwashAccent>Set Sail</SwashAccent>?
            </h3>
            <p className="font-sans text-sm text-[#7A6A5B] leading-relaxed mb-6">
              Fill out the form and the Captain's team will reach out within 24 hours. No pressure, no pitches — just a straight conversation about the opportunity.
            </p>
            <div className="space-y-3 font-mono text-xs text-[#7A6A5B]">
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#EFB80D]" /> Response within 24 hours</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#EFB80D]" /> No commitment required to enquire</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#EFB80D]" /> Site visit & demo tray arranged on request</div>
            </div>
          </div>

          {submitted ? (
            <div className="p-10 bg-white border border-[#EFB80D]/40 rounded-[20px] text-center">
              <div className="w-16 h-16 rounded-full bg-[#EFB80D]/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-[#EFB80D]" />
              </div>
              <h4 className="font-display font-semibold text-xl text-[#2B1B12] mb-2">Inquiry Sent!</h4>
              <p className="font-sans text-sm text-[#7A6A5B]">Our team will contact you via WhatsApp within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-[#E7DCC9] rounded-[20px] p-6 sm:p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A6A5B] mb-1.5">Full Name *</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-[#E7DCC9] bg-[#FFF8EC] font-sans text-sm text-[#2B1B12] placeholder:text-[#B3A697] focus:outline-none focus:border-[#EFB80D] focus:ring-2 focus:ring-[#EFB80D]/20 transition"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A6A5B] mb-1.5">City *</label>
                  <input
                    required
                    type="text"
                    value={form.city}
                    onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                    placeholder="Your city"
                    className="w-full px-4 py-3 rounded-xl border border-[#E7DCC9] bg-[#FFF8EC] font-sans text-sm text-[#2B1B12] placeholder:text-[#B3A697] focus:outline-none focus:border-[#EFB80D] focus:ring-2 focus:ring-[#EFB80D]/20 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A6A5B] mb-1.5">Phone / WhatsApp *</label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-3 rounded-xl border border-[#E7DCC9] bg-[#FFF8EC] font-sans text-sm text-[#2B1B12] placeholder:text-[#B3A697] focus:outline-none focus:border-[#EFB80D] focus:ring-2 focus:ring-[#EFB80D]/20 transition"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A6A5B] mb-1.5">Investment Budget *</label>
                <div className="grid grid-cols-2 gap-2">
                  {budgetOptions.map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, budget: opt }))}
                      className={`px-3 py-2.5 rounded-xl font-mono text-xs border transition-all cursor-pointer ${form.budget === opt ? "bg-[#EFB80D] border-[#EFB80D] text-[#2B1B12] font-bold" : "border-[#E7DCC9] bg-[#FFF8EC] text-[#7A6A5B] hover:border-[#EFB80D]/50"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A6A5B] mb-1.5">Message (optional)</label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us about your location, experience, or any questions…"
                  className="w-full px-4 py-3 rounded-xl border border-[#E7DCC9] bg-[#FFF8EC] font-sans text-sm text-[#2B1B12] placeholder:text-[#B3A697] focus:outline-none focus:border-[#EFB80D] focus:ring-2 focus:ring-[#EFB80D]/20 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#EFB80D] hover:bg-[#ffc926] text-[#2B1B12] font-semibold font-sans px-6 py-4 rounded-full transition-all hover:scale-[1.02] active:scale-95 focus-visible:outline-2 focus-visible:outline-[#EFB80D] cursor-pointer shadow-[0_0_20px_rgba(239,184,13,0.25)]"
              >
                <Phone className="w-4 h-4" />
                Send via WhatsApp
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
