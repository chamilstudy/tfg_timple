// vitest
import { describe, it, expect, vi } from "vitest";

// DTOs
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";

// validators
import checkUserNameAvailable from "./check-username-available";

// supabase
import { createClient } from "@/lib/supabase/server";

// errors
import { errorMessages } from "@/lib/errors/error";

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

function createSupabaseQueryMock({
  data = undefined,
  error = null,
}: { data?: { id: number }; error?: any } = {}) {
  const maybeSingle = vi.fn().mockResolvedValue({ data, error });
  const eq = vi.fn(() => ({ maybeSingle }));
  const select = vi.fn(() => ({ eq }));
  const from = vi.fn(() => ({ select }));
  return { from };
}

describe("checkUserNameAvailable", () => {
  it("user name does not exist", async () => {
    (createClient as any).mockResolvedValue(createSupabaseQueryMock());

    const result = await checkUserNameAvailable("newuser");
    expect(result).toEqual(toDomainResponseDTO({}));
  });

  it("user name exists", async () => {
    (createClient as any).mockResolvedValue(
      createSupabaseQueryMock({ data: { id: 1 } }),
    );

    const result = await checkUserNameAvailable("existinguser");
    expect(result.error.field).toEqual("name");
    expect(result.error.message).toEqual("El nombre ya está en uso");
    expect(result.error.message).toEqual(errorMessages.name.ALREADY_EXISTS);
  });

  it("supabase error", async () => {
    (createClient as any).mockResolvedValue(
      createSupabaseQueryMock({ error: new Error("DB error") }),
    );

    const result = await checkUserNameAvailable("newuser");
    expect(result.error.message).toEqual(errorMessages.name.UNKNOWN);
  });
});
