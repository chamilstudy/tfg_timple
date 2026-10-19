// vitest
import { describe, it, expect, vi, beforeEach } from "vitest";

// domains
import { createClient } from "@/lib/supabase/server";
import deletePublication from "./delete-publication";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

function createSupabaseMock({
  deleteError = null,
}: { deleteError?: any } = {}) {
  const eq = vi.fn().mockResolvedValue({
    error: deleteError,
  });

  const deleteMock = vi.fn().mockReturnValue({ eq });
  const from = vi.fn().mockReturnValue({ delete: deleteMock });

  return { from, deleteMock, eq };
}

describe("deletePublication", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should delete a publication successfully", async () => {
    const supabaseMock = createSupabaseMock();

    vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

    const publication_id = "publication-123";

    const result = await deletePublication({ publication_id });

    expect(result.success).toBe(true);

    expect(supabaseMock.from).toHaveBeenCalledWith("publications");
    expect(supabaseMock.deleteMock).toHaveBeenCalledOnce();
    expect(supabaseMock.eq).toHaveBeenCalledWith(
      "publication_id",
      publication_id,
    );
  });

  it("should return an error if the publication cannot be deleted", async () => {
    const deleteError = {
      message: "Database error",
      code: "500",
    };

    const supabaseMock = createSupabaseMock({ deleteError });

    vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

    const result = await deletePublication({
      publication_id: "publication-123",
    });

    expect(result.success).toBe(false);
    expect(supabaseMock.from).toHaveBeenCalledWith("publications");
    expect(supabaseMock.deleteMock).toHaveBeenCalledOnce();
    expect(supabaseMock.eq).toHaveBeenCalledWith(
      "publication_id",
      "publication-123",
    );
  });
});
