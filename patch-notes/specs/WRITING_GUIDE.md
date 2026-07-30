# Millbrook: writing guide

**Read this before writing a new chapter.** It is the forward-looking instruction — everything a
writer needs to get a new volume right the first time instead of converting it afterwards.

Every number in it is measured off the delivered arc, not estimated.

### How this relates to the other documents

| File | What it is |
|---|---|
| **this file** | How to write a new chapter. The single place to look. |
| `PROSE_STYLE.md` | The *derivation record* — how the register was found by diffing the author's own edits, what was rejected, and what the revision cost. History, not instruction. Do not write from it and do not update it for new work. |
| `PATCH_NOTES_FLIPBOOK_ROSTER.md` | Canon. Characters (§4), the Great Event (§4.1), the six roles (§4.2), wardrobe (§5), locations (§6). Authoritative for anything about who or where. |
| `CLAUDE.md` | Build and tooling conventions. |

---

## 1. The register, in one page

The author's own summary: *less choppy, fewer fragments, more strung-together sentences, a little
simpler language at times.*

1. **Fragments used as a LIST get joined. Fragments used for EMPHASIS stay.** This is the single
   most important distinction in the document and the easiest to get wrong in both directions.
   - Join: *Cheap signage. Gray awning. A flickering OPEN light.* → *It had cheap signage, a gray
     awning and a flickering OPEN light.*
   - Keep: *She kept smiling. The smile didn't change. The eyes did.*
   - The test: if the fragments could be commas in a list, they should be. If the full stops are
     doing the work of a drum, leave them.
2. **Adjacent sentences get an explicit connective** — *and, but, because, before, so.* Do not
   set two sentences side by side and let the reader infer the join. But break long *and*-chains
   into two sentences; the target is medium-length sentences with visible joins.
3. **Definite articles come back.** Not *Left one ran his tracker* but *The left one ran his
   tracker.*
4. **Simpler diction.** Prefer the plain word. Cut the clever construction.
5. **Implied things get said** — *and this is the rule most able to cost the book something.*
   Ask every time: was the gap a gap, or was it a joke? If the omission is the wit, keep the
   omission. Applied sparingly across Volumes 2–4 for exactly this reason.
6. **Dialogue is warmer and more explicit** than the first draft's.
7. **Where a fragment stack ends on a punch, join the list and keep the punch.** This move came
   up six times: *Owen turned. Slowly. Like a man who…* → *Owen turned. Slowly, like a man who…*

### Never flatten these

Recorded so a later pass doesn't "finish the job". Each is a fragment stack doing real work:

- *She kept smiling. The smile didn't change. The eyes did.*
- *She was not crying. She had been crying. Her eyes were the way eyes get after.*
- Felix's triple-take: *He looked at Pip. He stopped. He started again. He blinked.*
- *She hadn't put batteries in it. She had never put batteries in it.*
- *He didn't make a sound. He just sat there. He stayed.*
- The three *By morning…* paragraphs.
- *The Mayor had agreed to a live segment. He had bought a new tie.* — a connective would explain
  the joke.
- Anaphora roll-calls: *Milo wanted… Owen wanted… Felix wanted…*
- Clipped dialogue that is **characterisation** rather than register: Pip throughout, Crane's
  military clipping, Mr. Henderson's dropped subjects.

---

## 2. The six, and how each one sounds

Full doctrine in roster §4.2. **The design rule: each is the only one who can do their thing, so
every split of the group forces itself. If a plan works with five of them, the plan is wrong.**

| | Does | Never |
|---|---|---|
| **Milo** | Reads rooms and people. Talks adults down. The only one who can stand in front of Crane and not lose. | Touches anything technical. Ever. |
| **Owen** | Signals, records, patterns, infrastructure. Beats institutions with their own paperwork. | Functions in front of a stranger. |
| **Felix** | Builds from nothing; half of it fails. **Delighted by everyone**, so he's the one strangers talk to. | Is the reliable hardware guy. |
| **Lena** | Gets people to say true things on camera. Understands publicity as a weapon. | — |
| **Vex** | Breaks and enters. Locks, roofs, fences, teardown, every street. **The Artful Dodger.** Advocates for the vulnerable — a skill, not a trait. | Strains visibly at any of it. |
| **Pip** | The other band. Reads config files across a room, hears what nobody hears, translates. The bridge. | — |

**Writing each one:**

- **Milo** — short, level sentences. He de-escalates. Because his skill is people, he must always
  need one of the other five for anything else; letting the leader also be competent is the
  standing temptation and it breaks him.
- **Owen** — terse, factual, faintly offended. His limit is a hard stop, not shyness: put him in
  front of a stranger and the scene stops. If Owen ever charms someone, the character is broken.
  He talks *about* systems, never *to* people.
- **Felix** — the comic engine and the most underused voice in the arc. Enthusiastic, leaky, no
  filter. He is the group's way in, and he gives things away because he likes everybody.
- **Lena** — asks, waits, doesn't fill silences. Her craft is visible in what she *doesn't* do:
  crouching so it stays an interview, leaving the camera in the bag.
- **Vex** — fewest words of the six. Competence reads as **ease, never effort** — she is already
  through the fence, already on the roof. She takes rather than asks, including when she's
  helping. **She never states the warmth out loud** (the jacket on the couch back, and the word
  *cold* never said).
- **Pip** — flat, precise, literal, no contractions where they can be avoided. She answers the
  question asked. Her clipped register is character, not style, so it survives every pass.

---

## 3. The page, and the arithmetic that governs it

A spread is **prose on the left, one plate on the right, never alternating.** The prose page is
the constraint.

### Measured budget

| | |
|---|---|
| Lines available per page | **34.5** |
| Characters per line | **~65** (range 56–73) |
| Hard ceiling | **32 lines** — nothing may scroll |
| Comfortable target | **26–30 lines (75–87%)** |
| Median delivered page | 237 words · 14 paragraphs · 76% fill |
| Delivered range | 122–350 words · 5–24 paragraphs |

### The one thing that surprises everybody

**Every paragraph costs a whole line however short it is.** Across the arc there are 328
single-line paragraphs, and their median length is **33 characters** — half a line. Dialogue is
59% of paragraphs on a median page, so roughly **four lines per page are lost to dialogue
granularity alone.**

Which means word count is a poor guide and paragraph count is the real one:

- A narration-heavy page: **350 words in 12 paragraphs → 94% full.**
- A dialogue-heavy page: **267 words in 20 paragraphs → 90% full.**

83 fewer words, same page. So:

> **Estimating a page:** add up `ceil(characters ÷ 65)` for each paragraph, minimum 1 each. Keep
> the total at 30 or under.

**Consequence for the register:** joining fragments *inside* a paragraph reclaims part of a line.
It does not merge dialogue paragraphs, and it never will — two speakers cannot share a line. Do
not expect the style rules to buy page room on a dialogue page; only re-cutting boundaries does
that.

### Where a page should end

- **On a landed line.** The best pages end on a beat, then stop. A short page that ends well is
  better than a full one that ends mid-scene.
- **White space under a landed line is punctuation, not waste.** Three pages in the arc sit at
  41–43% on purpose: they end on *"I'm not asking permission"*, *"I don't know how to make my
  brain stop hearing"*, and Monke waiting for morning. Do not pad those.
- **But an under-filled page that ends mid-scene is just thin.** That's the case to expand, and
  the way to expand it is a beat where one character does the thing only they can do — in
  dialogue, not description.
- **Don't split a speech across a page turn** unless the turn falls between sentences.

---

## 4. Canon you cannot contradict

- **The Great Event was six months ago** — an ordinary Thursday afternoon in October, when every
  clock in Millbrook lost the same **ninety seconds**. The east-side elementary school was
  emptied that afternoon and never reopened; a chain link fence went up around its six acres
  inside a week. Nobody was hurt. Nobody remembers being frightened.
- **The ninety seconds is the signature.** Every patch since shares it. The Event was the first
  patch and the largest, and it is why the town can be patched at all.
- **Six months is also when the patches started** and when every device in Vex's bin died. Those
  are the same night. **Do not state that connection in narration** — a reader who notices has
  found something; Owen and Vex work it out inside the book.
- **Patches** get *fixed*: a pothole gone with no work order, a stop sign the city has no record
  of, a house number different by one. Getting more frequent and larger.
- **Nobody notices**, and it is not a metaphor. A change is very slightly easier to accept than
  to question. Lena is the only one who hasn't caught it yet.
- **Green skin means a character is sick.** Never a base tone.
- Present day is April (October + six months). Nothing contradicts that; don't introduce
  anything that does.

---

## 5. Spoiler discipline

Each spread's plate depicts a beat **on its own page**, and the spec carries a spoiler check for
every one. Two rules that matter when writing:

1. **The last beat of a page is usually the one the plate must not show.** Write pages so the
   final beat is the turn, and the image can live earlier on the page.
2. **A page boundary is not free.** Moving one changes which beat an image is allowed to depict,
   so every re-cut means re-reading the spoiler check by hand. Decide boundaries deliberately.

The primer on the landing page follows one rule: **give the reader what the TOWN knows, never
what the STORY reveals.** New chapters should not leak into it.

---

## 6. Mechanics checklist

- **Curly apostrophes and quotes throughout** — `’` and `“ ”`. Prompts and production notes may
  use straight ones; prose may not. There is a check for this.
- **Epithets only before a name is known.** Close third on Lena means she cannot use a name she
  has not been told — but the moment a name is spoken aloud, the narration uses it and never goes
  back. If a character needs naming, four words of dialogue is cheaper than a rewrite.
- **Paragraph indents are automatic** and depend on whether the page opens a section. Only 13 of
  the arc's pages begin a new section; the rest continue mid-scene and indent. Nothing to do by
  hand.
- **Identical adjacent paragraphs cannot be edited in place** — the in-browser editor is
  content-addressed and will refuse rather than guess. That's a spec edit.
- **Deleting a paragraph is a spec job**, not an edit-mode job.

---

## 7. After writing

```bash
npm run text     # recount prose, update declared word counts
npm run parse    # verify — fails loudly if a declared count disagrees
npm run smoke    # every route, expecting 200
```

The declared word count is a **tripwire, not bookkeeping**: two commands for two cases is the
point, and `parse` must never be made to repair it silently.

To measure real page fill, do **not** trust `/checks/overflow` in a non-compositing preview pane —
it waits on `requestAnimationFrame` and silently never measures. Walk
`[data-mb-page][data-mb-kind="text"]` and read each `[data-mb-flow]` with `flex` temporarily set
to `none`, restoring it **before** reading `clientHeight`. A stretching flow box reports
`scrollHeight === clientHeight`, so overflow otherwise reads as zero.

### New chapter checklist

- [ ] Spread map: one plate per spread, each anchored to a beat on its own page
- [ ] Every page 26–30 lines, none over 32
- [ ] Every page ends on a landed line
- [ ] Spoiler check written for each plate, and the last beat of the page is not the one depicted
- [ ] Each of the six does something only they could do, at least once
- [ ] No scene solvable by swapping one character for another
- [ ] Curly punctuation throughout
- [ ] `npm run parse` and `npm run smoke` both clean
