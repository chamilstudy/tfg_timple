import { describe, it, expect, vi } from "vitest";
import { createClient } from "@/lib/supabase/server";
import { updateEmailAction } from "@/lib/domains/auth/update-email";
import { checkEmailFormat } from "@/lib/actions/check-email-format";
import { AuthErrorCode } from "@/lib/errors/auth-errors";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

vi.mock("@/lib/actions/check-email-format", () => ({
  checkEmailFormat: vi.fn(),
}));

function createUpdateEmailMock({ error = null }: { error?: any } = {}) {
  return {
    auth: {
      updateUser: vi.fn().mockResolvedValue({ error }),
    },
  };
}

describe("updateEmail", () => {
  it("email error propagation", async () => {
    (createClient as any).mockResolvedValue(
      createUpdateEmailMock({ error: null })
    );
    (checkEmailFormat as any).mockReturnValue({
      error: AuthErrorCode.INVALID_EMAIL,
    });

    const result = await updateEmailAction({
      email: "userdomain.com",
    });
    expect(result.error).toBe(AuthErrorCode.INVALID_EMAIL);
  });

  it("supabase error", async () => {
    (createClient as any).mockResolvedValue(
      createUpdateEmailMock({ error: new Error("DB error") })
    );
    (checkEmailFormat as any).mockReturnValue({
      success: true,
    });

    const result = await updateEmailAction({
      email: "user@domain.com",
    });
    expect(result.error).toEqual(AuthErrorCode.INVALID_CREDENTIALS);
  });

  it("success", async () => {
    (createClient as any).mockResolvedValue(
      createUpdateEmailMock({ error: null })
    );
    (checkEmailFormat as any).mockReturnValue({
      success: true,
    });

    const result = await updateEmailAction({
      email: "user@domain.com",
    });
    expect(result.success).toEqual(true);
  });
});
