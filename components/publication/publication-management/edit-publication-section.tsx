"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";

// Components
import PublicationForm from "@/components/ui/publication/publication-form";
import HeroTitle from "@/components/ui/layout/hero-title";

// Server Functions
import fetchPublicationByIdAction from "@/lib/domains/publication/fetch-publication-by-id";
import editPublicationAction from "@/lib/domains/publication/manage-publication/edit-publication";
import { processBodyWithChords } from "@/lib/actions/formatters/publication-body.formatter";
import Section from "@/components/ui/layout/section";

type EditPublicationSectionProps = {
  publication_id: string;
};

export default function EditPublicationSection({
  publication_id,
}: EditPublicationSectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [publicationId, setPublicationId] = useState("");
  const [songName, setSongName] = useState("");
  const [author, setAuthor] = useState("");
  const [album, setAlbum] = useState("");
  const [genres, setGenres] = useState<Array<string>>([]);
  const [rawBody, setRawBody] = useState("");
  const [body, setBody] = useState("");
  const [rawChords, setRawChords] = useState();
  const [chords, setChords] = useState<Record<string, Array<number>>>({});

  const router = useRouter();

  const handlePublicationEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await editPublicationAction({ body, publication_id });

    router.push(`/profile`);
    setIsLoading(false);
  };

  const fetchPublicPublication = async () => {
    setIsLoading(true);
    const result = await fetchPublicationByIdAction({
      publication_id: decodeURIComponent(publication_id),
    });

    if (!result.success) {
      notFound();
    }

    setPublicationId(result.data.publication_id);
    setSongName(result.data.song_name);
    setAuthor(result.data.author);
    setAlbum(result.data.album);
    setGenres(result.data.genres);
    setRawBody(result.data.body);
    setRawChords(result.data.chords);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPublicPublication();
  }, []);

  useEffect(() => {
    if (!rawChords) {
      return;
    }
    const processedChords: Record<string, Record<string, number[]>> = rawChords[
      "timple"
    ][0];

    if (!processedChords) {
      setChords({});
      setBody(rawBody); // Si no hay acorde para la transposición, dejamos el body sin cambios
      return;
    }

    // Filtramos los acordes y los preparamos
    let result: Record<string, number[]> = {};
    Object.values(processedChords).forEach((indexObj) => {
      Object.entries(indexObj).forEach(([chordName, frets]) => {
        result[chordName] = frets;
      });
    });

    const processedBody = processBodyWithChords(rawBody, result);

    setBody(processedBody);
  }, [rawBody]);

  return (
    <Section className="grid gap-6 p-6 py-16">
      <HeroTitle
        title="Editar canción"
        description="Realiza las modificaciones en el campo canción"
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
        isLoading={isLoading}
        disabled={true}
        handleSubmit={handlePublicationEdit}
      />
    </Section>
  );
}
