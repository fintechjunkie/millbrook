# The Patch, Volume 3: Flip Book Spec

Source: `WELCOME_TO_MILLBROOK_Patch_Notes_Part_3.md`
Chapter: Part Three: Mr. Henderson's Knee
Spreads: 9 (8 text spreads plus 1 chapter opener) | Images: 9 | Words: 1948
Spec version: 1 | Date: 2026-07-28

Style, negatives, characters, locations and wardrobe states live in `PATCH_NOTES_FLIPBOOK_ROSTER.md`, which is the single source of truth for all four volumes. Do not restate any of it here and do not describe a locked character or location inline. Tokens only.

## Shot mix, this volume

Establishing 2 | Character portrait 3 | Object 1 | Action 2 | Atmospheric 2

Sequence: establishing, action, portrait, atmospheric, action, establishing, portrait,
portrait, atmospheric, object. The only adjacent pair left is 6 with 7, and the rule forbids
three. Verified.

**Ten images now, not nine, and two entries changed type.** Spread 2 was split after "her eyes
were the way eyes get after" — 311 and 269 pixels — so the new spread 3 carries Cassie’s
monologue and the subjective plate that goes with it. Spread 1 also changed from a portrait to
an action shot when the running plate replaced the one of him standing still.

Both changes improve the sequence rather than straining it: portraits drop from four to three,
and the old adjacent portrait pair at 1 and 2 is broken by the new action shot at 1.

**Two images reframed character-forward, on the same instruction as Volume 2.** Volume 3 had
Mr Henderson appearing in one image across the whole arc while carrying the volume's title
and its central moral question, and it spent its late-night image on anonymous sleeping
shapes when the prose had Vex sitting awake beside Cassie.

| Spread | Was | Now |
|---|---|---|
| 6 | The porch swing, empty | Henderson holding his steady hands up, Lena beside him |
| 7 | Sleeping shapes, nobody named | Vex awake on the floor beside sleeping Cassie |

Spread 7 stays logged **atmospheric** rather than promoted to a portrait, deliberately: the
figures are small in a wide dark frame, so the volume keeps its quiet late-night image and
the mix keeps an atmospheric slot. Object stays at 1 because spread 8 is Pip's hands holding
the granola bar, which is a character image that cannot drift.

**Left empty on purpose.** Spread 4 is the old elementary school behind its fence, and it
must stay unpeopled: nobody goes there in this volume, it is the thing at the centre of the
arc that has not been approached yet, and putting a figure at that fence would promise a
scene the book does not deliver until later.

---

## Spread 0, chapter opener

Renders differently: one full bleed image across both pages with the chapter title set over it. No prose on this spread.

### Title block (typeset over the image, not generated into it)

# WELCOME TO MILLBROOK

*A Digital Slop Story*

## The Patch

### Part Three: Mr. Henderson’s Knee

### Image, full bleed across both pages

Slug: vol3-opener
Shot type: Atmospheric (full bleed, both pages)
Depicts: A Millbrook street at the hour the volume begins. No story beat.
Spoiler check: PASS. Chapter opener precedes all prose. Shows no figure and no running, so it cannot give away the six miles.

Prompt:

```
{{STYLE}}
{{LOC:MILLBROOK_RESIDENTIAL}}
A long residential street of modest houses with a rolled newspaper lying on one porch step in the foreground. No figures anywhere.
Exterior, just after sunrise.
Wide low shot from the middle of the empty road, deep focus, strong perspective down the street.
Low raking sunrise light from the far end of the street, very long shadows across the asphalt, dew haze.
{{NEGATIVE}}
Aspect ratio: 2:1
```

Alt text: An empty residential street just after sunrise with long shadows and a rolled newspaper on a porch step.

---

## Spread 1

Pages 3 to 4 | Part Three: Mr. Henderson's Knee | Words 271

### Text page (left), verbatim

### The Marathon

Mr. Henderson was eighty-one years old, and on Tuesday morning he ran six miles.

He hadn’t meant to. He’d gone out to get the paper, and his knee, which had been bad since 1978, had felt fine when he stood up. He’d gone down the porch steps without holding the rail and he’d kept walking. By the time he noticed he wasn’t in pain anymore, he was at the end of the block. By the time he noticed he wasn’t tired, he was at the park.

He came home and his wife cried, and then she made him sit down because she didn’t trust the knee, and then he stood up again because the knee was fine.

By Tuesday night, three other people in Millbrook had stories like it.

By Wednesday morning, it was eleven.

Lena was at the kitchen table eating cereal when Aunt Carol set the local paper down in front of her. The headline said MIRACLE ON MAPLE. The Mayor was on the front page in his red 3D glasses, shaking Mr. Henderson’s hand on Mr. Henderson’s porch. The caption credited the Mayor’s “wellness initiative.”

“He doesn’t have a wellness initiative,” Lena said.

“Mm-hmm,” said Aunt Carol.

“He just made it up.”

“He just made it up.”

Aunt Carol poured herself coffee. She was not looking at the paper, and she had not looked at it since she’d brought it inside.

“Aunt Carol.”

“Don’t.”

“You said this town gives things and it always wants something back. What does it want.”

Aunt Carol stirred her coffee. “Honey. If I knew, I’d have left thirty years ago.”

### Image page (right)

Slug: vol3-s01b
Shot type: Action moment
Depicts: Beat 1. The six miles, in progress — Mr. Henderson running, newspaper still under his arm because he never meant to go anywhere.
Spoiler check: PASS. Final beat is Aunt Carol at the coffee pot saying she would have left thirty years ago. Not depicted; the scene never enters the kitchen.

Hard constraints: He is in ordinary house clothes and soft tartan slippers, never athletic shoes — the slippers are the point, because he only went out for the paper. His face is astonished and delighted rather than confused. Both feet are off the ground.

Prompt:

```
{{STYLE}}
{{CHAR:MR_HENDERSON}}
{{WARDROBE:HENDERSON_A}}
{{LOC:MILLBROOK_RESIDENTIAL}}
An old man running along an empty residential sidewalk at full stride with both feet off the ground, arms working, and a folded newspaper still tucked under one arm because he never meant to go anywhere. He is dressed in ordinary house clothes and soft tartan slippers rather than anything athletic, one slipper half off his heel. His face is the whole point of the image: astonished and delighted at the same time, mouth open. Sleeping single-storey houses with wide flat lawns run away behind him and the street is completely empty of other people and of cars. Exactly one figure in frame.
Exterior, just after sunrise.
Low three-quarter tracking shot from slightly ahead of him and below, so the stride reads as fast and his face stays clearly visible, moderate depth so the row of houses recedes behind him.
Bright, clean early-morning light. A long warm low sun from behind the camera lights his face and the fronts of the houses directly, throwing long soft shadows, and the overall key is high. A cheerful image, not a wistful one.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: An elderly man in slippers runs along an empty sidewalk at full stride with a newspaper under his arm, delighted.

**Retired 2026-07-29: the earlier plate for this page.** It was `vol3-s01.png`, a portrait of
him stopped at the end of the block looking down at his own legs, puzzled — the quieter half of
the same paragraph. Both depict beats on this page, so this was a choice and not a fix: the run
is the title beat, it is the only plate in the arc with real motion in it, and it carries joy
where the other carried confusion. The file is still in `public/images/` and its prompt body was:

```
An old man stopped in the middle of an empty sidewalk with a rolled newspaper under one arm, looking down at his own legs with an expression of plain confusion rather than joy.
Exterior, early morning.
Medium shot, camera at chest height, shallow depth so the street behind him softens.
Low warm sunrise light from behind and to the right, rim lighting his white hair, face in soft fill.
```

---

## Spread 2

Pages 5 to 6 | Part Three: Mr. Henderson's Knee | Words 122

### Text page (left), verbatim

### Cassie

Vex called Lena at nine fifteen. Vex did not call people. Vex texted, or Vex showed up at your window.

“Come to the Warehouse. Now.”

“What happened.”

“Cassie happened.”

“Who is Cassie.”

“My lab partner. Get over here.”

Cassie was sitting on the couch in the Pit when Lena got there. She was small, brown-haired, fifteen, with a hearing aid behind her left ear that was, as of last night, the only hearing aid she had ever needed and the only hearing aid that still worked. The other one was in her pocket. She had taken it out and the world had stayed loud.

She was not crying. She had been crying. Her eyes were the way eyes get after.

### Image page (right)

Slug: vol3-s02
Shot type: Character portrait
Depicts: Beat 4. Cassie on the couch in the Pit, one hearing aid still behind her ear and the other in her open hand.
Spoiler check: PASS. Final beat is her line about not knowing how to make her brain stop hearing. Not depicted; she is not speaking and her mouth is closed.

Prompt:

```
{{STYLE}}
{{CHAR:CASSIE}}
{{WARDROBE:CASSIE_A}}
{{LOC:WAREHOUSE_PIT}}
A small fifteen year old sitting far back on a sagging couch, shoulders drawn in, one hearing aid visible behind her left ear and the second one lying in her open upturned palm. Eyes red rimmed and dry, mouth closed. One adult-sized hand rests on her back at the very edge of frame, the owner cropped out entirely.
Interior, mid morning.
Close shot, camera slightly above eye level looking gently down, shallow depth.
Diffuse high window light from the left, the couch and floor falling into shadow.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A small girl sits drawn in on a couch with one hearing aid behind her ear and the other lying in her open palm.

---

## Spread 3

Pages 7 to 8 | Part Three: Mr. Henderson's Knee | Words 159

### Text page (left), verbatim

Vex sat next to her, and Vex’s hand was on Cassie’s back, which was a thing Lena had not known Vex did.

“Tell her,” Vex said softly.

“I woke up,” Cassie said. “And I could hear my mom in the kitchen, and the dog two doors down, and a guy yelling at his dog four blocks away, and the freezer compressor at the corner store, and the bus on Crescent. All at the same time. I can hear all of it right now. Your shoes have a squeak in them. The left one. There’s a wasp in the wall above that vent. The thing in your jacket pocket is buzzing on silent.”

Lena pulled her phone out of her jacket pocket. It was buzzing on silent.

“I can’t turn it off,” Cassie said. “The other hearing aid was making it worse. I took it out and it didn’t help. I don’t know how to make my brain stop hearing.”

### Image page (right)

Slug: vol3-s02b
Shot type: Atmospheric or subjective (portrait)
Depicts: Beat 3. What Cassie is hearing while she lists it — the wasp in the wall, the freezer compressor, the phone buzzing on silent in Lena’s pocket.
Spoiler check: HOLD ONE THING. The rings must read as SOUND and nothing else. They must not read as a signal, a transmission or a network, must have no source and no direction, and nothing in the walls may be visible. That the patches live on a frequency, and that something is in the wiring, are both later reveals.

Hard constraints: The rings are thin, soft-edged, translucent and colourless, like ripples on water seen from above, and they clearly pass through solid objects. They are never beams, never rays, never coloured and never bright. No source glows. No machinery, wiring or device is visible anywhere in the frame. The room is lit as ordinary warm daylight.

**Why this plate exists.** It is the only subjective image in the book, and the only one that
draws something not physically in the room. It dramatises the volume’s central idea rather
than describing it, which no other plate here does.

Prompt:

```
{{STYLE}}
{{CHAR:CASSIE}}
{{WARDROBE:CASSIE_A}}
{{LOC:WAREHOUSE_PIT}}
A fifteen-year-old girl sitting upright on a worn couch, filling the near half of the frame, seen slightly from the side. One hearing aid sits behind her left ear and the other lies in her open palm on her knee. She is not crying but has been, and her eyes are wide and fixed on nothing in particular, her shoulders slightly raised as though braced. Her expression is overwhelmed rather than frightened. Behind and around her the room is drawn normally, except that faint pale concentric rings spread outward through it from several separate ordinary places at once, overlapping each other where they cross: from a small point inside the wall behind her, from a chest freezer far off through the doorway, from a coat pocket on a chair nearby, from somewhere beyond the far wall. Exactly one figure in frame.
Interior, mid-morning.
Medium close portrait from just off her eyeline, camera at seated eye level, shallow enough depth that she is crisp and the ringed room behind her is soft.
Bright and warm and completely ordinary. Generous daylight from high windows so her face and the whole room read at full colour, with no dramatic shadow and no coloured light. The rings are the only unusual element and they are pale and low-contrast against a normally lit room.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A girl sits on a couch holding a hearing aid in her open palm, while faint pale rings spread through the room behind her.

---

## Spread 4

Pages 9 to 10 | Part Three: Mr. Henderson's Knee | Words 276

### Text page (left), verbatim

Pip came in from Owen’s side of the room. She knelt down in front of Cassie and looked at her the way Pip looked at things, smooth and steady, missing nothing.

“Can I touch your face,” Pip said.

“I guess.”

Pip put two fingertips just behind Cassie’s left ear, very lightly, for about three seconds. Then she sat back on her heels.

“It’s on the same band,” she said quietly. “The patch. It’s on the same band as me.”

“What does that mean,” Lena said.

“It means whoever made me knows how to make her.”

The Warehouse went quiet. Felix stopped tinkering. Owen stopped typing. Even Monke, on his shelf, lowered his granola bar.

Vex looked at Pip. “Or you’re the same kind of thing.”

“Maybe.”

“Does that worry you.”

“I don’t know yet,” Pip said. “I’ll let you know.”

### The Map

Owen put the medical patches on the map. He didn’t want to. He did anyway.

There were eleven dots that hadn’t been there last week: the knee, the chemo, the diabetic kid down the street whose pump now read zero need, a woman who’d been blind in one eye since a car accident, a man whose tremor had stopped, and Cassie, on Vex’s street.

All eleven were inside the arc.

The arc was almost a full circle now. There was a small piece missing on the western side. Three or four more patches would close it.

“It’s a containment field,” Felix said. He had walked over without anyone noticing. He was holding a soldering iron. “Whatever’s doing this, it’s drawing a circle around something. The patches inside the circle aren’t random. They’re payment.”

### Image page (right)

Slug: vol3-s03
Shot type: Action moment
Depicts: Beat 2. Pip kneeling in front of Cassie with two fingertips just behind her left ear.
Spoiler check: PASS. Final beat is Felix's conclusion that the patches are payment. Not depicted; the map is not in frame and Felix is absent.

Prompt:

```
{{STYLE}}
{{CHAR:PIP}}
{{WARDROBE:PIP_A}}
{{CHAR:CASSIE}}
{{WARDROBE:CASSIE_A}}
{{LOC:WAREHOUSE_PIT}}
One girl kneeling on the floor in front of another who is seated, reaching up with two fingertips resting very lightly on the skin just behind the seated girl's left ear. The kneeling girl's face is calm and measuring rather than tender. Exactly two named figures in frame and no others.
Interior, mid morning.
Medium close two shot from the side at kneeling height, shallow depth carried on the touching fingertips.
Soft directional window light from behind the seated girl, the kneeling girl's face in cool fill.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A girl kneels in front of a seated girl and rests two fingertips lightly on the skin behind her ear.

---

## Spread 5

Pages 11 to 12 | Part Three: Mr. Henderson's Knee | Words 226

### Text page (left), verbatim

Owen looked at him.

“Did you just say something smart,” Owen said.

“It happens.”

Milo had come over. He stood with his hands in his jacket pockets and looked at the screen for a long time.

“What’s in the middle.”

Owen zoomed in. The center of the almost-circle was the old elementary school, abandoned since the Event: six acres of fenced-off property, boarded windows and a play structure with the swings removed. It was the kind of building everybody in town knew not to think about.

“Great,” Vex said. She had walked over too. “It’s the school. It’s always the school.”

“What’s always the school,” Lena said.

“Everything,” Vex said. “In every story.”

### The First Argument

They argued about the school for an hour.

Milo wanted to scout it carefully. Owen wanted to map every camera and signal in a quarter mile before anyone got near it. Felix wanted to build something to take with them, although he could not say what. Vex wanted to break in tonight. Lena wanted to interview Mr. Henderson first. Pip wanted to listen, which was Pip’s answer to most things, and which was infuriating from the other side of an argument.

“You don’t want to do anything,” Owen said.

“I want to listen,” Pip said.

“That’s not a plan.”

“It’s the start of one.”

“It’s the start of nothing.”

### Image page (right)

Slug: vol3-s04
Shot type: Establishing or location
Depicts: Beat 5. The old elementary school at the centre of the arc.
Spoiler check: PASS. Final beat is the argument line about the start of nothing. Not depicted; no figures and no warehouse.

Prompt:

```
{{STYLE}}
{{LOC:OLD_SCHOOL}}
A long low abandoned school building behind a sagging chain link fence, ground floor windows boarded with plywood, six acres of dead grass, a play structure in the middle distance with the swings removed and only the empty crossbar and hanging chains left. No figures anywhere.
Exterior, overcast afternoon.
Wide establishing shot from outside the fence, fence in the near foreground and slightly out of focus, deep focus beyond it.
Flat heavy overcast, no shadows, colour drained toward grey green.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: An abandoned school behind a chain link fence with boarded windows and a swing set stripped of its swings.

---

## Spread 6

Pages 13 to 14 | Part Three: Mr. Henderson's Knee | Words 277

### Text page (left), verbatim

Vex stood up. “Okay. We’re not doing this.”

“Doing what.”

“The two-team thing. We’re done with the two-team thing. There is a fifteen-year-old girl on that couch who can hear the wasp in your wall, and we are arguing about whose group is in charge.” Vex pointed at the couch. Cassie was looking at her hands. “We’re one team. We’re going to figure this out together. Or I’m taking her home and you can have your warehouse.”

Nobody said anything for a second.

Milo put his coffee down. “You’re right.”

“I know I’m right.”

“One team. We scout the school tonight. Owen does signals. Felix builds something. I take Lena to talk to Henderson. Vex stays with Cassie. Pip listens.”

“That’s a plan,” Owen said grudgingly.

“It’s the start of one,” Pip said.

Owen made a small noise that was almost a laugh. He covered it by typing.

### Mr. Henderson’s Porch

Mr. Henderson lived in a white house with green shutters and a porch swing that creaked. He was wearing running shoes that still had the price tag on the tongue.

“Came from Carter’s,” he said, when Lena pointed at the tag. “Yesterday afternoon. Wife made me get them. Said if I’m going to keep doing this I needed proper shoes.”

“Are you going to keep doing it.”

“I don’t know what I’m doing, young lady.”

They sat on the porch swing. Milo stood by the rail. Mr. Henderson was looking at his hands the way Cassie had looked at hers.

“What does it feel like,” Milo said.

“My knee?”

“All of it. The knee. Yesterday morning.”

Mr. Henderson thought for a minute. The swing creaked.

### Image page (right)

Slug: vol3-s05
Shot type: Character portrait
Depicts: Beat 1. Vex on her feet in the Pit, ending the two-team argument.
Spoiler check: PASS. Final beat is Mr. Henderson thinking while the porch swing creaks. Not depicted; the scene never leaves the warehouse.

Prompt:

```
{{STYLE}}
{{CHAR:VEX}}
{{WARDROBE:VEX_A}}
{{LOC:WAREHOUSE_PIT}}
Standing upright in the middle of a cluttered room mid-sentence, one arm out and pointing hard off frame to the left, jaw set, entirely unembarrassed. She is the only figure in frame.
Interior, late afternoon.
Medium shot, camera slightly below eye level so she reads taller than she is, moderate depth.
Warm low window light raking in from the right, dust in the beam, shadow thrown long across the floor.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A short girl with mint-green hair in two buns stands in a cluttered room mid-sentence, pointing hard off to one side.

---

## Spread 7

Pages 15 to 16 | Part Three: Mr. Henderson's Knee | Words 206

### Text page (left), verbatim

“It felt like somebody fixed me. Reached in and tightened a screw.” He held up his hands. They didn’t shake. “I had a tremor in this one for nine years. It’s gone too. I didn’t notice until lunch yesterday because I picked up a coffee cup and it didn’t move.”

“Mr. Henderson,” Lena said gently. “Did you ask for this.”

“Did I ask for what.”

“To be fixed.”

Mr. Henderson looked at her for a long time. He was not a stupid man, and the question was not a stupid question.

“No,” he said finally. “I never asked anybody for anything. I just woke up and somebody had decided.”

“Does that bother you.”

“Young lady. I am eighty-one years old, and I just ran six miles, and my wife is making lasagna because I asked her to, and yesterday I couldn’t taste lasagna because the chemo my brother had took my taste years ago and we have the same body, that’s what they told us. So no. It does not bother me.”

He paused. The swing creaked.

“But something is going to come ask me for something. I can feel it. I don’t know what it’s going to ask. But I know it’s going to ask.”

### Image page (right)

Slug: vol3-s06
Shot type: Character portrait or close (two-shot)
Depicts: Beat 1. Mr. Henderson on the porch swing holding his own steady hands up in front of him, Lena beside him on the swing.
Spoiler check: PASS. Final beat is Mr. Henderson saying something is going to come and ask him for something. Not depicted; he is looking at his hands, not at her, and nothing in the frame anticipates that line.

Hard constraints: Mr Henderson has STRONG WHITE SHELF-LIKE EYEBROWS and untidy white hair
swept up, not combed flat. He wears the BRAND NEW WHITE RUNNING SHOES and one still carries
a price tag on the tongue, because this is after Carter's. His wristwatch is on. Lena's
orange hair is in ONE large uneven side ponytail high on her left, spiky and layered with a
loose fringe, and her oval pendant is visible at the centre of her chest.

**Reframed to be character-forward.** It was the porch swing empty, before or after the
conversation. But this page is the emotional centre of the volume — an eighty-one year old
man being asked whether he consented to being fixed — and Mr Henderson had exactly one
image in the whole arc before this. The beat chosen is him holding up his own hands to show
that the nine-year tremor has stopped, which is the moment the scene turns.

Prompt:

```
{{STYLE}}
{{CHAR:LENA}}
{{WARDROBE:LENA_C}}
{{CHAR:MR_HENDERSON}}
{{WARDROBE:HENDERSON_B}}
{{LOC:HENDERSON_PORCH}}
An old man and a teenage girl sitting together on a two-seat wooden porch swing, turned slightly toward each other but neither looking at the other. The old man has both hands raised in front of his own chest, palms up and fingers spread, studying them with an expression of plain puzzled wonder rather than joy; the hands are completely steady. His brand new white running shoes are planted on the boards and a small price tag still hangs from one tongue. The girl sits at the other end of the swing with her body angled toward him, hands in her lap, watching his hands rather than his face, her expression careful and attentive. Exactly two figures in frame.
Exterior, mid afternoon.
Medium two-shot from the porch steps, camera at seated height so both faces and his raised hands read clearly, shallow depth so the clapboard behind goes soft.
Bright dappled afternoon light through leaves off frame, moving shadow patterns across the boards and across both of them.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: An elderly man on a porch swing holds his steady hands up in front of him and studies them, while a teenage girl beside him watches his hands.

---

## Spread 8

Pages 17 to 18 | Part Three: Mr. Henderson's Knee | Words 248

### Text page (left), verbatim

### The Warehouse, After Midnight

They did not scout the school that night. Felix’s thing wasn’t ready, Owen’s sweep wasn’t done, and Cassie didn’t want to go home, so they all stayed at the Warehouse.

Lena fell asleep on a couch with the pig. Felix fell asleep at his bench with his face on his arms. Owen fell asleep in his chair, which he denied later. Vex put a blanket on Cassie and sat on the floor next to the couch, awake, for a long time.

Milo was in the back, on the phone with his mom, lying about where he was.

Pip was alone.

She stood in the dark part of the Warehouse, near the back wall, where Felix had once been trying to set up a second router and had given up. She stood very still.

She listened.

Then she said, quietly, to nobody who was visible, “You shouldn’t have done the girl.”

There was a pause, and then a hum, almost too soft to hear, in the wires of the wall.

“I know,” Pip said. “I know you didn’t mean to. But she’s a person. The man on the porch is a person. You can’t keep doing this and pretending it’s the same as fixing the road.”

Another pause. Another hum.

“I told you I’d watch them. I’m watching. I’ll keep watching. But if you do another one of these, I’m going to tell them. All of it. The frequency. The math. Where you live.”

### Image page (right)

Slug: vol3-s07
Shot type: Atmospheric or empty (ensemble tableau)
Depicts: Beats 2 to 5. The whole group bedded down in the Warehouse after midnight, the pig on the couch with Lena, Vex awake on the floor beside Cassie, and Pip alone and still in the dark part at the back.
Spoiler check: PASS. Final beat is Pip's threat to the thing in the wall. Pip is present but SILENT and standing, not speaking, and the wall she faces is an ordinary wall: nothing in the frame glows, hums, answers or hints that anything is inside it. The reader learns what she is doing from the facing prose, not from the plate.

Hard constraints: EVERY ONE OF THE SEVEN NAMED FIGURES IS IN FRAME, PLUS THE PIG. Nobody is
omitted and nobody is doubled.
The room is NOT murky. See the warehouse lighting floor in roster section 6.1a: the purple
brick must read as purple, the couches must keep their separate brown, olive and purple, and
every figure must be findable at a glance. This is a night scene, not a dark image.
The back wall Pip faces is a plain brick wall with NO glow, NO light seeping from it, NO
visible cable run lighting up and nothing embedded in it. Pip's mouth is closed.
Cassie's hearing aid is behind her LEFT ear and stays visible while she sleeps.
Vex's mint-green hair is spiky with ONE messy high bun at the back left.
The pig is placid livestock, asleep. He is not reacting to anything and not looking at the
camera.

**Rebuilt 2026-07-29, and the previous version was simply wrong about the scene.** It showed
two figures, Vex and Cassie, in an otherwise anonymous dark room. But the prose puts the
entire cast in this one space, by name, each doing a specific thing: *"Lena fell asleep on a
couch with the pig. Felix fell asleep at his bench with his face on his arms. Owen fell asleep
in his chair, which he denied later. Vex put a blanket on Cassie and sat on the floor next to
the couch, awake, for a long time. Milo was in the back, on the phone with his mom, lying about
where he was. Pip was alone."*

That is the group portrait of the whole arc, and it was being spent on a two-hander. The
sleeping cast is also what makes Pip's isolation land: she is apart from six people who trust
her enough to sleep in the same room.

**The pig had no roster block until now**, which is why he was absent rather than declined.
His canonical sheet arrived with the others and nothing referenced it, so the generator could
not see him. Added as `{{CHAR:PIG}}`.

**Deviation, deliberate: seven named characters plus an animal.** Part C4 sets a ceiling of
two, and this breaks it by five. The ceiling exists to stop a story page turning into a
crowd nobody can read, and it is the right default. It is the wrong rule for the one plate in
the arc whose subject IS the group: staging seven sleeping people is legible in a way that
seven talking people would not be, because six of them are still and the composition can lead
the eye from the couches to the single standing figure at the back. Kept in the atmospheric
band, which is where it belongs by register and which leaves Volume 3's mix unchanged.

Prompt:

```
{{STYLE}}
{{CHAR:LENA}}
{{WARDROBE:LENA_C}}
{{CHAR:VEX}}
{{WARDROBE:VEX_A}}
{{CHAR:CASSIE}}
{{WARDROBE:CASSIE_A}}
{{CHAR:FELIX}}
{{WARDROBE:FELIX_A}}
{{CHAR:OWEN}}
{{WARDROBE:OWEN_A}}
{{CHAR:MILO}}
{{WARDROBE:MILO_A}}
{{CHAR:PIP}}
{{WARDROBE:PIP_A}}
{{CHAR:PIG}}
{{LOC:WAREHOUSE_PIT}}
A wide converted warehouse interior after midnight with the whole group bedded down in it, staged in clear depth so every figure is findable. NEAR LEFT, on a sagging brown couch, Lena is asleep on her back with one arm over her eyes and the pink pig asleep along her legs, placid and heavy. NEAR CENTRE, on a second couch, Cassie is asleep on her side under a blanket pulled to her shoulder, face turned toward the room, the small beige hearing aid behind her left ear visible. On the bare concrete floor beside that couch Vex sits awake with her back against the couch frame, knees drawn up, arms loosely around them, head tipped back, wide awake and not going to sleep. MIDDLE RIGHT, at the workbench, Felix is asleep sitting up with his face down on his folded arms among his tools. BEHIND HIM at the desk, Owen is asleep in his swivel chair, slumped sideways with his head against the backrest. FAR RIGHT in the middle distance, Milo stands half turned away with a phone to his ear, one hand on the back of his neck, talking quietly. FAR BACK, alone at the plain brick end wall and separated from all of them by empty floor, Pip stands perfectly upright and perfectly still, facing the wall, arms at her sides, mouth closed, doing nothing at all. Exactly seven named human figures and one pig. No other figures.
Interior, well after midnight.
Wide shot from the near end of the room at standing height, deep focus so every plane stays sharp, the sleeping group filling the lower two thirds and Pip small and alone against the back wall in the upper right.
Night, but not murky, and lit from four directions so nothing is lost. The three salvaged televisions on their shelf throw a broad cold blue-white fill across the couches and the sleepers. A warm clamp lamp still burning over Felix's bench is the warm key on the right. Owen's monitors add a second cold pool behind him. Cool moonlight through the high clerestory windows rims the roof trusses and lays a soft wash down the back wall so Pip reads clearly as a pale upright figure. The purple brick reads as purple throughout, the couches keep their separate brown, olive and purple, and no part of the frame falls to featureless black.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A wide warehouse interior after midnight with six teenagers asleep on couches, at a workbench and in a desk chair, a pig asleep beside one of them, one girl sitting awake on the floor, and a robot girl standing alone and still at the far brick wall.

---

## Spread 9

Pages 19 to 20 | Part Three: Mr. Henderson's Knee | Words 169

Short page, deliberate. Volume closer. The final beats are Monke crossing the floor and Cassie unclenching in her sleep, and they want air around them rather than company on the page.

### Text page (left), verbatim

The hum changed. It got higher, briefly, like a note being held.

“I know you can hear me,” Pip said.

The hum stopped.

Pip stood there for another minute. Then she walked back to the Pit and sat down on the floor next to Vex.

“You okay,” Vex said.

“No.”

“Want to talk about it.”

“Not yet.”

Vex didn’t push. She handed Pip a granola bar, and Pip didn’t eat it. She held it like a person holding something they’d been given.

From the high shelf, Monke was awake. He had been awake the whole time. He was watching Pip with an expression that, if you didn’t know better, looked like he was deciding something.

Then he climbed down from the shelf, very quietly, and walked across the dark warehouse floor, and sat down on the couch on the other side of Cassie. He didn’t make a sound. He just sat there. He stayed.

Cassie, in her sleep, stopped frowning.

*To be continued in Part Four: The Press Conference*

### Image page (right)

Slug: vol3-s08
Shot type: Character portrait
Depicts: Beat 4. Monke awake on the high shelf, watching the Pit below, before he climbs down.
Spoiler check: PASS. Final beat is Monke crossing the floor to sit beside Cassie and Cassie stopping frowning in her sleep. Not depicted; he has not moved, he is still on the shelf, the couch is out of frame below, and nothing in the image shows where he goes next.

Hard constraints: MONKE MUST BE CLEARLY LIT AND FULLY LEGIBLE — his face, both eyes, the tan
face patch and muzzle, the crown tuft and the curl of his tail all readable. He is charcoal-black
shaggy paper with TAN face, muzzle, inner ears, hands and feet, and very large round white eyes
with small black pupils. He is not brown and he is not a silhouette. The frame is night but it is
NOT murky: keep the shelf, his hoard and the trusses all readable. Nothing on the shelf may look
sorted, squared, stacked or arranged with intent, and no wrapper may be folded — see the
guardrail in his roster block.

**Replaced the granola-bar object study, 2026-07-29.** It was two grey hands holding an unopened
bar. Two things were wrong with it. The wrapper could not read as food once the lettering was
stripped, because in a style built from faceted paper planes a plain wrapped bar is just another
faceted plane. More seriously, the beat does not survive translation: the power of *"She held it
like a person holding something they'd been given"* is the simile and the verb, both of which are
language. A picture of hands holding a rectangle cannot say it, so the plate duplicated the
weaker half of a line the prose had already landed, three inches to its right.

Monke was chosen over the alternative — Pip and Vex side by side on the floor — because he is the
better picture, and the roster's old ban on showing him clearly was lifted on purpose to allow it.
He had one appearance in the whole arc before this.

**The beat is 4, not 5, and that is what keeps it spoiler-safe.** He is still on the shelf,
watching, before he decides. The image poses the question the facing text answers.

The granola bar survives here as a prop in his hand rather than as the subject, which also pays
off Spread 3's *"even Monke, on his shelf, lowered his granola bar."*

Prompt:

```
{{STYLE}}
{{CHAR:MONKE}}
{{LOC:WAREHOUSE_PIT}}
A small monkey sitting alone on a high wooden shelf near the roof of a warehouse, wide awake, leaning forward over the edge with one hand gripping the shelf lip and looking down and off to the right at something below and out of frame. His expression is steady and unhurried, watching rather than reacting. A part-eaten granola bar hangs forgotten and lowered in his other hand, held down by his side rather than up at his mouth. His long tail is hooked once round the upright of the shelf bracket beside him and curls loose at the tip. Scattered along the shelf behind him is a small gathered hoard of objects a monkey would take because they were shiny or interesting rather than because they were useful: a bent spoon, two bottle caps, an empty thread spool, a single lost sneaker on its side, and a loose drift of crumpled granola wrappers. The hoard is untidy and pushed about, nothing sorted, squared, stacked or lined up. He is the only figure in frame.
Interior, the small hours.
Low medium shot from the Pit floor looking up at the shelf so he reads small and high in the frame with the roof trusses and the high dusty clerestory windows behind and above him, moderate depth so the shelf, the hoard and the trusses all stay legible.
Night, but not murky. Cool blue-white moonlight through the clerestory windows above and behind him gives the trusses and the shelf a clear rim, and a warm workbench lamp far below and off to the left throws soft upward light across his face, chest and hands so his features and both eyes read clearly. The lower warehouse falls away into soft blue shadow beneath him, but nothing in the upper third of the frame is lost to black.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A small monkey sits awake on a high warehouse shelf among a scatter of gathered odds and ends, leaning over the edge to watch something below, a part-eaten granola bar lowered in one hand.
