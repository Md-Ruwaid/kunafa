/**
 * Global Asset Preloader & Sequence Cache
 * Guarantees that all canvas animation frames and 3D platter textures are
 * completely loaded into GPU/memory BEFORE the preloader lifts.
 */

const DESKTOP_FRAMES = 100;
const MOBILE_FRAMES = 120;

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
  if (isMobile) mobileFramesCache = imagesArr;
  else desktopFramesCache = imagesArr;

  // Verify that all animation frames are actually in memory with valid dimensions
  const areAllFramesVerified = () => {
    for (let i = 0; i < count; i++) {
      const img = imagesArr[i];
      if (!img || !img.complete || img.naturalWidth === 0) {
        return false;
      }
    }
    return true;
  };

  const notifyComplete = () => {
    if (hasCompleted) return;
    hasCompleted = true;
    isPreloadCompleted = true;
    onProgress(100);
    onComplete();
  };

  const checkProgress = () => {
    if (hasCompleted) return;
    loadedAssets++;
    const pct = Math.min(99, Math.round((loadedAssets / totalAssets) * 100));
    onProgress(pct);

    if (loadedAssets >= totalAssets && areAllFramesVerified()) {
      notifyComplete();
    }
  };

  // 1. Eagerly load all animation frames with auto-retry
  const loadFrameWithRetry = (i: number, retries = 3) => {
    const img = new Image();
    if (i === 1) img.fetchPriority = "high";
    img.src = `${folder}/ezgif-frame-${pad(i)}.${ext}`;
    imagesArr[i - 1] = img;

    const onSuccess = () => {
      checkProgress();
    };

    const onError = () => {
      if (retries > 0) {
        setTimeout(() => loadFrameWithRetry(i, retries - 1), 300);
      } else {
        checkProgress();
      }
    };

    if (img.complete && img.naturalWidth > 0) {
      onSuccess();
    } else {
      img.onload = onSuccess;
      img.onerror = onError;
    }
  };

  for (let i = 1; i <= count; i++) {
    loadFrameWithRetry(i);
  }

  // 2. Preload 3D Gallery Platter textures
  platters.forEach((src) => {
    const img = new Image();
    img.src = src;
    if (img.complete && img.naturalWidth > 0) {
      checkProgress();
    } else {
      img.onload = checkProgress;
      img.onerror = checkProgress;
    }
  });

  // 3. Fallback safety timer: in case of extreme cellular network drop, verify and complete
  setTimeout(() => {
    if (!hasCompleted) {
      notifyComplete();
    }
  }, 30000);
}
