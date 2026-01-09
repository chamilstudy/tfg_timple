"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";

import Dialog from "@/components/ui/dialog/dialog";
import HeroTitle from "@/components/ui/titles/hero-title";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/input/label";
import { Button } from "@/components/ui/input/button";
import SaveButton from "@/components/ui/buttons/save-button";
import CancelButton from "@/components/ui/buttons/cancel-button";
import { InfoMessage } from "@/components/ui/input/info-message";

import { updatePasswordAction } from "@/lib/domains/auth/update-password";
import {
  AuthErrorCode,
  AuthErrorFields,
  authErrorMap,
} from "@/lib/errors/auth-errors";

type EditEmailDialogProps = {
  show: boolean;
  onClose: () => void;
};

export function EditPasswordDialog({ show, onClose }: EditEmailDialogProps) {
  const [page, setPage] = useState(0);

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthErrorFields>({});
  const router = useRouter();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError({});

    if (password !== repeatPassword) {
      setError(authErrorMap[AuthErrorCode.PASSWORD_NOT_MATCH]);
      setIsLoading(false);
      return;
    }

    const result = await updatePasswordAction({ password });

    if ("error" in result)
      setError(authErrorMap[result.error] ?? { unknown: result.error });

    setIsLoading(false);

    router.push("/auth/login");
  };

  function handleClose() {
    onClose();
    setPage(0);
    setPassword("");
    setError({});
  }

  return (
    <Dialog
      show={show}
      page={page}
      dialogs={[
        <>
          <HeroTitle
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
          <HeroTitle
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
                icon={<LockKeyhole />}
                required
              />
              {error.password && (
                <InfoMessage message={error.password} variant="error" />
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
