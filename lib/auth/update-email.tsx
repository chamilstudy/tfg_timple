"use server";

import { createClient } from "@/lib/supabase/server";
import { checkEmailFormat } from "@/lib/actions/check-email-format";
import { AuthErrorCode } from "@/lib/auth/auth-errors";

type UpdateEmailArgs = {
  email: string;
};

type UpdateEmailResult = { success: true } | { error: AuthErrorCode };

export async function updateEmailAction({
  email,
}: UpdateEmailArgs): Promise<UpdateEmailResult> {
  const supabase = await createClient();

  const emailResult = checkEmailFormat(email);
  if ("error" in emailResult) return { error: emailResult.error };

  const { error } = await supabase.auth.updateUser({ email: email });

  if (error) {
    return { error: AuthErrorCode.INVALID_CREDENTIALS };
  }

  return { success: true };
}
