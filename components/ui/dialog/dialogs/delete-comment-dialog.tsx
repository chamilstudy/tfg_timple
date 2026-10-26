"use client";

import { useState } from "react";

// Components
import Dialog from "@/components/ui/dialog/dialog";
import DialogHero from "@/components/ui/dialog/dialog-hero";
import { Button } from "@/components/ui/input/button";
import CancelButton from "@/components/ui/buttons/cancel-button";

// Server Functions
import deletePublication from "@/lib/domains/publication/manage-publication/delete-publication";

// DTOs
import { ErrorDTO } from "@/lib/dto/error/error.dto";
import { useRouter } from "next/navigation";
import { deleteCommentAction } from "@/lib/domains/publication/manage-publication/delete-comment";

type DeleteCommentDialogProps = {
  commentId: string;
  show: boolean;
  onClose: () => void;
  onSave: () => Promise<void>;
  redirectTo?: string;
};

export default function DeleteCommentDialog({
  commentId,
  show,
  onClose,
  onSave,
  redirectTo,
}: DeleteCommentDialogProps) {
  const [page, setPage] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorDTO>();

  const router = useRouter();

  const handleDeletePublication = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError(undefined);

    const publicationResponse = await deleteCommentAction({
      comment_id: commentId,
    });

    await onSave();

    setPage(page + 1);
    setIsLoading(false);
  };

  function handleClose() {
    onClose();
    setPage(0);
    setError(undefined);
  }

  function handleEnd() {
    handleClose();

    if (redirectTo) {
      router.push(redirectTo);
    }
  }

  return (
    <Dialog
      show={show}
      page={page}
      dialogs={[
        <>
          <DialogHero
            title="¿Estás seguro?"
            description="Este cambio es irreversible y el comentario dejará de ser visible para otros usuarios"
          />

          <div className="flex gap-3">
            <CancelButton isLoading={isLoading} onCancel={handleClose} />

            <Button
              type="button"
              onClick={() => {
                setPage(1);
              }}
              className="flex-1"
            >
              Continuar
            </Button>
          </div>
        </>,
        <>
          <DialogHero
            title="Eliminar comentario"
            description="Se eliminara permanente el comentario"
          />

          <form
            className="flex gap-3"
            onSubmit={(e) => {
              handleDeletePublication(e);
            }}
          >
            <Button type="button" variant="outline" onClick={() => setPage(0)}>
              Volver atrás
            </Button>

            <Button type="submit" className="flex-1" variant="destructive2">
              Eliminar
            </Button>
          </form>
        </>,
        <>
          <DialogHero
            title="¡Listo!"
            description="Se ha eliminado el comentario"
          />
          <Button onClick={handleEnd}>Salir</Button>
        </>,
      ]}
    />
  );
}
