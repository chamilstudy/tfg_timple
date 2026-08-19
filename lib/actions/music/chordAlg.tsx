import { createChordDiagram } from "./stringInstruments/chordDiagram";
import { parseChord } from "./musicTheory/chords";
import {
  createInstrumentFromStrings,
  transposeInstrument,
} from "./stringInstruments/instrument";

const timple = createInstrumentFromStrings("timple", 12, [
  "G4",
  "C5",
  "E4",
  "A4",
  "D5",
]);

const ukelele = createInstrumentFromStrings("ukelele", 12, [
  "G4",
  "C4",
  "E4",
  "A4",
]);

const contra = createInstrumentFromStrings("contra", 12, [
  "D3",
  "G3",
  "B3",
  "E4",
  "A4",
]);

const guitar = createInstrumentFromStrings("guitar", 12, [
  "E2",
  "A2",
  "D3",
  "G3",
  "B3",
  "E4",
]);

export function getTimpleChord(rootChord: string, capo: number = 0) {
  const rootChordParsed = parseChord(rootChord);
  transposeInstrument(timple, capo);
  return createChordDiagram(timple, rootChordParsed, 5);
}

export function getGuitarChord(rootChord: string, capo: number = 0) {
  const rootChordParsed = parseChord(rootChord);
  transposeInstrument(timple, capo);
  return createChordDiagram(guitar, rootChordParsed, 5);
}

export function getContraChord(rootChord: string, capo: number = 0) {
  const rootChordParsed = parseChord(rootChord);
  transposeInstrument(contra, capo);
  return createChordDiagram(contra, rootChordParsed, 5);
}

export function getUkeleleChord(rootChord: string, capo: number = 0) {
  const rootChordParsed = parseChord(rootChord);
  transposeInstrument(ukelele, capo);
  return createChordDiagram(ukelele, rootChordParsed, 5);
}
