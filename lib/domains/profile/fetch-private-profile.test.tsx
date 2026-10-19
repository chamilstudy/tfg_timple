// vitest
import { describe, it, expect, vi, beforeEach } from "vitest";

// supabase
import { createClient } from "@/lib/supabase/server";

// domains
import fetchPrivateProfileAction from "./fetch-private-profile";

// errors
import { errorMessages } from "@/lib/errors/error";

// Mocks
vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

function createFetchPrivateProfileMock({
  user = {
    id: "123",
    email: "user@domain.com",
  },
  authError = null,
  profileData = {
    profile_id: "123",
    user_name: "user1",
    description: "desc",
    created_at: "2026-01-08T00:00:00.000Z",
  },
  profileError = null,
}: {
  user?: any;
  authError?: any;
  profileData?: any;
  profileError?: any;
} = {}) {
  const single = vi.fn().mockResolvedValue({
    data: profileData,
    error: profileError,
  });

  const eq = vi.fn().mockReturnValue({ single });

  const select = vi.fn().mockReturnValue({ eq });

  const from = vi.fn().mockReturnValue({ select });

  const getUser = vi.fn().mockResolvedValue({
    data: { user },
    error: authError,
  });

  return {
    auth: {
      getUser,
    },
    from,
  };
}

describe("fetchPrivateProfileAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("error no session", async () => {
    vi.mocked(createClient).mockResolvedValue(
      createFetchPrivateProfileMock({
        user: null,
      }) as any,
    );

    const result = await fetchPrivateProfileAction();

    expect(result.success).toBe(false);
    expect(result.error.message).toBe(errorMessages.session.INVALID);
  });

  it("error fetching user", async () => {
    vi.mocked(createClient).mockResolvedValue(
      createFetchPrivateProfileMock({
        authError: new Error("Auth error"),
      }) as any,
    );

    const result = await fetchPrivateProfileAction();

    expect(result.success).toBe(false);
    expect(result.error.message).toBe(errorMessages.session.INVALID);
  });

  it("error no email", async () => {
    vi.mocked(createClient).mockResolvedValue(
      createFetchPrivateProfileMock({
        user: {
          id: "123",
          email: "",
        },
      }) as any,
    );

    const result = await fetchPrivateProfileAction();

    expect(result.success).toBe(false);
    expect(result.error.message).toBe(errorMessages.session.INVALID);
  });

  it("error fetching profile", async () => {
    vi.mocked(createClient).mockResolvedValue(
      createFetchPrivateProfileMock({
        profileError: new Error("Profile error"),
      }) as any,
    );

    const result = await fetchPrivateProfileAction();

    expect(result.success).toBe(false);
    expect(result.error.message).toBe(errorMessages.session.UNKNOWN);
  });

  it("error profile not found", async () => {
    vi.mocked(createClient).mockResolvedValue(
      createFetchPrivateProfileMock({
        profileData: null,
      }) as any,
    );

    const result = await fetchPrivateProfileAction();

    expect(result.success).toBe(false);
    expect(result.error.message).toBe(errorMessages.session.INVALID);
  });

  it("success", async () => {
    vi.mocked(createClient).mockResolvedValue(
      createFetchPrivateProfileMock() as any,
    );

    const result = await fetchPrivateProfileAction();

    expect(result.success).toBe(true);
    expect(result.data.email).toBe("user@domain.com");
    expect(result.data.user_id).toBe("123");
    expect(result.data.user_name).toBe("user1");
    expect(result.data.description).toBe("desc");
  });
});
