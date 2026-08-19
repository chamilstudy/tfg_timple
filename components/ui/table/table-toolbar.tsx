import Select from "../input/select";
import { Input } from "../input/input";
import { Search } from "lucide-react";

type TableToolbarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;

  filterValue: number;
  onFilterChange: (value: number) => void;
  filterOptions: string[];

  searchPlaceholder?: string;
  disabled?: boolean;
};

export default function TableToolbar({
  searchValue,
  onSearchChange,
  filterValue,
  onFilterChange,
  filterOptions,
  searchPlaceholder = "Buscar...",
  disabled = false,
}: TableToolbarProps) {
  return (
    <div className="w-full flex flex-row flex-nowrap gap-3">
      <div className="flex flex-col flex-nowrap gap-1 w-full">
        <p className="text-xs font-bold">Buscar</p>
        <Input
          icon={<Search />}
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col flex-nowrap gap-1">
        <p className="text-xs font-bold">Ordenar</p>
        <Select
          options={filterOptions}
          selection={filterValue}
          onSelect={onFilterChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
