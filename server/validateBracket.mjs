#!/usr/bin/env node
/**
 * CLI entry for local bracket validation (same engine as POST /api/validate-bracket).
 *
 * Usage:
 *   node server/validateBracket.mjs path/to/submission.json
 */
import { readFileSync } from 'node:fs';
import { validateBracketSubmissionSafe } from './validateBracket.bundle.mjs';

const inputPath = process.argv[2];

if (!inputPath) {
  console.error('Usage: node server/validateBracket.mjs <submission.json>');
  process.exit(1);
}

const payload = JSON.parse(readFileSync(inputPath, 'utf8'));
const result = validateBracketSubmissionSafe(payload);

if (!result.valid) {
  console.error(JSON.stringify(result, null, 2));
  process.exit(1);
}

console.log(JSON.stringify(result, null, 2));
