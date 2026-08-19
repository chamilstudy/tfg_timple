"use client";

import { useState } from "react";

// Components
import { UserRound } from "lucide-react";
import Dialog from "@/components/ui/dialog/dialog";
import DialogHero from "@/components/ui/dialog/dialog-hero";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/info/label";
import { Button } from "@/components/ui/input/button";
import SaveButton from "@/components/ui/buttons/save-button";
import CancelButton from "@/components/ui/buttons/cancel-button";
import InfoMessage from "@/components/ui/info/info-message";

// Server Functions
import updateUserNameAction from "@/lib/domains/user/manage-profile/update-username";
import { ErrorDTO } from "@/lib/dto/error/error.dto";

type EditEmailDialogProps = {
  userName: string;
  show: boolean;
  onClose: () => void;
  onSave: () => Promise<void>;
};

export default function EditUserNameDialog({
  userName,
  show,
  onClose,
  onSave,
}: EditEmailDialogProps) {
  const [page, setPage] = useState(0);

  const [newUserName, setNewUserName] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorDTO>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);
    setError(undefined);

    const updateUserNameResponse = await updateUserNameAction({
      user_name: newUserName,
    });

    if (!updateUserNameResponse.success) {
      setError(updateUserNameResponse.error);

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
    setNewUserName("");
    setError(undefined);
  }

  return (
    <Dialog
      show={show}
      page={page}
      dialogs={[
        <>
          <DialogHero
            title="¿Estas seguro?"
            description="Una vez cambies de nombre otros usuarios podrán reclamarlo"
          />

          <div className="flex gap-3">
            <CancelButton isLoading={isLoading} onCancel={handleClose} />
            <Button
              type="button"
              onClick={() => setPage(page + 1)}
              className="flex-1"
            >
              Continuar
            </Button>
          </div>
        </>,
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
              <Label htmlFor="user-name">Nombre de Usuario</Label>
              <Input
                count={10 - newUserName.length}
                maxLength={10}
                id="user-name"
                type="text"
                onChange={(e) => setNewUserName(e.target.value)}
                value={newUserName}
                placeholder={userName}
                icon={<UserRound />}
                variant={error?.field == "name" ? "error" : "default"}
                required
              />
              {error?.field == "name" && (
                <InfoMessage message={error?.message} variant="error" />
              )}
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setPage(page - 1)}
              >
                Volver Atras
              </Button>
              <SaveButton isLoading={isLoading} />
            </div>
          </form>
        </>,

        <>
          <DialogHero
            title="¡Listo!"
            description="Tu nombre de usuario ha sido actualizado"
          />

          <Button type="button" onClick={handleClose}>
            Salir
          </Button>
        </>,
      ]}
    />
  );
}
