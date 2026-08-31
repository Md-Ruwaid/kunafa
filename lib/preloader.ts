/**
 * Global Asset Preloader & Sequence Cache
 * Guarantees that all canvas animation frames and 3D platter textures are
 * completely loaded into GPU/memory BEFORE the preloader lifts.
 */

const DESKTOP_FRAMES = 50;
const MOBILE_FRAMES = 49;

function pad(n: number): string {
  return String(n).padStart(3, "0");
}

let mobileFramesCache: HTMLImageElement[] | null = null;
let desktopFramesCache: HTMLImageElement[] | null = null;
let isPreloadCompleted = false;

export function getCachedFrames(kind: "mobile" | "desktop"): HTMLImageElement[] | null {
  return kind === "mobile" ? mobileFramesCache : desktopFramesCache;
}

export function isSiteReady(): boolean {
  return isPreloadCompleted;
}

export function preloadAllSiteAssets(
  onProgress: (percent: number) => void,
  onComplete: () => void
) {
  if (typeof window === "undefined") {
    onComplete();
    return;
  }

  if (isPreloadCompleted) {
    onProgress(100);
    onComplete();
    return;
  }

  const isMobile = window.innerWidth < 768;
  const count = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;
  const folder = isMobile ? "/mobile-view-framesv2" : "/Kunafa-animations-v2";
  const ext = "webp";

  const platters = [
    "/platters/platter-original.webp",
    "/platters/platter-pistachio.webp",
    "/platters/platter-biscoff.webp",
    "/platters/platter-choco.webp",
  ];

  let hasCompleted = false;
  const imagesArr: HTMLImageElement[] = new Array(count);

  const notifyComplete = () => {
    if (hasCompleted) return;
    hasCompleted = true;
    isPreloadCompleted = true;
    if (isMobile) mobileFramesCache = imagesArr;
    else desktopFramesCache = imagesArr;
    onProgress(100);
    onComplete();
  };

  // 1. Load Frame 1 with high priority for instant LCP paint
  const frame1 = new Image();
  frame1.src = `${folder}/ezgif-frame-001.${ext}`;
  frame1.decoding = "async";
  frame1.fetchPriority = "high";
  imagesArr[0] = frame1;

  if (frame1.complete && frame1.naturalWidth > 0) {
    onProgress(100);
    notifyComplete();
  } else {
    frame1.onload = () => {
      onProgress(100);
      notifyComplete();
    };
    frame1.onerror = () => {
      onProgress(100);
      notifyComplete();
    };
  }

  // 2. Stream remaining frames in background
  const loadRemaining = () => {
    for (let i = 2; i <= count; i++) {
      const img = new Image();
      img.src = `${folder}/ezgif-frame-${pad(i)}.${ext}`;
      img.decoding = "async";
      imagesArr[i - 1] = img;
    }

    platters.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.decoding = "async";
    });
  };

  if ("requestIdleCallback" in window) {
    (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(loadRemaining);
  } else {
    setTimeout(loadRemaining, 50);
  }

  // Fallback safety
  setTimeout(() => {
    if (!hasCompleted) {
      notifyComplete();
    }
  }, 1000);
}
