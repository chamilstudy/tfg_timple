// Components
import Section from "@/components/ui/layout/section";
import ChordDiagram from "../../ui/publication/chord-diagram";
import ChordDiagramCard from "@/components/ui/publication/chord-diagram-card";

type PublicationChordsProps = {
  chords: Record<string, Array<number>>;
  isLoading: boolean;
};

export default function PublicationChords({
  chords,
  isLoading,
}: PublicationChordsProps) {
  return (
    <div className="flex flex-col gap-6 items-start w-full">
      <h3 className="font-bold">Acordes</h3>
      <div className="flex flex-row flex-wrap gap-6 flex-shrink">
        {Object.entries(chords).map(([chordName, frets]) => (
          <ChordDiagramCard
            key={chordName}
            chordName={chordName}
            fretPositions={frets}
            fretDepth={5}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
}
