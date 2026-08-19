import Link from "next/link";
import { Metadata } from "next";

import Footer from "@/components/ui/layout/footer";
import Header from "@/components/ui/layout/header";
import HeroTitle from "@/components/ui/layout/hero-title";
import { Button } from "@/components/ui/input/button";

export const metadata: Metadata = {
  title: "Registro Completado - Timple Tabs",
  description: "Registro completado en Timple Tabs.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignUp() {
  return (
    <>
      <div className="min-h-dvh w-full flex flex-col justify-between items-center">
        <Header />
        <div className="flex w-full items-center justify-center p-6 py-16">
          <div className="w-full max-w-sm grid gap-6 ">
            <HeroTitle
              title="Ya casi hemos terminado..."
              description="Recibirás un correo con los siguientes pasos para finalizar tu registro"
            />

            <Button className="w-full" asChild>
              <Link href="/auth/login">Continuar </Link>
            </Button>
          </div>
        </div>
        <div></div>
      </div>

      <Footer />
    </>
  );
}
