import { ThemeSwitcher } from "../theme-switcher";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full flex flex-col items-center justify-center border-t border-t-card mx-auto text-center text-xs bg-background">
      <div className="flex flex-col items-center max-w-lg w-full p-6 gap-16 py-16">
        <div className="flex flex-row flex-wrap justify-center w-full gap-10">
          <div className="flex flex-col items-start gap-3">
            <p className="font-bold">Información Legal</p>
            <Link href="/tac" aria-label="Navegar a términos y condiciones">
              Términos y Condiciones
            </Link>
            <Link href="/legal-notice" aria-label="Navegar a aviso legal">
              Aviso Legal
            </Link>
          </div>
          <div className="flex flex-col items-start gap-3">
            <p className="font-bold">Páginas de Ayuda</p>
            <Link href="/faq" aria-label="Navegar a preguntas frecuentes">
              Preguntas Frecuentes
            </Link>
            <Link
              href="/manual/getting-started/how-to-use-manual"
              aria-label="Navegar a manual del usuario"
            >
              Manual del Usuario
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <p>© 2025 TimpleTabs</p>
          <ThemeSwitcher />
        </div>
      </div>
    </footer>
  );
}
