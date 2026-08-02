# The Understudies, Volume 1: Flip Book Spec

Source: `The_Understudies_Part_1_V3.docx`  
Chapter: Part One: Curfew  
Spreads: 12 (11 text spreads plus 1 chapter opener) | Images: 12 | Words: 2463  
Spec version: 1 | Date: 2026-07-31

Style, negatives, characters, locations and wardrobe states live in `PATCH_NOTES_FLIPBOOK_ROSTER.md`, which is the single source of truth for the series. Do not restate any of it here and do not describe a locked character or location inline. Tokens only.

## Shot mix, this volume

Images: 12. Character-led 8, establishing 3, detail 1.

Set deliberately against arc one's band on author instruction: character-forward and action-forward, because the images have to make an impact rather than catalogue rooms. Three real establishing shots are kept and spaced (the opener, the fence at spread 4, the wardrobe room at spread 11) because this arc's premise is a thing about a PLACE — an army parked on a town — and pure close work cannot carry it.

Every plate depicts a beat from its own text page and never that page's final beat, which is the same rule all forty-two arc-one plates follow.

Page budget, for whoever edits this next. Chunked with the model in `WRITING_GUIDE.md` at an ideal of 28 lines: 11 text pages running 24 to 27 lines, which is 70 to 78 per cent of the column. Arc one's median page is 76 per cent and its ceiling is 32 lines.

---

## Spread 0, chapter opener

Renders differently: one full bleed image across both pages with the chapter title set over it. No prose on this spread.

### Title block (typeset over the image, not generated into it)

# WELCOME TO MILLBROOK

*A Digital Slop Story*

## The Understudies

### Part One: Curfew

### Image, full bleed across both pages

Slug: u1-opener
Shot type: Establishing (full bleed, both pages)
Depicts: Millbrook the morning it stops being ordinary, before anything arrives. No story beat.
Spoiler check: PASS. A chapter opener precedes all prose. Deliberately shows neither the trucks, the school, nor the new fence — the trucks are beat 1 of text page 1 and the fence is the reveal on text page 4.

Prompt:

```
{{STYLE}}
{{LOC:MILLBROOK_WIDE}}
A small flat town of low single-storey houses on a grid of wide streets, mature trees between them, a water tower on the horizon. Empty streets, no vehicles and no figures anywhere.
Six in the morning, first light, long low sun.
Wide establishing shot from a slight elevation, deep focus, level horizon.
Low warm early sun raking across the grid from one side, long soft shadows, clear and readable everywhere.
{{NEGATIVE}}
Aspect ratio: 2:1
```

Alt text: A small town of low houses on a grid of wide streets at first light, empty of people, a water tower on the horizon.

---

## Spread 1

Pages 3 to 4 | Part One: Curfew | Words 243

### Text page (left), verbatim

### Six Trucks

The trucks came down Main at six in the morning, which was a bad time to sneak into Millbrook, because that’s when Ida Prewitt walks her beagles.

There were six of them, sand-colored, with canvas over their backs. They took the turn at Crescent and Main without slowing down and drove straight through the gate of the old elementary school. The gate had been padlocked since the Great Event and now it wasn’t.

Ida Prewitt waved as they went by. Two soldiers waved back.

Lena watched the last one go by from her aunt’s front steps with her hair still wet. She called Vex before the rumble of the vehicles had even faded.

“You seeing this?”

“I’m on a roof,” Vex said.

“Which roof? Should you be there? Is it safe?”

“Thanks for worrying but it’s fine. Nobody saw me and nobody will. I’m on top of the hardware store and can see the field and the trucks and the tents they’ve put up already.” There was a pause. Lena waited. “I see six trucks, a generator and a whole lot of military grunts who didn’t drive here to catch a movie.”

“You can spy on them later. I need to set up for the Mayor’s press conference. Round up the troops and meet me there.”

“Whatever. Just bring the good camera,” Vex said, and hung up on her, which was how Vex ended every phone call with Lena recently.

### Image page (right)

Slug: u1-s01
Shot type: Character action
Depicts: Beat 3. Ida Prewitt waves at the convoy from the sidewalk and two soldiers wave back — the whole arc in one gesture.
Spoiler check: PASS. Final beat is Vex hanging up on Lena. Not depicted: no phone call, no roof, and neither Lena nor Vex is in frame.

Prompt:

```
{{STYLE}}
{{LOC:MAIN_STREET}}
{{CHAR:IDA}}
She stands on the sidewalk with her two beagles on their lead, one hand raised in a small unhurried wave, entirely unbothered, as a column of six sand-coloured military cargo trucks with canvas over their beds rolls past her down the middle of the street. From the back of the nearest truck two soldiers in olive field jackets raise a hand and wave back at her. Nobody else is on the street.
Six in the morning, first light.
Medium wide, camera at standing height on the opposite sidewalk, the trucks crossing the frame and Ida small but unmistakable against them.
Low warm early sun down the length of the street, long shadows, every face clearly readable.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: An older woman with two beagles waves from the sidewalk as a column of military trucks drives past her at dawn, and two soldiers wave back.

---

## Spread 2

Pages 5 to 6 | Part One: Curfew | Words 235

### Text page (left), verbatim

### The Announcement

Mayor Dalton called a press conference for ten o’clock on the Town Hall steps. Twenty-two people showed up, which in Millbrook is a mob.

Lena set her tripod behind the chairs where the light was good. She’d figured the spot out at the Mayor’s last appearance and didn’t want to give it up to anybody.

The whole crew was there. Milo, Owen and Felix stood at the back. Vex was up on the low wall by the flagpole with her boots hanging off it, eating an apple she probably hadn’t paid for. And Pip was away from the crowd but watching and listening like only Pip could do.

“Good morning,” the Mayor said. “I want to start by welcoming our friends from the federal government, who are here at my invitation to conduct a routine infrastructure inspection.”

“That’s a lie,” Owen said.

“Which part?” Felix asked.

“All of it. There’s no such thing as a routine federal infrastructure inspection. I looked it up. Nothing like that exists, but even if it did, it wouldn’t make sense to do one here.”

“Effective immediately,” the Mayor said, “and out of an abundance of caution, we’ll be observing a temporary curfew from ten at night to five in the morning. And Route 9 and Old Bell Road will have brief checkpoint delays. This is not cause for alarm, but rather a cause to be confident.”

### Image page (right)

Slug: u1-s02
Shot type: Character group
Depicts: Beat 3. The whole crew arranged around the press conference, each of them doing the thing they do — before the Mayor says anything worth hearing.
Spoiler check: PASS. Final beat is the curfew announcement. The Mayor is at the podium but the crowd is unreacted and nothing about a curfew is legible or implied.

Prompt:

```
{{STYLE}}
{{LOC:TOWN_HALL_SQUARE}}
{{CHAR:MAYOR_DALTON}}
{{CHAR:LENA}}
{{CHAR:VEX}}
{{CHAR:PIP}}
{{CHAR:MILO}}
{{CHAR:OWEN}}
{{CHAR:FELIX}}
A small press conference on the steps of the town hall. The Mayor stands at a plain wooden podium mid-sentence with one hand out. About twenty ordinary townspeople sit on rows of grey metal folding chairs, seen from behind and to one side.
The six of them are in SIX DIFFERENT PLACES doing SIX DIFFERENT THINGS, and each of the following is separately required. They must NOT be gathered together in one group, and their faces must be visible rather than turned away from camera.
(1) LENA stands behind the last row of chairs at a video camera mounted on a TRIPOD, both hands on it, filming the podium.
(2) VEX is SITTING UP ON A LOW BRICK WALL beside a FLAGPOLE, well above everyone else, with her boots hanging down off the wall and an APPLE in one hand, mid-bite. The wall and the flagpole must both be in frame.
(3) MILO, (4) OWEN and (5) FELIX stand together on their feet at the very back behind the seated rows, not sitting.
(6) PIP stands completely apart from all of them, alone, off to the far side with empty ground around her, upright and still with her head level, listening.
Ten in the morning, bright and dry.
Wide, camera slightly elevated and to one side of the seated crowd so all seven named figures and the podium are in one frame — but angled so that the six of them are seen from the FRONT or three-quarters, never from behind. A previous attempt put the whole cast back-to-camera in a single clump, which is the one thing this frame must not do.
High clear morning light, no drama, every face readable.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A mayor speaks at a podium on town hall steps to a small seated crowd while a girl films from a tripod, three boys stand at the back, another girl sits on a wall eating an apple and a robotic girl stands apart, listening.

---

## Spread 3

Pages 7 to 8 | Part One: Curfew | Words 197

### Text page (left), verbatim

“What’s he inspecting?” Felix said, too loud.

Mr. Jennings, the nice-to-everyone grocer who sponsored the local little league team, took it as his cue and put a hand up. “Mr. Mayor, inspecting what, exactly?”

“Infrastructure.”

“Which infrastructure?”

“All of it,” the Mayor said, and he smiled like he’d just solved a riddle.

Off to the side of the stage, Admiral Crane stood with his hands behind his back, a mask on and said nothing at all. He wasn’t watching the Mayor. He was reading the crowd, one row at a time, and taking his time about it. When he got to the back row, he stopped on Milo and stayed there.

“He’s looking at you,” Felix said.

“I know.”

“He’s really looking at you, Milo.”

“Felix, I know.”

“Should we go? I feel like we should go.”

“There’s nothing more we can learn here,” Owen said.

They got up from the back, trying to make their exit with as little noise as possible. Pip saw them get up and met them at the wall where Vex was sitting, still dangling her feet.

From the wall, Vex said, “Isn’t it strange that nobody’s asking about the new fence?”

### Image page (right)

Slug: u1-s03
Shot type: Character close, two-shot
Depicts: Beat 7. Admiral Crane, off to the side of the stage with his hands behind his back, has stopped reading the crowd and settled on Milo.
Spoiler check: PASS. Final beat is Vex asking about the new fence from the wall. Not depicted: Vex is not in frame, the fence is not visible, and nobody has stood up to leave.

Prompt:

```
{{STYLE}}
{{LOC:TOWN_HALL_SQUARE}}
{{CHAR:MAYOR_DALTON}}
{{CHAR:ADMIRAL_CRANE}}
{{CHAR:MILO}}
{{CHAR:FELIX}}
THE PRESS CONFERENCE IS IN PROGRESS AND THE SQUARE IS OCCUPIED. The attached location image shows this square EMPTY, and it is not empty here: about twenty ordinary townspeople are SITTING in the rows of grey metal folding chairs, and the MAYOR is standing at the plain wooden podium on the low stage, mid-sentence, small in the frame and soft. None of that is optional — a square with empty chairs and nobody at the podium is the wrong scene.
Against that, the subject of the picture: A LOOK BETWEEN TWO PEOPLE STANDING WELL APART, and the look is the entire subject of the picture. They are on OPPOSITE SIDES of the frame with the crowd between them, and they must never be standing together.
In the NEAR HALF of the frame and off to one side of the low stage, CRANE stands ALONE with nobody within several paces of him. His HANDS ARE CLASPED BEHIND HIS BACK, his medical mask is on, he is completely still, and his head is turned so that he is looking steadily ACROSS the frame at one particular person, taking his time about it.
In the FAR HALF of the frame, further back and standing at the rear of the seated rows, MILO is looking STRAIGHT BACK at Crane with his jaw set. Beside Milo, FELIX has noticed and is glancing anxiously between the two of them.
The two of them are looking directly at each other along the diagonal of the frame and the line between them is unobstructed. Nobody else in frame is aware of any of it.
Ten in the morning, bright and dry.
MEDIUM CLOSE two-shot along the line of the look — close enough that Crane and Milo each fill a substantial part of their half of the frame and both faces are large and fully readable. Crane sharp in the near half, Milo clear in the far half, the seated crowd small and soft between them. This is NOT a wide establishing shot of the square: a previous attempt came back wide with all three figures standing together in a clump at one side, which destroys the only thing this plate is for.
High clear morning light, no drama, both faces fully readable.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A masked officer stands with his hands behind his back at the side of a stage, looking steadily across a crowd at a boy at the back who is looking straight back at him.

---

## Spread 4

Pages 9 to 10 | Part One: Curfew | Words 211

### Text page (left), verbatim

Lena turned around with the camera still running. “What new fence?”

Vex pointed with the apple still in her hand. She pointed at the school that was always visible from the Town Square.

Yesterday the school property had a flimsy chain link fence around it, and yesterday that fence had a lean in it and a hole in the corner by the tennis courts that half the town had used as a shortcut. This morning it was nine feet tall, straight as a ruler, and an industrial strength level of sturdy with green privacy slats woven through it so you couldn’t see the bottom half of the school.

“That’s a two-week job,” Vex said. “They’ve been here four hours.”

“And nobody seems to have noticed,” said Pip and Milo in unison.

### Lemonade

By lunchtime, Carter’s Shoes had a sign in the window that said WE SUPPORT OUR TROOPS with a boot drawn on it in marker. The bakery started giving away coffee to anybody in uniform, and somebody started a casserole schedule. Everyone wanted to get involved in some way.

Lena tried to film a segment from outside the hardware store but gave up after the third person walked into her shot to tell her how nice the soldiers were.

### Image page (right)

Slug: u1-s04
Shot type: Establishing or location
Depicts: Beat 3. The new fence: nine feet, dead straight, green slats, thrown up around the school in four hours.
Spoiler check: PASS. Final beat is Lena giving up on filming outside the hardware store. Not depicted: no camera, no hardware store, and none of the lemonade section.

Prompt:

```
{{STYLE}}
{{LOC:OLD_SCHOOL_B}}
{{CHAR:VEX}}
{{CHAR:LENA}}
The old elementary school seen across open ground from the edge of the town square, with the new fence running the whole width of the frame in front of it: nine feet tall, dead straight, taut industrial chain link with green privacy slats woven through it so the bottom half of the school is screened away. It is conspicuously newer and better made than anything else in the frame. Small in the near foreground and seen from behind, Vex stands pointing at it with an apple still in her hand, and Lena stands beside her holding a camera down at her side, both of them dwarfed by it.
Late morning, bright and dry.
Wide establishing shot, camera at standing height, the two figures small in the lower corner and the fence and school filling the frame.
Flat clear daylight, colour dry and dusty, the green of the slats the strongest colour in the frame.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: Two girls stand small in the foreground looking at a brand new nine-foot fence with green slats that runs the width of the frame in front of a closed school.

---

## Spread 5

Pages 11 to 12 | Part One: Curfew | Words 194

### Text page (left), verbatim

“You should do a story on them,” said a woman in a Millbrook Days sweatshirt. “Maybe focus on how helpful they’ve been and how we’re so happy that our infrastructure is being inspected.”

“What infrastructure do you think needs to be inspected?”

“All of it.”

“That doesn’t make any sense. People just repeating what the Mayor said is bugging me.”

“Well, that’s a funny thing to be bugged about,” the woman said, and patted her arm, and left.

Lena went home and found her aunt in the kitchen filling a thermos.

“What are you doing?”

“It’s hot out. I’ve made some nice, cool lemonade for the troops.”

“Aunt Carol, they’re blocking the road out of town.”

“Then they’re doing it in the sun.” Aunt Carol screwed the lid on. “Thirty-one years I’ve lived here, honey, and we’re finally getting a little attention.”

“From the military? That’s not good attention. That’s attention that should scare you.”

“At my age there’s not much to be scared of.” She handed over the thermos. “You’re carrying it.”

“I’m not carrying it.”

“You’re carrying it and you’re going to do it smiling.”

Lena carried it but she didn’t smile.

### Image page (right)

Slug: u1-s05
Shot type: Character close, two-shot
Depicts: Beat 7. Lena comes home and finds Aunt Carol in the kitchen filling a thermos for the soldiers.
Spoiler check: PASS. Final beat is Lena carrying the thermos without smiling. Not depicted: the thermos has not changed hands and nobody has left the kitchen.

Prompt:

```
{{STYLE}}
{{LOC:AUNT_CAROL_KITCHEN}}
{{CHAR:AUNT_CAROL}}
{{CHAR:LENA}}
Aunt Carol stands at the counter, entirely at ease, pouring lemonade from a glass jug into a tall steel vacuum thermos, with a bowl of cut lemons beside her. Lena has just come in and stopped in the kitchen doorway with her bag still on her shoulder, arms folded, watching her aunt do it with an expression of complete disbelief. Neither of them is touching the other and neither is shouting.
Early afternoon, hot outside.
Medium two-shot across the kitchen, camera at standing height, Carol at the counter on one side and Lena framed in the doorway on the other.
Warm daylight through a kitchen window plus the overhead bulb, both faces clearly readable.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: An older woman calmly fills a thermos with lemonade at a kitchen counter while a teenage girl stands in the doorway with her arms folded, watching in disbelief.

---

## Spread 6

Pages 13 to 14 | Part One: Curfew | Words 265

### Text page (left), verbatim

### The Warehouse

The brick was holding the back door open again. Inside, the fan was doing its one job badly, the duck was standing in the middle of the floor honking at nothing, and the pig had taken the good couch.

And then there was the mini dragon. It was asleep on top of the fridge with its tail hanging down over the door handle.

Nobody knew why animals kept showing up or where they came from, especially the mini dragon. It was about the size of a house cat, rust orange with a row of red plates down its back, and it had no wings at all, which Felix said was the only good news anybody had had all year. Felix had started to keep a list on the wall of things it had set on fire. There were four things on the list before it was burned to a crisp.

“Okay,” Milo said. “What do we actually know?”

“Thirty-one people,” Owen said. He didn’t turn around. “I counted them twice off the traffic camera footage I hacked into. There’s one command tent, four squad tents, a generator, and something under a tarp that isn’t a generator.”

“Are they staying?”

“They brought a generator, Milo.”

“Fair.”

“And I found their orders.” Owen spun his chair around, which he only did when he had something good. “It’s a real unit with real paperwork. It’s filed under a training exercise out of an army base and it doesn’t say Millbrook anywhere in it. It gives a grid reference for where they’re supposed to be stationed.”

### Image page (right)

Slug: u1-s06
Shot type: Character group
Depicts: Beats 1 to 4. The Warehouse doing what it does: the brick in the door, the bad fan, the duck, the pig on the good couch, and the mini dragon asleep on the fridge.
Spoiler check: PASS. Final beat is Owen spinning his chair around about the orders. Not depicted: Owen is at his desk facing away and no document is visible.

Prompt:

```
{{STYLE}}
{{LOC:WAREHOUSE_PIT}}
{{CHAR:MILO}}
{{CHAR:OWEN}}
{{CHAR:FELIX}}
{{CHAR:PIG}}
{{CHAR:DRAGON}}
{{CHAR:DUCK}}
The lounge end of the warehouse in the middle of an ordinary afternoon. The back door stands propped open with a brick and daylight comes through it. An old floor fan turns badly in one corner. The pig lies stretched out asleep along the best of the four sagging couches, taking all of it. The duck stands on the concrete in the middle of the open floor with its bill open, honking at nothing in particular. The dragon is asleep on top of the refrigerator against the wall, curled up with its tail hanging down over the door handle. Milo stands in the middle of the floor mid-question with one hand out. Felix sits on the arm of a couch watching him. Owen is at his desk in the background with his back to the room, facing his monitors.
Mid-afternoon.
Wide, camera at standing height, taking in the couches, the fridge and the propped door in one frame.
Daylight through the open back door and the high windows plus the room lights, warm and clearly readable everywhere.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A converted warehouse with a pig asleep on a sagging couch, a duck honking on the floor and a small orange dragon asleep on the fridge, while three boys talk in the middle of the room.

---

## Spread 7

Pages 15 to 16 | Part One: Curfew | Words 225

### Text page (left), verbatim

Felix leaned over the back of the chair. “So officially they’re not here.”

“Officially they’re in a soybean field eleven miles east of us.” Owen tapped the screen. “And if they’re not officially here, nothing they do here will officially happen.”

Vex was practicing her walking handstands. Monke was doing the same. “What have you learned about the fence?”

“I found the paperwork for it.” Owen pulled up a scanned page, gray boxes and tiny numbers, the ugliest document Lena had ever seen. “Every training exercise comes with a site security plan, and the plan tells you what fence to build. Nine feet tall. Privacy slats. Green.”

Vex came down off her hands. Monke stayed up.

“Say the last part again,” Milo said.

“The plan says green.”

“So somebody read that page and then built the fence to match it,” Lena said.

“Somebody read that page four hours before the trucks got here.” Owen sat back. “The fence isn’t guarding anything. It’s a copy of a piece of paper. It’s the same as the pothole and the bookstore, except this time I have the paper it copied.”

Milo worked through it out loud. “So it isn’t keeping anybody out and it isn’t keeping anything in.”

“It’s doing their homework for them, and it turned it in early.”

“That’s worse,” Vex said.

“How is that worse?”

### Image page (right)

Slug: u1-s07
Shot type: Character action
Depicts: Beat 3. Vex practising walking handstands across the warehouse floor with Monke doing exactly the same thing beside her, while Owen works.
Spoiler check: PASS. Final beat is the "How is that worse?" exchange. Not depicted: Vex is upside down and mid-move, and no argument is legible in the staging.

Prompt:

```
{{STYLE}}
{{LOC:WAREHOUSE_PIT}}
{{CHAR:VEX}}
{{CHAR:MONKE}}
{{CHAR:OWEN}}
{{CHAR:FELIX}}
Vex is upside down in a handstand in the middle of the open concrete floor, perfectly balanced, walking on her hands with her legs straight up and one foot slightly ahead of the other, entirely casual about it. Right beside her and matching her exactly, Monke is doing the same thing on his hands, in step. Neither of them is looking at the other. In the background Owen sits at his desk with his back half turned, and Felix leans over the back of Owen's chair looking at the monitors. Nobody is watching Vex, which is the joke.
Mid-afternoon.
Medium wide at low camera height, close to floor level, so the two upside-down figures dominate the frame and the desk sits behind them.
Daylight from the high windows plus the room lights, clear and readable everywhere.
Hard constraint: the handstand is a habit, not a stunt — she must look relaxed rather than straining.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A girl walks across a concrete floor on her hands with a monkey doing the same beside her, in step, while two boys at a desk behind them pay no attention.

---

## Spread 8

Pages 17 to 18 | Part One: Curfew | Words 226

### Text page (left), verbatim

“Because a fence that wants to keep me out is a fence I can beat. I know how those work.” She pulled her sleeve down over her hand and popped the fridge open with her elbow, because the dragon was still on the handle. “This one isn’t even thinking about me. You can’t argue with something that isn’t looking at you.”

Felix stared at her. “That is the smartest thing you have ever said.”

“I know. I’ve been saving it.”

### What The Wires Are Asking

Pip had been sitting on the milk crate stool for forty minutes without moving, and that part was normal. What wasn’t normal was that she had stopped in the middle of a sentence. The sentence was “Vex, your left shoe has a nail coming through the,” and that was nine minutes ago.

Vex crouched down in front of her with her hands on her knees and didn’t touch her, because they’d talked about that.

“Pip.”

“Yes.”

“You stopped.”

“The wires are busy.” Pip’s eyes came back to the room all at once, the way a page turns. “It has been talking since six o’clock this morning and it has not stopped. It has never done that before.”

“What’s it saying?”

Pip tilted her head, and everybody in the Warehouse shut up, because they’d learned what that meant. Even the duck.

### Image page (right)

Slug: u1-s08
Shot type: Character close, two-shot
Depicts: Beat 6. Vex crouches down in front of Pip with her hands on her knees and does not touch her, because they had talked about that.
Spoiler check: PASS. Final beat is Pip tilting her head and the whole room going quiet. Not depicted: Pip's head is level and nobody else has reacted.

Prompt:

```
{{STYLE}}
{{LOC:WAREHOUSE_SHOP}}
{{CHAR:VEX}}
{{CHAR:PIP}}
Pip sits on a milk crate used as a stool, upright and completely still, hands resting on her knees, her head level and her eyes open but focused on nothing in the room. Vex has crouched down on her heels directly in front of her, forearms across her knees, hands hanging loose and deliberately not touching her, looking up into her face with real concern and no alarm. The two of them are close and alone in the frame. Nobody else is in shot.
Mid-afternoon.
Close two-shot at crouching height, the two faces near the centre of the frame and the room falling away soft behind them.
Soft indirect daylight from high windows, warm and quiet, both faces fully readable.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A girl crouches in front of a seated robotic girl with her hands on her own knees, carefully not touching her, looking up into her face.

---

## Spread 9

Pages 19 to 20 | Part One: Curfew | Words 260

### Text page (left), verbatim

“It is asking what soldiers are.”

Lena set her phone face down on the arm of the couch, which for Lena was a bigger deal than anybody in the room understood.

“It doesn’t know?” Milo said.

“It knows the word. It read the word this morning off eleven phones, a police scanner and the checkpoint sign out on Route 9.” Pip put her hands flat on her knees, too even, the way she does. “It does not know what they are for. It is asking me what they are for.”

“What did you tell it?”

“I have not answered.”

“Pip.”

“I am being careful. The last time I explained something to it, a fifteen-year-old girl woke up able to hear a wasp inside a wall.” Her voice didn’t go up, because it never does. “I have been sitting here for forty minutes trying to write one sentence.”

Owen turned all the way around in his chair. “What else is it saying?”

“It says the town tastes different, and that is the closest word I have, because it does not have a word.” She paused. “It feels the whole town at once, the way you feel a room you are standing in. This morning the room changed and it wants to know why.”

“It’s scared,” Felix said.

“It does not get scared. The town does, and the town is the only way it knows how anything is going.”

Milo sat down on the edge of the coffee table so he was level with her. “Okay. If you don’t answer, what happens?”

### Image page (right)

Slug: u1-s09
Shot type: Detail
Depicts: Beat 2. Lena sets her phone face down on the arm of the couch, which for Lena is a bigger deal than anybody in the room understands.
Spoiler check: PASS. Final beat is Milo sitting down on the coffee table to be level with Pip. Not depicted: no figure is in frame at all.

Prompt:

```
{{STYLE}}
{{LOC:WAREHOUSE_PIT}}
A close view of the worn upholstered arm of a sagging couch, with a single mobile phone lying on it FACE DOWN, screen hidden, set square and deliberately rather than dropped. A hand has just left it and is out of frame. Beyond the arm of the couch the room falls away out of focus. No people and no animals in frame.
Mid-afternoon.
Close detail shot at couch height, shallow depth, the phone and the couch arm filling the lower half of the frame.
Soft indirect daylight, quiet, no drama.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A mobile phone lying face down and set square on the worn arm of a sagging couch, with the room out of focus beyond it.

---

## Spread 10

Pages 21 to 22 | Part One: Curfew | Words 206

### Text page (left), verbatim

“It asks somebody else.”

“There isn’t anybody else.”

“There are thirty-one phones on a softball field, a police scanner, and a whole town telling those soldiers how nice they are,” Pip said. “It will work something out, because it always works something out. That is the problem with it.”

The fan clicked. On top of the fridge, the dragon rolled over and put its face in the vent.

“Tell it the truth,” Milo said.

“Milo.”

“It’s going to guess either way, and I’d rather it guessed off something real.”

Pip was quiet for a while. Then she said it out loud, to the room, in the same flat voice she uses for everything.

“Soldiers are people a government sends when it wants something guarded or stopped. They are here because a man in charge is frightened of this town. The town is frightened back, and nobody will say so, because in Millbrook we bring lemonade.”

Then she closed her eyes, which she doesn’t need to do and had never done in front of any of them.

“Did it hear you?” Lena said.

“Yes.”

“What did it say?”

“Nothing.” She opened them again. “It stopped.”

Felix looked around at everybody. “Is that good?”

“No,” said four people.

### Image page (right)

Slug: u1-s10
Shot type: Character close
Depicts: Beat 12. Pip closes her eyes, which she does not need to do and had never done in front of any of them.
Spoiler check: PASS. Final beat is four people saying "No" at once. Not depicted: no one else has spoken or reacted, and the answer has not come back.

Prompt:

```
{{STYLE}}
{{LOC:WAREHOUSE_PIT}}
{{CHAR:PIP}}
{{CHAR:MILO}}
Pip sits upright on a milk crate stool with her hands flat on her knees, exactly even, and **her eyes are closed** — calm, not distressed, her face otherwise doing nothing at all. Milo sits on the edge of the low coffee table just in front of her so that he is level with her, leaning slightly forward, watching her face and saying nothing. He is soft and slightly behind the focus. She is the subject.
Late afternoon.
Close on Pip, three-quarter view, Milo present but secondary in the near foreground.
Low warm afternoon light from the high windows across her face, quiet, fully readable.
Hard constraint: her eyes must be CLOSED. It is the only time in the arc that happens and it is the point of the plate.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A robotic girl sits on a stool with her hands flat on her knees and her eyes closed, while a boy sits on a low table in front of her, level with her, watching.

---

## Spread 11

Pages 23 to 24 | Part One: Curfew | Words 220

### Text page (left), verbatim

### The Trunk

The auditorium at the old elementary school had been dark for six months.

Under the stage, down a short flight of concrete steps and behind a door with a bad hinge, was the wardrobe room. Forty-one years of school plays live in there. Thirteen steamer trunks numbered in white paint by a shop teacher who retired in 1991, a rack of choir robes, and boxes of hats. On the wall, in a plastic sleeve, a typed inventory sheet listing two hundred and six items, last updated in 2014 and still, somehow, correct.

Three hundred yards away a generator ran and thirty-one people slept in tents on the softball field.

In the dark, something small moved along the tops of the trunks and stopped at number seven.

There was a click, and that was the latch. Then a long sound like somebody letting out a breath, and that was the lid coming up on hinges that hadn’t moved in six months.

Then nothing at all for about a minute.

Then footsteps. Bare feet on concrete, in no hurry, crossing the room and going up the stairs and out through the door with the bad hinge, which swung shut behind them.

The lid of trunk seven stayed open.

*To be continued in Part Two: Four Out Of The Trunk*

### Image page (right)

Slug: u1-s11
Shot type: Establishing or location
Depicts: Beat 8. The wardrobe room after whatever it was has gone: trunk seven standing open, the door with the bad hinge swung shut, nobody there.
Spoiler check: PASS. Final beat is the to-be-continued line. Critically, the plate shows NO figure and no bare feet — four people coming out of that trunk is the reveal that opens Part Two and must not be pre-empted here.

Prompt:

```
{{STYLE}}
{{LOC:WARDROBE_ROOM}}
The wardrobe room in the middle of the night with nobody in it. One trunk in the row along the back wall stands OPEN with its lid up on its hinges, and it is empty except for a single folded sheet of pale tissue paper. Every other trunk is shut. The door at the top of the concrete steps is closed. Fresh bare footprints lead away across the dusty floor from the open trunk toward the steps, and none come back. **No people, no animals and no figures of any kind, and no feet in frame.**
The middle of the night.
Wide, camera at standing height at the foot of the steps, looking down the room at the trunk row with the open trunk near the centre.
One dim overhead fixture and nothing else, low and quiet, but the room, the trunks and the footprints all stay clearly readable and no part of the frame falls to featureless black.
{{NEGATIVE}}
Aspect ratio: 3:2
```

Alt text: A basement costume store at night with one steamer trunk standing open and empty but for a sheet of tissue paper, and bare footprints leading away across the dusty floor toward the stairs.

---
