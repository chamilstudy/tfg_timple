import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";

export default function Home() {
  return (
    <>
      <div className="min-h-dvh w-full flex flex-col justify-start items-center bg-gradient-to-b gap-6">
        <Header />
      </div>
      <Footer />
    </>
  );
}
