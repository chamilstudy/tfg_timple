"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Components
import Dialog from "@/components/ui/dialog/dialog";
import DialogHero from "@/components/ui/dialog/dialog-hero";
import { Button } from "@/components/ui/input/button";

// Server Functions
import signOutAction from "@/lib/domains/user/manage-profile/sign-out";

// DTOs
import { ErrorDTO } from "@/lib/dto/error/error.dto";

type EditEmailDialogProps = {
  show: boolean;
  onClose: () => void;
};

export default function SignOutDialog({ show, onClose }: EditEmailDialogProps) {
  const [page, setPage] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorDTO>();

  const router = useRouter();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError(undefined);

    const signOutResponse = await signOutAction();

    if (!signOutResponse.success) setError(signOutResponse.error);

    router.push("/");
    handleClose();
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
