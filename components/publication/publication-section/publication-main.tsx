"use client";

// next
import { useState, useEffect } from "react";
import { notFound, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

// components
import { Button } from "@/components/ui/input/button";
import PublicationHero from "./publication-hero";
import PublicationSettings from "./publication-settings";
import PublicationChords from "./publication-chords";
import PublicationBodyNew from "@/components/ui/publication/publication-body";
import Section from "@/components/ui/layout/section";
import {
  Edit,
  Flag,
  Printer,
  Share2,
  Trash,
  ThumbsUp,
  MessageCircle,
} from "lucide-react";
import PublicationDialogs from "../../dialogs/publication-dialogs";

// server functions
import fetchPublicationByIdAction from "@/lib/domains/publication/fetch-publication-by-id";
import { processBodyWithChords } from "@/lib/actions/formatters/publication-body.formatter";
import {
  chordToString,
  parseChord,
} from "@/lib/actions/music/musicTheory/chords";

// context
import { useAuth } from "@/contexts/auth.context";
import toPublicationDTO from "@/lib/mappers/publication/publication.mapper";
import ButtonGroup from "@/components/ui/input/button-group";
import CommentList from "@/components/ui/comments/comment-list";
import likePublication from "@/lib/domains/publication/manage-publication/like-publication";
import ShareButton from "@/components/ui/buttons/share-button";
import PrintButton from "@/components/ui/buttons/print-button";

export default function PublicationMain() {
  const searchParams = useSearchParams();
  const publicationId = searchParams.get("publication-id") ?? "";

  const [publicationInfo, setPublicationInfo] = useState(toPublicationDTO({}));
  const [body, setBody] = useState("");
  const [rawBody, setRawBody] = useState("");
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
  const [nomenclature, setNomenclature] = useState("c");
  const [transposition, setTransposition] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [showDialog, setShowDialog] = useState("");

  const { session, loading } = useAuth();

  const fetchPublicPublication = async () => {
    setIsLoading(true);
    const response = await fetchPublicationByIdAction({
      publication_id: publicationId,
    });

    if (!response.success) {
      notFound();
    }

    const data = response.data;
    setPublicationInfo(data);
    setRawBody(data.body);
    setRawChords(data.chords);

    document.title = `${data.song_name} | Timple Tabs`;

    setIsLoading(false);
  };

  useEffect(() => {
    if (publicationId == "") {
      notFound();
    }
    fetchPublicPublication();
  }, [publicationId]);

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

    // Convertir los acordes según la nomenclatura
    const convertedChords: Record<string, number[]> = {};

    Object.entries(result).forEach(([chordName, frets]) => {
      const convertedChord = chordToString(
        parseChord(chordName),
        nomenclature == "c",
      ); // Convertir acorde a la notación deseada

      convertedChords[convertedChord] = frets;
    });

    // Establecer acordes procesados
    setChords(convertedChords);

    // Procesar rawBody: reemplazar $indice$ por acorde
    const processedBody = processBodyWithChords(rawBody, convertedChords);
    setBody(processedBody);
  }, [rawChords, instrument, transposition, rawBody, nomenclature]); // Dependencias actualizadas para incluir `notation`

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

  const handleLike = async () => {
    const response = await likePublication({ publication_id: publicationId });
    fetchPublicPublication();
  };

  return (
    <>
      <PublicationDialogs
        publication_id={publicationId}
        showDialog={showDialog}
        onClose={() => {
          setShowDialog("");
        }}
        redirectTo={`/profile?user_name=${publicationInfo?.user_name}`}
      />

      <Section className="flex flex-col gap-8 w-full items-center">
        <PublicationHero
          publicationInfo={publicationInfo}
          isLoading={isLoading}
          action={
            <>
              {
                <ButtonGroup
                  buttons={[
                    <Button
                      disabled={session ? false : true}
                      size="sm"
                      variant={publicationInfo.is_liked ? "default" : "outline"}
                      aria-label="Dar me gusta a la publicación"
                      onClick={() => handleLike()}
                    >
                      <ThumbsUp />
                      <span>{publicationInfo.likes}</span>
                    </Button>,
                    <Button
                      disabled={session ? false : true}
                      size="sm"
                      variant={"outline"}
                      aria-label="Comentar en publicación"
                      onClick={() => {
                        document.getElementById("comments")?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }}
                    >
                      <MessageCircle />
                      <span>{publicationInfo.comments}</span>
                    </Button>,
                  ]}
                />
              }
              {session && session?.user.id == publicationInfo?.user_id && (
                <ButtonGroup
                  buttons={[
                    <Button
                      size="sm"
                      variant="outline"
                      aria-label="Editar canción"
                    >
                      <Link
                        className="flex flex-row gap-2"
                        href={`/edit-publication?publication-id=${publicationId}`}
                      >
                        <Edit />
                        <span className="responsive-hide-behavior">Editar</span>
                      </Link>
                    </Button>,
                    <Button
                      size="sm"
                      variant="outline"
                      aria-label="Eliminar canción"
                      onClick={() => setShowDialog("delete")}
                    >
                      <Trash />
                      <span className="responsive-hide-behavior">Eliminar</span>
                    </Button>,
                  ]}
                />
              )}
              <ButtonGroup buttons={[<ShareButton />, <PrintButton />]} />

              {session?.user.id != publicationInfo?.user_id && (
                <Button
                  disabled={session ? false : true}
                  size="sm"
                  variant="outline"
                  aria-label="Reportar publicación"
                  onClick={() => setShowDialog("report")}
                >
                  <Flag />
                  <span className="responsive-hide-behaviour">Reportar</span>
                </Button>
              )}
            </>
          }
        />
      </Section>

      <hr className="w-full border-white" />

      <Section className="print:hidden">
        <PublicationSettings
          instrument={instrument}
          setInstrument={setInstrument}
          nomenclature={nomenclature}
          setNomenclature={setNomenclature}
          transposition={transposition}
          transpositionMap={transpositionMap}
          setTransposition={setTransposition}
          isLoading={isLoading}
        />
      </Section>

      <hr className="w-full border-white print:hidden" />

      <Section>
        <PublicationChords chords={chords} isLoading={isLoading} />
      </Section>

      <hr className="w-full border-white print:hidden" />

      <Section>
        <PublicationBodyNew
          chords={chords}
          body={body}
          isLoading={isLoading}
          autoscroll
        />
      </Section>
      <hr className="w-full border-white print:hidden" />
      <Section className="print:hidden">
        <CommentList />
      </Section>
    </>
  );
}
