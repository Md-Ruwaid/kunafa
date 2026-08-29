import React from "react";
import { Star, Quote, Anchor } from "lucide-react";
import SwashAccent from "@/components/SwashAccent";

export default function ShipsLog() {
  const reviews = [
    {
      author: "Sultan Al-Otaibi",
      location: "Riyadh Front Outpost",
      rating: 5,
      date: "28 Aug 2026",
      quote:
        "The audible snap on the first fork cut is real. The cheese stretch doesn’t break, and the orange blossom attar isn’t cloying. Captain Kunafa is in a league of its own.",
      title: "Masterclass in Middle Eastern Pastry",
    },
    {
      author: "Elena Rostova",
      location: "Dubai Mall Fashion Ave",
      rating: 5,
      date: "14 Aug 2026",
      quote:
        "Watching the copper pan caramelize at the live counter is half the fun. The combination of desalinated Akawi and warm A2 ghee makes you forget any other kunafa you’ve ever tried.",
      title: "Unrivaled Freshness & Crunch",
    },
    {
      author: "Tariq Mansoor",
      location: "Doha Mina Port",
      rating: 5,
      date: "02 Aug 2026",
      quote:
        "The Aleppo emerald pistachio dust brings an earthy tannin that balances the honeyed nectar perfectly. A true nautical culinary journey.",
      title: "Pure Royal Heritage",
    },
  ];

  return (
    <section className="py-28 px-4 sm:px-8 bg-[#241509] text-[#FFF8EC] border-t border-[#E7DCC9]/15 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#EFB80D] bg-[#EFB80D]/10 border border-[#EFB80D]/25 px-4 py-1.5 rounded-full mb-4">
            <Anchor className="w-4 h-4" />
            <span>THE SHIP’S LOG</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#FFF8EC] leading-tight mb-4">
            Dispatches from Our <SwashAccent>Voyagers</SwashAccent>
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#B3A697]">
            Verified customer experiences from copper-pan tables across Dubai, Riyadh, Doha, and Istanbul.
          </p>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#1a0f06] border border-[#E7DCC9]/15 rounded-[20px] p-6 sm:p-8 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center gap-1 text-[#EFB80D] mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <h3 className="font-display font-semibold text-lg text-[#FFF8EC] mb-3">
                  “{rev.title}”
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#B3A697] leading-relaxed mb-6">
                  {rev.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[11px]">
                <div>
                  <div className="text-[#FFF8EC] font-medium">{rev.author}</div>
                  <div className="text-[#7A6A5B]">{rev.location}</div>
                </div>
                <span className="text-[#EFB80D]/70">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
