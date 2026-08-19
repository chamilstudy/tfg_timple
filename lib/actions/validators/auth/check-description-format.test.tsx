// vitest
import { describe, it, expect, vi } from "vitest";

// validators
import checkDescriptionFormat from "./check-description-format";

// errors
import { errorMessages } from "@/lib/errors/error";

describe("checkDescriptionFormat", () => {
  const checkDescriptionMock = vi.fn(checkDescriptionFormat);

  it("long description", () => {
    const result = checkDescriptionMock(
      "This in an example of user description with several paragraph. This has been written for testing the one hundred and fifty limit for user descriptions.",
    );
    expect(result.error.field).toBe("description");
    expect(result.error.message).toBe("La descripción es demasiado larga");
    expect(result.error.message).toBe(errorMessages.description.TOO_LONG);
  });

  it("correct description", () => {
    const result = checkDescriptionMock("This is a small description");
    expect(result.success).toBe(true);
  });
});
