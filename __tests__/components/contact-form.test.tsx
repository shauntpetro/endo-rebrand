import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ContactForm from "@/app/contact/ContactForm";
import { parseContactSubject } from "@/app/contact/contact-subject";

describe("contact subject parsing", () => {
  it("accepts approved routes and rejects unknown query values", () => {
    expect(parseContactSubject("partnership")).toBe("partnership");
    expect(parseContactSubject(["media", "general"])).toBe("media");
    expect(parseContactSubject("unknown")).toBeNull();
    expect(parseContactSubject(undefined)).toBeNull();
  });
});

describe("ContactForm subject chooser", () => {
  it("includes the inquiry fields in server-rendered markup", () => {
    const html = renderToStaticMarkup(
      <ContactForm initialSubject="partnership" />,
    );

    expect(html).toContain('name="name"');
    expect(html).toContain('name="email"');
    expect(html).toContain('name="message"');
    expect(html).toContain("Partnership &amp; BD");
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
});
