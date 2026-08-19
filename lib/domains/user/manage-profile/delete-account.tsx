"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";

// Mappers
import toErrorDto from "@/lib/mappers/error/error.mapper";

export default async function deleteAccountAction(): Promise<DomainResponseDTO> {
  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (!userData || userError) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("session", "INVALID"),
    });
  }

  const admin = createAdminClient();

  const { error: deleteUserError } = await admin.auth.admin.deleteUser(
    userData.user.id,
  );

  if (deleteUserError) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("unknown", "UNKNOWN"),
    });
  }

  return toDomainResponseDTO({});
}
