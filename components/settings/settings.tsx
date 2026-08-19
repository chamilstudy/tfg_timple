"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

// Components
import EditProfileForm from "@/components/settings/edit-profile/edit-profile";
import EditAccountForm from "@/components/settings/edit-account/edit-account";
import ProfileLegal from "@/components/settings/profile-legal";
import HeroTitle from "../ui/layout/hero-title";

import fetchPrivateProfileAction from "@/lib/domains/user/fetch-private-profile";
import Section from "../ui/layout/section";

export default function Settings() {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  const fetchProfile = async () => {
    setIsLoading(true);
    const fetchPrivateProfileResponse = await fetchPrivateProfileAction();

    if (!fetchPrivateProfileResponse.success) return notFound();

    setUserName(fetchPrivateProfileResponse.data.user_name);
    setDescription(fetchPrivateProfileResponse.data.description);
    setEmail(fetchPrivateProfileResponse.data.email);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <Section className="py-16 flex flex-col gap-10 items-center">
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
    </Section>
  );
}
