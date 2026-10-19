// vitest
import { describe, it, expect, vi } from "vitest";

// supabase
import { createClient } from "@/lib/supabase/server";

// actions
import updateDescriptionAction from "./update-description";

// actions
import checkDescriptionFormat from "@/lib/actions/validators/auth/check-description-format";

// errors
import { errorMessages } from "@/lib/errors/error";

// mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
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

vi.mock("@/lib/actions/validators/auth/check-description-format", () => ({
  default: vi.fn(),
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
      createUpdateDescriptionMock({ error: null }),
    );
    (checkDescriptionFormat as any).mockReturnValue(
      toDomainResponseDTO({
        success: false,
        error: toErrorDto("description", "TOO_LONG"),
      }),
    );

    const result = await updateDescriptionAction({
      description:
        "This in an example of user description with several paragraph. This has been written for testing the one hundred and fifty limit for user descriptions.",
    });

    expect(result.error.field).toBe("description");
    expect(result.error.message).toBe("La descripción es demasiado larga");
    expect(result.error.message).toBe(errorMessages.description.TOO_LONG);
  });

  it("supabase error", async () => {
    (createClient as any).mockResolvedValue(
      createUpdateDescriptionMock({ error: new Error("DB error") }),
    );
    (checkDescriptionFormat as any).mockReturnValue({
      success: true,
    });

    const result = await updateDescriptionAction({
      description: "Example of description.",
    });

    expect(result.error.message).toBe(errorMessages.session.UNKNOWN);
  });

  it("successful", async () => {
    (createClient as any).mockResolvedValue(
      createUpdateDescriptionMock({ error: null }),
    );
    (checkDescriptionFormat as any).mockReturnValue({
      success: true,
    });

    const result = await updateDescriptionAction({
      description: "Example of description",
    });

    expect(result.success).toBe(true);
  });
});
