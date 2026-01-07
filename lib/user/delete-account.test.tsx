import { describe, it, expect, vi } from "vitest";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "../supabase/admin";

import { UserErrorCode } from "@/lib/user/user-errors";
import { deleteAccountAction } from "./delete-account";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: vi.fn(),
}));

function createServerClientMock({
  user = { id: "user-123" },
  error = null,
} = {}) {
  return {
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user },
        error,
      }),
    },
  };
}

function createAdminClientMock({ error = null } = {}) {
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
      createAdminClientMock({ error: new Error("Admin DB Error") })
    );
    const result = await deleteAccountAction();

    expect(result.error).toBe(UserErrorCode.UNKNOWN);
  });

  it("supabase error", async () => {
    (createClient as any).mockResolvedValue(
      createServerClientMock({ error: new Error("DB Error") })
    );

    (createAdminClient as any).mockReturnValue(createAdminClientMock());
    const result = await deleteAccountAction();

    expect(result.error).toBe(UserErrorCode.INVALID_SESSION);
  });

  it("success", async () => {
    (createClient as any).mockResolvedValue(createServerClientMock());

    (createAdminClient as any).mockReturnValue(createAdminClientMock());
    const result = await deleteAccountAction();

    expect(result.success).toBe(true);
  });
});
