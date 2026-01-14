import type { Metadata } from "next";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import Settings from "@/components/settings/settings";

export const metadata: Metadata = {
  title: "Ajustes - Timple Tabs",
  description: "Ajustes de cuenta.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ProtectedPage() {
  return (
    <div className="min-h-svh w-full flex flex-col justify-between items-center">
      <Header />
      <div className="flex flex-col gap-10 py-16 p-6 w-full items-center max-w-2xl">
        <Settings />
      </div>
      <Footer />
    </div>
  );
}
