import { describe, it, expect, vi } from "vitest";
import { checkEmailFormat } from "@/lib/actions/check-email-format";
import { AuthErrorCode } from "@/lib/auth/auth-errors";

describe("checkEmailFormat", () => {
  const checkEmailMock = vi.fn(checkEmailFormat);

  it("email just with @.com", () => {
    const result = checkEmailMock("@.com");
    expect(result.error).toBe(AuthErrorCode.INVALID_EMAIL);
  });

  it("email just with .com", () => {
    const result = checkEmailMock(".com");
    expect(result.error).toBe(AuthErrorCode.INVALID_EMAIL);
  });

  it("correct email", () => {
    const result = checkEmailMock("user@domain.com");
    expect(result.success).toBe(true);
  });
});
