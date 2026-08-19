"use server";

import { toPrivateProfileDTO } from "@/lib/mappers/user/private-profile.mapper";

import { createClient } from "@/lib/supabase/server";

// Actions
import fetchPublicProfileAction from "@/lib/domains/user/fetch-public-profile";

// DTOS
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

export default async function fetchPrivateProfileAction(): Promise<DomainResponseDTO> {
  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getSession();

  if (userError) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("session", "UNKNOWN"),
    });
  }

  const emailFetched = userData?.session?.user.email;

  if (!userData || !emailFetched) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("session", "INVALID"),
    });
  }

  const publicData = await fetchPublicProfileAction();

  if (!publicData.success) {
    return toDomainResponseDTO({
      success: false,
      error: publicData.error,
    });
  }

  return toDomainResponseDTO({
    data: toPrivateProfileDTO(publicData.data, userData.session?.user),
  });
}
