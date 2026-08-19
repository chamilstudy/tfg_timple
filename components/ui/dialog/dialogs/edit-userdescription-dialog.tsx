"use client";

import { useState } from "react";

// Components
import Dialog from "@/components/ui/dialog/dialog";
import DialogHero from "@/components/ui/dialog/dialog-hero";
import { Textarea } from "@/components/ui/input/text-area";
import { Label } from "@/components/ui/info/label";
import { Button } from "@/components/ui/input/button";
import SaveButton from "@/components/ui/buttons/save-button";
import CancelButton from "@/components/ui/buttons/cancel-button";
import InfoMessage from "@/components/ui/info/info-message";

// Server Functions
import updateDescriptionAction from "@/lib/domains/user/manage-profile/update-description";

// DTOs
import { ErrorDTO } from "@/lib/dto/error/error.dto";

type EditUserDescriptionDialogProps = {
  description: string;
  show: boolean;
  onClose: () => void;
  onSave: () => Promise<void>;
};

export default function EditUserDescriptionDialog({
  description,
  show,
  onClose,
  onSave,
}: EditUserDescriptionDialogProps) {
  const [newUserDescription, setNewUserDescription] = useState("");

  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorDTO>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);
    setError(undefined);

    const updateDescriptionResponse = await updateDescriptionAction({
      description: newUserDescription,
    });

    if (!updateDescriptionResponse.success) {
      setError(updateDescriptionResponse.error);
      setIsLoading(false);
      return;
    }

    await onSave();
    setPage(page + 1);
    setIsLoading(false);
  }

  function handleClose() {
    onClose();
    setPage(0);
    setNewUserDescription("");
    setError(undefined);
  }

  return (
    <Dialog
      show={show}
      page={page}
      dialogs={[
        <>
          <DialogHero
            title="Cambiar Nombre de Usuario"
            description="Introduce tu nuevo nombre de usuario"
          />
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="grid gap-6"
          >
            <div className="grid gap-2">
              <Label htmlFor="description">Correo</Label>

              <Textarea
                id="description"
                maxLength={150}
                rows={5}
                placeholder={description}
                onChange={(e) => setNewUserDescription(e.target.value)}
                count={150 - newUserDescription.length}
                variant={error?.field == "unknown" ? "error" : "default"}
                required
              />
              {error?.field == "unknown" && (
                <InfoMessage message={error?.message} variant="error" />
              )}
            </div>
            <div className="flex gap-3">
              <CancelButton isLoading={isLoading} onCancel={handleClose} />
              <SaveButton isLoading={isLoading} />
            </div>
          </form>
        </>,

        <>
          <DialogHero
            title="¡Listo!"
            description="Tu descripción ha sido actualizada"
          />

          <Button type="button" onClick={handleClose}>
            Salir
          </Button>
        </>,
      ]}
    />
  );
}
