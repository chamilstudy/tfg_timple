import { describe, it, expect, vi } from "vitest";
import { createClient } from "@/lib/supabase/server";
import { updateDescriptionAction } from "@/lib/domains/user/update-description";
import { checkDescriptionFormat } from "@/lib/actions/check-description-format";
import { UserErrorCode } from "@/lib/errors/user-errors";

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

vi.mock("@/lib/actions/check-description-format", () => ({
  checkDescriptionFormat: vi.fn(),
}));

function createUpdateDescriptionMock({ error = null }: { error?: any } = {}) {
  const eq = vi.fn().mockResolvedValue({ error });
  const update = vi.fn(() => ({ eq }));
  const from = vi.fn(() => ({ update }));

  const auth = {
    getUser: vi
      .fn()
      .mockResolvedValue({ data: { description: { id: 123 } }, error: null }),
  };

  return { from, auth };
}

describe("updateDescription", () => {
  it("check description format propagation error", async () => {
    (createClient as any).mockResolvedValue(
      createUpdateDescriptionMock({ error: null })
    );
    (checkDescriptionFormat as any).mockReturnValue({
      success: false,
      error: UserErrorCode.DESCRIPTION_TOO_LONG,
    });

    const result = await updateDescriptionAction({
      description:
        "This in an example of user description with several paragraph. This has been written for testing the one hundred and fifty limit for user descriptions.",
    });
    expect(result.result).toBeUndefined;
    expect(result.error).toBe(UserErrorCode.DESCRIPTION_TOO_LONG);
  });

  it("supabase error", async () => {
    (createClient as any).mockResolvedValue(
      createUpdateDescriptionMock({ error: new Error("DB error") })
    );
    (checkDescriptionFormat as any).mockReturnValue({
      success: true,
    });

    const result = await updateDescriptionAction({
      description: "Example of description.",
    });
    expect(result.result).toBeUndefined;
    expect(result.error).toBe(UserErrorCode.UNKNOWN);
  });

  it("successful", async () => {
    (createClient as any).mockResolvedValue(
      createUpdateDescriptionMock({ error: null })
    );
    (checkDescriptionFormat as any).mockReturnValue({
      success: true,
    });

    const result = await updateDescriptionAction({
      description: "Example of description",
    });
    expect(result.error).toBeUndefined;
    expect(result.success).toBe(true);
  });
});
