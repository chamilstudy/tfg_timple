"use server";

import { createClient } from "@/lib/supabase/server";
import { checkUserNameAvailable } from "@/lib/actions/check-username-available";
import { checkUserNameFormat } from "@/lib/actions/check-username-format";
import { checkEmailFormat } from "@/lib/actions/check-email-format";
import { checkPasswordFormat } from "@/lib/actions/check-password-format";
import { AuthErrorCode } from "@/lib/auth/auth-errors";

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

  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: { user_name: userName },
    },
  });

  if (error) {
    return { error: AuthErrorCode.INVALID_CREDENTIALS };
  }

  return { success: true };
}
