import { describe, it, expect } from "vitest";
import {
  createInstrument,
  createInstrumentFromStrings,
  transposeInstrument,
} from "./instrument";
import { Notes, parseNote } from "../musicTheory/notes";

describe("Create Instrument", () => {
  it("Create instrument", () => {
    const ukulele = createInstrument("Ukulele", 12, [
      Notes["G"],
      Notes["C"],
      Notes["E"],
      Notes["A"],
    ]);

    expect(ukulele.name).toBe("Ukulele");
    expect(ukulele.frets).toBe(12);
    expect(ukulele.capo).toBe(0);
    expect(ukulele.openNotes).toStrictEqual([
      Notes["G"],
      Notes["C"],
      Notes["E"],
      Notes["A"],
    ]);
    expect(ukulele.capoNotes).toStrictEqual([
      Notes["G"],
      Notes["C"],
      Notes["E"],
      Notes["A"],
    ]);
  });
});

describe("Create Instrument From Strings", () => {
  it("Create instrument with valid notes", () => {
    const ukulele = createInstrumentFromStrings("Ukulele", 12, [
      "G",
      "C",
      "E",
      "A",
    ]);

    expect(ukulele.name).toBe("Ukulele");
    expect(ukulele.frets).toBe(12);
    expect(ukulele.capo).toBe(0);
    expect(ukulele.openNotes).toStrictEqual([
      Notes["G"],
      Notes["C"],
      Notes["E"],
      Notes["A"],
    ]);
    expect(ukulele.capoNotes).toStrictEqual([
      Notes["G"],
      Notes["C"],
      Notes["E"],
      Notes["A"],
    ]);
  });

  it("Create instrument with invalid notes", () => {
    const ukulele = createInstrumentFromStrings("Ukulele", 12, [
      "",
      "",
      "",
      "",
    ]);

    expect(ukulele.name).toBe("Ukulele");
    expect(ukulele.frets).toBe(12);
    expect(ukulele.capo).toBe(0);
    expect(ukulele.openNotes).toStrictEqual([
      Notes["A"],
      Notes["A"],
      Notes["A"],
      Notes["A"],
    ]);
    expect(ukulele.capoNotes).toStrictEqual([
      Notes["A"],
      Notes["A"],
      Notes["A"],
      Notes["A"],
    ]);
  });
});

describe("Traspose Instrument", () => {
  it("Traspose instrument one step up", () => {
    const ukulele = createInstrument("Ukulele", 12, [
      Notes["G"],
      Notes["C"],
      Notes["E"],
      Notes["A"],
    ]);

    transposeInstrument(ukulele, 1);

    expect(ukulele.name).toBe("Ukulele");
    expect(ukulele.frets).toBe(12);
    expect(ukulele.capo).toBe(1);
    expect(ukulele.openNotes).toStrictEqual([
      Notes["G"],
      Notes["C"],
      Notes["E"],
      Notes["A"],
    ]);
    expect(ukulele.capoNotes).toStrictEqual([
      Notes["G#"],
      Notes["C#"],
      Notes["F"],
      Notes["A#"],
    ]);
  });

  it("Traspose instrument one step down", () => {
    const ukulele = createInstrument("Ukulele", 12, [
      Notes["G"],
      Notes["C"],
      Notes["E"],
      Notes["A"],
    ]);

    transposeInstrument(ukulele, 1);
    transposeInstrument(ukulele, -1);

    expect(ukulele.name).toBe("Ukulele");
    expect(ukulele.frets).toBe(12);
    expect(ukulele.capo).toBe(0);
    expect(ukulele.openNotes).toStrictEqual([
      Notes["G"],
      Notes["C"],
      Notes["E"],
      Notes["A"],
    ]);
    expect(ukulele.capoNotes).toStrictEqual([
      Notes["G"],
      Notes["C"],
      Notes["E"],
      Notes["A"],
    ]);
  });

  it("Traspose instrument out of instrument frets", () => {
    const ukulele = createInstrument("Ukulele", 12, [
      Notes["G"],
      Notes["C"],
      Notes["E"],
      Notes["A"],
    ]);
    const capoNotes = [
      parseNote("G5"),
      parseNote("C5"),
      parseNote("E5"),
      parseNote("A5"),
    ];

    transposeInstrument(ukulele, 13);

    expect(ukulele.name).toBe("Ukulele");
    expect(ukulele.frets).toBe(12);
    expect(ukulele.capo).toBe(0);
    expect(ukulele.openNotes).toStrictEqual([
      Notes["G"],
      Notes["C"],
      Notes["E"],
      Notes["A"],
    ]);
    expect(ukulele.capoNotes).toStrictEqual([
      Notes["G"],
      Notes["C"],
      Notes["E"],
      Notes["A"],
    ]);
  });

  it("Traspose instrument out of instrument frets 2", () => {
    const ukulele = createInstrument("Ukulele", 12, [
      Notes["G"],
      Notes["C"],
      Notes["E"],
      Notes["A"],
    ]);
    const capoNotes = [
      parseNote("G5"),
      parseNote("C5"),
      parseNote("E5"),
      parseNote("A5"),
    ];

    transposeInstrument(ukulele, -1);

    expect(ukulele.name).toBe("Ukulele");
    expect(ukulele.frets).toBe(12);
    expect(ukulele.capo).toBe(0);
    expect(ukulele.openNotes).toStrictEqual([
      Notes["G"],
      Notes["C"],
      Notes["E"],
      Notes["A"],
    ]);
    expect(ukulele.capoNotes).toStrictEqual([
      Notes["G"],
      Notes["C"],
      Notes["E"],
      Notes["A"],
    ]);
  });
});
