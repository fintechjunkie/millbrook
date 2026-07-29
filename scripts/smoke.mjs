#!/usr/bin/env node
/**
 * Fetch every route and fail on anything that is not a 200.
 *
 * This exists because of a real miss rather than as ceremony. A batch of edits left
 * three server-side ReferenceErrors in place -- a missing `node:fs` import, a token
 * read inside its own temporal dead zone, and a variable deleted while still
 * referenced -- and every page 500ed. Nothing caught it:
 *
 *   - `next lint` is a linter. It does not evaluate modules, so a ReferenceError at
 *     import time is invisible to it.
 *   - Reading the DOM through the browser tools can pass against a bundle Next
 *     compiled BEFORE the edit, so a probe returns healthy markup from a page the
 *     server can no longer build.
 *
 * The lesson is that "I checked the DOM" is not the same claim as "the server can
 * render this". One HTTP status per route is the cheap, honest version.
 *
 *   node scripts/smoke.mjs              against localhost:3000
 *   node scripts/smoke.mjs 3001         against another port
 */

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const port = process.argv[2] ?? '3000';
const base = `http://localhost:${port}`;

// Volume slugs come from the data rather than a hardcoded list, so a fifth volume
// is covered the moment it exists.
const registry = ['vol1', 'vol2', 'vol3', 'vol4'].filter((slug) => {
  try {
    readFileSync(join(ROOT, 'patch-notes', 'volumes', `${slug}.json`));
    return true;
  } catch {
    return false;
  }
});

const routes = [
  '/',
  '/patch-notes',
  '/checks/overflow',
  ...registry.map((slug) => `/patch-notes/${slug}/read`),
];

const results = [];
for (const route of routes) {
  try {
    const res = await fetch(base + route, { redirect: 'manual' });
    results.push({ route, status: res.status, ok: res.status === 200 });
  } catch (err) {
    results.push({ route, status: err.code ?? 'UNREACHABLE', ok: false });
  }
}

const width = Math.max(...routes.map((r) => r.length));
for (const r of results) {
  console.log(`${r.ok ? 'ok  ' : 'FAIL'}  ${r.route.padEnd(width)}  ${r.status}`);
}

const failed = results.filter((r) => !r.ok);
if (failed.length) {
  console.error(`\n${failed.length} of ${results.length} routes did not return 200.`);
  if (failed.every((f) => f.status === 'ECONNREFUSED')) {
    console.error('Nothing is listening. Start the dev server first.');
  } else {
    console.error('Read the server output for the stack trace; a 500 here is a real');
    console.error('module-level error that a linter cannot see.');
  }
  process.exit(1);
}

console.log(`\nAll ${results.length} routes return 200.`);
