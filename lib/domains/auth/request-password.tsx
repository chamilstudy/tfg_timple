"use server";

import { createClient } from "@/lib/supabase/server";

// Validators
import checkEmailFormat from "@/lib/actions/validators/auth/check-email-format";

// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toRequestPasswordDTO from "@/lib/mappers/auth/request-password.mapper";
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

type RequestPaswordArgs = {
  email: string;
  redirectTo: string;
};

export default async function requestPasswordAction({
  email,
  redirectTo,
}: RequestPaswordArgs): Promise<DomainResponseDTO> {
  const supabase = await createClient();

  const emailResult = checkEmailFormat(email);
  if (!emailResult.success)
    return toDomainResponseDTO({ success: false, error: emailResult.error });

  const requestPasswordData = toRequestPasswordDTO({ email, redirectTo });

  const { error: requestPasswordError } =
    await supabase.auth.resetPasswordForEmail(requestPasswordData.email, {
      redirectTo: requestPasswordData.redirectTo,
    });

  if (requestPasswordError) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("session", "UNKNOWN"),
    });
  }

  return toDomainResponseDTO({});
}
