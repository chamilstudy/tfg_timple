"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

// Components
import HeroTitle from "../ui/layout/hero-title";

// Server Functions
import fetchSongRequestsAction from "@/lib/domains/song-request/fetch-song-requests";

// DTOs
import { SongRequestsDTO } from "@/lib/dto/song-request/song-requests.dto";
import SongRequestsTable from "../ui/table/song-requests-table";
import RequestButton from "../ui/buttons/request-button";
import Section from "../ui/layout/section";

export default function SongRequestsMain() {
  const [isLoading, setIsLoading] = useState(false);
  const [rawSongRequests, setRawSongRequests] = useState<SongRequestsDTO>([]);

  const fetchProfile = async () => {
    setIsLoading(true);
    const fetchSongRequestsResponse = await fetchSongRequestsAction();

    if (!fetchSongRequestsResponse.success) {
      notFound();
    }

    setRawSongRequests(fetchSongRequestsResponse.data);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <Section className="py-16 flex flex-col flex-nowrap gap-3">
        <HeroTitle
          title="Solicitudes"
          description="Aquí encontrarás las canciones solicitadas por nuestros usuarios"
          action={<RequestButton />}
        />
      </Section>

      <hr className="w-full border-white"></hr>

      <SongRequestsTable
        isLoading={isLoading}
        rawSongRequests={rawSongRequests}
      />
    </>
  );
}
