import { LoginForm } from "@/components/auth/login-form";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión - Timple Tabs",
};

export default function Login() {
  return (
    <>
      <div className="min-h-dvh w-full flex flex-col justify-between items-center">
        <Header />
        <LoginForm />
        <div></div>
      </div>

      <Footer />
    </>
  );
}
