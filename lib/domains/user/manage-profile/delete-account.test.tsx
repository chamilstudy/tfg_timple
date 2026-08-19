// vitest
import { describe, it, expect, vi } from "vitest";

// supbase
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

// domains
import deleteAccountAction from "./delete-account";

// errors
import { errorMessages } from "@/lib/errors/error";

// mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: vi.fn(),
}));

function createServerClientMock({
  user = { id: "user-123" },
  error = null,
}: { user?: { id: string }; error?: any } = {}) {
  return {
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user },
        error,
      }),
    },
  };
}

function createAdminClientMock({ error = null }: { error?: any } = {}) {
  return {
    auth: {
      admin: {
        deleteUser: vi.fn().mockResolvedValue({ error }),
      },
    },
  };
}

describe("deleteAccount", () => {
  it("supabase admin error", async () => {
    (createClient as any).mockResolvedValue(createServerClientMock());

    (createAdminClient as any).mockReturnValue(
      createAdminClientMock({ error: new Error("Admin DB Error") }),
    );
    const result = await deleteAccountAction();

    expect(result.error.field).toBe("unknown");
    expect(result.error.message).toBe("Error desconocido");
    expect(result.error.message).toBe(errorMessages.unknown.UNKNOWN);
  });

  it("supabase error", async () => {
    (createClient as any).mockResolvedValue(
      createServerClientMock({ error: new Error("DB Error") }),
    );

    (createAdminClient as any).mockReturnValue(createAdminClientMock());
    const result = await deleteAccountAction();

    expect(result.error.field).toBe("session");
    expect(result.error.message).toBe("La sesión no es válida");
    expect(result.error.message).toBe(errorMessages.session.INVALID);
  });

  it("success", async () => {
    (createClient as any).mockResolvedValue(createServerClientMock());

    (createAdminClient as any).mockReturnValue(createAdminClientMock());
    const result = await deleteAccountAction();

    expect(result.success).toBe(true);
  });
});
