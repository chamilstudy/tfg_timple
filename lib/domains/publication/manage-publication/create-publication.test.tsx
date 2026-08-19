// vitest
import { describe, it, expect, vi, beforeEach } from "vitest";

// supabase
import { createClient } from "@/lib/supabase/server";

// actions
import createPublicationAction from "./create-publication";

// validators
import validateFields from "@/lib/actions/validators/validate.validator";
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

function createPublicationMock(rpcResponse = toDomainResponseDTO({})) {
  const rpc = vi.fn().mockResolvedValue({
    success: rpcResponse.success,
    data: rpcResponse.data,
    error: rpcResponse.error,
  });
  return { rpc };
}

describe("createPublicationAction validate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("empty name", async () => {
    (createClient as any).mockResolvedValue(
      createPublicationMock(toDomainResponseDTO({})),
    );

    const result = await createPublicationAction({
      songName: "",
      album: "",
      author: "",
      genres: [""],
      body: "",
    });

    expect(result.success).toBe(false);
    expect(result.error.field).toBe("name");
    expect(result.error.message).toBe("El nombre no puede estar vacío");
  });

  it("empty genres", async () => {
    (createClient as any).mockResolvedValue(
      createPublicationMock(toDomainResponseDTO({})),
    );

    const result = await createPublicationAction({
      songName: "Isa de Candidito",
      album: "",
      author: "",
      genres: [""],
      body: "",
    });

    expect(result.success).toBe(false);
    expect(result.error.field).toBe("genres");
    expect(result.error.message).toBe("El género no es válido");
  });
});
