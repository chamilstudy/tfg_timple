import { AuthErrorCode } from "@/lib/errors/auth-errors";

type CheckAccountInfoResult =
  | {
      success: true;
    }
  | {
      error: AuthErrorCode;
    };

export function checkPasswordFormat(password: string): CheckAccountInfoResult {
  if (password.length < 6) return { error: AuthErrorCode.PASSWORD_TOO_SHORT };

  return { success: true };
}
