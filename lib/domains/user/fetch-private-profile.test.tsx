import { describe, it, expect, vi } from "vitest";
import { createClient } from "@/lib/supabase/server";
import { fetchPrivateProfileAction } from "@/lib/domains/user/fetch-private-profile";
import { UserErrorCode } from "@/lib/errors/user-errors";

vi.mock("@/lib/domains/user/fetch-public-profile", () => {
  const mockPublicProfileData = {
    user_name: "user1",
    description: "desc",
    created_at: "2026-01-08",
  };
  return {
    fetchPublicProfileAction: vi
      .fn()
      .mockResolvedValue({ data: mockPublicProfileData }),
  };
});

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

function createFetchPrivateProfileMock({
  sessionData = { user: { email: "user@domain.com", id: "123" } },
  sessionError = null,
} = {}) {
  return {
    auth: {
      getSession: vi.fn().mockResolvedValue({
        data: { session: sessionData },
        error: sessionError,
      }),
    },
  };
}

describe("fetchPrivateProfileAction", () => {
  it("error no session", async () => {
    (createClient as any).mockResolvedValue(
      createFetchPrivateProfileMock({ sessionData: null })
    );

    const result = await fetchPrivateProfileAction();
    expect(result.error).toBe(UserErrorCode.INVALID_SESSION);
  });

  it("error no email", async () => {
    (createClient as any).mockResolvedValue(
      createFetchPrivateProfileMock({
        sessionData: { user: { email: "" } },
      })
    );

    const result = await fetchPrivateProfileAction();
    expect(result.error).toBe(UserErrorCode.INVALID_SESSION);
  });

  it("unknown error", async () => {
    (createClient as any).mockResolvedValue(
      createFetchPrivateProfileMock({ sessionError: true })
    );

    const result = await fetchPrivateProfileAction();
    expect(result.error).toBe(UserErrorCode.UNKNOWN);
  });

  it("success", async () => {
    (createClient as any).mockResolvedValue(createFetchPrivateProfileMock());

    const result = await fetchPrivateProfileAction();

    expect(result.data.email).toBe("user@domain.com");
    expect(result.data.user_name).toBe("user1");
    expect(result.data.description).toBe("desc");
    expect(result.data.created_at).toBe("8 de enero de 2026");
  });
});
