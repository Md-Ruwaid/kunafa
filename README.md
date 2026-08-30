# Captain Kunafa — Official Website

Modern, high-performance web experience for **Captain Kunafa**, Hyderabad's premier authentic Middle Eastern kunafa brand founded in 2021 by Saud bin Nasar Khulagi.

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion, Lenis smooth scrolling, OGL WebGL 3D carousel, and an interactive Leaflet branch locator.

---

## 🛠️ Tech & Typography Stack

- **Framework**: Next.js 16.3 (Turbopack) & React 19
- **Styling**: Tailwind CSS v4 with custom tactile 3D theme tokens
- **Motion & 3D**:
  - Lenis inertial momentum smooth scroll
  - OGL (WebGL) 3D curved cylinder image gallery (`CircularGallery.tsx`)
  - 60–120 FPS canvas scrollytelling engine (`KunafaExplodeCanvas.tsx`)
  - Leaflet map with ArcGIS Dark Canvas vector tiles (`CaptainsMap.tsx`)
- **Typography** (optimized via `next/font/google`):
  - **Display**: Fraunces (`--font-display`)
  - **Body / Sans**: Work Sans (`--font-sans`)
  - **Monospace**: IBM Plex Mono (`--font-mono`)
  - **Brand Wordmark**: Luckiest Guy (`--font-brand` / `--font-luckiest-guy`)

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## 🎬 Scrollytelling Frame Sequences

The repository contains two high-resolution frame sequences under `public/`:
- `public/Kunafa-animations-v2/` (100 widescreen frames, `1280x720`): Desktop scrollytelling explosion sequence.
- `public/mobile-view-framesv2/` (50 portrait frames, `720x1280`): Mobile-optimized vertical levitation and explosion sequence.

The engine (`KunafaExplodeCanvas.tsx`) dynamically detects the active viewport, preloading only the necessary frame sequence on demand to minimize network payload and bandwidth usage.

---

## ⚠️ Pre-Launch Checklist & Placeholders

The following placeholders should be verified with the client before production launch:
1. **Branch Phone Numbers & WhatsApp Hotline**: Defined in `lib/contact.ts` and `BRANCHES` array in `components/CaptainsChart.tsx`.
2. **Aero City Branch Details**: Real street address, operating hours, and exact coordinates in `components/CaptainsChart.tsx`.
3. **Open Graph Social Card**: Final 1200×630 banner asset at `public/og-image.jpg`.
