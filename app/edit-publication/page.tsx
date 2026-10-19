import type { Metadata } from "next";

import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";
import EditPublicationSection from "@/components/publication/publication-management/edit-publication-section";
import Section from "@/components/ui/layout/section";
import GeneralInfoCards from "@/components/ui/info/general-info-cards";

export const metadata: Metadata = {
  title: "Editar Publicación - Timple Tabs",
  description: "Formulario de edición de publicación.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Editar Publicación - Timple Tabs",
    description: "Formulario de edición de publicación.",
    type: "website",
    siteName: "Timple Tabs",
  },
};

export default async function EditPublicationPage() {
  return (
    <>
      <div className="min-h-dvh w-full flex flex-col justify-between items-center">
        <Header />
        <EditPublicationSection />
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
