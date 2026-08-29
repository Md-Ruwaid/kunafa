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
        stroke="#DA7034"
        strokeWidth="1"
        opacity="0.5"
      />
      <circle
        cx="50"
        cy="50"
        r="34"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Cardinal Points */}
      <polygon points="50,6 55,38 50,33 45,38" fill="#EFB80D" />
      <polygon points="50,94 55,62 50,67 45,62" fill="#DA7034" />
      <polygon points="94,50 62,55 67,50 62,45" fill="#EFB80D" />
      <polygon points="6,50 38,55 33,50 38,45" fill="#DA7034" />

      {/* Secondary Points */}
      <polygon points="78,22 58,42 54,38 68,28" fill="#EFB80D" opacity="0.7" />
      <polygon points="22,78 42,58 38,54 28,68" fill="#DA7034" opacity="0.7" />
      <polygon points="78,78 58,58 62,54 72,68" fill="#DA7034" opacity="0.7" />
      <polygon points="22,22 42,42 38,46 28,32" fill="#EFB80D" opacity="0.7" />

      {/* Center Pivot */}
      <circle cx="50" cy="50" r="5" fill="#2B1B12" stroke="#EFB80D" strokeWidth="2" />
      <circle cx="50" cy="50" r="1.5" fill="#EFB80D" />

      {/* Degree ticks */}
      <text x="50" y="16" textAnchor="middle" fontSize="6" fontFamily="var(--font-ibm-mono)" fill="#EFB80D" fontWeight="bold">N</text>
      <text x="50" y="90" textAnchor="middle" fontSize="6" fontFamily="var(--font-ibm-mono)" fill="#DA7034" fontWeight="bold">S</text>
      <text x="88" y="52" textAnchor="middle" fontSize="6" fontFamily="var(--font-ibm-mono)" fill="#EFB80D" fontWeight="bold">E</text>
      <text x="12" y="52" textAnchor="middle" fontSize="6" fontFamily="var(--font-ibm-mono)" fill="#DA7034" fontWeight="bold">W</text>
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
      <circle cx="50" cy="50" r="24" fill="none" stroke="#DA7034" strokeWidth="2.5" />

      {/* Spokes & Handles */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 50 50)`}>
          <line x1="50" y1="50" x2="50" y2="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="8" r="4" fill="#DA7034" stroke="currentColor" strokeWidth="1.5" />
        </g>
      ))}

      {/* Hub */}
      <circle cx="50" cy="50" r="10" fill="#2B1B12" stroke="currentColor" strokeWidth="3" />
      <circle cx="50" cy="50" r="4" fill="#EFB80D" />
    </svg>
  );
}

export function CaptainSeal({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#EFB80D]/40 bg-[#FFF8EC] shadow-sm ${className}`}
    >
      <div className="w-6 h-6 rounded-full bg-[#EFB80D]/20 border border-[#EFB80D] flex items-center justify-center shrink-0">
        <ShipHelm size={16} />
      </div>
      <div className="flex flex-col text-left">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#DA7034] font-semibold">
          ORIGINAL BARKAS RECIPE
        </span>
        <span className="font-mono text-[8px] tracking-wider text-[#7A6A5B]">
          17.3115° N, 78.4871° E · EST. 2021
        </span>
      </div>
    </div>
  );
}
