"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { SearchBox } from "../ui/input/search-box";
import HeroTitle from "../ui/layout/hero-title";
import Section from "../ui/layout/section";
import GeneralInfoCards from "../ui/info/general-info-cards";
import MostRecentPublicationList from "../ui/publication-list/most-recent-publication-list";

import CreateButton from "../ui/buttons/create-button";
import RequestButton from "../ui/buttons/request-button";
import { Button } from "../ui/input/button";
import Link from "next/link";
import { Feather } from "lucide-react";

export default function HomeMain() {
  const params = useSearchParams();
  const router = useRouter();

  function handleSearch(search: string) {
    const setParams = new URLSearchParams(params.toString());
    if (search) {
      setParams.set("search", search);
      router.push(`/publication-list?${setParams.toString()}`);
    } else {
      router.push(`/publication-list?${setParams.toString()}`);
    }
  }

  return (
    <>
      <Section
        variant="default"
        className="flex flex-col flex-nowrap  justify-center gap-16 pt-32"
      >
        <div className="w-full flex flex-col flex-nowrap gap-3">
          <HeroTitle
            title="¡Buscar canciones!"
            description="Encuentra todo tipo de cancionen publicadas por los usuarios de nuestra comunidad"
          />
          <SearchBox className="w-full" onSearch={handleSearch} />
          <div className="flex flex-row flex-nowrap gap-3 self-end">
            <CreateButton />
            <RequestButton />
            <Button variant={"outline"} size={"sm"}>
              <Link href={"song-requests"} className="flex flex-row gap-2">
                <Feather />
                <span>Resolver</span>
              </Link>
            </Button>
          </div>
        </div>
        <MostRecentPublicationList />
      </Section>

      <Section
        className="bg-gradient-to-b from-background to-primary p-5 pt-32 grid grid-flow-row sm:grid-flow-col items-center justify-center gap-8 w-full"
        variant="full"
      >
        <GeneralInfoCards />
      </Section>
    </>
  );
}
