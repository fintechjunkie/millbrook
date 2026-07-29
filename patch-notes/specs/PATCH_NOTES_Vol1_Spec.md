# The Patch Notes, Volume 1: Flip Book Spec

Source: `WELCOME_TO_MILLBROOK_Patch_Notes_Part_1.md`
Chapter: Part One: The Pothole
Spreads: 9 (8 text spreads plus 1 chapter opener) | Images: 9 | Words: 2252
Spec version: 1 | Date: 2026-07-28

Style, negatives, characters, locations and wardrobe states live in `PATCH_NOTES_FLIPBOOK_ROSTER.md`, which is the single source of truth for all four volumes. Do not restate any of it here and do not describe a locked character or location inline. Tokens only.

## Shot mix, this volume

Establishing 1 | Character portrait 5 | Object 1 | Action 2 | Atmospheric 0

**Three consecutive portraits at spreads 5, 6 and 8?** No. The sequence is 5
portrait, 6 portrait, 7 object, 8 portrait, so the run is broken by spread 7 and
the Part C3 rule against three in a row holds.

## The shot mix no longer satisfies Part C3, deliberately

Two reframes were made on the author's instruction, both to put characters in
front of the reader: spread 6 from a wide establishing shot of unreadable
silhouettes to a group three-shot, and spread 8 from an empty bedroom ceiling to
Pip and Vex. Both were the right call for the book. Both cost the same two
categories.

Whole-set mix across all four volumes, 37 images:

| Type | Target | Now | Count | Status |
|---|---|---|---|---|
| Establishing or location | 20 to 25% | 18.9% | 7 | under |
| Character portrait or close | 25 to 30% | 35.1% | 13 | over |
| Object or detail | 15 to 20% | 16.2% | 6 | ok |
| Action moment | 15 to 20% | 16.2% | 6 | ok |
| Atmospheric or empty | 15 to 20% | 13.5% | 5 | under |

**This is not drift and should not be patched image by image.** Part C3's bands
are a default for a generic illustrated novel, written to prevent the talking
heads failure. This book has now twice chosen, on purpose, to trade an empty
plate for a face, because it has thirteen named characters arriving across four
short volumes and readers were meeting several of them in prose only. The right
response is to re-set the bands to what a character-forward book actually wants,
and then hold the new numbers, rather than to keep logging exceptions.

Recommended new targets, which the current 37 images already satisfy: portrait 30
to 36%, establishing 17 to 22%, atmospheric 12 to 17%, object and action
unchanged. Not adopted unilaterally, because C3 is the working brief's and
changing it is the author's call.

One thing worth protecting whichever way that goes: Volume 1 has no atmospheric
image at all. The bedroom-ceiling image displaced from spread 8 is already written
and spoiler-checked, so it is available the moment a home is found for it.

**The re-chunk was done without adding a spread, 2026-07-29.** Splitting spread 8
would have meant a tenth spread, a tenth plate, and renumbering every file from
`vol1-s08.png` onward, which would have orphaned delivered artwork. Measurement made
that unnecessary: at a 1080p-equivalent page only ONE page in all four volumes
exceeded its column, spread 8 at 105%, and the median was 79%. Moving the echoed
“It’s getting bigger” pair back onto spread 7 shed the two lines that mattered.
One boundary changed, one spoiler check restated, no new image, no renumbering.

---

## Spread 0, chapter opener

Renders differently: one full bleed image across both pages with the chapter title set over it. No prose on this spread.

### Title block (typeset over the image, not generated into it)

# WELCOME TO MILLBROOK

*A Digital Slop Story*

## The Patch Notes

### Part One: The Pothole

### Image, full bleed across both pages

Slug: vol1-opener
Shot type: Establishing (full bleed, both pages)
Depicts: Millbrook itself, before anyone is awake. No story beat.
Spoiler check: PASS. Chapter opener precedes all prose. Deliberately does not show Main Street or the repaired asphalt, which is the reveal on text page 2.

Prompt:

```
{{STYLE}}
{{LOC:MILLBROOK_WIDE}}
Empty residential streets seen from a slight elevation, water tower on the horizon, no figures anywhere.
Early morning before sunrise, blue hour.
Wide establishing shot, high vantage, deep focus.
Flat pre-dawn light, streetlights still burning, one lit kitchen window.
{{NEGATIVE}}
Aspect ratio: 2:1
```

Alt text: A small town of low houses seen from above before sunrise, streetlights still on, a water tower in the distance.

---

## Spread 1

Pages 3 to 4 | Part One: The Pothole | Words 308

### Text page (left), verbatim

### Aunt Carol’s House

Aunt Carol’s house was on Crescent. Same yellow siding. Same chain link fence. Same ceramic frog by the front steps with one chipped ear. Lena Marsh dropped her bag on the porch and walked right in, because nobody in this town locked anything and because her aunt didn’t answer doors anyway.

“I’m here,” she called.

“Back bedroom,” Aunt Carol called from the living room. She was on the couch with her tablet, playing a match-three game with the volume on. She didn’t look up. “Your cousin’s old stuff is still in there. There’s a bed.”

“Thanks for letting me stay.”

“Don’t make it weird.”

The back bedroom smelled like dust and a soccer trophy that had once been gold and was now sort of beige. Her cousin Derek had moved out years ago to do real estate in Miami. The walls still had his posters. Bands she’d never heard of. Athletes who’d probably retired by now. There was a dent in the closet door she remembered hiding from when she was little.

She didn’t remember why.

Lena sat on the bed and opened her laptop. Her research folder filled the screen. Forum posts. Deleted news clips. Reddit threads with three replies and a vanished account. Nine months of work. Most of it junk. But there was a pattern, and she was the only one who’d noticed it.

Things in Millbrook didn’t stay the same. Small things. A stop sign at an intersection that wasn’t there last month, then was, with no city record of installing it. A house number that changed by one. A pothole on Main Street that everyone had complained about for two years, gone overnight.

The Mayor had taken credit for the pothole. The Mayor took credit for everything.

Lena hit record.

“Day one in Millbrook. We’re starting with the pothole.”

### Image page (right)

Slug: vol1-s01
Shot type: Character portrait
Depicts: Beat 1. Lena arriving at the house on Crescent, bag in hand.
Spoiler check: PASS. Final beat of this page is Lena hitting record and naming the pothole. Not depicted; no phone raised, no filming.

Prompt:

```
{{STYLE}}
{{CHAR:LENA}}
{{WARDROBE:LENA_A}}
{{LOC:CRESCENT_HOUSE_EXT}}
Standing at the foot of the porch steps with a duffel bag at her feet, one hand on the railing, looking up at the house rather than at the camera.
Exterior, mid afternoon.
Medium shot, slightly low angle from the walkway, shallow depth so the house softens behind her.
Warm late afternoon sun from the left, hard-edged shadows on the siding.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A teenage girl with a duffel bag at her feet stands at the bottom of a porch's steps, looking up at a yellow house.

---

## Spread 2

Pages 5 to 6 | Part One: The Pothole | Words 226

### Text page (left), verbatim

### The Girl Who Stole The Dashcam

Main Street did not have a pothole. That was the whole point.

Lena set her phone on a tripod and tried to film a piece to camera, but a guy with a leaf blower kept going past, and a woman with a stroller asked if she was filming a commercial, and on the third interruption Lena gave up.

That was when the dashcam came off her car.

She turned because the back of her neck told her to. The small dashcam she’d suction-cupped to her windshield was already in someone else’s hand. A girl about her age. Short. Mint-green hair in two messy buns, one on either side of her head, tied off with red. Already three steps away. Walking, not running.

“Hey. That’s mine.”

The girl glanced back. Sharp eyes. Mouth that looked like it was about to say something rude. She didn’t say anything. She kept walking.

Lena chased her two blocks. The girl turned into an alley between a hardware store and a closed pizza place, and by the time Lena got to the alley, she was gone.

“Come on.”

Lena went back to her tripod. The tripod was still there. So was the woman with the stroller, holding it like she was waiting to scold someone.

“You shouldn’t leave equipment lying around.”

“Yeah. Got that.”

### Image page (right)

Slug: vol1-s02
Shot type: Action moment
Depicts: Beat 3 of this page. Vex walking away with the stolen dashcam, three steps out and not running.
Spoiler check: PASS. Final beat is the woman with the stroller scolding Lena at the tripod. Not depicted; no stroller, no second adult in frame.

Prompt:

```
{{STYLE}}
{{CHAR:VEX}}
{{WARDROBE:VEX_A}}
{{LOC:MAIN_STREET}}
Walking away down the sidewalk with a small dashcam held loosely at her side, glancing back over one shoulder without stopping. A second figure far behind her at the edge of frame is unfocused and turned away, face not legible.
Exterior sidewalk, late morning.
Medium-wide tracking shot from behind and to the side, shallow depth, subject sharp and background compressed.
Flat overcast daylight, no strong shadow.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A short girl with mint-green hair in two buns walks away along a sidewalk holding a small camera, glancing back over her shoulder.

---

## Spread 3

Pages 7 to 8 | Part One: The Pothole | Words 295

### Text page (left), verbatim

### The Warehouse

Owen had been awake for thirty-one hours. He didn’t feel tired. He felt like time had stopped meaning anything, which was a place he liked to live.

Three monitors. Left one ran his anomaly tracker, four hundred and seven entries from the last week. Middle one was a map of Millbrook with the anomalies plotted as dots. Right one was a YouTube video of a guy fixing an old Cadillac, which Owen wasn’t watching but which was making the right noise.

On the map, the dots formed an arc. Not a complete one. About two-thirds of a circle that bent through the eastern half of town. He’d noticed three days ago. He hadn’t mentioned it yet, because Milo would ask what was at the center, and Owen didn’t have an answer, and Owen hated not having answers.

Across the Warehouse, Felix was on the couch killing things in a video game. Monke sat on the back of the couch eating a granola bar, watching the screen with what looked like professional interest.

“He’s judging me,” Felix said.

“He’s a monkey.”

“He’s judging me, Owen.”

Milo came in through the back door, which Felix had jammed open with a brick again. Two coffees. A paper bag with something greasy in it. He set the coffees down and tossed the bag at Felix without looking. Felix caught it without looking. They’d been doing this for two years.

“Anything?”

Owen turned in his chair. “The pothole on Main. The famous one.”

“What about it.”

“It’s gone.”

Felix paused his game. The character on screen got hit by something and exploded into polygons. Felix didn’t notice.

“Gone like fixed?”

“Gone like the asphalt is fresh and there’s no patch line. Like there was never a hole.”

### Image page (right)

Slug: vol1-s03
Shot type: Character portrait
Depicts: Beat 1. Owen at his desk after thirty-one hours awake.
Spoiler check: PASS. Final beat is Owen's line about fresh asphalt with no patch line. Not depicted; no street, no asphalt, no map detail legible.

Hard constraints: Owen has a completely bald head AND STRONG DARK EYEBROWS, clearly
present and clearly dark against very pale skin — bald scalp, but never a bare brow.
Every screen is pure cold glow with NO legible interface: no windows,
no panels, no charts, no readable content of any kind. The monitor glow is the ONLY
light source in the frame and everything behind him falls to black; the room is not
otherwise lit.

**REGENERATED THREE TIMES. THIRD PASS ACCEPTED 2026-07-29.**

Pass 1 had legible window and panel layouts on all three monitors and a warmly lit
room with the whole warehouse visible. Both were already specified in the prompt but
sat in the negative block at the foot, where they were ignored. Hoisting them into
hard constraints at the head fixed both — that part of the lesson stands, and is the
reason the hard-constraints field is now applied to every prompt where a specific
feature has drifted.

Pass 1 *also* had dark eyebrows, and I wrongly read that as drift too, because the
roster then said Owen had none. It was correct. Pass 2 removed them on a constraint
I invented, which is the error described in the roster's Owen block. Pass 3 restores
them and keeps the screen and lighting discipline from pass 2, so it is right on all
three counts at once.

The wider lesson: a hard constraint is only as good as the roster line behind it.
Hoisting a wrong fact to the head of a prompt makes the model obey it *harder*.

Prompt:

```
{{STYLE}}
{{CHAR:OWEN}}
{{WARDROBE:OWEN_A}}
{{LOC:WAREHOUSE_TERMINALS}}
Seated in a desk chair facing three monitors, turned three-quarters toward the viewer, eyes squinted against the screen glare, expression flat. His scalp is completely bald and his strong dark eyebrows are clearly visible above his narrow eyes, dark against very pale skin. Every screen shows nothing but soft undifferentiated glow, with no windows, panels, charts, icons or readable content of any kind.
Interior, roughly three in the morning.
Close shot, camera slightly below eye level, monitors framing him on both sides.
Cold monitor light as the single and only source in the frame, uplighting his face from below, the room behind him unlit and falling completely to black.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A bald young man sits in a desk chair between three glowing monitors in an otherwise dark room.

---

## Spread 4

Pages 9 to 10 | Part One: The Pothole | Words 268

### Text page (left), verbatim

Milo took a long sip of his coffee. “When.”

“Between two and four AM. Traffic cam at Main and Birch went dark for ninety seconds. When it came back, the pothole was gone.”

“You can’t fix a pothole in ninety seconds.”

“No. You cannot.”

Monke finished his granola bar. He climbed down, crossed the room with that slow purposeful walk monkeys do when they know exactly where they’re going, climbed onto Owen’s desk, and sat on top of the middle monitor. He stared at the map of dots.

Then he tapped the screen. Once. With a single finger. Right in the middle of the arc, where the circle wasn’t finished.

“He’s sitting on it,” Owen said.

“He tapped it,” Felix said.

“He taps things, Felix.”

Milo was watching Monke, not the screen. He had a look on his face Owen recognized. The look that meant Milo had decided something he wasn’t going to share yet.

“We should look at the pothole.”

“It’s not a pothole. It’s an absence of a pothole.”

“Then we’ll look at the absence.”

### Press Conference

Mayor Dalton stood in front of Town Hall in his suit and his red 3D glasses, grinning at a crowd of six. The Millbrook Crier guy. A woman with a dog. Four people who’d wandered over because there was a podium.

Lena filmed from the back.

“My fellow citizens. As of yesterday morning, the longstanding pothole on Main Street has been completely repaired. This is a victory for our infrastructure team. This is a victory for my office, which made this a personal priority during my reelection campaign.”

### Image page (right)

Slug: vol1-s04
Shot type: Action moment
Depicts: Beat 4 of this page. Monke on top of the middle monitor, one finger against the glass.
Spoiler check: PASS. Final beat is Mayor Dalton's speech at the podium. Not depicted; scene does not leave the warehouse.

Hard constraints: Monke is a SILHOUETTE, not a character portrait. He is seen from
behind and side-on, backlit by the screen, and his face is turned away from the
camera and lost in shadow. NO eye detail, NO facial expression, NO readable features.
If his face is legible the image is wrong. Palette stays warm off-white paper with
subdued colour; this is not a purple image.

**DELIVERED IMAGE ACCEPTED, author decision.** This was flagged for regeneration and
that was overruled: the delivered plate gives Monke a resolved, front-lit face with
large expressive eyes and a heavily purple palette, none of which the prompt asked
for, and the author prefers it.

**This amends a roster constraint, so it is recorded rather than absorbed.** The
Monke rendering note says he is never given a resolved hero portrait, and the
reasoning was that how much of him a reader is allowed to understand should be a
deliberate choice. It has now been made deliberately, in the other direction. The
constraint that survives is the numeric one: he still appears only twice across the
four volumes, and is still absent from the final image of Volume 4 despite being the
subject of its last paragraph.

The hard constraints above are kept for reference only. They describe the silhouette
treatment that was NOT used, and they apply only if this plate is ever regenerated
to the original intent.

Prompt:

```
{{STYLE}}
{{CHAR:MONKE}}
{{LOC:WAREHOUSE_TERMINALS}}
A small monkey perched on top of the middle monitor, seen from behind and slightly to the side, leaning down so one small finger touches the front of the screen. He is rendered as a dark silhouette against the screen glow. His head is turned away from the camera and his face is entirely lost in shadow: no eyes, no expression, no legible features whatsoever. Only the outline of the head, the curve of the spine, the long tail and the reaching arm are readable. Screen shows a soft scatter of pale dots forming an incomplete arc, no text or labels.
Interior, early morning, no daylight.
Close shot from behind and to the side, camera at monitor height, shallow depth on the finger and the glass.
Screen glow from in front of him and below, throwing him into near-total shadow with a strong rim light along his back and tail, room otherwise dark. Warm off-white paper palette with restrained colour.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A small monkey perched on top of a computer monitor reaches down and touches one finger to the screen.

---

## Spread 5

Pages 11 to 12 | Part One: The Pothole | Words 235

### Text page (left), verbatim

The Crier guy raised a hand. “Who actually fixed it?”

The Mayor’s grin tightened. “The city fixed it.”

“Right, but Public Works said they didn’t. They said they showed up yesterday morning and it was already done.”

“It was an interdepartmental effort.”

“Which departments.”

“Multiple departments.”

Through her viewfinder, Lena watched the Mayor sweat. Just at the temple. The 3D glasses caught the sun in a way that made his eyes hard to see. He was looking around for the next question the way a man looks for an exit.

That was when she noticed the three guys at the edge of the crowd.

Not standing together exactly, but in a triangle. The middle one was tall and dark-haired, jacket that fit him better than most teenage boys could manage. The one to his left had a shaved head and was holding a phone, clearly recording. The one to his right was shorter and had a permanent half-grin that meant he’d either made or set fire to something this morning.

They were watching her too. The dark-haired one made eye contact, looked away, kept looking anyway.

Lena swung her camera off the Mayor and onto them.

The bald one elbowed the dark-haired one. The dark-haired one didn’t turn his head, but his shoulders shifted. The Mayor was still talking somewhere behind her.

By the time she lowered her phone, the three of them were gone.

### Image page (right)

Slug: vol1-s05
Shot type: Character portrait
Depicts: Beat 2. The Mayor's grin tightening under questioning, one bead of sweat at the temple.
Spoiler check: PASS. Final beat is the three boys vanishing from the crowd. Not depicted; no crowd faces in focus.

Hard constraints: The suit is MUTED DUSTY PURPLE and ill-fitting. The 3D glasses have
a RED FRAME with two DIFFERENT lenses: his right lens red, his left lens CYAN. The tie
is dark red with cream polka dots and there is a red pocket square. His crown is BALD
with dark brown hair in untidy tufts at the temples only.

**DELIVERED IMAGE ACCEPTED, and the roster has been amended to match it.** The plate
was flagged for regeneration and the author kept it, so the roster now follows the
image rather than the reverse. He appears in Volumes 1, 3 and 4, so this had to be
settled before the next Mayor plate or they would have contradicted each other.

Amended in the roster: the suit is muted dusty purple rather than grey, the glasses
are real anaglyph with one red and one cyan lens rather than two red, the crown is
bald with tufts at the temples rather than sandy hair combed across, the tie is dark
red with cream polka dots, and there is a red pocket square. The glasses also moved
out of the wardrobe entries into the immutable block, where a permanent feature
belongs.

This prompt is rewritten to describe the plate that exists, so a future regeneration
reproduces it instead of fighting it. The `Depicts` line still says the grin is
tightening, which the prose supports and the delivered plate does not: the delivered
grin is wide and open. Left as delivered rather than chased.

Prompt:

```
{{STYLE}}
{{CHAR:MAYOR_DALTON}}
{{WARDROBE:MAYOR_A}}
{{LOC:TOWN_HALL_SQUARE}}
Standing behind a plain podium mid-sentence, both hands on the podium edge, grinning broadly with his teeth showing, a bead of sweat running from his temple. Eyes hidden behind the mismatched lenses. Podium bare, no signage or lettering, two microphones on short stands in front of him.
Exterior, late morning.
Close shot from slightly below, straight on, very shallow depth so the small crowd behind reads only as soft shapes and the municipal building behind them goes soft.
Hard overhead sun, specular glare across the red and the cyan lens.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A heavyset man in an ill-fitting suit and red glasses stands behind a podium, grinning stiffly, sweating at one temple.

---

## Spread 6

Pages 13 to 14 | Part One: The Pothole | Words 292

### Text page (left), verbatim

### The Park

Lena found them on a bench by the fountain. Not hiding. Just sitting. The bald one on his phone. The short one eating a sandwich. The dark-haired one watching the fountain like it had told him a secret.

She stopped six feet away.

“Hi. I’m Lena Marsh. I just moved back to town. The Mayor is full of crap, you guys know that, I know that, can we skip to the part where you tell me who actually fixed the pothole.”

The dark-haired one looked at the bald one. The bald one looked back. They had a whole conversation without saying anything.

“Okay,” the dark-haired one said. “What do you want.”

“I told you.”

“Why do you think we know.”

“Because you were watching the Mayor lie. And because Baldy here has been recording for the last four minutes, including this conversation, which is fine, you can keep recording, but you should know I noticed.”

The bald guy lowered his phone. “Milo. She’s not bad.”

“I know,” Milo said.

The short one held out his sandwich. “You want some? Peanut butter and pickles.”

“No.”

“Your loss.”

Milo stood up. He was taller than Lena had thought. “Okay, Lena Marsh. You’re asking the right question. But this isn’t a thing you want to be in the middle of.”

“Too late. Someone already stole my dashcam this morning. Short girl, green hair, two buns. Walked off with it. Pretty sure you know her.”

Milo and the bald guy looked at each other again.

“We don’t,” the bald guy said.

Lena pulled up the thumbnail she’d captured before the camera came off her windshield. Held it out.

Milo looked at it. The bald guy looked at it. The short guy stopped chewing.

### Image page (right)

Slug: vol1-s06
Shot type: Character portrait or close (group three-shot)
Depicts: Beat 1. Milo, Owen and Felix on the bench by the fountain, before Lena reaches them.
Spoiler check: PASS. Final beat is Felix stopping mid-chew when Lena holds out the photo. Not depicted; Lena is absent, nothing is being held out, and Felix is still eating.

Hard constraints: Owen has a completely bald head AND STRONG DARK EYEBROWS, clearly
present and clearly dark against very pale skin — bald scalp, but never a bare brow.
Milo's red-lensed glasses and orange beanie are both present and never removed. Felix
wears large round red-framed glasses with clear lenses. Exactly three figures, no
fourth. Nothing is being handed to any of them.

**Deviation, deliberate: three named characters.** Part C4 sets a hard ceiling of
two, on the grounds that three will fail at consistency no matter how the prompt
is written. Overridden here on the author's instruction, and the mitigation is
that all three canonical references are attached, which is the mechanism C4's
ceiling was written without. This is the introduction image for Milo and Felix,
neither of whom otherwise gets a face until Volume 2, so the picture is carrying
real work. If it drifts, the fallback is the original wide silhouette framing.

**Reframed from the original.** It was a wide establishing shot from across the
lawn with the three deliberately unreadable as silhouettes. That protected the
spoiler by distance, but it meant Volume 1 never showed two of its five leads.
The camera has crossed to the far side of the bench so the fountain sits behind
them and the light is on their faces.

Prompt:

```
{{STYLE}}
{{CHAR:MILO}}
{{WARDROBE:MILO_A}}
{{CHAR:OWEN}}
{{WARDROBE:OWEN_A}}
{{CHAR:FELIX}}
{{WARDROBE:FELIX_A}}
{{LOC:THE_PARK}}
Three eighteen year old boys arranged loosely on and around a slatted wooden bench, relaxed and unposed, none of them arranged for the camera. Milo stands at the near end with one forearm resting along the top rail of the bench back, weight on one leg, head turned to watch the fountain. Owen sits at the far end, slumped low with his knees apart, looking down at an oversized phone held in both hands. Felix sits in the middle, leaning forward with his elbows on his knees, mid-bite on a comically oversized sandwich, cheeks full, a small green gecko on his shoulder. All three faces are clearly visible and unobscured. No fourth figure. Nothing is being handed to them and no photograph or screen is being shown to them.
Exterior, midday, in the park.
Medium-wide three-shot from the far side of the bench, camera at seated eye level and square on so every face reads, the stone fountain running directly behind the bench and the park beyond it, moderate depth so the fountain stays legible while the three faces hold focus.
High midday sun from the front left, faces in clear even light with no face in shadow, the fountain's water catching bright specular highlights behind their heads.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: Three teenage boys on a park bench with a fountain running behind them, one standing and leaning on the bench back, one on his phone, one eating an oversized sandwich.

---

## Spread 7

Pages 15 to 16 | Part One: The Pothole | Words 295

### Text page (left), verbatim

“Huh,” Milo said.

“You know her now.”

“No. But I’d like to.”

### The Apartment Above The Hardware Store

Vex took the dashcam apart on her kitchen counter, which was also her work counter, which was also the only flat surface in her apartment that wasn’t covered in things. The SD card was already in her laptop.

The footage was mostly nothing. Driving in. Parking. The new girl walking off-camera. And then, for a single frame, the streetlight across the street had been off.

Vex paused. Backed up. Played it again. On. On. On. Off. On. On. On.

One thirtieth of a second. The shadows were wrong. The light on the parked cars was wrong. The world had been a little bit different, and then it had been the same again.

Vex had been collecting frames like this for six months.

Three quick knocks. Two slow. She didn’t look up.

“It’s open.”

Pip let herself in. She looked, at a glance, like a kid in a patched-up engineer jacket with goggles in her hair, and that was as far as the resemblance went. Up close, Pip was a robot. Not a kid with parts. A robot. Skin a shade too even, eyes that tracked a hair too smoothly, a small steady whir somewhere inside her chest if you stood close enough to hear it. Vex had stood close enough.

“You heard it,” Vex said.

“Four AM. Twenty-three seconds. It was loud.”

“The pothole.”

“What?”

“The pothole on Main is gone. The Mayor’s already taking credit.”

Pip sat down on a stool made of milk crates and a cushion. Most of Vex’s furniture had been other things first. Pip sat the way she always sat, which was slightly too still.

“It’s getting bigger.”

“It’s getting bigger.”

### Image page (right)

Slug: vol1-s07
Shot type: Object or detail
Depicts: Beat 3. The dashcam opened up on Vex's counter, SD card pulled and read.
Spoiler check: PASS. Final beat is now the echoed “It’s getting bigger” exchange, moved back from Spread 8 in the 2026-07-29 rebalance. Not depicted; the frame carries no figures and nothing in it refers to the thing that is getting bigger.

Prompt:

```
{{STYLE}}
{{LOC:VEX_APARTMENT}}
A small dashcam disassembled across a cluttered kitchen counter, casing separated, tiny screws gathered in a jar lid, a memory card standing upright in the slot of a battered laptop. No figures present. Laptop screen dark except for a single paused frame of a night street, no interface elements or text.
Interior, evening.
Close overhead shot, slight angle, shallow depth on the memory card.
One bare bulb from above and the laptop's cold spill from the left.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A dashcam taken apart on a cluttered counter beside a laptop, with its memory card standing in the laptop's slot.

---

## Spread 8

Pages 17 to 18 | Part One: The Pothole | Words 330

### Text page (left), verbatim

“And nobody’s going to do anything about it.”

“Nobody’s going to do anything about it.”

Vex tapped the laptop. The single dark frame stared back at her. “There’s also a girl. New in town. She has a research folder. I checked her car.”

“You stole a tourist’s dashcam.”

“She’s not a tourist.”

Pip was quiet for a second, eyes tilted at the ceiling like she was reading something off it. “We’re going to talk about boundaries again.”

“We really aren’t.”

### End Of Day One

Lena lay on the bed in the back room and stared at the ceiling. Aunt Carol had gone to bed at nine. The house was quiet except for the refrigerator.

Her phone buzzed. Unknown number.

Sorry about the dashcam. Meet at the laundromat on Crescent tomorrow at nine. Bring coffee. Don’t bring those guys.

Lena read it twice. How did you get my number.

Reply, four seconds later.

Your number was on the dashcam manual you left in your glove box. Bring oat milk if you have it.

Across town, Owen was looking at his map again. The arc glowed softly on the middle monitor. He’d added the pothole. The arc was a little more complete now, and the gap in the middle was clearly aiming somewhere.

Monke was on the desk, face an inch from the glass.

“What are you looking at.”

Monke pointed. Not at the arc this time. At the empty space inside it. There was a building there. The old elementary school, closed since the Event.

“Tomorrow,” Owen said. “Tomorrow we’ll look. Get off my desk.”

Monke did not get off his desk. He sat down on the keyboard, which made the screen do something unhelpful, and he stayed there for the rest of the night.

Outside, somewhere across town, the streetlight across from Aunt Carol’s house went off for one frame, then on again, and nobody saw it.

*To be continued in Part Two: The Bookstore That Was Always There*

### Image page (right)

Slug: vol1-s08
Shot type: Character portrait or close (two-shot)
Depicts: Beat 6. Pip on the milk-crate stool with her chin lifted and her eyes tilted at the ceiling, Vex at the counter with the laptop.
Spoiler check: PASS. Final beat is the streetlight across from Aunt Carol's house going off for a single frame. Not depicted; the scene never leaves Vex's apartment, and neither Owen, Monke, Lena nor any exterior appears.

**Reframed to put a person in it.** It was the back bedroom ceiling, empty, lit by
a rectangle of phone light. A good quiet image, but Volume 1 was ending without
ever showing Pip, who is a lead and whose reveal as a robot happens one page
earlier. This was the only remaining page in the volume she is on.

The beat chosen is her listening pose rather than her arrival, which matters: her
arrival and the robot reveal are spread 7's business, and by the time a reader
sees this image they have already read that page. Vex is included because the two
of them are a pair and because it keeps the scene rather than isolating a
portrait. Two named figures, which is inside the Part C4 ceiling.

Prompt:

```
{{STYLE}}
{{CHAR:VEX}}
{{WARDROBE:VEX_A}}
{{CHAR:PIP}}
{{WARDROBE:PIP_A}}
{{LOC:VEX_APARTMENT}}
Two girls in a cluttered single-room apartment late at night. Pip sits on a stool made of milk crates and a cushion, both feet flat and level, hands resting symmetrically on her knees, spine straight, chin lifted so her eyes are tilted up at the ceiling as though reading something off it. Her stillness is the point: the pose is a shade too even and too level to be a person relaxing, and her face is calm and unblinking. Vex sits sideways on the floor by the kitchen counter with a battered open laptop beside her, one hand still on its edge, half turned to watch Pip rather than the screen. Both faces are clearly visible. The laptop screen holds a single dark paused frame of a night street, no legible interface. Exactly two figures in frame.
Interior, late evening.
Medium two-shot from low down at stool height, angled so Pip's lifted face and Vex's turned face both read, moderate depth so the crowded room stays legible behind them.
One bare bulb hanging above and slightly behind Pip, cold spill from the laptop screen low on the left, the corners of the room falling away into dark.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A girl sits unnaturally still on a milk-crate stool with her chin lifted and eyes turned up at the ceiling, while another girl on the floor beside an open laptop turns to watch her.
