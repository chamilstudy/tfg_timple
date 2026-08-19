"use client";

import { Label } from "../info/label";
import { Input } from "../input/input";
import { Checkbox } from "../input/checkbox";
import { Button } from "../input/button";
import Link from "next/link";
import SelectGenres from "../input/select-genres";
import { DiscAlbum, LoaderCircle, Music4, User } from "lucide-react";
import AdvanceTextArea from "../input/advance-text-area/advance-text-area";
import { ErrorDTO } from "@/lib/dto/error/error.dto";
import InfoMessage from "../info/info-message";

type PublicationFormProps = {
  songName: string;
  setSongName: (value: string) => void;
  author: string;
  setAuthor: (value: string) => void;
  album: string;
  setAlbum: (value: string) => void;
  genres: Array<string>;
  setGenres: (value: Array<string>) => void;
  body: string;
  setBody: (value: string) => void;
  isLoading: boolean;
  disabled: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  error?: ErrorDTO;
};

export default function PublicationForm({
  songName,
  setSongName,
  author,
  setAuthor,
  album,
  setAlbum,
  genres,
  setGenres,
  body,
  setBody,
  isLoading,
  disabled,
  handleSubmit,
  error,
}: PublicationFormProps) {
  return (
    <form
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
      onSubmit={handleSubmit}
    >
      {error?.field && (
        <InfoMessage
          className="col-span-2 border p-3 rounded border-destructive"
          message={error.message}
          variant="error"
        />
      )}
      <div className="grid gap-2">
        <Label htmlFor="songname">Nombre*</Label>
        <Input
          maxLength={32}
          minLength={1}
          id="songname"
          type="text"
          icon={<Music4 />}
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
          placeholder="Escribe el nombre de la canción"
          required
          disabled={disabled || isLoading}
          variant={error?.field == "name" ? "error" : "default"}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="author">Autor</Label>
        <Input
          maxLength={32}
          id="author"
          type="text"
          icon={<User />}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Escribe el nombre del autor"
          disabled={disabled || isLoading}
          variant={error?.field == "author" ? "error" : "default"}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="album">Album</Label>
        <Input
          maxLength={32}
          id="album"
          type="text"
          icon={<DiscAlbum />}
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          placeholder="Escribe el nombre del album"
          disabled={disabled || isLoading}
          variant={error?.field == "album" ? "error" : "default"}
        />
      </div>

      <div className="grid gap-2 w-full">
        <Label htmlFor="album">Generos</Label>
        <SelectGenres
          onSelect={setGenres}
          selection={genres}
          disabled={disabled || isLoading}
        />
      </div>

      <div className="grid grid-cols-1 gap-2 sm:col-span-2">
        <Label htmlFor="body">Canción</Label>
        <AdvanceTextArea
          body={body}
          onChange={setBody}
          disabled={isLoading}
          variant={
            error?.field == "body" || error?.field == "chords"
              ? "error"
              : "default"
          }
        />
      </div>

      <div className="text-xs inline-flex gap-3 sm:col-span-2">
        <Checkbox id="tac" name="tac" required disabled={isLoading} />
        <span>
          He leído y cumplo con las reglas establecidas en los{" "}
          <Link className="link" href="/tac" target="_black" rel="noopener">
            términos y condiciones
          </Link>{" "}
          del servicio
        </span>
      </div>

      <div className="flex flex-row gap-3 sm:col-span-2 max-w-sm ">
        <Link href="/">
          <Button variant="destructive">Cancelar</Button>
        </Link>
        <Button type="submit" className="w-full">
          {false ? (
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
  );
}
