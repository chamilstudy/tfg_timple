"use server";

import { createClient } from "@/lib/supabase/server";
import { checkDescriptionFormat } from "@/lib/actions/check-description-format";
import { UserErrorCode } from "@/lib/errors/user-errors";
import { toUpdateDescriptionDTO } from "@/lib/mappers/user/update-description.mapper";

type UpdateDescriptionArgs = {
  description: string;
};

type UpdateDescriptionResult = { success: true } | { error: UserErrorCode };

export async function updateDescriptionAction({
  description,
}: UpdateDescriptionArgs): Promise<UpdateDescriptionResult> {
  const supabase = await createClient();

  const result = checkDescriptionFormat(description);
  if ("error" in result) {
    return { error: result.error };
  }

  const data = toUpdateDescriptionDTO({ description });

  const { error } = await supabase
    .from("profiles")
    .update({ description: description })
    .eq("id", (await supabase.auth.getUser()).data.user?.id);

  if (error) {
    return { error: UserErrorCode.UNKNOWN };
  }

  return { success: true };
}
