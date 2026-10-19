"use client";

import Select from "../input/select";
import { SearchBox } from "../input/search-box";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";

import { genres } from "@/lib/actions/utils/genres.util";
import { Button } from "../input/button";
import { LucideFilterX } from "lucide-react";

const orderOptions = ["name", "newest", "oldest"];
const orderNames = ["Por nombre", "Más reciente", "Más antiguo"];

type PublicationListToolBarProps = {
  isLoading?: boolean;
};

export default function PublicationListToolBar({
  isLoading,
}: PublicationListToolBarProps) {
  const pathname = usePathname();
  const params = useSearchParams();
  const setParams = new URLSearchParams(params.toString());
  const router = useRouter();

  const sort = params.get("sort");
  const search = params.get("search");
  const genre = params.get("genre");

  const [filterValue, setFilterValue] = useState<number>(
    sort ? orderOptions.indexOf(sort) : 0,
  );
  const [genreValue, setGenreValue] = useState<number>(
    genre ? genres.indexOf(genre) : -1,
  );
  const [searchValue, setSearchValue] = useState<string>(search ? search : "");

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
        <div className="flex  flex-1 flex-col flex-nowrap gap-1">
          <Select
            disabled={isLoading}
            placeholder="Género"
            options={genres}
            selection={genreValue}
            onSelect={handleGenreChange}
          />
        </div>
        <div className="flex flex-1 flex-col flex-nowrap gap-1">
          <Select
            disabled={isLoading}
            options={orderNames}
            selection={filterValue}
            onSelect={handleFilterChange}
          />
        </div>
        <Button
          disabled={
            isLoading || (genre == null && sort == null && search == null)
          }
          size="sm"
          variant={"outline_secondary"}
          className="h-min"
          onClick={() => {
            setParams.delete("genre");
            setParams.delete("sort");
            setParams.delete("search");
            router.push(`${pathname}?${setParams.toString()}`);
          }}
        >
          <LucideFilterX />
        </Button>
      </div>
    </div>
  );
}
