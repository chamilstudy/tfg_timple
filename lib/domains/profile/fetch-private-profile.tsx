"use server";

import { toPrivateProfileDTO } from "@/lib/mappers/user/private-profile.mapper";

import { createClient } from "@/lib/supabase/server";

// DTOS
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

export default async function fetchPrivateProfileAction(): Promise<DomainResponseDTO> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("session", "INVALID"),
    });
  }

  const { data: fetchProfileInfoData, error: fetchProfileInfoError } =
    await supabase
      .from("profiles")
      .select("profile_id, user_name, description, created_at")
      .eq("profile_id", user.id)
      .single();

  if (fetchProfileInfoError) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("session", "UNKNOWN"),
    });
  }

  const emailFetched = user.email;

  if (!fetchProfileInfoData || !emailFetched) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("session", "INVALID"),
    });
  }

  return toDomainResponseDTO({
    data: toPrivateProfileDTO({ ...fetchProfileInfoData, email: emailFetched }),
  });
}
