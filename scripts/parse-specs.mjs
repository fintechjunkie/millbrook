#!/usr/bin/env node
/**
 * Convert the hand-authored markdown specs into the JSON the reader consumes.
 *
 * Per section 4 of docs/FLIPBOOK-EXTRACTION.md: a build-time converter that
 * emits JSON, rather than a runtime markdown parser. The reader then only ever
 * sees one simple data shape, and the authoring format stays markdown.
 *
 * The prose is verbatim and is not this script's to touch. Nothing here
 * normalises a quote mark, collapses a space, or fixes a typo. The only
 * transformation is classifying each line as a heading, a paragraph, or an
 * italic line, and that classification is structural rather than editorial.
 *
 * Self-check: every volume spec declares a word count per spread. This script
 * recounts the prose it extracted and fails if the two disagree, which catches
 * a mis-sliced page immediately rather than at read time.
 *
 *   node scripts/parse-specs.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SPECS = join(ROOT, 'patch-notes', 'specs');
const OUT = join(ROOT, 'patch-notes');

const read = (p) => readFileSync(p, 'utf8').replace(/\r\n/g, '\n');

// ---------------------------------------------------------------- helpers

/** Words, counted the way a person would: whitespace-separated runs. */
const countWords = (s) => (s.trim() ? s.trim().split(/\s+/).length : 0);

/** Pull "Label: value" from a block of lines. */
function field(text, label) {
  const m = text.match(new RegExp(`^${label}:[ \\t]*(.*)$`, 'm'));
  return m ? m[1].trim() : null;
}

/** The first fenced code block in a chunk, contents only. */
function fence(text) {
  const m = text.match(/```\n([\s\S]*?)\n```/);
  return m ? m[1] : null;
}

/**
 * Classify the verbatim prose into blocks.
 *
 * h  a ### section heading inside the prose. These are section names and are
 *    also what the reader's jump list is built from.
 * i  a whole line wrapped in single asterisks: the "To be continued" and
 *    "End of" lines.
 * p  everything else.
 *
 * Consecutive non-blank lines are joined into one paragraph. In practice each
 * paragraph in these specs is a single line, but joining means a future
 * hard-wrapped spec does not silently become several paragraphs.
 */
function proseBlocks(raw) {
  const blocks = [];
  let para = [];

  const flush = () => {
    if (para.length) {
      blocks.push({ t: 'p', v: para.join(' ') });
      para = [];
    }
  };

  for (const line of raw.split('\n')) {
    const t = line.trim();
    if (!t) { flush(); continue; }

    const h = t.match(/^###\s+(.*)$/);
    if (h) { flush(); blocks.push({ t: 'h', v: h[1].trim() }); continue; }

    // A full-line italic. Requires the asterisks to bracket the whole line,
    // so mid-sentence emphasis would not be misread as a closing line.
    const i = t.match(/^\*([^*].*[^*])\*$/);
    if (i) { flush(); blocks.push({ t: 'i', v: i[1] }); continue; }

    para.push(t);
  }
  flush();
  return blocks;
}

/** Everything between two headings, exclusive. */
function between(text, startRe, endRe) {
  const s = text.match(startRe);
  if (!s) return null;
  const rest = text.slice(s.index + s[0].length);
  const e = endRe ? rest.match(endRe) : null;
  return e ? rest.slice(0, e.index) : rest;
}

// ---------------------------------------------------------------- volumes

function parseImageBlock(chunk) {
  const prompt = fence(chunk);
  const ar = prompt && prompt.match(/^Aspect ratio:[ \t]*(.+)$/m);

  // "Hard constraints:" may wrap over several lines and runs until a blank line.
  // These are the requirements a generation has actually violated in practice.
  // They are hoisted to the head of the assembled prompt rather than left in the
  // negative block at the foot, because a model weights the opening of a prompt
  // far more heavily and the foot is where these were being ignored.
  const hc = chunk.match(/^Hard constraints:[ \t]*([\s\S]*?)(?=\n\s*\n)/m);

  return {
    slug: field(chunk, 'Slug'),
    shotType: field(chunk, 'Shot type'),
    depicts: field(chunk, 'Depicts'),
    spoilerCheck: field(chunk, 'Spoiler check'),
    hardConstraints: hc ? hc[1].replace(/\s*\n\s*/g, ' ').trim() : null,
    prompt,
    aspect: ar ? ar[1].trim() : null,
    alt: field(chunk, 'Alt text'),
  };
}

/**
 * The arcs, and where each one's specs and JSON live.
 *
 * Was a hardcoded loop over `PATCH_NOTES_Vol${n}_Spec.md` for n in 1..4, which was right
 * while there was one arc and became the only thing standing between arc two and the site.
 *
 * `slug` is what the reader routes on and what every image file is named after, so the two
 * arcs must never collide in the flat images directory: arc one owns vol1-vol4, arc two owns
 * u1-u4. `vol` stays the volume's number WITHIN its arc, because that is what a shelf card
 * shows.
 *
 * `expect` is the same tripwire the word counts are. It is not bookkeeping: a spread lost or
 * gained by a bad page re-cut shows up here as a number that moved, and nowhere else.
 */
const ARCS = [
  {
    id: 'patch-notes',
    title: 'The Patch',
    spec: (n) => `PATCH_NOTES_Vol${n}_Spec.md`,
    slug: (n) => `vol${n}`,
    volumes: [1, 2, 3, 4],
    expect: { textPages: 38, images: 42 },
  },
  {
    id: 'understudies',
    title: 'The Understudies',
    spec: (n) => `UNDERSTUDIES_Vol${n}_Spec.md`,
    slug: (n) => `u${n}`,
    volumes: [1, 2, 3, 4],
    expect: { textPages: 46, images: 50 },
  },
];

function parseVolume(arc, n) {
  const src = read(join(SPECS, arc.spec(n)));

  const head = src.slice(0, src.indexOf('\n## '));
  const meta = {
    volume: n,
    arc: arc.id,
    slug: arc.slug(n),
    // Images are commissioned after the prose is placed, so a volume can legitimately exist
    // with no prompts in it. The word PENDING in the shot-mix section is what says so, and
    // removing it is what turns the prompt guards back on. One word, one meaning, in the
    // file the author is already editing -- rather than a flag in a script they are not.
    imagesPending: /Images:\s*PENDING/.test(src),
    source: field(head, 'Source')?.replace(/`/g, '') ?? null,
    chapter: field(head, 'Chapter'),
    specVersion: field(head, 'Spec version'),
    date: field(head, 'Date'),
  };

  // Split on the spread headings. The leading empty element is the front
  // matter and shot-mix section, which carries no spread.
  const parts = src.split(/\n## Spread /).slice(1);
  const spreads = [];
  const problems = [];

  for (const part of parts) {
    const isOpener = /^0, chapter opener/.test(part);
    const num = Number(part.match(/^(\d+)/)[1]);

    if (isOpener) {
      const titleRaw = between(
        part,
        /### Title block[^\n]*\n/,
        /### Image, full bleed/,
      ) ?? '';
      const lines = titleRaw.split('\n').map((l) => l.trim()).filter(Boolean);
      const pick = (re) => {
        const l = lines.find((x) => re.test(x));
        return l ? l.replace(re, '').trim() : null;
      };
      const imgChunk = part.slice(part.indexOf('### Image, full bleed'));

      spreads.push({
        n: 0,
        kind: 'opener',
        title: {
          title: pick(/^#\s+/),
          subtitle: (lines.find((x) => /^\*.*\*$/.test(x)) ?? '').replace(/^\*|\*$/g, ''),
          series: pick(/^##\s+/),
          part: pick(/^###\s+/),
        },
        image: parseImageBlock(imgChunk),
      });
      continue;
    }

    const headerLine = part.split('\n').find((l) => /\|/.test(l)) ?? '';
    const declaredWords = Number((headerLine.match(/Words\s+(\d+)/) ?? [])[1]);
    const pages = (headerLine.match(/^Pages\s+([\d]+\s+to\s+[\d]+)/) ?? [])[1] ?? null;

    // A few spreads carry an editorial note between the header line and the
    // text page heading ("Short page, deliberate..."). It is metadata about
    // the spread, not prose, so it must not reach the page.
    const noteRaw = between(part, /\|[^\n]*\n/, /### Text page/) ?? '';
    const note = noteRaw.split('\n').map((l) => l.trim()).filter(Boolean).join(' ') || null;

    const proseRaw = between(part, /### Text page \(left\), verbatim\n/, /### Image page \(right\)/);
    if (proseRaw == null) { problems.push(`${arc.slug(n)} spread ${num}: no text page found`); continue; }

    const blocks = proseBlocks(proseRaw);
    const imgChunk = part.slice(part.indexOf('### Image page (right)'));

    // Two counts, for two different jobs.
    //
    // rawWords reproduces how the spec author counted: whitespace-separated
    // runs across the raw markdown, which means the literal "###" of a section
    // heading counts as a token. That looks like an accident of tooling and it
    // is, but it is the number written in the spec, so it is the number to
    // assert against. Matching it exactly proves the page was sliced at the
    // right boundaries.
    //
    // bodyWords is the honest count of narration a reader actually reads:
    // no headings, no markdown. That is what the reporting below uses.
    const rawWords = countWords(proseRaw);
    const bodyWords = blocks.filter((b) => b.t !== 'h').reduce((a, b) => a + countWords(b.v), 0);

    spreads.push({
      n: num,
      kind: 'spread',
      pages,
      declaredWords,
      words: bodyWords,
      blocks,
      note,
      image: parseImageBlock(imgChunk),
    });

    if (rawWords !== declaredWords) {
      problems.push(
        `${arc.slug(n)} spread ${num}: spec declares ${declaredWords} words, raw extraction is `
        + `${rawWords} (body prose ${bodyWords}). The page boundaries are wrong.`,
      );
    }
  }

  return { meta, spreads, problems };
}

// ---------------------------------------------------------------- roster

function parseRoster() {
  const src = read(join(SPECS, 'PATCH_NOTES_FLIPBOOK_ROSTER.md'));

  // Style and negative live as blockquotes under section 2.
  const quote = (after) => {
    const i = src.indexOf(after);
    if (i < 0) return null;
    const lines = src.slice(i + after.length).split('\n');
    const out = [];
    for (const l of lines) {
      if (l.startsWith('> ')) out.push(l.slice(2).trim());
      else if (out.length) break;
    }
    return out.join(' ') || null;
  };

  // The style lives in a ```style fence rather than a blockquote, so its
  // internal structure survives verbatim: the section headings and bullets are
  // part of the incantation and flattening them to one paragraph would be an
  // edit. Named styles matter here - the generation project resolves
  // "Paper-Theater Millbrook" by name - so the name is the first line and is
  // carried through to every prompt.
  const styleFence = src.match(/```style\n([\s\S]*?)\n```/);
  const style = styleFence ? styleFence[1].trim() : null;
  const styleName = style ? style.split('\n')[0].trim() : null;
  const styleMarker = src.match(/\{\{STYLE\}\}\s*=\s*(.+)/);
  const styleApproved = /APPROVED/.test(styleMarker?.[1] ?? '')
    && !/NOT APPROVED/.test(styleMarker?.[1] ?? '');

  const negative = quote('{{NEGATIVE}} =\n```\n');

  // Characters: "### {{CHAR:NAME}}" followed by bolded fields.
  const characters = {};
  const charChunks = src.split(/\n### \{\{CHAR:/).slice(1);
  for (const chunk of charChunks) {
    const token = chunk.slice(0, chunk.indexOf('}}'));
    const body = chunk.slice(chunk.indexOf('}}') + 2);
    const stop = body.search(/\n### |\n## |\n---/);
    const text = stop < 0 ? body : body.slice(0, stop);

    const bold = (label) => {
      const m = text.match(new RegExp(`\\*\\*${label}[^*]*:\\*\\*\\s*([\\s\\S]*?)(?=\\n\\*\\*|$)`));
      return m ? m[1].trim().replace(/\n+/g, ' ') : null;
    };

    // Vex carries two immutable blocks, one active and one inactive, because
    // decision 1.1 in the roster is unresolved. Both are preserved; the
    // active one is the one the prompt sheet must expand.
    const active = text.match(/\*\*Immutable[^*]*ACTIVE[^*]*:\*\*\s*([\s\S]*?)(?=\n\*\*|$)/);
    const inactive = text.match(/\*\*Immutable[^*]*INACTIVE:\*\*\s*([\s\S]*?)(?=\n\*\*|$)/);

    const refLine = text.match(/\*\*Canonical reference:\*\*\s*(.*)/);
    const ref = refLine ? refLine[1] : '';
    // A parenthetical straight after the filename locates a character within a
    // SHARED reference sheet, e.g. `ref-secondary-characters.png` (second from
    // left). Canonical references arrive grouped in practice - main cast,
    // secondary cast, animals - rather than as one file per character, and a
    // prompt that attaches a group sheet has to say who in it to look at.
    const locMatch = ref.match(/`[^`]+`\s*\(([^)]+)\)/);

    characters[token] = {
      token,
      immutable: (active ? active[1] : bold('Immutable'))?.trim().replace(/\n+/g, ' ') ?? null,
      immutableInactive: inactive ? inactive[1].trim().replace(/\n+/g, ' ') : null,
      canonicalRef: (ref.match(/`([^`]+)`/) ?? [])[1] ?? null,
      refLocation: locMatch ? locMatch[1].trim() : null,
      seed: (ref.match(/Seed:\s*([^·]+)/) ?? [])[1]?.trim() ?? null,
      approved: /Approved:\s*yes/i.test(ref),
      approvalNote: (ref.match(/Approved:\s*(.+)$/) ?? [])[1]?.trim() ?? null,
      renderingNote: bold('Rendering note'),
    };
  }

  // Wardrobe and location tables.
  const rows = (sectionRe) => {
    const sec = between(src, sectionRe, /\n## /);
    if (!sec) return [];
    return sec.split('\n')
      .filter((l) => l.trim().startsWith('|') && !/^\|[\s|:-]+\|$/.test(l.trim()))
      .map((l) => l.split('|').slice(1, -1).map((c) => c.trim()))
      .filter((c) => c.length >= 2 && !/^Token$/i.test(c[0]));
  };

  const wardrobe = {};
  for (const r of rows(/## 5\. Wardrobe states\n/)) {
    const token = (r[0].match(/\{\{WARDROBE:([A-Z_0-9]+)\}\}/) ?? [])[1];
    if (token) wardrobe[token] = { token, value: r[1], storyTime: r[2] ?? null };
  }

  const locations = {};
  for (const r of rows(/## 6\. Location roster\n/)) {
    const token = (r[0].match(/\{\{LOC:([A-Z_0-9]+)\}\}/) ?? [])[1];
    if (token) {
      locations[token] = {
        token,
        block: r[1],
        uses: Number(r[2]) || null,
        canonicalRef:
          (r[3] ?? '').split(/stand-in:/i)[0].match(/`([^`]+)`/)?.[1] ?? null,
        // A location may name a delivered scene plate as its authority instead
        // of a purpose-made establishing shot. Cheaper than generating a
        // dedicated reference, and it has the advantage of being a frame the
        // reader will actually see. Everything after "stand-in:" in the cell.
        standInRef:
          (r[3] ?? '').match(/stand-in:\s*`([^`]+)`/i)?.[1] ?? null,
      };
    }
  }

  // Blocking decisions, so build tooling can surface them rather than
  // burying them in a markdown section nobody reopens.
  const decisions = [];
  for (const chunk of src.split(/\n### 1\.\d /).slice(1)) {
    const title = chunk.slice(0, chunk.indexOf('\n')).trim();
    decisions.push({ title, resolved: false });
  }

  return {
    specVersion: 1,
    styleApproved,
    styleName,
    style,
    negative,
    aspect: { imagePage: '2:3', chapterOpener: '4:3' },
    characters,
    wardrobe,
    locations,
    blockingDecisions: decisions,
  };
}

// ---------------------------------------------------------------- run

const roster = parseRoster();
mkdirSync(join(OUT, 'volumes'), { recursive: true });
writeFileSync(join(OUT, 'roster.json'), JSON.stringify(roster, null, 2) + '\n');

const allProblems = [];
const summary = [];

for (const arc of ARCS) {
for (const n of arc.volumes) {
  const { meta, spreads, problems } = parseVolume(arc, n);
  writeFileSync(
    join(OUT, 'volumes', `${arc.slug(n)}.json`),
    JSON.stringify({ ...meta, spreads }, null, 2) + '\n',
  );
  allProblems.push(...problems);

  // Every prompt must carry a negative block and an aspect ratio.
  //
  // This exists because three plates lost both without anything noticing. Each had its prompt
  // body swapped by replacing the text between the fences, and those bodies happened to END with
  // {{NEGATIVE}} and the aspect line, so the replacement ate them. Word counts still matched, the
  // sheets still built and the images still generated, because the author was working from a copy
  // made before the damage. Nothing downstream reads either field, which is exactly why losing
  // them was invisible -- so it gets asserted here instead.
  //
  // Suspended, not removed, while a volume's images are pending. A volume with no prompts
  // yet would otherwise report one failure per spread and bury everything else -- but the
  // guard has to come back on by itself, or it comes back never. It is keyed on the word
  // PENDING in the spec's own shot-mix section, so writing the prompts is what re-arms it.
  if (!meta.imagesPending) {
    for (const sp of spreads) {
      const where = `${arc.slug(n)} ${sp.image.slug}`;
      if (!sp.image.prompt || !/\{\{NEGATIVE\}\}|No text, lettering/.test(sp.image.prompt)) {
        allProblems.push(`${where}: prompt has no negative block`);
      }
      if (!sp.image.aspect) allProblems.push(`${where}: prompt has no aspect ratio`);
    }
  } else {
    // Still assert the part that IS written, because a slug is what an image file is named
    // after and a missing one is a plate nobody can deliver.
    for (const sp of spreads) {
      if (!sp.image.slug) {
        allProblems.push(`${arc.slug(n)} spread ${sp.n}: image block has no slug`);
      }
    }
  }

  // Straight quotes and apostrophes in the PROSE, which is the one mechanical rule the
  // project states without exception. This is a tripwire for the same reason the declared
  // word count is one: the fault is invisible in a diff, obvious on the page, and arrives
  // from a direction nobody is watching. Edit mode seeded 32 of them across two volumes in
  // a single afternoon, because a keyboard emits U+0027 and U+0022 and no author is going to
  // hunt for them by eye at 15px.
  //
  // The save route now curls on write, so this should never fire from the browser. It exists
  // to catch a HAND edit to a spec, which the route cannot see.
  //
  // Prose only. Prompts, alt text, production notes and the roster are explicitly allowed
  // straight marks, and `sp.blocks` is already just the verbatim prose.
  for (const sp of spreads) {
    for (const b of sp.blocks ?? []) {
      const marks = (b.v.match(/['"]/g) ?? []).length;
      if (marks) {
        allProblems.push(
          `${arc.slug(n)} spread ${sp.n}: ${marks} straight quote/apostrophe in prose `
          + `-- curly only. "${b.v.slice(0, 56)}..."`,
        );
      }
    }
  }
  const text = spreads.filter((s) => s.kind === 'spread');
  summary.push({
    arc: arc.title,
    vol: arc.slug(n),
    spreads: spreads.length,
    textPages: text.length,
    images: spreads.length,
    words: text.reduce((a, s) => a + s.words, 0),
    minPage: Math.min(...text.map((s) => s.words)),
    maxPage: Math.max(...text.map((s) => s.words)),
    images: meta.imagesPending ? 'pending' : spreads.length,
  });
}
}

console.log('\nroster.json');
console.log(`  style            ${roster.styleName ?? 'MISSING'} (approved: ${roster.styleApproved})`);
console.log(`  negative         ${roster.negative ? 'parsed' : 'MISSING'}`);
console.log(`  characters       ${Object.keys(roster.characters).length}`);
console.log(`  wardrobe states  ${Object.keys(roster.wardrobe).length}`);
console.log(`  locations        ${Object.keys(roster.locations).length}`);
console.log(`  open decisions   ${roster.blockingDecisions.length}`);

console.log('\nvolumes');
console.table(summary);

// Per arc, not for the whole series, and that matters now there is more than one: a total
// across both arcs would let a spread lost in The Patch be masked by a spread gained in The
// Understudies. Each arc's expectation lives on the arc, beside its spec filenames.
//
// Declared rather than derived, on purpose, and for the same reason the per-page word counts
// are: a number that recomputes itself from the specs can never catch a spread being lost or
// duplicated by a bad edit. Update it deliberately when a spread is deliberately added.
//
// The Patch     38/42 as of 2026-07-29, after all four planned splits.
// Understudies  46/50 as of 2026-07-31, the initial chunk of the four V3 manuscripts.
for (const arc of ARCS) {
  const rows = summary.filter((s) => s.arc === arc.title);
  const got = {
    textPages: rows.reduce((a, s) => a + s.textPages, 0),
    images: rows.reduce((a, s) => a + s.spreads, 0),
  };
  for (const [k, v] of Object.entries(arc.expect)) {
    if (got[k] !== v) {
      allProblems.push(`${arc.title}: expected ${v} ${k}, got ${got[k]}`);
    }
  }
  console.log(`  ${arc.title}: ${got.textPages} text pages, ${got.images} images, `
    + `${rows.reduce((a, s) => a + s.words, 0)} words`);
}

if (allProblems.length) {
  console.error(`\n${allProblems.length} problem(s):`);
  for (const p of allProblems) console.error(`  ${p}`);
  process.exit(1);
}
console.log('\nAll word counts match the specs. Totals match the roster arithmetic.\n');
