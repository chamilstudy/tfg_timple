"use server";

import { createClient } from "@/lib/supabase/server";
import { checkUserNameAvailable } from "@/lib/actions/check-username-available";
import { AuthErrorCode } from "@/lib/auth/auth-errors";

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

  const { error } = await supabase
    .from("profiles")
    .update({ user_name: user_name })
    .eq("id", (await supabase.auth.getUser()).data.user?.id);

  if (error) {
    return { error: AuthErrorCode.INVALID_CREDENTIALS };
  }

  return { success: true };
}
