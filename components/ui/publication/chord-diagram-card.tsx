"use client";

import { LucideX } from "lucide-react";
import ChordDiagram from "./chord-diagram";
import ChordDiagramCardSkeleton from "./chord-diagram-card-skeleton";

type ChordDiagramCardProps = {
  chordName: string;
  fretPositions: number[];
  fretDepth?: number;
  isLoading: boolean;
};

export default function ChordDiagramCard({
  chordName,
  fretPositions,
  fretDepth,
  isLoading,
}: ChordDiagramCardProps) {
  return isLoading ? (
    <ChordDiagramCardSkeleton />
  ) : (
    <div className="border py-5 px-2 flex flex-col items-center rounded border-white">
      <h3 className="font-bold text-xl">{chordName}</h3>
      <ChordDiagram fretPositions={fretPositions} fretDepth={fretDepth} />
    </div>
  );
}
