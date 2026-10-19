import { describe, it, expect, vi, beforeEach } from "vitest";

// Supabase
import { createClient } from "@/lib/supabase/server";

// Action
import fetchPublicationListAction from "./fetch-publication-list";

// Errors
import { errorMessages } from "@/lib/errors/error";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

function createFetchPublicationListMock({
  dataFetch = {
    publication_list: [
      {
        publication_id: "1",
        user_id: "123",
        user_name: "user",
        song_id: "2",
        song_name: "Canción de prueba",
        author: "Autor de prueba",
        album: "Álbum de prueba",
        genres: ["Folclore"],
        created_at: new Date().toISOString(),
      },
    ],
    total_pages: 1,
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

describe("fetchPublicationListAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("supabase error", async () => {
    const supabaseMock = createFetchPublicationListMock({
      fetchError: { message: "Database error" },
    });

    vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

    const result = await fetchPublicationListAction({
      page: 1,
      sort: "newest",
    });

    expect(result.error.message).toBe(errorMessages.fetch.UNKNOWN);
  });

  it("publication list not found", async () => {
    const supabaseMock = createFetchPublicationListMock({
      dataFetch: null,
    });

    vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

    const result = await fetchPublicationListAction({
      page: 1,
      sort: "newest",
    });

    expect(result.error.message).toBe(errorMessages.fetch.FAILED);
  });

  it("success", async () => {
    const supabaseMock = createFetchPublicationListMock();

    vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

    const result = await fetchPublicationListAction({
      page: 1,
      sort: "newest",
    });

    expect(result.data).toBeDefined();

    expect(supabaseMock.rpc).toHaveBeenCalledWith("fetch_publication_list", {
      p_user_name: undefined,
      p_search: undefined,
      p_page: 1,
      p_genre: undefined,
      p_sort: "newest",
      p_page_size: 10,
      p_max_publications: null,
    });
  });
});
