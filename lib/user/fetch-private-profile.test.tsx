import { describe, it, expect, vi } from "vitest";
import { createClient } from "@/lib/supabase/server";
import { fetchPrivateProfileAction } from "@/lib/user/fetch-private-profile";
import { UserErrorCode } from "./user-errors";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

function createFetchPrivateProfileMock({
  data = { session: { user: { email: "user@domain.com" } } },
  error = null,
}: {
  data?: any | null;
  error?: any | null;
} = {}) {
  return {
    auth: {
      getSession: vi.fn().mockResolvedValue({
        data,
        error,
      }),
    },
  };
}

describe("fetchPrivateProfileAction", () => {
  it("error no session", async () => {
    (createClient as any).mockResolvedValue(
      createFetchPrivateProfileMock({ data: "" })
    );

    const result = await fetchPrivateProfileAction();
    expect(result.error).toBe(UserErrorCode.INVALID_SESSION);
  });

  it("error no email", async () => {
    (createClient as any).mockResolvedValue(
      createFetchPrivateProfileMock({
        data: { session: { user: { email: "" } } },
      })
    );

    const result = await fetchPrivateProfileAction();
    expect(result.error).toBe(UserErrorCode.INVALID_SESSION);
  });

  it("unknown error", async () => {
    (createClient as any).mockResolvedValue(
      createFetchPrivateProfileMock({
        error: true,
      })
    );

    const result = await fetchPrivateProfileAction();
    expect(result.error).toBe(UserErrorCode.UNKNOWN);
  });

  it("success", async () => {
    (createClient as any).mockResolvedValue(createFetchPrivateProfileMock());

    const result = await fetchPrivateProfileAction();
    expect(result.data.email).toBe("user@domain.com");
  });
});
