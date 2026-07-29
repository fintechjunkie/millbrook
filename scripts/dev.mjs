#!/usr/bin/env node
/**
 * `next dev` plus a watcher on the volume specs.
 *
 * The prose the reader shows is compiled: markdown spec -> volumes/vol*.json ->
 * imported by the page. So editing a paragraph used to mean edit, fix the declared
 * word count by hand, run npm run parse, then reload. Three of those four steps are
 * bookkeeping.
 *
 * This collapses them. Save a spec and the counts are re-synced, the JSON is
 * rebuilt, and Next's own hot reload picks up the changed import, so the browser
 * shows the new text a moment later with nothing typed.
 *
 * Deliberately no new dependency. node:fs.watch and node:child_process do it, and a
 * watcher is not worth adding chokidar and concurrently to a project whose whole
 * shipping story is "no build step, drop a file in".
 *
 *   npm run dev
 */

import { spawn } from 'node:child_process';
import { watch } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SPECS = join(ROOT, 'patch-notes', 'specs');

const run = (label, args) =>
  new Promise((resolve) => {
    const p = spawn(process.execPath, args, { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '';
    p.stdout.on('data', (d) => { out += d; });
    p.stderr.on('data', (d) => { out += d; });
    p.on('close', (code) => {
      if (code !== 0) {
        console.log(`\n[specs] ${label} FAILED\n${out.trim()}\n`);
      }
      resolve({ code, out });
    });
  });

// One rebuild at a time, and coalesce the burst of events an editor emits when it
// saves. Without the guard a single Ctrl+S can start three overlapping parses that
// race to write the same JSON.
let busy = false;
let queued = false;
let timer = null;

async function rebuild() {
  if (busy) { queued = true; return; }
  busy = true;

  const sync = await run('sync-text', ['scripts/sync-text.mjs']);
  const bumped = /(\d+) spreads? updated/.exec(sync.out);
  if (bumped && bumped[1] !== '0') {
    console.log(`[specs] word counts re-synced (${bumped[1]} spread(s))`);
  }

  const parse = await run('parse-specs', ['scripts/parse-specs.mjs']);
  if (parse.code === 0) {
    console.log('[specs] rebuilt volumes/*.json — the browser will reload itself');
  }

  busy = false;
  if (queued) { queued = false; rebuild(); }
}

watch(SPECS, { recursive: true }, (_event, file) => {
  if (!file || !file.endsWith('.md')) return;
  clearTimeout(timer);
  timer = setTimeout(rebuild, 180);
});

console.log(`[specs] watching ${SPECS.replace(ROOT, '.')} — edit prose and save, no command needed`);

// Next inherits the terminal so its own output, prompts and colours are untouched.
const next = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['next', 'dev'], {
  cwd: ROOT,
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

const bye = () => { next.kill(); process.exit(0); };
process.on('SIGINT', bye);
process.on('SIGTERM', bye);
next.on('close', (code) => process.exit(code ?? 0));
