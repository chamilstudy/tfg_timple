"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

// Components
import { Button } from "@/components/ui/input/button";
import PublicationHero from "./publication-hero";
import PublicationSettings from "./publication-settings";
import PublicationChords from "./publication-chords";
import PublicationBodyNew from "@/components/ui/publication/publication-body";
import Section from "@/components/ui/layout/section";
import { Edit, Flag, Trash } from "lucide-react";
import PublicationDialogs from "./publication-dialogs";

// Server Functions
import fetchPublicationByIdAction from "@/lib/domains/publication/fetch-publication-by-id";
import { processBodyWithChords } from "@/lib/actions/formatters/publication-body.formatter";
import {
  chordToString,
  parseChord,
} from "@/lib/actions/music/musicTheory/chords";

// Contexts
import { useAuth } from "@/contexts/auth.context";

type PublicPublicationInfoProps = {
  publication_id: string;
};

export default function PublicationMain({
  publication_id,
}: PublicPublicationInfoProps) {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [songName, setSongName] = useState("");
  const [author, setAuthor] = useState("");
  const [genres, setGenres] = useState<string[]>([]);
  const [lastEdit, setLastEdit] = useState("");
  const [body, setBody] = useState(""); // body ya procesado
  const [rawBody, setRawBody] = useState(""); // body original con $indice$
  const [chords, setChords] = useState<Record<string, Array<number>>>({
    d: [],
    e: [],
    f: [],
  });
  const [rawChords, setRawChords] = useState<
    Record<string, Record<string, Record<string, Record<string, number[]>>>>
  >({
    a: {
      b: {
        c: {
          d: [],
          e: [],
          f: [],
        },
      },
    },
  });
  const [instrument, setInstrument] = useState("timple");
  const [notation, setNotation] = useState("c");
  const [createdAt, setCreatedAt] = useState("");
  const [transposition, setTransposition] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [showDialog, setShowDialog] = useState("");

  const { session, loading } = useAuth();

  const fetchPublicPublication = async () => {
    setIsLoading(true);
    const response = await fetchPublicationByIdAction({
      publication_id: decodeURIComponent(publication_id),
    });

    if (!response.success) {
      notFound();
    }

    const data = response.data;
    setUserId(data.user_id);
    setUserName(data.user_name);
    setSongName(data.song_name);
    setAuthor(data.author);
    setGenres(data.genres);
    setRawBody(data.body);
    setCreatedAt(data.created_at);
    setLastEdit(data.last_edit);
    setRawChords(data.chords);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPublicPublication();
  }, [publication_id]);

  useEffect(() => {
    if (!rawChords[instrument]) {
      //setChords({});
      setBody(rawBody); // Si no hay acordes, simplemente dejamos el body sin procesar
      return;
    }

    // Filtrar acordes según instrumento y transposición
    const chordMap = rawChords[instrument][transposition];
    if (!chordMap) {
      //setChords({});
      setBody(rawBody);
      return;
    }

    // Filtramos los acordes y los preparamos
    let result: Record<string, number[]> = {};
    Object.values(chordMap).forEach((indexObj) => {
      Object.entries(indexObj).forEach(([chordName, frets]) => {
        result[chordName] = frets;
      });
    });

    // Convertir los acordes según la notación
    const convertedChords: Record<string, number[]> = {};

    Object.entries(result).forEach(([chordName, frets]) => {
      const convertedChord = chordToString(
        parseChord(chordName),
        notation == "c",
      ); // Convertir acorde a la notación deseada

      convertedChords[convertedChord] = frets;
    });

    // Establecer acordes procesados
    setChords(convertedChords);

    // Procesar rawBody: reemplazar $indice$ por acorde
    const processedBody = processBodyWithChords(rawBody, convertedChords);
    setBody(processedBody);
  }, [rawChords, instrument, transposition, rawBody, notation]); // Dependencias actualizadas para incluir `notation`

  const transpositionMap: Record<number, string> = {
    1: "+1 pasos",
    2: "+2 pasos",
    3: "+3 pasos",
    4: "+4 pasos",
    5: "+5 pasos",
    6: "+6 pasos",
    0: "Original",
    "-6": "-6 pasos",
    "-5": "-5 pasos",
    "-4": "-4 pasos",
    "-3": "-3 pasos",
    "-2": "-2 pasos",
    "-1": "-1 pasos",
  };

  return (
    <>
      <PublicationDialogs
        publication_id={publication_id}
        showDialog={showDialog}
        onClose={() => {
          setShowDialog("");
        }}
        redirectTo={`/user/${userName}`}
      />

      <div className="flex flex-col gap-8 py-16 w-full items-center">
        <Section>
          <PublicationHero
            userName={userName}
            songName={songName}
            author={author}
            genres={genres}
            createdAt={createdAt}
            lastEdit={lastEdit}
            isLoading={isLoading}
            action={
              session && !(session.user.id == userId) ? (
                <>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    aria-label="Navegar a ajustes"
                    onClick={() => setShowDialog("report")}
                  >
                    <p>
                      <Flag />
                      <span>Reportar</span>
                    </p>
                  </Button>
                </>
              ) : (
                <>
                  <Link href={`/edit-publication/${publication_id}`}>
                    <Button
                      size="sm"
                      variant="outline"
                      aria-label="Navegar a ajustes"
                    >
                      <Edit />
                      <span>Editar</span>
                    </Button>
                  </Link>
                  <Button
                    asChild
                    size="sm"
                    variant="destructive2"
                    aria-label="Navegar a ajustes"
                    onClick={() => setShowDialog("delete")}
                  >
                    <p>
                      <Trash />
                      <span>Eliminar</span>
                    </p>
                  </Button>
                </>
              )
            }
          />
        </Section>

        <hr className="w-full border-white" />

        <Section>
          <PublicationSettings
            instrument={instrument}
            setInstrument={setInstrument}
            notation={notation}
            setNotation={setNotation}
            transposition={transposition}
            transpositionMap={transpositionMap}
            setTransposition={setTransposition}
            isLoading={isLoading}
          />
        </Section>

        <hr className="w-full border-white" />

        <Section>
          <PublicationChords chords={chords} isLoading={isLoading} />
        </Section>

        <hr className="w-full border-white" />

        <Section>
          <PublicationBodyNew
            chords={chords}
            body={body}
            isLoading={isLoading}
            autoscroll
          />
        </Section>
      </div>
    </>
  );
}
