const frameCache = new Map<string, HTMLImageElement>();

export function getCachedFrame(src: string): HTMLImageElement {
  let img = frameCache.get(src);
  if (!img) {
    img = new Image();
    img.decoding = "async";
    img.src = src;
    frameCache.set(src, img);
  }
  return img;
}

export function primeFrame(src: string, highPriority = false): Promise<HTMLImageElement> {
  const img = getCachedFrame(src);
  if (highPriority && "fetchPriority" in img) {
    (img as HTMLImageElement & { fetchPriority: string }).fetchPriority = "high";
  }
  if (img.complete && img.naturalWidth > 0) {
    return typeof img.decode === "function"
      ? img.decode().then(() => img).catch(() => img)
      : Promise.resolve(img);
  }
  return new Promise((resolve) => {
    img.onload = () => {
      const done = () => resolve(img);
      if (typeof img.decode === "function") {
        img.decode().then(done).catch(done);
      } else {
        done();
      }
    };
    img.onerror = () => resolve(img);
  });
}

export function frameSrc(folder: string, index: number): string {
  return `${folder}/ezgif-frame-${String(index).padStart(3, "0")}.png`;
}
