import React from "react";
import { Star, Anchor } from "lucide-react";
import SwashAccent from "@/components/SwashAccent";

const reviews = [
  {
    author: "Mohammed Irfan",
    location: "Barkas Flagship",
    rating: 5,
    date: "Aug 2026",
    quote: "The crunch literally echoes in the room. Every strand of kataifi is individually golden. I've been to the original in Jordan — Captain Kunafa holds up.",
    title: "Best Kunafa in Hyderabad, Period.",
  },
  {
    author: "Priya Reddy",
    location: "Jubilee Hills Outpost",
    rating: 5,
    date: "Jul 2026",
    quote: "Ordered the Choco Kunafa for a birthday — everyone went back for seconds. The chocolate filling is rich but the cheese still comes through. Genius combo.",
    title: "Choco Kunafa is Unreal",
  },
  {
    author: "Faisal Al-Hassan",
    location: "Malakpet Outpost",
    rating: 5,
    date: "Jul 2026",
    quote: "The Pistachio Crown is worth every rupee. Pistachios are fresh, not the dried-out grocery ones. The orange blossom syrup isn't overpowering. Perfectly balanced.",
    title: "Pistachio Crown = ₹220 Well Spent",
  },
  {
    author: "Sneha Nair",
    location: "Tolichowki Outpost",
    rating: 5,
    date: "Jun 2026",
    quote: "Watched them press the tray live — the butter smell, the sizzle, the snap when you cut into it. We got four different flavours for the office and every single one was gone in 10 minutes.",
    title: "Office Catering Was a Massive Hit",
  },
  {
    author: "Rahul Sharma",
    location: "Aero City Outpost",
    rating: 5,
    date: "Jun 2026",
    quote: "Stopped by before a flight thinking I'd grab one quick piece. Ended up getting a full tray to take home. The Biscoff one is dangerously good.",
    title: "Perfect Pre-Flight Stop",
  },
  {
    author: "Ayesha Siddiqui",
    location: "Barkas Flagship",
    rating: 5,
    date: "May 2026",
    quote: "Used Captain Kunafa for my daughter's mehendi — live station with 2 copper pans. Guests are still talking about it a month later. Completely handled all the setup.",
    title: "Wedding Event Was Flawless",
  },
];

export default function ShipsLog() {
  return (
    <section className="py-28 px-4 sm:px-8 bg-[#FFF8EC] text-[#2B1B12] border-t border-[#E7DCC9] relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#EFB80D] bg-[#EFB80D]/10 border border-[#EFB80D]/30 px-4 py-1.5 rounded-full mb-4">
            <Anchor className="w-4 h-4" />
            <span>THE SHIP'S LOG</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#2B1B12] leading-tight mb-4">
            Real Reviews from <SwashAccent>Real Voyagers</SwashAccent>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#7A6A5B]">
            Verified Google reviews from customers across all 5 Hyderabad outposts.
          </p>

          {/* Aggregate badge */}
          <div className="inline-flex items-center gap-3 mt-6 px-6 py-3 bg-white border border-[#E7DCC9] rounded-full">
            <div className="flex gap-0.5 text-[#EFB80D]">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <span className="font-display font-semibold text-[#2B1B12]">4.8</span>
            <span className="font-mono text-xs text-[#7A6A5B]">/ 5 · 500+ Google reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E7DCC9] rounded-[20px] p-6 flex flex-col justify-between hover:border-[#EFB80D]/40 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center gap-1 text-[#EFB80D] mb-3">
                  {[...Array(rev.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                </div>
                <h3 className="font-display font-semibold text-base text-[#2B1B12] mb-2">"{rev.title}"</h3>
                <p className="font-sans text-xs text-[#7A6A5B] leading-relaxed mb-4">{rev.quote}</p>
              </div>
              <div className="pt-3 border-t border-[#E7DCC9] flex items-center justify-between font-mono text-[11px]">
                <div>
                  <div className="text-[#2B1B12] font-medium">{rev.author}</div>
                  <div className="text-[#B3A697]">{rev.location}</div>
                </div>
                <span className="text-[#EFB80D]/80">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
