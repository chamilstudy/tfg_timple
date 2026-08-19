import type { Metadata } from "next";

import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";
import PrivateProfileMain from "@/components/private-profile/private-profile-main";

export const metadata: Metadata = {
  title: "Perfil - Timple Tabs",
  description: "Perfil privado.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ProtectedPage() {
  return (
    <>
      <div className="min-h-dvh w-full flex flex-col justify-start items-center">
        <Header />
        <PrivateProfileMain />
      </div>
      <Footer />
    </>
  );
}
