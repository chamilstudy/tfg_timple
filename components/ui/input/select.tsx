import { cn } from "@/lib/utils";
import { ArrowDown, ChevronDown } from "lucide-react";

type SelectProps = {
  options: Record<number, string>;
  selection: number;
  onSelect: (selection: number) => void;
  disabled?: boolean;
  ariaLabel?: string;
};

export default function Select({
  options,
  selection,
  onSelect,
  disabled,
  ariaLabel,
}: SelectProps) {
  const sortedOptions = Object.entries(options)
    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
    .map(([key, value]) => ({ key: parseInt(key), value }));

  return (
    <div className="relative w-full">
      {" "}
      <select
        aria-label={ariaLabel}
        value={selection}
        className={cn(
          "appearance-none outline-none flex flex-row flex-nowrap items-center justify-between bg-white rounded p-3 pr-10 border border-border gap-3 cursor-pointer disabled:opacity-50 focus-visible:outline-none focus-within:ring-1 focus-within:ring-ring shadow-sm [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-ellipsis transition-all ease-in-out w-full truncate",
          disabled ? "cursor-default opacity-50" : "cursor-pointer",
        )}
        onChange={(e) => onSelect(parseInt(e.target.value))}
        disabled={disabled}
      >
        {sortedOptions.map(({ key, value }) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 h-[1rem]" />
    </div>
  );
}
