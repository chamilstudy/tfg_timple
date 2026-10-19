// vitest
import { describe, it, expect, vi, beforeEach } from "vitest";

// supabase
import { createClient } from "@/lib/supabase/server";

// domains
import fetchSongRequestsByIdAction from "./fetch-song-request-by-id";

// mappers
import toSongRequestDTO from "@/lib/mappers/song-request/song-request.mapper";

// error
import { errorMessages } from "@/lib/errors/error";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

function createSongRequestMock({
  data = null,
  rpcError = null,
}: {
  data?: any;
  rpcError?: any;
} = {}) {
  const rpc = vi.fn().mockResolvedValue({
    data,
    error: rpcError,
  });

  return { rpc };
}

describe("fetchSongRequestsByIdAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("rpc", () => {
    it("supabase error", async () => {
      const supabaseMock = createSongRequestMock({
        rpcError: { message: "Database error" },
      });

      vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

      const result = await fetchSongRequestsByIdAction({
        requestId: "request-123",
      });

      expect(result.success).toBe(false);
      expect(result.error.message).toBe(errorMessages.unknown.UNKNOWN);

      expect(supabaseMock.rpc).toHaveBeenCalledWith("fetch_request_by_id", {
        p_request_id: "request-123",
      });
    });

    it("success", async () => {
      const requestData = {
        request_id: "request-123",
        song_name: "Isa de Candidito",
        author: "Autor de prueba",
      };

      const supabaseMock = createSongRequestMock({
        data: requestData,
      });

      vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

      const result = await fetchSongRequestsByIdAction({
        requestId: "request-123",
      });

      expect(result.success).not.toBe(false);
      expect(result.data).toEqual(toSongRequestDTO(requestData));

      expect(supabaseMock.rpc).toHaveBeenCalledWith("fetch_request_by_id", {
        p_request_id: "request-123",
      });
    });
  });
});
