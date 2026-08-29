import React from "react";

export function WaveDivider({
  fill = "#FFF8EC",
  flip = false,
  className = "",
}: {
  fill?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`w-full overflow-hidden leading-none select-none pointer-events-none ${
        flip ? "rotate-180" : ""
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-8 sm:h-12 md:h-16"
      >
        <path
          d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

export function CompassRose({
  size = 48,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`text-[#EFB80D] select-none ${className}`}
      fill="currentColor"
    >
      {/* Outer Ring */}
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="2 3"
        opacity="0.6"
      />
      <circle
        cx="50"
        cy="50"
        r="42"
        fill="none"
        stroke="#239BAF"
        strokeWidth="1"
        opacity="0.6"
      />
      <circle
        cx="50"
        cy="50"
        r="34"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Cardinal Points - Gold North/East, Aegean Teal South/West */}
      <polygon points="50,6 55,38 50,33 45,38" fill="#EFB80D" />
      <polygon points="50,94 55,62 50,67 45,62" fill="#239BAF" />
      <polygon points="94,50 62,55 67,50 62,45" fill="#EFB80D" />
      <polygon points="6,50 38,55 33,50 38,45" fill="#239BAF" />

      {/* Secondary Points */}
      <polygon points="78,22 58,42 54,38 68,28" fill="#EFB80D" opacity="0.7" />
      <polygon points="22,78 42,58 38,54 28,68" fill="#239BAF" opacity="0.8" />
      <polygon points="78,78 58,58 62,54 72,68" fill="#239BAF" opacity="0.8" />
      <polygon points="22,22 42,42 38,46 28,32" fill="#EFB80D" opacity="0.7" />

      {/* Center Pivot */}
      <circle cx="50" cy="50" r="5" fill="#1C120C" stroke="#EFB80D" strokeWidth="2" />
      <circle cx="50" cy="50" r="1.5" fill="#EFB80D" />

      {/* Degree ticks */}
      <text x="50" y="16" textAnchor="middle" fontSize="6" fontFamily="var(--font-ibm-mono)" fill="#EFB80D" fontWeight="bold">N</text>
      <text x="50" y="90" textAnchor="middle" fontSize="6" fontFamily="var(--font-ibm-mono)" fill="#239BAF" fontWeight="bold">S</text>
      <text x="88" y="52" textAnchor="middle" fontSize="6" fontFamily="var(--font-ibm-mono)" fill="#EFB80D" fontWeight="bold">E</text>
      <text x="12" y="52" textAnchor="middle" fontSize="6" fontFamily="var(--font-ibm-mono)" fill="#239BAF" fontWeight="bold">W</text>
    </svg>
  );
}

export function ShipHelm({
  size = 36,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`text-[#EFB80D] ${className}`}
      fill="currentColor"
    >
      {/* Outer Rim */}
      <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="4" />
      <circle cx="50" cy="50" r="24" fill="none" stroke="#239BAF" strokeWidth="2.5" />

      {/* Spokes & Handles */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 50 50)`}>
          <line x1="50" y1="50" x2="50" y2="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="8" r="4" fill="#239BAF" stroke="currentColor" strokeWidth="1.5" />
        </g>
      ))}

      {/* Hub */}
      <circle cx="50" cy="50" r="10" fill="#1C120C" stroke="currentColor" strokeWidth="3" />
      <circle cx="50" cy="50" r="4" fill="#EFB80D" />
    </svg>
  );
}

export function CaptainSeal({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-white text-black font-bold shadow-sm ${className}`}
    >
      <div className="w-7 h-7 rounded-full bg-[#1C120C] text-[#EFB80D] flex items-center justify-center shrink-0">
        <ShipHelm size={16} className="text-[#EFB80D]" />
      </div>
      <div className="flex flex-col text-left">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-black font-black">
          ORIGINAL BARKAS RECIPE
        </span>
        <span className="font-mono text-[8.5px] tracking-wider text-black/70 font-bold">
          17.3115° N, 78.4871° E · EST. 2021
        </span>
      </div>
    </div>
  );
}
