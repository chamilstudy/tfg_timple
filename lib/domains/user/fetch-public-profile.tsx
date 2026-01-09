"use server";

import { PublicProfileDTO } from "@/lib/dto/user/public-profile.dto";
import { toPublicProfileDTO } from "@/lib/mappers/user/public-profile.mapper";
import { createClient } from "@/lib/supabase/server";
import { UserErrorCode } from "@/lib/errors/user-errors";

type FetchPublicProfileResult =
  | { data: PublicProfileDTO }
  | { error: UserErrorCode };

export async function fetchPublicProfileAction(): Promise<FetchPublicProfileResult> {
  const supabase = await createClient();

  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (!userId)
    return {
      error: UserErrorCode.INVALID_SESSION,
    };

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (!data) {
    return { error: UserErrorCode.USER_NOT_FOUND };
  }

  if (error) return { error: UserErrorCode.UNKNOWN };

  if (!data.description) data.description = "Aún no tienes descripción...";

  return { data: toPublicProfileDTO(data) };
}
