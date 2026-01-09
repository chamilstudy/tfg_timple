"use server";
import { PublicProfileDTO } from "@/lib/dto/user/public-profile.dto";
import { toPublicProfileDTO } from "@/lib/mappers/user/public-profile.mapper";

import { createClient } from "@/lib/supabase/server";
import { UserErrorCode } from "@/lib/errors/user-errors";

type FetchPublicProfileArgs = {
  user_name: string;
};

type FetchPublicProfileResult =
  | { data: PublicProfileDTO }
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

  if (!data) return { error: UserErrorCode.USER_NOT_FOUND };

  if (error) return { error: UserErrorCode.UNKNOWN };

  return { data: toPublicProfileDTO(data) };
}
