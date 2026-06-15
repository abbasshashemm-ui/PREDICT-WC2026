#!/usr/bin/env node
/**
 * Renders brand SVG assets to PNG at common sizes.
 * Run: node scripts/render-brand-assets.mjs
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const brandDir = join(root, 'public', 'brand');
const svg = readFileSync(join(brandDir, 'logo-mark.svg'));

const sizes = [
  { name: 'logo-mark.png', size: 512, dir: brandDir },
  { name: 'logo-mark-256.png', size: 256, dir: brandDir },
  { name: 'logo-mark-128.png', size: 128, dir: brandDir },
  { name: 'logo-mark-64.png', size: 64, dir: brandDir },
  { name: 'favicon-32.png', size: 32, dir: join(root, 'public') },
];

for (const { name, size, dir } of sizes) {
  const outPath = join(dir, name);
  await sharp(svg, { density: Math.max(144, size * 2) })
    .resize(size, size)
    .png()
    .toFile(outPath);
  console.log(`Wrote ${outPath}`);
}
