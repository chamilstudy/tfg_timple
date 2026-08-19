"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";

// Components
import SongRequestsTable from "../ui/table/song-requests-table";
import PublicationsTable from "../ui/table/publications-table";
import Section from "../ui/layout/section";
import ReportDialog from "../ui/dialog/dialogs/report-dialog";
import HeroTitle from "../ui/layout/hero-title";
import { Button } from "../ui/input/button";
import { Flag } from "lucide-react";

// ServerFunctions
import fetchPublicProfileAction from "@/lib/domains/public/fetch-public-profile";

// DTOs
import PublicationDTO from "@/lib/dto/publication/publication.dto";
import SongRequestDTO from "@/lib/dto/song-request/song-request.dto";

// context
import { useAuth } from "@/contexts/auth.context";

type ProfileInfoProps = {
  user_name: string;
};

export default function PublicProfileInfo({ user_name }: ProfileInfoProps) {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [rawPublications, setRawPublications] = useState<Array<PublicationDTO>>(
    [],
  );
  const [rawSongRequests, setRawSongRequests] = useState<Array<SongRequestDTO>>(
    [],
  );

  const [showDialog, setShowDialog] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { session } = useAuth();

  useEffect(() => {
    setIsLoading(true);

    const fetchProfile = async () => {
      const fetchPublicProfileResponse = await fetchPublicProfileAction({
        user_name: user_name,
      });

      if (!fetchPublicProfileResponse.success) {
        notFound();
      }

      setUserId(fetchPublicProfileResponse.data.user_id);
      setUserName(fetchPublicProfileResponse.data.user_name);
      setDescription(fetchPublicProfileResponse.data.description);
      setCreatedAt(fetchPublicProfileResponse.data.created_at);
      setRawPublications(fetchPublicProfileResponse.data.publications);
      setRawSongRequests(fetchPublicProfileResponse.data.requests);

      setIsLoading(false);
    };

    fetchProfile();
  }, []);

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
          action={
            session &&
            !(session.user.id == userId) && (
              <Button
                asChild
                size="sm"
                variant="outline"
                aria-label="Navegar a ajustes"
                onClick={() => setShowDialog("report")}
              >
                <p>
                  <Flag />
                  <span>Reportar</span>
                </p>
              </Button>
            )
          }
          isLoading={isLoading}
        />
      </Section>

      <hr className="w-full border-white"></hr>

      <PublicationsTable
        rawPublications={rawPublications}
        isLoading={isLoading}
      />

      <hr className="w-full border-white"></hr>

      <SongRequestsTable
        rawSongRequests={rawSongRequests}
        showRequester={false}
        isLoading={isLoading}
      />
    </>
  );
}
