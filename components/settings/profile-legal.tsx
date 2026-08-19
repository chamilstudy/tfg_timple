"use client";

import { useRouter } from "next/navigation";

// Components
import { ScrollText, Info } from "lucide-react";
import SectionTitle from "../ui/layout/section-title";
import SettingsMenu from "@/components/ui/settings-menu/settings-menu";

export default function ProfileLegal() {
  const router = useRouter();

  return (
    <div className="grid gap-3 w-full">
      <SectionTitle
        title="Información legal"
        description="Aspectos legales relacionados con el uso del servicio"
      />

      <SettingsMenu
        options={[
          {
            icon: <ScrollText />,

            content: "Terminos y Condiciones",
            action: () => {
              router.push("/tac");
            },
          },
          {
            icon: <Info />,

            content: "Aviso Legal",
            action: () => {
              router.push("/legal-notice");
            },
          },
        ]}
      />
    </div>
  );
}
