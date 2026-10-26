"use server";
import { createClient } from "@/lib/supabase/server";

// DTOs
import toSongRequestDTO from "@/lib/mappers/song-request/song-request.mapper";
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

type FetchSongRequestsByIdArgs = {
  requestId: string;
};

export default async function fetchSongRequestsByIdAction({
  requestId,
}: FetchSongRequestsByIdArgs): Promise<DomainResponseDTO> {
  const supabase = await createClient();

  const { data: fetchSongRequestsData, error: fetchSongRequestsError } =
    await supabase.rpc("fetch_request_by_id", {
      p_request_id: requestId,
    });

  if (fetchSongRequestsError)
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("unknown", "UNKNOWN"),
    });

  return toDomainResponseDTO({ data: toSongRequestDTO(fetchSongRequestsData) });
}
