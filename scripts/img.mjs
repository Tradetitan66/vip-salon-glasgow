import { readdirSync, mkdirSync, copyFileSync, rmSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const pubDir = join(root, "public", "images");

const SOURCE = process.env.VIP_DOWNLOADS || "/Users/vishnu/Downloads";

/**
 * Map of generated assets.
 * key: output base file path relative to public/images (no width/extension)
 * value: { src: source filename, widths, formats }
 * Output files are written as `<base>-<width>.<format>`.
 */
const ASSETS = {
  // Brand / logo (keeps original 2.16:1 proportions, never cropped)
  "brand/logo": {
    src: "logo vip salon.jpg",
    widths: [480],
    formats: ["webp", "jpg"],
  },
  // Hero (preferred) - 1536x2048
  "hair/hero": {
    src: "598942769_1441948034607193_2666349800146441332_n.jpg",
    widths: [1536, 800],
    formats: ["webp", "jpg", "avif"],
  },
  // Hair gallery
  "hair/gallery-blonde": {
    src: "494379991_1242686787866653_6363414975870173971_n.jpg",
    widths: [800],
    formats: ["webp", "jpg"],
  },
  "hair/gallery-brunette": {
    src: "495604444_1252055063596492_8367247780649503681_n.jpg",
    widths: [800],
    formats: ["webp", "jpg"],
  },
  "hair/gallery-waves": {
    src: "496758633_1254602793341719_4204917673422640938_n.jpg",
    widths: [800],
    formats: ["webp", "jpg"],
  },
  // Salon interiors (neutral labels only)
  "salons/styling-station": {
    src: "495059368_1245360034265995_5182439121993582845_n.jpg",
    widths: [800],
    formats: ["webp", "jpg"],
  },
  "salons/reception": {
    src: "594975981_1436111108524219_5240865332083799214_n.jpg",
    widths: [800],
    formats: ["webp", "jpg"],
  },
  "salons/interior-1": {
    src: "653705234_1523544326447563_6146603765571438765_n.jpg",
    widths: [800],
    formats: ["webp", "jpg"],
  },
  "salons/interior-2": {
    src: "653706098_1523544329780896_7712347137655535491_n.jpg",
    widths: [800],
    formats: ["webp", "jpg"],
  },
  // Head SPA
  "spa/head-spa-room": {
    src: "497094831_1255419856593346_5000607805744475088_n.jpg",
    widths: [800],
    formats: ["webp", "jpg"],
  },
};

function formatOptions(format) {
  if (format === "webp") return { quality: 84 };
  if (format === "avif") return { quality: 78 };
  return { quality: 84, mozjpeg: true };
}

async function processImage(outBase, { src, widths, formats }) {
  const srcPath = join(SOURCE, src);
  if (!existsSync(srcPath)) {
    console.warn(`  ! source missing: ${src}`);
    return;
  }
  const srcMeta = await sharp(srcPath).metadata();
  mkdirSync(join(pubDir, dirname(outBase)), { recursive: true });

  for (const width of widths) {
    for (const format of formats) {
      const target = join(pubDir, `${outBase}-${width}.${format}`);
      let pipeline = sharp(srcPath).rotate();
      if (srcMeta.width > width) {
        pipeline = pipeline.resize({ width });
      }
      await pipeline.toFormat(format, formatOptions(format)).toFile(target);
      console.log(`  ✓ ${outBase}-${width}.${format}`);
    }
  }
}

async function favicon() {
  const srcPath = join(SOURCE, "logo vip salon.jpg");
  mkdirSync(join(root, "public"), { recursive: true });
  const meta = await sharp(srcPath).metadata();
  const ratio = meta.width / meta.height;
  const h = 48;
  const w = Math.round(48 * ratio);
  await sharp(srcPath)
    .rotate()
    .resize({ width: w, height: h })
    .png()
    .toFile(join(root, "public", "favicon.png"));
  console.log(`  ✓ favicon.png (${w}x${h})`);
}

async function main() {
  for (const sub of ["brand", "hair", "salons", "spa"]) {
    rmSync(join(pubDir, sub), { recursive: true, force: true });
    mkdirSync(join(pubDir, sub), { recursive: true });
  }

  console.log("Processing assets...");
  for (const [outRel, spec] of Object.entries(ASSETS)) {
    await processImage(outRel, spec);
  }
  await favicon();
  console.log("Done. Source files in Downloads were left untouched.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
