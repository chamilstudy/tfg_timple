import type { Metadata } from "next";

import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";
import { redirect } from "next/navigation";
import Section from "@/components/ui/layout/section";

export const metadata: Metadata = {
  title: "Manual del Usuario - Timple Tabs",
  description: "Manual del usuario de Timple Tabs.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Manual del Usuario - Timple Tabs",
    description: "Manual del usuario de Timple Tabs.",
    type: "website",
    siteName: "Timple Tabs",
  },
};

export default function ManualPage() {
  redirect("/manual/getting-started/how-to-use-manual");
  return (
    <>
      <Header />
      <main className="flex flex-col items-center min-h-dvh">
        <Section>
          <div className="grid gap-10"></div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
