"use server";

import { createClient } from "@/lib/supabase/server";
import { checkUserNameAvailable } from "@/lib/actions/check-username-available";
import { AuthErrorCode } from "@/lib/errors/auth-errors";
import { toUpdateUsernameDTO } from "@/lib/mappers/user/update-username.mapper";

type UpdateUserNameArgs = {
  user_name: string;
};

type UpdateUserNameResult = { success: true } | { error: AuthErrorCode };

export async function updateUserNameAction({
  user_name,
}: UpdateUserNameArgs): Promise<UpdateUserNameResult> {
  const supabase = await createClient();

  const userNameResult = await checkUserNameAvailable(user_name);
  if ("error" in userNameResult) {
    return { error: userNameResult.error };
  }

  const data = toUpdateUsernameDTO({ user_name });

  const { error } = await supabase
    .from("profiles")
    .update(data)
    .eq("id", (await supabase.auth.getUser()).data.user?.id);

  if (error) {
    return { error: AuthErrorCode.INVALID_CREDENTIALS };
  }

  return { success: true };
}
