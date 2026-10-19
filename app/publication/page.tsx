// next
import type { Metadata } from "next";

// components
import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";
import PublicationMain from "@/components/publication/publication-section/publication-main";
import GeneralInfoCards from "@/components/ui/info/general-info-cards";
import Section from "@/components/ui/layout/section";

// contexts
import { AuthProvider } from "@/contexts/auth.context";

export const metadata: Metadata = {
  title: "Publicación | Timple Tabs",
  description: "Descubre letras y acordes de canciones para timple canario.",
  openGraph: {
    type: "article",
    siteName: "Timple Tabs",
    title: "Publicación | Timple Tabs",
    description: "Descubre letras y acordes de canciones para timple canario.",
  },
};

export default async function Publication() {
  return (
    <AuthProvider>
      <div className="flex min-h-svh w-full flex-col items-center justify-start">
        <Header />
        <div className="flex flex-col gap-8 py-16 w-full items-center">
          <PublicationMain />
          <Section
            className="bg-gradient-to-b from-background to-primary p-5 pt-32 grid grid-flow-row sm:grid-flow-col items-center justify-center gap-8 w-full"
            variant="full"
          >
            <GeneralInfoCards />
          </Section>
        </div>
      </div>

      <Footer />
    </AuthProvider>
  );
}
