import { describe, it, expect } from "vitest";
import { getTimpleChord } from "../chordAlg";

describe("Timple Tuning", () => {
  it("Test Major Chords", () => {
    const C = getTimpleChord("C", 0).fretPositions;
    const D = getTimpleChord("D", 0).fretPositions;
    const E = getTimpleChord("E", 0).fretPositions;
    const F = getTimpleChord("F", 0).fretPositions;
    const G = getTimpleChord("G", 0).fretPositions;
    const A = getTimpleChord("A", 0).fretPositions;
    const B = getTimpleChord("B", 0).fretPositions;

    expect(C).toStrictEqual([0, 0, 0, 3, 2]);
    expect(D).toStrictEqual([2, 2, 2, 0, 0]);
    expect(E).toStrictEqual([1, 4, 0, 2, 2]);
    expect(F).toStrictEqual([2, 0, 1, 0, 3]);
    expect(G).toStrictEqual([0, 2, 3, 2, 0]);
    expect(A).toStrictEqual([2, 1, 0, 0, 2]);
    expect(B).toStrictEqual([4, 3, 2, 2, 4]);
  });

  it("Otro", () => {
    const C = getTimpleChord("Gdim7", 0).fretPositions;

    expect(C).toStrictEqual([0, 1, 0, 1, 2]);
  });

  it("Test Minor Chords", () => {
    const Cm = getTimpleChord("Cm", 0).fretPositions;
    const Dm = getTimpleChord("Dm", 0).fretPositions;
    const Em = getTimpleChord("Em", 0).fretPositions;
    const Fm = getTimpleChord("Fm", 0).fretPositions;
    const Gm = getTimpleChord("Gm", 0).fretPositions;
    const Am = getTimpleChord("Am", 0).fretPositions;
    const Bm = getTimpleChord("Bm", 0).fretPositions;

    expect(Cm).toStrictEqual([0, 0, 3, 3, 1]);
    expect(Dm).toStrictEqual([2, 2, 1, 0, 0]);
    expect(Em).toStrictEqual([0, 4, 0, 2, 2]);
    expect(Fm).toStrictEqual([1, 0, 1, 3, 3]);
    expect(Gm).toStrictEqual([0, 2, 3, 1, 0]);
    expect(Am).toStrictEqual([2, 0, 0, 0, 2]);
    expect(Bm).toStrictEqual([4, 2, 2, 2, 4]);
  });
  it("Test 7 Chords", () => {
    const C7 = getTimpleChord("C7", 0).fretPositions;
    const D7 = getTimpleChord("D7", 0).fretPositions;
    const E7 = getTimpleChord("E7", 0).fretPositions;
    const F7 = getTimpleChord("F7", 0).fretPositions;
    const G7 = getTimpleChord("G7", 0).fretPositions;
    const A7 = getTimpleChord("A7", 0).fretPositions;
    const B7 = getTimpleChord("B7", 0).fretPositions;

    expect(C7).toStrictEqual([0, 0, 0, 1, 2]);
    expect(D7).toStrictEqual([2, 0, 2, 0, 0]);
    expect(E7).toStrictEqual([1, 2, 0, 2, 0]);
    expect(F7).toStrictEqual([2, 0, 1, 0, 1]);
    expect(G7).toStrictEqual([0, 2, 1, 2, 0]);
    expect(A7).toStrictEqual([0, 1, 0, 0, 2]);
    expect(B7).toStrictEqual([2, 3, 2, 2, 4]);
  });

  it("Test m7 Chords", () => {
    const Cm7 = getTimpleChord("Cm7", 0).fretPositions;
    const Dm7 = getTimpleChord("Dm7", 0).fretPositions;
    const Em7 = getTimpleChord("Em7", 0).fretPositions;
    const Fm7 = getTimpleChord("Fm7", 0).fretPositions;
    const Gm7 = getTimpleChord("Gm7", 0).fretPositions;
    const Am7 = getTimpleChord("Am7", 0).fretPositions;
    const Bm7 = getTimpleChord("Bm7", 0).fretPositions;

    expect(Cm7).toStrictEqual([0, 0, 3, 1, 1]);
    expect(Dm7).toStrictEqual([2, 0, 1, 0, 0]);
    expect(Em7).toStrictEqual([0, 2, 0, 2, 0]);
    expect(Fm7).toStrictEqual([1, 3, 1, 3, 1]);
    expect(Gm7).toStrictEqual([0, 2, 1, 1, 0]);
    expect(Am7).toStrictEqual([0, 0, 0, 0, 2]);
    expect(Bm7).toStrictEqual([2, 2, 2, 2, 4]);
  });

  it("Test 7 Chords", () => {
    const C7 = getTimpleChord("C7", 0).fretPositions;
    const D7 = getTimpleChord("D7", 0).fretPositions;
    const E7 = getTimpleChord("E7", 0).fretPositions;
    const F7 = getTimpleChord("F7", 0).fretPositions;
    const G7 = getTimpleChord("G7", 0).fretPositions;
    const A7 = getTimpleChord("A7", 0).fretPositions;
    const B7 = getTimpleChord("B7", 0).fretPositions;

    expect(C7).toStrictEqual([0, 0, 0, 1, 2]);
    expect(D7).toStrictEqual([2, 0, 2, 0, 0]);
    expect(E7).toStrictEqual([1, 2, 0, 2, 0]);
    expect(F7).toStrictEqual([2, 0, 1, 0, 1]);
    expect(G7).toStrictEqual([0, 2, 1, 2, 0]);
    expect(A7).toStrictEqual([0, 1, 0, 0, 2]);
    expect(B7).toStrictEqual([2, 3, 2, 2, 4]);
  });
});
