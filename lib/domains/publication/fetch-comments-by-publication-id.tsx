"use server";

import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";
import toCommentListDTO from "@/lib/mappers/publication/comment-list.mapper";
import toCommentDTO from "@/lib/mappers/publication/comment.mapper";

import { createClient } from "@/lib/supabase/server";

type FetchCommentsArgs = {
  publicationId: string;
  page?: number;

  sort?: string;
  maxComments?: number | null;
};

export async function fetchCommentsAction({
  publicationId,
  page,

  sort,
  maxComments = null,
}: FetchCommentsArgs): Promise<DomainResponseDTO> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("fetch_comment_list", {
    p_publication_id: publicationId,
    p_page: page,
    p_page_size: 10,
    p_sort: sort,
    p_max_comments: maxComments,
  });

  if (error) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("comment", "UNKNOWN"),
    });
  }

  return toDomainResponseDTO({ data: toCommentListDTO(data) });
}
