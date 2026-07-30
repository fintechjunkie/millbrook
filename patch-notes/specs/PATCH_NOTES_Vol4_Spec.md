# The Patch, Volume 4: Flip Book Spec

Source: `WELCOME_TO_MILLBROOK_Patch_Notes_Part_4.md`
Chapter: Part Four: The Press Conference
Spreads: 10 (9 text spreads plus 1 chapter opener) | Images: 10 | Words: 2082
Spec version: 1 | Date: 2026-07-28

Style, negatives, characters, locations and wardrobe states live in `PATCH_NOTES_FLIPBOOK_ROSTER.md`, which is the single source of truth for all four volumes. Do not restate any of it here and do not describe a locked character or location inline. Tokens only.

## Shot mix, this volume

Establishing 2 | Character portrait 6 | Object 1 | Action 2 | Atmospheric 0

**Atmospheric drops to zero, and that fixes an arithmetic error rather than creating one.**
The declared tally has said "Action 2" for some time while only one action plate existed, so
it summed to one more than the volume actually held. Re-pointing the closing plate from the
empty counter to Monke at the drawer makes it a genuine action shot, which brings the count
to a real 2 and the tally back into agreement with the eleven images.

No three consecutive spreads share a shot type. Verified after the reframes below.

**Eleven images now, not ten.** Spread 7 was the fullest page in the arc after the Volume 2
split, at 99.3 per cent of its column. It was cut after the second of the two identical
"Okay." lines, the one answering "Don’t make it weird" — 445 and 291 pixels of content. The
new spread 8 carries the arc closing into a complete circle, the two "Tomorrow" lines and
Lena recording The Real Feed.

The new plate is a portrait, which puts it next to the existing portrait on the spread now
numbered 9. That is a pair and the rule forbids three, so the mix still holds — but it is the
tightest the sequence gets in this volume and is worth knowing before a twelfth image is ever
added here.

## Rebuilt character-forward, 2026-07-29

Volume 4 arrived the thinnest of the four on faces: four named figures across ten plates,
with five plates carrying nobody at all. That is the wrong shape for the volume where the
arc pays off, and it left three of the arc's best scenes illustrated by furniture.

Three reframes, all on the same principle used in Volume 3 — spend the plate on the scene
the page is actually about:

| Spread | Was | Now |
|---|---|---|
| 2 | The countdown device alone on a bench | **Felix presenting it, tired and delighted, with Pip silent in the corner behind him** |
| 3 | A passing child on a bicycle, Lena and Pip cropped out and out of focus | **Lena and Pip on the kerb, both faces clear, the child demoted to the background** |
| 8 | The empty hotel room the last view came from | **The woman in the green cardigan on a phone with no buttons, at three in the morning** |

Spread 3 was the worst of the three and the clearest to call. Its page is the conversation
where Pip admits the thing in the walls talks to her and that she has not told it whose side
she is on. The image threw both speakers out of focus to hold a passing extra sharp.

**Spread 7 was deliberately left as an object study.** *Owen moved his energy drink cans to
make room* is the most eloquent line in the volume and it is wordless acceptance — a face
would explain it and spoil it. It is also now the volume's only object plate, which is the
right one to keep.

**Spreads 4 and 9 also stay unpeopled, for different reasons.** Spread 4 is the crowd filling
the square, where the crowd is the subject. Spread 9 is protected by the guardrail in Monke's
roster block: he is absent from the arc's final image although he is the subject of its last
paragraph, and the drawer must be shut.

**Whole-set consequence.** These three trade one object and one atmospheric for three
portraits, which pushes the set further from Part C3's bands in the same direction Volumes 1
and 3 already did. The recommendation in Volume 1's spec stands: re-set the bands to what a
character-forward book wants rather than keep logging exceptions. Still the author's call.

---

## Spread 0, chapter opener

Renders differently: one full bleed image across both pages with the chapter title set over it. No prose on this spread.

### Title block (typeset over the image, not generated into it)

# WELCOME TO MILLBROOK

*A Digital Slop Story*

## The Patch

### Part Four: The Press Conference

### Image, full bleed across both pages

Slug: vol4-opener
Shot type: Establishing (full bleed, both pages)
Depicts: The square being set up. No story beat.
Spoiler check: PASS. Chapter opener precedes all prose. Empty of people, so it gives away nothing about the conference itself.

Prompt:

```
{{STYLE}}
{{LOC:TOWN_HALL_SQUARE}}
Rows of empty folding chairs set out in front of a bare podium, a large banner rigged behind the stage but seen almost edge on so that no lettering is legible. No figures anywhere.
Exterior, early morning before the event.
Wide establishing shot from behind the last row of chairs, low camera, deep focus.
Cool flat early light, long chair shadows raking across the paving.
{{NEGATIVE}}
Aspect ratio: 2:1
```

Alt text: Rows of empty folding chairs face a bare podium in a town square early in the morning, a banner rigged edge-on behind.

---

## Spread 1

Pages 3 to 4 | Part Four: The Press Conference | Words 263

### Text page (left), verbatim

### The Renaissance

Mayor Dalton announced a town hall for Friday afternoon. He called it the Millbrook Renaissance and he had a banner made. The banner had a serif font, a leaf motif and the kind of color palette a city council pays a graphic designer eight thousand dollars for.

Reporters were coming, real ones from outside Millbrook. A station out of the city had picked up the story of the medical patches and decided it was a feel-good piece for sweeps week. The Mayor had agreed to a live segment. He had bought a new tie.

Lena watched the announcement on her aunt’s TV. Aunt Carol watched it from the kitchen, drying a dish she had already dried twice.

“He’s going to mess this up,” Lena said.

“He’s going to take credit for it,” Aunt Carol said. “Same thing.”

“It’s not the same thing.”

“In this town, honey, it kind of is.”

Lena’s phone buzzed. Group chat. Milo.

Warehouse. Now. Crane is in town.

### Crane

Owen had a face on the middle monitor: an older man in a navy uniform with a row of medals and a medical mask covering most of his face. The image was grainy because Owen had pulled it from a security camera at the Hartwell Inn, where Crane had checked in this morning under a name that was almost certainly fake.

“Admiral Crane,” Milo said. “He’s here. Today.”

“When does he leave,” Vex said.

“He doesn’t. He’s in town for the press conference.”

“Why.”

“Because whatever’s pushing the patches is finishing the circle today,” Felix said.

### Image page (right)

Slug: vol4-s01
Shot type: Character portrait
Depicts: Beat 3. Lena and her aunt watching the announcement from two different rooms.
Spoiler check: PASS. Final beat is Felix saying the circle finishes today. Not depicted; the scene never leaves the house and no phone is in hand.

Hard constraints: Aunt Carol is TALL, upright and lean, matching her canonical sheet: no softness at the jaw, no heaviness through the body. She is not a stout or matronly older woman. Her rust-red headscarf is tied as a band across the front of the hairline with its knotted ends trailing behind her left ear, and the single long brass drop earring hangs from that ear.

Prompt:

```
{{STYLE}}
{{CHAR:LENA}}
{{WARDROBE:LENA_D}}
{{CHAR:AUNT_CAROL}}
{{WARDROBE:CAROL_A}}
{{LOC:AUNT_CAROL_LIVING_ROOM}}
A girl sitting forward on the edge of a couch watching an unseen television off frame, and behind her in the kitchen doorway an older woman standing with a plate and a dish towel, drying a plate that is already dry, watching the same unseen screen. Neither looks at the other. Exactly two named figures in frame and no others. Television not in shot.
Interior, late morning.
Medium-wide two shot from beside the television, camera at seated height, moderate depth so both planes read.
Hard flickering screen light from off frame left as the key, warm kitchen light behind the older woman, the room between them dim.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A girl sits forward on a couch watching an unseen television while an older woman dries a plate in the kitchen doorway behind her.

---

## Spread 2

Pages 5 to 6 | Part Four: The Press Conference | Words 168

Short page, deliberate. Lands on Pip naming the Mayor. The hardest hook in the four volumes and it should sit alone at the bottom of a short page.

### Text page (left), verbatim

Everyone looked at him. Felix had been at his bench for twelve hours and he had a small device in his hand that looked like a kitchen timer crossed with a smoke detector. He looked tired in the specific way Felix looked tired, which was happy.

“I built a thing,” he said. “It counts down to the next patch. It’s tracking the rhythm. The patches are speeding up. There’s a big one coming today. Two thirty-eight PM, give or take a minute.”

“The press conference starts at two thirty,” Lena said.

“The press conference starts at two thirty.”

Pip had been very quiet all morning. She was sitting on Owen’s spare chair, which she had pulled into the corner. She had not said anything in three hours.

“Pip,” Milo said.

“Yes.”

“Is the next patch a person.”

Pip looked at the floor. Then she looked at Vex. Then she looked at Lena. Then, because she had to, she looked at Milo.

“I think it’s the Mayor,” she said.

### Image page (right)

Slug: vol4-s02
Shot type: Character portrait
Depicts: Beat 2. Felix showing the countdown device he has just spent twelve hours building, with Pip silent in the corner behind him.
Spoiler check: PASS. Final beat is Pip naming the Mayor as the next patch. Not depicted; her mouth is closed, she is looking at the floor rather than at anybody, nothing in the frame refers to the Mayor, and the device shows no readable numerals.

Hard constraints: The device shows NO legible numerals or characters of any kind on its
display; it is a dark panel. Felix reads TIRED AND DELIGHTED at the same time, not merely
cheerful and not sad. Pip is behind him and OUT OF THE CONVERSATION: seated, hands
symmetrical, looking at the floor, unnaturally still, her expression closed rather than
sad. Exactly two figures. Felix has a short upright black afro, round red-framed glasses
with clear lenses and a faded teal work jacket.

**Reframed to be character-forward.** It was the device alone on a bench. Felix has had one
image in the entire arc, this is his moment in it, and an object cannot be tired and happy
at the same time, which is the thing the prose says about him.

Putting Pip in the same frame is the real gain. The page is Felix's triumph and Pip's dread
happening in one room, and the reader is meant to notice her silence before it is
explained. A wide two-shot delivers that in a glance; two separate images could not.

Prompt:

```
{{STYLE}}
{{CHAR:FELIX}}
{{WARDROBE:FELIX_A}}
{{CHAR:PIP}}
{{WARDROBE:PIP_A}}
{{LOC:WAREHOUSE_SHOP}}
A teenage boy standing at a scarred workbench holding a handmade device up in front of him in both hands, presenting it to people out of frame rather than looking at it himself. The device is roughly the size and shape of a kitchen timer crossed with a smoke detector, hand-cut casing, exposed wire loops, a small dark display panel with no legible characters on it. His shoulders are down and his eyes are heavy but he is plainly delighted, the specific tiredness of somebody who has been up all night on purpose. Solder spool, cutters and a cold half-drunk mug on the bench beside him. Behind him and to one side, a robot girl sits on a plain spare chair pulled into the corner, feet level, hands loose and symmetrical in her lap, head tipped down, looking at the floor and not at him, entirely still and entirely closed off. Exactly two figures in frame.
Interior, morning.
Wide medium shot from the side of the bench so both figures read at once, camera at chest height, moderate depth so the boy is sharp and the seated girl behind him stays clearly legible.
Single clamp lamp from the upper left picking out the device and his face, the corner behind her falling into cooler shadow but never to black, dust visible in the beam.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A tired but delighted teenage boy holds up a handmade device at a workbench while a robot girl sits silently in the corner behind him, looking at the floor.

---

## Spread 3

Pages 7 to 8 | Part Four: The Press Conference | Words 287

### Text page (left), verbatim

### The Conversation On The Curb

Lena needed air. She walked outside the Warehouse and sat on the curb. After a minute, Pip came out and sat next to her, the slightly-too-still way Pip did everything.

“Are you helping them or helping us,” Lena said.

Pip didn’t pretend not to know what she meant.

“I don’t know yet,” she said. “But I want to be helping you.”

“What does that mean.”

“It means somebody made me. I don’t remember who. I came online about a year ago in an empty house on Larkspur and I knew how to read and I knew the names of three people in this town and one of them was Vex. I went to her. She didn’t freak out. So I stayed.”

“Okay.”

“The thing pushing the patches talks to me sometimes. It started a month ago. It uses the wires in the walls. It thinks I’m on its team. I have not told it I’m not.”

“Why.”

“Because if I tell it, it stops talking, and then I don’t know what it’s doing. And right now I am the only one who knows what it’s doing.”

Lena took a long breath. Across the street, a kid on a bike rode past with a backpack that was too big for him. The kid waved. Pip waved back. Pip’s wave was a little late.

“Is it good or bad,” Lena said.

“It doesn’t know. It thinks it’s helping. It’s not, all the way. The man on the porch is happy. The girl on the couch is not. It can’t tell the difference yet. I’m trying to teach it.”

“You’re trying to teach it.”

“Someone has to.”

Lena thought about that for a while.

### Image page (right)

Slug: vol4-s03
Shot type: Character portrait or close (two-shot)
Depicts: Beat 4. Lena and Pip on the kerb outside the Warehouse, mid-conversation, as the kid on the bike goes past behind them.
Spoiler check: PASS. Final beat is Lena sitting with what Pip has told her. Not depicted; they are still talking, both are turned toward each other rather than staring away, and nothing in the frame carries the content of what Pip has admitted.

Hard constraints: EXACTLY TWO NAMED FIGURES, Lena and Pip, seated side by side on the kerb,
and BOTH FACES CLEARLY VISIBLE. The child on the bicycle is a third figure but he is small,
far back across the road, seen from behind, and HIS FACE IS NOT VISIBLE and not a focal
point; he must not read as a portrait. Pip sits a shade too level and too symmetrical
beside the slouch of the other girl, and that contrast is the picture. Pip's seams are
clearly visible at the jaw, neck and at least two limb joints.

**Reframed to be character-forward.** It was the child on the bike, with Lena and Pip
cropped out of frame and thrown out of focus. That inverted the page. This is the
conversation where Pip admits the thing in the walls talks to her and that she has not told
it whose side she is on, and it is one of the two or three most important scenes in the arc.
Spending its only image on a passing extra was the wrong call.

The kid stays, small and in the background, because he is what the scene is doing while they
talk and because Pip's late wave is the whole of her in one gesture. He is demoted rather
than deleted.

Prompt:

```
{{STYLE}}
{{CHAR:LENA}}
{{WARDROBE:LENA_D}}
{{CHAR:PIP}}
{{WARDROBE:PIP_A}}
{{LOC:WAREHOUSE_EXT}}
Two eighteen year old girls sitting side by side on a concrete kerb outside a low brick industrial building, turned slightly toward each other, mid-conversation. The one on the left sits the way a tired person sits, elbows on her knees, shoulders rounded, hands loose, looking sideways at the other with a careful searching expression. The one on the right is a robot and sits noticeably too level and too symmetrical, back straight, both feet flat and side by side, hands placed identically on her knees, meeting the other girl's look without any defensiveness in it; one of her hands has just begun to lift in a small wave, a beat later than it should have. Far back across the road behind them, small in the frame, a young child rides a bicycle past with a backpack much too large for him, one hand off the bars, seen from behind so his face is not visible. He is a background detail and not a subject. Exactly two named figures in the foreground.
Exterior, early afternoon.
Medium two-shot from across the pavement, camera low at seated height so their faces read against the wall behind them, moderate depth so both faces stay sharp and the child behind softens without disappearing.
High hard afternoon sun from the front right, short crisp shadows on the asphalt, both faces in clear light with neither in shadow.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: Two teenage girls sit side by side on a kerb outside a brick building, talking, one slouched and one sitting unnaturally straight, while a child on a bicycle rides past in the distance.

---

## Spread 4

Pages 9 to 10 | Part Four: The Press Conference | Words 212

### Text page (left), verbatim

“Okay,” she said. “When this is over, you’re telling Milo what you told me.”

“Okay.”

“And if it asks you to do something to one of us, you’re going to say no.”

“Yes.”

“Out loud. Promise me.”

“I promise.”

### The Square

By two fifteen, the square in front of Town Hall had a banner, a podium, and forty people in folding chairs. Mr. Henderson was in the front row. Cassie was in the second row with her mother, headphones on, holding a piece of paper Vex had written for her that said “BLINK ONCE FOR YES.” The Mayor was doing a sound check. He was wearing the new tie.

Admiral Crane stood at the side of the stage with his mask on and his hands behind his back. Watching.

Lena set up her tripod near the back. Felix had given her his countdown device and it was in her bag. She didn’t need it. She had a watch.

Milo and Owen worked the crowd from opposite sides, pretending to be ordinary kids. Vex stayed with Cassie. Felix was somewhere with a backpack of things that sparked. Pip was on a bench across the square, head tilted, listening.

At two twenty-six, Crane walked across the stage and stopped in front of Lena.

### Image page (right)

Slug: vol4-s04b
Shot type: Establishing or location (now with two named figures on the stage)
Depicts: Beats 1 and 2. The square at quarter past two with the chairs filled, the Mayor at the podium doing his sound check in the new tie, and Crane standing at the side of the stage with his mask on and his hands behind his back, watching.
Spoiler check: PASS, and the previous version of this check was over-cautious. It said no uniformed figure may be present, but Crane standing at the side of the stage IS beat 2 of this page, so showing him gives nothing away. What must stay out is the FINAL beat — Crane crossing the stage to stop in front of Lena — and it does: he is still at the side of the stage, Lena is not in frame, and her tripod stands unattended.

Prompt:

```
{{STYLE}}
{{CHAR:MAYOR_DALTON}}
{{WARDROBE:MAYOR_B}}
{{CHAR:ADMIRAL_CRANE}}
{{WARDROBE:CRANE_A}}
{{LOC:TOWN_HALL_SQUARE}}
Around forty people in folding chairs seen from behind, filling most of the paved square, facing a low stage in front of the town hall doors. On the stage a heavyset man in an ill-fitting purple suit and a bright new tie leans into a microphone at a wooden podium, mid sound check, wearing red-lensed glasses. A few steps to his side an older officer in navy dress uniform with full medals stands squared up and still, a pale blue medical mask over the lower half of his face, hands behind his back, watching the crowd rather than the Mayor. In the near foreground a camera tripod stands unattended. Every seated figure is distant, backs turned, no faces legible. Exactly two named figures, both on the stage.
Exterior, early afternoon.
Wide establishing shot from behind the back row, camera at standing height, deep focus so both figures on the stage read clearly despite their size.
Flat bright afternoon daylight, chairs and heads throwing short shadows forward, everything legible.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: Forty people seen from behind in folding chairs facing a stage where a man in a purple suit speaks into a microphone and a uniformed officer stands watching.

**Retired 2026-07-29: the earlier plate for this page.** It was `vol4-s04.png`, the same wide
shot with an empty stage and nobody named in it. Replaced on the standing character-forward
instruction: this page had two named figures standing on a stage in the prose and a plate with
nobody in it, and it was the third such plate in this volume. The file is still in
`public/images/` and its prompt body was:

```
{{STYLE}}
{{LOC:TOWN_HALL_SQUARE}}
Around forty people in folding chairs seen from behind, an unoccupied podium and stage beyond them, a rigged banner turned so its lettering is not legible. In the near foreground a camera tripod, unattended. All seated figures are distant, backs turned, no faces legible.
Exterior, early afternoon.
Wide establishing shot from behind the back row, camera at standing height, deep focus.
Hard high sun, chairs and heads throwing short shadows forward.
```

---

## Spread 5

Pages 11 to 12 | Part Four: The Press Conference | Words 212

### Text page (left), verbatim

“Ms. Marsh.”

Lena did not pretend not to know him.

“Admiral.”

“You’re building something interesting. The footage. The pattern work. The way you’ve organized your subscribers.”

“I have three hundred and forty-one subscribers, Admiral.”

“I’m not talking about subscribers. I’m talking about the way you see things.”

He held out a card, white, heavy stock, with a phone number on it. Nothing else.

“When you’re tired of playing journalist, I have real work for someone with your skills. We’re hiring people who can pay attention. Most people can’t.”

Lena took the card. She didn’t say yes. She didn’t say no. Crane nodded once, like she had answered something, and walked back to the stage.

Lena put the card in her pocket. Her hand was shaking slightly. She made it stop.

### Two Thirty-Eight

“My fellow citizens of Millbrook,” the Mayor said. “It is my honor to welcome you to a new chapter for our town. The past two weeks have seen extraordinary improvements. A repaired infrastructure. A new local business. Eleven of our neighbors restored to health. I want to be very clear. These changes did not happen by accident. They happened because of the leadership of this office, the dedication of our staff, and a strategic plan that I have personally—”

### Image page (right)

Slug: vol4-s05b
Shot type: Character portrait or close (two-shot, with a third figure at distance)
Depicts: Beat 1. Crane having crossed the stage and stopped in front of Lena at her tripod, before anything is offered.
Spoiler check: PASS. Final beat is the Mayor's speech breaking off mid-sentence. He is in frame now, but at the sound check and far from that moment, and nothing has gone wrong yet. No card is in frame or in either hand, which is the other half of this page and the reason the shot is specified as before anything is offered.

Hard constraints: Lena’s hair is gathered into one large uneven ponytail high at the BACK of her head, reading as a distinct heavy mass behind the crown rather than an evenly spiky halo, and never split into two or tied at the side. Crane keeps the pale blue medical mask ON over the lower half of his face; it is never removed and never below the nose. No card, paper or object is held or offered by anyone. The Mayor is small and distant and never a second portrait.

**Deviation, deliberate: three named characters.** Part C4 sets a ceiling of two, and this is
the pattern C4 itself sanctions for a larger scene — the two who matter are sharp in the
foreground and the third is small and soft behind them. It also gives Mayor Dalton his only
appearance in the volume he is the subject of. All three canonical references are attached.

**Why this replaced a solo portrait.** It stages the beat instead of illustrating a character.
Crane crossed the stage to reach her, and the tripod standing between them is exactly what he
has come to talk about. It also fixes the geography: the prose puts him on the stage and Lena
at the back, and the old plate showed neither.

Prompt:

```
{{STYLE}}
{{CHAR:LENA}}
{{WARDROBE:LENA_D}}
{{CHAR:MAYOR_DALTON}}
{{WARDROBE:MAYOR_B}}
{{CHAR:ADMIRAL_CRANE}}
{{WARDROBE:CRANE_A}}
{{LOC:TOWN_HALL_SQUARE}}
Two figures facing each other at the back of a filling town square, a camera tripod standing between them so that it divides the frame. Crane stands on the left, squared up and unhurried, hands low and still, weight even, his pale blue medical mask covering the lower half of his face so that only his eyes carry the expression, and they are measuring her rather than greeting her. He is slightly the taller. Lena stands on the right with one hand resting on the tripod as though she has been interrupted mid-adjustment, her body angled toward her camera but her face turned fully to him, chin up, wary and interested at once. Neither is holding anything out and no card, paper or object passes between them. Behind and beyond them, smaller and softer, a low stage carries a podium where a heavyset man in an ill-fitting purple suit and a bright new tie leans into a microphone doing a sound check. Rows of folding chairs, occupied by anonymous unnamed townspeople seen from behind, fill the ground between the two foreground figures and the stage. Exactly three named figures: the two in front, sharp, and the one on the stage, small.
Exterior, mid-afternoon, twenty-six minutes past two.
Medium two-shot at standing eye level, framed so the tripod sits between them and the stage recedes on the axis between their heads, deep enough focus that the stage still reads as a place while staying clearly softer than the foreground.
Flat bright overcast afternoon daylight, no dramatic shadow, both faces fully legible, the distant stage a touch hazier.
```

Alt text: A uniformed officer in a medical mask and a red-haired girl stand either side of her camera tripod at the back of a crowded square, a man speaking at a podium behind them.

**Retired 2026-07-29: the earlier plate for this page.** It was `vol4-s05.png`, a solo portrait
of Crane against the crowd. The file is still in `public/images/` and its prompt body was:

```
{{STYLE}}
{{CHAR:ADMIRAL_CRANE}}
{{WARDROBE:CRANE_A}}
{{LOC:TOWN_HALL_SQUARE}}
Standing squared up and still with both hands clasped behind his back, chin level, the visible skin around the eyes calm and tired. Empty handed. Alone in frame.
Exterior, early afternoon.
Medium close shot, straight on at eye level, very shallow depth so the crowd behind reduces to soft shapes.
Hard overhead sun, sharp shadow under the brow and along the jaw, medals catching hard specular points.
{{NEGATIVE}}
Aspect ratio: 3:2
```

---

## Spread 6

Pages 13 to 14 | Part Four: The Press Conference | Words 281

### Text page (left), verbatim

Felix’s timer in Lena’s pocket beeped, very softly, and stopped.

Two thirty-eight.

Mayor Dalton kept talking, but his voice changed.

“I didn’t do any of this,” he said.

Several people in the front row looked up. The reporter from the city station, who had been checking her phone, lowered it slowly.

“I didn’t fix the pothole,” the Mayor said. His voice was the same volume. His face was wrong. “I didn’t open the bookstore. I didn’t fix Mr. Henderson’s knee. I don’t know what is happening in this town. I’m scared. I’ve been scared for years. I am scared right now.”

The square went quiet. Even the wind.

“My wife knows. My wife knows that something is wrong here and she doesn’t want to leave because her mother is buried at Saint Anne’s and we can’t take her with us. So we stay. So I keep saying things on television. I am sorry. I am so sorry.”

Mr. Henderson stood up from the front row. Slowly, the way an old man stands up, except his knee was fine.

“It’s all right, Tom,” Mr. Henderson said.

The Mayor blinked at him.

And then it ended. Whatever it was. The Mayor’s face came back together. He looked around the square like he had forgotten where he was. Then his grin returned, the practiced one, like a switch had been flipped.

“with a strategic plan I have personally championed,” he finished. “Thank you all for being here today.”

The crowd clapped. Most of them. Some of them did not. The reporter from the city station was looking at her camera operator with an expression that Lena was going to remember for a long time.

### Image page (right)

Slug: vol4-s06
Shot type: Action moment
Depicts: Beat 6. Mr. Henderson getting up out of the front row.
Spoiler check: PASS. Final beat is the city reporter's expression. Not depicted; the reporter and her camera operator are not in frame.

Prompt:

```
{{STYLE}}
{{CHAR:MR_HENDERSON}}
{{WARDROBE:HENDERSON_B}}
{{LOC:TOWN_HALL_SQUARE}}
An old man rising out of a folding chair in the front row, one hand on the chair back, most of the way up, looking toward the stage off frame. Surrounding seated figures are turned away and thrown out of focus, no other face legible.
Exterior, early afternoon.
Medium shot from the side along the front row, camera at seated height, shallow depth.
Hard high sun from behind the stage, the man rim lit, his front in bounced fill off the paving.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: An elderly man rises out of a folding chair in the front row of an outdoor audience, one hand on the chair back.

---

## Spread 7

Pages 15 to 16 | Part Four: The Press Conference | Words 177

### Text page (left), verbatim

Admiral Crane was looking at Pip.

### The Warehouse, That Night

They moved Vex’s broken devices into the Warehouse, and Pip’s things from the empty house on Larkspur. They cleared out a corner near the back wall and Lena put a small desk there with her laptop on it, near Owen’s setup. Owen did not say anything. He moved his energy drink cans to make room.

Cassie went home with her mother. Cassie was going to be okay. Cassie was going to be different, but okay. Vex was going to check on her every day for the rest of her life, and Cassie was going to let her.

Pip told Milo everything she had told Lena. Milo listened without interrupting. When she was done, he was quiet for a long time.

“You should have told us sooner,” he said.

“I know.”

“You’re going to keep telling us. Every conversation. Every time it talks to you. I want to know.”

“Okay.”

“Welcome to the team, Pip.”

Pip looked at the floor. “Thank you.”

“Don’t make it weird.”

“Okay.”

### Image page (right)

Slug: vol4-s07
Shot type: Object or detail
Depicts: Beat 3. Room made in the corner. Owen's cans moved without comment.
Spoiler check: PASS. Final beat is Lena's recorded line about not asking permission. Not depicted; no figures, no camera, nothing recording.

Hard constraints: BRIGHT ENOUGH TO READ CLEARLY. The purple brick of the wall behind the desk
must read as purple, the cans must read as individually dented, and the grain of the desk must
be visible. This is a night scene but it is NOT a dark image and nothing in it falls to
featureless black. See the warehouse lighting floor in section 6.1a of the roster.

Prompt:

```
{{STYLE}}
{{LOC:WAREHOUSE_TERMINALS}}
A cleared corner of desk where a row of dented energy drink cans has been pushed tightly to one side to open a rectangle of bare surface, a small closed laptop set down in the new space, a cable already run to it along the wall. No figures.
Interior, night.
Close shot, camera low and level with the desk, shallow depth on the gap between the cans and the laptop.
Night, but not murky, and lit from three directions so nothing is lost. A warm desk lamp just out of frame to the left is the key and falls fully across the cans, the laptop and the bare desk surface. Cold monitor spill from the right separates the cans from the wall behind them. A soft ambient fill lifts the whole frame so the purple brick reads as purple and the shadows stay warm and detailed rather than going to black.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: Dented energy drink cans pushed tightly to one side of a desk to make room for a small closed laptop.

---

## Spread 8

Pages 17 to 18 | Part Four: The Press Conference | Words 145

### Text page (left), verbatim

Owen’s map glowed on the middle monitor. The arc was a complete circle now. The patch on the Mayor had finished it. The center was the old elementary school, a six-acre rectangle of fenced-off ground that nobody had walked on since the Event.

“Tomorrow,” Milo said.

“Tomorrow,” Owen agreed.

Lena recorded a video that night. Just her, on the Warehouse couch with the pig asleep next to her, the camera on her phone propped against a coffee mug.

“This is The Real Feed. There are things happening in this town. Some of them are good. Some of them are not. The man we elected is not telling the truth, and there is a man in a uniform who is not telling the truth either, and I don’t know yet what either of them is hiding. But I’m going to find out. I’m not asking permission.”

### Image page (right)

Slug: vol4-s07b
Shot type: Character portrait
Depicts: Beat 4. Lena recording the closing video on the Warehouse couch late at night, the pig asleep against her hip.
Spoiler check: PASS. Nothing in frame beyond her, the pig and the couch. The completed circle and the school at its centre are both named on this page and neither is depicted; both are public knowledge from Volume 3 spread 4 anyway.

Hard constraints: Lena’s hair is gathered into one large uneven ponytail high at the BACK of her head, reading as a distinct heavy mass behind the crown rather than an evenly spiky halo, and it is never split into two or tied at the side. The phone screen shows no text, no interface and no image.

**Why this plate exists.** Lena is a broadcaster and across four volumes the book had
never once shown her broadcasting, which is a strange gap given it is the shape of her
whole arc. It is also the first plate to use a screen as the key light on a single face,
and the first proper appearance of the pig.

**This split also un-breaks a beat.** Lena’s video used to start at the foot of spread 7
and continue on spread 8, so the page turn fell in the middle of her speaking to camera.
It now opens this spread and finishes on the next, which is a turn between sentences
rather than through one.

Prompt:

```
{{STYLE}}
{{CHAR:LENA}}
{{WARDROBE:LENA_D}}
{{CHAR:PIG}}
{{LOC:WAREHOUSE_PIT}}
A girl sitting cross-legged on a worn couch late at night, talking directly into a phone that is propped up against a coffee mug on a low table in front of her. She leans slightly forward, caught mid-sentence, one hand open in front of her, and her expression is set and certain rather than nervous or performing. Her clothes are visibly creased and slept in. A small pot-bellied pig is asleep against her hip, completely relaxed, one ear flopped. The phone screen throws the main light up onto her face from below. Behind her the rest of the warehouse falls away into soft shadow with a few small equipment lights in it. Exactly one person and one animal in frame.
Interior, late night.
Medium shot from just behind and beside the phone, so the viewer sits roughly where her audience does, camera at seated eye level.
Low-key but never murky. The phone is the key light and it is bright enough that her features and the colour of her clothing read fully, with a warm secondary source keeping the couch, the pig and the near wall clearly visible. A dark mood and a readable image at the same time.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A girl sits cross-legged on a couch at night talking to a phone propped against a mug, a small pig asleep beside her.

---

## Spread 9

Pages 19 to 20 | Part Four: The Press Conference | Words 226

### Text page (left), verbatim

She paused. She almost cut the recording. She didn’t.

“If you’re watching this and you live in Millbrook, you already know. You’ve known for a long time. It’s okay to say it now.”

She posted it. By morning, it had four thousand views.

By morning, two of the views were from inside Town Hall.

By morning, one of the views was from a hotel room with a navy uniform hanging in the closet.

### Hollow Pine, Three AM

The bookstore was closed. The lights were on.

The woman in the green cardigan stood behind the counter with a cordless phone in her hand. The phone had no buttons and no cord. It glowed faintly at the bottom, a soft pale color that did not match any color the human eye usually sees.

She listened for a long time.

Then she said, “Yes. They’ve started working together. Just like you said they would.”

She listened again.

“The robot is a problem. She’s talking to them now. I can hear her.”

Another pause.

“No. I won’t. You said I wouldn’t have to and I’m holding you to that. I like it here. I like the cake.”

She set the phone down on the counter. The glow faded.

She looked up, through the window, at the empty street. There was nobody there. There was no reason to look up.

### Image page (right)

Slug: vol4-s08
Shot type: Character portrait
Depicts: Beat 7. The woman in the green cardigan behind her counter at three in the morning, listening to the phone that has no buttons and no cord.
Spoiler check: PASS, and it is a narrow pass worth stating. The final beat is her looking up through the window at an empty street for no reason. NOT depicted: she is looking down at the counter, the window is behind her and out of the frame, and she is mid-listen rather than finished. The drawer the phone ends up in is also not in frame, which keeps Spread 9 intact.

Hard constraints: THE PHONE HAS NO BUTTONS, NO KEYPAD, NO SCREEN AND NO CORD. It is a plain
smooth handset-shaped object, and the ONLY light it emits is a soft glow at its lower end.
She is LISTENING, not speaking: mouth closed, head slightly inclined, eyes down. She is NOT
looking up and NOT looking at the window. No window is visible. No animal anywhere in the
frame and the high shelf above the cookbooks is out of shot. The shop is closed but every
lamp is on. Her green cardigan has ONE button, the third from the top, in a slightly
different green from the rest.

**Reframed, and this is the biggest single upgrade available in Volume 4.** It was the empty
hotel room the last view came from. That image is fine and the sentence behind it is good,
but it is the fourth unpeopled plate in a ten-plate volume and it spends the arc's
cliffhanger on furniture.

The page contains the reveal that the pleasant woman who has been selling books since
Volume 2 is reporting on the children to something that is not a person. Putting her on the
page, lit, calm, unbothered, holding an object that should not exist, is the image that
makes a reader turn back through the book. She has had no plate in the arc until now.

**The trade, stated rather than hidden.** This retires the Crane thread's second image;
Admiral Crane now appears once, at Spread 5. The displaced hotel-room prompt is written and
spoiler-checked above and can be recovered if a later pass wants it.

**Why the glow is specified so tightly.** The prose says the light is *a soft pale color that
did not match any color the human eye usually sees*, which no prompt can literally deliver.
Asking for one small soft glow and forbidding every ordinary phone feature gets closer than
asking for an impossible colour, because what unsettles is the absence of buttons rather than
the hue.

Prompt:

```
{{STYLE}}
{{CHAR:GREEN_CARDIGAN_WOMAN}}
{{WARDROBE:CARDIGAN_A}}
{{LOC:HOLLOW_PINE_INT}}
A woman of about sixty standing behind the wooden counter of a closed second-hand bookshop in the middle of the night, holding a smooth handset-shaped object to her ear with one hand. The object has no buttons, no keypad, no screen and no cord, and a soft pale glow comes from its lower end and lights the underside of her jaw and her hand. Her other hand rests flat and relaxed on the counter. She is listening rather than speaking: mouth closed, head inclined a little, eyes lowered to the counter in front of her. Her expression is calm and faintly pleasant, entirely untroubled, the face of somebody receiving ordinary instructions. Every lamp in the shop is lit and there is nobody else in the room. No window is visible in the frame, no high shelf is visible, and there is no animal anywhere.
Interior, three in the morning.
Medium shot from in front of the counter, camera at chest height and slightly to one side, moderate depth so her face and the object both read and the shelving behind her stays legible.
Warm lamplight through the shop from behind and above her, plus the small cold pale glow of the object under her jaw, the two sources meeting on her face and not agreeing with each other.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A woman in a green cardigan stands behind the counter of a lit but closed bookshop at night, listening to a smooth handset with no buttons that glows faintly at one end.

---

## Spread 10

Pages 21 to 22 | Part Four: The Press Conference | Words 122

Short page, deliberate. Deliberate coda spread. The last text page of the arc is short on purpose so the closing image carries the turn out of the book.

### Text page (left), verbatim

On the high shelf above the cookbooks, Monke was sitting very still. He had been sitting very still for almost an hour.

The woman in the green cardigan did not see him.

Monke watched her put the phone in a drawer, lock the drawer, walk to the back of the store, and turn off the lights.

Then, very quietly, Monke climbed down from the shelf, slipped through a gap in the back of the cookbook display, found the locked drawer, and put one small finger on it.

He stayed like that for a long moment. Listening. Or measuring. Or remembering.

Then he climbed back up to the shelf and waited for morning.

*End of “The Patch”*

*The Digital Slop Squads will return.*

### Image page (right)

Slug: vol4-s09b
Shot type: Action moment
Depicts: Beat 4. Monke at the locked drawer in the dark with one small finger on it, after the lights have gone off and the woman has left.
Spoiler check: PASS. Final beat is Monke returning to the shelf to wait for morning. Not depicted; no animal appears in frame at all, and the drawer is shut.

Prompt:

```
{{STYLE}}
{{CHAR:MONKE}}
{{LOC:HOLLOW_PINE_INT}}
A small monkey crouched on the floorboards at the base of a wooden shop counter in the dark, one small hand raised with a single finger resting against the brass keyhole of a locked drawer. He is entirely still and his attention is complete. His posture is not playful and not frightened; it is careful, the way someone checks whether a thing is warm. His tail curls behind him on the boards. The shop beyond is closed for the night and empty of people: bookshelves in shadow, an armchair, a patterned rug, a table lamp switched off. No lettering is legible on any book spine. Exactly one figure in frame and no people anywhere.
Interior, three in the morning, lights off.
Low shot from floor level a little to one side, close enough that the finger and the keyhole are both clearly readable, the counter running away into the frame.
Dark but never illegible. A single cool source from off frame rakes across the counter face and picks out the monkey, the keyhole and his hand; the room behind falls away into soft shadow while its shelves and furniture stay just discernible. He and the lock are the brightest things in the picture.
```

Alt text: A small monkey crouches in the dark at the foot of a shop counter with one finger touching the keyhole of a locked drawer.

**Retired 2026-07-29: the earlier plate for this page.** It was `vol4-s09.png`, the counter
after the lights went off with nobody in it. Replaced because this is the last image of the
whole arc and it was spending that position on an empty room, when the page it sits on is
Monke deciding something. The file is still in `public/images/` and its prompt body was:

```
{{STYLE}}
{{LOC:HOLLOW_PINE_INT}}
The shop counter in the dark after closing, one shallow drawer shut tight with a small brass keyhole in the front, a cordless handset absent from its place. No glow of any kind. No figures and no animal in frame.
Interior, three in the morning.
Close shot at counter height, slight angle across the drawer front, shallow depth on the keyhole.
One narrow shaft of streetlight through the shopfront falling across the drawer, everything else in deep shadow.
{{NEGATIVE}}
Aspect ratio: 3:2
```
