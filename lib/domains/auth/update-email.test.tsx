// vitest
import { describe, it, expect, vi } from "vitest";

// supabase
import { createClient } from "@/lib/supabase/server";

// validators
import updateEmailAction from "./update-email";
import checkEmailFormat from "@/lib/actions/validators/auth/check-email-format";

// errors
import { errorMessages } from "@/lib/errors/error";
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

vi.mock("@/lib/actions/validators/auth/check-email-format", () => ({
  default: vi.fn(),
}));

function createUpdateEmailMock({ error = null }: { error?: any } = {}) {
  return {
    auth: {
      updateUser: vi.fn().mockResolvedValue({ error }),
    },
  };
}

describe("updateEmail", () => {
  it("email error propagation", async () => {
    (createClient as any).mockResolvedValue(
      createUpdateEmailMock({ error: null }),
    );
    (checkEmailFormat as any).mockReturnValue(
      toDomainResponseDTO({
        success: false,
        error: toErrorDto("email", "INVALID"),
      }),
    );

    const result = await updateEmailAction({
      email: "userdomain.com",
    });

    expect(result.error.field).toBe("email");
    expect(result.error.message).toBe("El email no es válido");
    expect(result.error.message).toBe(errorMessages.email.INVALID);
  });

  it("supabase error", async () => {
    (createClient as any).mockResolvedValue(
      createUpdateEmailMock({ error: new Error("DB error") }),
    );
    (checkEmailFormat as any).mockReturnValue(toDomainResponseDTO({}));

    const result = await updateEmailAction({
      email: "user@domain.com",
    });

    expect(result.error.message).toEqual(
      errorMessages.session.INVALID_CREDENTIALS,
    );
  });

  it("success", async () => {
    (createClient as any).mockResolvedValue(
      createUpdateEmailMock({ error: null }),
    );
    (checkEmailFormat as any).mockReturnValue(toDomainResponseDTO({}));

    const result = await updateEmailAction({
      email: "user@domain.com",
    });
    expect(result.success).toEqual(true);
  });
});
