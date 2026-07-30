import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Write one edited paragraph back into a volume spec. DEVELOPMENT ONLY.
 *
 * The reader is the best place to edit this prose because the binding constraint on
 * it is page fit, and fit is only visible on the page. But a browser writing to
 * source files is a genuine footgun, so this route is built to fail closed.
 *
 * Four guards, in order of how much they matter:
 *
 * 1. It refuses outright unless NODE_ENV is development. On Vercel this endpoint
 *    exists and does nothing but return 403, so shipping it cannot expose a write.
 * 2. It is CONTENT-ADDRESSED, not index-addressed. The client sends the paragraph it
 *    thinks it is replacing, and the edit only happens if that exact string occurs
 *    exactly once in the file. A stale client, a renumbered spread or two identical
 *    lines all fail loudly instead of silently rewriting the wrong paragraph.
 * 3. It edits only inside the verbatim prose block of the named spread, so a string
 *    that also appears in a prompt or a note cannot be touched.
 * 4. It rewrites by surgical replacement and never reassembles the file, and it
 *    refuses to write if the line count changed. That is the lesson from sync-text
 *    corrupting three specs by splitting and rejoining on line endings.
 *
 * Nothing here is undo-able in the app, and it does not need to be: every write
 * lands as a visible change in git.
 */

const SPECS = join(process.cwd(), 'patch-notes', 'specs');
const dev = process.env.NODE_ENV === 'development';

/**
 * Curl the punctuation on the way in, because a keyboard cannot type it.
 *
 * This is the fix for a fault that had already happened twice in an hour. The prose rule is
 * curly apostrophes and quotes always, and it is the one mechanical rule the project states
 * without exception — at 15px in a serif a straight mark is visibly wrong. But edit mode puts
 * a text cursor in front of the author, and every keyboard on earth emits U+0027 and U+0022.
 * So every editing session was quietly seeding the specs with straight marks: sixteen lines
 * in Volume 2, then sixteen more in Volume 4, each needing a sweep afterwards.
 *
 * Fixing it here rather than in a periodic sweep means the file is never wrong in the first
 * place, and the author never has to think about it.
 *
 * Apostrophes always become the right single quote. Contractions, possessives and elisions
 * are the whole population of single quotes in this prose; a quote INSIDE a quote would want
 * a matched ‘ ’ pair, which cannot be inferred from one paragraph and is rare enough to be
 * worth asking for as a spec edit.
 *
 * Double quotes open or close on the character before them, which is the standard rule and
 * is reliable here because dialogue always opens a paragraph or follows a space.
 */
function curl(s) {
  let out = s
    .replace(/(?<=\w)'(?=\w)/g, '’')   // don't, it's
    .replace(/(?<=\w)'/g, '’')          // kids', Henderson'
    .replace(/'(?=\w)/g, '’');          // 'twas, '90s

  let prev = '';
  out = [...out].map((ch) => {
    if (ch !== '"') { prev = ch; return ch; }
    const opening = prev === '' || /\s/.test(prev) || '([—-'.includes(prev);
    prev = ch;
    return opening ? '“' : '”';
  }).join('');

  return out;
}

const bad = (status, error, extra = {}) =>
  Response.json({ ok: false, error, ...extra }, { status });

export async function POST(request) {
  if (!dev) return bad(403, 'Editing is available in development only.');

  let body;
  try {
    body = await request.json();
  } catch {
    return bad(400, 'Body must be JSON.');
  }

  const { vol, spread, before, after } = body ?? {};

  if (!/^vol[1-9]\d*$/.test(String(vol ?? ''))) return bad(400, 'Bad vol.');
  if (!Number.isInteger(spread) || spread < 1) return bad(400, 'Bad spread.');
  if (typeof before !== 'string' || !before.trim()) return bad(400, 'Missing before text.');
  if (typeof after !== 'string') return bad(400, 'Missing after text.');
  if (after.includes('\n') || after.includes('\r')) {
    return bad(400, 'A paragraph cannot contain a line break. Split it in the spec instead.');
  }

  const n = String(vol).slice(3);
  const file = join(SPECS, `PATCH_NOTES_Vol${n}_Spec.md`);

  let src;
  try {
    src = readFileSync(file, 'utf8');
  } catch {
    return bad(404, `No spec for ${vol}.`);
  }

  // Isolate the one spread's verbatim block, so a match elsewhere in the file -- in a
  // prompt, an alt text, a production note -- can never be the thing we rewrite.
  const block = new RegExp(
    `(\\n## Spread ${spread}\\b[\\s\\S]*?### Text page \\(left\\), verbatim\\s*?\\r?\\n)`
    + '([\\s\\S]*?)'
    + '(\\r?\\n### Image page \\(right\\))',
  );

  const found = src.match(block);
  if (!found) return bad(404, `Could not locate the prose for ${vol} spread ${spread}.`);

  const [, head, prose, tail] = found;

  const hits = prose.split(before).length - 1;
  if (hits === 0) {
    return bad(409, 'That paragraph is no longer in the spec. Reload and try again.');
  }
  if (hits > 1) {
    // Say what to do about it. The first wording only stated the problem, which read as
    // "these are duplicates so they need no change" rather than "I cannot tell which one
    // you mean".
    return bad(
      409,
      `This exact line appears ${hits} times on the page, so the save cannot tell which one `
      + 'you edited and will not guess. Ask for this one and it will be changed in the spec.',
    );
  }

  // Curl AFTER the content-addressed match, never before it. `before` is matched against the
  // file, which is already curly, so touching it would break the one guard that stops this
  // route rewriting the wrong paragraph. And compare curled-to-curled, so retyping a word
  // with a straight apostrophe over an identical curly one counts as no change at all.
  const clean = curl(after).trim();
  if (clean === before.trim()) return Response.json({ ok: true, unchanged: true });

  const nextProse = prose.replace(before, clean);
  const out = src.replace(found[0], `${head}${nextProse}${tail}`);

  const lines = (s) => s.split('\n').length;
  if (lines(out) !== lines(src)) {
    return bad(500, `Refused: line count would change ${lines(src)} -> ${lines(out)}.`);
  }

  writeFileSync(file, out, 'utf8');

  // No parse here on purpose. The dev watcher already re-syncs the word counts and
  // rebuilds the volume JSON on any spec change, and doing it twice would race.
  return Response.json({ ok: true, file: `PATCH_NOTES_Vol${n}_Spec.md` });
}

export async function GET() {
  return Response.json({ editing: dev });
}
