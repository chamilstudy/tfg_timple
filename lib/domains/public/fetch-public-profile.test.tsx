// vitest
import { describe, it, expect, vi } from "vitest";

// supabase
import { createClient } from "@/lib/supabase/server";

// domains
import fetchPublicProfileAction from "./fetch-public-profile";

// errors
import { errorMessages } from "@/lib/errors/error";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

function createSupabaseProfileMock({
  data = {
    user_id: "1",
    user_name: "user",
    description: "Description example",
    created_at: new Date().toISOString(),
    publications: [],
    requests: [],
  },
  error = null,
}: {
  data?: any | null;
  error?: any | null;
} = {}) {
  return {
    rpc: vi.fn().mockResolvedValue({
      data,
      error,
    }),
  };
}

describe("fetchPublicProfileAction", () => {
  it("user not found", async () => {
    (createClient as any).mockResolvedValue(
      createSupabaseProfileMock({ data: null }),
    );

    const result = await fetchPublicProfileAction({ user_name: "user" });

    expect(result.error.field).toBe("fetch");
    expect(result.error.message).toBe("No se han encontrado resultados");
    expect(result.error.message).toBe(errorMessages.fetch.NOT_FOUND);
  });

  it("supabase error", async () => {
    (createClient as any).mockResolvedValue(
      createSupabaseProfileMock({ error: new Error("DB Error") }),
    );

    const result = await fetchPublicProfileAction({ user_name: "user" });

    expect(result.error.field).toBe("fetch");
    expect(result.error.message).toBe("Error desconocido");
    expect(result.error.message).toBe(errorMessages.fetch.UNKNOWN);
  });

  it("success", async () => {
    (createClient as any).mockResolvedValue(
      createSupabaseProfileMock({ error: null }),
    );

    const result = await fetchPublicProfileAction({ user_name: "user" });

    expect(result.data.user_name).toBe("user");
  });
});
