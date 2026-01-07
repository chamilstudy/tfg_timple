"use server";

import { createClient } from "@/lib/supabase/server";
import { checkEmailFormat } from "@/lib/actions/check-email-format";
import { checkPasswordFormat } from "@/lib/actions/check-password-format";
import { AuthErrorCode } from "@/lib/auth/auth-errors";

type LoginArgs = {
  email: string;
  password: string;
};

type LoginResult = { success: true } | { error: AuthErrorCode };

export async function login({
  email,
  password,
}: LoginArgs): Promise<LoginResult> {
  const supabase = await createClient();

  const emailResult = checkEmailFormat(email);
  if ("error" in emailResult) return { error: emailResult.error };

  const passwordResult = checkPasswordFormat(password);
  if ("error" in passwordResult) return { error: passwordResult.error };

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: AuthErrorCode.INVALID_CREDENTIALS };
  }

  return { success: true };
}
