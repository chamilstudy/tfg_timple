"use server";

import { createClient } from "@/lib/supabase/server";
import { checkEmailFormat } from "@/lib/actions/check-email-format";
import { AuthErrorCode } from "@/lib/auth/auth-errors";

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

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });

  if (error) {
    return { error: AuthErrorCode.UNKNOWN };
  }

  return { success: true };
}
