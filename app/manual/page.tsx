import type { Metadata } from "next";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { redirect } from "next/navigation";

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

export default function Manual() {
  redirect("/manual/getting-started/how-to-use-manual");
  return (
    <>
      <Header />
      <main className="flex flex-col items-center min-h-dvh">
        <div className="flex-1 flex flex-col gap-16 max-w-3xl p-6 py-16 w-full">
          <div className="grid gap-10"></div>
        </div>
      </main>
      <Footer />
    </>
  );
}
