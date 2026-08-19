"use client";

import { LucideX } from "lucide-react";

type ChordDiagramProps = {
  fretPositions: number[];
  fretDepth?: number;
};

export default function ChordDiagram({
  fretPositions,
  fretDepth = 5,
}: ChordDiagramProps) {
  const strings = fretPositions.length;

  function renderNote(stringIdx: number, fretIdx: number) {
    const fret = fretPositions[stringIdx];

    if (fretIdx === 0) {
      if (fret === -1)
        return <LucideX className="relative top-1 -left-3 w-3 h-2" />;
      if (fret === 0) return <></>;
    }

    if (fret === fretIdx)
      return (
        <div className="rounded-full h-3 w-3 bg-black relative top-1/4 -left-1/2"></div>
      );

    return null;
  }

  function getCellClasses(fretIdx: number, stringIdx: number) {
    const isFirstCol = stringIdx === 0;
    const isLastCol = stringIdx === strings - 1;
    const isFirstRow = fretIdx === 0;

    let classes = "border border-r-black border-b-black";

    if (isFirstRow) classes = "border-b-8 border-black"; // borde más fino

    if (isFirstCol && !isFirstRow)
      classes = "border-l border-b border-r border-black";

    if (isLastCol) classes = "border border-black/0"; // elimina borde derecho de la última columna

    return classes;
  }

  return (
    <div className="inline-block relative">
      <div
        className="grid"
        style={{
          gridTemplateRows: `repeat(${fretDepth}, 1.5rem)`, // alto de las filas reducido
          gridTemplateColumns: `repeat(${strings}, 1rem)`, // ancho de columnas reducido
        }}
      >
        {Array.from({ length: fretDepth }).map((_, fretIdx) =>
          Array.from({ length: strings }).map((_, stringIdx) => (
            <div
              key={`${stringIdx}-${fretIdx}`}
              className={`${getCellClasses(fretIdx, stringIdx)} relative left-1/2`}
            >
              {renderNote(stringIdx, fretIdx)}
            </div>
          )),
        )}
      </div>
    </div>
  );
}
