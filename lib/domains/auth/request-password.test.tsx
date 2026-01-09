import { describe, it, expect, vi } from "vitest";
import { createClient } from "@/lib/supabase/server";
import { requestPasswordAction } from "@/lib/domains/auth/request-password";
import { checkEmailFormat } from "@/lib/actions/check-email-format";
import { AuthErrorCode } from "@/lib/errors/auth-errors";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

vi.mock("@/lib/actions/check-email-format", () => ({
  checkEmailFormat: vi.fn(),
}));

function createRequestPasswordMock({ error = null }: { error?: any } = {}) {
  return {
    auth: {
      resetPasswordForEmail: vi.fn().mockResolvedValue({ error }),
    },
  };
}

describe("requestPassword", () => {
  it("password error propagation", async () => {
    (createClient as any).mockResolvedValue(
      createRequestPasswordMock({ error: null })
    );
    (checkEmailFormat as any).mockReturnValue({
      error: AuthErrorCode.INVALID_EMAIL,
    });

    const result = await requestPasswordAction({
      email: "12345",
      redirectTo: "/",
    });
    expect(result.error).toBe(AuthErrorCode.INVALID_EMAIL);
  });

  it("supabase error", async () => {
    (createClient as any).mockResolvedValue(
      createRequestPasswordMock({ error: new Error("DB error") })
    );
    (checkEmailFormat as any).mockReturnValue({
      success: true,
    });

    const result = await requestPasswordAction({
      email: "123456",
      redirectTo: "/",
    });
    expect(result.error).toEqual(AuthErrorCode.UNKNOWN);
  });

  it("success", async () => {
    (createClient as any).mockResolvedValue(
      createRequestPasswordMock({ error: null })
    );
    (checkEmailFormat as any).mockReturnValue({
      success: true,
    });

    const result = await requestPasswordAction({
      email: "123456",
      redirectTo: "/",
    });
    expect(result.success).toEqual(true);
  });
});
