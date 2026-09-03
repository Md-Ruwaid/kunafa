const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function pad(n) {
  return String(n).padStart(3, '0');
}

async function interpolateSequence(dirName, inputCount) {
  const root = path.resolve(__dirname, '..');
  const srcDir = path.join(root, 'public', dirName);
  const tempDir = path.join(root, 'public', dirName + '-temp');

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  console.log(`Starting interpolation for ${dirName} (${inputCount} frames)...`);
  const startTime = Date.now();

  // Load all original frames into memory
  const originalBuffers = [];
  for (let i = 1; i <= inputCount; i++) {
    const filename = `ezgif-frame-${pad(i)}.webp`;
    const filepath = path.join(srcDir, filename);
    if (!fs.existsSync(filepath)) {
      throw new Error(`Missing expected source frame: ${filepath}`);
    }
    originalBuffers.push(fs.readFileSync(filepath));
  }

  let outputIndex = 1;

  for (let i = 0; i < inputCount; i++) {
    // 1. Write the original keyframe
    const keyframeOut = path.join(tempDir, `ezgif-frame-${pad(outputIndex)}.webp`);
    fs.writeFileSync(keyframeOut, originalBuffers[i]);
    outputIndex++;

    // 2. Generate and write the blended in-between frame (if not the last frame)
    if (i < inputCount - 1) {
      const f1Buf = originalBuffers[i];
      const f2Buf = originalBuffers[i + 1];

      // Blend f2 at 50% opacity over f1
      const f2Alpha = await sharp(f2Buf).ensureAlpha(0.5).toBuffer();
      const blendedBuf = await sharp(f1Buf)
        .composite([{ input: f2Alpha, blend: 'over' }])
        .webp({ quality: 92, effort: 4 })
        .toBuffer();

      const inbetweenOut = path.join(tempDir, `ezgif-frame-${pad(outputIndex)}.webp`);
      fs.writeFileSync(inbetweenOut, blendedBuf);
      outputIndex++;
    }

    if (i % 10 === 0 || i === inputCount - 1) {
      process.stdout.write(`  Processed ${i + 1}/${inputCount} keyframes...\r`);
    }
  }

  const finalCount = outputIndex - 1;
  console.log(`\nFinished ${dirName}: generated ${finalCount} frames in ${((Date.now() - startTime) / 1000).toFixed(1)}s.`);

  // Replace srcDir with tempDir
  const backupDir = path.join(root, 'public', dirName + '-backup');
  if (fs.existsSync(backupDir)) {
    fs.rmSync(backupDir, { recursive: true, force: true });
  }

  fs.renameSync(srcDir, backupDir);
  fs.renameSync(tempDir, srcDir);
  fs.rmSync(backupDir, { recursive: true, force: true });

  console.log(`Successfully updated ${dirName} with ${finalCount} frames.`);
  return finalCount;
}

async function main() {
  try {
    const desktopTotal = await interpolateSequence('Kunafa-animations-v2', 100);
    const mobileTotal = await interpolateSequence('mobile-view-framesv2', 97);
    console.log(`\nInterpolation complete! Desktop: ${desktopTotal} frames, Mobile: ${mobileTotal} frames.`);
  } catch (err) {
    console.error('Interpolation failed:', err);
    process.exit(1);
  }
}

main();
