import { Instrument } from "./instrument";

import { Chord, parseChord } from "../musicTheory/chords";
import { getChordFretPositions } from "./chordDiagramAlgorithm";

interface ChordDiagram {
  instrument: Instrument;
  rootChord: Chord;
  fretPositions: number[];
  fretDepth: number;
  fingerCapo: number;
}

export function createChordDiagram(
  instrument: Instrument,
  rootChord: Chord,
  fretDepth: number,
): ChordDiagram {
  const { fingerCapo, fretPositions } = getChordFretPositions(
    rootChord,
    instrument,
    fretDepth,
  );
  return {
    instrument: instrument,
    rootChord: rootChord,
    fretPositions: fretPositions,
    fretDepth: fretDepth,
    fingerCapo: fingerCapo,
  };
}
