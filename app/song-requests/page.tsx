import type { Metadata } from "next";

import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";

import SongRequestsMain from "@/components/song-requests/song-requests-main";

import { AuthProvider } from "@/contexts/auth.context";

export default async function SongRequests() {
  return (
    <AuthProvider>
      <div className="flex min-h-svh w-full flex-col items-center justify-start">
        <Header />
        <SongRequestsMain />
      </div>

      <Footer />
    </AuthProvider>
  );
}
