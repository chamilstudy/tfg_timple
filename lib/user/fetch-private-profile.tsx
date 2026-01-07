"use server";

import { createClient } from "@/lib/supabase/server";
import { UserErrorCode } from "./user-errors";

type FetchPrivateProfileResultData = {
  email: string;
};

type FetchPrivateProfileResult =
  | {
      data: FetchPrivateProfileResultData;
    }
  | {
      error: UserErrorCode;
    };

export async function fetchPrivateProfileAction(): Promise<FetchPrivateProfileResult> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getSession();
  const emailFetched = data.session?.user.email;

  if (!data || !emailFetched) {
    return { error: UserErrorCode.INVALID_SESSION };
  }

  if (error) {
    return { error: UserErrorCode.UNKNOWN };
  }

  return {
    data: {
      email: emailFetched,
    },
  };
}
