import path from "node:path";
import fs from "node:fs/promises";
import sharp from "sharp";

const repoRoot = process.cwd();
const homeAssetsDir = path.join(repoRoot, "src", "assets", "home");

const targets = [
  { input: "graduate.png", maxDim: 1600 },
  { input: "vietnam.png", maxDim: 1600 },
];

async function statOrNull(filePath) {
  try {
    return await fs.stat(filePath);
  } catch {
    return null;
  }
}

function formatBytes(bytes) {
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let i = 0;
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i += 1;
  }
  return `${size.toFixed(i === 0 ? 0 : 2)} ${units[i]}`;
}

async function convertOne({ input, maxDim }) {
  const inputPath = path.join(homeAssetsDir, input);
  const baseName = input.replace(/\.(png|jpe?g)$/i, "");
  const webpPath = path.join(homeAssetsDir, `${baseName}.webp`);
  const avifPath = path.join(homeAssetsDir, `${baseName}.avif`);

  const inputStat = await statOrNull(inputPath);
  if (!inputStat) {
    throw new Error(`Missing input image: ${inputPath}`);
  }

  const image = sharp(inputPath, { limitInputPixels: false });
  const meta = await image.metadata();

  const resized = image.resize({
    width:
      meta.width && meta.height && meta.width >= meta.height
        ? maxDim
        : undefined,
    height:
      meta.width && meta.height && meta.height > meta.width
        ? maxDim
        : undefined,
    fit: "inside",
    withoutEnlargement: true,
  });

  await resized.clone().webp({ quality: 82, effort: 5 }).toFile(webpPath);

  await resized.clone().avif({ quality: 50, effort: 6 }).toFile(avifPath);

  const webpStat = await fs.stat(webpPath);
  const avifStat = await fs.stat(avifPath);

  console.log(`${input}: ${formatBytes(inputStat.size)}`);
  console.log(`  -> ${path.basename(webpPath)}: ${formatBytes(webpStat.size)}`);
  console.log(`  -> ${path.basename(avifPath)}: ${formatBytes(avifStat.size)}`);
}

async function main() {
  console.log(`Converting Home photos in: ${homeAssetsDir}`);
  for (const target of targets) {
    await convertOne(target);
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
