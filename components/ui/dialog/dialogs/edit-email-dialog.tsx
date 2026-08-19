"use client";

import { useState } from "react";

// Components
import { Mail } from "lucide-react";
import Dialog from "@/components/ui/dialog/dialog";
import DialogHero from "@/components/ui/dialog/dialog-hero";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/info/label";
import { Button } from "@/components/ui/input/button";
import SaveButton from "@/components/ui/buttons/save-button";
import CancelButton from "@/components/ui/buttons/cancel-button";
import InfoMessage from "@/components/ui/info/info-message";

// Server Functions
import updateEmailAction from "@/lib/domains/auth/update-email";

// DTOs
import { ErrorDTO } from "@/lib/dto/error/error.dto";

type EditEmailDialogProps = {
  email: string;
  show: boolean;
  onClose: () => void;
};

export default function EditEmailDialog({
  email,
  show,
  onClose,
}: EditEmailDialogProps) {
  const [page, setPage] = useState(0);
  const [newEmail, setNewEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorDTO>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(undefined);
    setIsLoading(true);

    const updateEmailResponse = await updateEmailAction({ email: newEmail });

    if (!updateEmailResponse.success) setError(updateEmailResponse.error);

    setPage(page + 1);
    setIsLoading(false);
  }

  function handleClose() {
    onClose();
    setPage(0);
    setNewEmail("");
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
            description="Recibirás dos mensajes, uno en el correo actual y otro en el nuevo."
          />

          <div className="flex gap-3">
            <CancelButton isLoading={isLoading} onCancel={handleClose} />
            <Button onClick={() => setPage(1)} className="flex-1">
              Continuar
            </Button>
          </div>
        </>,

        <>
          <DialogHero
            title="Cambiar correo"
            description="Introduce tu nuevo correo electrónico"
          />

          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo</Label>
              <Input
                id="email"
                type="email"
                value={newEmail}
                variant={error?.field == "email" ? "error" : "default"}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder={email}
                icon={<Mail />}
                required
              />
              {error?.field == "email" && (
                <InfoMessage message={error?.message} variant="error" />
              )}
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setPage(0)}
              >
                Volver atrás
              </Button>
              <SaveButton isLoading={isLoading} />
            </div>
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
