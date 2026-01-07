"use client";

import { useEffect, useState } from "react";

import { EditProfileForm } from "@/components/settings/edit-profile/edit-profile";
import { EditAccountForm } from "@/components/settings/edit-account/edit-account";
import ProfileLegal from "@/components/settings/profile-legal";
import HeroTitle from "@/components/ui/titles/hero-title";

import { fetchPrivateProfileAction } from "@/lib/user/fetch-private-profile";
import { fetchPublicProfileAction } from "@/lib/user/fetch-public-profile";

export default function Settings() {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  const fetchProfile = async () => {
    setIsLoading(true);
    const resultProfileData = await fetchPublicProfileAction();
    setUserName(resultProfileData.data.user_name);
    setDescription(resultProfileData.data.description);

    const resultAccounteData = await fetchPrivateProfileAction();
    setEmail(resultAccounteData.data.email);

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
