import type { Metadata } from "next";

import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";
import PublicationMain from "@/components/publication/publication-section/publication-main";
import { AuthProvider } from "@/contexts/auth.context";

export default async function Publication({
  params,
}: {
  params: Promise<{ publication_id: string }>;
}) {
  const { publication_id } = await params;

  return (
    <AuthProvider>
      <div className="flex min-h-svh w-full flex-col items-center justify-start">
        <Header />
        <PublicationMain publication_id={publication_id} />
      </div>

      <Footer />
    </AuthProvider>
  );
}
