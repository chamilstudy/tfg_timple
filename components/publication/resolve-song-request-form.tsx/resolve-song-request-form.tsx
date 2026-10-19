"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";

// Components
import HeroTitle from "@/components/ui/layout/hero-title";
import PublicationForm from "@/components/ui/publication/publication-form";

// Server Functions
import fetchSongRequestsByIdAction from "@/lib/domains/song-request/fetch-song-request-by-id";
import resolveSongRequestAction from "@/lib/domains/song-request/manage-song-request/resolve-song-request";

// DTOs
import SongRequestDTO from "@/lib/dto/song-request/song-request.dto";
import Section from "@/components/ui/layout/section";

export default function ResolveSongRequestForm() {
  const searchParams = useSearchParams();
  const requestId = searchParams.get("request-id") ?? "";

  const [isLoading, setIsLoading] = useState(false);
  const [songRequest, setSongRequest] = useState<SongRequestDTO>();
  const [songName, setSongName] = useState("");
  const [author, setAuthor] = useState("");
  const [album, setAlbum] = useState("");
  const [genres, setGenres] = useState<Array<string>>([]);
  const [body, setBody] = useState("");

  const router = useRouter();

  const fetchPublicPublication = async () => {
    const fetchSongRequestsByIdResponse = await fetchSongRequestsByIdAction({
      requestId,
    });

    if (fetchSongRequestsByIdResponse.error) {
      notFound();
    }

    setSongRequest(fetchSongRequestsByIdResponse.data);
    setSongName(fetchSongRequestsByIdResponse.data.song_name);
    setAuthor(fetchSongRequestsByIdResponse.data.author);
    setAlbum(fetchSongRequestsByIdResponse.data.album);
    setGenres(fetchSongRequestsByIdResponse.data.genres);
  };

  useEffect(() => {
    if (requestId == "") {
      notFound();
    }

    fetchPublicPublication();
  }, [requestId]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (songRequest) {
      resolveSongRequestAction({
        requestId: songRequest.request_id,

        body: body,
      });
    }
    router.push(`/requests`);

    setIsLoading(false);
  };

  return (
    <Section className="grid gap-6 p-6 py-16">
      <HeroTitle
        title="Resolver canción"
        description="Completa los siguientes campos para publicar una nueva canción"
      />

      <PublicationForm
        songName={songName}
        setSongName={() => {}}
        author={author}
        setAuthor={setAuthor}
        album={album}
        setAlbum={setAlbum}
        genres={genres}
        setGenres={setGenres}
        body={body}
        setBody={setBody}
        isLoading={isLoading}
        disabled={true}
        handleSubmit={handleSignUp}
      />
    </Section>
  );
}
