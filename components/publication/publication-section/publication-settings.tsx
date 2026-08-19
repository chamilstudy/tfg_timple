// Components
import Section from "@/components/ui/layout/section";
import Select from "../../ui/input/select";
import ToggleButton from "../../ui/input/toggle-button";

type PublicationSettingsProps = {
  instrument: string;
  setInstrument: (instrument: string) => void;
  notation: string;
  setNotation: (notation: string) => void;
  transposition: number;
  transpositionMap: Record<number, string>;
  setTransposition: (transposition: number) => void;
  isLoading: boolean;
};

export default function PublicationSettings({
  instrument,
  setInstrument,
  notation,
  setNotation,
  transposition,
  transpositionMap,
  setTransposition,
  isLoading,
}: PublicationSettingsProps) {
  return (
    <div className="flex flex-row gap-3 justify-center text-xs w-full">
      <div className="w-full flex-1 flex flex-col gap-1">
        <h3>Instrumentos</h3>
        <ToggleButton
          options={["timple", "contra"]}
          currentOption={instrument}
          setCurrent={setInstrument}
          disabled={isLoading}
        />
      </div>
      <div className="w-full flex-1 flex flex-col gap-1">
        <h3>Notación</h3>
        <ToggleButton
          options={["c", "do"]}
          currentOption={notation}
          setCurrent={setNotation}
          disabled={isLoading}
        />
      </div>
      <div className="w-full flex-1 flex flex-col gap-1">
        <h3>Transposición</h3>
        <Select
          selection={transposition}
          onSelect={setTransposition}
          options={transpositionMap}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
