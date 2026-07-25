import { render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import ContactPage from "@/app/contact/page";
import InvestorsPage from "@/app/investors/page";
import Footer from "@/components/site/Footer";
import { isFormDeliveryConfigured } from "@/lib/server/form-delivery";
import { SITE } from "@/lib/site";

function setDeliveryEnvironment(configured: boolean) {
  vi.stubEnv("RESEND_API_KEY", configured ? "re_test_verified" : "");
  vi.stubEnv(
    "NEXT_PUBLIC_CONTACT_EMAIL",
    configured ? "public@approved.example" : "",
  );
  vi.stubEnv(
    "FORM_FROM_EMAIL",
    configured ? "forms@verified.example" : "",
  );
  vi.stubEnv(
    "FORM_TO_EMAIL",
    configured ? "team@approved.example" : "",
  );
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("server-derived form delivery availability", () => {
  it("renders no actionable contact or investor form when delivery is unconfigured", async () => {
    setDeliveryEnvironment(false);

    expect(isFormDeliveryConfigured()).toBe(false);

    const contactHtml = renderToStaticMarkup(await ContactPage());
    const investorHtml = renderToStaticMarkup(<InvestorsPage />);

    expect(contactHtml).toContain(
      "The online inquiry form is temporarily unavailable.",
    );
    expect(contactHtml).not.toContain('action="/api/contact"');
    expect(contactHtml).not.toContain('name="email"');
    expect(investorHtml).toContain(
      "Online data-room requests are temporarily unavailable.",
    );
    expect(investorHtml).not.toContain('action="/api/investor"');
    expect(investorHtml).not.toContain('name="company"');
    expect(`${contactHtml}${investorHtml}`).not.toMatch(
      /RESEND_API_KEY|FORM_FROM_EMAIL|FORM_TO_EMAIL/,
    );
  });

  it("preserves all three form actions when delivery is configured", async () => {
    setDeliveryEnvironment(true);

    expect(isFormDeliveryConfigured()).toBe(true);

    const contactHtml = renderToStaticMarkup(await ContactPage());
    const investorHtml = renderToStaticMarkup(<InvestorsPage />);
    const footerHtml = renderToStaticMarkup(
      <Footer deliveryAvailable={isFormDeliveryConfigured()} />,
    );

    expect(contactHtml).toContain('action="/api/contact"');
    expect(investorHtml).toContain('action="/api/investor"');
    expect(footerHtml).toContain('action="/api/newsletter"');
  });

  it("renders the footer fallback without an email input or unapproved mailbox", () => {
    setDeliveryEnvironment(false);
    render(<Footer deliveryAvailable={isFormDeliveryConfigured()} />);

    expect(
      screen.getByRole("heading", {
        name: "Online update requests are temporarily unavailable.",
      }),
    ).toBeVisible();
    expect(
      screen.getAllByRole("link", { name: /LinkedIn/i }).at(-1),
    ).toHaveAttribute("href", SITE.linkedin);
    expect(
      screen.queryByRole("textbox", { name: "Email address" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Email EndoCyclic/i }),
    ).not.toBeInTheDocument();
  });
});
