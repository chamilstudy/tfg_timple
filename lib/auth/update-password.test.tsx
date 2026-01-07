import { describe, it, expect, vi } from "vitest";
import { createClient } from "@/lib/supabase/server";
import { updatePasswordAction } from "@/lib/auth/update-password";
import { checkPasswordFormat } from "@/lib/actions/check-password-format";
import { AuthErrorCode } from "@/lib/auth/auth-errors";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

vi.mock("@/lib/actions/check-password-format", () => ({
  checkPasswordFormat: vi.fn(),
}));

function createUpdatePasswordMock({ error = null }: { error?: any } = {}) {
  return {
    auth: {
      updateUser: vi.fn().mockResolvedValue({ error }),
    },
  };
}

describe("updatePassword", () => {
  it("check password format error propagation", async () => {
    (createClient as any).mockResolvedValue(
      createUpdatePasswordMock({ error: null })
    );
    (checkPasswordFormat as any).mockReturnValue({
      error: AuthErrorCode.PASSWORD_TOO_SHORT,
    });

    const result = await updatePasswordAction({
      password: "12345",
    });
    expect(result.error).toBe(AuthErrorCode.PASSWORD_TOO_SHORT);
  });

  it("supabase error", async () => {
    (createClient as any).mockResolvedValue(
      createUpdatePasswordMock({ error: new Error("DB error") })
    );
    (checkPasswordFormat as any).mockReturnValue({
      success: true,
    });

    const result = await updatePasswordAction({
      password: "123456",
    });
    expect(result.error).toEqual(AuthErrorCode.INVALID_CREDENTIALS);
  });

  it("success", async () => {
    (createClient as any).mockResolvedValue(
      createUpdatePasswordMock({ error: null })
    );
    (checkPasswordFormat as any).mockReturnValue({
      success: true,
    });

    const result = await updatePasswordAction({
      password: "123456",
    });
    expect(result.success).toEqual(true);
  });
});
