"use client";

// components
import CreateButton from "../ui/buttons/create-button";
import ReportDialog from "../ui/dialog/dialogs/report-dialog";
import RequestButton from "../ui/buttons/request-button";
import GeneralInfoCards from "../ui/info/general-info-cards";
import { Button } from "../ui/input/button";
import HeroTitle from "../ui/layout/hero-title";
import Section from "../ui/layout/section";
import SectionTitle from "../ui/layout/section-title";
import PublicationList from "../ui/publication-list/publication-list";
import SongRequestList from "../ui/publication-list/song-request-list";

// context
import { useAuth } from "@/contexts/auth.context";

// next
import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import { Flag, Settings } from "lucide-react";

// domains
import fetchPublicProfileAction from "@/lib/domains/profile/fetch-public-profile";
import fetchPrivateProfileAction from "@/lib/domains/profile/fetch-private-profile";

export default function ProfileMain() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const genre = searchParams.get("genre") ?? "";
  const sort = searchParams.get("sort") ?? "";
  const page = searchParams.get("page") ?? 0;
  const user_name = searchParams.get("user_name") ?? "";

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const [showDialog, setShowDialog] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { session } = useAuth();

  const fetchProfile = async () => {
    setIsLoading(true);
    let fetchPublicProfileResponse;

    if (!user_name) {
      fetchPublicProfileResponse = await fetchPrivateProfileAction();
    } else {
      fetchPublicProfileResponse = await fetchPublicProfileAction({
        user_name: user_name,
      });
    }

    if (!fetchPublicProfileResponse.success) {
      notFound();
    }

    setUserId(fetchPublicProfileResponse.data.user_id);
    setUserName(fetchPublicProfileResponse.data.user_name);
    setDescription(fetchPublicProfileResponse.data.description);
    setCreatedAt(fetchPublicProfileResponse.data.created_at);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [search, page, genre, sort, user_name]);

  return (
    <>
      <ReportDialog
        userId={userId}
        show={showDialog === "report"}
        onClose={() => {
          setShowDialog("");
        }}
      />

      <Section className="flex flex-col flex-nowrap gap-3 w-full p-6 py-16 items-start">
        <HeroTitle
          title={userName}
          description={description}
          info={`Miembro desde ${createdAt}`}
          mainAction={
            session &&
            session.user.id == userId && (
              <Button asChild size="sm" variant="outline">
                <Link href="/profile/settings">
                  <Settings />
                  <span>Ajustes</span>
                </Link>
              </Button>
            )
          }
          action={
            session &&
            session.user.id != userId && (
              <div className="flex flex-row flex-nowrap w-full justify-end">
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  onClick={() => setShowDialog("report")}
                >
                  <p>
                    <Flag />
                    <span>Reportar</span>
                  </p>
                </Button>
              </div>
            )
          }
          isLoading={isLoading}
        />
      </Section>

      <hr className="w-full border-white"></hr>

      <Section className="flex flex-col gap-8 py-16 w-full items-center">
        <SectionTitle
          title="Canciones publicadas"
          description={`Aquí se encuentran las canciones publicadas por ${userName}`}
          action={<CreateButton />}
        />
        <div className="flex flex-col flex-nowrap gap-8 w-full">
          <PublicationList showToolBar showFinds showPageNumber />
        </div>
      </Section>

      <hr className="w-full border-white"></hr>

      <Section className="flex flex-col gap-8 py-16 w-full items-center">
        <SectionTitle
          title="Solicitudes"
          description={`Aquí se encuentran las solicitudes de ${userName}`}
          action={<RequestButton />}
        />
        <div className="w-full flex flex-col flex-nowrap gap-2">
          <SongRequestList />
        </div>
      </Section>
      <Section
        className="bg-gradient-to-b from-background to-primary px-3 py-32 grid grid-flow-row sm:grid-flow-col items-center justify-center gap-8 w-full"
        variant="full"
      >
        <GeneralInfoCards />
      </Section>
    </>
  );
}
