import { beforeEach, describe, expect, it, vi } from "vitest";

import { createClient } from "@/lib/supabase/server";
import likePublication from "./like-publication";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

describe("likePublication", () => {
  const rpcMock = vi.fn();

  const supabaseMock = {
    rpc: rpcMock,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

    rpcMock.mockResolvedValue({
      error: null,
    });
  });

  it("on success", async () => {
    const result = await likePublication({
      publication_id: "publication-123",
    });

    expect(result.success).toBe(true);
    expect(result.error).toBeNull();
  });
});
