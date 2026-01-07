import { describe, it, expect, vi } from "vitest";
import { createClient } from "@/lib/supabase/server";
import { signOutAction } from "./sign-out";
import { UserErrorCode } from "@/lib/user/user-errors";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

function createSignOutMock({ error = null }: { error: any | null } = {}) {
  const auth = {
    signOut: vi.fn().mockResolvedValue({
      error: error,
    }),
  };

  return { auth };
}

describe("signOut", () => {
  it("supabase error", async () => {
    (createClient as any).mockResolvedValue(
      createSignOutMock({ error: new Error("DB Error") })
    );

    const result = await signOutAction();

    expect(result.error).toBe(UserErrorCode.UNKNOWN);
  });

  it("success", async () => {
    (createClient as any).mockResolvedValue(createSignOutMock());

    const result = await signOutAction();

    expect(result.success).toBe(true);
  });
});
