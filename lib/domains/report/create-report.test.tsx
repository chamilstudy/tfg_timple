import { describe, it, expect, vi, beforeEach } from "vitest";

// Supabase
import { createClient } from "@/lib/supabase/server";

// Action
import createReportAction from "./create-report";

// Errors
import { errorMessages } from "@/lib/errors/error";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

function createReportMock({
  userData = { user: { id: "123" } },
  userError = null,
  insertError = null,
}: {
  userData?: any;
  userError?: any;
  insertError?: any;
} = {}) {
  const insert = vi.fn().mockResolvedValue({
    error: insertError,
  });

  const from = vi.fn().mockReturnValue({
    insert,
  });

  const auth = {
    getUser: vi.fn().mockResolvedValue({
      data: userData,
      error: userError,
    }),
  };

  return {
    auth,
    from,
    insert,
  };
}

describe("createReportAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("empty reason", async () => {
    const result = await createReportAction({
      reason: "",
      publication_id: "publication-1",
    });

    expect(result.error.message).toBe(errorMessages.report.EMPTY);
    expect(createClient).not.toHaveBeenCalled();
  });

  it("session error", async () => {
    const supabaseMock = createReportMock({
      userError: { message: "Session error" },
    });

    vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

    const result = await createReportAction({
      reason: "Contenido inapropiado",
      publication_id: "publication-1",
    });

    expect(result.error.message).toBe(errorMessages.session.UNKNOWN);
  });

  it("no report target", async () => {
    const supabaseMock = createReportMock();

    vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

    const result = await createReportAction({
      reason: "Contenido inapropiado",
    });

    expect(result.error.message).toBe(errorMessages.report.EMPTY);
    expect(supabaseMock.from).not.toHaveBeenCalled();
  });

  it("multiple report targets", async () => {
    const supabaseMock = createReportMock();

    vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

    const result = await createReportAction({
      reason: "Contenido inapropiado",
      publication_id: "publication-1",
      user_id: "user-1",
    });

    expect(result.error.message).toBe(errorMessages.report.EMPTY);
    expect(supabaseMock.from).not.toHaveBeenCalled();
  });

  it("database error", async () => {
    const supabaseMock = createReportMock({
      insertError: { message: "Database error" },
    });

    vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

    const result = await createReportAction({
      reason: "Contenido inapropiado",
      publication_id: "publication-1",
    });

    expect(result.error.message).toBe(errorMessages.unknown.UNKNOWN);
    expect(supabaseMock.from).toHaveBeenCalledWith("reports");
  });

  it("success", async () => {
    const supabaseMock = createReportMock();

    vi.mocked(createClient).mockResolvedValue(supabaseMock as any);

    const result = await createReportAction({
      reason: "Contenido inapropiado",
      publication_id: "publication-1",
    });

    expect(result.error).toBeNull();
    expect(supabaseMock.from).toHaveBeenCalledWith("reports");

    expect(supabaseMock.insert).toHaveBeenCalledWith({
      reason: "Contenido inapropiado",
      reporter_id: "123",
      status: false,
      publication_id: "publication-1",
      request_id: undefined,
      user_id: undefined,
    });
  });
});
