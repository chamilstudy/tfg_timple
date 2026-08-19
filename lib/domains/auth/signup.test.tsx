// vitest
import { describe, it, expect, vi } from "vitest";

// supabase
import { createClient } from "@/lib/supabase/server";

// domains
import signUpAction from "./signup";

// validators
import checkUserNameAvailable from "@/lib/actions/validators/auth/check-username-available";

// errors
import { errorMessages } from "@/lib/errors/error";

// mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

vi.mock("@/lib/actions/validators/auth/check-username-available", () => ({
  default: vi.fn(),
}));

function createSupabaseSignUpMock({ error = null }: { error?: any } = {}) {
  return {
    auth: {
      signUp: vi.fn().mockResolvedValue({ error }),
    },
  };
}

describe("signUp", () => {
  it("user name error propagation", async () => {
    (createClient as any).mockResolvedValue(
      createSupabaseSignUpMock({ error: null }),
    );

    (checkUserNameAvailable as any).mockResolvedValue(
      toDomainResponseDTO({
        success: false,
        error: toErrorDto("name", "ALREADY_EXISTS"),
      }),
    );

    const result = await signUpAction({
      userName: "newUser",
      email: "emaildomain.com",
      password: "123456",
    });

    expect(result.error.field).toBe("name");
    expect(result.error.message).toBe("El nombre ya está en uso");
    expect(result.error.message).toBe(errorMessages.name.ALREADY_EXISTS);
  });

  it("email error propagation", async () => {
    (createClient as any).mockResolvedValue(
      createSupabaseSignUpMock({ error: null }),
    );
    (checkUserNameAvailable as any).mockResolvedValue({
      success: true,
    });

    const result = await signUpAction({
      userName: "newUser",
      email: "emaildomain.com",
      password: "123456",
    });

    expect(result.error.field).toBe("email");
    expect(result.error.message).toBe("El email no es válido");
    expect(result.error.message).toBe(errorMessages.email.INVALID);
  });

  it("password error propagation", async () => {
    (createClient as any).mockResolvedValue(
      createSupabaseSignUpMock({ error: null }),
    );
    (checkUserNameAvailable as any).mockResolvedValue({
      success: true,
    });

    const result = await signUpAction({
      userName: "newUser",
      email: "email@domain.com",
      password: "12345",
    });

    expect(result.error.field).toBe("password");
    expect(result.error.message).toBe("La contraseña es demasiado corta");
    expect(result.error.message).toBe(errorMessages.password.TOO_SHORT);
  });

  it("supabase error", async () => {
    (createClient as any).mockResolvedValue(
      createSupabaseSignUpMock({ error: new Error("DB error") }),
    );
    (checkUserNameAvailable as any).mockResolvedValue({
      success: true,
    });

    const result = await signUpAction({
      userName: "newUser",
      email: "email@domain.com",
      password: "123456",
    });

    expect(result.error.field).toBe("session");
    expect(result.error.message).toBe("Error desconocido");
    expect(result.error.message).toEqual(errorMessages.session.UNKNOWN);
  });

  it("success", async () => {
    (createClient as any).mockResolvedValue(
      createSupabaseSignUpMock({ error: null }),
    );
    (checkUserNameAvailable as any).mockResolvedValue({
      success: true,
    });

    const result = await signUpAction({
      userName: "newUser",
      email: "email@domain.com",
      password: "123456",
    });
    expect(result.success).toEqual(true);
  });
});
