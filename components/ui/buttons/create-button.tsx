import { Button } from "../input/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function CreateButton() {
  return (
    <Button
      asChild
      size="sm"
      variant="outline"
      aria-label="Navegar a formulario de solicitud"
    >
      <Link href="/new-publication">
        <Plus />
        <span>Crear</span>
      </Link>
    </Button>
  );
}
