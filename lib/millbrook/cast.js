// ============================================================
// The cast, for the character cards on the landing page.
//
// Separate from series.js because this is authorial content rather than design
// tokens, and separate from the roster because the roster describes how to DRAW
// these people and this describes how to introduce them.
//
// Spoiler discipline, and it is the main editorial constraint here. These cards sit
// on the landing page, where a visitor has read nothing. So every bio is written
// from roughly where the reader stands at the end of Volume 1: it can promise, hint
// and unsettle, but it must not deliver. Pip's card does not say what talks to her.
// Monke's does not say what he does at three in the morning. Those are the reasons
// to read Volume 4 and giving them away on the front door would be a poor trade for
// a livelier paragraph.
//
// Portrait slugs carry NO extension. Plate appends .png itself, so storing
// "char-pip-canonical.png" here produced /images/char-pip-canonical.png.png and every
// card silently fell back to the not-yet-generated placeholder.
//
// `hotspot` is a percentage band across site-cast.png, measured from the delivered
// plate. Percentages rather than pixels so it survives the strip being scaled, and a
// band rather than a box because the figures are full-length and stand clear of each
// other horizontally, which makes the horizontal position the only thing that has to
// be right.
//
// Verified rather than eyeballed: sampling the plate column by column for non-paper
// pixels finds five clusters at 10.3-22.3, 23.3-53.0, 54.3-65.5, 67.8-77.5 and
// 79.8-90.3 per cent. Every band below sits inside one of those to within about a
// point and a half. The second cluster is Lena, Owen and Monke merged, because those
// three stand close enough that there is no clean paper gap between them.
// ============================================================

export const CAST = [
  {
    slug: 'felix',
    name: 'Felix',
    role: 'Builds the thing that measures it',
    portrait: 'char-felix-canonical',
    hotspot: { left: 10.5, width: 11 },
    bio: [
      'The shortest of them and the least worried about anything. Felix arrives at a '
      + 'problem the way other people arrive at a party.',
      'If something in Millbrook needs counting, timing or listening to, Felix has '
      + 'already built the device and it already half works. He will explain it to you '
      + 'whether or not you asked, at a bench that has never once been tidy, and he will '
      + 'be delighted the entire time.',
      'There is usually a small green gecko on his shoulder. Nobody has ever explained '
      + 'the gecko.',
    ],
  },
  {
    slug: 'lena',
    name: 'Lena Marsh',
    role: 'Came to town with a folder and a question',
    portrait: 'char-lena-canonical',
    hotspot: { left: 22, width: 12 },
    bio: [
      'Nine months of forum posts, deleted news clips and threads with three replies and '
      + 'a vanished account. Most of it junk. But there is a pattern in it, and Lena is '
      + 'the only person who has noticed.',
      'She moves into her aunt’s spare room on a Tuesday, sets a phone on a tripod, '
      + 'and starts recording a town that has begun quietly repairing itself. Within a '
      + 'day somebody has stolen her dashcam. Within a week she has stopped working alone.',
      'She is not brave, exactly. She is the kind of stubborn that looks like brave from '
      + 'the outside.',
    ],
  },
  {
    slug: 'owen',
    name: 'Owen',
    role: 'Has been awake for thirty-one hours',
    portrait: 'char-owen-canonical',
    hotspot: { left: 35, width: 10 },
    bio: [
      'Three monitors, a row of dented cans, and a map nobody asked him to make.',
      'Owen plots every repair the town has made and finds an arc forming across it, '
      + 'closing slowly toward a centre. He says less than anyone else in the room and is '
      + 'usually the one who has already checked.',
      'He does not do encouragement. What he does instead is quieter and takes longer to '
      + 'notice: he makes room.',
    ],
  },
  {
    slug: 'monke',
    name: 'Monke',
    role: 'Watching from the high shelf',
    portrait: 'char-monke-canonical',
    hotspot: { left: 45.5, width: 8.5 },
    bio: [
      'A small monkey who lives somewhere near the roof of the warehouse and comes down '
      + 'for granola bars.',
      'Nobody explains Monke. Not where he came from, not why he stays, not why the '
      + 'others talk to him as though he follows the conversation. He is treated as '
      + 'furniture with opinions.',
      'He is awake more often than anyone realises.',
    ],
  },
  {
    slug: 'milo',
    name: 'Milo',
    role: 'Decides who is in',
    portrait: 'char-milo-canonical',
    hotspot: { left: 54, width: 11 },
    bio: [
      'Tallest of them, and the hardest to read on purpose. Red-lensed glasses and an '
      + 'orange beanie he does not take off.',
      'Milo runs the warehouse the way a good editor runs a room: mostly by listening, '
      + 'and then by saying the one sentence that settles it. When somebody has been '
      + 'keeping a secret he does not shout. He asks them to keep telling him.',
      'His approval is short, dry and worth having.',
    ],
  },
  {
    slug: 'pip',
    name: 'Pip',
    role: 'Sits a shade too still',
    portrait: 'char-pip-canonical',
    hotspot: { left: 67, width: 11 },
    bio: [
      'A robot, and not a modified person. She will tell you so plainly if you ask, and '
      + 'the seams at her jaw and wrists make the question unnecessary.',
      'Pip came online about a year ago in an empty house on Larkspur, knowing how to '
      + 'read and knowing the names of three people in this town. She went to one of '
      + 'them. She was not turned away, so she stayed.',
      'She is the most honest person in the story and she is keeping something enormous '
      + 'to herself. Both of those are true at once, and she knows it.',
    ],
  },
  {
    slug: 'vex',
    name: 'Vex',
    role: 'Stole the dashcam. Not sorry',
    portrait: 'char-vex-canonical',
    hotspot: { left: 79, width: 11 },
    bio: [
      'Mint-green hair, arms crossed, and a mouth that always looks about to say '
      + 'something rude. Usually is.',
      'Vex has been collecting single wrong frames off other people’s cameras for six '
      + 'months: one thirtieth of a second where the shadows do not match and the light '
      + 'on the parked cars is wrong. She was right long before anybody agreed with her, '
      + 'which has not improved her manners.',
      'She takes what she needs and apologises to nobody. She also puts a blanket on you '
      + 'when you fall asleep, and sits on the floor beside the couch for a long time '
      + 'afterwards, and never mentions it.',
    ],
  },
];

export const castBySlug = Object.fromEntries(CAST.map((c) => [c.slug, c]));
