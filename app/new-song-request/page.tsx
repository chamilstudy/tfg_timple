import type { Metadata } from "next";

import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";
import SongRequestForm from "@/components/publication/song-request-form/song-request-form";

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

export default function NewSong() {
  return (
    <>
      <div className="min-h-dvh w-full flex flex-col justify-between items-center">
        <Header />
        <SongRequestForm />
        <div></div>
      </div>

      <Footer />
    </>
  );
}
