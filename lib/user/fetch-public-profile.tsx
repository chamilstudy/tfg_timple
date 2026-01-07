"use server";

import { createClient } from "@/lib/supabase/server";
import { UserErrorCode } from "@/lib/user/user-errors";

type FetchPublicProfileResultData = {
  user_name: string;
  description: string;
  created_at: string;
};

type FetchPublicProfileResult =
  | {
      data: FetchPublicProfileResultData;
    }
  | {
      error: UserErrorCode;
    };

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

  if (error) {
    return { error: UserErrorCode.UNKNOWN };
  }

  if (!data.description) {
    data.description = "Aún no tienes descripción...";
  }

  const createdAtOriginal = new Date(data?.created_at);
  const createdAtFormatted = createdAtOriginal.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return {
    data: {
      user_name: data.user_name,
      description: data.description,
      created_at: createdAtFormatted,
    },
  };
}
