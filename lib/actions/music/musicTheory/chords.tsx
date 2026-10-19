import {
  Notes,
  Note,
  parseNote,
  nextNote,
  previousNote,
  transposeNote,
} from "./notes";

export interface Chord {
  root: Note;
  quality: Quality;
}

export interface Quality {
  names: Set<string>;
  pitchClass: Record<number, number>;
}

export const chordRegex =
  /^((?:[A-G]|Do|Re|Mi|Fa|Sol|La|Si)[#b]?)(mayor|maj|M|menor|m|7|m7|maj7|dim|aug|dim7|aug7)?$/;

export const Qualities: Record<string, Quality> = {
  mayor: {
    names: new Set(["", "mayor", "maj", "M"]),
    pitchClass: {
      0: 4,
      4: 4,
      7: 3,
    },
  },

  menor: {
    names: new Set(["m", "menor"]),
    pitchClass: {
      0: 4,
      3: 4,
      7: 3,
    },
  },

  "7": {
    names: new Set(["7"]),
    pitchClass: {
      0: 4,
      4: 4,
      10: 4,
      7: 2,
    },
  },

  m7: {
    names: new Set(["m7"]),
    pitchClass: {
      0: 4,
      3: 4,
      10: 4,
      7: 2,
    },
  },

  maj7: {
    names: new Set(["maj7"]),
    pitchClass: {
      0: 4,
      4: 4,
      7: 2,
      11: 4, // séptima mayor (color principal)
    },
  },

  dim: {
    names: new Set(["dim"]),
    pitchClass: {
      0: 4,
      3: 4,
      6: 4, // tritono → esencial
    },
  },

  dim7: {
    names: new Set(["dim7"]),
    pitchClass: {
      0: 4,
      3: 4,
      6: 4,
      9: 4, // simetría total
    },
  },

  aug: {
    names: new Set(["aug"]),
    pitchClass: {
      0: 4,
      4: 4,
      8: 4, // quinta aumentada define el acorde
    },
  },

  aug7: {
    names: new Set(["aug7"]),
    pitchClass: {
      0: 4,
      4: 4,
      8: 3,
      11: 4,
    },
  },
} as const;

export function createChord(root: Note, quality: Quality): Chord {
  return {
    root,
    quality: {
      names: quality.names,
      pitchClass: getPitchClassByRootNoteAndQuality(root, quality),
    },
  };
}

export function parseChord(chord: string): Chord {
  const match = chord.match(chordRegex);

  if (!match) return { root: Notes.A, quality: Qualities.mayor };

  const [_, rawRoot, rawQuality] = match;

  const qualityName = rawQuality ? rawQuality : "mayor";

  return createChord(parseNote(rawRoot), getQualityByQualityName(qualityName));
}

export function isNoteInChord(chord: Chord, note: Note) {
  for (const pitchClassStr in chord.quality.pitchClass) {
    let pitchClass = Number(pitchClassStr);
    if (pitchClass == note.pitchClass) return true;
  }

  return false;
}

export function nextChord(chord: Chord): Chord {
  return createChord(nextNote(chord.root), chord.quality);
}

export function previousChord(chord: Chord): Chord {
  return createChord(previousNote(chord.root), chord.quality);
}

export function transposeChord(chord: Chord, steps: number): Chord {
  return createChord(transposeNote(chord.root, steps), chord.quality);
}

export function getPitchClassByRootNoteAndQuality(
  rootNote: Note,
  quality: Quality,
): Record<number, number> {
  const pitchClass: Record<number, number> = {};

  for (const intervalStr in quality.pitchClass) {
    const interval = Number(intervalStr);
    const weight = quality.pitchClass[interval];

    const note = (rootNote.pitchClass + interval) % 12;
    pitchClass[note] = weight;
  }

  return pitchClass;
}

export function getQualityByQualityName(qualityName: string): Quality {
  return (
    Object.values(Qualities).find((q) => q.names.has(qualityName)) ??
    Qualities.mayor
  );
}

export function chordToString(chord: Chord, notation: boolean): string {
  const defaultQualityName = chord.quality.names.values().next().value;
  return (
    (notation ? chord.root.name.default : chord.root.name.latin) +
    defaultQualityName
  );
}
