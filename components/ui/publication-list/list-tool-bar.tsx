"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Components
import Select from "../input/select";
import { SearchBox } from "../input/search-box";
import { Button } from "../input/button";

// Icons
import { LucideFilterX } from "lucide-react";

// Utilities
import { genres } from "@/lib/actions/utils/genres.util";

type ListToolBarProps = {
  isLoading?: boolean;
};

export default function ListToolBar({ isLoading }: ListToolBarProps) {
  // navigation
  const router = useRouter();
  const pathname = usePathname();

  // params
  const params = useSearchParams();
  const setParams = new URLSearchParams(params.toString());
  const sort = params.get("sort");
  const search = params.get("search");
  const genre = params.get("genre");

  // order
  const orderOptions = ["name", "newest", "oldest", "most_liked"];
  const orderNames = [
    "Por nombre",
    "Más reciente",
    "Más antiguo",
    "Mejor valorado",
  ];

  // hooks
  const [filterValue, setFilterValue] = useState<number>(
    sort ? orderOptions.indexOf(sort) : 0,
  );
  const [genreValue, setGenreValue] = useState<number>(
    genre ? genres.indexOf(genre) : -1,
  );
  const [searchValue, setSearchValue] = useState<string>(search ? search : "");

  // handles
  const handleSearch = (value: string) => {
    setParams.set("page", "1");

    if (value) {
      setParams.set("search", value);
    } else {
      setParams.delete("search");
    }

    router.push(`${pathname}?${setParams.toString()}`);
  };

  const handleFilterChange = (selection: number) => {
    setParams.set("page", "1");

    const value = orderOptions[selection];

    if (value) {
      setParams.set("sort", value);
    } else {
      setParams.delete("sort");
    }

    setFilterValue(selection);

    router.push(`${pathname}?${setParams.toString()}`);
  };

  const handleGenreChange = (selection: number) => {
    setParams.set("page", "1");

    const value = genres[selection];

    if (value) {
      setParams.set("genre", value);
    } else {
      setParams.delete("genre");
    }

    setGenreValue(selection);

    router.push(`${pathname}?${setParams.toString()}`);
  };

  return (
    <div className="flex w-full md:flex-row flex-nowrap gap-3 flex-col">
      <div className="flex flex-1 flex-col flex-nowrap gap-1">
        <SearchBox
          defaultValue={searchValue}
          onSearch={handleSearch}
          disabled={isLoading}
        />
      </div>

      <div className="border-l border-border"></div>
      <div className="flex flex-row flex-1 flex-nowrap gap-3 items-end">
        <Select
          size={"sm"}
          disabled={isLoading}
          placeholder={"Género"}
          options={genres}
          selection={genreValue}
          onSelect={handleGenreChange}
        />

        <Select
          size={"sm"}
          disabled={isLoading}
          options={orderNames}
          selection={filterValue}
          onSelect={handleFilterChange}
        />

        <Button
          disabled={
            isLoading || (genre == null && sort == null && search == null)
          }
          size="sm"
          variant={"outline_secondary"}
          className="h-min"
          onClick={() => {
            router.push(pathname);
          }}
        >
          <LucideFilterX />
        </Button>
      </div>
    </div>
  );
}
