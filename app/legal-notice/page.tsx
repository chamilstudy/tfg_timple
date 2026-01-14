import type { Metadata } from "next";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import HeroTitle from "@/components/ui/titles/hero-title";
import Title from "@/components/ui/titles/title";

export const metadata: Metadata = {
  title: "Aviso Legal - Timple Tabs",
  description: "Aviso legal de Timple Tabs.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Aviso Legal - Timple Tabs",
    description: "Aviso legal de Timple Tabs.",
    type: "profile",
    siteName: "Timple Tabs",
  },
};

export default function LegalNotice() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center">
        <div className="flex-1 flex flex-col gap-16 max-w-3xl p-6 py-16 w-full">
          <HeroTitle
            title="Aviso Legal"
            description="Información legal sobre el uso del servicio"
          />

          <div className="grid gap-3">
            <Title
              title="1. Información general"
              description="Datos identificativos del titular"
            />
            <p>
              En cumplimiento con lo dispuesto en la Ley 34/2002, de 11 de
              julio, de Servicios de la Sociedad de la Información y del
              Comercio Electrónico (LSSI-CE), se informa que el presente sitio
              web es titularidad de:
            </p>
            <p>
              <span className="font-bold">Titular:</span> Chamil José Cruz Razeq
              <br />
              <span className="font-bold">País:</span> España
              <br />
              <span className="font-bold">
                Correo electrónico de contacto:
              </span>{" "}
              chamil.studyacc@gmail.com
              <br />
              <span className="font-bold">Sitio web:</span>{" "}
              https://timpletabs.com
            </p>
          </div>

          <div className="grid gap-3">
            <Title
              title="2. Objeto del sitio web"
              description="Finalidad del servicio"
            />
            <p>
              El presente sitio web tiene como finalidad ofrecer una plataforma
              online de carácter personal y gratuito que permite a los usuarios
              registrarse, crear un perfil público y realizar publicaciones.
            </p>
            <p>
              El acceso y uso del sitio web implica la aceptación plena del
              presente Aviso Legal.
            </p>
          </div>

          <div className="grid gap-3">
            <Title
              title="3. Condiciones de uso"
              description="Responsabilidad del usuario"
            />
            <p>
              El usuario se compromete a hacer un uso adecuado del sitio web y
              de sus contenidos, de conformidad con la legislación vigente, la
              buena fe y el orden público.
            </p>
            <p>
              Queda prohibido el uso del sitio web con fines ilícitos o que
              puedan causar perjuicio al titular o a terceros. El titular se
              reserva el derecho de suspender o eliminar cuentas que incumplan
              estas condiciones.
            </p>
          </div>

          <div className="grid gap-3">
            <Title
              title="4. Responsabilidad"
              description="Limitaciones del servicio"
            />
            <p>
              El titular no se hace responsable del contenido publicado por los
              usuarios ni de los daños o perjuicios derivados del uso indebido
              del sitio web.
            </p>
            <p>
              No se garantiza la disponibilidad permanente del servicio, que
              podrá ser modificado, suspendido o interrumpido en cualquier
              momento sin previo aviso.
            </p>
          </div>

          <div className="grid gap-3">
            <Title
              title="5. Propiedad intelectual"
              description="Derechos sobre los contenidos"
            />
            <p>
              Los contenidos del sitio web, salvo aquellos aportados por los
              usuarios, están protegidos por la normativa de propiedad
              intelectual e industrial. Queda prohibida su reproducción,
              distribución o modificación sin autorización expresa del titular.
            </p>
          </div>

          <div className="grid gap-3">
            <Title title="6. Legislación aplicable" description="Marco legal" />
            <p>
              El presente Aviso Legal se rige por la legislación española. Para
              la resolución de cualquier conflicto que pudiera derivarse del
              acceso o uso del sitio web, las partes se someten a los juzgados y
              tribunales que correspondan conforme a derecho.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
