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
  intro:
    'Nobody in this town explains any of it to anybody else, because everybody was '
    + 'here. Three things it is useful to know first.',

  entries: [
    {
      term: 'The Great Event',
      body:
        'Twelve years ago, on an ordinary Thursday afternoon in October, every clock in '
        + 'Millbrook lost the same ninety seconds. The elementary school on the east side '
        + 'was emptied that afternoon and never reopened. A chain link fence went up around '
        + 'its six acres inside a week and has never come down.\n\n'
        + 'Nobody was hurt. No building fell over. Nobody in Millbrook remembers being '
        + 'frightened, which is the part that ought to frighten you. What the town lost was '
        + 'not really the ninety seconds. It was the habit of asking about them.',
    },
    {
      term: 'Patches',
      body:
        'Things in Millbrook get fixed. A pothole everyone complained about for two years '
        + 'is gone one morning with no work order and no crew. A stop sign stands at a '
        + 'junction that did not have one last month, and the city has no record of '
        + 'installing it. A house number is different by one.\n\n'
        + 'The town calls them patches when it calls them anything. They are getting more '
        + 'frequent, and they are getting larger.',
    },
    {
      term: 'And nobody notices',
      body:
        'This is the strange part, and it is not a metaphor. Show a lifelong resident a '
        + 'receipt from a shop that was something else yesterday and they will look at it '
        + 'for slightly too long, and then put it away as though it belonged there.\n\n'
        + 'They are not lying and they are not stupid. Something about the way this town '
        + 'works makes a change very slightly easier to accept than to question. Lena Marsh '
        + 'has been here four days and has not caught it yet, which is the only reason any '
        + 'of this gets written down.',
    },
  ],

  footer:
    'That is everything a resident could tell you. The rest of it nobody knows, and two '
    + 'or three people are working quite hard on making sure it stays that way.',
};
