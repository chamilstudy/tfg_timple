// vitest
import { describe, it, expect, vi } from "vitest";

// supabase
import { createClient } from "@/lib/supabase/server";

// domains
import requestPasswordAction from "./request-password";

// validators
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

function createRequestPasswordMock({ error = null }: { error?: any } = {}) {
  return {
    auth: {
      resetPasswordForEmail: vi.fn().mockResolvedValue({ error }),
    },
  };
}

describe("requestPassword", () => {
  it("password error propagation", async () => {
    (createClient as any).mockResolvedValue(
      createRequestPasswordMock(toDomainResponseDTO({})),
    );
    (checkEmailFormat as any).mockReturnValue(
      toDomainResponseDTO({
        success: false,
        error: toErrorDto("email", "INVALID"),
      }),
    );

    const result = await requestPasswordAction({
      email: "12345",
      redirectTo: "/",
    });

    expect(result.error.message).toBe(errorMessages.email.INVALID);
  });

  it("supabase error", async () => {
    (createClient as any).mockResolvedValue(
      createRequestPasswordMock(
        toDomainResponseDTO({
          success: false,
          error: toErrorDto("session", "UNKNOWN"),
        }),
      ),
    );
    (checkEmailFormat as any).mockReturnValue({
      success: true,
    });

    const result = await requestPasswordAction({
      email: "123456",
      redirectTo: "/",
    });

    expect(result.error.message).toEqual(errorMessages.session.UNKNOWN);
  });

  it("success", async () => {
    (createClient as any).mockResolvedValue(
      createRequestPasswordMock({ error: null }),
    );
    (checkEmailFormat as any).mockReturnValue({
      success: true,
    });

    const result = await requestPasswordAction({
      email: "123456",
      redirectTo: "/",
    });

    expect(result.success).toEqual(true);
  });
});
