/**
 * Which spec file a volume slug lives in. One definition, three consumers.
 *
 * There are now two arcs whose specs are named differently — PATCH_NOTES_Vol1_Spec.md and
 * UNDERSTUDIES_Vol1_Spec.md — and three separate places had derived the filename from the
 * slug by string surgery: `String(vol).slice(3)` in the save route, a hardcoded `[1,2,3,4]`
 * loop in sync-text, and the ARCS table in parse-specs.
 *
 * That was fine with one arc and silently wrong with two. `u1` fed through `slice(3)` gives
 * an empty string, so edit mode would have looked for PATCH_NOTES_Vol_Spec.md and reported
 * "no spec for u1" — a 404 that describes the symptom and hides the cause.
 *
 * A slug is also what every image file is named after, so the mapping has to stay one-way
 * and explicit: no arc may reuse another's prefix.
 *
 * `.mjs` on purpose. sync-text is a node script and the save route is a Next module; an
 * `.mjs` file is unambiguous ESM to both, where a `.js` in this project would be read as
 * CommonJS by node.
 */
export const SPEC_FOR = {
  vol1: 'PATCH_NOTES_Vol1_Spec.md',
  vol2: 'PATCH_NOTES_Vol2_Spec.md',
  vol3: 'PATCH_NOTES_Vol3_Spec.md',
  vol4: 'PATCH_NOTES_Vol4_Spec.md',
  u1: 'UNDERSTUDIES_Vol1_Spec.md',
  u2: 'UNDERSTUDIES_Vol2_Spec.md',
  u3: 'UNDERSTUDIES_Vol3_Spec.md',
  u4: 'UNDERSTUDIES_Vol4_Spec.md',
  n1: 'NIGHTJAR_Vol1_Spec.md',
  n2: 'NIGHTJAR_Vol2_Spec.md',
  n3: 'NIGHTJAR_Vol3_Spec.md',
  n4: 'NIGHTJAR_Vol4_Spec.md',
};

export const ALL_SLUGS = Object.keys(SPEC_FOR);

/** Every spec file, in reading order. */
export const ALL_SPECS = Object.values(SPEC_FOR);
