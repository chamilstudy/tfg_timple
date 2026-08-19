// vitest
import { describe, it, expect, vi, beforeEach } from "vitest";

// supabase
import { createClient } from "@/lib/supabase/server";

// actions
import fetchPrivateProfileAction from "./fetch-private-profile";
import fetchPublicProfileAction from "@/lib/domains/user/fetch-public-profile";

// errors
import { errorMessages } from "@/lib/errors/error";

// mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";

// mocks
vi.mock("@/lib/domains/user/fetch-public-profile", () => ({
  default: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

function createFetchPrivateProfileMock({
  sessionData = {
    session: {
      user: {
        id: "123",
        email: "user@domain.com",
      },
    },
  },
  sessionError = null,
}: {
  sessionData?: any;
  sessionError?: any;
} = {}) {
  return {
    auth: {
      getSession: vi.fn().mockResolvedValue({
        data: sessionData,
        error: sessionError,
      }),
    },
  };
}

describe("fetchPrivateProfileAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("error no session", async () => {
    (createClient as any).mockResolvedValue(
      createFetchPrivateProfileMock({
        sessionData: null,
      }),
    );

    const result = await fetchPrivateProfileAction();

    expect(result.error.message).toBe(errorMessages.session.INVALID);
  });

  it("error no email", async () => {
    (createClient as any).mockResolvedValue(
      createFetchPrivateProfileMock({
        sessionData: {
          session: {
            user: {
              id: "123",
              email: "",
            },
          },
        },
      }),
    );

    const result = await fetchPrivateProfileAction();

    expect(result.error.message).toBe(errorMessages.session.INVALID);
  });

  it("unknown error", async () => {
    (createClient as any).mockResolvedValue(
      createFetchPrivateProfileMock({
        sessionError: new Error("DB Error"),
      }),
    );

    const result = await fetchPrivateProfileAction();

    expect(result.error.message).toBe(errorMessages.session.UNKNOWN);
  });

  it("error fetching public profile", async () => {
    (createClient as any).mockResolvedValue(createFetchPrivateProfileMock());

    (fetchPublicProfileAction as any).mockResolvedValue(
      toDomainResponseDTO({
        success: false,
        error: {
          message: "Public profile error",
        },
      }),
    );

    const result = await fetchPrivateProfileAction();

    expect(result.success).toBe(false);
    expect(result.error.message).toBe("Public profile error");
  });

  it("success", async () => {
    (createClient as any).mockResolvedValue(createFetchPrivateProfileMock());

    (fetchPublicProfileAction as any).mockResolvedValue(
      toDomainResponseDTO({
        success: true,
        data: {
          user_id: "1",
          user_name: "user1",
          description: "desc",
          created_at: "2026-01-08T00:00:00.000Z",
          publications: [],
          requests: [],
        },
      }),
    );

    const result = await fetchPrivateProfileAction();

    expect(result.success).toBe(true);
    expect(result.data.email).toBe("user@domain.com");
    expect(result.data.user_name).toBe("user1");
    expect(result.data.description).toBe("desc");
    expect(result.data.created_at).toBe("hace 4 meses");
  });
});
