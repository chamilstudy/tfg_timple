import type { Metadata } from "next";

import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";

import { AuthProvider } from "@/contexts/auth.context";
import SongRequestListMain from "@/components/song-request-list/song-request-list-main";
import Section from "@/components/ui/layout/section";
import GeneralInfoCards from "@/components/ui/info/general-info-cards";

export const metadata: Metadata = {
  title: "Solicitudes | Timple Tabs",
  description:
    "Descubre las solicitudes publicadas por los usuarios de Timple Tabs.",
  openGraph: {
    type: "website",
    siteName: "Timple Tabs",
    title: "Solicitudes",
    description:
      "Descubre las solicitudes publicadas por los usuarios de Timple Tabs.",
  },
};

export default async function SongRequestListPage() {
  return (
    <AuthProvider>
      <div className="min-h-dvh w-full flex flex-col justify-start items-center gap-6">
        <Header />
        <Section variant="default" className="py-16 gap-16">
          <SongRequestListMain />
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
