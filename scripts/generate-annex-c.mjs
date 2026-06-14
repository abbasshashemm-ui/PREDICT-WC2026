import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pdfTextPath =
  'C:/Users/abbas/.cursor/projects/c-Users-abbas-Desktop-WC2026/agent-tools/8069ff12-2ab4-4492-978a-672f98baf4f7.txt';

const text = fs.readFileSync(pdfTextPath, 'utf8');
const slots = ['1A', '1B', '1D', '1E', '1G', '1I', '1K', '1L'];
const re =
  /(\d{1,3})\s+(3[A-L])\s+(3[A-L])\s+(3[A-L])\s+(3[A-L])\s+(3[A-L])\s+(3[A-L])\s+(3[A-L])\s+(3[A-L])/g;

const map = {};
let m;
while ((m = re.exec(text)) !== null) {
  const values = m.slice(2, 10);
  const groups = values
    .map((v) => v[1])
    .sort()
    .join('');
  if (groups.length !== 8) continue;
  map[groups] = Object.fromEntries(slots.map((s, i) => [s, values[i]]));
}

const outPath = path.resolve(__dirname, '../src/data/annexC.ts');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
const content = `// Auto-generated from FIFA World Cup 2026 Regulations Annex C (${Object.keys(map).length} combinations)
import type { ThirdPlaceMapping } from '../types';

export const THIRD_PLACE_SLOT_MAP: Record<string, ThirdPlaceMapping> = ${JSON.stringify(map, null, 2)};
`;
fs.writeFileSync(outPath, content);
console.log(`Wrote ${Object.keys(map).length} Annex C entries to ${outPath}`);
