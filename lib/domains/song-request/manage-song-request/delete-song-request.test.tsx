//vitest
import { describe, it, expect, vi, beforeEach } from "vitest";

// supabase
import { createClient } from "@/lib/supabase/server";

// actions
import deleteSongRequestAction from "./delete-song-request";

// errors
import { errorMessages } from "@/lib/errors/error";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

function createSongRequestMock({
  deleteError = null,
}: {
  deleteError?: any;
} = {}) {
  const eq = vi.fn().mockResolvedValue({
    error: deleteError,
  });

  const deleteMock = vi.fn().mockReturnValue({ eq });
  const from = vi.fn().mockReturnValue({ delete: deleteMock });

  return { from, deleteMock, eq };
}

describe("deleteSongRequestAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("delete", () => {
    it("supabase error", async () => {
      const supabaseMock = createSongRequestMock({
        deleteError: { message: "Database error" },
      });

      vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

      const result = await deleteSongRequestAction({
        request_id: "request-123",
      });

      expect(result.success).toBe(false);
      expect(result.error.message).toBe(errorMessages.unknown.UNKNOWN);

      expect(supabaseMock.from).toHaveBeenCalledWith("requests");
      expect(supabaseMock.deleteMock).toHaveBeenCalledOnce();
      expect(supabaseMock.eq).toHaveBeenCalledWith("request_id", "request-123");
    });

    it("success", async () => {
      const supabaseMock = createSongRequestMock();

      vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

      const request_id = "request-123";

      const result = await deleteSongRequestAction({ request_id });

      expect(result.success).not.toBe(false);

      expect(supabaseMock.from).toHaveBeenCalledWith("requests");
      expect(supabaseMock.deleteMock).toHaveBeenCalledOnce();
      expect(supabaseMock.eq).toHaveBeenCalledWith("request_id", request_id);
    });
  });
});
