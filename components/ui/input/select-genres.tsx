import { useEffect, useState } from "react";
import { genres } from "@/lib/actions/utils/genres.util";

type SelectGenresProps = {
  onSelect: (selection: Array<string>) => void;
  selection: Array<string>;
  disabled?: boolean;
};

const EMPTY = "Seleccionar";

export default function SelectGenres({
  onSelect,
  selection,
  disabled = false,
}: SelectGenresProps) {
  const [selection1, setSelection1] = useState(selection[0] || EMPTY);
  const [selection2, setSelection2] = useState(selection[1] || EMPTY);

  // 🔁 Sync con props
  useEffect(() => {
    setSelection1(selection[0] || EMPTY);
    setSelection2(selection[1] || EMPTY);
  }, [selection]);

  // 🔁 Emitir cambios
  useEffect(() => {
    const result = [
      selection1 !== EMPTY ? selection1 : "",
      selection2 !== EMPTY ? selection2 : "",
    ];

    const a = [];
    if (selection1 !== EMPTY) a.push(selection1);
    if (selection2 !== EMPTY) a.push(selection2);

    onSelect(a);
  }, [selection1, selection2]);

  // 🚫 evitar duplicados dinámicamente
  const availableFor1 = genres.filter((g) => g !== selection2);
  const availableFor2 = genres.filter((g) => g !== selection1);

  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {/* SELECT 1 */}
      <select
        value={selection1}
        onChange={(e) => setSelection1(e.target.value)}
        disabled={disabled}
        className="rounded p-3 border bg-white shadow-sm disabled:opacity-50"
      >
        <option value={EMPTY}>{EMPTY}</option>

        {availableFor1.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      {/* SELECT 2 */}
      <select
        value={selection2}
        onChange={(e) => setSelection2(e.target.value)}
        disabled={disabled}
        className="rounded p-3 border bg-white shadow-sm disabled:opacity-50"
      >
        <option value={EMPTY}>{EMPTY}</option>

        {availableFor2.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
    </div>
  );
}
