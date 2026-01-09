import { AuthErrorCode } from "@/lib/errors/auth-errors";

type CheckAccountInfoResult =
  | {
      success: boolean;
    }
  | {
      error: AuthErrorCode;
    };

export function checkEmailFormat(email: string): CheckAccountInfoResult {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { error: AuthErrorCode.INVALID_EMAIL };

  return { success: true };
}
