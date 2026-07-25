import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import FooterNewsletter from "@/components/site/FooterNewsletter";
import { SITE } from "@/lib/site";
import { FORM_RATE_LIMIT_MESSAGE } from "@/lib/contact-config";

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("FooterNewsletter", () => {
  it("replaces the email field with direct contact when delivery is unavailable", () => {
    render(<FooterNewsletter deliveryAvailable={false} />);

    expect(
      screen.getByRole("heading", {
        name: "Online update requests are temporarily unavailable.",
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: /Connect on LinkedIn/i }),
    ).toHaveAttribute("href", SITE.linkedin);
    expect(
      screen.queryByRole("form", { name: "Request company updates" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("textbox", { name: "Email address" }),
    ).not.toBeInTheDocument();
  });

  it("retains native validation before the enhanced form hydrates", () => {
    const html = renderToStaticMarkup(<FooterNewsletter />);

    expect(html).toContain('type="email"');
    expect(html).toContain("required");
    expect(html).not.toContain("novalidate");
    expect(html).toContain("Request updates");
  });

  it("declares a safe native POST fallback", () => {
    render(<FooterNewsletter />);

    const form = screen.getByRole("form", {
      name: "Request company updates",
    });
    expect(form).toHaveAttribute("method", "post");
    expect(form).toHaveAttribute("action", "/api/newsletter");
    expect(
      screen.getByRole("textbox", { name: "Email address" }),
    ).toHaveAttribute("name", "email");
  });

  it("stacks the controls when the available footer column is narrow", () => {
    render(<FooterNewsletter />);

    const email = screen.getByRole("textbox", { name: "Email address" });
    const submit = screen.getByRole("button", {
      name: "Request updates — company news",
    });
    const controls = email.parentElement;

    expect(controls).toHaveClass(
      "min-w-0",
      "flex-col",
      "sm:flex-row",
      "lg:flex-col",
    );
    expect(email).toHaveClass("min-w-0", "flex-1");
    expect(submit).toHaveClass("w-full", "sm:w-auto", "lg:w-full");
    expect(screen.getByText("Request updates")).toHaveClass(
      "min-w-0",
      "text-center",
      "leading-tight",
      "[overflow-wrap:anywhere]",
    );
  });

  it("keeps keyboard focus on the submit control after a successful request", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      }),
    );
    const user = userEvent.setup();
    render(<FooterNewsletter />);
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveAttribute("aria-atomic", "true");

    await user.type(screen.getByRole("textbox", { name: "Email address" }), "reader@example.com");
    const submit = screen.getByRole("button", {
      name: "Request updates — company news",
    });
    await user.click(submit);

    await waitFor(() =>
      expect(status).toHaveTextContent("Update request received."),
    );
    expect(status).toHaveClass("min-w-0", "[overflow-wrap:anywhere]");
    expect(submit).toHaveFocus();
    expect(screen.getByRole("textbox", { name: "Email address" })).toHaveValue("");
  });

  it("freezes the submitted address while delivery is pending", async () => {
    let resolveRequest:
      | ((value: {
          ok: boolean;
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
    render(<FooterNewsletter />);

    const email = screen.getByRole("textbox", { name: "Email address" });
    await user.type(email, "reader@example.com");
    const submit = screen.getByRole("button", {
      name: "Request updates — company news",
    });
    await user.click(submit);

    await screen.findByRole("button", { name: "Sending update request…" });
    expect(email).toHaveAttribute("readonly");
    expect(email).toBeEnabled();
    expect(submit).toHaveFocus();
    expect(submit).toHaveAttribute("aria-disabled", "true");
    expect(submit).toBeEnabled();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Sending your company update request. Please wait.",
    );

    fireEvent.submit(
      screen.getByRole("form", { name: "Request company updates" }),
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);

    resolveRequest?.({
      ok: true,
      json: async () => ({ success: true }),
    });
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "Update request received.",
      ),
    );
  });

  it("preserves an editable address while Retry-After gates the submit action", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-24T12:00:00Z"));
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 429,
        headers: new Headers({ "Retry-After": "15" }),
        json: async () => ({
          success: false,
          error: "Too many requests.",
        }),
      }),
    );
    render(<FooterNewsletter />);

    const email = screen.getByRole("textbox", { name: "Email address" });
    fireEvent.change(email, { target: { value: "reader@example.com" } });
    await act(async () => {
      fireEvent.click(
        screen.getByRole("button", { name: "Request updates — company news" }),
      );
    });

    expect(screen.getByText("You can try again in 15 seconds.")).toBeVisible();
    expect(screen.getByText(FORM_RATE_LIMIT_MESSAGE)).toBeVisible();
    const retryDescription = document.getElementById(
      "newsletter-retry-after",
    );
    expect(retryDescription?.tagName).toBe("P");
    expect(retryDescription).toHaveTextContent(
      "You can try again in 15 seconds.",
    );
    expect(
      retryDescription?.querySelector('[role="status"]'),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Submission temporarily paused. You can try again in 15 seconds.",
    );
    expect(email).toBeEnabled();
    expect(email).toHaveValue("reader@example.com");
    const submit = screen.getByRole("button", {
      name: "Request temporarily unavailable",
    });
    expect(submit).toBeEnabled();
    expect(submit).toHaveAttribute("aria-disabled", "true");

    fireEvent.change(email, { target: { value: "editor@example.com" } });
    expect(email).toHaveValue("editor@example.com");
  });

  it("distinguishes an invalid address from a delivery failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
        json: async () => ({
          success: false,
          error: "Update requests are temporarily unavailable.",
        }),
      }),
    );
    const user = userEvent.setup();
    render(<FooterNewsletter />);
    const email = screen.getByRole("textbox", { name: "Email address" });

    await user.type(email, "not-an-email");
    await user.click(
      screen.getByRole("button", { name: "Request updates — company news" }),
    );
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveFocus();

    await user.type(email, "x");
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("status")).toHaveTextContent(
      "Enter a complete email address",
    );

    await user.clear(email);
    await user.type(email, "reader@example.com");
    await user.click(
      screen.getByRole("button", { name: "Request updates — company news" }),
    );

    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "Update requests are temporarily unavailable.",
      ),
    );
    const error = screen.getByText(
      "Update requests are temporarily unavailable.",
      { selector: "p:not(.sr-only)" },
    );
    expect(error).toHaveClass("min-w-0", "[overflow-wrap:anywhere]");
    expect(email).not.toHaveAttribute("aria-invalid");
    expect(email).toHaveAttribute("maxlength", "254");
  });

  it("rejects mailbox forms that the API rejects before submitting", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<FooterNewsletter />);
    const email = screen.getByRole("textbox", { name: "Email address" });

    await user.type(email, "reader..updates@example.com");
    await user.click(
      screen.getByRole("button", { name: "Request updates — company news" }),
    );

    expect(email).toHaveFocus();
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
