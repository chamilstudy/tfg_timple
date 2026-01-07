import { describe, it, expect, vi } from "vitest";
import { checkPasswordFormat } from "@/lib/actions/check-password-format";
import { AuthErrorCode } from "@/lib/auth/auth-errors";

describe("checkPasswordFormat", () => {
  const checkPasswordMock = vi.fn(checkPasswordFormat);

  it("short password", () => {
    const result = checkPasswordMock("123");
    expect(result.error).toBe(AuthErrorCode.PASSWORD_TOO_SHORT);
  });

  it("correct password", () => {
    const result = checkPasswordMock("123456");
    expect(result.success).toBe(true);
  });
});
