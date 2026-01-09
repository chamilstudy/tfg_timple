"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

import { EditProfileForm } from "@/components/settings/edit-profile/edit-profile";
import { EditAccountForm } from "@/components/settings/edit-account/edit-account";
import ProfileLegal from "@/components/settings/profile-legal";
import HeroTitle from "@/components/ui/titles/hero-title";

import { fetchPrivateProfileAction } from "@/lib/domains/user/fetch-private-profile";
import { fetchPublicProfileAction } from "@/lib/domains/user/fetch-public-profile";

export default function Settings() {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  const fetchProfile = async () => {
    setIsLoading(true);
    const result = await fetchPrivateProfileAction();

    if ("error" in result) return notFound();

    setUserName(result.data.user_name);
    setDescription(result.data.description);
    setEmail(result.data.email);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <HeroTitle
        title="Ajustes"
        description="Ajustes de perfil y cuenta de usuario"
      />

      <EditProfileForm
        isLoading={isLoading}
        userName={userName}
        description={description}
        onProfileUpdate={fetchProfile}
      />
      <EditAccountForm
        isLoading={isLoading}
        email={email}
        onProfileUpdate={fetchProfile}
      />
      <ProfileLegal />
    </>
  );
}
