"use server";

import { createClient } from "@/lib/supabase/server";
import { AuthErrorCode } from "@/lib/auth/auth-errors";
import { checkPasswordFormat } from "@/lib/actions/check-password-format";

type UpdatePaswordArgs = {
  password: string;
};

type UpdatePasswordResult = { success: true } | { error: AuthErrorCode };

export async function updatePasswordAction({
  password,
}: UpdatePaswordArgs): Promise<UpdatePasswordResult> {
  const supabase = await createClient();

  const passwordResult = checkPasswordFormat(password);
  if ("error" in passwordResult) return { error: passwordResult.error };

  const { error } = await supabase.auth.updateUser({ password: password });

  if (error) {
    return { error: AuthErrorCode.INVALID_CREDENTIALS };
  }

  return { success: true };
}
