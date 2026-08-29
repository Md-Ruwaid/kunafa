"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Check, ShoppingBag, Flame, Shield, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { audio } from "@/lib/audio";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Tier {
  id: string;
  name: string;
  size: string;
  servings: string;
  price: number;
  popular?: boolean;
  perks: string[];
}

const TIERS: Tier[] = [
  {
    id: "solo",
    name: "Solo Voyager",
    size: "6-Inch Cast Platter",
    servings: "1-2 Explorers",
    price: 24,
    perks: ["Golden Kataifi Shell", "1x Orange Blossom Attar", "Aleppo Pistachio Dust"],
  },
  {
    id: "captain",
    name: "Captain’s Feast",
    size: "9-Inch Signature Platter",
    servings: "3-4 Explorers",
    price: 42,
    popular: true,
    perks: [
      "Double Molten Akawi Core",
      "2x Damascus Blossom Attar",
      "Heavy Emerald Pistachio Crown",
      "Thermal Keep-Warm Packaging",
    ],
  },
  {
    id: "sultan",
    name: "Sultan’s Royal Banquet",
    size: "12-Inch Grand Centerpiece",
    servings: "6-8 Explorers",
    price: 78,
    perks: [
      "Numbered Artisan Platter",
      "Signature Rosewater Pipette Kit",
      "4x Bespoke Blossom Reductions",
      "Complimentary Copper Knife",
    ],
  },
];

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [selectedTier, setSelectedTier] = useState<string>("captain");
  const [attarLevel, setAttarLevel] = useState<string>("classic");
  const [batchDate, setBatchDate] = useState<string>("today");
  const [isSuccess, setIsSuccess] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const activeTier = TIERS.find((t) => t.id === selectedTier) || TIERS[1];

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    audio.playChime(880, 0.2);

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#EFB80D", "#DA7034", "#FFFFFF", "#4ADE80"],
    });

    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-2xl bg-[#0a0a0a] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {!isSuccess ? (
            <div>
              {/* Header */}
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#EFB80D] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FRESH BATCH ALLOCATION</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white/95 mb-2">
                Reserve Your <span className="accent-italic">Captain</span> Kunafa
              </h3>

              <p className="font-sans text-xs sm:text-sm text-white/60 mb-6">
                Baked in strict small batches to guarantee optimal 48 dB acoustic crunch upon delivery.
              </p>

              {/* Step 1: Select Platter Size */}
              <div className="mb-6">
                <div className="font-mono text-xs uppercase tracking-wider text-white/50 mb-3">
                  01 / SELECT PLATTER TIER
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {TIERS.map((tier) => {
                    const isSelected = tier.id === selectedTier;
                    return (
                      <div
                        key={tier.id}
                        onClick={() => {
                          audio.playChime(500);
                          setSelectedTier(tier.id);
                        }}
                        className={`p-4 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                          isSelected
                            ? "bg-[#141208] border-[#EFB80D] shadow-[0_0_20px_rgba(239,184,13,0.15)]"
                            : "bg-white/[0.02] border-white/10 hover:border-white/20"
                        }`}
                      >
                        {tier.popular && (
                          <div className="absolute -top-2.5 right-3 bg-[#EFB80D] text-[#030303] font-mono text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            FAVORITE
                          </div>
                        )}
                        <div>
                          <div className="font-display font-semibold text-sm text-white/90 mb-0.5">
                            {tier.name}
                          </div>
                          <div className="font-mono text-[10px] text-white/40 mb-2">
                            {tier.servings}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-white/5 flex items-baseline justify-between">
                          <span className="font-mono text-base font-bold text-[#EFB80D]">
                            ${tier.price}
                          </span>
                          <span className="text-[10px] text-white/50">{tier.size}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Attar Sweetness Level */}
              <div className="mb-6">
                <div className="font-mono text-xs uppercase tracking-wider text-white/50 mb-3">
                  02 / ATTAR BLOSSOM SWEETNESS PROFILE
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "light", label: "Delicate Flora", sub: "50% Sweet" },
                    { id: "classic", label: "Captain’s Balance", sub: "100% Signature" },
                    { id: "rich", label: "Royal Nectar", sub: "125% Honeyed" },
                  ].map((level) => (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => {
                        audio.playChime(420);
                        setAttarLevel(level.id);
                      }}
                      className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                        attarLevel === level.id
                          ? "bg-[#EFB80D]/15 border-[#EFB80D] text-white"
                          : "bg-white/[0.02] border-white/10 text-white/60 hover:text-white"
                      }`}
                    >
                      <div className="font-sans text-xs font-medium">{level.label}</div>
                      <div className="font-mono text-[10px] text-white/40">{level.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Reservation Form */}
              <form onSubmit={handleReserve} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-white/50 mb-1">
                      Voyager Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sultan Zayn"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#EFB80D]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-white/50 mb-1">
                      Priority Dispatch Phone
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#EFB80D]"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between font-mono text-xs">
                  <div>
                    <span className="text-white/40">BATCH SLOT: </span>
                    <span className="text-[#EFB80D]">#084-SUNSET DISPATCH</span>
                  </div>
                  <div className="text-white/80 font-bold text-base font-mono">
                    Total: <span className="text-[#EFB80D]">${activeTier.price}.00</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#EFB80D] hover:bg-[#ffc926] text-[#030303] font-sans font-bold text-sm uppercase tracking-wider py-4 rounded-xl shadow-[0_0_30px_rgba(239,184,13,0.35)] transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>CONFIRM VIP RESERVATION</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#EFB80D]/20 border border-[#EFB80D] flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-[#EFB80D]" />
              </div>

              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#EFB80D] mb-2 block">
                RESERVATION CONFIRMED
              </span>

              <h3 className="font-display text-3xl font-semibold text-white/95 mb-4">
                Welcome Aboard, <span className="accent-italic">{name || "Voyager"}</span>
              </h3>

              <p className="font-sans text-sm text-white/70 max-w-md mx-auto mb-6">
                Your <span className="text-[#EFB80D]">{activeTier.name}</span> has been scheduled into 
                Batch #084. Dispatch notification will arrive at <span className="text-white font-mono">{phone}</span>.
              </p>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 max-w-sm mx-auto text-left mb-6 font-mono text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-white/40">Tier:</span>
                  <span className="text-white/90">{activeTier.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Platter:</span>
                  <span className="text-white/90">{activeTier.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Sweetness:</span>
                  <span className="text-white/90">{attarLevel.toUpperCase()}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-1.5 font-bold">
                  <span className="text-white/40">Confirmed Total:</span>
                  <span className="text-[#EFB80D]">${activeTier.price}.00</span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="bg-white/10 hover:bg-white/20 text-white font-sans text-xs px-8 py-3 rounded-full transition-colors cursor-pointer"
              >
                Close & Return to Voyage
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
