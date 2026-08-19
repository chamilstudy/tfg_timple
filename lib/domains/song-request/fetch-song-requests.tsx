"use server";
import { createClient } from "@/lib/supabase/server";

// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toSongRequestsDTO from "@/lib/mappers/song-request/song-requests.mapper";
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

export default async function fetchSongRequestsAction(): Promise<DomainResponseDTO> {
  const supabase = await createClient();

  const { data: fetchSongRequestsData, error: fetchSongRequestsError } =
    await supabase.rpc("fetch_song_requests");

  if (!fetchSongRequestsData)
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("fetch", "NOT_FOUND"),
    });

  if (fetchSongRequestsError)
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("fetch", "UNKNOWN"),
    });

  return toDomainResponseDTO({
    data: toSongRequestsDTO(fetchSongRequestsData),
  });
}
