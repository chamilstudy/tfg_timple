import { Note, parseNote, nextNote, previousNote } from "../musicTheory/notes";

export interface Instrument {
  name: string;
  frets: number;
  capo: number;
  capoNotes: Note[];
  openNotes: Note[];
}

export function createInstrument(
  name: string,
  frets: number,
  openNotes: Note[],
): Instrument {
  return {
    name: name,
    frets: frets,
    capo: 0,
    capoNotes: openNotes,
    openNotes: openNotes,
  };
}

export function createInstrumentFromStrings(
  name: string,
  frets: number,
  openNotes: string[],
): Instrument {
  const openNotesParsed: Note[] = openNotes.map((string) => parseNote(string));
  return createInstrument(name, frets, openNotesParsed);
}

export function transposeInstrument(instrument: Instrument, steps: number) {
  let newCapo = instrument.capo + steps;
  const capoBelowFretboard = newCapo < 0;
  const capoAboveFretboard = newCapo > instrument.frets;

  if (!capoBelowFretboard && !capoAboveFretboard) {
    instrument.capo = newCapo;

    if (steps > 0) {
      instrument.capoNotes = instrument.openNotes.map((note) => {
        for (let step = 0; step < steps; step++) {
          note = nextNote(note);
        }
        return note;
      });
    } else if (steps < 0) {
      instrument.capoNotes = instrument.openNotes.map((note) => {
        for (let step = steps; step > 0; step--) {
          note = previousNote(note);
        }
        return note;
      });
    }
  }
}

export function transposeInstrument_old(instrument: Instrument, steps: number) {
  const tmpCapo = 0 + steps;

  if (tmpCapo <= instrument.frets && tmpCapo >= 0) {
    if (steps > 0) {
      instrument.capo = tmpCapo;

      instrument.capoNotes = instrument.openNotes.map((note) => {
        for (let step = 0; step < steps; step++) {
          note = nextNote(note);
        }
        return note;
      });
    } else {
      instrument.capo = tmpCapo;

      instrument.capoNotes = instrument.openNotes.map((note) => {
        for (let step = steps; step > 0; step--) {
          note = previousNote(note);
        }
        return note;
      });
    }
  }
}

export function getTransposeOpenNotes(
  instrument: Instrument,
  steps: number,
): Note[] {
  const tmpCapo = instrument.capo + steps;

  if (tmpCapo <= instrument.frets && tmpCapo >= 0) {
    if (steps > 0) {
      return instrument.openNotes.map((note) => {
        for (let step = 0; step < steps; step++) {
          note = nextNote(note);
        }
        return note;
      });
    } else {
      return instrument.openNotes.map((note) => {
        for (let step = steps; step > 0; step--) {
          note = previousNote(note);
        }
        return note;
      });
    }
  }

  return instrument.capoNotes;
}
