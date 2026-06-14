import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const entry = resolve(root, 'src/logic/validateBracket.ts');
const outfile = resolve(root, 'server/validateBracket.bundle.mjs');

execSync(
  `npx --yes esbuild "${entry}" --bundle --platform=node --format=esm --outfile="${outfile}" --log-level=warning`,
  { cwd: root, stdio: 'inherit' },
);

console.log(`Bundled validator → ${outfile}`);
