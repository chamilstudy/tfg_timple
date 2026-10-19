import type { Metadata } from "next";

import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";
import NewPublicationSection from "@/components/publication/publication-management/new-publication-section";
import Section from "@/components/ui/layout/section";
import GeneralInfoCards from "@/components/ui/info/general-info-cards";

export const metadata: Metadata = {
  title: "Nueva Publicación - Timple Tabs",
  description: "Formulario de creación de publicación.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Nueva Publicación - Timple Tabs",
    description: "Formulario de creación de publicación.",
    type: "website",
    siteName: "Timple Tabs",
  },
};

export default function NewPublicationPage() {
  return (
    <>
      <div className="min-h-dvh w-full flex flex-col justify-between items-center">
        <Header />
        <NewPublicationSection />
        <Section
          className="bg-gradient-to-b from-background to-primary p-5 pt-32 grid grid-flow-row sm:grid-flow-col items-center justify-center gap-8 w-full"
          variant="full"
        >
          <GeneralInfoCards />
        </Section>
      </div>

      <Footer />
    </>
  );
}
