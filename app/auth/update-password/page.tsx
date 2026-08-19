import { Metadata } from "next";

import { UpdatePasswordForm } from "@/components/auth/update-password-form";
import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";

export const metadata: Metadata = {
  title: "Cambiar Contraseña - Timple Tabs",
  description: "Cambio de contraseña de Timple Tabs.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <>
      <div className="min-h-dvh w-full flex flex-col justify-between items-center">
        <Header />
        <UpdatePasswordForm />
        <div></div>
      </div>

      <Footer />
    </>
  );
}
