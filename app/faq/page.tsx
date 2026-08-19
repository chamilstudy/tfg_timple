import type { Metadata } from "next";

import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";
import HeroTitle from "@/components/ui/layout/hero-title";
import DropdownShell from "@/components/ui/info/dropdown-shell";
import { faqData } from "@/lib/actions/utils/faq-data.util";
import Section from "@/components/ui/layout/section";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes - Timple Tabs",
  description: "Preguntas frecuentes de Timple Tabs.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Preguntas Frecuentes - Timple Tabs",
    description: "Preguntas frecuentes de Timple Tabs.",
    type: "website",
    siteName: "Timple Tabs",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <div className="flex flex-col items-center w-full min-h-dvh">
        <Header />
        <Section>
          <div className="flex flex-col flex-nowrap gap-6 w-full items-center justify-center py-16">
            <HeroTitle
              title="Preguntas Frecuentes"
              description="Preguntas realizadas con frecuencia por nuestros usuarios"
            />
            <div className="w-full gap-8 flex flex-col">
              {Object.values(faqData).map((section, i) => (
                <div className=" flex flex-col gap-3" key={i}>
                  <h2>{section.title}</h2>

                  <div className="flex flex-col gap-3">
                    {section.questions.map((faq, index) => (
                      <DropdownShell
                        key={index}
                        title={faq.title}
                        body={faq.children}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>
      <Footer />
    </>
  );
}
