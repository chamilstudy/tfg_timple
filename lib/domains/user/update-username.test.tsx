import { describe, it, expect, vi } from "vitest";
import { createClient } from "@/lib/supabase/server";
import { AuthErrorCode } from "@/lib/errors/auth-errors";
import { checkUserNameAvailable } from "@/lib/actions/check-username-available";
import { updateUserNameAction } from "@/lib/domains/user/update-username";

vi.mock("next/headers", () => ({
  cookies: () => ({
    get: vi.fn(),
    set: vi.fn(),
    delete: vi.fn(),
  }),
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

vi.mock("@/lib/actions/check-username-available", () => ({
  checkUserNameAvailable: vi.fn(),
}));

function createUpdateUsernameMock({ error = null }: { error?: any } = {}) {
  const eq = vi.fn().mockResolvedValue({ error });
  const update = vi.fn(() => ({ eq }));
  const from = vi.fn(() => ({ update }));

  const auth = {
    getUser: vi
      .fn()
      .mockResolvedValue({ data: { user: { id: 123 } }, error: null }),
  };

  return { from, auth };
}

describe("updateUserName", () => {
  const updateUserName = vi.fn((user) => updateUserNameAction(user));

  it("check user name propagation error", async () => {
    (createClient as any).mockResolvedValue(
      createUpdateUsernameMock({ error: null })
    );
    (checkUserNameAvailable as any).mockResolvedValue({
      error: AuthErrorCode.USERNAME_TAKEN,
    });

    const result = await updateUserName("newuser");
    expect(result.result).toBeUndefined;
    expect(result.error).toBe(AuthErrorCode.USERNAME_TAKEN);
  });

  it("supabase error", async () => {
    (createClient as any).mockResolvedValue(
      createUpdateUsernameMock({ error: new Error("DB error") })
    );
    (checkUserNameAvailable as any).mockResolvedValue({
      success: true,
    });

    const result = await updateUserName("newuser");
    expect(result.result).toBeUndefined;
    expect(result.error).toBe(AuthErrorCode.INVALID_CREDENTIALS);
  });

  it("success", async () => {
    (createClient as any).mockResolvedValue(
      createUpdateUsernameMock({ error: null })
    );
    (checkUserNameAvailable as any).mockResolvedValue({
      success: true,
    });

    const result = await updateUserName("newuser");
    expect(result.error).toBeUndefined;
    expect(result.success).toBe(true);
  });
});
