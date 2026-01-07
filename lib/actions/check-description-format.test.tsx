import { describe, it, expect, vi } from "vitest";
import { checkDescriptionFormat } from "@/lib/actions/check-description-format";
import { UserErrorCode } from "@/lib/user/user-errors";

describe("checkDescriptionFormat", () => {
  const checkDescriptionMock = vi.fn(checkDescriptionFormat);

  it("long description", () => {
    const result = checkDescriptionMock(
      "This in an example of user description with several paragraph. This has been written for testing the one hundred and fifty limit for user descriptions."
    );
    expect(result.error).toBe(UserErrorCode.DESCRIPTION_TOO_LONG);
  });

  it("correct description", () => {
    const result = checkDescriptionMock("This is a small description");
    expect(result.success).toBe(true);
  });
});
