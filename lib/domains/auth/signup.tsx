"use server";

import { createClient } from "@/lib/supabase/server";

// Validators
import checkUserNameAvailable from "@/lib/actions/validators/auth/check-username-available";
import checkUserNameFormat from "@/lib/actions/validators/auth/check-username-format";
import checkEmailFormat from "@/lib/actions/validators/auth/check-email-format";
import checkPasswordFormat from "@/lib/actions/validators/auth/check-password-format";

// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Validators
import toSignUpDTO from "@/lib/mappers/auth/signup.mapper";
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

type SignUpArgs = {
  userName: string;
  email: string;
  password: string;
};

export default async function signUpAction({
  userName,
  email,
  password,
}: SignUpArgs): Promise<DomainResponseDTO> {
  const supabase = await createClient();

  const userNameResult = await checkUserNameAvailable(userName);
  if (!userNameResult.success) {
    return toDomainResponseDTO({ success: false, error: userNameResult.error });
  }

  const userNameFormatResult = checkUserNameFormat(userName);
  if (!userNameFormatResult.success) {
    return toDomainResponseDTO({
      success: false,
      error: userNameFormatResult.error,
    });
  }

  const emailFormatResult = checkEmailFormat(email);
  if (!emailFormatResult.success)
    return toDomainResponseDTO({
      success: false,
      error: emailFormatResult.error,
    });

  const passwordFormatResult = checkPasswordFormat(password);
  if (!passwordFormatResult.success)
    return toDomainResponseDTO({
      success: false,
      error: passwordFormatResult.error,
    });

  const signUpData = toSignUpDTO({
    email,
    password,
    options: { data: { userName } },
  });

  const { error: signUpError } = await supabase.auth.signUp(signUpData);

  if (signUpError) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("session", "UNKNOWN"),
    });
  }

  return toDomainResponseDTO({});
}
