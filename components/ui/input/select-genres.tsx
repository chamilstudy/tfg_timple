import { useEffect, useState } from "react";

// Utils
import { genres } from "@/lib/actions/utils/genres.util";

// Components
import Select from "./select";

type SelectGenresProps = {
  onSelect: (selection: Array<string>) => void;
  selection: Array<string>;
  disabled?: boolean;
};

const EMPTY = "Seleccionar";

// Convertir los géneros a Record<number, string>
const genreOptions: Record<number, string> = Object.fromEntries(
  genres.map((genre, index) => [index, genre]),
);

export default function SelectGenres({
  onSelect,
  selection,
  disabled = false,
}: SelectGenresProps) {
  const [selection1, setSelection1] = useState(
    selection[0] ? genres.indexOf(selection[0]) : -1,
  );

  const [selection2, setSelection2] = useState(
    selection[1] ? genres.indexOf(selection[1]) : -1,
  );

  // Sincronizar los estados con las props
  useEffect(() => {
    setSelection1(selection[0] ? genres.indexOf(selection[0]) : -1);
    setSelection2(selection[1] ? genres.indexOf(selection[1]) : -1);
  }, [selection]);

  // Emitir los cambios
  useEffect(() => {
    const selectedGenres = [selection1, selection2]
      .filter((index) => index !== -1)
      .map((index) => genres[index]);

    onSelect(selectedGenres);
  }, [selection1, selection2, onSelect]);

  // Evitar que ambos selectores tengan el mismo género
  const availableFor1 = Object.fromEntries(
    Object.entries(genreOptions).filter(([key]) => Number(key) !== selection2),
  );

  const availableFor2 = Object.fromEntries(
    Object.entries(genreOptions).filter(([key]) => Number(key) !== selection1),
  );

  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      <Select
        ariaLabel="Primer género"
        placeholder={EMPTY}
        options={availableFor1}
        selection={selection1}
        onSelect={setSelection1}
        disabled={disabled}
      />

      <Select
        ariaLabel="Segundo género"
        placeholder={EMPTY}
        options={availableFor2}
        selection={selection2}
        onSelect={setSelection2}
        disabled={disabled}
      />
    </div>
  );
}
