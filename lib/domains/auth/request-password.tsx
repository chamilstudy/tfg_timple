"use server";

import { createClient } from "@/lib/supabase/server";
import { checkEmailFormat } from "@/lib/actions/check-email-format";
import { AuthErrorCode } from "@/lib/errors/auth-errors";
import { toRequestPasswordDTO } from "@/lib/mappers/auth/request-password.mapper";

type RequestPaswordArgs = {
  email: string;
  redirectTo: string;
};

type RequestPasswordResult = { success?: true; error?: AuthErrorCode };

export async function requestPasswordAction({
  email,
  redirectTo,
}: RequestPaswordArgs): Promise<RequestPasswordResult> {
  const supabase = await createClient();

  const emailResult = checkEmailFormat(email);
  if ("error" in emailResult) return { error: emailResult.error };

  const data = toRequestPasswordDTO({ email, redirectTo });

  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: data.redirectTo,
  });

  if (error) {
    return { error: AuthErrorCode.UNKNOWN };
  }

  return { success: true };
}
