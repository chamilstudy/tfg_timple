import { describe, it, expect, vi } from "vitest";
import { createClient } from "@/lib/supabase/server";
import { login } from "@/lib/auth/login";
import { checkEmailFormat } from "@/lib/actions/check-email-format";
import { checkPasswordFormat } from "@/lib/actions/check-password-format";
import { AuthErrorCode } from "@/lib/auth/auth-errors";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

vi.mock("@/lib/actions/check-email-format", () => ({
  checkEmailFormat: vi.fn(),
}));

vi.mock("@/lib/actions/check-password-format", () => ({
  checkPasswordFormat: vi.fn(),
}));

function createLogInMock({ error = null }: { error?: any } = {}) {
  return {
    auth: {
      signInWithPassword: vi.fn().mockResolvedValue({ error }),
    },
  };
}

describe("login", () => {
  it("email error propagation", async () => {
    (createClient as any).mockResolvedValue(createLogInMock({ error: null }));
    (checkEmailFormat as any).mockReturnValue({
      error: AuthErrorCode.INVALID_EMAIL,
    });
    (checkPasswordFormat as any).mockReturnValue({
      success: true,
    });

    const result = await login({
      email: "emaildomain.com",
      password: "123456",
    });
    expect(result.error).toBe(AuthErrorCode.INVALID_EMAIL);
  });

  it("password error propagation", async () => {
    (createClient as any).mockResolvedValue(createLogInMock({ error: null }));
    (checkEmailFormat as any).mockReturnValue({
      success: true,
    });
    (checkPasswordFormat as any).mockReturnValue({
      error: AuthErrorCode.PASSWORD_TOO_SHORT,
    });

    const result = await login({
      email: "email@domain.com",
      password: "12345",
    });
    expect(result.error).toBe(AuthErrorCode.PASSWORD_TOO_SHORT);
  });

  it("supabase error", async () => {
    (createClient as any).mockResolvedValue(
      createLogInMock({ error: new Error("DB error") })
    );
    (checkEmailFormat as any).mockReturnValue({
      success: true,
    });
    (checkPasswordFormat as any).mockReturnValue({
      success: true,
    });

    const result = await login({
      email: "email@domain.com",
      password: "123456",
    });
    expect(result.error).toEqual(AuthErrorCode.INVALID_CREDENTIALS);
  });

  it("success", async () => {
    (createClient as any).mockResolvedValue(createLogInMock({ error: null }));
    (checkEmailFormat as any).mockReturnValue({
      success: true,
    });
    (checkPasswordFormat as any).mockReturnValue({
      success: true,
    });

    const result = await login({
      email: "email@domain.com",
      password: "123456",
    });
    expect(result.success).toEqual(true);
  });
});
