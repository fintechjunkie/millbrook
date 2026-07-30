// ============================================================
// What a reader needs before page one.
//
// The problem this solves: the prose says "the Great Event" three times across the arc
// and never explains it, because none of the characters would ever explain it to each
// other. Everyone in Millbrook was there. Nobody talks about it. That is exactly right
// inside the book and it strands a reader outside it.
//
// The rule that keeps this from spoiling anything: **give the reader what the TOWN
// knows, never what the STORY reveals.** Every resident knows there was an Event, knows
// the school has been fenced since, and knows things change and you do not ask. That is
// public knowledge and it is precisely the frame a reader is missing.
//
// What is deliberately NOT here: what was switched on, that anything is in the walls,
// that it talks to Pip, that the patches trace a circle, or what sits at the centre of
// it. Those are the arc. A reader who finishes Volume 3 should feel the primer was
// honest and incomplete, not that it gave the game away.
// ============================================================

export const PRIMER = {
  kicker: 'Before you begin',
  title: 'What everybody in Millbrook already knows',
  // Contractions throughout, and that is a register decision rather than tidying.
  //
  // The primer was written in the same unelided voice the narration uses for its coldest
  // moments — "it is not a metaphor", "they are not lying", "that is everything a resident
  // could tell you" — and read as a museum caption. Contracting it is the same move the
  // prose pass made on the volumes: a person telling you something rather than a plaque.
  // The one place the full form stays is where the sentence is landing a point on the
  // word itself, because "wasn't really the ninety seconds" throws away the stress that
  // makes the line work.
  intro:
    'Nobody in this town explains any of it to anybody else, because everybody was '
    + 'here. Three things it helps to know first.',

  entries: [
    {
      term: 'The Great Event',
      body:
        'Six months ago, on an ordinary Thursday afternoon in October, every clock in '
        + 'Millbrook lost the same ninety seconds. The elementary school on the east side '
        + 'was emptied that afternoon and never reopened. A chain link fence went up around '
        + 'its six acres inside a week and has never come down.\n\n'
        + 'Nobody was hurt. No building fell over. Nobody in Millbrook remembers being '
        + 'frightened, which is the part that ought to frighten you. What the town lost '
        + 'wasn’t really the ninety seconds. It was the habit of asking about them.',
    },
    {
      term: 'Patches',
      body:
        'Things in Millbrook get fixed. A pothole everyone complained about for two years '
        + 'is gone one morning with no work order and no crew. A stop sign stands at a '
        + 'junction that didn’t have one last month, and the city has no record of '
        + 'installing it. A house number is different by one.\n\n'
        + 'The town calls them patches when it calls them anything. They’re getting more '
        + 'frequent, and they’re getting larger.',
    },
    {
      term: 'And nobody notices',
      body:
        'This is the strange part, and it’s not a metaphor. Show a lifelong resident a '
        + 'receipt from a shop that was something else yesterday and they’ll look at it '
        + 'for slightly too long, and then put it away as though it belonged there.\n\n'
        + 'They’re not lying and they’re not stupid. Something about the way this town '
        + 'works makes a change very slightly easier to accept than to question. Lena Marsh '
        + 'has been here four days and hasn’t caught it yet, which is the only reason any '
        + 'of this gets written down.',
    },
  ],

  footer:
    'That’s everything a resident could tell you. The rest of it nobody knows, and two '
    + 'or three people are working quite hard on making sure it stays that way.',
};
