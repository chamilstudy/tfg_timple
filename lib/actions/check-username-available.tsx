"use server";

import { AuthErrorCode } from "@/lib/auth/auth-errors";
import { createClient } from "@/lib/supabase/server";

type CheckUserNameExistsResult =
  | {
      success: boolean;
    }
  | {
      error: AuthErrorCode;
    };

export async function checkUserNameAvailable(
  userName: string
): Promise<CheckUserNameExistsResult> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_name", userName)
    .maybeSingle();

  if (error) {
    return { error: AuthErrorCode.UNKNOWN };
  }

  if (data) {
    return { error: AuthErrorCode.USERNAME_TAKEN };
  }

  return { success: true };
}
