import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import Image from "next/image";
import timple_1 from "@/public/images/timple_1.jpeg";
import HeroTitle from "@/components/ui/titles/hero-title";
import Title from "@/components/ui/titles/title";
import { Button } from "@/components/ui/input/button";
import Link from "next/link";

import { HelpCircle, BookUser } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="min-h-dvh w-full flex flex-col justify-start items-center bg-gradient-to-b from-primary from-10% to-blue-900">
        <Header variant="negative" />
      </div>
      <Footer />
    </>
  );
}

/**
 <div className=" w-full bg-input relative grid items-center justify-center ">
          <div className="bg-card z-50 p-10 m-6 my-16 rounded-xl max-w-sm grid gap-6">
            <HeroTitle
              title="¡Unete a Timple Tabs!"
              description="Unete para colaborar en la principal plataforma de difusión del timple"
            />
            <Button className="w-full" variant="outline" asChild>
              <Link href="/register">¡Registrate Ahora!</Link>
            </Button>
          </div>
          <Image
            src={timple_1}
            alt="Hola"
            fill // hace que la imagen ocupe todo el contenedor
            className="object-cover opacity-50"
          />
        </div>
 */

/**
         <div className="flex flex-row flex-wrap p-6 gap-6 pt-16 max-w-3xl">
          <div className="bg-white p-6 rounded grid gap-3 flex-1">
            <Title
              title="¿Alguna Duda?"
              description="Echa un vistazo a las preguntas frecuentes"
            />
            <Button variant="outline" className="h-min self-end">
              Ir al FAQ
            </Button>
          </div>
          <div className="bg-white p-6 rounded grid gap-3 flex-1">
            <Title
              title="¿Necesitas Ayuda?"
              description="Visita nuestro manual del usuario"
            />
            <Button variant="outline" className="h-min self-end">
              Ir al Manual
            </Button>
          </div>
          <div className="bg-white p-6 rounded grid gap-3 flex-1">
            <Title
              title="¿Aún no estas registrado?"
              description="Hazte una cuenta en pocos pasos"
            />
            <Button variant="outline" className="h-min self-end">
              Registrarse
            </Button>
          </div>
        </div>
         */
