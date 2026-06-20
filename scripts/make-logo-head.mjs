// Builds a small transparent head cutout for the wordmark from the headshot:
// crop to the head → key out the solid yellow background → circular mask.
//
//   node scripts/make-logo-head.mjs
import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "..", "public", "headshot.jpg");
const OUT = join(__dirname, "..", "public", "logo-head.png");

// Head crop region tuned for the 960×949 source (head + a little collar).
const crop = { left: 260, top: 5, width: 420, height: 420 };

const { data, info } = await sharp(SRC)
  .extract(crop)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;

// Key out the yellow background. Yellow = high R+G, low B; the subject's skin,
// brown hair, and blue polo all have markedly higher blue, so they're safe.
const isBackground = (r, g, b) =>
  b < 115 && r > 150 && g > 140 && (r + g) / 2 - b > 70;

let cleared = 0;
for (let i = 0; i < data.length; i += channels) {
  if (isBackground(data[i], data[i + 1], data[i + 2])) {
    data[i + 3] = 0;
    cleared++;
  }
}

// Erode the matte by ~2px (min-filter on alpha) to remove the yellow rim that
// JPEG compression smears along the hair edge.
const rad = 3;
const alpha0 = new Uint8Array(width * height);
for (let p = 0; p < width * height; p++) alpha0[p] = data[p * channels + 3];
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    let m = 255;
    for (let dy = -rad; dy <= rad && m > 0; dy++) {
      const yy = y + dy;
      if (yy < 0 || yy >= height) continue;
      for (let dx = -rad; dx <= rad; dx++) {
        const xx = x + dx;
        if (xx < 0 || xx >= width) continue;
        const av = alpha0[yy * width + xx];
        if (av < m) m = av;
      }
    }
    const idx = (y * width + x) * channels + 3;
    if (m < data[idx]) data[idx] = m;
  }
}

// Circular mask (also anti-aliases the hard keyed edges when downscaled).
const r = Math.min(width, height) / 2;
const circle = await sharp(
  Buffer.from(
    `<svg width="${width}" height="${height}"><circle cx="${width / 2}" cy="${height / 2}" r="${r}" fill="#fff"/></svg>`,
  ),
)
  .resize(width, height)
  .png()
  .toBuffer();

// Two passes: sharp applies composite after resize, so mask at full size
// first, then downscale (which also anti-aliases the edges).
const masked = await sharp(data, { raw: { width, height, channels } })
  .composite([{ input: circle, blend: "dest-in" }])
  .png()
  .toBuffer();

await sharp(masked).resize(256, 256).png().toFile(OUT);

console.log(
  `Wrote ${OUT} — ${256}×256, keyed ${((cleared / (width * height)) * 100).toFixed(0)}% as background.`,
);
