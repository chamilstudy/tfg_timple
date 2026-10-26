import { beforeEach, describe, expect, it, vi } from "vitest";

import { createClient } from "@/lib/supabase/server";
import { createCommentAction } from "./create-comment";
import { errorMessages } from "@/lib/errors/error";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

describe("createCommentAction", () => {
  const insertMock = vi.fn();
  const fromMock = vi.fn();

  const supabaseMock = {
    from: fromMock,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    fromMock.mockReturnValue({
      insert: insertMock,
    });

    insertMock.mockResolvedValue({
      data: null,
      error: null,
    });

    vi.mocked(createClient).mockResolvedValue(supabaseMock as any);
  });

  it("success", async () => {
    const result = await createCommentAction({
      publication_id: "publication-123",
      comment: "Este comentario es válido",
    });

    expect(result.success).toBe(true);
    expect(result.error).toBeNull();

    expect(fromMock).toHaveBeenCalledWith("comments");
    expect(insertMock).toHaveBeenCalledWith({
      publication_id: "publication-123",
      comment: "Este comentario es válido",
    });
  });

  it("trim", async () => {
    const result = await createCommentAction({
      publication_id: "publication-123",
      comment: "  Este comentario es válido  ",
    });

    expect(result.success).toBe(true);
  });

  it("comment is empty", async () => {
    const result = await createCommentAction({
      publication_id: "publication-123",
      comment: "",
    });

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
    expect(result.error.message).toBe(errorMessages.comment.EMPTY);
  });

  it("comment is too short", async () => {
    const result = await createCommentAction({
      publication_id: "publication-123",
      comment: "Hola",
    });

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
    expect(result.error.message).toBe(errorMessages.comment.TOO_SHORT);
  });

  it("comment is too long", async () => {
    const result = await createCommentAction({
      publication_id: "publication-123",
      comment: "a".repeat(151),
    });

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
    expect(result.error.message).toBe(errorMessages.comment.TOO_LONG);
  });
});
