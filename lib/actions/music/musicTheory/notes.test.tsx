import { describe, it, expect } from "vitest";
import {
  createNote,
  getNoteByNoteName,
  nextNote,
  parseNote,
  previousNote,
  transposeNote,
} from "./notes";

describe("Find Note By Name", () => {
  it("Invalid Name", () => {
    const A = getNoteByNoteName("");
    expect(A.name.default).toBe("A");
    expect(A.name.latin).toBe("La");
    expect(A.octave).toBe(4);
    expect(A.pitchClass).toBe(9);
  });

  it("Valid Name", () => {
    const C = getNoteByNoteName("C");
    expect(C.name.default).toBe("C");
    expect(C.name.latin).toBe("Do");
    expect(C.octave).toBe(4);
    expect(C.pitchClass).toBe(0);
  });
});

describe("Create Note", () => {
  it("Invalid Octave", () => {
    const C = createNote("C", -1);
    expect(C.name.default).toBe("C");
    expect(C.name.latin).toBe("Do");
    expect(C.octave).toBe(4);
    expect(C.pitchClass).toBe(0);
  });

  it("Invalid Note name", () => {
    const A = createNote("", 0);
    expect(A.name.default).toBe("A");
    expect(A.name.latin).toBe("La");
    expect(A.octave).toBe(0);
    expect(A.pitchClass).toBe(9);
  });

  it("Invalid Note and Octave", () => {
    const A = createNote("", -1);
    expect(A.name.default).toBe("A");
    expect(A.name.latin).toBe("La");
    expect(A.octave).toBe(4);
    expect(A.pitchClass).toBe(9);
  });

  it("Create Natural Note", () => {
    const C = createNote("C", 4);
    expect(C.name.default).toBe("C");
    expect(C.name.latin).toBe("Do");
    expect(C.octave).toBe(4);
    expect(C.pitchClass).toBe(0);
  });

  it("Create Accidental Note", () => {
    const C = createNote("C#", 4);
    expect(C.name.default).toBe("C#");
    expect(C.name.latin).toBe("Do#");
    expect(C.octave).toBe(4);
    expect(C.pitchClass).toBe(1);
  });
});

describe("Next Note", () => {
  it("Next note at the start of octave", () => {
    const C = createNote("C", 4);
    const Cflat = nextNote(C);
    expect(Cflat.name.default).toBe("C#");
    expect(Cflat.name.latin).toBe("Do#");
    expect(Cflat.octave).toBe(4);
    expect(Cflat.pitchClass).toBe(1);
  });

  it("Next note at the end of octave", () => {
    const B = createNote("B", 4);
    const C = nextNote(B);
    expect(C.name.default).toBe("C");
    expect(C.name.latin).toBe("Do");
    expect(C.octave).toBe(5);
    expect(C.pitchClass).toBe(0);
  });
});

describe("Previous Note", () => {
  it("Previous note at the start of octave", () => {
    const C = createNote("C", 4);
    const B = previousNote(C);
    expect(B.name.default).toBe("B");
    expect(B.name.latin).toBe("Si");
    expect(B.octave).toBe(3);
    expect(B.pitchClass).toBe(11);
  });

  it("Previous note at the end of octave", () => {
    const B = createNote("B", 4);
    const Aflat = previousNote(B);
    expect(Aflat.name.default).toBe("A#");
    expect(Aflat.name.latin).toBe("La#");
    expect(Aflat.octave).toBe(4);
    expect(Aflat.pitchClass).toBe(10);
  });
});

describe("Traspose Note", () => {
  it("Two steps forward from start of octave", () => {
    const C = createNote("C", 4);
    const D = transposeNote(C, 2);
    expect(D.name.default).toBe("D");
    expect(D.name.latin).toBe("Re");
    expect(D.octave).toBe(4);
    expect(D.pitchClass).toBe(2);
  });

  it("Two steps forward from end of octave", () => {
    const B = createNote("B", 4);
    const Cflat = transposeNote(B, 2);
    expect(Cflat.name.default).toBe("C#");
    expect(Cflat.name.latin).toBe("Do#");
    expect(Cflat.octave).toBe(5);
    expect(Cflat.pitchClass).toBe(1);
  });

  it("Two steps forward from before end of octave", () => {
    const Aflat = createNote("A#", 4);
    const C = transposeNote(Aflat, 2);
    expect(C.name.default).toBe("C");
    expect(C.name.latin).toBe("Do");
    expect(C.octave).toBe(5);
    expect(C.pitchClass).toBe(0);
  });

  it("Twelve steps forward from start of octave", () => {
    const C = createNote("C", 4);
    const C5 = transposeNote(C, 12);
    expect(C5.name.default).toBe("C");
    expect(C5.name.latin).toBe("Do");
    expect(C5.octave).toBe(5);
    expect(C5.pitchClass).toBe(0);
  });

  it("Twelve steps forward from middle of octave", () => {
    const Fflat = createNote("F#", 4);
    const Fflat5 = transposeNote(Fflat, 12);
    expect(Fflat5.name.default).toBe("F#");
    expect(Fflat5.name.latin).toBe("Fa#");
    expect(Fflat5.octave).toBe(5);
    expect(Fflat5.pitchClass).toBe(6);
  });

  it("Two steps back from start of octave", () => {
    const C = createNote("C", 4);
    const Aflat = transposeNote(C, -2);
    expect(Aflat.name.default).toBe("A#");
    expect(Aflat.name.latin).toBe("La#");
    expect(Aflat.octave).toBe(3);
    expect(Aflat.pitchClass).toBe(10);
  });

  it("Two steps back from end of octave", () => {
    const B = createNote("B", 4);
    const A = transposeNote(B, -2);
    expect(A.name.default).toBe("A");
    expect(A.name.latin).toBe("La");
    expect(A.octave).toBe(4);
    expect(A.pitchClass).toBe(9);
  });

  it("Two steps back from after start of octave", () => {
    const C = createNote("C", 4);
    const Aflat = transposeNote(C, -2);
    expect(Aflat.name.default).toBe("A#");
    expect(Aflat.name.latin).toBe("La#");
    expect(Aflat.octave).toBe(3);
    expect(Aflat.pitchClass).toBe(10);
  });

  it("Twelve steps back from start of octave", () => {
    const C = createNote("C", 4);
    const C3 = transposeNote(C, -12);
    expect(C3.name.default).toBe("C");
    expect(C3.name.latin).toBe("Do");
    expect(C3.octave).toBe(3);
    expect(C3.pitchClass).toBe(0);
  });

  it("Twelve steps back from middle of octave", () => {
    const Fflat = createNote("F#", 4);
    const Fflat3 = transposeNote(Fflat, -12);
    expect(Fflat3.name.default).toBe("F#");
    expect(Fflat3.name.latin).toBe("Fa#");
    expect(Fflat3.octave).toBe(3);
    expect(Fflat3.pitchClass).toBe(6);
  });
});

describe("Parse Note", () => {
  it("Invalid Note Name", () => {
    const A = parseNote("");
    expect(A.name.default).toBe("A");
    expect(A.name.latin).toBe("La");
    expect(A.octave).toBe(4);
    expect(A.pitchClass).toBe(9);
  });

  it("Valid Note Name", () => {
    const A = parseNote("C10");
    expect(A.name.default).toBe("C");
    expect(A.name.latin).toBe("Do");
    expect(A.octave).toBe(10);
    expect(A.pitchClass).toBe(0);
  });
});
