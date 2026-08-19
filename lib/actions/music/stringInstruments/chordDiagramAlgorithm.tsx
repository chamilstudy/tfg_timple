import {
  getTransposeOpenNotes,
  Instrument,
  transposeInstrument,
} from "./instrument";
import { transposeNote, Note } from "../musicTheory/notes";
import { Chord } from "../musicTheory/chords";

interface Variant {
  fingers: number;
  fingerCapo: number;
  result: number[];
  score: number;
}

export function scorePlayability(variant: Variant): number {
  const { fingers, fingerCapo, result } = variant;
  let score = 0;

  // 1️⃣ Dedos
  score += fingers;

  // 2️⃣ Cejuilla
  if (fingerCapo > 0) {
    score += 1;
  }

  // 3️⃣ Cuerdas al aire
  score += result.filter((f) => f > fingerCapo).length;

  // 4️⃣ Cuerdas muteadas
  score += result.filter((f) => f === -1).length;

  return score;
}

export function scoreMusicalCorrectness(
  variant: Variant,
  openNotes: Note[],
  rootChord: Chord,
): number {
  const { fingers, fingerCapo, result } = variant;
  let score = 0;

  // Notas que suenan
  const soundingNotes = result
    .map((fret, i) =>
      fret >= 0 ? (openNotes[i].pitchClass + fret) % 12 : null,
    )
    .filter((n) => n !== null) as number[];

  const uniqueSounding = new Set(soundingNotes);

  /** 
  // 6️⃣ Notas del acorde están
  for (const tmp in rootChord.quality.pitchClass) {
    const value = Number(tmp);

    if (!uniqueSounding.has(value)) {
      score += 1;
    }
  }
*/
  // 7️⃣ Notas del acorde (ponderadas)
  /**
  for (const semitoneStr in rootChord.quality.pitchClass) {
    const semitone = Number(semitoneStr);
    const weight = rootChord.quality.pitchClass[semitone];
    const pitch = (rootChord.root.pitchClass + semitone) % 12;

    if (uniqueSounding.has(pitch)) {
      score -= weight; // recompensa
    }
  } */

  for (const tmp in rootChord.quality.pitchClass) {
    const value = Number(tmp);
    const weight = rootChord.quality.pitchClass[value];

    if (!uniqueSounding.has(value)) {
      score += weight;
    }
  }

  return score;
}

function searchFingerPositions(
  stringIdx: number,
  strings: number[][],
  result: number[],
  fingers: number,
  fingerCapo: number,
  openNotes: Note[],
  rootChord: Chord,
  best: Variant,
) {
  if (fingers > 4) return;

  // 🔹 Poda optimista solo con playability parcial
  const partialVariant: Variant = {
    fingers,
    fingerCapo,
    result,
    score: 0,
  };

  const partialScore = scorePlayability(partialVariant);
  if (partialScore >= best.score) return;

  // 🔹 Si está completo → evaluar full
  if (stringIdx === strings.length) {
    const finalScore =
      partialScore +
      scoreMusicalCorrectness(partialVariant, openNotes, rootChord);

    if (finalScore < best.score) {
      best.result = [...result];
      best.score = finalScore;
      best.fingers = fingers;
      best.fingerCapo = fingerCapo;
    }

    return;
  }

  for (const fret of strings[stringIdx]) {
    let currentFinger = fingers;
    let currentCapo = fingerCapo;

    const isOpenString = fret === 0;
    const isFretPressed = fret > 0;
    const isFretInCapo = fret === currentCapo;
    const isBelowCapo = fret < currentCapo;
    const areFingersAvailable = currentFinger < 5;

    if (isFretInCapo) {
    } else if (isOpenString) {
      currentCapo = fret;
      currentFinger = stringIdx;
    } else if (isBelowCapo && isFretPressed) {
      currentCapo = fret;
      currentFinger = stringIdx + 1;
    } else if (areFingersAvailable && isFretPressed) {
      currentFinger++;
    }

    result.push(fret);
    searchFingerPositions(
      stringIdx + 1,
      strings,
      result,
      currentFinger,
      currentCapo,
      openNotes,
      rootChord,
      best,
    );
    result.pop();
  }
}

interface Answer {
  fretPositions: number[];
  fingerCapo: number;
}

function generatePossibleFretsPerString(
  rootChord: Chord,
  openNotes: Note[],
  fretDepth: number,
): number[][] {
  return openNotes.map((openNote) => {
    const possibleFrets: number[] = [];

    for (let fret = 0; fret < fretDepth; fret++) {
      const fretNote = transposeNote(openNote, fret);

      if (rootChord.quality.pitchClass[fretNote.pitchClass] !== undefined) {
        possibleFrets.push(fret);
      }
    }

    return possibleFrets.length ? possibleFrets : [-1];
  });
}

export function getChordFretPositions(
  rootChord: Chord,
  instrument: Instrument,
  fretDepth: number,
): Answer {
  const best: Variant = {
    fingers: 0,
    fingerCapo: 0,
    result: [],
    score: Infinity,
  };

  let tmp: Variant = {
    fingers: 0,
    fingerCapo: 0,
    result: [],
    score: Infinity,
  };

  let fingerCapo = 0;
  let fingerCapoOpenNotes = instrument.capoNotes;

  while (fingerCapo < instrument.frets && best.result.length == 0) {
    const fretPossiblePositions = generatePossibleFretsPerString(
      rootChord,
      instrument.capoNotes,
      fretDepth,
    );

    searchFingerPositions(
      0,
      fretPossiblePositions,
      [],
      fingerCapo === 0 ? 0 : 1,
      5,
      fingerCapoOpenNotes,
      rootChord,
      best,
    );

    if (best.result.length == 0) {
      fingerCapo += 1;
      fingerCapoOpenNotes = getTransposeOpenNotes(instrument, fingerCapo);
    } else {
      break;
    }
  }

  return { fretPositions: best.result, fingerCapo: best.fingerCapo };
}
