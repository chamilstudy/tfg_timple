import type { Metadata } from "next";

import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";
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

      <Settings />

      <Footer />
    </div>
  );
}
