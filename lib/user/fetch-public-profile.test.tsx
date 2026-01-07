import { describe, it, expect, vi } from "vitest";
import { createClient } from "@/lib/supabase/server";
import { fetchPublicProfileAction } from "@/lib/user/fetch-public-profile";
import { UserErrorCode } from "@/lib/user/user-errors";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

function createFetchPublicProfileMock({
  dataFetch = {
    user_name: "user",
    description: "Description example",
    created_at: new Date().toISOString(),
  },
  errorFetch = null,
  dataSession = { user: { id: "123" } },
  errorSession = null,
}: {
  dataFetch?: any | null;
  errorFetch?: any | null;
  dataSession?: any | null;
  errorSession?: any | null;
} = {}) {
  const single = vi.fn().mockResolvedValue({
    data: dataFetch,
    error: errorFetch,
  });

  const eq = vi.fn(() => ({ single }));
  const select = vi.fn(() => ({ eq }));
  const from = vi.fn(() => ({ select }));

  const auth = {
    getUser: vi.fn().mockResolvedValue({
      data: dataSession,
      error: errorSession,
    }),
  };

  return { from, auth };
}

describe("fetchPublicProfileAction", () => {
  it("", async () => {
    (createClient as any).mockResolvedValue(
      createFetchPublicProfileMock({ dataSession: { user: { userId: "" } } })
    );

    const result = await fetchPublicProfileAction();

    expect(result.error).toBe(UserErrorCode.INVALID_SESSION);
  });

  it("user not found", async () => {
    (createClient as any).mockResolvedValue(
      createFetchPublicProfileMock({ dataFetch: null })
    );

    const result = await fetchPublicProfileAction();

    expect(result.error).toBe(UserErrorCode.USER_NOT_FOUND);
  });

  it("supabase error", async () => {
    (createClient as any).mockResolvedValue(
      createFetchPublicProfileMock({ errorFetch: true })
    );

    const result = await fetchPublicProfileAction();

    expect(result.error).toBe(UserErrorCode.UNKNOWN);
  });

  it("success", async () => {
    (createClient as any).mockResolvedValue(createFetchPublicProfileMock());

    const result = await fetchPublicProfileAction();

    expect(result.data.user_name).toBe("user");
    expect(result.data.description).toBe("Description example");
    expect(result.data.created_at).toMatch(/\d+ de \w+ de \d+/);
  });
});
