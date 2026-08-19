import { Button } from "../input/button";
import Link from "next/link";
import { ScrollIcon } from "lucide-react";

export default function RequestButton() {
  return (
    <Button
      asChild
      size="sm"
      variant="outline"
      aria-label="Navegar a formulario de solicitud"
    >
      <Link href="/new-song-request">
        <ScrollIcon />
        <span>Solicitar</span>
      </Link>
    </Button>
  );
}
