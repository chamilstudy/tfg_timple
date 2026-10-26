"use client";

import { ArrowRight, BookOpenText, MessageCircleQuestion } from "lucide-react";
import InfoCard from "./info-card";
import { Button } from "../input/button";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type GeneralInfoCardsProps = {
  className: string;
};

export default function GeneralInfoCards({ className }: GeneralInfoCardsProps) {
  const router = useRouter();
  return (
    <>
      <InfoCard
        className={cn("flex-1 max-w-none md:max-w-96 h-full w-full", className)}
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
        className={cn("flex-1 max-w-none md:max-w-96 h-full w-full", className)}
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
