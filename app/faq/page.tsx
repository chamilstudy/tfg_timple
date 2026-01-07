import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import HeroTitle from "@/components/ui/titles/hero-title";
import DropdownShell from "@/components/ui/dropdown-shell";
import { faqData } from "@/components/faq/faq-data";

export default function TermsAndConditions() {
  return (
    <>
      <div className="flex flex-col items-center w-full min-h-dvh">
        <Header />
        <div className="grid gap-10 py-16 p-6 w-full items-center max-w-2xl">
          <HeroTitle
            title="Preguntas Frecuentes"
            description="Preguntas realizadas con frecuencia por nuestros usuarios"
          />
          <div className="grid gap-3 w-full">
            {faqData.map((faq, index) => (
              <DropdownShell
                key={index}
                title={faq.title}
                body={faq.children}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
