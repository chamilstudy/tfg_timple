import Link from "next/link";

export const faqData = {
  general: {
    title: "Preguntas generales",
    questions: [
      {
        title: "¿Qué es el Timple?",
        children: (
          <p>
            El Timple es un pequeño instrumento de cinco cuerdas originario de
            las Islas Canarias. Actualmente se encuentra presente en el folclore
            de las islas, llegando incluso a introducirse en producciones
            modernas.
          </p>
        ),
      },
      {
        title: "¿Qué es Timple Tabs?",
        children: (
          <p>
            Timple Tabs es un espacio de difusión del Timple, no solo del
            instrumento, sino de recursos para aprender, crear y difundir
            canciones.
          </p>
        ),
      },
      {
        title: "¿Tengo que registrarme?",
        children: (
          <p>
            Los contenidos de Timple Tabs estan disponibles para todos los
            usuarios, con y sin registro. No obstante, registrarse provee de una
            serie de funcionalidades adicionales.
          </p>
        ),
      },
      {
        title: "Necesito ayuda para usar la web ¿que hago?",
        children: (
          <p>
            Los usuarios tienen a su disposición un{" "}
            <Link
              href="/manual/getting-started/how-to-use-manual"
              className="link"
            >
              manual del usuario
            </Link>{" "}
            con todos los detalles para usar la web.
          </p>
        ),
      },
    ],
  },
  rules: {
    title: "Normas de uso",
    questions: [
      {
        title: "¿Que debo tener en cuenta a la hora de publicar?",
        children: (
          <div>
            <p>
              Debes cumplir con las reglas del servicio mencionadas en los{" "}
              <Link href="/toc" className="link">
                terminos y condiciones del servicio
              </Link>{" "}
              . Las mas importantes son:
            </p>

            <ul className="list-disc pl-6 space-y-3">
              <li>Publicar canciones libres de derechos de autor.</li>
              <li>
                No hacer apología al odio en sus distintas expresiones
                (homofobia, xenofobia...).
              </li>
              <li>No promocionar o publicar páginas o servicios externos.</li>
            </ul>
          </div>
        ),
      },
      {
        title: "¿Qué es Timple Tabs?",
        children: (
          <p>
            Timple Tabs es un espacio de difusión del Timple, no solo del
            instrumento, sino de recursos para aprender, crear y difundir
            canciones.
          </p>
        ),
      },
      {
        title: "¿Tengo que registrarme?",
        children: (
          <p>
            Los contenidos de Timple Tabs estan disponibles para todos los
            usuarios, con y sin registro. No obstante, registrarse provee de una
            serie de funcionalidades adicionales.
          </p>
        ),
      },
      {
        title: "Necesito ayuda para usar la web ¿que hago?",
        children: (
          <p>
            Los usuarios tienen a su disposición un{" "}
            <Link
              href="/manual/getting-started/how-to-use-manual"
              className="link"
            >
              manual del usuario
            </Link>{" "}
            con todos los detalles para usar la web.
          </p>
        ),
      },
    ],
  },
};
