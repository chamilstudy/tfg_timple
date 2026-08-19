// vitest
import { describe, it, expect, vi } from "vitest";

// validators
import checkPasswordFormat from "./check-password-format";

// errors
import { errorMessages } from "@/lib/errors/error";

describe("checkPasswordFormat", () => {
  const checkPasswordMock = vi.fn(checkPasswordFormat);

  it("short password", () => {
    const result = checkPasswordMock("123");
    expect(result.error.field).toBe("password");
    expect(result.error.message).toBe("La contraseña es demasiado corta");
    expect(result.error.message).toBe(errorMessages.password.TOO_SHORT);
  });

  it("correct password", () => {
    const result = checkPasswordMock("123456");
    expect(result.success).toBe(true);
  });
});
