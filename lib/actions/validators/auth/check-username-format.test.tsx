// vitest
import { describe, it, expect, vi } from "vitest";

// validators
import checkUserNameFormat from "./check-username-format";

// errors
import { errorMessages } from "@/lib/errors/error";

describe("checkUsernameFormat", () => {
  const checkPasswordMock = vi.fn(checkUserNameFormat);

  it("long user name", () => {
    const result = checkPasswordMock("alongusername");
    expect(result.error.field).toBe("name");
    expect(result.error.message).toBe("El nombre es demasiado largo");
    expect(result.error.message).toBe(errorMessages.name.TOO_LONG);
  });

  it("correct user name", () => {
    const result = checkPasswordMock("ausername");
    expect(result.success).toBe(true);
  });
});
