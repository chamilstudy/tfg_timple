"use server";

import { createClient } from "@/lib/supabase/server";

// Validators
import checkUserNameAvailable from "@/lib/actions/validators/auth/check-username-available";

// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toUpdateUsernameDTO from "@/lib/mappers/user/update-username.mapper";
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";
import checkUserNameFormat from "@/lib/actions/validators/auth/check-username-format";

type UpdateUserNameArgs = {
  user_name: string;
};

export default async function updateUserNameAction({
  user_name,
}: UpdateUserNameArgs): Promise<DomainResponseDTO> {
  const supabase = await createClient();

  let userNameResult = await checkUserNameAvailable(user_name);

  if (!userNameResult.success) {
    return toDomainResponseDTO({
      success: false,
      error: userNameResult.error,
    });
  }

  userNameResult = checkUserNameFormat(user_name);
  if (!userNameResult.success) {
    return toDomainResponseDTO({ success: false, error: userNameResult.error });
  }

  const data = toUpdateUsernameDTO({ user_name });

  const { error: updateError } = await supabase
    .from("profiles")
    .update(data)
    .eq("profile_id", (await supabase.auth.getUser()).data.user?.id);

  if (updateError) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("session", "INVALID_CREDENTIALS"),
    });
  }

  const { error: metadataError } = await supabase.auth.updateUser({
    data: {
      username: user_name,
    },
  });

  if (metadataError) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("session", "INVALID_CREDENTIALS"),
    });
  }

  await supabase.auth.refreshSession();

  return toDomainResponseDTO({});
}
