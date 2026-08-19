"use client";

import { useState } from "react";

// Components
import Dialog from "@/components/ui/dialog/dialog";
import DialogHero from "@/components/ui/dialog/dialog-hero";
import { Button } from "@/components/ui/input/button";
import CancelButton from "@/components/ui/buttons/cancel-button";

// Server Functions
import deleteSongRequestAction from "@/lib/domains/song-request/manage-song-request/delete-song-request";

// DTOs
import { ErrorDTO } from "@/lib/dto/error/error.dto";

type DeleteSongRequestProps = {
  request_id: string;
  show: boolean;
  onClose: () => void;
  onSave: () => Promise<void>;
};

export default function DeleteSongRequestDialog({
  request_id,
  show,
  onClose,
  onSave,
}: DeleteSongRequestProps) {
  const [page, setPage] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorDTO>();

  const handleDeletePublication = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError(undefined);

    const deleteSongRequestResponse = await deleteSongRequestAction({
      request_id: request_id,
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

  return (
    <Dialog
      show={show}
      page={page}
      dialogs={[
        <>
          <DialogHero
            title="¿Estás seguro?"
            description="Este cambio es irreversible y tu solicitud no podrá ser resuelta"
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
            title="Eliminar solicitud"
            description="Se eliminara permanente la solicitud"
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

            <Button type="submit" className="flex-1">
              Eliminar Solicitud
            </Button>
          </form>
        </>,
        <>
          <DialogHero
            title="¡Listo!"
            description="Se han enviado los correos de verificación"
          />
          <Button onClick={handleClose}>Salir</Button>
        </>,
      ]}
    />
  );
}
