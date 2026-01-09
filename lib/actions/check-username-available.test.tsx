import { describe, it, expect, vi } from "vitest";
import { checkUserNameAvailable } from "@/lib/actions/check-username-available";
import { createClient } from "@/lib/supabase/server";
import { AuthErrorCode } from "@/lib/errors/auth-errors";

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

function createSupabaseQueryMock({
  data = undefined,
  error = null,
}: { data?: { id: number }; error?: any } = {}) {
  const maybeSingle = vi.fn().mockResolvedValue({ data, error });
  const eq = vi.fn(() => ({ maybeSingle }));
  const select = vi.fn(() => ({ eq }));
  const from = vi.fn(() => ({ select }));
  return { from };
}

describe("checkUserNameAvailable", () => {
  it("user name does not exist", async () => {
    (createClient as any).mockResolvedValue(
      createSupabaseQueryMock({ data: undefined })
    );

    const result = await checkUserNameAvailable("newuser");
    expect(result).toEqual({ success: true });
  });

  it("user name exists", async () => {
    (createClient as any).mockResolvedValue(
      createSupabaseQueryMock({ data: { id: 1 } })
    );

    const result = await checkUserNameAvailable("existinguser");
    expect(result).toEqual({
      error: AuthErrorCode.USERNAME_TAKEN,
    });
  });

  it("supabase error", async () => {
    (createClient as any).mockResolvedValue(
      createSupabaseQueryMock({ error: new Error("DB error") })
    );

    const result = await checkUserNameAvailable("newuser");
    expect(result).toEqual({ error: AuthErrorCode.UNKNOWN });
  });
});
