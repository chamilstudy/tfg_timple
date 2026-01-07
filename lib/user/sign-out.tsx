"use server";

import { createClient } from "@/lib/supabase/server";
import { UserErrorCode } from "@/lib/user/user-errors";

type SignOutResult =
  | {
      success: true;
    }
  | {
      error: UserErrorCode;
    };

export async function signOutAction(): Promise<SignOutResult> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: UserErrorCode.UNKNOWN };
  }

  return { success: true };
}
