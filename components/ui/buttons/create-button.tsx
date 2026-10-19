import { Button } from "../input/button";
import Link from "next/link";
import { Plus } from "lucide-react";

type CreateButtonProps = {
  className?: string;
};

export default function CreateButton({ className }: CreateButtonProps) {
  return (
    <Button
      className={className}
      asChild
      size="sm"
      variant="outline"
      aria-label="Crear nueva canción"
    >
      <Link href="/new-publication">
        <Plus />
        <span>Crear</span>
      </Link>
    </Button>
  );
}
