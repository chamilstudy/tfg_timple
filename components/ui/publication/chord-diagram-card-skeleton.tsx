"use client";

import { LucideX } from "lucide-react";
import ChordDiagram from "./chord-diagram";

export default function ChordDiagramCardSkeleton() {
  return (
    <div className="border py-5 px-2 flex flex-col items-center rounded border-white bg-muted animate-pulse">
      <h3 className="font-bold text-xl invisible">Chord</h3>
      <div
        className="grid"
        style={{
          gridTemplateRows: `repeat(${5}, 1.5rem)`, // alto de las filas reducido
          gridTemplateColumns: `repeat(${5}, 1rem)`, // ancho de columnas reducido
        }}
      ></div>
    </div>
  );
}
