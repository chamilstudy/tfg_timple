import { Button } from "../input/button";
import Link from "next/link";
import { Share } from "lucide-react";
const handleShare = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: document.title,
        url: window.location.href,
      });
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Error al compartir:", error);
      }
    }
  } else {
    await navigator.clipboard.writeText(window.location.href);
  }
};

const handlePrint = () => {
  window.print();
};
type ShareButtonProps = {
  className?: string;
};

export default function ShareButton({ className }: ShareButtonProps) {
  return (
    <Button
      onClick={handleShare}
      className={className}
      size="sm"
      variant="outline"
      aria-label="Crear nueva solicitud de canción"
    >
      <Share />
      <span className="responsive-hide-behaviour">Compartir</span>
    </Button>
  );
}
