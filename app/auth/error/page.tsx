import { Metadata } from "next";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "Error - Timple Tabs",
  description: "Error de Timple Tabs.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="min-h-dvh w-full flex flex-col justify-between items-center">
      <Header />
      <div className="flex w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm flex flex-col gap-3">
          <h1>Algo va mal</h1>

          {params?.error ? (
            <p className="text-sm">Código de error: {params.error}</p>
          ) : (
            <p className="text-sm ">Se ha producido un error inesperado.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
