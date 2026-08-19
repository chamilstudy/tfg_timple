"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Server Functions
import createPublicationAction from "@/lib/domains/publication/manage-publication/create-publication";

// Components
import PublicationForm from "@/components/ui/publication/publication-form";
import HeroTitle from "@/components/ui/layout/hero-title";

// DTOs
import { ErrorDTO } from "@/lib/dto/error/error.dto";
import Section from "@/components/ui/layout/section";

export default function NewPublicationSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [songName, setSongName] = useState("");
  const [author, setAuthor] = useState("");
  const [album, setAlbum] = useState("");
  const [genres, setGenres] = useState<Array<string>>([]);
  const [body, setBody] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState<ErrorDTO>();

  const router = useRouter();

  const handleCreatePublication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(undefined);

    const createPublicationResponse = await createPublicationAction({
      songName,
      author,
      album,
      genres,
      body,
    });

    if (!createPublicationResponse.success) {
      setError(createPublicationResponse.error);
      setIsLoading(false);
      return;
    }

    router.push(`/profile`);
  };

  return (
    <Section className="grid gap-6 p-6 py-16">
      <HeroTitle
        title="Crear canción"
        description="Completa los siguientes campos para publicar una nueva canción"
      />

      <PublicationForm
        songName={songName}
        setSongName={setSongName}
        author={author}
        setAuthor={setAuthor}
        album={album}
        setAlbum={setAlbum}
        genres={genres}
        setGenres={setGenres}
        body={body}
        setBody={setBody}
        disabled={disabled}
        isLoading={isLoading}
        handleSubmit={handleCreatePublication}
        error={error}
      />
    </Section>
  );
}
