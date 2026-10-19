import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";
import ResolveSongRequestForm from "@/components/publication/resolve-song-request-form.tsx/resolve-song-request-form";
import { Metadata } from "next";
import Section from "@/components/ui/layout/section";
import GeneralInfoCards from "@/components/ui/info/general-info-cards";

export const metadata: Metadata = {
  title: "Resolver Solicitud - Timple Tabs",
  description: "Formulario de resolución de solicitud.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Resolver Solicitud - Timple Tabs",
    description: "Formulario de resolución de solicitud.",
    type: "website",
    siteName: "Timple Tabs",
  },
};

export default async function ResolveSongRequest() {
  return (
    <>
      <div className="min-h-dvh w-full flex flex-col justify-between items-center">
        <Header />
        <ResolveSongRequestForm />
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
