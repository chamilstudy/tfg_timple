"use server";

import { createClient } from "@/lib/supabase/server";
import { checkUserNameAvailable } from "@/lib/actions/check-username-available";
import { checkUserNameFormat } from "@/lib/actions/check-username-format";
import { checkEmailFormat } from "@/lib/actions/check-email-format";
import { checkPasswordFormat } from "@/lib/actions/check-password-format";
import { AuthErrorCode } from "@/lib/errors/auth-errors";
import { toSignUpDTO } from "@/lib/mappers/auth/signup.mapper";

type SignUpArgs = {
  userName: string;
  email: string;
  password: string;
};

type SignUpResult = { success: true } | { error: AuthErrorCode };

export async function signUpAction({
  userName,
  email,
  password,
}: SignUpArgs): Promise<SignUpResult> {
  const supabase = await createClient();

  const userNameResult = await checkUserNameAvailable(userName);
  if ("error" in userNameResult) {
    return { error: userNameResult.error };
  }

  const userNameFormatResult = checkUserNameFormat(userName);
  if ("error" in userNameFormatResult) {
    return { error: userNameFormatResult.error };
  }

  const emailFormatResult = checkEmailFormat(email);
  if ("error" in emailFormatResult) return { error: emailFormatResult.error };

  const passwordFormatResult = checkPasswordFormat(password);
  if ("error" in passwordFormatResult)
    return { error: passwordFormatResult.error };

  const data = toSignUpDTO({
    email,
    password,
    options: { data: { userName } },
  });

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { error: AuthErrorCode.INVALID_CREDENTIALS };
  }

  return { success: true };
}
