"use server";

import { createClient } from "@/lib/supabase/server";
import { UserErrorCode } from "@/lib/user/user-errors";

type FetchPublicProfileArgs = {
  user_name: string;
};

type FetchPublicProfileData = {
  user_name: string;
  description: string;
  created_at: string;
};

type FetchPublicProfileResult =
  | {
      data: FetchPublicProfileData;
    }
  | { error: UserErrorCode };

export async function fetchPublicProfileAction({
  user_name,
}: FetchPublicProfileArgs): Promise<FetchPublicProfileResult> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_name", user_name)
    .single();

  if (!data) {
    return { error: UserErrorCode.USER_NOT_FOUND };
  }

  if (error) {
    return { error: UserErrorCode.UNKNOWN };
  }

  if (!data.description) {
    data.description = user_name + " no tiene aún descripción.";
  }

  return { data: data };
}
