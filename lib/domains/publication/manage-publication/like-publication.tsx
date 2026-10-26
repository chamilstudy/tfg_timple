"use server";

import { createClient } from "@/lib/supabase/server";

// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

type LikePubicationArgs = {
  publication_id: string;
};

export default async function likePublication({
  publication_id,
}: LikePubicationArgs): Promise<DomainResponseDTO> {
  const supabase = await createClient();

  const { error: likePublicationError } = await supabase.rpc(
    "toggle_publication_like",
    {
      p_publication_id: publication_id,
    },
  );

  if (likePublicationError) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("unknown", "UNKNOWN"),
    });
  }

  return toDomainResponseDTO({});
}
