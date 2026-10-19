"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface SearchBoxProps extends React.ComponentProps<"input"> {
  onSearch?: (value: string) => void;
}

const SearchBox = React.forwardRef<HTMLInputElement, SearchBoxProps>(
  ({ className, onSearch, disabled, onKeyDown, ...props }, ref) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const value = formData.get("search")?.toString() ?? "";

      onSearch?.(value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);
    };

    return (
      <form
        onSubmit={handleSubmit}
        className={cn(
          "group flex items-center rounded overflow-hidden border bg-input text-md shadow-sm transition-colors focus-within:ring-1 focus-within:ring-ring",
          "",
          disabled && "pointer-events-none opacity-50",
          className,
        )}
      >
        <input
          {...props}
          ref={ref}
          name="search"
          disabled={disabled}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent px-4 text-xs w-full placeholder:text-muted outline-none rounded-none"
          placeholder="Buscar canción, autor, álbum..."
        />

        <Button
          size="sm"
          variant={"ocult_primary"}
          type="submit"
          disabled={disabled}
          className="rounded-none pressed border-l focus-visible:ring-0"
        >
          <Search />
          <span className="hidden sm:inline">Buscar</span>
        </Button>
      </form>
    );
  },
);

SearchBox.displayName = "SearchBox";

export { SearchBox };
