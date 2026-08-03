# The Understudies, Volume 2: Flip Book Spec

Source: `The_Understudies_Part_2_V3.docx`  
Chapter: Part Two: Four Out Of The Trunk  
Spreads: 11 (10 text spreads plus 1 chapter opener) | Images: 11 | Words: 2264  
Spec version: 1 | Date: 2026-07-31

Style, negatives, characters, locations and wardrobe states live in `PATCH_NOTES_FLIPBOOK_ROSTER.md`, which is the single source of truth for the series. Do not restate any of it here and do not describe a locked character or location inline. Tokens only.

## Shot mix, this volume

Images: 11. Character-led 10, establishing 1, detail 0.

Commissioned 2026-08-02 on two author instructions: real action, and nothing that reads as a repeat of a plate the reader already has.

**Action.** Five of the ten are action plates — a heavy bag leaving its chain and destroying a water cooler, a stand-off on an empty road, a soldier pinned to a pine tree by his own rifle sling, a girl in plate armour against the bumper of a five-ton truck, and three kids going under a fence at midnight.

**Variety, which needed designing rather than hoping for.** Part One spent five consecutive plates in the Warehouse and the author called it. Part Two’s prose has four Warehouse spreads — 5, 6, 7 and 9 — and they cannot be moved, so instead each is given a camera the book has never used: **spread 5 overhead**, looking straight down on the coffee table; **spread 6 from the floor**, looking up at Pip as she stands; **spread 7 at the desk end**, close and mid-movement; and **spread 9 at night** under one lamp. Spread 8 revisits the town hall square but from BEHIND the Mayor, where the previous two plates of it shot from in front.

**Revised 2026-08-02: spreads 6 and 7 left the Warehouse altogether.** The first pass had four Warehouse plates in this volume and the author counted the arc — eight of the first twenty-three plates were in that one room, over a third. Both of those spreads are warehouse dialogue, so both now cut away to the thing being talked about, the way `u1-s09` cut away to Cassie: **spread 6 to the bookshop** Pip names in her own list of things that were never invented, and **spread 7 to a school corridor** hung with forty-one years of framed cast photographs, with a soldier walking past not looking at any of them.

That leaves TWO Warehouse plates in Part Two — spread 5 overhead in daylight and spread 9 at night — and takes the volume to **nine distinct settings across eleven plates**.

Eleven plates across **eight distinct places**: the auditorium, Benny’s gym, Route 9, the pines, Old Bell Road, the Warehouse, the town hall square, and the north fence at night.

Every plate depicts a beat from its own text page and never that page’s final beat, which is the rule all fifty-four delivered plates follow.

Page budget, for whoever edits this next. Chunked with the model in `WRITING_GUIDE.md` at an ideal of 28 lines: 10 text pages running 15 to 29 lines, which is 43 to 84 per cent of the column. Arc one's median page is 76 per cent and its ceiling is 32 lines.

---

## Spread 0, chapter opener

Renders differently: one full bleed image across both pages with the chapter title set over it. No prose on this spread.

### Title block (typeset over the image, not generated into it)

# WELCOME TO MILLBROOK

*A Digital Slop Story*

## The Understudies

### Part Two: Four Out Of The Trunk

### Image, full bleed across both pages

Slug: u2-opener
Shot type: Establishing (full bleed, both pages)
Depicts: The empty school auditorium that forty-one years of costumes came out of. No story beat.
Spoiler check: PASS. A chapter opener precedes all prose. Shows no figure, no costume, no trunk and no wardrobe room — the four are revealed one at a time across the first four text pages, and the room under the stage is Part Three’s business.

**No location token.** The auditorium has no roster entry and does not need one: it appears once, and describing it inline means there is no reference in the frame to argue with. Kept dim but fully readable per the negative block.

Prompt:

```
{{STYLE}}
The empty auditorium of a closed small-town elementary school, seen from the back of the house looking down over the seats toward the stage. Completely empty of people.
Rows of tip-up wooden seats with worn upholstery, some folded up and some left down, running away toward a low stage with a shallow apron and three steps at one side. A heavy dark stage curtain is drawn shut across the whole width of it. A single work light on a tripod stands at one edge of the apron, switched on, throwing a plain pool of light across the boards and the bottom of the curtain.
The room has been shut for months and shows it: a fine film of dust on the seat arms, one seat cushion split, a scatter of dried leaves along the aisle where a door has been opened and shut, and a folded stack of grey metal chairs against a side wall.
Nothing is written anywhere. No banner, no sign, no lettering on the curtain or the walls.
Late afternoon. No people, no animals, no costumes and nothing on the stage.
Wide, camera at the back of the house at standing height, level, the whole room from the last row to the curtain in one frame.
Dim but completely readable: the work light does the near work and soft daylight leaks from a doorway at one side. Nothing falls to featureless black, and there is nothing sinister in the lighting.
{{NEGATIVE}}
Aspect ratio: 2:1
```

Alt text: The empty auditorium of a closed school seen from the back of the seats, curtain drawn across the stage and a single work light standing on the apron.

---

## Spread 1

Pages 3 to 4 | Part Two: Four Out Of The Trunk | Words 232

### Text page (left), verbatim

### Rocco

The first one showed up at Benny’s gym at six in the morning and knocked on the door.

Benny had been opening that gym at five thirty for twenty-six years and nobody had ever knocked, because the door is glass and the sign says OPEN and there’s a man sitting right there doing paperwork. But the guy knocked, and then he waited, and when Benny let him in he wiped his feet for a solid minute on a mat that hadn’t been swept since March.

He was maybe twenty-five and built like a filing cabinet. He had on a grey hooded sweatshirt with GOLDEN GLOVES across the back and MILLBROOK HIGH SPRING 1987 underneath it in smaller letters. The gloves on his hands were real leather, worn soft, and they looked older than he did.

“Sorry to bother you,” he said. “Do you happen to know what year it is?”

“It’s Thursday.”

“That’s all right. Can I use the heavy bag?”

Benny said sure, because Benny wanted to see what would happen. The guy taped his own hands first, and he took nine minutes doing it, and Benny said afterward that he had never seen a job that neat. Then he hit the bag once.

The bag came off the chain, flew eleven feet and took out the water cooler.

“Oh no,” the guy said.

“Yeah.”

“I’ll pay for that.”

### Image page (right)

Slug: u2-s01
Shot type: Character action
Depicts: Beat 9. The heavy bag comes off its chain, flies eleven feet and takes out the water cooler.
Spoiler check: PASS. Final beat of the page is “I’ll pay for that.” Not depicted: nobody has spoken, Rocco’s mouth is closed and he has not yet looked at Benny.

**The reference was built for this exact frame.** `loc-benny-gym.png` places the bag and the cooler eleven feet apart on the same clear run of floor with nothing between them, which is the only reason the sentence is drawable. Attach it and keep that geometry.

**Rocco wears the hoodie.** His sheet gives him a dark grey hooded sweatshirt with a kangaroo pocket, drawstrings, matching joggers, grey leather gloves and dark boots with pale toe caps. The prose called it a robe in two places and was corrected to the sheet on author instruction, 2026-08-02.

Prompt:

```
{{STYLE}}
{{LOC:BENNY_GYM}}
{{CHAR:ROCCO}}
{{CHAR:BENNY}}
The instant after one punch, caught at the peak of it. THE HEAVY BAG HAS COME OFF ITS CHAIN and is in the air, most of the way across the room and still travelling, with the broken end of the chain and its snapped bracket bolt trailing behind it. It has just reached the freestanding water cooler: the cooler is going over backwards, the big blue bottle is off its seat and turning, and a sheet of water is coming out of it sideways into the air with paper cups scattering ahead of it.
ROCCO stands where he threw it, at the far end of that clear run of floor, still square to where the bag used to be, one gloved fist fully extended at chest height and the other tucked at his chin. His weight has barely shifted. His mouth is closed and his eyebrows are up, and he is watching the bag go with the expression of a man who did not expect this and is already sorry. He is NOT posed as a fighter celebrating.
BENNY is half out of his chair behind the desk by the glass door, one hand flat on the desktop and the paperwork sliding, head turned to follow the bag, delighted rather than alarmed.
Exactly two people in frame. Nobody else and no animals.
Six in the morning, low early daylight coming in sideways through the street window and the glass door.
Wide action shot, camera at standing height along the length of that clear floor so that Rocco is at one end of the frame, the bag and the exploding cooler are at the other, and the whole eleven feet is legible in between. Everything sharp.
Flat even morning light, no motion blur on the faces, the bag and the water clearly drawn rather than smeared. No lettering anywhere, including on the sweatshirt.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: In an old boxing gym at dawn, a heavy punchbag flies across the room trailing a broken chain and knocks over a water cooler, while the young man who hit it stands with one glove still extended looking appalled and the owner half rises from his desk.

---

## Spread 2

Pages 5 to 6 | Part Two: Four Out Of The Trunk | Words 274

### Text page (left), verbatim

“With what?”

The guy looked down at himself, and then he checked the pocket of the sweatshirt, and then he checked it again, and Benny watched him work out that he didn’t own anything at all.

“His name’s Rocco,” Benny told Milo on the phone forty minutes later. “Rocco Vance. He asked me twice if I minded him being here. Milo, he asked me for permission to drink water.”

### Route 9

Private Kyle Dunphy had the Route 9 stop from six to two, and he didn’t mind it, because people kept bringing him things. Two doughnuts and a folding chair, so far.

At ten to seven a man in a grey hooded sweatshirt and boxing gloves came walking up the shoulder of the road.

Dunphy did it all by the book. He stepped out from behind the sawhorse, put a hand up, and said, “Morning, sir. Road’s closed for an inspection, so I’ll need you to turn around.”

“I’m not leaving,” Rocco said. “I’m stopping you.”

“Stopping me from what?”

“That’s a good question.” Rocco stopped six feet short and thought about it honestly and for a long time. “I’m sorry. It’s my first day.”

Then he stepped in and hit Private Kyle Dunphy once on the jaw, so light and so exact that Dunphy’s knees just quit, and he caught him under both arms on the way down and set him on the shoulder of the road the way you’d set down a sleeping toddler. He put Dunphy’s cap over his face to keep the sun off, and he moved the sawhorse out of the traffic lane so nobody would hit it.

### Image page (right)

Slug: u2-s02
Shot type: Character two-shot
Depicts: Beats 6 to 8. Rocco stops six feet short of Private Dunphy, thinks about what he is stopping him from honestly and for a long time, and apologises for it being his first day.
Spoiler check: PASS. Final beat of the page is the punch and Dunphy going down. Not depicted: there is no contact, both are on their feet, Rocco’s hands are DOWN at his sides and Dunphy is upright and unhurt.

**No location token.** Route 9 has no roster entry and is used once, so it is described inline. That also removes any chance of a reference contradicting the staging.

**The prose on this page was corrected to the sheet on author instruction, 2026-08-02.** It had called his garment a robe twice, including a joke that a robe has no pockets — and his sheet has a kangaroo pocket. The joke now turns on the pocket being empty and checked twice, which is more in his register anyway, and Dunphy now sees what he is actually wearing.

Prompt:

```
{{STYLE}}
{{CHAR:ROCCO}}
{{CHAR:DUNPHY}}
A quiet two-lane rural road on the edge of a small town, early morning, with flat open farmland and a wire fence on posts either side and a distant treeline. Cracked grey asphalt, a faded centre line, a narrow gravel shoulder and a shallow ditch beyond it.
TWO FIGURES facing each other in the middle of the road with about six feet of empty asphalt between them, and neither of them is touching the other.
PRIVATE DUNPHY stands nearer the camera, side-on and turned toward Rocco, one bare hand raised palm-out at shoulder height in a polite halt, his other hand at his side. His rifle is slung muzzle-down across his BACK and he is not holding it. He is doing this exactly by the book and he looks about nineteen.
ROCCO has stopped six feet short. His gloved hands hang loose and open at his sides, well away from any guard. His head is tipped very slightly down and to one side and his brow is drawn: he is genuinely and slowly thinking about the question he has just been asked, and he has been thinking about it for a while. He looks apologetic. He does not look dangerous.
Beside the shoulder of the road at one edge of frame, an unoccupied simple checkpoint: a single wooden sawhorse, one orange traffic cone, an ordinary domestic folding camp chair standing open, and on the seat of the chair a crumpled paper bag with two doughnuts in it. Nothing blocks the traffic lane.
Exactly two people in frame. No vehicles and nobody else.
Ten minutes to seven in the morning, low sun down the length of the road.
Medium two-shot from the road itself at standing height, slightly to one side of the line between them so both faces are three-quarters on and both are fully readable. The empty six feet of asphalt between them is the middle of the frame and must read as a gap.
Low warm early light, long shadows across the asphalt, no drama and both faces clear.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: On an empty rural road at dawn, a young soldier holds up one hand to stop a heavily built young man in boxing gloves who has halted six feet away and is thinking hard about the question he has just been asked. A folding chair with a bag of doughnuts stands on the shoulder.

---

## Spread 3

Pages 7 to 8 | Part Two: Four Out Of The Trunk | Words 242

### Text page (left), verbatim

Then he sat on the guardrail and waited, because he didn’t know what came next.

Dunphy woke up eleven minutes later with a headache and no memory of the last half minute, and there was a stranger sitting beside him saying, “You’re okay. You’re okay. Do you want water? I don’t have any water.”

He radioed it in, and the hardest part of the whole morning was having to say the words golden gloves on a live channel with his lieutenant listening. Then he had to spell Millbrook. Then he had to say 1987.

### Wren, Ottie And Sybil

By noon there were four of them.

Wren Ashbury turned up in the pines behind the Route 9 stop with a strung bow, a quiver of blunt practice arrows, a knitted green cap with ears sewn onto it and ROBIN HOOD 1994 stenciled inside her collar. She never once shot at a person. She shot at what people were wearing and carrying. She put an arrow through the loose canvas of a tent and pinned the flap shut, and she put another one through a rifle sling and into a pine, and the soldier attached to it hopped around for four minutes before his sergeant came over and cut the strap.

She apologized every single time, from ninety yards away, loud enough for everybody to hear it.

Dame Ottilie stood in the middle of Old Bell Road in a suit of plate armor.

### Image page (right)

Slug: u2-s03
Shot type: Character action, deep frame
Depicts: Beats 5 and 6. Wren has pinned a soldier to a pine tree by his rifle sling, and she is apologising for it from ninety yards away.
Spoiler check: PASS. Final beat of the page is Dame Ottilie standing in Old Bell Road in plate armour. Not depicted: no armour, no road and no truck, and Ottie is not in frame.

**The joke is the distance**, so the plate is built on depth rather than on a subject: the consequence is near the camera and the person responsible is very small and very far away, still politely raising a hand. Nothing else in Part Two uses the frame this way.

Prompt:

```
{{STYLE}}
{{CHAR:WREN}}
A stand of tall straight pine trees on sandy needle-covered ground behind a rural roadside, with clear sight lines between the trunks and dappled light coming down through the canopy.
IN THE NEAR HALF OF THE FRAME, a soldier in an olive field jacket is caught mid-hop on one boot, both hands up at his own shoulder, tugging uselessly at his rifle sling. **A blunt-tipped wooden practice arrow has gone clean through the fabric strap of that sling and buried itself in the pine trunk beside him**, pinning him to the tree at shoulder height with about a foot of slack. His rifle hangs off the pinned strap. His expression is pure indignant bafflement. He is not hurt and there is no blood anywhere.
A little further back, a canvas tent stands between the trunks with its entrance flap PINNED SHUT against the tent wall by a second identical practice arrow driven through the loose canvas.
WREN IS NINETY YARDS AWAY AND THE DISTANCE IS THE WHOLE JOKE. She stands deep among the pines, far behind the pinned soldier, and she must be **TINY IN THE FRAME — no more than about one eighth of the frame height, and much smaller than the soldier**. There must be **at least ten pine trunks between her and him**, receding away, so the distance is countable. She holds her bow down at her side in one hand and her other hand is RAISED high and open in an unmistakable apology, and she is calling something across the whole length of the wood. She is entirely unhurried.
Exactly two people in frame: the pinned soldier near, Wren far. No other figures and no animals.
Around noon, bright.
Deep-focus shot straight down the line between the trunks, camera at standing height. The pinned soldier is LARGE and near, filling much of one side of the frame. Wren is TINY and far, deep in the other side, with a long run of empty pine floor and many trunks between them. Both in focus. **A previous attempt put her about fifteen feet away at full size, which destroys the plate**: the prose has her apologising “from ninety yards away, loud enough for everybody to hear it”, and at conversational range that line stops making sense. If she is big enough to talk to, the frame is wrong.
Dappled noon light through the canopy, warm and clear, no deep shadow.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: In a pine wood, a soldier hops on one foot pinned to a tree trunk by an arrow through his rifle strap, a tent flap pinned shut behind him, while far away among the trees a small figure with a bow raises one hand in apology.

---

## Spread 4

Pages 9 to 10 | Part Two: Four Out Of The Trunk | Words 315

### Text page (left), verbatim

It was steel. Nobody thought to wonder about that for another day and a half, and when they finally did wonder, the answer turned out to be the whole story. There was a dent in the right shoulder, and the dent was the only part of it that came from a school play.

Specialist Tovar tried to walk her off the road and moved her exactly nothing. They tased her, and the taser did nothing at all, and Ottie looked down at the taser and then at the soldier holding it and said, politely, “That tickled a little.”

They tried to drive around her, so she walked over and stood in front of the truck again. They backed up and tried the other side, so she walked over and stood in front of it again. Old Bell Road stayed closed for six hours because one girl in armor who didn’t want to fight anybody wouldn’t be anywhere else.

Sybil Prine didn’t knock anybody down. Sybil Prine made it impossible to run a military unit.

She came out of FALL FESTIVAL 2009 in an orange dress printed all over with black cats and potion bottles, and a pointed felt hat with a drooping tip, and she walked the whole perimeter of the school property once, slowly, touching the fence every thirty feet or so. After that, every compass in the camp pointed at the bakery instead of north. Two handheld GPS units agreed that the command tent was in Ohio. Every radio worked perfectly and every radio worked on the wrong channel, so Lieutenant Pace’s orders came out of a speaker on a folding table in the mess tent, and the questions about those orders arrived at a radio locked inside a truck.

By two in the afternoon Sergeant Marisol Reyes had hand-carried nine notes across the softball field, because the only other option was shouting.

### Image page (right)

Slug: u2-s04
Shot type: Character action, wide
Depicts: Beats 2 and 4. Specialist Tovar puts his shoulder into Dame Ottilie and moves her exactly nothing, and the truck that has already tried both shoulders of the road is stopped in front of her again.
Spoiler check: PASS. Final beat of the page is Sergeant Reyes hand-carrying nine notes across the softball field. Not depicted: no field, no notes and no camp, and Reyes is not in frame.

**This is the volume’s signature image and it turns on one measurement.** The truck has tried to go around her twice, which only reads if the shoulder is just wide enough to attempt and the ditch beyond it obviously is not. `loc-old-bell-road.png` was written to hold exactly that; if it has not been generated yet the prompt below carries the geometry itself.

**She is BARE-HEADED and her face is fully visible.** Attempt 1 drew her that way and it was right; the roster’s old helmet rule was the thing that was wrong, and it has been cut. A character whose face the reader never sees for three volumes is not a character, and Ottie carries four spreads of her own. **The jam that Felix spends two hours on in Volume 3 is now the right SHOULDER PLATE, not the helmet** — which is also the shoulder Tovar has both hands on in this very plate.

**The dent is on her RIGHT shoulder.** The inventory in Part Three claims the left, and that disagreement is deliberate and load-bearing — see roster section 4.3a. Draw the right.

Prompt:

```
{{STYLE}}
{{LOC:OLD_BELL_ROAD}}
{{CHAR:OTTIE}}
{{CHAR:TOVAR}}
A stand-off in the middle of a two-lane rural road that has been going on for hours and is not going to end.
A large sand-coloured military cargo truck with canvas over its bed is STOPPED at a slight angle across its own lane, close enough that its front bumper is only a couple of feet from the figure in front of it. Its front wheels are turned and its nearside front tyre is off the asphalt and up on the gravel shoulder, exactly as far as it can go before the ditch: it has been trying to get around her and it has just backed off from the attempt. Tyre tracks scuff both shoulders. The cab is empty of anybody identifiable and no face in it is readable.
DAME OTTILIE stands directly in front of the bumper in a full suit of plate armour, planted, feet apart, arms relaxed at her sides, holding no weapon of any kind. **SHE WEARS NO HELMET and her face is fully visible and clearly readable** — she is a character and the reader has to be able to read her. Her expression is patient and mildly apologetic and not remotely strained. **There is a shallow dent in the RIGHT shoulder plate.** She is not braced and not straining. She is simply standing there, and she has clearly been standing there a long time.
SPECIALIST TOVAR has both gloved hands flat against her upper arm and shoulder and has put his whole shoulder and weight into shoving her sideways off the road. His boots are slipping on the asphalt behind him, his back is bent into it and his face is red with effort. **She has not moved at all** and nothing about her posture acknowledges him. His rifle is slung across his back, out of his hands.
Exactly two people in frame and no others.
Middle of the day, bright and dry.
Wide action shot from the road at standing height and slightly low, side-on to the stand-off so the truck fills one side of the frame, Ottie and Tovar are central, and BOTH gravel shoulders and the ditch beyond them are visible — the width of the road is part of the story. Everything sharp.
Flat bright daylight, no drama, both faces and the armour clearly readable.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A bare-headed girl in a full suit of plate armour stands immovable in front of the bumper of a military truck on a rural road, entirely unbothered, while a soldier puts his whole weight into her shoulder and slides on the asphalt without shifting her.

---

## Spread 5

Pages 11 to 12 | Part Two: Four Out Of The Trunk | Words 207

### Text page (left), verbatim

### The Warehouse, Two PM

“So they’re friendly,” Felix said.

“They knocked out four soldiers,” Owen said.

“Politely, though.”

“Felix.”

“I’m tracking the data. Four people, four completely different skills, all of them the best in the world at exactly one thing, all of them apologizing constantly.” Felix looked around the room. “Where have we seen that before?”

“Don’t,” Owen said.

“I’m saying it’s us. You’re the one who reads, I’m the one who builds, Vex gets into places she shouldn’t. It’s us with better outfits.”

Vex didn’t look up from the dashcam mount she was rebuilding. “I’d wear the armor.”

“You’d love the armor.”

“I’d never take it off.”

Lena had her laptop open with nine tabs of footage on it. “Nobody’s hurt, though. That’s what I keep getting stuck on. Thirty-one armed people, a girl with a bow, eight hours, and not one injury.”

“Because they’re not fighting,” Milo said. He’d been standing in the same spot for ten minutes, which for him counts as pacing. “Fighting is what you do when you want to win, and they’re not trying to win. They’re trying to make the soldiers stop being here. That’s a different job with different rules.”

“So who told them that’s the job?”

### Image page (right)

Slug: u2-s05
Shot type: Character group, high angle
Depicts: Beats 6 to 9. Felix works out that the four of them are the four of us with better outfits, and Vex, without looking up from the dashcam mount she is rebuilding, says she would wear the armour.
Spoiler check: PASS. Final beat of the page is “So who told them that’s the job?” Not depicted: nobody is asking a question, Milo’s mouth is closed and no face is turned to him.

**Shot from directly above, which the book has not done once.** Part One spent five consecutive plates in the Warehouse at eye level or below, and this volume has four Warehouse spreads. Three of them run back to back here, so each gets a camera the reader has not seen: this one overhead, spread 6 from the floor looking up, spread 7 close and moving.

**No legible screen content**, per the negative block: the laptop is open but angled away from camera so its screen is not visible at all.

Prompt:

```
{{STYLE}}
{{LOC:WAREHOUSE_PIT}}
{{CHAR:FELIX}}
{{CHAR:VEX}}
{{CHAR:LENA}}
{{CHAR:MILO}}
{{CHAR:OWEN}}
FIVE named figures around a low scarred coffee table, seen from DIRECTLY ABOVE. **All five must be present and each must be identifiable from the top down** — check that the girl with bright mint-green hair in two messy buns is in the frame.
The table top is the centre of the picture and it is covered: a part-dismantled dashcam mount with its bracket, screws and a small screwdriver laid out in a neat row, a laptop open with its screen turned AWAY from the camera so nothing on it is visible, several dented drink cans, and a mug.
VEX sits on the floor at one side of the table, cross-legged, bent over the dashcam mount with both hands working on it and her head DOWN — she is not looking up at anybody and she is talking without looking up.
FELIX is on the edge of a couch leaning in over the table with both hands spread, mid-realisation, head up and turned to the others.
LENA sits back on a couch behind her laptop with one hand on its edge, looking across at Felix.
OWEN sits on a second couch with his arms folded, looking at Felix with flat scepticism.
MILO stands, and is the only one standing, at the far edge of the table with his hands in his pockets, seen from above as a foreshortened figure. His mouth is closed.
Exactly five people in frame. No animals.
Two in the afternoon, warm daylight from the high windows.
HIGH ANGLE looking straight down from above the coffee table, camera perhaps eight feet up, so the table and the five of them read as a flat arrangement of shapes and every face is visible tipped up toward the lens. Nothing cropped and everything sharp.
Warm even overhead daylight, no drama, every face readable.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: Seen from directly above, five teenagers around a low table covered with tools, a laptop and drink cans, one of them cross-legged on the floor working on a dismantled camera mount without looking up while another leans in mid-realisation.

---

## Spread 6

Pages 13 to 14 | Part Two: Four Out Of The Trunk | Words 241

### Text page (left), verbatim

“Nobody did, and that’s what’s bothering me.” He looked over at the stool. “Pip. You said it stopped.”

Pip had been quiet all day, with her hands flat on her knees again.

“I said it stopped talking,” she said. “I did not say it stopped.”

### What Pip Worked Out

“It does not make things up,” Pip said.

“Make what up?” Owen said.

“Any of it. Not the road, not the bookstore, not the knee.” She stood up all at once, the way she does, without any of the small movements people make first. “I have been listening to it for two months and I kept thinking it was inventing things. It has never invented anything. It works to spec.”

Owen’s chair stopped turning. “Say that again.”

“It finds the instructions for a thing, and then it makes the thing match the instructions. Main Street came back because there are engineering drawings for Main Street in the county archive. Your fence went up because the Army wrote down how tall a fence should be.” She looked at him. “You already knew this. You said it yesterday and then you moved on.”

“I said it about a fence.”

“It is the same for people. Mr. Henderson has forty years of medical charts, and a chart says what a knee is supposed to do. Cassie had a hearing test on file, and the numbers on it said her hearing should not be zero.”

### Image page (right)

Slug: u2-s06
Shot type: Character, single figure
Depicts: Beat 3. The bookshop — one of the three things Pip lists as never having been invented. A shop with forty years of wear in it, in a unit that was empty last week.
Spoiler check: PASS. Final beat of the page is the line about Mr Henderson’s forty years of medical charts and Cassie’s hearing test. Not depicted: **Henderson is not in frame and neither is Cassie**, no chart or document appears, and nothing about a person being repaired is shown.

**Recast out of the Warehouse on author instruction, 2026-08-02.** Eight of the first twenty-three plates of this arc were set in that one room, which is over a third of it. This spread is warehouse dialogue, so the plate does what u1-s09 did and cuts away to the thing being talked about.

**Anchored to Pip’s own list**: *“Not the road, not the bookstore, not the knee.”* The bookshop is the most drawable of the three and the only one that is a place. The road is Main Street, which the reader has already had, and the knee belongs to the page’s final beat and is therefore out.

**The unsettling thing is that nothing is unsettling.** The shop is not glowing or wrong or half-finished. It is perfectly ordinary and perfectly settled, and it is one week old. The woman in it has no idea and neither would you.

Prompt:

```
{{STYLE}}
{{LOC:HOLLOW_PINE_INT}}
{{CHAR:GREEN_CARDIGAN_WOMAN}}
The interior of a long-established second-hand bookshop in the middle of an ordinary quiet afternoon, with exactly ONE person in it.
Everything in the room has been here for decades and looks it: floor-to-ceiling wooden shelving packed unevenly with worn books, overlapping rugs gone thin on board floors, a wooden counter with a low lamp on it, warm fabric lampshades, a stack of cookbooks on the floor beside the counter with a high shelf above it.
THE WOMAN IN THE GREEN CARDIGAN is halfway up a short two-step wooden stool with one hand steadying herself on a shelf edge and the other sliding a book into a gap at eye level, head tipped to read the spines beside it, entirely absorbed and entirely at home. She is not startled, not posing and not looking at the camera. This is a woman doing the small job she does every afternoon.
A second book is tucked under her arm, waiting its turn.
Exactly one person in frame. No other figure and no animal.
Mid-afternoon, quiet.
Medium shot from inside the shop at standing height, angled so the depth of the shelving runs away behind her and the counter and the cookbook stack are both in frame. She is off-centre and the room shares the picture with her. Everything readable.
Warm low interior lamp light plus soft daylight from an unseen shopfront window, calm and completely undramatic. No lettering legible anywhere, on any spine, sign or label.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: Inside a settled second-hand bookshop, a woman in a green cardigan stands on a small step stool sliding a book back into a packed shelf, another book under her arm, entirely at home.

---

## Spread 7

Pages 15 to 16 | Part Two: Four Out Of The Trunk | Words 227

### Text page (left), verbatim

The room went quiet. Even the duck.

Lena said it slowly, because she wanted to have it right for later. “So it isn’t magic. It’s a repair guy with a manual.”

“Yes.”

“And it can only fix the things somebody bothered to write down.”

“Yes. That is the whole shape of it.”

Vex set the dashcam down. “Then somebody wrote those four down.”

“Somebody wrote those four down.”

“Who writes down a boxer, an archer, a knight and a witch?”

“A high school does,” Pip said. “Once a year, for forty-one years, with a program printed up for the parents.”

Felix put a hand over his mouth.

“The auditorium,” Milo said.

“The wardrobe room under the stage. There is a typed inventory on the wall in a plastic sleeve, two hundred and six items, and I need to read it.” Pip paused. “That is a problem, because it is inside a nine-foot fence with thirty-one soldiers on the other side of it.”

Vex was already off the counter and pulling her jacket on. “There’s a boiler hatch on the north side, behind the dumpster pad. It comes out in the basement hall about forty feet from that door.”

“How do you know that?” Owen said.

“Because I used to smoke behind it in ninth grade. I’m not proud of it and I’m absolutely going to use it.”

### Image page (right)

Slug: u2-s07
Shot type: Character action, single figure
Depicts: Beat 8. A high school does — once a year, for forty-one years. The corridor where all forty-one of them are hanging on the wall, and a soldier walking past without looking at any of them.
Spoiler check: PASS. Final beat of the page is Vex’s answer about ninth grade. Not depicted: none of the crew is in frame, there is no boiler hatch, no dumpster pad and no wardrobe room, and nothing about how anybody gets in.

**Recast out of the Warehouse on author instruction, 2026-08-02**, for the same reason as spread 6. Part Two now has two Warehouse plates rather than four.

**This is the arc’s actual subject in one frame.** Everything that has happened in this town happened because somebody wrote it down and then nobody read it again. Forty-one years of school plays are hanging in a corridor in the building the Army is currently occupying, the answer to the whole thing is four feet from a soldier’s shoulder, and he is carrying a mug past it.

**No location token.** The corridor has no roster entry, appears once, and is described inline — so there is no reference to contradict a busy frame.

**No legible text anywhere**, which the negative block requires and which costs nothing here: the point reads from the repetition of costumes down the wall, not from the names under them.

Prompt:

```
{{STYLE}}
A long corridor inside a closed 1960s elementary school, lined down one whole wall with FRAMED PHOTOGRAPHS hung in a single level row that runs away from the camera into the distance — forty or so of them, one after another, evenly spaced, in mismatched cheap frames.
Each photograph is a small group portrait of schoolchildren in home-made costumes standing on a stage in front of a curtain, and each one is a different year: the paper stock changes down the row from cool modern colour at the near end through faded warm colour to grainy black and white at the far end. **Costumes repeat down the wall from year to year** — in several of them a child in armour, in several a child with a bow, in several a pointed hat — worn by different children each time. Small blank plaques under the frames carry no readable writing.
Walking down the middle of the corridor toward the camera, ONE SOLDIER in an olive field jacket, alone, holding an enamel mug in one hand and a clipboard tucked under the other arm, mid-stride and entirely unhurried. **He is not looking at the photographs at all.** His head is turned very slightly away from them and his expression is bored and comfortable. He has walked past this wall a dozen times today.
The corridor itself: scuffed grey vinyl tile with a worn path down the middle, painted cinderblock walls, a row of low coat hooks at child height along the opposite wall, and at the far end a set of doors with their glass boarded over with plywood so the light there is dim.
Exactly one person in frame. No animals and no other figure.
Mid-afternoon.
Medium shot down the length of the corridor at standing height, so the row of frames recedes hard away on one side and the soldier is walking into the near half of the frame. The receding row of photographs must be the strongest line in the picture. Deep focus, both the soldier’s face and the nearest several photographs clearly readable.
Plain overhead fluorescent light with daylight leaking from a doorway at one side, flat and undramatic. Nothing falls to featureless black.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A soldier walks down a closed school corridor carrying a mug, not looking at the long receding row of framed photographs beside him showing forty years of school plays, the same costumes recurring on different children.

---

## Spread 8

Pages 17 to 18 | Part Two: Four Out Of The Trunk | Words 198

### Text page (left), verbatim

### Windbreakers

The Mayor called a press conference for four o’clock and titled it a Community Introduction.

Lena filmed it, because she’s the only press this town has, and she got her spot behind the chairs again.

Behind Dalton, on the steps, was a folding table with four royal blue windbreakers laid out on it. The back of each one said MILLBROOK VOLUNTEER SAFETY AMBASSADORS in white heat-pressed letters.

“My fellow citizens. As some of you may have noticed, several enthusiastic residents have taken it upon themselves to help with public safety during the inspection period. I’m proud to announce that this office now officially recognizes these individuals, and that they’ll be marching in the Spring Days parade on the twelfth.”

“Mr. Mayor,” Lena said. “Have you met them?”

“I’ve met the concept of them.”

“So that’s a no.”

“Next question.”

“One of them knocked out a federal soldier on Route 9 this morning.”

“Rendered him safely horizontal,” the Mayor said, “is my understanding.”

Off to the side of the stage, Crane turned his head and looked at the Mayor for the first time in two days. It wasn’t a long look and it didn’t have to be.

### Image page (right)

Slug: u2-s08
Shot type: Character group, over-the-shoulder
Depicts: Beats 3 and 4. Four royal blue windbreakers laid out on a folding table behind the Mayor while he officially recognises four people he has never met.
Spoiler check: PASS. Final beat of the page is Crane turning his head to look at the Mayor for the first time in two days. Not depicted: **Crane is not in frame at all.**

**Shot from behind the Mayor on the steps**, looking out over the square. Part One already used this location twice from in front, and the point of this scene is what is on the table behind him, which the audience cannot see and the reader can.

**State the occupancy explicitly.** `loc-square.png` is an empty square with empty rows of chairs; the crowd and the podium have to be named or the plate returns empty. See CLAUDE.md.

**No lettering on the windbreakers.** The prose puts MILLBROOK VOLUNTEER SAFETY AMBASSADORS across the back of each one in heat-pressed letters, and the negative block forbids text in an image. Same arrangement as Rocco’s GOLDEN GLOVES and Wren’s stencil: it lives in the prose.

Prompt:

```
{{STYLE}}
{{LOC:TOWN_HALL_SQUARE}}
{{CHAR:MAYOR_DALTON}}
{{CHAR:LENA}}
THE SQUARE IS OCCUPIED AND THE PRESS CONFERENCE IS IN PROGRESS. The attached location image shows this square EMPTY and it is not empty here: about twenty ordinary townspeople are SITTING in the rows of grey metal folding chairs below the steps, seen from behind and above.
Camera is BEHIND AND ABOVE THE MAYOR, up on the steps looking out over his shoulder into the square.
IN THE NEAR FOREGROUND, sharp and taking up the lower part of the frame, a plain folding trestle table on the steps with FOUR identical ROYAL BLUE nylon windbreakers laid out flat and folded on it, side by side, backs upward. They are brand new, creased from the packet, and completely blank — no lettering, no numbers, no badge and no logo of any kind.
THE MAYOR stands just beyond the table at a plain wooden podium, seen from behind and three-quarters so a slice of his face is visible as he turns, one arm out in a broad generous flourish toward the seated crowd, plainly enjoying himself.
BEYOND HIM AND BELOW, the seated townspeople in their rows, and behind the last row LENA stands at a video camera on a tripod with both hands on it, filming — small in the frame but clearly her, and clearly the only press there.
No other named figure is in frame.
Four in the afternoon, low warm light.
Over-the-shoulder wide from up on the steps, the four blue windbreakers dominant and sharp in the near foreground, the Mayor mid-gesture in the middle distance and the crowd and Lena beyond. Deep focus.
Low late-afternoon sun across the square, warm, no drama, faces readable.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: From behind a mayor on the town hall steps, four brand-new royal blue windbreakers lie folded on a trestle table while he gestures out at a small seated crowd, and a girl films him from a tripod behind the last row.

---

## Spread 9

Pages 19 to 20 | Part Two: Four Out Of The Trunk | Words 229

### Text page (left), verbatim

That night Lieutenant Pace filed for two more squads and a specialist team. Crane signed it and added one line at the bottom in his own handwriting, which Owen would get a look at eventually. It said: Not for the costumes. For the town.

Nobody ever put on a windbreaker. Ottie tried, over the armor, and it didn’t fit, and she was more upset about that than Vex could stand to watch.

### The Split

They sorted it out at nine that night, an hour before curfew, with the fan clicking and the dragon asleep on the router.

“Under the school,” Milo said. “Vex, Pip, Owen.”

“Why me?” Owen said.

“Because Pip can read whatever’s on that wall and you’re the only one who’ll understand what it means. Vex gets you in and gets you back out.”

“I don’t like being outside.”

“I know you don’t.”

“I want that written down somewhere.”

“It’s written down.”

“And the three of us up here do what?” Lena said.

“Keep anybody from getting killed.” Milo picked up his coffee, looked at it, and put it back down without drinking any. “Crane just asked for more people. That’s not a man who thinks he’s losing. That’s a man who’s decided the four of them aren’t the problem. Felix, I need you to build me something that looks expensive.”

“Looks expensive.”

“Looks. Not is.”

### Image page (right)

Slug: u2-s09
Shot type: Character group, night
Depicts: Beats 5 to 8. Nine at night, an hour before curfew: Milo splits them into two teams and Owen objects to being one of the three going out.
Spoiler check: PASS. Final beat of the page is “Looks. Not is.” Not depicted: Felix has not been asked to build anything, he is not in frame, and nothing is being described or held up.

**The fourth Warehouse spread of the volume, and deliberately the only night one.** Warm single-lamp light instead of daylight from the high windows, which makes it a different room to look at.

**Cast held to four plus the dragon.** Lena and Felix both speak on this page and are both out of frame, because a crowded plate sheds figures and this one has to hold Vex. Lena is covered by spread 5 and spread 8, Felix by spread 5.

**The dragon is the foreground.** It is asleep on the router, which is where the prose puts it, and it is the only thing in the picture that does not care.

Prompt:

```
{{STYLE}}
{{LOC:WAREHOUSE_PIT}}
{{CHAR:MILO}}
{{CHAR:OWEN}}
{{CHAR:VEX}}
{{CHAR:PIP}}
{{CHAR:DRAGON}}
Nine at night in the warehouse lounge, lit by one work lamp and nothing else, the high windows black. Four people and one small animal.
IN THE NEAR FOREGROUND, slightly out of the way and sharp, the MINI DRAGON lies asleep and curled on top of a plain internet router on a low wall shelf, tail hanging straight down, entirely uninterested.
MILO stands at the centre with one hand just lifted off a coffee mug he has set back down on the table without drinking any of it, the other hand low and open, mid-assignment. He is the one talking and he is completely level about it.
OWEN sits forward on the edge of a couch with both forearms on his knees, looking up at Milo with an expression of flat dismay, mouth open on an objection.
VEX stands with her arms folded and her weight on one hip, already fine with it, watching Owen rather than Milo, faintly enjoying his objection. **Her bright mint-green hair in two messy buns must be plainly visible.**
PIP stands a little apart from the three of them, upright and still, hands at her sides, head level, waiting.
An old floor fan turns slowly in one corner.
Exactly four people and exactly one animal in frame.
Nine at night, an hour before curfew.
Medium group shot at seated height, the dragon and the router sharp in the near foreground at one edge, the four of them gathered in the warm pool of lamp light beyond. Every face readable.
ONE warm work lamp as the only light source, low and pooled, with the corners of the room dim but never featureless: faces, the dragon and the fan all stay clearly readable.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: Late at night in a warehouse lounge lit by a single lamp, a small orange dragon sleeps on a router in the foreground while a boy assigns tasks, another protests from the edge of a couch, a girl with green hair looks on amused and a robotic girl waits apart.

---

## Spread 10

Pages 21 to 22 | Part Two: Four Out Of The Trunk | Words 128

### Text page (left), verbatim

Felix lit up. “Oh, I’m good at that. How expensive are we talking? School play expensive, or car dealership commercial expensive?”

“The second one.”

“Milo, I’m going to make you cry.”

“Lena, I need your channel. Not tonight, tomorrow. And I need you to trust me about what order things go in.”

“That’s a big ask.”

“It is.”

“I’ll do it, but I want it on the record that it was a big ask.”

“It’s on the record.”

Curfew hit at ten. The streetlights on Crescent stayed on and every window in town went dark right on schedule, because when this place gets asked for something it hands it over.

At twenty to midnight, three kids went through a fence.

*To be continued in Part Three: The Inventory*

### Image page (right)

Slug: u2-s10
Shot type: Character action, night
Depicts: Beat 7. At twenty to midnight, three kids go through a fence.
Spoiler check: PASS. Final beat of the page is the to-be-continued line. Not depicted: nothing of Part Three. They are still outside the building, the boiler hatch is SHUT, and no interior of any kind is visible.

**This is Part Two’s closing image and it must leave Part Three its own opening.** The hatch stays shut and unopened in this plate. Part Three opens on the basement hall with two torch beams on the tile, and that is a different picture — whoever commissions Volume 3 should not repeat the fence.

**The location reference is a DAYLIGHT camp and this is midnight.** Attach `loc-old-school-camp.png` for the fence line, the dumpster pad and the geometry only; the hour is stated below and overrides it. The fence turning around the outer edge of the concrete, which puts the hatch inside, is the whole reason this route exists.

Prompt:

```
{{STYLE}}
{{LOC:OLD_SCHOOL_B}}
{{CHAR:VEX}}
{{CHAR:PIP}}
{{CHAR:OWEN}}
TWENTY MINUTES TO MIDNIGHT. The attached location image is the same place in daylight; this is the same fence and the same concrete pad at night and the hour below governs.
The north side of the school property: a nine-foot chain link fence with green privacy slats woven through it, and just inside it the rectangular concrete dumpster pad with two dumpsters standing on it. **The fence runs along the OUTER edge of that concrete and turns around it**, so the pad is on the protected side.
At the base of one fence panel the chain link has been prised up off the ground into a low triangular gap about two feet high, and three figures are going through it one at a time.
VEX is already inside on the concrete, crouched on one knee with both hands holding the lifted mesh up and back, head turned to watch the other two come through, wholly in her element. **Her bright mint-green hair in two messy buns must be plainly visible.**
PIP is halfway through the gap, low and flat and moving with complete precision, one hand and one knee on the concrete, her head level.
OWEN is still outside on the grass, down on both knees at the mouth of the gap with his shoulders hunched, plainly hating every part of this and going anyway.
Set FLUSH in the concrete of the pad a short distance beyond them, a pair of low steel boiler hatch doors lying almost flat to the ground. **They are CLOSED and nobody is touching them.** No opening, no gap and no light coming out of them.
Exactly three people in frame. No soldiers, no tents and no animals, and no interior of any kind.
Twenty to midnight, no moon.
Low close action shot from outside the fence at about knee height, angled along the gap so all three figures and the closed hatch beyond are in one frame. Everything sharp.
Night, but readable: a single distant floodlight somewhere off the frame edge rakes low across the concrete and the slats and picks out all three faces and the closed hatch. Cool and quiet. No part of the frame falls to featureless black and there is nothing dramatic in the lighting.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: At night, three teenagers slip one at a time under a lifted panel of a nine-foot slatted fence onto a concrete pad beside two dumpsters, a closed pair of steel hatch doors lying flat in the concrete beyond them.

---
