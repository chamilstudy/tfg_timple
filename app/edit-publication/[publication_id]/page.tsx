import type { Metadata } from "next";

import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";
import EditPublicationSection from "@/components/publication/publication-management/edit-publication-section";

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

export default async function EditPublicationPage({
  params,
}: {
  params: Promise<{ publication_id: string }>;
}) {
  const { publication_id } = await params;

  return (
    <>
      <div className="min-h-dvh w-full flex flex-col justify-between items-center">
        <Header />
        <EditPublicationSection publication_id={publication_id} />
        <div></div>
      </div>

      <Footer />
    </>
  );
}
