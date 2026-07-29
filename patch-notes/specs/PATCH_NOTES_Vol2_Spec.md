# The Patch Notes, Volume 2: Flip Book Spec

Source: `WELCOME_TO_MILLBROOK_Patch_Notes_Part_2.md`
Chapter: Part Two: The Bookstore That Was Always There
Spreads: 9 (8 text spreads plus 1 chapter opener) | Images: 9 | Words: 1961
Spec version: 1 | Date: 2026-07-28

Style, negatives, characters, locations and wardrobe states live in `PATCH_NOTES_FLIPBOOK_ROSTER.md`, which is the single source of truth for all four volumes. Do not restate any of it here and do not describe a locked character or location inline. Tokens only.

## Shot mix, this volume

Establishing 2 | Character portrait 3 | Object 1 | Action 3 | Atmospheric 0

Sequence: establishing, action, establishing, portrait, action, action, portrait,
portrait, object. The only adjacencies are 4 with 5 and 6 with 7, both pairs, and
the rule forbids three. Verified.

**Rebuilt to be character-forward on author instruction.** Five of the nine images
had no named figure in them, while Vex appeared in four spreads of this volume with
no face anywhere, Owen had two scenes and no face, and Aunt Carol had a whole scene
rendered as an empty kitchen. Four images changed:

| Spread | Was | Now |
|---|---|---|
| 1 | Pip alone at the table | Vex slides the dashcam to Lena — introduces Vex |
| 3 | The cardigan woman alone | Her and Lena across the counter |
| 4 | Felix alone erupting | Felix erupting while Owen refuses to turn round |
| 5 | Object study of Owen's desk | Owen turning slowly to face Pip |
| 7 | The kitchen, empty | Aunt Carol and Lena with the receipt — introduces Carol |

All five are two-handers, and every one stays inside Part C4's ceiling of two named
figures. Object drops from 2 to 1 and atmospheric from 1 to 0, and spread 8 was
deliberately left as the object study of the dead radio: it keeps one image in the
volume that cannot drift, and the volume wants a quiet close.

**Spreads 0 and 2 are deliberately left with no figures.** They are the matched
pair, the same corner in its vape-store state and its bookshop state from an
identical camera position, which the roster calls the single highest-value image
decision in the set. Putting a figure in either would break the match, and the
match is the reveal.

---

## Spread 0, chapter opener

Renders differently: one full bleed image across both pages with the chapter title set over it. No prose on this spread.

### Title block (typeset over the image, not generated into it)

# WELCOME TO MILLBROOK

*A Digital Slop Story*

## The Patch Notes

### Part Two: The Bookstore That Was Always There

### Image, full bleed across both pages

Slug: vol2-opener
Shot type: Establishing (full bleed, both pages)
Depicts: The corner of Maple and Fourth as it currently is. No story beat.
Spoiler check: PASS. Deliberately shows the corner in its vape store state. The bookstore is the reveal on text page 2 and must not appear here.

Prompt:

```
{{STYLE}}
{{LOC:MAPLE_AND_FOURTH_A}}
The corner storefront closed up and empty of people, cheap signage, gray awning, a flickering illuminated sign in the window rendered as glow only with no legible lettering.
Exterior, first light.
Wide establishing shot from across the intersection, deep focus.
Grey pre-dawn ambient with the sign's sour electric glow as the only warm note.
{{NEGATIVE}}
Aspect ratio: 2:1
```

Alt text: A cheap corner storefront under a gray awning at first light, its window sign glowing, the street empty.

---

## Spread 1

Pages 3 to 4 | Part Two: The Bookstore That Was Always There | Words 283

### Text page (left), verbatim

### The Laundromat

Lena got there at eight forty-five with two coffees, oat milk in one of them, and a head full of questions she’d been writing down all night.

The laundromat on Crescent was empty except for a tired-looking woman folding towels and the hum of a dryer that had been running too long. Lena sat on the bench by the window and waited.

At nine on the dot, the door chimed.

The girl with the green hair walked in, sat down across from her, and slid the dashcam across the table.

“Sorry. I needed the SD card.”

“You could have just asked.”

“You would have said no.”

“Fair.”

Lena slid the oat milk coffee across. The girl took it without saying thank you and drank like she’d been awake for a while.

“I’m Vex.”

“Lena.”

“I know who you are. I read your folder.”

“You what.”

“Your laptop was open in your aunt’s window when I walked past last night. Your folder is solid. The Reddit thread from December is good. You missed three posts though.”

Lena put her coffee down. “Okay. We’re going to talk about the part where you walked past my aunt’s house at night.”

“We really aren’t.”

The door chimed again. The other girl walked in, and Lena felt her brain do a small recalibration. Goggles in her hair. Patched jacket. Skin a shade too even. Eyes that tracked a hair too smoothly when they swept the room. The girl moved like a person, mostly, except for the parts where she didn’t.

“Oh,” Lena said, before she could stop herself. “You’re a robot.”

“I’m Pip.”

“Sorry.”

“It’s fine. People notice or they don’t. You noticed. That’s honest.”

### Image page (right)

Slug: vol2-s01
Shot type: Action moment
Depicts: Beat 4. Vex sliding the stolen dashcam back across the laundromat table to Lena.
Spoiler check: PASS. Final beat is Pip's line about noticing being honest. Pip has not entered the room in this frame and is absent from it.

**Reframed to be character-forward.** It was Pip alone at the table with her hands
set flat. Two problems with that: Pip now gets her introduction in Volume 1
spread 8, and Volume 2 was giving no face at all to Vex, who is in four of its
nine spreads and whose apartment closes the volume. This is the moment the two
girls actually meet, so it is the natural place to spend the image.

Prompt:

```
{{STYLE}}
{{CHAR:LENA}}
{{WARDROBE:LENA_B}}
{{CHAR:VEX}}
{{WARDROBE:VEX_A}}
{{LOC:LAUNDROMAT}}
Two girls at a small laundromat table caught mid-exchange. Vex has just pushed a small dashcam across the tabletop and her hand is still on it at full extension, arm straight, weight forward on the seat, chin up and unapologetic, eyebrows raised as though she has said something reasonable. Lena is half out of her seat reaching for it, other hand flat on the table, mouth open on a word, an expression caught between offence and interest. Two paper coffee cups on the table, one nearer Lena. Both faces clearly visible. Exactly two figures in frame.
Interior, nine in the morning.
Medium two-shot from the end of the table so the dashcam sits between them at the centre of the composition, camera at seated eye level, moderate depth so the banks of machines read behind them.
Flat fluorescent overhead mixed with cold window light from the left, no dramatic shadow.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: Two girls at a laundromat table, one pushing a small dashcam across it with her arm at full stretch, the other half standing to reach for it.

---

## Spread 2

Pages 5 to 6 | Part Two: The Bookstore That Was Always There | Words 230

### Text page (left), verbatim

Pip sat down at the table without being invited. She didn’t take a coffee. She set her hands flat on the table in a way that was slightly too symmetrical.

“She’s not being rude,” Vex said. “Her head’s loud right now.”

“My head is loud,” Pip agreed. “There’s a small one running. Maple and Fourth.”

“A small what.”

Vex pulled out her phone. “We should go.”

### Maple And Fourth

Maple and Fourth had a vape store on the corner. Lena remembered it from yesterday because she’d walked past it on her way back from the press conference. Cheap signage. Gray awning. A flickering OPEN light in the window that had been making her eye twitch.

It was a bookstore now.

The awning was navy blue. Painted lettering said HOLLOW PINE BOOKS. The window had a display of paperbacks, hand-lettered cards with little staff recommendations, and a fat ginger cat sleeping on a stack of cookbooks. The OPEN sign was carved out of wood.

“Okay,” Lena said slowly. “Okay.”

Vex was already filming. “You see this. You’re seeing this with your own eyes.”

“I’m seeing it.”

“Yesterday this was a vape store.”

“Yesterday this was a vape store.”

Pip stood very still on the sidewalk. Her head was tilted slightly. “It’s settled now. Whatever it was doing, it’s done.”

The bell over the door chimed when Lena pushed it open.

### Image page (right)

Slug: vol2-s02
Shot type: Establishing or location
Depicts: Beat 4. The same corner, now Hollow Pine Books. Deliberately paired with the volume opener.
Spoiler check: PASS. Final beat is the door bell chiming as Lena pushes it open. Not depicted; the door is closed and no figure touches it.

Hard constraints: ATTACH BOTH `vol2-opener.png` AND the existing `vol2-s02.png`.
`vol2-opener.png` is the authority for CAMERA ONLY: same position across the
intersection, same standing height, same distance, same square-on angle to the corner,
same lens character, and the corner building at the same position and apparent size in
frame. `vol2-s02.png` is the authority for SUBJECT ONLY: the bookshop, the navy awning,
the cat. Keep the crosswalk stripes in the near foreground, the utility poles, the
street receding to the left and the buildings continuing to the right, all as the
opener has them. Do NOT copy the opener's LIGHT: this is warm mid morning, the opener
is cold first light. NO LEGIBLE TEXT anywhere; the signboard, the window cards and the
door sign are worn marks, not words, and no shop name is written.

**Regenerated and accepted. The pair match holds.** The first plate was a good image and
the wrong one: much closer, diagonal from the sidewalk, no crosswalk, no poles, no street
context, so nothing about it said *this is the corner you were looking at two spreads
ago*. The reveal in this volume is that a vape store became a thirty-year-old bookshop
overnight, and all of it lands or fails on the reader recognising the view.

The second pass holds the vantage and carries the street furniture across intact: the
left pole with its two blank directional signs, the blank stop sign, the tree at far
left, the crosswalk stripes, the yellow awning further down the street, the red brick
building to the right, the right-hand pole and lamp, the dumpster, the blue mailbox and
the green trash can are all where the opener has them.

Measured rather than eyeballed. Sampling the blue shopfront band across both frames puts
the corner's horizontal centre **2.1% of frame width apart** and its apparent width
**1.8% apart**, across two different aspect ratios. And the light correctly does not
match: cold first light in the opener, warm morning sun here.

Note the ratios differ, 2:1 for the opener against 3:2 here, so an identical crop is not
possible and is not the target. See roster section 6, which used to ask for one. What is
wanted is the same *view*: this frame is the opener's view cropped in from the sides and
extended vertically, not a second visit to the same building.

Prompt:

```
{{STYLE}}
{{LOC:MAPLE_AND_FOURTH_B}}
The same corner storefront seen from the same place across the intersection as the attached opener image, at the same standing height and the same distance, square on to the corner, with the building occupying the same position and the same apparent size in frame. It is now a settled old bookshop: a navy canvas awning over the corner windows, a hand-painted signboard above it whose lettering is worn to illegible marks, a window display of stacked paperbacks with small propped cards whose handwriting is not readable, a fat ginger cat asleep on a stack of books, and a carved wooden sign hanging in the door glass with no readable words. The door is closed and nobody is touching it. Crosswalk stripes across the near foreground, utility poles standing left and right, the street receding away to the left, further storefronts continuing to the right, exactly as in the attached opener. No figures anywhere.
Exterior, mid morning, well after the opener's dawn.
Wide establishing shot from across the intersection, camera at standing height, same vantage and lens as the attached opener, deep focus, composed for a taller frame by including more sky above and more roadway below rather than by moving closer.
Warm direct morning sun full on the awning and the shopfront, deep shade beneath the awning, short shadows. This is NOT the opener's cold flat first light.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A corner bookshop with a navy awning and a window display of paperbacks, a ginger cat asleep among them.

---

## Spread 3

Pages 7 to 8 | Part Two: The Bookstore That Was Always There | Words 258

### Text page (left), verbatim

Inside smelled like paper and a cinnamon candle. Wooden shelves. Worn rugs. The kind of store that had been there for thirty years, the kind of store you couldn’t build in a month if you tried. The woman behind the counter looked up and smiled. She was maybe sixty. Reading glasses on a chain. A green cardigan with one button replaced by a different green button.

“Morning, ladies.”

“Hi,” Lena said. “Can I ask you something kind of weird.”

“Sure.”

“How long have you been here.”

The woman thought about it the way people think about things they’ve never had to think about. “Oh. Hollow Pine opened in 2019. So six years now.”

“Six years.”

“Mm-hmm.”

“Do you remember opening day.”

The woman’s smile flickered. Just a little. “Well. You know how it is. Long time ago. I remember the cake. Vanilla cake. We ran out by lunch.”

“What was here before.”

“Before Hollow Pine?”

“Yes.”

Another flicker. Longer this time. “I don’t. Hm. I don’t actually remember. Isn’t that funny.”

She kept smiling. The smile didn’t change. The eyes did.

Vex was browsing the shelf nearest the counter, pretending to read titles. Pip was by the door, looking at a flyer board, head tilted in that listening way. Lena bought a paperback she didn’t want, said thank you, and walked out.

On the sidewalk, all three of them stood there for a second.

“She’s real,” Pip said quietly. “Her pulse is real. Her breathing is real. I checked.”

“Is she though,” Lena said.

Nobody had an answer.

### Image page (right)

Slug: vol2-s03
Shot type: Character portrait or close (two-shot)
Depicts: Beat 2. The woman behind the counter looking up and smiling at Lena, who has just asked to ask something weird.
Spoiler check: PASS. Final beat is the three of them out on the sidewalk with no answer. Not depicted; the scene stays inside the shop. Her smile is uncomplicated here, and the flicker belongs to the prose.

Hard constraints: One button on the green cardigan, the third from the top, is a
slightly different green from the rest, and it must be visible without being
pointed at. Her smile is warm and completely untroubled; she is never sinister.

**Reframed to be character-forward.** It was her alone behind the counter. Putting
Lena in it turns a portrait into an exchange, and the whole scene is about a
question being asked and a smile not quite covering the answer.

Prompt:

```
{{STYLE}}
{{CHAR:LENA}}
{{WARDROBE:LENA_B}}
{{CHAR:GREEN_CARDIGAN_WOMAN}}
{{WARDROBE:CARDIGAN_A}}
{{LOC:HOLLOW_PINE_INT}}
An older woman behind a wooden shop counter has just looked up from a task and is smiling warmly and easily at a teenage girl standing at the counter with her. The woman's hands are still resting on whatever she was doing, reading glasses down on their chain. The girl leans in slightly with one hand on the counter edge, shoulders raised, mouth open on the beginning of an awkward question, her expression apologetic. Her satchel strap crosses her chest. Both faces clearly visible. Exactly two figures in frame.
Interior, mid morning.
Medium two-shot across the corner of the counter, camera at standing eye level, shallow depth so the shelving behind goes soft.
Warm tungsten lamplight from above and behind the woman, cool daylight from the shopfront off to the right catching the girl.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A woman in her sixties in a green cardigan smiles from behind a wooden shop counter at a teenage girl who is leaning in to ask her something.

---

## Spread 4

Pages 9 to 10 | Part Two: The Bookstore That Was Always There | Words 288

### Text page (left), verbatim

### The Warehouse Door

Owen had been trying to pull the city tax records for the building at Maple and Fourth for forty minutes when the back door opened and three girls he had not invited walked in.

“Nope,” he said, without turning around.

“Milo here?” Vex asked.

“He’s in the back. Get out.”

Felix popped up from the couch like a meerkat. “Hi. Wait. Hi.” He looked at Lena. “You’re the press conference one.” He looked at Vex. “You’re the dashcam one.” He looked at Pip. He stopped. He started again. He blinked. “You’re a robot.”

“Yes.”

“You’re a robot. In our warehouse.”

“Technically I’m on the welcome mat. I haven’t crossed the threshold yet. Is that a problem.”

“No. No. Come in. Please come in. Owen, look.”

“I heard,” Owen said, still not turning.

Milo came out from the back, saw the three of them, and stopped walking.

“Oh,” he said.

“Oh,” Lena agreed. “Hi. We need to talk. Maple and Fourth is a bookstore now.”

“It’s a vape store.”

“It was. As of this morning, it has been a bookstore for six years and the woman who owns it remembers a vanilla cake and not what was there before.”

Milo looked at Owen. Owen had already pulled up his anomaly tracker. The dot at Maple and Fourth was glowing. New entry. Time stamped four minutes ago.

“You were there when it happened,” Owen said. He sounded almost personally offended.

“We were close.”

“How close.”

“Two blocks.”

Pip had walked over to Owen’s screens. She was looking at all three of them at once. Her eyes were doing the smooth-tracking thing. After a few seconds she said, very calmly, “Your anomaly tracker has a frequency filter.”

### Image page (right)

Slug: vol2-s04
Shot type: Action moment
Depicts: Beats 2 and 3. Owen refusing to turn around while Felix erupts from behind the couch.
Spoiler check: PASS. Final beat is Pip naming the frequency filter on Owen's tracker. Not depicted; Pip is absent and no screen content is legible.

Hard constraints: Felix has a short upright black afro, round glasses with thin red
frames, and a faded teal denim jacket over a black t-shirt with a strap harness of
small tools across the chest. The green gecko is present. Owen has a fully bald head
and strong dark eyebrows. Owen's back is to the room and his face is not visible, so
this frame carries no risk to his likeness.

**Reframed to be character-forward.** It was Felix alone. The page's joke is that
Owen will not give the intruders the dignity of turning round, and that only works
if both are in frame. Two named figures, inside the ceiling.

Prompt:

```
{{STYLE}}
{{CHAR:OWEN}}
{{WARDROBE:OWEN_A}}
{{CHAR:FELIX}}
{{WARDROBE:FELIX_A}}
{{LOC:WAREHOUSE_PIT}}
A converted warehouse lounge mid-interruption. In the near foreground and to one side, Owen sits at his desk with his back squarely to the room, seen from behind over one shoulder, refusing to turn around, one hand still on a mechanical keyboard, his bald head and high white collar unmistakable. His face is not visible. Beyond him Felix has erupted upright from behind the back of a sagging couch, both hands planted on the cushion top, arms braced, shoulders up around his ears, grinning enormously and caught mid-word, a small green gecko clinging to his shoulder. Felix's face is clearly visible and is the focus. The monitors on Owen's desk are turned away and read as pure glow with no legible content. Exactly two figures in frame.
Interior, mid morning.
Medium-wide shot from the back door side of the room, camera at couch height so Felix rises into the upper frame and Owen's turned back anchors the foreground, moderate depth holding both.
High window light in dusty beams from the left, warm bounce off the concrete floor, cold monitor spill on Owen's shoulders.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A grinning teenage boy in a teal denim jacket pops up from behind a couch with a small green gecko on his shoulder, while another boy at a desk keeps his back turned.

---

## Spread 5

Pages 11 to 12 | Part Two: The Bookstore That Was Always There | Words 217

### Text page (left), verbatim

Owen turned. Slowly. Like a man who didn’t want to acknowledge that someone in the room had just said something true that he hadn’t told them.

“It does.”

“It’s tuned wrong.”

“It’s tuned to what we hear.”

“It’s tuned to what your equipment hears. There’s a band above it. The patches don’t live where you’re listening. They live higher. I can hear them. You can’t.”

Owen stared at her. “How do you know what my filter is set to.”

“I’m looking at it.”

“It’s in a config file.”

“Yes.”

“You can read a config file from across the room.”

“Yes.”

Owen turned back to his keyboard and started typing fast. “Don’t talk to me.”

“Okay.”

“I mean it.”

“Okay.”

Felix had his hands on the back of his head. He was grinning. “This is the best day.”

### The Pig And The Bookstore Receipt

Lena was on the couch with the pig, who had decided she was acceptable. Vex was inspecting Felix’s Shop and pulling apart his most recent invention without asking. Felix was watching her do it and making small distressed noises he was trying to hide. Pip stood near Owen, not talking, listening to whatever her head was telling her. Monke was on the high shelf, watching everything, granola bar suspended halfway to his mouth.

### Image page (right)

Slug: vol2-s05
Shot type: Action moment
Depicts: Beat 1. Owen turning slowly in his chair to look at Pip, who has just read his config file from across the room.
Spoiler check: PASS. Final beat is Monke on the high shelf with a granola bar halfway to his mouth. Not depicted; no animal in frame and the high shelves are out of shot.

Hard constraints: Owen has a fully bald head AND STRONG DARK EYEBROWS, clearly
present and clearly dark against very pale skin — bald scalp, but never a bare
brow. Every screen in frame is pure glow with NO legible
interface, no windows, no panels, no readable content of any kind. Pip's posture is
a shade too level and she is not mid-blink.

**Reframed to be character-forward.** It was a close object study of the desk with
no faces. The page is a two-hander in which a machine quietly out-reads the person
who thought he was the expert, and the beat that carries it is Owen turning round
slowly because he does not want to.

Prompt:

```
{{STYLE}}
{{CHAR:PIP}}
{{WARDROBE:PIP_A}}
{{CHAR:OWEN}}
{{WARDROBE:OWEN_A}}
{{LOC:WAREHOUSE_TERMINALS}}
Owen has swivelled his desk chair a quarter turn away from three monitors and is looking over his shoulder at Pip with a flat, cornered expression, one hand still resting on the keyboard behind him as though he has not committed to the turn. His head is completely bald and his strong dark eyebrows are clearly visible above his narrow eyes. Pip stands a short distance away at the edge of the desk, entirely still, feet level, hands loose and symmetrical at her sides, head straight, returning his look without any challenge in it, her expression mild and unbothered. The three monitors show pure soft glow with no legible content whatsoever, no windows, no panels, no text. A row of dented cans along the desk back. Exactly two figures in frame.
Interior, mid morning.
Medium two-shot from the side of the desk so the turn of Owen's shoulders reads against Pip's stillness, camera slightly below eye level, moderate depth so both faces hold.
Cold monitor light from behind Owen rimming his head and collar, dusty window light from high on the left falling on Pip.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A bald young man turns in his desk chair to look over his shoulder at a girl standing very still beside the desk, three glowing monitors behind him.

---

## Spread 6

Pages 13 to 14 | Part Two: The Bookstore That Was Always There | Words 229

### Text page (left), verbatim

Milo sat down next to Lena, careful to leave a polite distance.

“You shouldn’t be here,” he said.

“Weird thing to say to someone you invited.”

“I didn’t invite you.”

“You didn’t stop me.”

Milo almost smiled. He didn’t quite let it happen.

“The woman in the bookstore,” Lena said. “Is she real.”

“I don’t know.”

“Has this happened before. People.”

“Not like this. Buildings. A house number changed once. A road sign. We’ve seen things rewrite. We haven’t seen people rewrite.”

“So either she’s a real person whose history just got rewritten under her, or she didn’t exist this morning and now she does.”

“Yeah.”

“One of those is a lot worse than the other.”

“Yeah.”

Lena pulled the paperback out of her bag. She’d bought it because she’d felt weird leaving without buying anything. It was an old mystery novel with a cracked spine. There was a Hollow Pine receipt sticking out of the top, slightly yellowed, dated 2019.

She handed it to Milo.

“This was in the book.”

Milo turned it over. The receipt was for the same book she’d just bought. Bought by someone named M. Avery. June 14, 2019.

“This receipt is six years old.”

“Yep.”

“You bought this book three minutes ago.”

“Yep.”

Milo looked at the receipt for a long time.

“Okay,” he said. “We’re going to need help on this one.”

### Image page (right)

Slug: vol2-s06
Shot type: Character portrait
Depicts: Beat 1. Milo sitting down on the couch beside Lena, leaving a careful gap.
Spoiler check: PASS. Final beat is Milo saying they will need help. Not depicted; the receipt is not in frame and neither is speaking.

Prompt:

```
{{STYLE}}
{{CHAR:MILO}}
{{WARDROBE:MILO_A}}
{{CHAR:LENA}}
{{WARDROBE:LENA_B}}
{{LOC:WAREHOUSE_PIT}}
Two figures seated at either end of a sagging couch with a deliberate and slightly comic gap of cushion between them, both facing forward rather than at each other, a sleeping pot-bellied pig pressed against the girl's leg. Exactly two named figures in frame and no others.
Interior, early afternoon.
Medium-wide two shot, straight on and level, the empty cushion at the centre of the composition, moderate depth.
Soft high window light from above and behind, no hard shadow.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: Two teenagers sit at opposite ends of a sagging couch with a gap between them, a pig asleep against one of them.

---

## Spread 7

Pages 15 to 16 | Part Two: The Bookstore That Was Always There | Words 226

### Text page (left), verbatim

### Aunt Carol’s Kitchen

It was almost dinner when Lena walked back into Aunt Carol’s house. Aunt Carol was at the kitchen table, glasses on the end of her nose, sorting through a small box of receipts and old envelopes.

“Did you eat,” Aunt Carol said.

“Yeah. Sort of.”

“There’s leftover lasagna.”

“Maybe later.”

Lena pulled out a chair and sat down. The receipt from the bookstore was in her pocket. She took it out, set it on the table, and slid it across.

“Have you ever heard of a bookstore called Hollow Pine.”

Aunt Carol looked at the receipt. Looked at it for longer than she needed to. Took her glasses off and rubbed the bridge of her nose.

“I bought your birthday card there. Two years ago. The one with the dog on it.”

“You remember that.”

“Mm-hmm.”

“It was a vape store yesterday, Aunt Carol.”

Aunt Carol put her glasses back on. She didn’t look surprised. She didn’t look confused. She looked tired in the specific way people look when they’ve been carrying something for a long time.

“Honey. This town gives things. Just remember it always wants something back.”

“What does that mean.”

“I don’t know. Nobody knows. We just live here.”

Aunt Carol put the receipt back in her box of papers, like it belonged there, and went back to sorting.

### Image page (right)

Slug: vol2-s07
Shot type: Character portrait or close (two-shot)
Depicts: Beat 3. Lena sliding the bookstore receipt across the kitchen table, Aunt Carol looking at it for longer than she needs to.
Spoiler check: PASS. Final beat is Aunt Carol filing the receipt away into her box as though it belonged there. Not depicted; the receipt is still on the open table between them and her hands have not moved to it.

Hard constraints: Aunt Carol is not defeated and must not be drawn sad. The register is
a woman carrying something heavy competently and for a long time. Her silver-white hair
is swept up with a rust-red headscarf knotted in it. The receipt is small and its
printing is not legible.

**Reframed to be character-forward.** It was the kitchen empty, with the shoebox of
papers on the table and nobody there. Aunt Carol has a whole scene here and one of
the best lines in the arc, and until this change she had no face until Volume 4.
This is the beat where she gives away that she already knows.

Prompt:

```
{{STYLE}}
{{CHAR:LENA}}
{{WARDROBE:LENA_B}}
{{CHAR:AUNT_CAROL}}
{{WARDROBE:CAROL_A}}
{{LOC:AUNT_CAROL_KITCHEN}}
Two figures at a small kitchen table at dinner time, a shoebox of envelopes and receipts open between them. Lena sits forward with one hand still extended from pushing a small slip of paper across the tablecloth, watching the older woman's face rather than the paper, her own expression careful. Aunt Carol sits opposite, upright, looking down at the slip for a beat longer than she needs to, one hand paused flat on the table beside it, her face composed and entirely present rather than sad or surprised, giving away only that she is taking a moment she does not need. Neither is speaking. The printing on the slip of paper is not legible. A foil-covered plate pushed to one side. Exactly two figures in frame.
Interior, dusk.
Medium two-shot across the corner of the table, camera at seated eye level so both faces read and the receipt sits between them, moderate depth.
Single warm bulb hanging low over the table lighting both faces from above, the corners of the room going to dark blue.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A teenage girl pushes a small slip of paper across a kitchen table to an older woman in a cardigan, who looks down at it without touching it.

---

## Spread 8

Pages 17 to 18 | Part Two: The Bookstore That Was Always There | Words 230

### Text page (left), verbatim

### The Radio

Late that night, in her apartment above the hardware store, Vex was sitting on the floor going through her bin of broken devices.

Most of them were dead. They’d been dead for months. Old radios, busted phones, a pair of walkie-talkies that had been left in the rain, a baby monitor she’d found in a free pile. She kept them because they’d all stopped working at the same time, on the same night, six months ago. The night the patches had started.

She’d been telling herself she kept them because they were evidence.

She knew that wasn’t why.

Tonight, the radio at the bottom of the bin was making a sound.

Vex pulled it out slowly. It was a small old transistor radio with a cracked dial. She hadn’t put batteries in it. She had never put batteries in it. The battery compartment was empty and the contacts were green with corrosion.

It hummed.

She set it on the floor. She stared at it. The hum was very faint, the kind of sound you only heard if you stopped breathing for a second to listen.

Then the hum shaped itself into a word. One word. Clear. Quiet. Almost polite.

“Hello.”

Vex did not move.

The radio waited. Like it was being patient with her.

Then it went silent.

*To be continued in Part Three: Mr. Henderson’s Knee*

### Image page (right)

Slug: vol2-s08
Shot type: Object or detail
Depicts: Beat 2. The bin of devices that all died on the same night, with the transistor radio on top.
Spoiler check: PASS. Final beat is the radio saying hello and then going silent. Not depicted; the radio is inert, the battery door is open and empty, nothing is lit.

Prompt:

```
{{STYLE}}
{{LOC:VEX_APARTMENT}}
A plastic bin on a bare floor holding dead electronics, two rain-swollen walkie talkies, a cracked phone, a nursery monitor, tangled cords. Sitting on top, a small old transistor radio with a cracked tuning dial, its battery door lifted off to show an empty compartment and green corrosion on the contacts. Nothing illuminated, no indicator lights. No figures.
Interior, late night.
Close overhead shot, slight angle, shallow depth on the empty battery compartment.
One weak lamp from off to the left, the rest of the floor falling away into dark.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A bin of dead electronics on a floor with a small old transistor radio on top, its empty battery compartment open and corroded.
