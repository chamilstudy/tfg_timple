// vitest
import { describe, it, expect, vi } from "vitest";

// supabase
import { createClient } from "@/lib/supabase/server";

// actions
import fetchPublicProfileAction from "./fetch-public-profile";

// error
import { errorMessages } from "@/lib/errors/error";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

function createFetchPublicProfileMock({
  dataFetch = {
    user_id: "1",
    user_name: "user",
    description: "Description example",
    created_at: new Date().toISOString(),
    publications: [],
    requests: [],
  },
  fetchError = null,
  sessionData = { user: { id: "123" } },
  sessionError = null,
}: {
  dataFetch?: any | null;
  fetchError?: any | null;
  sessionData?: any | null;
  sessionError?: any | null;
} = {}) {
  const rpc = vi.fn().mockResolvedValue({
    data: dataFetch,
    error: fetchError,
  });

  const auth = {
    getUser: vi.fn().mockResolvedValue({
      data: sessionData,
      error: sessionError,
    }),
  };

  return {
    rpc,
    auth,
  };
}

describe("fetchPublicProfileAction", () => {
  it("user not found", async () => {
    (createClient as any).mockResolvedValue(
      createFetchPublicProfileMock({ dataFetch: null }),
    );

    const result = await fetchPublicProfileAction();

    expect(result.error.message).toBe(errorMessages.fetch.NOT_FOUND);
  });

  it("supabase error", async () => {
    (createClient as any).mockResolvedValue(
      createFetchPublicProfileMock({ fetchError: true }),
    );

    const result = await fetchPublicProfileAction();

    expect(result.error.message).toBe(errorMessages.fetch.UNKNOWN);
  });

  it("success", async () => {
    (createClient as any).mockResolvedValue(createFetchPublicProfileMock());

    const result = await fetchPublicProfileAction();

    expect(result.data.user_name).toBe("user");
    expect(result.data.description).toBe("Description example");
    expect(result.data.created_at).toMatch("justo ahora");
  });
});
