// vitest
import { describe, it, expect, vi, beforeEach } from "vitest";

// supabase
import { createClient } from "@/lib/supabase/server";

// domains
import resolveSongRequestAction from "./resolve-song-request";

// formatters
import {
  publicationBodyFormatter,
  replaceChordLines,
} from "@/lib/actions/formatters/publication-body.formatter";

// errors
import { errorMessages } from "@/lib/errors/error";

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
  requestId: "request-123",
  body: "A\nLetra de prueba suficientemente larga para superar la validación del contenido de la publicación. Para ello esta publicación debe superar los 300 caracteres o no será capaz de pasar la prueba. El texto debe ser lo suficientemente largo, aunque no contenga información de interés. De este modo, espero que supere la prueba con lo escrito hasta ahora, cumpliendose los requisitos para su edición satisfactoria.",
};

describe("resolveSongRequestAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("validate", () => {
    it("invalid body", async () => {
      const result = await resolveSongRequestAction({
        ...validRequest,
        body: "",
      });

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("does not call rpc when validation fails", async () => {
      const supabaseMock = createSongRequestMock();

      vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

      await resolveSongRequestAction({
        ...validRequest,
        body: "",
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

      const result = await resolveSongRequestAction(validRequest);

      expect(result.success).toBe(false);
      expect(result.error.message).toBe(errorMessages.unknown.UNKNOWN);
    });

    it("success", async () => {
      const supabaseMock = createSongRequestMock();

      vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

      const result = await resolveSongRequestAction(validRequest);

      const chordsFormatted = publicationBodyFormatter(validRequest.body);
      const bodyFormatted = replaceChordLines(validRequest.body);

      expect(result.success).not.toBe(false);

      expect(supabaseMock.rpc).toHaveBeenCalledWith("resolve_song_request", {
        p_chords: chordsFormatted,
        p_body: bodyFormatted,
        p_request_id: validRequest.requestId,
      });
    });
  });
});
