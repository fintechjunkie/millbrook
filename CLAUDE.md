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

**Check `git status -sb` when the author cannot see a change.** Local commits were once
16 behind the remote for a whole session.

**Verify against the canonical image, not the written description.** The lock file's prose
and its own lineup image disagreed for Owen's eyebrows, all three girls' hair, and
Monke's colour. Section 1 of the lock resolves it: the lineup controls. In every case the
delivered artwork was right and the roster text was wrong.

---

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
