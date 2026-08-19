"use server";

import { createClient } from "@/lib/supabase/server";

// Validators
import checkPasswordFormat from "@/lib/actions/validators/auth/check-password-format";

// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toUpdatePasswordDTO from "@/lib/mappers/auth/update-password.mapper";
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

type UpdatePaswordArgs = {
  password: string;
};

export default async function updatePasswordAction({
  password,
}: UpdatePaswordArgs): Promise<DomainResponseDTO> {
  const supabase = await createClient();

  const passwordResult = checkPasswordFormat(password);
  if (!passwordResult.success) return passwordResult;

  const updatePasswordData = toUpdatePasswordDTO({ password });

  const { error: updateUserError } =
    await supabase.auth.updateUser(updatePasswordData);

  if (updateUserError) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("session", "INVALID_CREDENTIALS"),
    });
  }

  return toDomainResponseDTO({});
}
