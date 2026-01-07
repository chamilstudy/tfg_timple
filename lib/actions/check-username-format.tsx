import { AuthErrorCode } from "../auth/auth-errors";

type CheckUserNameResult =
  | {
      success: true;
    }
  | {
      error: AuthErrorCode;
    };

export function checkUserNameFormat(description: string): CheckUserNameResult {
  if (description.length > 10)
    return { error: AuthErrorCode.USERNAME_TOO_LONG };

  return { success: true };
}
