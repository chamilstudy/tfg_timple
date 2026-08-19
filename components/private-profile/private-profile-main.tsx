"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";

// Components
import PrivateProfilePublicationsTable from "./private-profile-publications-table";
import PrivateProfileRequestsTable from "./private-profile-requests-table";
import PrivateProfileDialogs from "./private-profile-dialogs";
import PrivateProfileHero from "./private-profile-hero";

// Server Functions
import fetchPublicProfileAction from "@/lib/domains/user/fetch-public-profile";

// DTOs
import PublicationDTO from "@/lib/dto/publication/publication.dto";
import SongRequestDTO from "@/lib/dto/song-request/song-request.dto";
import PublicationsTable from "../ui/table/publications-table";

export default function PrivateProfileMain() {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [publicationsRaw, setPublicationsRaw] = useState<Array<PublicationDTO>>(
    [],
  );
  const [requestsRaw, setRequestsRaw] = useState<Array<SongRequestDTO>>([]);
  const [showDialog, setShowDialog] = useState("");
  const [currentDelete, setCurrentDelete] = useState("");

  const fetchProfileInfo = async () => {
    setIsLoading(true);
    const fetchPublicProfileResponse = await fetchPublicProfileAction();

    if (!fetchPublicProfileResponse.success) {
      notFound();
    }

    setUserName(fetchPublicProfileResponse.data.user_name);
    setDescription(fetchPublicProfileResponse.data.description);
    setCreatedAt(fetchPublicProfileResponse.data.created_at);
    setPublicationsRaw(fetchPublicProfileResponse.data.publications);
    setRequestsRaw(fetchPublicProfileResponse.data.requests);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  return (
    <>
      <PrivateProfileDialogs
        id={currentDelete}
        showDialog={showDialog}
        onClose={() => {
          setShowDialog("");
        }}
        onSave={fetchProfileInfo}
      />
      <div className="w-full flex flex-col flex-nowrap items-center">
        <PrivateProfileHero
          userName={userName}
          description={description}
          createdAt={createdAt}
          isLoading={isLoading}
        />
        <hr className="w-full border-white"></hr>

        <PrivateProfilePublicationsTable
          publicationsRaw={publicationsRaw}
          onDelete={setCurrentDelete}
          setShowDialog={setShowDialog}
          isLoading={isLoading}
        />

        <hr className="w-full border-white"></hr>

        <PrivateProfileRequestsTable
          requestsRaw={requestsRaw}
          onDelete={setCurrentDelete}
          setShowDialog={setShowDialog}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
