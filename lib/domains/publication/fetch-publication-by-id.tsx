"use server";
import { createClient } from "@/lib/supabase/server";

// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toPublicationDTO from "@/lib/mappers/publication/publication.mapper";
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

type FetchPublicationArgs = {
  publication_id: string;
};

export default async function fetchPublicationByIdAction({
  publication_id,
}: FetchPublicationArgs): Promise<DomainResponseDTO> {
  const supabase = await createClient();

  const { data: fetchPublicationData, error: fetchPublicationError } =
    await supabase.rpc("fetch_publication_by_id", {
      p_publication_id: publication_id,
    });

  if (!fetchPublicationData)
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("fetch", "FAILED"),
    });

  if (fetchPublicationError)
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("fetch", "UNKNOWN"),
    });

  return toDomainResponseDTO({
    data: toPublicationDTO(fetchPublicationData),
  });
}
