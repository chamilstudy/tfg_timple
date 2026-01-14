import type { Metadata } from "next";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import PublicProfileInfo from "@/components/public-profile/public-profile-info";
import { notFound } from "next/navigation";

import { fetchPublicProfileAction } from "@/lib/domains/public/fetch-public-profile";

export var metadata: Metadata = {
  title: "Perfil - Timple Tabs",
  description: "Perfil público.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Pefil - Timple Tabs",
    description: "Perfil público.",
    type: "profile",
    siteName: "Timple Tabs",
  },
};

export default async function PublicProfile({
  params,
}: {
  params: Promise<{ user_name: string }>;
}) {
  const { user_name } = await params;
  const result = await fetchPublicProfileAction({ user_name: user_name });

  metadata = {
    title: user_name + " - Timple Tabs",
    description: "Perfil público de " + user_name + ".",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${user_name} - Timple Tabs`,
      description: `Perfil público de ${user_name}.`,
      type: "profile",
      siteName: "Timple Tabs",
    },
  };

  if ("error" in result) {
    notFound();
  }

  return (
    <>
      <div className="flex min-h-svh w-full flex-col items-center justify-start">
        <Header />
        {<PublicProfileInfo profile={result.data} />}
      </div>

      <Footer />
    </>
  );
}
