// vitest
import { describe, it, expect, vi, beforeEach } from "vitest";

// supabase
import { createClient } from "@/lib/supabase/server";

// domains
import createSongRequestAction from "./create-song-request";

// errors
import { errorMessages } from "@/lib/errors/error";

// utils
import { genres } from "@/lib/actions/utils/genres.util";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

function createSongRequestMock({
  rpcError = null,
}: {
  rpcError?: any;
} = {}) {
  const rpc = vi.fn().mockResolvedValue({
    data: null,
    error: rpcError,
  });

  return { rpc };
}

const validRequest = {
  songName: "Isa de Candidito",
  album: "Folclore canario",
  author: "Autor de prueba",
  genres: [genres[0]],
};

describe("createSongRequestAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("validate", () => {
    it("empty name", async () => {
      const result = await createSongRequestAction({
        ...validRequest,
        songName: "",
      });

      expect(result.success).toBe(false);
      expect(result.error.field).toBe("name");
      expect(result.error.message).toBe("El nombre no puede estar vacío");
    });

    it("empty genres", async () => {
      const result = await createSongRequestAction({
        ...validRequest,
        genres: [""],
      });

      expect(result.success).toBe(false);
      expect(result.error.field).toBe("genres");
      expect(result.error.message).toBe("El género no es válido");
    });

    it("does not call rpc when validation fails", async () => {
      const supabaseMock = createSongRequestMock();

      vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

      await createSongRequestAction({
        ...validRequest,
        songName: "",
      });

      expect(supabaseMock.rpc).not.toHaveBeenCalled();
    });
  });

  describe("rpc", () => {
    it("supabase error", async () => {
      const supabaseMock = createSongRequestMock({
        rpcError: { message: "Database error" },
      });

      vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

      const result = await createSongRequestAction(validRequest);

      expect(result.success).toBe(false);
      expect(result.error.message).toBe(errorMessages.unknown.UNKNOWN);
    });

    it("success", async () => {
      const supabaseMock = createSongRequestMock();

      vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

      const result = await createSongRequestAction(validRequest);

      expect(result.success).not.toBe(false);

      expect(supabaseMock.rpc).toHaveBeenCalledWith("create_song_request", {
        p_song_name: validRequest.songName,
        p_album: validRequest.album,
        p_author: validRequest.author,
        p_genres: validRequest.genres,
      });
    });
  });
});
