import { Button } from "../input/button";
import Link from "next/link";
import { Printer } from "lucide-react";

type PrintButtonProps = {
  className?: string;
};

export default function PrintButton({ className }: PrintButtonProps) {
  return (
    <Button
      className={className}
      size="sm"
      variant="outline"
      aria-label="Crear nueva solicitud de canción"
      onClick={() => window.print()}
    >
      <Printer />
      <span className="responsive-hide-behaviour">Imprimir</span>
    </Button>
  );
}
