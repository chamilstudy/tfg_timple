// vitest
import { describe, it, expect, vi } from "vitest";

// validators
import checkEmailFormat from "./check-email-format";

// errors
import { errorMessages } from "@/lib/errors/error";

describe("checkEmailFormat", () => {
  const checkEmailMock = vi.fn(checkEmailFormat);

  it("email just with @.com", () => {
    const result = checkEmailMock("@.com");
    expect(result.error.field).toBe("email");
    expect(result.error.message).toBe("El email no es válido");
    expect(result.error.message).toBe(errorMessages.email.INVALID);
  });

  it("email just with .com", () => {
    const result = checkEmailMock(".com");
    expect(result.error.field).toBe("email");
    expect(result.error.message).toBe("El email no es válido");
    expect(result.error.message).toBe(errorMessages.email.INVALID);
  });

  it("correct email", () => {
    const result = checkEmailMock("user@domain.com");
    expect(result.success).toBe(true);
  });
});
