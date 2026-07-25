import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const {
  captureException,
  captureRouterTransitionStart,
  getClient,
  init,
} = vi.hoisted(() => ({
  captureException: vi.fn(),
  captureRouterTransitionStart: vi.fn(),
  getClient: vi.fn(),
  init: vi.fn(),
}));

vi.mock("@sentry/nextjs", () => ({
  captureException,
  captureRouterTransitionStart,
  getClient,
  init,
}));

import ErrorPage from "@/app/error";

afterEach(() => {
  captureException.mockReset();
  captureRouterTransitionStart.mockReset();
  getClient.mockReset();
  init.mockReset();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("ErrorPage", () => {
  it("moves focus to the recovery content when it mounts", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    const { container } = render(
      <ErrorPage error={new Error("render failed")} reset={vi.fn()} />,
    );

    await waitFor(() => {
      expect(container.querySelector("main")).toHaveFocus();
    });
  });

  it("loads error reporting on demand and avoids promising delivery", async () => {
    const error = new Error("render failed");
    vi.stubEnv(
      "NEXT_PUBLIC_SENTRY_DSN",
      "https://public@example.ingest.sentry.io/1",
    );
    getClient.mockReturnValue(undefined);
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    render(<ErrorPage error={error} reset={vi.fn()} />);

    expect(
      screen.getByText(/The issue may be logged automatically/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Our team has been notified/i)).toBeNull();

    await waitFor(() => {
      expect(init).toHaveBeenCalledWith(
        expect.objectContaining({
          dsn: "https://public@example.ingest.sentry.io/1",
        }),
      );
      expect(captureException).toHaveBeenCalledWith(error);
    });
  });

  it("does not load or report when client error reporting is unconfigured", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    render(<ErrorPage error={new Error("render failed")} reset={vi.fn()} />);

    await Promise.resolve();
    expect(init).not.toHaveBeenCalled();
    expect(captureException).not.toHaveBeenCalled();
  });
});
