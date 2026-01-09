import { UserErrorCode } from "@/lib/errors/user-errors";

type CheckUserInfoResult =
  | {
      success: true;
    }
  | {
      error: UserErrorCode;
    };

export function checkDescriptionFormat(
  description: string
): CheckUserInfoResult {
  if (description.length > 150)
    return { error: UserErrorCode.DESCRIPTION_TOO_LONG };

  return { success: true };
}
