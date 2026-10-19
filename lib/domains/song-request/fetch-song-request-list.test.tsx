// vitest
import { describe, it, expect, vi, beforeEach } from "vitest";

// supabase
import { createClient } from "@/lib/supabase/server";

// domains
import fetchSongRequestListAction from "./fetch-song-request-list";

// mappers
import toSongRequestListDTO from "@/lib/mappers/song-request/song-request-list.mapper";

// errors
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

const validArgs = {
  userName: "usuario-prueba",
  search: "",
  page: 1,
  genre: undefined,
  sort: "newest",
  max_publications: null,
};

const validResponse = {
  song_request_list: [],
};

describe("fetchSongRequestListAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("rpc", () => {
    it("no data", async () => {
      const supabaseMock = createSongRequestMock({
        data: null,
      });

      vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

      const result = await fetchSongRequestListAction(validArgs);

      expect(result.success).toBe(false);
      expect(result.error.message).toBe(errorMessages.fetch.FAILED);

      expect(supabaseMock.rpc).toHaveBeenCalledWith("fetch_song_request_list", {
        p_user_name: validArgs.userName,
        p_search: validArgs.search,
        p_page: validArgs.page,
        p_genre: validArgs.genre,
        p_sort: validArgs.sort,
        p_page_size: 10,
        p_max_requests: validArgs.max_publications,
      });
    });

    it("supabase error", async () => {
      const supabaseMock = createSongRequestMock({
        data: validResponse,
        rpcError: { message: "Database error" },
      });

      vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

      const result = await fetchSongRequestListAction(validArgs);

      expect(result.success).toBe(false);
      expect(result.error.message).toBe(errorMessages.fetch.UNKNOWN);
    });

    it("success", async () => {
      const supabaseMock = createSongRequestMock({
        data: validResponse,
      });

      vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

      const result = await fetchSongRequestListAction(validArgs);

      expect(result.success).not.toBe(false);
      expect(result.data).toEqual(toSongRequestListDTO(validResponse));

      expect(supabaseMock.rpc).toHaveBeenCalledWith("fetch_song_request_list", {
        p_user_name: validArgs.userName,
        p_search: validArgs.search,
        p_page: validArgs.page,
        p_genre: validArgs.genre,
        p_sort: validArgs.sort,
        p_page_size: 10,
        p_max_requests: validArgs.max_publications,
      });
    });
  });
});
