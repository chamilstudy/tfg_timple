"use client";

import { ArrowRight, BookOpenText, MessageCircleQuestion } from "lucide-react";
import InfoCard from "./info-card";
import { Button } from "../input/button";

import { useRouter } from "next/navigation";

export default function GeneralInfoCards() {
  const router = useRouter();
  return (
    <>
      <InfoCard
        className="flex-1 max-w-none md:max-w-96 h-full w-full"
        icon={<MessageCircleQuestion />}
        title="¿Tienes alguna duda?"
        body="Puedes consultar nuestra página de preguntas frecuentes, donde encontrarás respuesta a varias de las cuestiones más comunes entre nuestros usuarios"
        actionComponent={
          <Button
            size="sm"
            className="w-min self-end"
            onClick={() => {
              router.push("/manual");
            }}
          >
            <ArrowRight />
            <span>Ver Preguntas Frecuentes</span>
          </Button>
        }
      />
      <InfoCard
        className="flex-1 max-w-none md:max-w-96 h-full w-full"
        icon={<BookOpenText />}
        title="¿Necesitas más información?"
        body="Echa un vistazo a nuestro manual del usuario, donde podrás acceder a información detallada sobre como utilizar las distintas funcionalidades de este espacio"
        actionComponent={
          <Button
            size="sm"
            className="w-min self-end"
            onClick={() => {
              router.push("/manual");
            }}
          >
            <ArrowRight />
            <span>Visitar Manual</span>
          </Button>
        }
      />
    </>
  );
}
