"use server";
import { PrivateProfileDTO } from "@/lib/dto/user/private-profile.dto";
import { toPrivateProfileDTO } from "@/lib/mappers/user/private-profile.mapper";

import { createClient } from "@/lib/supabase/server";
import { UserErrorCode } from "@/lib/errors/user-errors";
import { fetchPublicProfileAction } from "@/lib/domains/user/fetch-public-profile";

type FetchPrivateProfileResult =
  | {
      data: PrivateProfileDTO;
    }
  | {
      error: UserErrorCode;
    };

export async function fetchPrivateProfileAction(): Promise<FetchPrivateProfileResult> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getSession();

  if (error) {
    return { error: UserErrorCode.UNKNOWN };
  }

  const emailFetched = data.session?.user.email;
  if (!data || !emailFetched) {
    return { error: UserErrorCode.INVALID_SESSION };
  }

  const publicData = await fetchPublicProfileAction();

  if ("error" in publicData) {
    return { error: publicData.error as UserErrorCode };
  }

  return { data: toPrivateProfileDTO(publicData.data, data.session?.user) };
}
