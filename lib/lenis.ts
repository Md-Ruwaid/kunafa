type ScrollTarget = string | number | HTMLElement;

interface LenisLike {
  scrollTo?: (target: ScrollTarget) => void;
  stop?: () => void;
  start?: () => void;
}

// The Lenis instance is owned by SmoothScroll (a layout-level component), but
// scroll locks are requested by page-level components. React runs child effects
// BEFORE parent effects, so a lock can be requested before the instance exists.
// The desired state is therefore held here and applied on registration.
let instance: LenisLike | undefined;
let enabled = true;

function apply() {
  if (!instance) return;
  if (enabled) instance.start?.();
  else instance.stop?.();
}

export function registerLenis(lenis: LenisLike) {
  instance = lenis;
  apply();
}

export function unregisterLenis() {
  instance = undefined;
  enabled = true;
}

function resolve(): LenisLike | undefined {
  if (instance) return instance;
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { lenis?: LenisLike }).lenis;
}

/**
 * Smoothly scrolls to a numeric pixel offset or CSS selector string.
 * Uses the global Lenis smooth-scroll instance if available, with native smooth fallback.
 */
export function scrollToWithLenis(target: string | number) {
  if (typeof window === "undefined") return;

  const lenis = resolve();
  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.scrollTo(target);
  } else if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * Pauses or resumes Lenis.
 *
 * Setting `body { overflow: hidden }` is NOT enough to hold the page still:
 * Lenis drives scroll from wheel/touch events, so it keeps moving underneath
 * an overlay. Anything that locks scrolling must call this too.
 */
export function setLenisEnabled(value: boolean) {
  enabled = value;
  apply();
}
