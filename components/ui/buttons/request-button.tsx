import { Button } from "../input/button";
import Link from "next/link";
import { ScrollIcon, ScrollText } from "lucide-react";

type RequestButton = {
  className?: string;
};

export default function RequestButton({ className }: RequestButton) {
  return (
    <Button
      className={className}
      asChild
      size="sm"
      variant="outline"
      aria-label="Crear nueva solicitud de canción"
    >
      <Link href="/new-song-request">
        <ScrollText />
        <span>Solicitar</span>
      </Link>
    </Button>
  );
}
