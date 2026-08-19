// vitest
import { describe, it, expect, vi } from "vitest";

// supabase
import { createClient } from "@/lib/supabase/server";

// actions
import signOutAction from "./sign-out";

// errors
import { errorMessages } from "@/lib/errors/error";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

function createSignOutMock({ error = null }: { error?: any } = {}) {
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
      createSignOutMock({ error: new Error("DB Error") }),
    );

    const result = await signOutAction();

    expect(result.error.message).toBe(errorMessages.name.UNKNOWN);
  });

  it("success", async () => {
    (createClient as any).mockResolvedValue(createSignOutMock());

    const result = await signOutAction();

    expect(result.success).toBe(true);
  });
});
