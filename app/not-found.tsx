import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";
import HeroTitle from "@/components/ui/layout/hero-title";

export default function NotFound() {
  return (
    <>
      <div className="min-h-dvh w-full flex flex-col justify-between items-center">
        <Header />
        <div className="flex w-full items-center justify-center p-6 py-16">
          <div className="w-min text-nowrap">
            <HeroTitle title="Error 404" description="Esta página no existe" />
          </div>
        </div>
        <div></div>
      </div>

      <Footer />
    </>
  );
}
