"use server";

import { createClient } from "@/lib/supabase/server";

// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

export default async function checkUserNameAvailable(
  userName: string,
): Promise<DomainResponseDTO> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("profile_id")
    .eq("user_name", userName)
    .maybeSingle();

  if (error) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("unknown", "UNKNOWN"),
    });
  }

  if (data) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("name", "ALREADY_EXISTS"),
    });
  }

  return toDomainResponseDTO({});
}
