import { UpdatePasswordForm } from "@/components/auth/update-password-form";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

export default function Page() {
  return (
    <>
      <div className="min-h-dvh w-full flex flex-col justify-between items-center">
        <Header />
        <UpdatePasswordForm />
        <div></div>
      </div>

      <Footer />
    </>
  );
}
