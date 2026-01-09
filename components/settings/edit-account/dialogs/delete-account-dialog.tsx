"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Dialog from "@/components/ui/dialog/dialog";
import HeroTitle from "@/components/ui/titles/hero-title";
import { Button } from "@/components/ui/input/button";

import { deleteAccountAction } from "@/lib/domains/user/delete-account";
import { UserErrorFields, userErrorMap } from "@/lib/errors/user-errors";

type DeleteAccountDialogProps = {
  show: boolean;
  onClose: () => void;
};

export function DeleteAccountDialog({
  show,
  onClose,
}: DeleteAccountDialogProps) {
  const [page, setPage] = useState(0);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<UserErrorFields>({});

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError({});

    const result = await deleteAccountAction();

    if ("error" in result)
      setError(userErrorMap[result.error] ?? { unknown: result.error });

    handleClose();
    router.push("/");
    setIsLoading(false);
  };

  function handleClose() {
    onClose();
    setPage(0);
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
            description="La cuenta será eliminada por completo"
          />

          <div className="grid gap-2">
            <p>Esta acción es irreversible y causará que:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                El <span className="font-bold">nombre de usuario</span> volverá
                a quedar disponible y podrá ser reclamado por otro usuario.
              </li>
              <li>
                El <span className="font-bold">correo electrónico</span>{" "}
                utilizado en la creación de la cuenta será eliminado, impidiendo
                el inicio de sesión y permitiendo un futuro registro.
              </li>
              <li>
                Los <span className="font-bold">datos de perfil públicos</span>{" "}
                serán eliminados.
              </li>
            </ul>
          </div>

          <div className="grid gap-6">
            <div className="flex gap-3">
              <Button type="button" variant="destructive" onClick={handleClose}>
                Cancelar
              </Button>
              <Button
                type="button"
                className="flex-1"
                onClick={() => setPage(1)}
              >
                Continuar
              </Button>
            </div>
          </div>
        </>,
        <>
          <HeroTitle
            title="Eliminar Cuenta"
            description="Al eliminar tu cuenta se eliminarán todos los datos asociados a ella"
          />

          <form
            onSubmit={(e) => {
              handleDeleteAccount(e);
            }}
            className="grid gap-6"
          >
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setPage(0)}
              >
                Volver Atrás
              </Button>
              <Button type="submit" className="flex-1">
                Eliminar Cuenta
              </Button>
            </div>
          </form>
        </>,
      ]}
    />
  );
}
