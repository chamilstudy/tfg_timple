"use server";

import { createClient } from "@/lib/supabase/server";

// Formatters
import checkDescriptionFormat from "@/lib/actions/validators/auth/check-description-format";

// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toUpdateDescriptionDTO from "@/lib/mappers/user/update-description.mapper";
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

type UpdateDescriptionArgs = {
  description: string;
};

export default async function updateDescriptionAction({
  description,
}: UpdateDescriptionArgs): Promise<DomainResponseDTO> {
  const supabase = await createClient();

  const result = checkDescriptionFormat(description);
  if (!result.success) {
    return toDomainResponseDTO({ success: false, error: result.error });
  }

  toUpdateDescriptionDTO({ description });

  const { error: updateDescriptionError } = await supabase
    .from("profiles")
    .update({ description: description })
    .eq("profile_id", (await supabase.auth.getUser()).data.user?.id);

  if (updateDescriptionError) {
    return toDomainResponseDTO({
      success: true,
      error: toErrorDto("unknown", "UNKNOWN"),
    });
  }

  return toDomainResponseDTO({});
}
