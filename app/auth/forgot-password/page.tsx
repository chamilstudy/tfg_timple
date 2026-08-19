import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recuperar Contraseña - Timple Tabs",
  description: "Recuperación de contraseña en Timple Tabs.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Recuperar Contraseña - Timple Tabs",
    description: "Recuperación de contraseña en Timple Tabs.",
    type: "website",
    siteName: "Timple Tabs",
  },
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
