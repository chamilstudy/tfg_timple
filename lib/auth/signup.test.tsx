import { describe, it, expect, vi } from "vitest";
import { createClient } from "@/lib/supabase/server";
import { signUpAction } from "./signup";
import { checkEmailFormat } from "@/lib/actions/check-email-format";
import { checkPasswordFormat } from "@/lib/actions/check-password-format";
import { checkUserNameAvailable } from "@/lib/actions/check-username-available";
import { AuthErrorCode } from "@/lib/auth/auth-errors";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

vi.mock("@/lib/actions/check-username-available", () => ({
  checkUserNameAvailable: vi.fn(),
}));

vi.mock("@/lib/actions/check-email-format", () => ({
  checkEmailFormat: vi.fn(),
}));

vi.mock("@/lib/actions/check-password-format", () => ({
  checkPasswordFormat: vi.fn(),
}));

function createSupabaseSignUpMock({ error = null }: { error?: any } = {}) {
  return {
    auth: {
      signUp: vi.fn().mockResolvedValue({ error }),
    },
  };
}

describe("signUp", () => {
  it("user name error propagation", async () => {
    (createClient as any).mockResolvedValue(
      createSupabaseSignUpMock({ error: null })
    );
    (checkUserNameAvailable as any).mockResolvedValue({
      error: AuthErrorCode.USERNAME_TAKEN,
    });
    (checkEmailFormat as any).mockReturnValue({
      success: true,
    });
    (checkPasswordFormat as any).mockReturnValue({
      success: true,
    });

    const result = await signUpAction({
      userName: "newUser",
      email: "emaildomain.com",
      password: "123456",
    });
    expect(result.error).toBe(AuthErrorCode.USERNAME_TAKEN);
  });

  it("email error propagation", async () => {
    (createClient as any).mockResolvedValue(
      createSupabaseSignUpMock({ error: null })
    );
    (checkUserNameAvailable as any).mockResolvedValue({
      success: true,
    });
    (checkEmailFormat as any).mockReturnValue({
      error: AuthErrorCode.INVALID_EMAIL,
    });
    (checkPasswordFormat as any).mockReturnValue({
      success: true,
    });

    const result = await signUpAction({
      userName: "newUser",
      email: "emaildomain.com",
      password: "123456",
    });
    expect(result.error).toBe(AuthErrorCode.INVALID_EMAIL);
  });

  it("password error propagation", async () => {
    (createClient as any).mockResolvedValue(
      createSupabaseSignUpMock({ error: null })
    );
    (checkUserNameAvailable as any).mockResolvedValue({
      success: true,
    });
    (checkEmailFormat as any).mockReturnValue({
      success: true,
    });
    (checkPasswordFormat as any).mockReturnValue({
      error: AuthErrorCode.PASSWORD_TOO_SHORT,
    });

    const result = await signUpAction({
      userName: "newUser",
      email: "email@domain.com",
      password: "12345",
    });
    expect(result.error).toBe(AuthErrorCode.PASSWORD_TOO_SHORT);
  });

  it("supabase error", async () => {
    (createClient as any).mockResolvedValue(
      createSupabaseSignUpMock({ error: new Error("DB error") })
    );
    (checkUserNameAvailable as any).mockResolvedValue({
      success: true,
    });
    (checkEmailFormat as any).mockReturnValue({
      success: true,
    });
    (checkPasswordFormat as any).mockReturnValue({
      success: true,
    });

    const result = await signUpAction({
      userName: "newUser",
      email: "email@domain.com",
      password: "123456",
    });
    expect(result.error).toEqual(AuthErrorCode.INVALID_CREDENTIALS);
  });

  it("success", async () => {
    (createClient as any).mockResolvedValue(
      createSupabaseSignUpMock({ error: null })
    );
    (checkUserNameAvailable as any).mockResolvedValue({
      success: true,
    });
    (checkEmailFormat as any).mockReturnValue({
      success: true,
    });
    (checkPasswordFormat as any).mockReturnValue({
      success: true,
    });

    const result = await signUpAction({
      userName: "newUser",
      email: "email@domain.com",
      password: "123456",
    });
    expect(result.success).toEqual(true);
  });
});
