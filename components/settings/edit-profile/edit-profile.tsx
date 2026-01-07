"use client";

import { useState } from "react";
import { BookOpenText, UserRound } from "lucide-react";

import Title from "@/components/ui/titles/title";
import SettingsMenu from "@/components/ui/settings-menu/settings-menu";
import EditProfileDialogs from "@/components/settings/edit-profile/edit-profile-dialogs";

type EditProfileFormProps = {
  isLoading: boolean;
  userName: string;
  description: string;
  onProfileUpdate: () => Promise<void>;
};

export function EditProfileForm({
  isLoading,
  userName,
  description,
  onProfileUpdate,
}: EditProfileFormProps) {
  const [showDialog, setShowDialog] = useState("");

  return (
    <>
      <EditProfileDialogs
        userName={userName}
        description={description}
        showDialog={showDialog}
        onClose={() => setShowDialog("")}
        onSave={onProfileUpdate}
      />

      <div className="grid gap-3 w-full">
        <Title
          title="Perfil"
          description="Información pública sobre la cuenta de usuario"
        />

        <SettingsMenu
          isLoading={isLoading}
          options={[
            {
              icon: <UserRound />,
              title: "Nombre de Usuario",
              content: userName,
              action: () => {
                setShowDialog("name");
              },
            },
            {
              icon: <BookOpenText />,
              title: "Descripción",
              content: description,
              action: () => {
                setShowDialog("description");
              },
            },
          ]}
        />
      </div>
    </>
  );
}
