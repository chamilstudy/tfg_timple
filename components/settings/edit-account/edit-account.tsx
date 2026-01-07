"use client";

import { useState } from "react";
import { Mail, LockKeyhole, LogOut, UserRoundX } from "lucide-react";

import Title from "@/components/ui/titles/title";
import SettingsMenu from "@/components//ui/settings-menu/settings-menu";
import EditAccountDialogs from "@/components/settings/edit-account/edit-account-dialogs";

type EditAccountFormProps = {
  isLoading: boolean;
  email: string;
  onProfileUpdate: () => Promise<void>;
};

export function EditAccountForm({
  isLoading,
  email,
  onProfileUpdate,
}: EditAccountFormProps) {
  const [showDialog, setShowDialog] = useState("");

  return (
    <>
      <EditAccountDialogs
        email={email}
        showDialog={showDialog}
        onClose={() => setShowDialog("")}
        onSave={onProfileUpdate}
      />

      <div className="grid gap-3 w-full">
        <Title
          title="Cuenta"
          description="Información privada sobre la cuenta de usuario"
        />

        <SettingsMenu
          isLoading={isLoading}
          fixedSize
          options={[
            {
              icon: <Mail />,
              title: "Correo",
              content: email,
              action: () => {
                setShowDialog("email");
              },
            },
            {
              icon: <LockKeyhole />,
              title: "Contraseña",
              content: "*****",
              action: () => {
                setShowDialog("password");
              },
            },
            {
              icon: <UserRoundX />,
              content: "Eliminar cuenta",
              action: () => {
                setShowDialog("delete");
              },
            },
            {
              icon: <LogOut />,
              content: "Cerrar sesión",
              action: () => {
                setShowDialog("signout");
              },
            },
          ]}
        />
      </div>
    </>
  );
}
