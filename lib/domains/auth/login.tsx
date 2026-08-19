"use server";

import { createClient } from "@/lib/supabase/server";

// Validators
import checkEmailFormat from "@/lib/actions/validators/auth/check-email-format";
import checkPasswordFormat from "@/lib/actions/validators/auth/check-password-format";

// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toLoginDTO from "@/lib/mappers/auth/login.mapper";
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

type LoginArgs = {
  email: string;
  password: string;
};

export default async function login({
  email,
  password,
}: LoginArgs): Promise<DomainResponseDTO> {
  const supabase = await createClient();

  const emailResult = checkEmailFormat(email);
  if (!emailResult.success) return emailResult;

  const passwordResult = checkPasswordFormat(password);
  if (!passwordResult.success) return passwordResult;

  const loginData = toLoginDTO({ email, password });

  const { error: signWithPasswordError } =
    await supabase.auth.signInWithPassword(loginData);

  if (signWithPasswordError) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("session", "INVALID_CREDENTIALS"),
    });
  }

  return toDomainResponseDTO({});
}
