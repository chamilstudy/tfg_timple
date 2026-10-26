"use server";

// dtos
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

// supabase
import { createClient } from "@/lib/supabase/server";

type DeleteCommentActionArgs = {
  comment_id: string;
};

export async function deleteCommentAction({
  comment_id,
}: DeleteCommentActionArgs): Promise<DomainResponseDTO> {
  const supabase = await createClient();

  const { data: commentData, error: commentError } = await supabase
    .from("comments")
    .delete()
    .eq("comment_id", comment_id);

  if (commentError) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("comment", "UNKNOWN"),
    });
  }

  return toDomainResponseDTO({});
}
