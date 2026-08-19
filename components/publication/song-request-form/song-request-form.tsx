"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Components
import { Input } from "../../ui/input/input";
import { Label } from "../../ui/info/label";
import HeroTitle from "@/components/ui/layout/hero-title";
import { DiscAlbum, Music4, User, LoaderCircle } from "lucide-react";
import { Checkbox } from "../../ui/input/checkbox";
import Link from "next/link";
import { Button } from "../../ui/input/button";
import SelectGenres from "../../ui/input/select-genres";

// Server Functions
import createSongRequestAction from "@/lib/domains/song-request/manage-song-request/create-song-request";
import Section from "@/components/ui/layout/section";

export default function SongRequestForm() {
  const [isLoading, setIsLoading] = useState(false);

  const [songName, setSongName] = useState("");
  const [author, setAuthor] = useState("");
  const [album, setAlbum] = useState("");
  const [genres, setGenres] = useState<Array<string>>([]);

  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await createSongRequestAction({
      songName,
      author,
      album,
      genres,
    });

    router.push(`/profile`);

    setIsLoading(false);
  };

  return (
    <Section className="grid gap-6 p-6 py-16">
      <HeroTitle
        title="Solicitar canción"
        description="Completa los siguientes campos para solicitar una canción"
      />

      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
        onSubmit={handleSignUp}
      >
        {/* Nombre */}
        <div className="grid gap-2">
          <Label htmlFor="songname">Nombre*</Label>
          <Input
            maxLength={100}
            id="songname"
            type="text"
            icon={<Music4 />}
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            placeholder="Escribe el nombre de la canción"
            required
          />
        </div>

        {/* Autor */}
        <div className="grid gap-2">
          <Label htmlFor="author">Autor</Label>
          <Input
            maxLength={100}
            id="author"
            type="text"
            icon={<User />}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Escribe el nombre del autor"
          />
        </div>

        {/* Album */}
        <div className="grid gap-2">
          <Label htmlFor="album">Album</Label>
          <Input
            maxLength={100}
            id="album"
            type="text"
            icon={<DiscAlbum />}
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            placeholder="Escribe el nombre del album"
          />
        </div>

        {/* Generos */}
        <div className="grid gap-2 w-full">
          <Label htmlFor="album">Generos</Label>
          <SelectGenres
            onSelect={setGenres}
            selection={genres}
            disabled={isLoading}
          />
        </div>

        {/* Términos y condiciones */}
        <div className="text-xs inline-flex gap-3 sm:col-span-2">
          <Checkbox id="tac" name="tac" required />
          <span>
            He leído y cumplo con las reglas establecidas en los{" "}
            <Link className="link" href="/tac" target="_black" rel="noopener">
              términos y condiciones
            </Link>{" "}
            del servicio
          </span>
        </div>

        {/* Botones */}
        <div className="flex flex-row gap-3 sm:col-span-2 max-w-sm ">
          <Link href="/">
            <Button variant="destructive">Cancelar</Button>
          </Link>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <span className="flex gap-2 items-center">
                <LoaderCircle className="animate-spin" />
                Publicando...
              </span>
            ) : (
              "Publicar"
            )}
          </Button>
        </div>
      </form>
    </Section>
  );
}
