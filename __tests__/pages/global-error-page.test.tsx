import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const monitoring = vi.hoisted(() => ({
  captureException: vi.fn(),
  loadClientSentry: vi.fn(),
}));

vi.mock("@/lib/client-sentry", () => ({
  loadClientSentry: monitoring.loadClientSentry,
}));

import {
  GlobalErrorContent,
  reportGlobalError,
} from "@/app/global-error";

beforeEach(() => {
  monitoring.captureException.mockReset();
  monitoring.loadClientSentry.mockReset();
});

describe("GlobalErrorContent", () => {
  it("provides an accessible root-layout recovery path", async () => {
    const user = userEvent.setup();
    const reset = vi.fn();

    const { container } = render(<GlobalErrorContent reset={reset} />);

    expect(
      screen.getByRole("heading", { level: 1, name: "The site couldn’t load." }),
    ).toBeInTheDocument();
    expect(container.querySelector("main")).toHaveAttribute("tabindex", "-1");
    await waitFor(() => {
      expect(container.querySelector("main")).toHaveFocus();
    });
    expect(screen.getByRole("link", { name: "Return home" })).toHaveAttribute(
      "href",
      "/",
    );

    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(reset).toHaveBeenCalledTimes(1);
  });

  it("reports root-layout failures through the deferred monitoring client", async () => {
    const error = new Error("root layout failed");
    monitoring.loadClientSentry.mockResolvedValue({
      captureException: monitoring.captureException,
    });

    await reportGlobalError(error);

    expect(monitoring.loadClientSentry).toHaveBeenCalledTimes(1);
    expect(monitoring.captureException).toHaveBeenCalledWith(error);
  });

  it("keeps recovery available when monitoring cannot load", async () => {
    monitoring.loadClientSentry.mockRejectedValue(new Error("offline"));

    await expect(
      reportGlobalError(new Error("root layout failed")),
    ).resolves.toBeUndefined();
  });
});
