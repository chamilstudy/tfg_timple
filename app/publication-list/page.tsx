import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";
import PublicationListMain from "@/components/publication-list/publication-list-main";
import { AuthProvider } from "@/contexts/auth.context";
import Section from "@/components/ui/layout/section";

import GeneralInfoCards from "@/components/ui/info/general-info-cards";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Canciones | Timple Tabs",
  description:
    "Descubre las canciones publicadas por los usuarios de Timple Tabs.",
  openGraph: {
    type: "website",
    siteName: "Timple Tabs",
    title: "Canciones",
    description:
      "Descubre las canciones publicadas por los usuarios de Timple Tabs.",
  },
};

export default async function PublicationListPage() {
  return (
    <AuthProvider>
      <div className="min-h-dvh w-full flex flex-col justify-start items-center gap-6">
        <Header />
        <Section variant="default" className="py-16 gap-16">
          <PublicationListMain />
        </Section>

        <Section
          className="bg-gradient-to-b from-background to-primary p-5 pt-32 grid grid-flow-row sm:grid-flow-col items-center justify-center gap-8 w-full"
          variant="full"
        >
          <GeneralInfoCards />
        </Section>
      </div>
      <Footer />
    </AuthProvider>
  );
}
