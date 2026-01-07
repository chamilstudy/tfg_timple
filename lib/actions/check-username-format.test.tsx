import { describe, it, expect, vi } from "vitest";
import { checkUserNameFormat } from "./check-username-format";
import { AuthErrorCode } from "@/lib/auth/auth-errors";

describe("checkUsernameFormat", () => {
  const checkPasswordMock = vi.fn(checkUserNameFormat);

  it("long user name", () => {
    const result = checkPasswordMock("alongusername");
    expect(result.error).toBe(AuthErrorCode.USERNAME_TOO_LONG);
  });

  it("correct user name", () => {
    const result = checkPasswordMock("ausername");
    expect(result.success).toBe(true);
  });
});
