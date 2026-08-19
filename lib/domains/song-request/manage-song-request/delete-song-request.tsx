"use server";

import { createClient } from "@/lib/supabase/server";

// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

type DeleteSongRequestArgs = {
  request_id: string;
};

export default async function deleteSongRequestAction({
  request_id,
}: DeleteSongRequestArgs): Promise<DomainResponseDTO> {
  const supabase = await createClient();

  const { error: deleteSongRequestError } = await supabase
    .from("requests")
    .delete()
    .eq("request_id", request_id);

  if (deleteSongRequestError)
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("unknown", "UNKNOWN"),
    });

  return toDomainResponseDTO({});
}
