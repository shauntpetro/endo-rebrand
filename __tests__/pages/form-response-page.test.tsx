import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FormResponsePage from "@/app/form-response/page";
import { metadata } from "@/app/form-response/layout";

async function renderResponse(
  form: string | string[] | undefined,
  status: string | string[] | undefined,
  returnTo?: string | string[],
) {
  render(
    await FormResponsePage({
      searchParams: Promise.resolve({ form, status, returnTo }),
    }),
  );
}

describe("FormResponsePage", () => {
  it("is explicitly excluded from indexing", () => {
    expect(metadata.robots).toMatchObject({
      index: false,
      follow: false,
      nocache: true,
    });
    expect(metadata.referrer).toBe("no-referrer");
  });

  it.each([
    ["contact", "Your message was received.", "/"],
    [
      "investor",
      "Your data-room access request was received.",
      "/pipeline",
    ],
    ["newsletter", "Your request for company updates was received.", "/news"],
  ])(
    "renders a branded %s success state",
    async (form, message, destination) => {
      await renderResponse(form, "success");

      expect(
        screen.getByRole("heading", { level: 1, name: "Thank you." }),
      ).toBeInTheDocument();
      expect(screen.getByText(new RegExp(message))).toBeInTheDocument();
      expect(screen.getAllByRole("link")[0]).toHaveAttribute(
        "href",
        destination,
      );
      expect(document.querySelector("main#main-content")).toHaveAttribute(
        "tabindex",
        "-1",
      );
      expect(document.querySelector("section")).toHaveClass(
        "!pt-28",
        "sm:!pt-32",
      );
      expect(
        screen.queryByRole("link", { name: "Go back to your draft" }),
      ).toBeNull();
    },
  );

  it.each([
    ["invalid", "We couldn’t process those details."],
    ["too-large", "Please shorten your response."],
    ["rate-limited", "Too many requests were received."],
    ["unavailable", "We couldn’t complete your request."],
  ])("renders an accessible %s recovery state", async (status, title) => {
    await renderResponse("contact", status);

    expect(
      screen.getByRole("heading", { level: 1, name: title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Return to contact/i }),
    ).toHaveAttribute("href", "/contact#contact-form");
    expect(
      screen.queryByRole("link", { name: "Go back to your draft" }),
    ).toBeNull();
  });

  it("offers browser-history recovery only with credible same-origin provenance", async () => {
    window.history.pushState({}, "", "/contact#contact-form");
    window.history.pushState(
      {},
      "",
      "/form-response?form=contact&status=unavailable",
    );
    vi.spyOn(document, "referrer", "get").mockReturnValue(
      `${window.location.origin}/contact#contact-form`,
    );
    const back = vi
      .spyOn(window.history, "back")
      .mockImplementation(() => undefined);

    await renderResponse("contact", "unavailable");
    fireEvent.click(
      screen.getByRole("link", { name: "Go back to your draft" }),
    );

    expect(back).toHaveBeenCalledTimes(1);
    back.mockRestore();
  });

  it("returns a failed newsletter request to its validated originating page", async () => {
    window.history.pushState({}, "", "/pipeline");
    window.history.pushState(
      {},
      "",
      "/form-response?form=newsletter&status=unavailable&returnTo=%2Fpipeline",
    );
    vi.spyOn(document, "referrer", "get").mockReturnValue(
      `${window.location.origin}/pipeline`,
    );
    const back = vi
      .spyOn(window.history, "back")
      .mockImplementation(() => undefined);

    await renderResponse("newsletter", "unavailable", "/pipeline");

    expect(
      screen.getByRole("link", { name: "Return to previous page" }),
    ).toHaveAttribute("href", "/pipeline");
    fireEvent.click(
      screen.getByRole("link", { name: "Go back to your draft" }),
    );
    expect(back).toHaveBeenCalledTimes(1);
    back.mockRestore();
  });

  it("fails closed for unknown query values without reflecting them", async () => {
    await renderResponse(
      "<script>private value</script>",
      "private-status",
      "https://outside.example/private",
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "We couldn’t process those details.",
      }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/private value/i)).toBeNull();
    expect(screen.queryByText(/private-status/i)).toBeNull();
    expect(screen.queryByText(/outside\.example/i)).toBeNull();
  });
});
