import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

const selectVariants = cva(
  "appearance-none outline-none flex flex-row flex-nowrap items-center justify-between rounded p-3 pr-8 border border-border gap-3 shadow-sm text-ellipsis transition-all ease-in-out w-full truncate focus-visible:outline-none focus-within:ring-1 focus-within:ring-ring [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-white",
      },
      size: {
        default: "text-md",
        sm: "text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type SelectProps = {
  placeholder?: string;
  options: Record<number, string>;
  selection: number;
  onSelect: (selection: number) => void;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
} & VariantProps<typeof selectVariants>;

export default function Select({
  placeholder,
  options,
  selection,
  onSelect,
  disabled = false,
  ariaLabel,
  variant,
  size,
  className,
}: SelectProps) {
  const sortedOptions = Object.entries(options)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([key, value]) => ({ key: Number(key), value }));

  return (
    <div className="relative w-full">
      <select
        aria-label={ariaLabel}
        value={selection}
        className={cn(
          selectVariants({ variant, size, className }),
          disabled ? "cursor-default opacity-50" : "cursor-pointer pressed",
        )}
        onChange={(e) => onSelect(Number(e.target.value))}
        disabled={disabled}
      >
        {placeholder && (
          <option value={-1} disabled>
            {placeholder}
          </option>
        )}

        {sortedOptions.map(({ key, value }) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>

      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 h-4 w-4" />
    </div>
  );
}

export { selectVariants };
