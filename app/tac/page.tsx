import type { Metadata } from "next";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import HeroTitle from "@/components/ui/titles/hero-title";
import Title from "@/components/ui/titles/title";

export const metadata: Metadata = {
  title: "Términos y Condiciones - Timple Tabs",
  description: "Términos y condiciones de Timple Tabs.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Términos y Condiciones - Timple Tabs",
    description: "Términos y condiciones de Timple Tabs.",
    type: "website",
    siteName: "Timple Tabs",
  },
};

export default function TermsAndConditions() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center">
        <div className="flex-1 flex flex-col gap-16 max-w-3xl p-6 py-16 w-full">
          <div className="grid gap-10">
            <div>
              <HeroTitle
                title="Términos y Condiciones"
                description="Condiciones de uso del servicio TimpleTabs"
              />

              <span className="text-xs">14 de enero de 2026</span>
            </div>

            <div className="grid gap-3">
              <Title title="1. Objeto" description="Uso del sitio" />
              <p>
                Los presentes Términos y Condiciones regulan el acceso y uso del
                sitio <strong>www.timpletabs.com</strong>, un proyecto personal
                y gratuito desarrollado por{" "}
                <strong>Chamil José Cruz Razeq</strong>. El uso del sitio y el
                registro de una cuenta implican la aceptación expresa de estos
                términos.
              </p>
            </div>

            <div className="grid gap-3">
              <Title
                title="2. Registro y cuentas de usuario"
                description="Información requerida"
              />
              <p>
                Para acceder a determinadas funcionalidades de la aplicación web
                es necesario registrarse, proporcionando un{" "}
                <strong>correo electrónico válido</strong>, una{" "}
                <strong>contraseña</strong> y un{" "}
                <strong>nombre de usuario único</strong>, que no tiene por qué
                coincidir con el nombre real del usuario.
              </p>
              <p>
                El usuario es responsable de mantener la confidencialidad de sus
                credenciales de acceso y de cualquier actividad realizada desde
                su cuenta. La gestión de la autenticación y las cuentas de
                usuario se realiza mediante <strong>Supabase</strong>.
              </p>
              <p>
                El usuario podrá modificar o eliminar su cuenta en cualquier
                momento a través de las funcionalidades habilitadas en la
                aplicación.
              </p>
            </div>

            <div className="grid gap-3">
              <Title
                title="3. Datos personales"
                description="Uso de la información"
              />
              <p>
                Los datos personales recogidos se limitan exclusivamente a
                correo electrónico, nombre de usuario, fecha de creación de la
                cuenta, fecha del último inicio de sesión y, de forma opcional,
                una breve descripción incluida por el propio usuario en su
                perfil.
              </p>
              <p>
                Estos datos se utilizan únicamente para la gestión de la cuenta
                de usuario, el correcto funcionamiento de la aplicación y la
                visualización de perfiles públicos cuando corresponda. Los datos
                no se ceden a terceros y se tratan conforme a la legislación
                española y al Reglamento General de Protección de Datos (RGPD).
              </p>
              <p>
                Los usuarios pueden ejercer sus derechos de acceso,
                rectificación, supresión y demás derechos reconocidos por la
                normativa vigente contactando con el responsable del tratamiento
                a través del correo electrónico:{" "}
                <strong>chamil.studyacc@gmail.com</strong>.
              </p>
            </div>

            <div className="grid gap-3">
              <Title title="4. Menores de edad" description="Acceso a la web" />
              <p>
                De conformidad con lo establecido en el Reglamento (UE) 2016/679
                (RGPD) y la Ley Orgánica 3/2018, de Protección de Datos
                Personales y garantía de los derechos digitales, el uso de la
                Plataforma está restringido a personas{" "}
                <strong>mayores de 14 años</strong>.
              </p>
              <p>
                Los menores de 14 años no están autorizados a registrarse ni a
                utilizar las funcionalidades ofrecidas. Al completar el proceso
                de registro, el usuario declara bajo su responsabilidad que
                cumple con este requisito de edad.
              </p>
            </div>

            <div className="grid gap-3">
              <Title
                title="5. Uso del servicio"
                description="Condiciones de utilización"
              />
              <p>
                La Plataforma es de <strong>uso gratuito</strong> y proporciona
                acceso a las distintas funcionalidades propias de la aplicación
                web.
              </p>
              <p>
                El usuario se compromete a hacer un uso adecuado del sitio y a
                no utilizarlo para fines ilícitos, fraudulentos o contrarios a
                la buena fe, así como a no introducir contenidos ofensivos,
                ilegales o que vulneren derechos de terceros.
              </p>
            </div>

            <div className="grid gap-3">
              <Title
                title="6. Seguridad y almacenamiento"
                description="Protección de datos"
              />
              <p>
                Los datos se almacenan en la infraestructura proporcionada por{" "}
                <strong>Supabase</strong>, que aplica medidas de seguridad
                estándar del sector, incluyendo el cifrado de la información en
                tránsito. No obstante, el usuario es consciente de que la
                transmisión de datos por Internet no puede garantizarse como
                completamente segura.
              </p>
            </div>

            <div className="grid gap-3">
              <Title
                title="7. Modificaciones"
                description="Cambios en los términos"
              />
              <p>
                El administrador se reserva el derecho a modificar estos
                Términos y Condiciones en cualquier momento. Las modificaciones
                serán publicadas en el sitio web y el uso continuado de la
                Plataforma implicará la aceptación de los nuevos términos.
              </p>
            </div>

            <div className="grid gap-3">
              <Title
                title="8. Contacto"
                description="Información del responsable"
              />
              <p>
                Para cualquier consulta relacionada con estos Términos y
                Condiciones o con el tratamiento de datos personales, el usuario
                puede contactar a través del correo electrónico:{" "}
                <strong>chamil.studyacc@gmail.com</strong>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
