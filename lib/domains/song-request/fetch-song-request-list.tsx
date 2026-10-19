"use server";
import { createClient } from "@/lib/supabase/server";

// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";
import toSongRequestListDTO from "@/lib/mappers/song-request/song-request-list.mapper";

type FetchSongRequestArgs = {
  userName?: string;
  search?: string;
  page?: number;
  order?: string;
  genre?: string;
  sort?: string;
  max_publications?: number | null;
};

export default async function fetchSongRequestListAction({
  userName,
  search,
  page,
  genre,
  sort,
  max_publications = null,
}: FetchSongRequestArgs): Promise<DomainResponseDTO> {
  const supabase = await createClient();

  const { data: fetchSongRequestData, error: fetchSongRequestnError } =
    await supabase.rpc("fetch_song_request_list", {
      p_user_name: userName,
      p_search: search,
      p_page: page,
      p_genre: genre,
      p_sort: sort,
      p_page_size: 10,
      p_max_requests: max_publications,
    });

  if (!fetchSongRequestData)
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("fetch", "FAILED"),
    });

  if (fetchSongRequestnError)
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("fetch", "UNKNOWN"),
    });

  return toDomainResponseDTO({
    data: toSongRequestListDTO(fetchSongRequestData),
  });
}
