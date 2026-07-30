# Millbrook — working notes for Claude

Loaded at the start of every session in this repo. Standing conventions and decisions
live here so they do not have to be restated.

---

## "Enter edit mode"

When the author asks to **enter edit mode**, or anything that means it — *let me edit the
text*, *I want to fix some wording*, *open the editor* — do all of this without being
asked for the steps:

1. Start the dev server via the preview tooling using the `millbrook` launch config, if
   it is not already running. `npm run dev` is the right script because it also starts
   the spec watcher; `next dev` alone does not.
2. Run `npm run smoke` and confirm all routes return 200 before handing it over. A
   broken server looks identical to a cached page from the author's side, and that
   confusion has cost real time.
3. Open the reader at the volume they named, or Volume 1 if they did not name one:
   `http://localhost:3000/patch-notes/vol1/read`
4. Turn edit mode on for them rather than telling them where the button is.
5. Tell them, in one line: which volume and spread is open, that paragraphs are
   editable, that the fill meter is live, and that blurring a paragraph saves it.

**What edit mode can and cannot do.** It edits existing paragraphs in place. It cannot
add or delete paragraphs, and it cannot move text between pages. Page boundaries stay a
spec-file job, because moving one changes which beat an image is allowed to depict and
the spoiler check has to be re-read by hand.

---

## The prose pipeline

Markdown spec → `volumes/vol*.json` → imported by the reader. Nothing is edited in the
JSON; it is generated and should never be hand-touched.

- `npm run dev` — dev server **plus** the spec watcher. Always prefer this.
- `npm run text` — recount prose and update the declared word counts. Run after editing
  prose by hand outside the watcher.
- `npm run parse` — verify. Fails loudly if a declared count disagrees, which is how a
  mis-sliced page boundary gets caught.
- `npm run smoke` — every route, expecting 200.

**The declared word count is a tripwire, not bookkeeping.** Do not make `parse` repair
it silently. Two commands for two cases is the point.

**`/checks/overflow` cannot be trusted in a non-compositing preview pane.** It measures inside
a double `requestAnimationFrame`, which never fires while the page is not painting, so every
row sits at `—` forever and the table looks broken rather than pending. To measure fill without
it, walk `[data-mb-page][data-mb-kind="text"]` and read each `[data-mb-flow]` with `flex`
temporarily set to `none` — a stretching flow box reports `scrollHeight === clientHeight`, so
overflow silently reads as zero otherwise.

---

## Hard-won rules

**Never take a text file apart and reassemble it to change a few characters.** Splitting
on `\n` and rejoining with the file's own line ending appended a stray carriage return on
every run and corrupted three specs. Use one surgical regex, and guard by refusing to
write if the line count moved.

**"I checked the DOM" is not "the server can render this."** `next lint` does not
evaluate modules, so an import-time `ReferenceError` is invisible to it, and a DOM probe
can pass against a bundle compiled before the edit. Trust `npm run smoke` and served
HTML over the browser console, whose log is a retained buffer and will keep reporting
errors that no longer exist.

**Never colour-key a background out of a character plate.** The canonical sheets are RGB
with no alpha and a flat sandy ground of `rgb(238,221,197)`. Owen's ivory outfit measures
`rgb(231,212,185)` — a maximum channel difference of **twelve**, so no tolerance separates
them, and a flood fill travels straight through his clothes and punches alpha 0 through
his jacket. Pip's cream overalls and Felix's pale sneakers are the same trap. When a
portrait has to sit on a panel, set the panel to `--portrait-ground` so the image's own
ground and the panel agree, and there is no rectangle left to see.

**Read the alpha channel before believing a preview.** The card frame looked opaque with a
violet glow and a dark centre; decoding it showed alpha 0 across the whole middle. The
viewer was compositing RGB behind an opaque background. `scripts/lib-png.mjs` decodes type
2 and type 6 with no dependency — use it rather than guessing from a thumbnail.

**Check `git status -sb` when the author cannot see a change.** Local commits were once
16 behind the remote for a whole session.

**Verify against the canonical image, not the written description.** The lock file's prose
and its own lineup image disagreed for Owen's eyebrows, all three girls' hair, and
Monke's colour. Section 1 of the lock resolves it: the lineup controls. In every case the
delivered artwork was right and the roster text was wrong.

---

## Prose style

**Writing a new chapter: read `patch-notes/specs/WRITING_GUIDE.md`.** It is the single
forward-looking document — register, the six characters and how each sounds, the measured page
budget, canon, spoiler discipline and a pre-flight checklist. Every number in it is measured
off the delivered arc.

`patch-notes/specs/PROSE_STYLE.md` is the *derivation record* behind that register: how it was
found by diffing the author’s own edits, what was rejected, and what the revision cost. It is
history rather than instruction. All four volumes are already in the register, so do not write
from PROSE_STYLE and do not update it for new work.

The short version: fewer fragments, joined into sentences; adjacent sentences get an explicit
connective; definite articles restored; simpler diction; implied things said out loud; warmer
dialogue. Curly apostrophes in prose, always.

**The one rule to apply with judgement** is "implied things get said". It is the author's
style and it is also the rule most able to cost the book something, because the beats the
original left implied were often its best. Each time, ask whether the gap was a gap or a joke.

## Standing authorial instructions

- **Character-forward.** Prefer a plate with faces doing something over an empty room.
  Volumes 1, 3 and 4 were each rebuilt on this basis. Shot-mix bands were re-set to match
  rather than logging further exceptions.
- **Warehouse scenes must not be too dark.** See roster section 6.1a. Enforced in the
  negative block. One named exception: `vol1-s03`.
- **Green skin means a character is sick.** Never a base tone.
- **Wardrobe may change between arcs.** Identity lives in the immutable block, clothing
  in the wardrobe table. New arc, new wardrobe letters — never rewrite existing ones,
  because delivered plates depend on them. See roster section 5.1.
- **Prompts must attach real reference files.** A prompt claiming a reference that does
  not exist is how Felix drifted for a whole volume.
