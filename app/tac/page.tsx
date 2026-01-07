import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import HeroTitle from "@/components/ui/titles/hero-title";
import Title from "@/components/ui/titles/title";

export default function TermsAndConditions() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center">
        <div className="flex-1 flex flex-col gap-16 max-w-3xl p-6 py-16 w-full">
          <div className="grid gap-10">
            <HeroTitle
              title="Términos y Condiciones"
              description="Condiciones de uso del servicio TimpleTabs"
            />

            <div className="grid gap-3">
              <Title title="1. Objeto" description="Uso del sitio" />
              <p>
                Estos Términos regulan el uso del sitio{" "}
                <strong>timpletabs.com</strong>, un proyecto personal gratuito
                de Chamil José Cruz Razeq. Al registrarse y usar el sitio, el
                usuario acepta estos términos.
              </p>
            </div>

            <div className="grid gap-3">
              <Title
                title="2. Registro y cuentas"
                description="Información requerida"
              />
              <p>
                Para registrarse, los usuarios deben proporcionar un{" "}
                <strong>correo electrónico válido</strong>, una{" "}
                <strong>contraseña</strong> y un{" "}
                <strong>nombre de usuario único</strong>. Los usuarios pueden
                actualizar o eliminar su cuenta en cualquier momento. La
                autenticación y gestión de cuentas se realiza mediante Supabase.
              </p>
            </div>

            <div className="grid gap-3">
              <Title
                title="3. Datos personales"
                description="Uso de la información"
              />
              <p>
                Los datos recogidos incluyen únicamente correo electrónico,
                nombre de usuario, fecha de creación de la cuenta y último
                inicio de sesión. Estos datos se usan para gestionar la cuenta,
                mostrar perfiles públicos y estadísticas internas. Los datos no
                se ceden a terceros y se protegen según la legislación española
                y el GDPR.
              </p>
              <p>
                Los usuarios tienen derecho a acceder, rectificar y suprimir sus
                datos, así como otros derechos reconocidos por la normativa
                vigente. Para ejercerlos, pueden contactar con el responsable
                del tratamiento a través del correo electrónico:{" "}
                <strong>chamil.studyacc@gmail.com</strong>.
              </p>
            </div>

            <div className="grid gap-3">
              <Title title="4. Menores de edad" description="Acceso a la web" />
              <p>
                La web no está diseñada específicamente para menores. Se
                recomienda que los usuarios sean mayores de 16 años. El acceso
                por menores queda bajo la responsabilidad de sus tutores
                legales.
              </p>
            </div>

            <div className="grid gap-3">
              <Title
                title="5. Seguridad y almacenamiento"
                description="Protección de datos"
              />
              <p>
                Los datos se almacenan en Supabase, con medidas de seguridad
                estándar para proteger la información, incluyendo cifrado en
                tránsito. Sin embargo, el usuario acepta que la transmisión de
                datos por Internet nunca es completamente segura.
              </p>
            </div>

            <div className="grid gap-3">
              <Title
                title="6. Modificaciones"
                description="Cambios en los términos"
              />
              <p>
                El administrador puede modificar estos términos en cualquier
                momento. Los cambios se comunicarán por correo a los usuarios.
                El uso continuado del sitio implica aceptación de los nuevos
                términos.
              </p>
            </div>

            <div className="grid gap-3">
              <Title
                title="7. Contacto"
                description="Información del responsable"
              />
              <p>
                Para cualquier consulta sobre estos términos o sobre los
                derechos relacionados con los datos personales, contactar por
                correo a: <strong>chamil.studyacc@gmail.com</strong>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
