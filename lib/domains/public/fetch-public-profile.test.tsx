import { describe, it, expect, vi } from "vitest";
import { createClient } from "@/lib/supabase/server";
import { fetchPublicProfileAction } from "@/lib/domains/public/fetch-public-profile";
import { UserErrorCode } from "@/lib/errors/user-errors";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

function createSupabaseProfileMock({
  data = {
    user_name: "user",
    description: "Description example",
    created_at: new Date().toISOString(),
  },
  error = null,
}: {
  data?: any | null;
  error?: any | null;
} = {}) {
  const single = vi.fn().mockResolvedValue({ data, error });
  const eq = vi.fn(() => ({ single }));
  const select = vi.fn(() => ({ eq }));
  const from = vi.fn(() => ({ select }));

  return { from };
}

describe("fetchPublicProfileAction", () => {
  it("user not found", async () => {
    (createClient as any).mockResolvedValue(
      createSupabaseProfileMock({ data: null })
    );

    const result = await fetchPublicProfileAction({ user_name: "user" });

    expect(result.data).toBeUndefined();
    expect(result.error).toBe(UserErrorCode.USER_NOT_FOUND);
  });

  it("supabase error", async () => {
    (createClient as any).mockResolvedValue(
      createSupabaseProfileMock({ error: new Error("DB Error") })
    );

    const result = await fetchPublicProfileAction({ user_name: "user" });
    expect(result.data).toBeUndefined();
    expect(result.error).toBe(UserErrorCode.UNKNOWN);
  });

  it("success", async () => {
    (createClient as any).mockResolvedValue(createSupabaseProfileMock({}));

    const result = await fetchPublicProfileAction({ user_name: "user" });
    expect(result.error).toBeUndefined();
    expect(result.data.user_name).toBe("user");
  });
});
