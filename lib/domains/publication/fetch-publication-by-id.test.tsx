import { describe, it, expect, vi, beforeEach } from "vitest";

// Supabase
import { createClient } from "@/lib/supabase/server";

// Action
import fetchPublicationByIdAction from "./fetch-publication-by-id";

// Errors
import { errorMessages } from "@/lib/errors/error";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

function createFetchPublicationMock({
  dataFetch = {
    publication_id: "1",
    song_id: "2",
    user_id: "3",
    song_name: "Canción de prueba",
    author: "Autor de prueba",
    album: "Álbum de prueba",
    genres: ["Folclore"],
    body: "Letra de prueba",
    chords: {},
    created_at: new Date().toISOString(),
  },
  fetchError = null,
}: {
  dataFetch?: any | null;
  fetchError?: any | null;
} = {}) {
  const rpc = vi.fn().mockResolvedValue({
    data: dataFetch,
    error: fetchError,
  });

  return { rpc };
}

describe("fetchPublicationByIdAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("supabase error", async () => {
    const supabaseMock = createFetchPublicationMock({
      fetchError: { message: "Database error" },
    });

    vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

    const result = await fetchPublicationByIdAction({
      publication_id: "1",
    });

    expect(result.error.message).toBe(errorMessages.fetch.UNKNOWN);
    expect(supabaseMock.rpc).toHaveBeenCalledWith("fetch_publication_by_id", {
      p_publication_id: "1",
    });
  });

  it("publication not found", async () => {
    const supabaseMock = createFetchPublicationMock({
      dataFetch: null,
    });

    vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

    const result = await fetchPublicationByIdAction({
      publication_id: "1",
    });

    // Este comportamiento depende de cómo gestione null tu mapper.
    expect(result.error).toBeDefined();
  });

  it("success", async () => {
    const supabaseMock = createFetchPublicationMock();

    vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

    const result = await fetchPublicationByIdAction({
      publication_id: "1",
    });

    expect(result.data).toBeDefined();
    expect(supabaseMock.rpc).toHaveBeenCalledWith("fetch_publication_by_id", {
      p_publication_id: "1",
    });
  });
});
