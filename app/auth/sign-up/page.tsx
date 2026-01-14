import type { Metadata } from "next";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata: Metadata = {
  title: "Registro - Timple Tabs",
  description: "Registro en Timple Tabs.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Registro - Timple Tabs",
    description: "Registro en Timple Tabs.",
    type: "website",
    siteName: "Timple Tabs",
  },
};

export default function Page() {
  return (
    <>
      <div className="min-h-dvh w-full flex flex-col justify-between items-center">
        <Header />
        <SignUpForm />
        <div></div>
      </div>

      <Footer />
    </>
  );
}
