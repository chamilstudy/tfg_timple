import { beforeEach, describe, expect, it, vi } from "vitest";

import { createClient } from "@/lib/supabase/server";
import { deleteCommentAction } from "./delete-comment";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

describe("deleteCommentAction", () => {
  const eqMock = vi.fn();
  const deleteMock = vi.fn();
  const fromMock = vi.fn();

  const supabaseMock = {
    from: fromMock,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    eqMock.mockResolvedValue({
      data: null,
      error: null,
    });

    deleteMock.mockReturnValue({
      eq: eqMock,
    });

    fromMock.mockReturnValue({
      delete: deleteMock,
    });

    vi.mocked(createClient).mockResolvedValue(supabaseMock as any);
  });

  it("success", async () => {
    const comment_id = "comment-123";

    const result = await deleteCommentAction({ comment_id });

    expect(result.success).toBe(true);
    expect(result.error).toBeNull();
  });
});
