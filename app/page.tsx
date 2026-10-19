import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";
import HomeMain from "@/components/home/home-main";
import { AuthProvider } from "@/contexts/auth.context";

export default function Home() {
  return (
    <AuthProvider>
      <div className="min-h-dvh w-full flex flex-col justify-start items-center gap-6">
        <Header />
        <HomeMain />
      </div>
      <Footer />
    </AuthProvider>
  );
}
