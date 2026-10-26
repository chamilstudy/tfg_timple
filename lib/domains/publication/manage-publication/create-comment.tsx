"use server";

import commentValidator from "@/lib/actions/validators/comment/comment.validator";
// dtos
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

// supabase
import { createClient } from "@/lib/supabase/server";

type CreateCommentActionArgs = {
  publication_id: string;
  comment: string;
};

export async function createCommentAction({
  publication_id,
  comment,
}: CreateCommentActionArgs): Promise<DomainResponseDTO> {
  const supabase = await createClient();

  const normalizedComment = comment.trim();

  const validationResult = commentValidator(comment);

  if (validationResult.error) {
    return toDomainResponseDTO(validationResult);
  }

  const { data: commentData, error: commentError } = await supabase
    .from("comments")
    .insert({
      publication_id: publication_id,
      comment: normalizedComment,
    });

  if (commentError) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("comment", "UNKNOWN"),
    });
  }

  return toDomainResponseDTO({});
}
