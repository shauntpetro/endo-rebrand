import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const siteAnalytics = vi.hoisted(() => ({
  capture: vi.fn(),
}));

vi.mock("@/components/PostHogProvider", () => ({
  captureSiteEvent: siteAnalytics.capture,
}));

import ContactForm from "@/app/contact/ContactForm";
import ContactPage from "@/app/contact/ContactPageContent";
import {
  parseContactIntent,
  parseContactSubject,
  resolveContactRoute,
} from "@/app/contact/contact-subject";
import { FORM_RATE_LIMIT_MESSAGE } from "@/lib/contact-config";
import { SITE } from "@/lib/site";

beforeEach(() => {
  siteAnalytics.capture.mockReset();
  window.history.replaceState(null, "", "/contact");
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  window.history.replaceState(null, "", "/");
});

describe("contact subject parsing", () => {
  it("accepts approved routes and rejects unknown query values", () => {
    expect(parseContactSubject("partnership")).toBe("partnership");
    expect(parseContactSubject(["media", "general"])).toBe("media");
    expect(parseContactSubject("data")).toBeNull();
    expect(parseContactSubject("unknown")).toBeNull();
    expect(parseContactSubject(undefined)).toBeNull();
    expect(parseContactIntent("press")).toBe("press");
    expect(parseContactIntent(["asset", "press"])).toBe("asset");
    expect(parseContactIntent("interview")).toBeNull();
    expect(resolveContactRoute({ intent: "partnership" })).toEqual({
      subject: "partnership",
      intent: null,
    });
    expect(resolveContactRoute({ intent: "investor" })).toEqual({
      subject: "investor",
      intent: null,
    });
    expect(resolveContactRoute({ intent: "media" })).toEqual({
      subject: "media",
      intent: null,
    });
    expect(
      resolveContactRoute({ subject: "media", intent: "press" }),
    ).toEqual({
      subject: "media",
      intent: "press",
    });
    expect(
      resolveContactRoute({ subject: "unknown", intent: "unknown" }),
    ).toEqual({
      subject: null,
      intent: null,
    });
  });
});

describe("ContactForm subject chooser", () => {
  it("replaces the submission surface with direct contact when delivery is unavailable", () => {
    render(
      <ContactForm
        initialSubject="partnership"
        deliveryAvailable={false}
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: "The online inquiry form is temporarily unavailable.",
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: /Connect on LinkedIn/i }),
    ).toHaveAttribute("href", SITE.linkedin);
    expect(
      screen.queryByRole("form", { name: "Contact inquiry" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("includes the inquiry fields in server-rendered markup", () => {
    const html = renderToStaticMarkup(
      <ContactForm initialSubject="partnership" />,
    );

    expect(html).toContain('name="name"');
    expect(html).toContain('name="email"');
    expect(html).toContain('name="message"');
    expect(html).toContain('minLength="10"');
    expect(html).toContain("At least 10 characters.");
    expect(html).toContain("Partnership &amp; BD");
    expect(html).toContain('method="post"');
    expect(html).toContain('action="/api/contact"');
    expect(html).not.toContain("novalidate");
    expect(html).not.toContain(">Change<");
  });

  it("preserves approved media intent as tailored, non-personal guidance", () => {
    render(<ContactForm initialSubject="media" initialIntent="asset" />);

    expect(screen.getByText("Alternate asset format")).toBeVisible();
    expect(
      screen.getByText(
        /Include the asset, required format, intended use, and delivery timing\./,
      ),
    ).toBeVisible();
    const message = screen.getByRole("textbox", { name: "Message" });
    expect(message).toHaveAttribute(
      "placeholder",
      "Tell us which asset and format you need, plus the intended use.",
    );
    const descriptionId = message.getAttribute("aria-describedby");
    expect(document.getElementById(descriptionId ?? "")).toHaveTextContent(
      "At least 10 characters.",
    );
  });

  it("rejects mailbox forms that the API rejects before submitting", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactForm initialSubject="partnership" />);

    await user.type(
      screen.getByRole("textbox", { name: "Name" }),
      "Ada Lovelace",
    );
    const email = screen.getByRole("textbox", { name: "Email" });
    await user.type(email, "ada..lovelace@example.com");
    await user.type(
      screen.getByRole("textbox", { name: "Message" }),
      "I would like to discuss a potential partnership.",
    );
    await user.click(screen.getByRole("button", { name: "Send message" }));

    await waitFor(() => expect(email).toHaveFocus());
    expect(
      screen.getAllByText("Please enter a valid email address."),
    ).toHaveLength(2);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("keeps the chooser open while arrow keys move through its radios", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const partnership = screen.getByRole("radio", {
      name: "Partnership & BD",
    });
    const investor = screen.getByRole("radio", {
      name: "Investor relations",
    });

    await user.click(partnership);
    await user.keyboard("{ArrowRight}");

    expect(investor).toBeChecked();
    expect(investor).toHaveFocus();
    expect(screen.getByRole("button", { name: "Continue" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(document.getElementById("contact-subject-options")).toBeVisible();
  });

  it.each([
    ["partnership", "Partnership & BD"],
    ["investor", "Investor relations"],
    ["general", "General inquiry"],
    ["other", "Not sure where to start"],
  ])(
    "initializes the %s inquiry route from the browser URL",
    async (route, label) => {
      window.history.replaceState(
        null,
        "",
        `/contact?subject=${route}#contact-form`,
      );

      render(<ContactForm />);

      await waitFor(() =>
        expect(screen.getByText(label, { selector: "p" })).toBeVisible(),
      );
      expect(screen.getByRole("button", { name: "Change" })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    },
  );

  it("keeps persistent control boundaries on fields and radio cards", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText("Name *")).toHaveClass(
      "border-control-line",
      "focus-visible:outline-2",
      "focus-visible:outline-offset-2",
      "focus-visible:outline-teal-ink",
    );
    expect(
      screen.getByRole("radio", { name: "Partnership & BD" }).nextElementSibling,
    ).toHaveClass(
      "border-control-line",
      "peer-focus-visible:outline-2",
      "peer-focus-visible:outline-offset-2",
      "peer-focus-visible:outline-teal-ink",
    );
  });

  it("collapses only on confirmation and advances focus to the first field", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(
      screen.getByRole("radio", {
        name: "Media & press",
      }),
    );
    await user.click(screen.getByRole("button", { name: "Continue" }));

    const changeButton = screen.getByRole("button", { name: "Change" });
    expect(changeButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Media & press", { selector: "p" })).toBeVisible();
    expect(document.getElementById("contact-subject-options")).not.toBeVisible();
    await waitFor(() =>
      expect(document.querySelector<HTMLInputElement>('[name="name"]')).toHaveFocus(),
    );
  });

  it("focuses the selected radio when a routed subject is changed", async () => {
    const user = userEvent.setup();
    render(<ContactForm initialSubject="investor" />);

    const changeButton = screen.getByRole("button", { name: "Change" });
    expect(changeButton).toHaveAttribute("aria-expanded", "false");

    await user.click(changeButton);

    expect(screen.getByRole("button", { name: "Continue" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await waitFor(() =>
      expect(
        screen.getByRole("radio", { name: "Investor relations" }),
      ).toHaveFocus(),
    );
  });

  it("updates the route selection when client navigation changes the prop", async () => {
    const { rerender } = render(<ContactForm initialSubject="investor" />);

    expect(
      screen.getByText("Investor relations", { selector: "p" }),
    ).toBeVisible();

    rerender(<ContactForm initialSubject="media" />);

    await waitFor(() =>
      expect(screen.getByText("Media & press", { selector: "p" })).toBeVisible(),
    );
    expect(screen.getByRole("button", { name: "Change" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("syncs same-route contact links and browser history without losing entered details", async () => {
    window.history.replaceState(
      null,
      "",
      "/contact?subject=investor#contact-form",
    );
    const pushState = vi.spyOn(window.history, "pushState");
    let clickWasDefaultPrevented = false;
    const user = userEvent.setup();
    render(
      <>
        <a
          href="/contact?subject=media&intent=asset#contact-form"
          onClick={(event) => {
            clickWasDefaultPrevented = event.defaultPrevented;
          }}
        >
          Route to media assets
        </a>
        <div id="contact-form" tabIndex={-1}>
          <ContactForm
            initialSubject="investor"
            initialIntent={null}
          />
        </div>
      </>,
    );

    const name = screen.getByRole("textbox", { name: "Name" });
    const email = screen.getByRole("textbox", { name: "Email" });
    const message = screen.getByRole("textbox", { name: "Message" });
    const scrollIntoView = vi.fn();
    Object.defineProperty(
      document.getElementById("contact-form"),
      "scrollIntoView",
      {
        configurable: true,
        value: scrollIntoView,
      },
    );
    await user.type(name, "Ada Lovelace");
    await user.type(email, "ada@example.com");
    await user.type(message, "Please send the approved media assets.");
    await user.click(
      screen.getByRole("link", { name: "Route to media assets" }),
    );

    expect(clickWasDefaultPrevented).toBe(true);
    expect(pushState).toHaveBeenCalledWith(
      null,
      "",
      "/contact?subject=media&intent=asset#contact-form",
    );
    expect(window.location.href).toContain(
      "/contact?subject=media&intent=asset#contact-form",
    );
    expect(scrollIntoView).toHaveBeenCalledWith({ block: "start" });
    await waitFor(() =>
      expect(document.getElementById("contact-form")).toHaveFocus(),
    );
    await waitFor(() => {
      expect(
        screen.getByText("Media & press", { selector: "p" }),
      ).toBeVisible();
      expect(screen.getByText("Alternate asset format")).toBeVisible();
    });
    expect(name).toHaveValue("Ada Lovelace");
    expect(email).toHaveValue("ada@example.com");
    expect(message).toHaveValue("Please send the approved media assets.");

    await act(async () => {
      window.history.back();
    });
    await waitFor(() =>
      expect(
        screen.getByText("Investor relations", { selector: "p" }),
      ).toBeVisible(),
    );
    expect(screen.queryByText("Alternate asset format")).not.toBeInTheDocument();
    expect(name).toHaveValue("Ada Lovelace");
    expect(email).toHaveValue("ada@example.com");
    expect(message).toHaveValue("Please send the approved media assets.");
  });

  it("moves focus to the confirmation after a successful request", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          success: true,
          message: "Thank you. Your message was received.",
        }),
      }),
    );
    const user = userEvent.setup();
    render(<ContactForm initialSubject="partnership" />);
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveAttribute("aria-atomic", "true");

    await user.type(screen.getByRole("textbox", { name: "Name" }), "Ada Lovelace");
    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "ada@example.com",
    );
    await user.type(
      screen.getByRole("textbox", { name: "Message" }),
      "I would like to discuss a potential partnership.",
    );
    await user.click(screen.getByRole("button", { name: "Send message" }));

    await waitFor(() => {
      expect(status).toHaveFocus();
      expect(status).toHaveTextContent(
        "Thank you. Your message was received.",
      );
    });
    expect(status).toHaveClass("min-w-0", "[overflow-wrap:anywhere]");
  });

  it("tracks start, validation, and success without forwarding field values", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          success: true,
          message: "Thank you. Your message was received.",
        }),
      }),
    );
    const user = userEvent.setup();
    render(<ContactForm initialSubject="partnership" />);

    const name = screen.getByRole("textbox", { name: "Name" });
    await user.click(name);
    await user.click(screen.getByRole("textbox", { name: "Email" }));
    expect(siteAnalytics.capture).toHaveBeenCalledTimes(1);
    expect(siteAnalytics.capture).toHaveBeenLastCalledWith("contact_form_start");

    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect(siteAnalytics.capture).toHaveBeenCalledWith(
      "contact_form_validation_failure",
    );

    await user.type(name, "Ada Lovelace");
    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "ada@example.com",
    );
    await user.type(
      screen.getByRole("textbox", { name: "Message" }),
      "A private partnership inquiry.",
    );
    await user.click(screen.getByRole("button", { name: "Send message" }));

    await waitFor(() =>
      expect(siteAnalytics.capture).toHaveBeenCalledWith(
        "contact_form_submission_success",
      ),
    );
    expect(JSON.stringify(siteAnalytics.capture.mock.calls)).not.toContain(
      "Ada Lovelace",
    );
    expect(JSON.stringify(siteAnalytics.capture.mock.calls)).not.toContain(
      "ada@example.com",
    );
    expect(JSON.stringify(siteAnalytics.capture.mock.calls)).not.toContain(
      "private partnership",
    );
  });

  it("tracks a submission failure without forwarding server or form content", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
        json: async () => ({
          success: false,
          error: "Private upstream failure detail.",
        }),
      }),
    );
    const user = userEvent.setup();
    render(<ContactForm initialSubject="partnership" />);

    await user.type(
      screen.getByRole("textbox", { name: "Name" }),
      "Ada Lovelace",
    );
    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "ada@example.com",
    );
    await user.type(
      screen.getByRole("textbox", { name: "Message" }),
      "A private partnership inquiry.",
    );
    await user.click(screen.getByRole("button", { name: "Send message" }));

    await waitFor(() =>
      expect(siteAnalytics.capture).toHaveBeenCalledWith(
        "contact_form_submission_failure",
      ),
    );
    expect(JSON.stringify(siteAnalytics.capture.mock.calls)).not.toMatch(
      /Ada Lovelace|ada@example\.com|Private upstream/i,
    );
  });

  it("freezes the submitted inquiry while delivery is pending", async () => {
    let resolveRequest:
      | ((value: {
          ok: boolean;
          status: number;
          json: () => Promise<{ success: boolean; message: string }>;
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
    render(<ContactForm initialSubject="partnership" />);

    await user.type(screen.getByRole("textbox", { name: "Name" }), "Ada Lovelace");
    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "ada@example.com",
    );
    await user.type(
      screen.getByRole("textbox", { name: "Message" }),
      "I would like to discuss a potential partnership.",
    );
    const submit = screen.getByRole("button", { name: "Send message" });
    await user.click(submit);

    const form = screen.getByRole("form", { name: "Contact inquiry" });
    await waitFor(() => expect(form).toHaveAttribute("aria-busy", "true"));
    expect(screen.getByRole("textbox", { name: "Name" })).toBeDisabled();
    expect(screen.getByRole("textbox", { name: "Email" })).toBeDisabled();
    expect(submit).toHaveFocus();
    expect(submit).toHaveTextContent("Sending…");
    expect(submit).toHaveAttribute("aria-disabled", "true");
    expect(submit).toBeEnabled();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Sending your message. Please wait.",
    );

    fireEvent.submit(form);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    resolveRequest?.({
      ok: true,
      status: 200,
      json: async () => ({
        success: true,
        message: "Thank you. Your message was received.",
      }),
    });
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "Thank you. Your message was received.",
      ),
    );
  });

  it("preserves editable fields while Retry-After gates only submission", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-24T12:00:00Z"));
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 429,
        headers: new Headers({ "Retry-After": "2" }),
        json: async () => ({
          success: false,
          error: "Too many requests.",
        }),
      }),
    );
    render(<ContactForm initialSubject="partnership" />);

    fireEvent.change(screen.getByRole("textbox", { name: "Name" }), {
      target: { value: "Ada Lovelace" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Email" }), {
      target: { value: "ada@example.com" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Message" }), {
      target: { value: "A detailed partnership inquiry." },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    });

    expect(screen.getByText("You can try again in 2 seconds.")).toBeVisible();
    expect(screen.getByText(FORM_RATE_LIMIT_MESSAGE)).toBeVisible();
    const retryDescription = document.getElementById("contact-retry-after");
    expect(retryDescription?.tagName).toBe("P");
    expect(retryDescription).toHaveTextContent(
      "You can try again in 2 seconds.",
    );
    expect(
      retryDescription?.querySelector('[role="status"]'),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Submission temporarily paused. You can try again in 2 seconds.",
    );
    expect(screen.getByRole("textbox", { name: "Name" })).toBeEnabled();
    expect(screen.getByRole("textbox", { name: "Email" })).toBeEnabled();
    const submit = screen.getByRole("button", {
      name: "Send temporarily unavailable",
    });
    expect(submit).toBeEnabled();
    expect(submit).toHaveAttribute("aria-disabled", "true");

    fireEvent.change(screen.getByRole("textbox", { name: "Name" }), {
      target: { value: "Ada Byron" },
    });
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveValue(
      "Ada Byron",
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1_000);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1_000);
    });
    expect(screen.getByText("You can try again now.")).toBeVisible();
    expect(screen.getByText(FORM_RATE_LIMIT_MESSAGE)).toBeVisible();
    expect(screen.getByText(FORM_RATE_LIMIT_MESSAGE)).not.toHaveTextContent(
      /try again later/i,
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      "Submission is available again.",
    );
    expect(screen.getByRole("button", { name: "Send message" })).toHaveAttribute(
      "aria-disabled",
      "false",
    );
  });

  it("removes corrected field errors and their links from the summary", async () => {
    const user = userEvent.setup();
    render(<ContactForm initialSubject="partnership" />);

    await user.click(screen.getByRole("button", { name: "Send message" }));

    const summary = screen.getByRole("region", {
      name: "Please check the highlighted fields.",
    });
    expect(summary).toHaveClass("min-w-0", "[overflow-wrap:anywhere]");
    expect(within(summary).getAllByRole("link")).toHaveLength(3);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();

    await user.type(screen.getByRole("textbox", { name: "Name" }), " ");
    expect(
      within(summary).getByRole("link", {
        name: "Please enter your name.",
      }),
    ).toBeVisible();

    await user.type(screen.getByRole("textbox", { name: "Name" }), "Ada Lovelace");
    expect(
      within(summary).queryByRole("link", {
        name: "Please enter your name.",
      }),
    ).not.toBeInTheDocument();
    expect(within(summary).getAllByRole("link")).toHaveLength(2);

    await user.type(screen.getByRole("textbox", { name: "Email" }), "ada");
    expect(
      within(summary).getByRole("link", {
        name: "Please enter your email address.",
      }),
    ).toBeVisible();

    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "@example.com",
    );
    await user.type(screen.getByRole("textbox", { name: "Message" }), "Short");
    expect(
      within(summary).getByRole("link", {
        name: "Please write a message of at least 10 characters.",
      }),
    ).toBeVisible();
    await user.type(
      screen.getByRole("textbox", { name: "Message" }),
      " enough context.",
    );

    expect(
      screen.queryByRole("region", {
        name: "Please check the highlighted fields.",
      }),
    ).not.toBeInTheDocument();
  });
});

describe("ContactPage subject routing", () => {
  it("routes the hero through two named, focusable inquiry regions", async () => {
    render(await ContactPage());

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Connect with EndoCyclic.",
      }),
    ).toBeVisible();
    expect(
      screen.getByText(
        "Choose the route for partnerships, investor relations, media, careers, or general inquiries. Confidential data-room requests use the investor page.",
      ),
    ).toBeVisible();
    expect(
      screen.queryByRole("link", { name: "Choose an inquiry route" }),
    ).not.toBeInTheDocument();

    const routes = screen.getByRole("region", { name: "Inquiry routing" });
    expect(routes).toHaveAttribute("id", "inquiry-routes");
    expect(routes).toHaveAttribute("tabindex", "-1");
    expect(routes).toHaveClass("outline-none");
    expect(routes).not.toHaveClass("scroll-mt-24");

    const routeChoices = within(routes).getByRole("list", {
      name: "Inquiry route choices",
    });
    expect(within(routeChoices).getAllByRole("link")).toHaveLength(7);
    expect(within(routeChoices).queryByText(/^0[1-7]$/)).not.toBeInTheDocument();
    for (const link of within(routeChoices).getAllByRole("link")) {
      expect(link).toHaveAttribute("data-contact-route-link");
      expect(link).toHaveClass("group", "relative", "overflow-hidden");
    }

    const form = screen.getByRole("region", {
      name: "Tell us what you need.",
    });
    expect(form).toHaveAttribute("id", "contact-form");
    expect(form).toHaveAttribute("tabindex", "-1");
    expect(
      within(form).getByRole("group", {
        name: "EndoCyclic Therapeutics",
      }),
    ).toBeVisible();
    expect(within(form).queryByRole("complementary")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("navigation", { name: "Related resources" }),
    ).not.toBeInTheDocument();
  });

  it("passes an approved deep link into the client form's first render", async () => {
    const page = await ContactPage({
      searchParams: Promise.resolve({
        subject: "media",
        intent: "press",
      }),
    });
    render(page);

    const form = screen.getByRole("form", { name: "Contact inquiry" });
    await waitFor(() => {
      expect(
        within(form).getByText("Media & press", { selector: "p" }),
      ).toBeVisible();
      expect(
        within(form).getByRole("button", { name: "Change" }),
      ).toHaveAttribute("aria-expanded", "false");
      expect(within(form).getByText("Press desk support")).toBeVisible();
    });
  });

  it("does not render a blank direct-email route when no inbox is configured", async () => {
    render(await ContactPage());

    expect(document.querySelector('a[href^="mailto:"]')).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /^LinkedIn/ }),
    ).toBeInTheDocument();
  });

  it("allows a maximum-length configured public address to wrap in direct contact surfaces", async () => {
    const originalEmail = SITE.email;
    const longEmail = `${"press.".repeat(39)}desk@example.com`;
    (SITE as unknown as { email: string }).email = longEmail;

    try {
      render(await ContactPage());

      expect(screen.getByRole("link", { name: longEmail })).toHaveClass(
        "min-w-0",
        "[overflow-wrap:anywhere]",
      );
      expect(
        screen.getByText(`${SITE.location} · ${longEmail}`),
      ).toHaveClass("min-w-0", "[overflow-wrap:anywhere]");
    } finally {
      (SITE as unknown as { email: string }).email = originalEmail;
    }
  });
});
