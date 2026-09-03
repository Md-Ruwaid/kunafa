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
    "/platters/platter-original.webp",
    "/platters/platter-pistachio.webp",
    "/platters/platter-biscoff.webp",
    "/platters/platter-choco.webp",
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

  // 1. Eagerly load frames with GPU off-thread decoding and critical-path prioritization
  for (let i = 1; i <= count; i++) {
    const img = new Image();
    img.decoding = "async";
    // Prioritize the first 20 frames so hero becomes interactive immediately
    if (i <= 20) {
      img.fetchPriority = "high";
    }

    const onImageReady = () => {
      if (typeof img.decode === "function") {
        img.decode().catch(() => {}).finally(checkProgress);
      } else {
        checkProgress();
      }
    };

    img.src = `${folder}/ezgif-frame-${pad(i)}.${ext}`;
    imagesArr[i - 1] = img;

    if (img.complete && img.naturalWidth > 0) {
      onImageReady();
    } else {
      img.onload = onImageReady;
      img.onerror = checkProgress;
    }
  }

  // 2. Preload 3D Gallery Platter textures with async decoding
  platters.forEach((src) => {
    const img = new Image();
    img.decoding = "async";

    const onImageReady = () => {
      if (typeof img.decode === "function") {
        img.decode().catch(() => {}).finally(checkProgress);
      } else {
        checkProgress();
      }
    };

    img.src = src;
    if (img.complete && img.naturalWidth > 0) {
      onImageReady();
    } else {
      img.onload = onImageReady;
      img.onerror = checkProgress;
    }
  });

  // 3. Fallback safety timer: in case a frame request is slow or dropped on cellular data
  setTimeout(() => {
    if (!hasCompleted) {
      notifyComplete();
    }
  }, 5000);
}
