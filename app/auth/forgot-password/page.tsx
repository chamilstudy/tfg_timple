import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recuperar Contraseña - Timple Tabs",
};

export default function Page() {
  return (
    <>
      <div className="min-h-dvh w-full flex flex-col justify-between items-center">
        <Header />
        <ForgotPasswordForm />
        <div></div>
      </div>

      <Footer />
    </>
  );
}
