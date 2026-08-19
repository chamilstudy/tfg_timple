"use server";

import { createClient } from "@/lib/supabase/server";

// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

type CreateReportArgs = {
  reason: string;
  publication_id?: string;
  request_id?: string;
  user_id?: string;
};

export default async function createReportAction({
  reason,
  publication_id,
  request_id,
  user_id,
}: CreateReportArgs): Promise<DomainResponseDTO> {
  if (reason.length < 1) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("report", "EMPTY"),
    });
  }

  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("session", "UNKNOWN"),
    });
  }

  const targets = [publication_id, request_id, user_id].filter(Boolean);

  if (targets.length !== 1) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("report", "EMPTY"),
    });
  }

  const { error: createReportError } = await supabase.from("reports").insert({
    reason: reason,
    reporter_id: userData.user?.id,
    status: false,
    publication_id: publication_id,
    request_id: request_id,
    user_id: user_id,
  });

  if (createReportError) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("unknown", "UNKNOWN"),
    });
  }

  return toDomainResponseDTO({});
}
