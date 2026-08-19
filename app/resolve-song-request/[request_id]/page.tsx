import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";
import ResolveSongRequestForm from "@/components/publication/resolve-song-request-form.tsx/resolve-song-request-form";

export default async function ResolveSongRequest({
  params,
}: {
  params: Promise<{ request_id: string }>;
}) {
  const { request_id } = await params;

  return (
    <>
      <div className="min-h-dvh w-full flex flex-col justify-between items-center">
        <Header />
        <ResolveSongRequestForm requestId={request_id} />
        <div></div>
      </div>

      <Footer />
    </>
  );
}
