import Link from "next/link";

import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import HeroTitle from "@/components/ui/titles/hero-title";
import { Button } from "@/components/ui/input/button";

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
