// vitest
import { describe, it, expect, vi, beforeEach } from "vitest";

// domains
import { createClient } from "@/lib/supabase/server";
import editPublicationAction from "./edit-publication";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

function createSupabaseMock({ rpcError = null }: { rpcError?: any } = {}) {
  const rpc = vi.fn().mockResolvedValue({
    data: null,
    error: rpcError,
  });

  return { rpc };
}

describe("editPublicationAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("success", async () => {
    const supabaseMock = createSupabaseMock();

    vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

    const publication_id = "publication-123";
    const body =
      "A\nLetra de prueba suficientemente larga para superar la validación del contenido de la publicación. Para ello esta publicación debe superar los 300 caracteres o no será capaz de pasar la prueba. El texto debe ser lo suficientemente largo, aunque no contenga información de interés. De este modo, espero que supere la prueba con lo escrito hasta ahora, cumpliendose los requisitos para su edición satisfactoria.";

    const result = await editPublicationAction({
      publication_id,
      body,
    });

    expect(result.success).toBe(true);

    expect(supabaseMock.rpc).toHaveBeenCalledWith(
      "edit_publication",
      expect.objectContaining({
        p_publication_id: publication_id,
        p_body: expect.any(String),
        p_chords: expect.anything(),
      }),
    );
  });

  it("supabase error", async () => {
    const supabaseMock = createSupabaseMock({
      rpcError: {
        message: "Database error",
        code: "500",
      },
    });

    vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

    const result = await editPublicationAction({
      publication_id: "publication-123",
      body: "A\nLetra de prueba suficientemente larga para superar la validación del contenido de la publicación. Para ello esta publicación debe superar los 300 caracteres o no será capaz de pasar la prueba. El texto debe ser lo suficientemente largo, aunque no contenga información de interés. De este modo, espero que supere la prueba con lo escrito hasta ahora, cumpliendose los requisitos para su edición satisfactoria.",
    });

    expect(result.success).toBe(false);
    expect(supabaseMock.rpc).toHaveBeenCalledOnce();
  });

  it("invalid body", async () => {
    const supabaseMock = createSupabaseMock();

    vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

    const result = await editPublicationAction({
      publication_id: "publication-123",
      body: "",
    });

    expect(result.success).toBe(false);
    expect(supabaseMock.rpc).not.toHaveBeenCalled();
  });
});
