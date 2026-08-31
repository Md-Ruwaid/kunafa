const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processFrames() {
  const root = path.resolve(__dirname, '..');

  // 1. Process Mobile Frames (reduce from 97 to 49 frames, resized 540x960, quality 65)
  const mobileDir = path.join(root, 'public/mobile-view-framesv2');
  const mobileFiles = fs.readdirSync(mobileDir).filter(f => f.endsWith('.webp')).sort();
  console.log('Found mobile frames:', mobileFiles.length);

  const targetMobileCount = 49;
  const mobileStep = (mobileFiles.length - 1) / (targetMobileCount - 1);
  const selectedMobileIndices = [];
  for (let i = 0; i < targetMobileCount; i++) {
    selectedMobileIndices.push(Math.round(i * mobileStep));
  }

  const mobileBuffers = [];
  for (const idx of selectedMobileIndices) {
    const file = mobileFiles[idx];
    const buf = fs.readFileSync(path.join(mobileDir, file));
    mobileBuffers.push(buf);
  }

  for (const f of mobileFiles) {
    fs.unlinkSync(path.join(mobileDir, f));
  }

  for (let i = 0; i < mobileBuffers.length; i++) {
    const padIndex = String(i + 1).padStart(3, '0');
    const outPath = path.join(mobileDir, 'ezgif-frame-' + padIndex + '.webp');
    await sharp(mobileBuffers[i])
      .resize(540, 960)
      .webp({ quality: 65, effort: 6 })
      .toFile(outPath);
  }
  console.log('Mobile frames processed successfully. New count:', mobileBuffers.length);

  // 2. Process Desktop Frames (reduce from 100 to 50 frames, resized 960x540, quality 65)
  const desktopDir = path.join(root, 'public/Kunafa-animations-v2');
  const desktopFiles = fs.readdirSync(desktopDir).filter(f => f.endsWith('.webp')).sort();
  console.log('Found desktop frames:', desktopFiles.length);

  const targetDesktopCount = 50;
  const desktopStep = (desktopFiles.length - 1) / (targetDesktopCount - 1);
  const selectedDesktopIndices = [];
  for (let i = 0; i < targetDesktopCount; i++) {
    selectedDesktopIndices.push(Math.round(i * desktopStep));
  }

  const desktopBuffers = [];
  for (const idx of selectedDesktopIndices) {
    const file = desktopFiles[idx];
    const buf = fs.readFileSync(path.join(desktopDir, file));
    desktopBuffers.push(buf);
  }

  for (const f of desktopFiles) {
    fs.unlinkSync(path.join(desktopDir, f));
  }

  for (let i = 0; i < desktopBuffers.length; i++) {
    const padIndex = String(i + 1).padStart(3, '0');
    const outPath = path.join(desktopDir, 'ezgif-frame-' + padIndex + '.webp');
    await sharp(desktopBuffers[i])
      .resize(960, 540)
      .webp({ quality: 65, effort: 6 })
      .toFile(outPath);
  }
  console.log('Desktop frames processed successfully. New count:', desktopBuffers.length);
}

processFrames().catch(err => {
  console.error(err);
  process.exit(1);
});
