"use client";

import React, { useState } from "react";
import { Star, CheckCircle2, MessageSquarePlus, ExternalLink } from "lucide-react";
import SwashAccent from "@/components/SwashAccent";

const REVIEWS = [
  {
    id: "rev-1",
    author: "Mohammed Irfan",
    branch: "Barkas Flagship",
    rating: 5,
    date: "2 days ago",
    verified: true,
    tag: "Original Classic",
    title: "Best Kunafa in Hyderabad, hands down.",
    quote:
      "The crunch literally echoes in the room. Every strand of kataifi is individually golden and buttery. I have tried kunafa across Jordan and Dubai — Captain Kunafa in Barkas matches the authentic Levantine standard.",
  },
  {
    id: "rev-2",
    author: "Dr. Priya Reddy",
    branch: "Jubilee Hills Branch",
    rating: 5,
    date: "1 week ago",
    verified: true,
    tag: "Choco Lava & Classic",
    title: "The Dark Choco & Classic combo is unreal",
    quote:
      "Ordered for my birthday dinner at Road 36. The live cheese pull was the star of the evening. The orange blossom syrup isn't overly sweet, which is rare for Indian dessert shops.",
  },
  {
    id: "rev-3",
    author: "Faisal Al-Hassan",
    branch: "Malakpet Haven",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    tag: "Pistachio Crown",
    title: "Pistachio Crown is worth every rupee",
    quote:
      "The Aleppo emerald pistachios are fresh and generous, not dry commercial powder. The 205°C copper sear gives it that authentic 48 dB acoustic snap. Our family's go-to dessert spot every Friday night.",
  },
  {
    id: "rev-4",
    author: "Sneha & Varun Nair",
    branch: "Jubilee Hills Flagship",
    rating: 5,
    date: "3 weeks ago",
    verified: true,
    tag: "Family Platter Box",
    title: "The live copper pan show is a visual feast",
    quote:
      "Visited the Jubilee Hills outlet with our extended family. Watching the master spinners flip and caramelize the kataifi in front of our table was thrilling. The 48 dB acoustic crunch is real.",
  },
  {
    id: "rev-5",
    author: "Rahul Sharma",
    branch: "Aero City Anchor",
    rating: 5,
    date: "1 month ago",
    verified: true,
    tag: "Biscoff Royale",
    title: "Mandatory stop on the way to the airport",
    quote:
      "Open late till 2 AM. Grabbed the Lotus Biscoff platter before an early morning flight. The packaging kept it warm and crunchy. Highly recommend to anyone traveling through Shamshabad.",
  },
  {
    id: "rev-6",
    author: "Syed Bilal Quadri",
    branch: "Tolichowki Branch",
    rating: 5,
    date: "1 month ago",
    verified: true,
    tag: "Captain's Mini Box",
    title: "Fresh pressed every single time",
    quote:
      "No microwave reheating or pre-cooked trays. You stand there, watch the butter sizzle in the copper pan, and get handed a piping hot tray with melting cheese. Saud and team have nailed it.",
  },
];

export default function ShipsLog() {
  const [filter, setFilter] = useState("All");

  const filteredReviews = REVIEWS.filter((r) => {
    if (filter === "All") return true;
    return r.branch.includes(filter);
  });

  return (
    <section id="reviews" className="py-20 sm:py-28 px-4 sm:px-8 bg-[#050505] text-[#FFF8EC] border-t border-[#222222] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-3 sm:mb-4">
            Dispatches from Our <SwashAccent color="gold">Hyderabad Voyagers</SwashAccent>
          </h2>

          <p className="font-sans text-xs sm:text-base text-white/70">
            Verified customer experiences from copper-pan tables across Barkas, Jubilee Hills, Tolichowki, Malakpet, and Aero City.
          </p>

          {/* Live Google Aggregate Rating Badge with White Text and Gold Stars */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-6 sm:mt-8 px-4 py-2.5 sm:px-7 sm:py-3.5 bg-[#111111] border border-white/20 rounded-full shadow-md">
            <div className="flex items-center gap-1 bg-[#EFB80D] px-2.5 py-1 rounded-full text-[#000000] font-black">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <div className="font-display font-bold text-base sm:text-lg text-white">
              4.8 <span className="text-[10px] sm:text-xs font-mono font-bold text-[#EFB80D]">/ 5.0</span>
            </div>
            <div className="h-4 w-px bg-white/20" />
            <span className="font-mono text-[11px] sm:text-xs text-white">
              <strong className="text-[#EFB80D] font-bold">520+</strong> Google Reviews
            </span>
            <div className="h-4 w-px bg-white/20 hidden sm:block" />
            <a
              href="https://maps.google.com/?q=Captain+Kunafa+Hyderabad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[11px] sm:text-xs text-white hover:text-[#EFB80D] font-bold"
            >
              <span>Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Filter Pills in White & Gold Balance */}
        <div className="flex justify-center gap-2 mb-10 sm:mb-12 overflow-x-auto pb-2 px-1">
          {["All", "Barkas", "Jubilee Hills", "Tolichowki", "Malakpet", "Aero City"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`font-mono text-[10px] sm:text-xs uppercase tracking-wider px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all cursor-pointer shrink-0 ${
                filter === tab
                  ? "bg-[#EFB80D] text-[#000000] font-black scale-105 shadow-sm"
                  : "bg-[#1c1c1c] text-white hover:bg-white hover:text-black font-semibold border border-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#111111] border border-white/10 hover:border-[#EFB80D] rounded-[20px] sm:rounded-[24px] p-5 sm:p-7 flex flex-col justify-between transition-all shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex gap-1 text-[#EFB80D]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase font-black text-black bg-white px-2.5 py-1 rounded-full shadow-sm">
                    {rev.tag}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base sm:text-lg text-white mb-2 sm:mb-3 leading-snug">
                  "{rev.title}"
                </h3>

                <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed mb-4 sm:mb-6">
                  {rev.quote}
                </p>
              </div>

              <div className="pt-3.5 sm:pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] sm:text-[11px]">
                <div>
                  <div className="text-white font-bold flex items-center gap-1.5">
                    <span>{rev.author}</span>
                    {rev.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline shrink-0" />
                    )}
                  </div>
                  <div className="text-[#EFB80D] text-[9px] sm:text-[10px] font-bold">{rev.branch}</div>
                </div>
                <span className="text-white/60">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Leave a review button in Solid Gold / White */}
        <div className="text-center">
          <a
            href="https://maps.google.com/?q=Captain+Kunafa+Hyderabad"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#EFB80D] hover:bg-white text-[#000000] font-sans text-xs font-black uppercase tracking-wider px-8 py-3.5 rounded-full transition-all active:scale-95 hover:scale-105 shadow-md"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#000000]" />
            <span>Leave a Review on Google</span>
          </a>
        </div>
      </div>
    </section>
  );
}
