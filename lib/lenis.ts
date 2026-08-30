/**
 * Smoothly scrolls to a numeric pixel offset or CSS selector string.
 * Uses the global Lenis smooth-scroll instance if available, with native smooth fallback.
 */
export function scrollToWithLenis(target: string | number) {
  if (typeof window === "undefined") return;

  const globalHolder = window as unknown as { lenis?: { scrollTo?: (t: unknown) => void } };
  if (globalHolder.lenis && typeof globalHolder.lenis.scrollTo === "function") {
    globalHolder.lenis.scrollTo(target);
  } else if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
}
