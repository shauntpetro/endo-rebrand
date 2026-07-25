import { createHash } from "node:crypto";
import { mkdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = path.join(
  ROOT,
  "public",
  "team",
  "tanya-petrossian.avif",
);
const PORTRAIT_AVIF = path.join(
  ROOT,
  "public",
  "team",
  "tanya-petrossian-v2.avif",
);
const PORTRAIT_JPEG = path.join(
  ROOT,
  "public",
  "downloads",
  "media",
  "tanya-petrossian-endocyclic-v2.jpg",
);

const APPROVED_SOURCE_SHA256 =
  "c9046594d2b4be61eed00d03374a7d83735032d93d56720ed360f5a94eeede10";
const WIDTH = 1164;
const HEIGHT = 1476;

function portraitPipeline() {
  return sharp(SOURCE)
    .resize({
      width: WIDTH,
      height: HEIGHT,
      fit: "fill",
      kernel: sharp.kernel.lanczos3,
    })
    .sharpen({
      sigma: 0.55,
      m1: 0.45,
      m2: 0.75,
      x1: 2,
      y2: 8,
      y3: 12,
    })
    .removeAlpha()
    .toColourspace("srgb");
}

async function assertApprovedSource() {
  const source = await readFile(SOURCE);
  const checksum = createHash("sha256").update(source).digest("hex");

  if (checksum !== APPROVED_SOURCE_SHA256) {
    throw new Error(
      "The approved Tanya Petrossian source portrait changed. " +
        "Review the identity source before regenerating this derivative.",
    );
  }
}

async function assertOutput(output, format) {
  const [metadata, fileStat] = await Promise.all([
    sharp(output).metadata(),
    stat(output),
  ]);

  if (
    metadata.format !== format ||
    metadata.width !== WIDTH ||
    metadata.height !== HEIGHT ||
    metadata.space !== "srgb" ||
    fileStat.size === 0
  ) {
    throw new Error(
      `${path.basename(output)} failed the ${format} ${WIDTH}×${HEIGHT} sRGB output contract.`,
    );
  }
}

await assertApprovedSource();
await mkdir(path.dirname(PORTRAIT_JPEG), { recursive: true });

await portraitPipeline()
  .avif({
    quality: 82,
    effort: 6,
    chromaSubsampling: "4:4:4",
  })
  .toFile(PORTRAIT_AVIF);

await portraitPipeline()
  .jpeg({
    quality: 92,
    progressive: true,
    chromaSubsampling: "4:4:4",
    optimiseScans: true,
  })
  .toFile(PORTRAIT_JPEG);

await Promise.all([
  assertOutput(PORTRAIT_AVIF, "heif"),
  assertOutput(PORTRAIT_JPEG, "jpeg"),
]);

console.log(
  "Generated approved high-resolution leadership portrait derivatives.",
);
