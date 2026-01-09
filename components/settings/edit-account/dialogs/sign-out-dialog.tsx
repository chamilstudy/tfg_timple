"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Dialog from "@/components/ui/dialog/dialog";
import HeroTitle from "@/components/ui/titles/hero-title";
import { Button } from "@/components/ui/input/button";

import { signOutAction } from "@/lib/domains/user/sign-out";
import { userErrorMap, UserErrorFields } from "@/lib/errors/user-errors";

type EditEmailDialogProps = {
  show: boolean;
  onClose: () => void;
};

export function SignOutDialog({ show, onClose }: EditEmailDialogProps) {
  const [page, setPage] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<UserErrorFields>({});

  const router = useRouter();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError({});

    const result = await signOutAction();

    if ("error" in result) setError(userErrorMap[result.error]);

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
            description="La sesión será cerrada y deberas volver a autenticarte en el futuro"
          />

          <form
            onSubmit={(e) => {
              handleUpdatePassword(e);
            }}
            className="grid gap-6"
          >
            <div className="flex gap-3">
              <Button type="button" variant="destructive" onClick={handleClose}>
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                Cerrar sesión
              </Button>
            </div>
          </form>
        </>,
      ]}
    />
  );
}
