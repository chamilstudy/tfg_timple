import { describe, it, expect, vi, beforeEach } from "vitest";

// Supabase
import { createClient } from "@/lib/supabase/server";

// Actions
import createPublicationAction from "./create-publication";

// Formatters
import {
  publicationBodyFormatter,
  replaceChordLines,
} from "@/lib/actions/formatters/publication-body.formatter";

// Errors
import { errorMessages } from "@/lib/errors/error";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

function createPublicationMock({
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

const validPublication = {
  songName: "Isa de Candidito",
  album: "Folclore canario",
  author: "Autor de prueba",
  genres: ["Folk"],
  body: "A\nEste es un ejemplo de cuerpo de cancion lo suficientemente extenso para rebasar la prueba. Aunque carente de contenido lógico, este ejemplo puede servir para la realización de pruebas que tengan en cuenta el conteo de caracteres. Por lo tanto, no debe tenerse en cuenta el contenido sino la extensión del mismo, ya que ahí recae el valor final de este texto.",
};

describe("createPublicationAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("validate", () => {
    it("empty name", async () => {
      const result = await createPublicationAction({
        ...validPublication,
        songName: "",
      });

      expect(result.success).toBe(false);
      expect(result.error.field).toBe("name");
      expect(result.error.message).toBe("El nombre no puede estar vacío");
    });

    it("empty genres", async () => {
      const result = await createPublicationAction({
        ...validPublication,
        genres: [""],
      });

      expect(result.success).toBe(false);
      expect(result.error.field).toBe("genres");
      expect(result.error.message).toBe("El género no es válido");
    });

    it("empty author", async () => {
      const supabaseMock = createPublicationMock();

      vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

      const result = await createPublicationAction({
        ...validPublication,
        author: "",
      });

      expect(result.success).toBe(true);

      expect(supabaseMock.rpc).toHaveBeenCalledWith(
        "create_publication",
        expect.objectContaining({
          p_author: "",
        }),
      );
    });

    it("empty album", async () => {
      const supabaseMock = createPublicationMock();

      vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

      const result = await createPublicationAction({
        ...validPublication,
        album: "",
      });

      expect(result.success).toBe(true);

      expect(supabaseMock.rpc).toHaveBeenCalledWith(
        "create_publication",
        expect.objectContaining({
          p_album: "",
        }),
      );
    });

    it("invalid body", async () => {
      const result = await createPublicationAction({
        ...validPublication,
        body: "",
      });

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("does not call rpc when validation fails", async () => {
      const supabaseMock = createPublicationMock();

      vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

      await createPublicationAction({
        ...validPublication,
        songName: "",
      });

      expect(supabaseMock.rpc).not.toHaveBeenCalled();
    });
  });

  describe("rpc", () => {
    it("supabase error", async () => {
      const supabaseMock = createPublicationMock({
        rpcError: { message: "Database error" },
      });

      vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

      const result = await createPublicationAction(validPublication);

      expect(result.success).toBe(false);
      expect(result.error.message).toBe(errorMessages.unknown.UNKNOWN);
    });

    it("success", async () => {
      const supabaseMock = createPublicationMock();

      vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

      const result = await createPublicationAction(validPublication);

      const chordsFormatted = publicationBodyFormatter(validPublication.body);

      const bodyFormatted = replaceChordLines(validPublication.body);

      expect(result.success).not.toBe(false);

      expect(supabaseMock.rpc).toHaveBeenCalledWith("create_publication", {
        p_song_name: validPublication.songName,
        p_album: validPublication.album,
        p_author: validPublication.author,
        p_genres: validPublication.genres,
        p_body: bodyFormatted,
        p_chords: chordsFormatted,
      });
    });
  });
});
