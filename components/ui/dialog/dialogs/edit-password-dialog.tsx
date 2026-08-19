"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Components
import { LockKeyhole } from "lucide-react";
import Dialog from "@/components/ui/dialog/dialog";
import DialogHero from "@/components/ui/dialog/dialog-hero";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/info/label";
import { Button } from "@/components/ui/input/button";
import SaveButton from "@/components/ui/buttons/save-button";
import CancelButton from "@/components/ui/buttons/cancel-button";
import InfoMessage from "@/components/ui/info/info-message";

// Server Functions
import updatePasswordAction from "@/lib/domains/auth/update-password";

// DTOs
import { ErrorDTO } from "@/lib/dto/error/error.dto";
import toErrorDto from "@/lib/mappers/error/error.mapper";

type EditEmailDialogProps = {
  show: boolean;
  onClose: () => void;
};

export default function EditPasswordDialog({
  show,
  onClose,
}: EditEmailDialogProps) {
  const [page, setPage] = useState(0);

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorDTO>();
  const router = useRouter();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError(undefined);

    if (password !== repeatPassword) {
      setError(toErrorDto("password", "NOT_MATCH"));
      setIsLoading(false);
      return;
    }

    const updatePasswordResponse = await updatePasswordAction({ password });

    if (!updatePasswordResponse.success) setError(updatePasswordResponse.error);

    setIsLoading(false);
    handleClose();
    router.push("/auth/login");
  };

  function handleClose() {
    onClose();
    setPage(0);
    setPassword("");
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
            description="Al actualizar la contraseña la sesión será cerrada y deberás volver a iniciar sesión"
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
            title="Cambiar Contraseña"
            description="Introduce tu nueva contraseña"
          />
          <form
            onSubmit={(e) => {
              handleUpdatePassword(e);
            }}
            className="grid gap-6"
          >
            <div className="grid gap-2">
              <Label htmlFor="user-password">Contraseña</Label>
              <Input
                id="user-password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*****"
                variant={error?.field == "password" ? "error" : "default"}
                icon={<LockKeyhole />}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="repeat-password">Repite tu contraseña</Label>
              <Input
                id="repeat-password"
                type="password"
                onChange={(e) => setRepeatPassword(e.target.value)}
                placeholder="*****"
                variant={error?.field == "password" ? "error" : "default"}
                icon={<LockKeyhole />}
                required
              />
              {error?.field == "password" && (
                <InfoMessage message={error.message} variant="error" />
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
      ]}
    />
  );
}
