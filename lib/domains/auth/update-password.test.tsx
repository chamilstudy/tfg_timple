// vitest
import { describe, it, expect, vi } from "vitest";

// supabase
import { createClient } from "@/lib/supabase/server";

// domains
import updatePasswordAction from "./update-password";

// validators
import checkPasswordFormat from "@/lib/actions/validators/auth/check-password-format";

// errors
import { ErrorMessage, errorMessages } from "@/lib/errors/error";

// DTOs
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

vi.mock("@/lib/actions/validators/auth/check-password-format", () => ({
  default: vi.fn(),
}));

function createUpdatePasswordMock({ error = null }: { error?: any } = {}) {
  return {
    auth: {
      updateUser: vi.fn().mockResolvedValue({ error }),
    },
  };
}

describe("updatePassword", () => {
  it("check password format error propagation", async () => {
    (createClient as any).mockResolvedValue(
      createUpdatePasswordMock({ error: null }),
    );
    (checkPasswordFormat as any).mockReturnValue(
      toDomainResponseDTO({
        success: false,
        error: toErrorDto("password", "TOO_SHORT"),
      }),
    );

    const result = await updatePasswordAction({
      password: "12345",
    });

    expect(result.error.field).toBe("password");
    expect(result.error.message).toBe("La contraseña es demasiado corta");
    expect(result.error.message).toBe(errorMessages.password.TOO_SHORT);
  });

  it("supabase error", async () => {
    (createClient as any).mockResolvedValue(
      createUpdatePasswordMock({ error: new Error("DB error") }),
    );
    (checkPasswordFormat as any).mockReturnValue(toDomainResponseDTO({}));

    const result = await updatePasswordAction({
      password: "123456",
    });

    expect(result.error.field).toBe("session");
    expect(result.error.message).toBe("Las credenciales no son validas");
    expect(result.error.message).toBe(
      errorMessages.session.INVALID_CREDENTIALS,
    );
  });

  it("success", async () => {
    (createClient as any).mockResolvedValue(
      createUpdatePasswordMock({ error: null }),
    );
    (checkPasswordFormat as any).mockReturnValue(toDomainResponseDTO({}));

    const result = await updatePasswordAction({
      password: "123456",
    });

    expect(result.success).toEqual(true);
  });
});
