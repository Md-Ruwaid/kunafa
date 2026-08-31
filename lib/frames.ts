// Shared config for the hero scrollytelling frame sequences.
// Imported by both KunafaExplodeCanvas (the renderer) and SitePreloader (the
// loading gate) so the two can never disagree about which sequence is active.

export type FrameKind = "mobile" | "desktop";

/**
 * Viewport width at which the portrait sequence takes over.
 * MUST stay in sync with the `md:` breakpoint used for the hero container
 * height in KunafaExplodeCanvas — Tailwind's `md` is also 768px.
 */
export const MOBILE_BREAKPOINT = 768;

export const DESKTOP_FRAMES = 100;
export const DESKTOP_WIDTH = 1280;
export const DESKTOP_HEIGHT = 720;

export const MOBILE_FRAMES = 130;
export const MOBILE_WIDTH = 720;
export const MOBILE_HEIGHT = 1280;

const FOLDERS: Record<FrameKind, string> = {
  mobile: "/mobile-view-framesv2",
  desktop: "/Kunafa-animations-v2",
};

export function frameCount(kind: FrameKind): number {
  return kind === "mobile" ? MOBILE_FRAMES : DESKTOP_FRAMES;
}

/** Builds the URL for a 1-based frame number, e.g. 7 -> ".../ezgif-frame-007.webp" */
export function frameUrl(kind: FrameKind, frameNumber: number): string {
  return `${FOLDERS[kind]}/ezgif-frame-${String(frameNumber).padStart(3, "0")}.webp`;
}

export function activeFrameKind(width?: number): FrameKind {
  if (typeof window === "undefined") return "desktop";
  const w = width ?? window.innerWidth;
  return w < MOBILE_BREAKPOINT ? "mobile" : "desktop";
}
