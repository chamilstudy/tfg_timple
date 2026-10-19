"use server";

import { createClient } from "@/lib/supabase/server";

// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toPublicProfileDTO from "@/lib/mappers/user/public-profile.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

type FetchPublicProfileArgs = {
  user_name: string;
  publication_search?: string;
  publication_genre?: string;
  publication_sort?: string;
  publication_max?: number | null;
  publication_page?: number;
};

export default async function fetchPublicProfileAction({
  user_name,
}: FetchPublicProfileArgs): Promise<DomainResponseDTO> {
  const supabase = await createClient();

  const { data: fetchUserByIdData, error: fetchUserByIdError } =
    await supabase.rpc("fetch_public_profile", {
      p_user_name: user_name,
    });

  if (!fetchUserByIdData)
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("fetch", "NOT_FOUND"),
    });

  if (fetchUserByIdError)
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("fetch", "UNKNOWN"),
    });

  return toDomainResponseDTO({
    data: toPublicProfileDTO(fetchUserByIdData),
  });
}
