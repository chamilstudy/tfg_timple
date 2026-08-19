import { transposeChord, parseChord } from "../music/musicTheory/chords";
import { getContraChord, getTimpleChord } from "../music/chordAlg";
import { text } from "stream/consumers";

export function publicationBodyFormatter(
  publicationBody: string,
): Record<string, Record<string, Record<string, Record<string, number[]>>>> {
  if (!publicationBody) return {};

  const chordRegex =
    /^(?:\s*((?:[A-G]|Do|Re|Mi|Fa|Sol|La|Si)[#b]?(?:\s*(?:mayor|maj|M|menor|m|7|m7|maj7|dim|aug|dim7|aug7)?)?)\s*)+$/;

  const lines = publicationBody.split("\n");
  const allChords: string[] = []; // aquí guardamos los acordes en orden de aparición
  const result: Record<
    string,
    Record<string, Record<string, Record<string, number[]>>>
  > = {};

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (chordRegex.test(trimmed)) {
      const chordsInLine = line.split(/\s+/).filter(Boolean);
      chordsInLine.forEach((chord) => {
        if (!allChords.includes(chord)) allChords.push(chord);
      });
    }
  });

  // Generamos transposiciones para cada acorde
  result["timple"] ??= {};
  for (let transpose = -6; transpose <= 6; transpose++) {
    result["timple"][transpose] ??= {};
    allChords.forEach((chord, idx) => {
      result["timple"][transpose][idx] ??= {};
      const chordTransposed = transposeChord(parseChord(chord), transpose);
      const chordTransposedName =
        chordTransposed.root.name.default +
        chordTransposed.quality.names.values().next().value;
      const chordDiagram = getTimpleChord(chordTransposedName, 0).fretPositions;
      if (chordDiagram) {
        result["timple"][transpose][idx][chordTransposedName] = chordDiagram;
      }
    });
  }
  result["contra"] ??= {};

  for (let transpose = -6; transpose <= 6; transpose++) {
    result["contra"][transpose] ??= {};
    allChords.forEach((chord, idx) => {
      result["contra"][transpose][idx] ??= {};
      const chordTransposed = transposeChord(parseChord(chord), transpose);
      const chordTransposedName =
        chordTransposed.root.name.default +
        chordTransposed.quality.names.values().next().value;
      const chordDiagram = getContraChord(chordTransposedName, 0).fretPositions;
      if (chordDiagram) {
        result["contra"][transpose][idx][chordTransposedName] = chordDiagram;
      }
    });
  }

  let bodyWithIds = publicationBody;
  result
    ? Object.entries(result).forEach((chord, idx) => {
        const regex = new RegExp(`\\b${chord}\\b`, "g");
        bodyWithIds = bodyWithIds.replace(regex, idx.toString());
      })
    : null;

  return result;
}

type ChordMap = Record<string, Record<string, Record<string, number[]>>>;

/**
 * Reemplaza índices en el body por nombres de acordes según el mapa de chords.
 * @param body Texto original (puede tener $1$, §1§, etc.)
 * @param chords Mapa índice -> nombre de acorde
 * @returns Body procesado, con acordes limpios y sin $ ni §
 */
export /**
 * Reemplaza índices en el body por nombres de acordes según el mapa de chords.
 * @param body Texto original (puede tener $1$, §1§, etc.)
 * @param chords Mapa índice -> arreglo de números del acorde
 *               Ej: { "0": [0,2,3], "1": [3,2,0] }
 *               La clave del objeto será el nombre del acorde.
 * @returns Body procesado, con acordes limpios y sin $ ni §
 */
function processBodyWithChords(
  body: string,
  chords: Record<string, number[]>,
): string {
  if (!body || !chords) return body;

  // Crear un mapa índice -> nombre del acorde
  const chordFlatMap: Record<string, string> = {};
  Object.entries(chords).forEach(([chordName, _positions], idx) => {
    chordFlatMap[idx] = chordName; // clave = índice, valor = nombre del acorde
  });

  let processed = body;

  // Reemplaza $indice$ por nombre del acorde
  processed = processed.replace(
    /\$(\d+)\$/g,
    (_, idx) => chordFlatMap[idx] || "",
  );

  // Reemplaza §indice§ por nombre del acorde
  processed = processed.replace(
    /§(\d+)§/g,
    (_, idx) => chordFlatMap[idx] || "",
  );

  // Limpiar cualquier § restante
  processed = processed.replace(/§/g, "");

  return processed;
}

export function replaceChordLines(text: string): string {
  const chordLineRegex =
    /^(?:\s*(?:[A-G]|Do|Re|Mi|Fa|Sol|La|Si)[#b]?(?:mayor|maj|M|menor|m|7|m7|maj7|dim|aug|dim7|aug7)?)+\s*$/;

  const chordRegex =
    /(Do|Re|Mi|Fa|Sol|La|Si|[A-G])[#b]?(?:mayor|maj|M|menor|m|7|m7|maj7|dim|aug|dim7|aug7)?/g;

  let chordCounter = 0;

  // 🔥 NUEVO: mapa acorde -> índice
  const chordIndexMap: Record<string, number> = {};

  return text
    .split("\n")
    .map((line) => {
      if (!chordLineRegex.test(line.trim())) return line;

      return line.replace(chordRegex, (match) => {
        // Si el acorde ya existe, reutiliza su índice
        if (!(match in chordIndexMap)) {
          chordIndexMap[match] = chordCounter;
          chordCounter++;
        }

        return `§${chordIndexMap[match]}§`;
      });
    })
    .join("\n");
}
