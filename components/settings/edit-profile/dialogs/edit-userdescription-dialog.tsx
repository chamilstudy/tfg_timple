"use client";

import { useState } from "react";

import Dialog from "@/components/ui/dialog/dialog";
import HeroTitle from "@/components/ui/titles/hero-title";
import { Textarea } from "@/components/ui/input/text-area";
import { Label } from "@/components/ui/input/label";
import { Button } from "@/components/ui/input/button";
import SaveButton from "@/components/ui/buttons/save-button";
import CancelButton from "@/components/ui/buttons/cancel-button";
import { InfoMessage } from "@/components/ui/input/info-message";

import { updateDescriptionAction } from "@/lib/domains/user/update-description";

import { userErrorMap, UserErrorFields } from "@/lib/errors/user-errors";

type EditUserDescriptionDialogProps = {
  description: string;
  show: boolean;
  onClose: () => void;
  onSave: () => Promise<void>;
};

export function EditUserDescriptionDialog({
  description,
  show,
  onClose,
  onSave,
}: EditUserDescriptionDialogProps) {
  const [newUserDescription, setNewUserDescription] = useState("");

  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<UserErrorFields>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);
    setError({});

    const result = await updateDescriptionAction({
      description: newUserDescription,
    });

    if ("error" in result) {
      setError(userErrorMap[result.error] ?? { unknown: result.error });
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
    setError({});
  }

  return (
    <Dialog
      show={show}
      page={page}
      dialogs={[
        <>
          <HeroTitle
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
                variant={error.unknown ? "error" : "default"}
                required
              />
              {error.unknown && (
                <InfoMessage message={error.unknown} variant="error" />
              )}
            </div>
            <div className="flex gap-3">
              <CancelButton isLoading={isLoading} onCancel={handleClose} />
              <SaveButton isLoading={isLoading} />
            </div>
          </form>
        </>,

        <>
          <HeroTitle
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
