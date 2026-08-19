import { describe, it, expect } from "vitest";

import {
  Qualities,
  createChord,
  getQualityByQualityName,
  isNoteInChord,
  parseChord,
  nextChord,
  previousChord,
  getPitchClassByRootNoteAndQuality,
  transposeChord,
} from "./chords";
import { Notes, parseNote } from "./notes";

describe("Create Chord", () => {
  it("Create chord", () => {
    const CMayor = createChord(Notes["C"], Qualities["mayor"]);

    expect(CMayor.root).toStrictEqual(Notes["C"]);
    expect(CMayor.quality).toStrictEqual(Qualities["mayor"]);
  });
});

describe("Parse Chord", () => {
  it("Parse invalid chord", () => {
    const CMayor = parseChord("");

    expect(CMayor.root).toStrictEqual(Notes["A"]);
    expect(CMayor.quality).toStrictEqual(Qualities["mayor"]);
  });

  it("Parse valid chord", () => {
    const CMayor = parseChord("Cmayor");

    expect(CMayor.root).toStrictEqual(Notes["C"]);
    expect(CMayor.quality).toStrictEqual(Qualities["mayor"]);
  });
});

describe("Is Note in Chord", () => {
  it("Note that is not in chord", () => {
    const CMayor = parseChord("CMayor");

    expect(isNoteInChord(CMayor, Notes["D"])).toBe(false);
  });

  it("Note that is in chord", () => {
    const C = parseNote("C4");
    const CMayor = parseChord("CMayor");

    expect(isNoteInChord(CMayor, C)).toBe(true);
  });
});

describe("Next Chord", () => {
  it("Next chord", () => {
    const CMayor = createChord(Notes["C"], Qualities["mayor"]);
    const CSharpMayor = nextChord(CMayor);

    expect(CSharpMayor.root).toStrictEqual(Notes["C#"]);
    expect(CSharpMayor.quality.pitchClass).toStrictEqual(
      getPitchClassByRootNoteAndQuality(Notes["C#"], Qualities["mayor"]),
    );
  });
});

describe("Previous Chord", () => {
  it("Previous chord", () => {
    const CMayor = createChord(Notes["C"], Qualities["mayor"]);
    const BMayor = previousChord(CMayor);

    const B3 = parseNote("B3");

    expect(BMayor.root).toStrictEqual(B3);
    expect(BMayor.quality.pitchClass).toStrictEqual(
      getPitchClassByRootNoteAndQuality(Notes["B"], Qualities["mayor"]),
    );
  });
});

describe("Transpose Chord", () => {
  it("Two notes forward chord", () => {
    const CMayor = createChord(Notes["C"], Qualities["mayor"]);
    const DMayor = transposeChord(CMayor, 2);

    expect(DMayor.root).toStrictEqual(Notes["D"]);
    expect(DMayor.quality.pitchClass).toStrictEqual(
      getPitchClassByRootNoteAndQuality(Notes["D"], Qualities["mayor"]),
    );
  });

  it("Two notes back chord", () => {
    const CMayor = createChord(Notes["C"], Qualities["mayor"]);
    const BMayor = transposeChord(CMayor, -2);

    const ASharp3 = parseNote("A#3");

    expect(BMayor.root).toStrictEqual(ASharp3);
    expect(BMayor.quality.pitchClass).toStrictEqual(
      getPitchClassByRootNoteAndQuality(Notes["A#"], Qualities["mayor"]),
    );
  });
});

describe("Get Pitch Class By Root Note And Quality", () => {
  it("Get pitch class by root note and quality", () => {
    const CPitchClass = getPitchClassByRootNoteAndQuality(
      Notes["C"],
      Qualities["mayor"],
    );

    expect(CPitchClass).toStrictEqual(Qualities["mayor"].pitchClass);
  });

  it("Get pitch class by root note and quality 2", () => {
    const CPitchClass = getPitchClassByRootNoteAndQuality(
      Notes["D"],
      Qualities["mayor"],
    );

    const DMayor = parseChord("Dmayor");

    expect(CPitchClass).toStrictEqual(DMayor.quality.pitchClass);
  });
});

describe("Get Quality By Quality Name", () => {
  it("Invalid Name", () => {
    const mayor = getQualityByQualityName("");
    expect(mayor.names).toBe(Qualities["mayor"].names);
    expect(mayor.pitchClass).toBe(Qualities["mayor"].pitchClass);
  });

  it("Valid Name", () => {
    const mayor = getQualityByQualityName("mayor");
    expect(mayor.names).toBe(Qualities["mayor"].names);
    expect(mayor.pitchClass).toBe(Qualities["mayor"].pitchClass);
  });

  it("Valid Shord Name", () => {
    const mayor = getQualityByQualityName("M");
    expect(mayor.names).toBe(Qualities["mayor"].names);
    expect(mayor.pitchClass).toBe(Qualities["mayor"].pitchClass);
  });

  it("Valid Valid Name 2", () => {
    const menor = getQualityByQualityName("menor");
    expect(menor.names).toBe(Qualities["menor"].names);
    expect(menor.pitchClass).toBe(Qualities["menor"].pitchClass);
  });

  it("Valid Valid Shord Name 2", () => {
    const menor = getQualityByQualityName("m");
    expect(menor.names).toBe(Qualities["menor"].names);
    expect(menor.pitchClass).toBe(Qualities["menor"].pitchClass);
  });
});
