"use server";

import { createClient } from "@/lib/supabase/server";

// Validators
import checkEmailFormat from "@/lib/actions/validators/auth/check-email-format";

// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toUpdateEmailDTO from "@/lib/mappers/auth/update-email.mapper";
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

type UpdateEmailArgs = {
  email: string;
};

export default async function updateEmailAction({
  email,
}: UpdateEmailArgs): Promise<DomainResponseDTO> {
  const supabase = await createClient();

  const emailResult = checkEmailFormat(email);
  if (!emailResult.success)
    return toDomainResponseDTO({ success: false, error: emailResult.error });

  const updateEmailData = toUpdateEmailDTO(email);

  const { error: updateUserError } =
    await supabase.auth.updateUser(updateEmailData);

  if (updateUserError) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("session", "INVALID_CREDENTIALS"),
    });
  }

  return toDomainResponseDTO({});
}
