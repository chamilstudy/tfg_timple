"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

import Dialog from "@/components/ui/dialog/dialog";
import HeroTitle from "@/components/ui/titles/hero-title";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/input/label";
import { Button } from "@/components/ui/input/button";
import SaveButton from "@/components/ui/buttons/save-button";
import CancelButton from "@/components/ui/buttons/cancel-button";
import { InfoMessage } from "@/components/ui/input/info-message";

import { AuthErrorFields, authErrorMap } from "@/lib/auth/auth-errors";
import { updateEmailAction } from "@/lib/auth/update-email";

type EditEmailDialogProps = {
  email: string;
  show: boolean;
  onClose: () => void;
};

export function EditEmailDialog({
  email,
  show,
  onClose,
}: EditEmailDialogProps) {
  const [page, setPage] = useState(0);
  const [newEmail, setNewEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthErrorFields>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError({});
    setIsLoading(true);

    const result = await updateEmailAction({ email: newEmail });

    if (result.error)
      setError(authErrorMap[result.error] ?? { unknown: result.error });

    setPage(page + 1);
    setIsLoading(false);
  }

  function handleClose() {
    onClose();
    setPage(0);
    setNewEmail("");
    setError({});
  }

  return (
    <Dialog
      show={show}
      page={page}
      dialogs={[
        <>
          <HeroTitle
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
          <HeroTitle
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
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder={email}
                icon={<Mail />}
                required
              />
              {error.email && (
                <InfoMessage message={error.email} variant="error" />
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
          <HeroTitle
            title="¡Listo!"
            description="Se han enviado los correos de verificación"
          />
          <Button onClick={handleClose}>Salir</Button>
        </>,
      ]}
    />
  );
}
