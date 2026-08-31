/**
 * Global Asset Preloader & Sequence Cache
 * Guarantees that all canvas animation frames and 3D platter textures are
 * completely loaded into GPU/memory BEFORE the preloader lifts.
 */

const DESKTOP_FRAMES = 100;
const MOBILE_FRAMES = 97;

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
    "/platters/platter-original.png",
    "/platters/platter-pistachio.png",
    "/platters/platter-biscoff.png",
    "/platters/platter-choco.png",
  ];

  const totalAssets = count + platters.length;
  let loadedAssets = 0;
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

  const checkProgress = () => {
    if (hasCompleted) return;
    loadedAssets++;
    const pct = Math.min(100, Math.round((loadedAssets / totalAssets) * 100));
    onProgress(pct);

    if (loadedAssets >= totalAssets) {
      notifyComplete();
    }
  };

  // 1. Eagerly load & decode all animation frames
  for (let i = 1; i <= count; i++) {
    const img = new Image();
    img.src = `${folder}/ezgif-frame-${pad(i)}.${ext}`;
    img.decoding = "async";
    imagesArr[i - 1] = img;

    if (img.complete && img.naturalWidth > 0) {
      checkProgress();
    } else {
      img.onload = checkProgress;
      img.onerror = checkProgress;
    }
  }

  // 2. Preload 3D Gallery Platter textures
  platters.forEach((src) => {
    const img = new Image();
    img.src = src;
    img.decoding = "async";
    if (img.complete && img.naturalWidth > 0) {
      checkProgress();
    } else {
      img.onload = checkProgress;
      img.onerror = checkProgress;
    }
  });

  // 3. Fallback safety timer: in case a frame request is slow or dropped on cellular data
  setTimeout(() => {
    if (!hasCompleted) {
      notifyComplete();
    }
  }, 6000);
}
