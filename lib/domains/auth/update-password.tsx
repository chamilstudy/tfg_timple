"use server";

import { createClient } from "@/lib/supabase/server";
import { AuthErrorCode } from "@/lib/errors/auth-errors";
import { checkPasswordFormat } from "@/lib/actions/check-password-format";
import { toUpdatePasswordDTO } from "@/lib/mappers/auth/update-password.mapper";

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

  const data = toUpdatePasswordDTO({ password });

  const { error } = await supabase.auth.updateUser(data);

  if (error) {
    return { error: AuthErrorCode.INVALID_CREDENTIALS };
  }

  return { success: true };
}
