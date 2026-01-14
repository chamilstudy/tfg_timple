import type { Metadata } from "next";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import PrivateProfileInfo from "@/components/private-profile/private-profile-info";

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
        <PrivateProfileInfo />
      </div>
      <Footer />
    </>
  );
}
