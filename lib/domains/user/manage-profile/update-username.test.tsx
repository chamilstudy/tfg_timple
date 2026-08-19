// vitest
import { describe, it, expect, vi } from "vitest";

// supabase
import { createClient } from "@/lib/supabase/server";

// error
import { errorMessages } from "@/lib/errors/error";

// mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";

// validators
import checkUserNameAvailable from "@/lib/actions/validators/auth/check-username-available";

// domains
import updateUserNameAction from "./update-username";
import toErrorDto from "@/lib/mappers/error/error.mapper";

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

vi.mock("@/lib/actions/validators/auth/check-username-available", () => ({
  default: vi.fn(),
}));

function createUpdateUsernameMock({
  error = null,
  metadataError = null,
}: {
  error?: any;
  metadataError?: any;
} = {}) {
  const eq = vi.fn().mockResolvedValue({ error });
  const update = vi.fn(() => ({ eq }));
  const from = vi.fn(() => ({ update }));

  const auth = {
    getUser: vi
      .fn()
      .mockResolvedValue({ data: { user: { id: 123 } }, error: null }),

    updateUser: vi.fn().mockResolvedValue({
      error: metadataError,
    }),

    refreshSession: vi.fn().mockResolvedValue({}),
  };

  return { from, auth };
}

describe("updateUserName", () => {
  const updateUserName = vi.fn((user) => updateUserNameAction(user));

  it("check user name propagation error", async () => {
    (createClient as any).mockResolvedValue(
      createUpdateUsernameMock({ error: null }),
    );
    (checkUserNameAvailable as any).mockResolvedValue(
      toDomainResponseDTO({
        success: false,
        error: toErrorDto("name", "ALREADY_EXISTS"),
      }),
    );

    const result = await updateUserName({ user_name: "newuser" });

    expect(result.error.field).toBe("name");
    expect(result.error.message).toBe("El nombre ya está en uso");
    expect(result.error.message).toBe(errorMessages.name.ALREADY_EXISTS);
  });

  it("supabase error", async () => {
    (createClient as any).mockResolvedValue(
      createUpdateUsernameMock({ error: new Error("DB error") }),
    );
    (checkUserNameAvailable as any).mockResolvedValue(toDomainResponseDTO({}));

    const result = await updateUserName({ user_name: "newuser" });

    expect(result.error.field).toBe("session");
    expect(result.error.message).toBe("Las credenciales no son validas");
    expect(result.error.message).toBe(
      errorMessages.session.INVALID_CREDENTIALS,
    );
  });

  it("success", async () => {
    (createClient as any).mockResolvedValue(
      createUpdateUsernameMock({ error: null }),
    );
    (checkUserNameAvailable as any).mockResolvedValue(toDomainResponseDTO({}));

    const result = await updateUserName({ user_name: "newuser" });

    expect(result.success).toBe(true);
  });
});
