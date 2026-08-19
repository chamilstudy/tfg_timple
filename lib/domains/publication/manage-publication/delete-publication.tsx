"use server";
import { createClient } from "@/lib/supabase/server";

// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

type DeletePublicationArgs = {
  publication_id: string;
};

export default async function deletePublication({
  publication_id,
}: DeletePublicationArgs): Promise<DomainResponseDTO> {
  const supabase = await createClient();

  const { error: deletePublicationError } = await supabase
    .from("publications")
    .delete()
    .eq("publication_id", publication_id);

  if (deletePublicationError)
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("unknown", "UNKNOWN"),
    });

  return toDomainResponseDTO({});
}
