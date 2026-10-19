import type { Metadata } from "next";

// Components
import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";
import ProfileMain from "@/components/profile/profile-main";

// Context
import { AuthProvider } from "@/contexts/auth.context";

type Props = {
  searchParams: Promise<{ user_name?: string }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { user_name } = await searchParams;

  const title = user_name
    ? `${user_name} - Timple Tabs`
    : "Perfil - Timple Tabs";

  const description = user_name
    ? `Perfil público de ${user_name} en Timple Tabs.`
    : "Perfiles públicos de Timple Tabs.";

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      type: "profile",
      siteName: "Timple Tabs",
    },
  };
}

export default function ProfilePage() {
  return (
    <AuthProvider>
      <div className="min-h-dvh w-full flex flex-col justify-start items-center">
        <Header />
        <ProfileMain />
      </div>
      <Footer />
    </AuthProvider>
  );
}
