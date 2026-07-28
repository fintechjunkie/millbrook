# The Patch Notes, Volume 2: Flip Book Spec

Source: `WELCOME_TO_MILLBROOK_Patch_Notes_Part_2.md`
Chapter: Part Two: The Bookstore That Was Always There
Spreads: 9 (8 text spreads plus 1 chapter opener) | Images: 9 | Words: 1961
Spec version: 1 | Date: 2026-07-28

Style, negatives, characters, locations and wardrobe states live in `PATCH_NOTES_FLIPBOOK_ROSTER.md`, which is the single source of truth for all four volumes. Do not restate any of it here and do not describe a locked character or location inline. Tokens only.

## Shot mix, this volume

Establishing 2 | Character portrait 3 | Object 2 | Action 1 | Atmospheric 1

No three consecutive spreads share a shot type. Verified.

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

The girl with the white hair walked in, sat down across from her, and slid the dashcam across the table.

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
Shot type: Character portrait
Depicts: Beat 5. Pip at the laundromat table with her hands set flat and slightly too symmetrical.
Spoiler check: PASS. Final beat is Pip's line about noticing being honest. The line is dialogue and the image carries no speech; her mouth is closed.

Prompt:

```
{{STYLE}}
{{CHAR:PIP}}
{{WARDROBE:PIP_A}}
{{LOC:LAUNDROMAT}}
Seated at a small table with both hands laid flat on the surface in a placement that is a shade too even, head level, mouth closed, gaze steady and slightly past the viewer. No drink in front of her.
Interior, nine in the morning.
Close shot, straight on at eye level, hands included at the bottom of frame, shallow depth.
Flat fluorescent overhead mixed with cold window light from the left.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A girl sits at a laundromat table with both hands laid flat and evenly on the surface, looking slightly past the viewer.

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

Prompt:

```
{{STYLE}}
{{LOC:MAPLE_AND_FOURTH_B}}
The same corner storefront, now a settled old bookshop with a navy awning, a hand-painted sign board, a window display of stacked paperbacks and small hand-lettered cards with illegible writing, a fat ginger cat asleep on a stack of cookbooks, a carved wooden sign hanging in the door glass. No figures. Composition matched as closely as possible to the volume opener, same camera position.
Exterior, mid morning.
Wide establishing shot from across the intersection, same vantage and focal length as the volume opener, deep focus.
Warm direct morning sun on the awning, deep shade under it.
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
Shot type: Character portrait
Depicts: Beat 2. The woman behind the counter looking up and smiling.
Spoiler check: PASS. Final beat is the three of them standing on the sidewalk with no answer. Not depicted; scene stays inside the shop. Her smile here is uncomplicated, the flicker belongs to the prose.

Prompt:

```
{{STYLE}}
{{CHAR:GREEN_CARDIGAN_WOMAN}}
{{WARDROBE:CARDIGAN_A}}
{{LOC:HOLLOW_PINE_INT}}
Standing behind a wooden counter, looking up from a task and smiling warmly at the viewer, reading glasses down on their chain, hands still resting on whatever she was doing.
Interior, mid morning.
Medium close shot, straight on at eye level, shallow depth so the shelves behind go soft.
Warm tungsten lamplight from above and behind, cool daylight from the shopfront off to the right.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A woman in her sixties in a green cardigan smiles from behind a wooden shop counter, reading glasses on a chain.

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
Depicts: Beat 3. Felix coming up over the back of the couch like a meerkat.
Spoiler check: PASS. Final beat is Pip naming the frequency filter on Owen's tracker. Not depicted; no monitors in frame and Pip is absent.

Prompt:

```
{{STYLE}}
{{CHAR:FELIX}}
{{WARDROBE:FELIX_A}}
{{LOC:WAREHOUSE_PIT}}
Popping suddenly upright from behind the back of a sagging couch, both hands on the cushion top, delighted and mid-word, a small gecko clinging to his shoulder.
Interior, mid morning.
Medium shot, camera at couch height so he rises into the top of frame, shallow depth.
High window light in dusty beams from the left, warm bounce off the concrete floor.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A grinning teenage boy in a floral bucket hat pops up from behind a couch with a small gecko on his shoulder.

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
Shot type: Object or detail
Depicts: Beat 2. Owen's desk after he has turned back to the keyboard and started typing fast.
Spoiler check: PASS. Final beat is Monke on the high shelf with a granola bar halfway to his mouth. Not depicted; no animal in frame and the shelves are out of shot.

Prompt:

```
{{STYLE}}
{{LOC:WAREHOUSE_TERMINALS}}
A close view across a keyboard and desk edge, a row of dented energy drink cans lined up along the back, cables spilling off the near side, monitor bezels at the top of frame with the screens rendered as pure glow and no legible content. No figures, only a blurred forearm leaving frame at the far edge.
Interior, mid morning.
Close shot, camera low and level with the desk surface, very shallow depth on the nearest can.
Cold screen light from above and behind the objects, long shadows pulled toward the viewer.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A close view along a desk edge past a row of energy drink cans toward the glow of unreadable monitors.

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
Shot type: Atmospheric or empty
Depicts: Beat 1. The kitchen at dinner time, the small box of papers already open on the table.
Spoiler check: PASS. Final beat is Aunt Carol filing the receipt away as though it belongs there. Not depicted; no hands, no receipt, no figures.

Prompt:

```
{{STYLE}}
{{LOC:AUNT_CAROL_KITCHEN}}
A worn kitchen table with a shoebox of envelopes and receipts open on it, one chair pulled out and empty, a pair of reading glasses folded on the tablecloth, a plate covered with foil pushed to one side. No figures present.
Interior, dusk.
Medium-wide shot from the doorway, slightly high angle, deep focus.
Single warm bulb hanging low over the table, the corners of the room going to dark blue.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A kitchen table under a low hanging bulb with an open shoebox of papers, folded reading glasses, and an empty pulled-out chair.

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
