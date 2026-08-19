"use server";

import { createClient } from "@/lib/supabase/server";

// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toPublicProfileDTO from "@/lib/mappers/user/public-profile.mapper";
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

export default async function fetchPublicProfileAction(): Promise<DomainResponseDTO> {
  const supabase = await createClient();

  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (!userId)
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("session", "INVALID"),
    });

  const { data: fetchProfileInfoData, error: fetchProfileInfoError } =
    await supabase.rpc("fetch_profile_info");

  if (!fetchProfileInfoData) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("fetch", "NOT_FOUND"),
    });
  }

  if (fetchProfileInfoError)
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("fetch", "UNKNOWN"),
    });

  return toDomainResponseDTO({
    data: toPublicProfileDTO(fetchProfileInfoData),
  });
}
