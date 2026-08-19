export interface Note {
  name: { default: string; latin: string };
  pitchClass: number;
  octave: number;
}

export const Notes: Record<string, Note> = {
  C: { name: { default: "C", latin: "Do" }, pitchClass: 0, octave: 4 },

  "C#": { name: { default: "C#", latin: "Do#" }, pitchClass: 1, octave: 4 },
  Db: { name: { default: "Db", latin: "Reb" }, pitchClass: 1, octave: 4 },

  D: { name: { default: "D", latin: "Re" }, pitchClass: 2, octave: 4 },

  "D#": { name: { default: "D#", latin: "Re#" }, pitchClass: 3, octave: 4 },
  Eb: { name: { default: "Eb", latin: "Mib" }, pitchClass: 3, octave: 4 },

  E: { name: { default: "E", latin: "Mi" }, pitchClass: 4, octave: 4 },

  F: { name: { default: "F", latin: "Fa" }, pitchClass: 5, octave: 4 },

  "F#": { name: { default: "F#", latin: "Fa#" }, pitchClass: 6, octave: 4 },
  Gb: { name: { default: "Gb", latin: "Solb" }, pitchClass: 6, octave: 4 },

  G: { name: { default: "G", latin: "Sol" }, pitchClass: 7, octave: 4 },
  "G#": { name: { default: "G#", latin: "Sol#" }, pitchClass: 8, octave: 4 },
  Ab: { name: { default: "Ab", latin: "Lab" }, pitchClass: 8, octave: 4 },

  A: { name: { default: "A", latin: "La" }, pitchClass: 9, octave: 4 },

  "A#": { name: { default: "A#", latin: "La#" }, pitchClass: 10, octave: 4 },
  Bb: { name: { default: "Bb", latin: "Sib" }, pitchClass: 10, octave: 4 },

  B: { name: { default: "B", latin: "Si" }, pitchClass: 11, octave: 4 },
} as const;

/**
 * Finds note by given string.
 *
 * @param noteString Representation of note as string e.g. B, C4, G#5, Ab2...
 * @returns Type note of given string.
 */
export function getNoteByNoteName(noteString: string): Note {
  return (
    Object.values(Notes).find(
      (note) =>
        note.name.default === noteString || note.name.latin === noteString,
    ) ?? Notes.A
  );
}

/**
 * Creates note by given note as string and octave as number.
 *
 * @param noteName Note name as string e.g B, C...
 * @param octave Octave as number.
 * @returns Type note of given note name and octave.
 */
export function createNote(noteName: string, octave: number): Note {
  const note = getNoteByNoteName(noteName);
  return {
    name: note.name,
    pitchClass: note.pitchClass,
    octave: octave < 0 ? note.octave : octave,
  };
}

export function nextNote(note: Note): Note {
  const nextNote = getNoteByPitchClass(note.pitchClass + 1);
  const octaveShift =
    note.pitchClass + 1 > 11 ? (note.octave + 1) % 10 : note.octave;
  return createNote(nextNote.name.default, octaveShift);
}

export function previousNote(note: Note): Note {
  const nextNote = getNoteByPitchClass(note.pitchClass - 1);
  const octaveShift =
    note.pitchClass - 1 < 0 ? (note.octave - 1 + 10) % 10 : note.octave;
  return createNote(nextNote.name.default, octaveShift);
}

export function transposeNote(note: Note, steps: number): Note {
  const newNote = getNoteByPitchClass(note.pitchClass + steps);
  const octaveShift = Math.floor((note.pitchClass + steps) / 12);

  return createNote(newNote.name.default, note.octave + octaveShift);
}

export function parseNote(noteName: string): Note {
  const match = noteName.match(/^((?:[A-G]|Do|Re|Mi|Fa|Sol|La|Si)[#b]?)(\d*)$/);
  if (!match) return Notes.A;

  let [_, rawRoot, rawOctave] = match;
  if (!rawOctave) rawOctave = "4";

  return createNote(rawRoot, parseInt(rawOctave));
}

export function getNoteByPitchClass(pitchClass: number): Note {
  const normalizedPitch = (pitchClass + 12) % 12;

  for (const [noteName, note] of Object.entries(Notes)) {
    if (note.pitchClass == normalizedPitch) return note;
  }

  return Notes["A"];
}
