// vitest
import { describe, it, expect, vi } from "vitest";

// supabase
import { createClient } from "@/lib/supabase/server";

// domains
import login from "./login";

// validators
import checkEmailFormat from "@/lib/actions/validators/auth/check-email-format";
import checkPasswordFormat from "@/lib/actions/validators/auth/check-password-format";

// errors
import toErrorDto from "@/lib/mappers/error/error.mapper";
import { errorMessages } from "@/lib/errors/error";
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

vi.mock("@/lib/actions/validators/auth/check-email-format", () => ({
  default: vi.fn(),
}));

vi.mock("@/lib/actions/validators/auth/check-password-format", () => ({
  default: vi.fn(),
}));

function createLogInMock({ error = null }: { error?: any } = {}) {
  return {
    auth: {
      signInWithPassword: vi.fn().mockResolvedValue({ error }),
    },
  };
}

describe("login", () => {
  it("email error propagation", async () => {
    (createClient as any).mockResolvedValue(createLogInMock({ error: null }));
    (checkEmailFormat as any).mockReturnValue(
      toDomainResponseDTO({
        success: false,
        error: toErrorDto("email", "INVALID"),
      }),
    );
    (checkPasswordFormat as any).mockReturnValue({
      success: true,
    });

    const result = await login({
      email: "emaildomain.com",
      password: "123456",
    });

    expect(result.success).toBe(false);
    expect(result.error.field).toBe("email");
    expect(result.error.message).toBe("El email no es válido");
    expect(result.error.message).toBe(errorMessages.email.INVALID);
  });

  it("password error propagation", async () => {
    (createClient as any).mockResolvedValue(createLogInMock({ error: null }));
    (checkEmailFormat as any).mockReturnValue({
      success: true,
    });
    (checkPasswordFormat as any).mockReturnValue(
      toDomainResponseDTO({
        success: false,
        error: toErrorDto("password", "TOO_SHORT"),
      }),
    );

    const result = await login({
      email: "email@domain.com",
      password: "12345",
    });

    expect(result.error.field).toBe("password");
    expect(result.error.message).toBe("La contraseña es demasiado corta");
    expect(result.error.message).toBe(errorMessages.password.TOO_SHORT);
  });

  it("supabase error", async () => {
    (createClient as any).mockResolvedValue(
      createLogInMock({ error: new Error("DB error") }),
    );
    (checkEmailFormat as any).mockReturnValue({
      success: true,
    });
    (checkPasswordFormat as any).mockReturnValue({
      success: true,
    });

    const result = await login({
      email: "email@domain.com",
      password: "123456",
    });

    expect(result.error.field).toBe("session");
    expect(result.error.message).toBe("Las credenciales no son validas");
    expect(result.error.message).toEqual(
      errorMessages.session.INVALID_CREDENTIALS,
    );
  });

  it("success", async () => {
    (createClient as any).mockResolvedValue(createLogInMock({ error: null }));
    (checkEmailFormat as any).mockReturnValue({
      success: true,
    });
    (checkPasswordFormat as any).mockReturnValue({
      success: true,
    });

    const result = await login({
      email: "email@domain.com",
      password: "123456",
    });

    expect(result.success).toEqual(true);
  });
});
