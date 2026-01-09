"use server";

import { createClient } from "@/lib/supabase/server";
import { checkEmailFormat } from "@/lib/actions/check-email-format";
import { AuthErrorCode } from "@/lib/errors/auth-errors";
import { toUpdateEmailDTO } from "@/lib/mappers/auth/update-email.mapper";

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

  const data = toUpdateEmailDTO(email);

  const { error } = await supabase.auth.updateUser(data);

  if (error) {
    return { error: AuthErrorCode.INVALID_CREDENTIALS };
  }

  return { success: true };
}
