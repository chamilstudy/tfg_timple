import type { Metadata } from "next";

import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";
import NewPublicationSection from "@/components/publication/publication-management/new-publication-section";

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
        <div></div>
      </div>

      <Footer />
    </>
  );
}
