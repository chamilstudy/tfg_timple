"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { UserErrorCode } from "@/lib/user/user-errors";

type DeleteAccountResult =
  | {
      success: true;
    }
  | {
      error: UserErrorCode;
    };

export async function deleteAccountAction(): Promise<DeleteAccountResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user || authError) {
    return { error: UserErrorCode.INVALID_SESSION };
  }

  const admin = createAdminClient();

  const { error } = await admin.auth.admin.deleteUser(user.id);

  if (error) {
    return { error: UserErrorCode.UNKNOWN };
  }

  return { success: true };
}
