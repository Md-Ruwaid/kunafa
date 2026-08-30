# Project Blueprint: Captain Kunafa Web Application

## Executive Overview
**Captain Kunafa** is a modern Next.js web application built for Hyderabad's premier authentic Levantine dessert brand (founded by Saud bin Nasar Khulagi). The app delivers a culinary scrollytelling experience featuring 2D canvas frame sequences, 3D WebGL platter showcases, interactive branch mapping across 5 Hyderabad locations, and zero-friction WhatsApp ordering.

---

## 1. Technical Stack & Dependencies

- **Framework**: Next.js 16.3.3 (App Router) + React 19 + TypeScript 5
- **Styling**: Tailwind CSS v4 + Custom Dark Theme Tokens in [globals.css](../app/globals.css)
- **Scrollytelling & Visuals**:
  - HTML5 Canvas (high-performance RAF loop rendering 100/130 frame image sequences)
  - `OGL` + custom WebGL fragment shaders for 3D curved gallery in [CircularGallery.tsx](../components/CircularGallery.tsx)
  - `Framer Motion` 13 for fluid UI transitions
- **Mapping**: Leaflet + `react-leaflet` with Esri Dark Gray canvas tiles & Google Maps fallback embeds
- **Smooth Scroll**: `Lenis` v1.3 smooth scrolling with dynamic RAF integration
- **Typography**: Google Fonts via `next/font/google`:
  - `Fraunces` (Headings & Swash Accents)
  - `Work Sans` (Body Text)
  - `IBM Plex Mono` (Coordinates, Codes & System Badges)
  - `Luckiest Guy` (Brand Wordmark)

---

## 2. Core Architecture & Page Flow

The application follows a single-page scrollytelling architecture centered around [app/page.tsx](../app/page.tsx) and wrapped by global layout providers in [app/layout.tsx](../app/layout.tsx).

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      SitePreloader (Screen Lock)                        │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│                  KunafaExplodeCanvas (#story - Hero)                   │
│   • Desktop: 100 Frames (1280x720)  │  Mobile: 130 Frames (720x1280)    │
│   • 4 Narrative Acts: Origin ➔ Craft ➔ Core Science ➔ Reassembled       │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│                        AboutSection (#about)                           │
│   • Brand heritage & Levantine craft story (Founding year: 2021)       │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│                        MenuPreview (#menu)                             │
│   • 3D WebGL CircularGallery (Original, Pistachio, Biscoff, Choco)      │
│   • Direct WhatsApp Order CTA                                           │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│                      CaptainsChart (#locations)                         │
│   • 5 Branches: Barkas, Malakpet, Tolichowki, Jubilee Hills, Aero City  │
│   • Interactive Leaflet Map (Dark Esri tiles) + Google Maps Embed Mode  │
│   • Branch Spotlight Card (Directions, Call, WhatsApp)                  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Component Deep Dive & Responsibilities

### 1. Site Preloader ([SitePreloader.tsx](../components/SitePreloader.tsx))
- **Role**: Prevents layout jump by locking `document.body.overflow` while preloading critical branding assets (`/logo.png`, platter images) and the initial 15 frames of the scrollytelling canvas sequence.
- **Key Details**: Features a luxury gold progress bar with status text ("Firing live copper hearth...", "Desalinating mountain Akawi curd...") and a 3.2s safety fallback.

### 2. Scrollytelling Hero Canvas ([KunafaExplodeCanvas.tsx](../components/KunafaExplodeCanvas.tsx))
- **Role**: Sticky viewport (`h-[900vh]`) canvas sequence that deconstructs and reassembles a fresh Kunafa platter as the user scrolls.
- **Performance Optimization**: Zero React re-renders during scroll. All scroll progress tracking, text opacity switches, and translate transforms run directly via DOM refs (`requestAnimationFrame` + `ResizeObserver` + `IntersectionObserver`).
- **Responsive Sequences**:
  - Landscape: [public/Kunafa-animations-v2/](../public/Kunafa-animations-v2) (100 frames)
  - Portrait Mobile: [public/mobile-view-kunafa/](../public/mobile-view-kunafa) (130 frames with `Math.pow(progress, 1.75)` curve for frame pacing)

### 3. About Section ([AboutSection.tsx](../components/AboutSection.tsx))
- **Role**: Transitions out of the hero viewport with an overlapping top curve and shadow, presenting the brand's core values, mountain Akawi cheese quality, and live copper pan technique.

### 4. Signature Menu & WebGL Gallery ([MenuPreview.tsx](../components/MenuPreview.tsx) & [CircularGallery.tsx](../components/CircularGallery.tsx))
- **Role**: Showcases the 4 artisanal platters (Original, Pistachio, Biscoff, Chocolate) using an interactive 3D WebGL cylinder created with OGL shaders.
- **Features**: Drag/scroll bend physics, high-DPI texture loading, and smooth gradient depth fading.

### 5. Multi-Branch Locator & Map ([CaptainsChart.tsx](../components/CaptainsChart.tsx) & [CaptainsMap.tsx](../components/CaptainsMap.tsx))
- **Role**: Displays the 5 official Hyderabad branches:
  1. **Barkas** (`HYD-01` - Original Location, Est. 2021)
  2. **Malakpet** (`HYD-02`)
  3. **Tolichowki** (`HYD-03`)
  4. **Jubilee Hills** (`HYD-04`)
  5. **Aero City** (`HYD-05` - Shamshabad)
- **Features**: Dual map view mode toggle (Interactive Leaflet Map with gold SVG pins / Google Maps embed iframe), active branch spotlight card with quick-action buttons (Directions, WhatsApp order, Direct Call).

### 6. Navigation & Global Layout ([Navbar.tsx](../components/Navbar.tsx) & [Footer.tsx](../components/Footer.tsx))
- **Navbar**: Floating header with auto-hide on scroll-down and reveal on scroll-up, active section indicator via `IntersectionObserver`, and mobile drawer with body scroll lock.
- **Footer**: Quality promise badges (100% Clarified Ghee, 18-hour cold desalinated Akawi curd, Aleppo pistachios), central HQ details, quick links, and Back to Top scroll trigger.
- **SEO & Schema**: Embedded `Restaurant` JSON-LD structured data in [app/layout.tsx](../app/layout.tsx) with OpenGraph and Twitter card metadata.

---

## 4. Key Utilities & Helpers

- **WhatsApp Link Generation**: [lib/contact.ts](../lib/contact.ts) formats phone numbers into `https://wa.me/91...` direct-message URLs with custom order text.
- **Smooth Scrolling Integration**: [lib/lenis.ts](../lib/lenis.ts) provides `scrollToWithLenis()` for smooth section scrolling.
- **Tactile Button System**: Custom 3D push-button styles defined in [app/globals.css](../app/globals.css) (`.btn-tactile-gold`, `.btn-tactile-dark`).

---

## 5. Summary & Status

The project is structured as a premium, highly optimized landing and discovery application for **Captain Kunafa**. All components, asset preloader sequences, Leaflet mapping controls, and WebGL gallery elements are fully implemented and passing linting.
