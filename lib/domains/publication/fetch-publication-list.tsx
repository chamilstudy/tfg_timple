"use server";
import { createClient } from "@/lib/supabase/server";

// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";
import toPublicationListDTO from "@/lib/mappers/publication/publication-list.mapper";

type FetchPublicationArgs = {
  search?: string;
  page?: number;
  order?: string;
  genre?: string;
  sort?: string;
  max_publications?: number | null;
  user_name?: string;
};

export default async function fetchPublicationListAction({
  search,
  page,
  genre,
  sort,
  max_publications = null,
  user_name,
}: FetchPublicationArgs): Promise<DomainResponseDTO> {
  const supabase = await createClient();

  const { data: fetchPublicationData, error: fetchPublicationError } =
    await supabase.rpc("fetch_publication_list_new", {
      p_user_name: user_name,
      p_search: search, //
      p_page: page, //
      p_genre: genre, //
      p_sort: sort, //
      p_page_size: 10,
      p_max_publications: max_publications,
    });

  if (fetchPublicationError)
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("fetch", "UNKNOWN"),
    });

  if (!fetchPublicationData)
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("fetch", "FAILED"),
    });

  return toDomainResponseDTO({
    data: toPublicationListDTO(fetchPublicationData),
  });
}
