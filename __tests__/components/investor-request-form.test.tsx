import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const siteAnalytics = vi.hoisted(() => ({
  capture: vi.fn(),
}));

vi.mock("@/components/PostHogProvider", () => ({
  captureSiteEvent: siteAnalytics.capture,
}));

import InvestorRequestForm from "@/app/investors/InvestorRequestForm";
import { INVESTOR_SUCCESS_MESSAGE } from "@/lib/form-messages";
import { FORM_RATE_LIMIT_MESSAGE } from "@/lib/contact-config";
import { SITE } from "@/lib/site";

async function completeRequiredFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(
    screen.getByRole("textbox", { name: "Full name" }),
    "Ada Lovelace",
  );
  await user.type(
    screen.getByRole("textbox", { name: "Email" }),
    "ada@example.com",
  );
  await user.type(
    screen.getByRole("textbox", { name: "Firm or company" }),
    "Analytical Engine Partners",
  );
}

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

beforeEach(() => {
  siteAnalytics.capture.mockReset();
});

describe("InvestorRequestForm", () => {
  it("replaces the request fields with direct contact when delivery is unavailable", () => {
    render(<InvestorRequestForm deliveryAvailable={false} />);

    expect(
      screen.getByRole("heading", {
        name: "Online data-room requests are temporarily unavailable.",
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: /Connect on LinkedIn/i }),
    ).toHaveAttribute("href", SITE.linkedin);
    expect(
      screen.queryByRole("form", {
        name: "Investor data-room access request",
      }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("exposes a distinct named form landmark", () => {
    render(<InvestorRequestForm />);

    const form = screen.getByRole("form", {
      name: "Investor data-room access request",
    });
    expect(
      screen.getByRole("form", {
        name: "Investor data-room access request",
      }),
    ).toBeVisible();
    expect(form).toHaveAttribute("method", "post");
    expect(form).toHaveAttribute("action", "/api/investor");
  });

  it("uses the same mailbox validation contract as the API", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<InvestorRequestForm />);

    await user.type(
      screen.getByRole("textbox", { name: "Full name" }),
      "Ada Lovelace",
    );
    const email = screen.getByRole("textbox", { name: "Email" });
    await user.type(email, "ada..lovelace@example.com");
    await user.type(
      screen.getByRole("textbox", { name: "Firm or company" }),
      "Analytical Engine Partners",
    );
    await user.click(
      screen.getByRole("button", { name: "Request data-room access" }),
    );

    await waitFor(() => expect(email).toHaveFocus());
    expect(
      screen.getAllByText("Please provide a valid email address."),
    ).toHaveLength(2);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("moves focus to the confirmation after a successful request", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ success: true }),
      }),
    );
    const user = userEvent.setup();
    render(<InvestorRequestForm />);
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveAttribute("aria-atomic", "true");

    await completeRequiredFields(user);
    await user.click(
      screen.getByRole("button", { name: "Request data-room access" }),
    );

    await waitFor(() => {
      expect(status).toHaveFocus();
      expect(status).toHaveTextContent("Request received.");
      expect(status).toHaveTextContent(INVESTOR_SUCCESS_MESSAGE);
    });
    expect(status).toHaveClass("min-w-0", "[overflow-wrap:anywhere]");
    expect(
      screen.getByRole("link", { name: "Review the pipeline" }),
    ).toHaveAttribute("href", "/pipeline");
    expect(siteAnalytics.capture).toHaveBeenCalledWith(
      "investor_form_submission_success",
    );
  });

  it("tracks one start and validation failures without forwarding field values", async () => {
    const user = userEvent.setup();
    render(<InvestorRequestForm />);

    await user.click(screen.getByRole("textbox", { name: "Full name" }));
    await user.click(screen.getByRole("textbox", { name: "Email" }));
    await user.click(
      screen.getByRole("button", { name: "Request data-room access" }),
    );

    expect(siteAnalytics.capture).toHaveBeenCalledTimes(2);
    expect(siteAnalytics.capture).toHaveBeenNthCalledWith(
      1,
      "investor_form_start",
    );
    expect(siteAnalytics.capture).toHaveBeenNthCalledWith(
      2,
      "investor_form_validation_failure",
    );
    expect(JSON.stringify(siteAnalytics.capture.mock.calls)).not.toContain(
      "Full name",
    );
  });

  it("tracks submission failure without forwarding the request or error content", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
        json: async () => ({
          success: false,
          error: "Private investor delivery detail.",
        }),
      }),
    );
    const user = userEvent.setup();
    render(<InvestorRequestForm />);

    await completeRequiredFields(user);
    await user.click(
      screen.getByRole("button", { name: "Request data-room access" }),
    );

    await waitFor(() =>
      expect(siteAnalytics.capture).toHaveBeenCalledWith(
        "investor_form_submission_failure",
      ),
    );
    expect(JSON.stringify(siteAnalytics.capture.mock.calls)).not.toMatch(
      /Ada Lovelace|ada@example\.com|Analytical Engine|Private investor/i,
    );
  });

  it("freezes the submitted values while delivery is pending", async () => {
    let resolveRequest:
      | ((value: {
          ok: boolean;
          status: number;
          json: () => Promise<{ success: boolean }>;
        }) => void)
      | undefined;
    const fetchMock = vi.fn(
        () =>
          new Promise((resolve) => {
            resolveRequest = resolve;
          }),
      );
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<InvestorRequestForm />);

    await completeRequiredFields(user);
    const submit = screen.getByRole("button", {
      name: "Request data-room access",
    });
    await user.click(submit);

    const form = screen.getByRole("form", {
      name: "Investor data-room access request",
    });
    await waitFor(() => expect(form).toHaveAttribute("aria-busy", "true"));
    expect(screen.getByRole("textbox", { name: "Full name" })).toBeDisabled();
    expect(screen.getByRole("textbox", { name: "Email" })).toBeDisabled();
    expect(submit).toHaveFocus();
    expect(submit).toHaveTextContent("Sending…");
    expect(submit).toHaveAttribute("aria-disabled", "true");
    expect(submit).toBeEnabled();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Sending your data-room access request. Please wait.",
    );

    fireEvent.submit(form);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    resolveRequest?.({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "Request received.",
      ),
    );
  });

  it("keeps request fields editable during a Retry-After gate", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-24T12:00:00Z"));
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 429,
        headers: new Headers({ "Retry-After": "30" }),
        json: async () => ({
          success: false,
          error: "Too many requests.",
        }),
      }),
    );
    render(<InvestorRequestForm />);

    fireEvent.change(screen.getByRole("textbox", { name: "Full name" }), {
      target: { value: "Ada Lovelace" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Email" }), {
      target: { value: "ada@example.com" },
    });
    fireEvent.change(
      screen.getByRole("textbox", { name: "Firm or company" }),
      { target: { value: "Analytical Engine Partners" } },
    );
    await act(async () => {
      fireEvent.click(
        screen.getByRole("button", { name: "Request data-room access" }),
      );
    });

    expect(screen.getByText("You can try again in 30 seconds.")).toBeVisible();
    expect(screen.getByText(FORM_RATE_LIMIT_MESSAGE)).toBeVisible();
    const retryDescription = document.getElementById("investor-retry-after");
    expect(retryDescription?.tagName).toBe("P");
    expect(retryDescription).toHaveTextContent(
      "You can try again in 30 seconds.",
    );
    expect(
      retryDescription?.querySelector('[role="status"]'),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Submission temporarily paused. You can try again in 30 seconds.",
    );
    expect(screen.getByRole("textbox", { name: "Full name" })).toBeEnabled();
    expect(screen.getByRole("textbox", { name: "Email" })).toBeEnabled();
    const submit = screen.getByRole("button", {
      name: "Request temporarily unavailable",
    });
    expect(submit).toBeEnabled();
    expect(submit).toHaveAttribute("aria-disabled", "true");
  });

  it.each([
    {
      name: "an empty successful response",
      response: {
        ok: true,
        status: 204,
        json: async () => {
          throw new SyntaxError("No JSON body");
        },
      },
    },
    {
      name: "a response that explicitly reports failure",
      response: {
        ok: true,
        status: 200,
        json: async () => ({ success: false }),
      },
    },
  ])("does not confirm $name", async ({ response }) => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response));
    const user = userEvent.setup();
    render(<InvestorRequestForm />);

    await completeRequiredFields(user);
    await user.click(
      screen.getByRole("button", { name: "Request data-room access" }),
    );

    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        /couldn't submit your request/i,
      ),
    );
    const error = screen.getByText(/couldn't submit your request/i, {
      selector: "p:not(.sr-only)",
    });
    expect(error).toHaveClass("min-w-0", "[overflow-wrap:anywhere]");
    expect(
      screen.getByRole("form", {
        name: "Investor data-room access request",
      }),
    ).toBeVisible();
  });

  it("removes corrected field errors and their links from the summary", async () => {
    const user = userEvent.setup();
    render(<InvestorRequestForm />);

    await user.click(
      screen.getByRole("button", { name: "Request data-room access" }),
    );

    const summary = screen.getByRole("region", {
      name: "Please check the highlighted fields.",
    });
    expect(summary).toHaveClass("min-w-0", "[overflow-wrap:anywhere]");
    expect(within(summary).getAllByRole("link")).toHaveLength(3);

    await user.type(
      screen.getByRole("textbox", { name: "Full name" }),
      " ",
    );
    expect(
      within(summary).getByRole("link", {
        name: "Please enter your full name.",
      }),
    ).toBeVisible();

    await user.type(
      screen.getByRole("textbox", { name: "Full name" }),
      "Ada Lovelace",
    );
    expect(
      within(summary).queryByRole("link", {
        name: "Please enter your full name.",
      }),
    ).not.toBeInTheDocument();
    expect(within(summary).getAllByRole("link")).toHaveLength(2);

    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "ada",
    );
    expect(
      within(summary).getByRole("link", {
        name: "Please enter your email address.",
      }),
    ).toBeVisible();

    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "@example.com",
    );
    await user.type(
      screen.getByRole("textbox", { name: "Firm or company" }),
      " ",
    );
    expect(
      within(summary).getByRole("link", {
        name: "Please enter your firm or company.",
      }),
    ).toBeVisible();
    await user.type(
      screen.getByRole("textbox", { name: "Firm or company" }),
      "Analytical Engine Partners",
    );

    expect(
      screen.queryByRole("region", {
        name: "Please check the highlighted fields.",
      }),
    ).not.toBeInTheDocument();
  });
});
