import { describe, it, expect } from "vitest";
import { createChordDiagram } from "./chordDiagram";
import { createInstrument } from "./instrument";
import { Notes } from "../musicTheory/notes";
import { parseChord } from "../musicTheory/chords";

describe("Chord Diagram", () => {
  it("Create chord diagram", () => {
    const ukulele = createInstrument("Ukulele", 12, [
      Notes["G"],
      Notes["C"],
      Notes["E"],
      Notes["A"],
    ]);

    const rootChord = parseChord("Cmayor");

    const diagram = createChordDiagram(ukulele, rootChord, 5);

    expect(diagram.rootChord).toStrictEqual(rootChord);
    expect(diagram.instrument).toStrictEqual(ukulele);
    expect(diagram.fretPositions).toStrictEqual([0, 0, 0, 3]);
    expect(diagram.fretDepth).toBe(5);
    expect(diagram.fingerCapo).toBe(0);
  });

  it("Create chord diagram with invalid chord", () => {
    const ukulele = createInstrument("Ukulele", 12, [
      Notes["G"],
      Notes["C"],
      Notes["E"],
      Notes["A"],
    ]);

    const rootChord = parseChord("");

    const diagram = createChordDiagram(ukulele, rootChord, 5);

    expect(diagram.rootChord.root).toStrictEqual(Notes["A"]);
    expect(diagram.instrument).toStrictEqual(ukulele);
    expect(diagram.fretPositions).toStrictEqual([0, 0, 0, 3]);
    expect(diagram.fretDepth).toBe(5);
    expect(diagram.fingerCapo).toBe(0);
  });
});
