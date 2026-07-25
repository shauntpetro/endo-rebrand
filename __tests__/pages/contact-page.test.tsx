import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ContactPage from "@/app/contact/ContactPageContent";

type SearchParams = Record<string, string | string[] | undefined>;

async function renderContactPage(searchParams: SearchParams = {}) {
  const html = renderToStaticMarkup(
    await ContactPage({ searchParams: Promise.resolve(searchParams) }),
  );
  return new DOMParser().parseFromString(html, "text/html");
}

function selectedSubject(document: Document) {
  return document.querySelector<HTMLInputElement>(
    'input[name="subject"]:checked',
  )?.value;
}

function selectedSubjectLabel(document: Document) {
  return Array.from(document.querySelectorAll("#contact-form p")).find(
    (paragraph) => paragraph.classList.contains("font-medium"),
  )?.textContent;
}

describe("ContactPage query routing", () => {
  it.each([
    ["partnership", "partnership", "Partnership & BD"],
    ["investor", "investor", "Investor relations"],
    ["media", "media", "Media & press"],
  ])(
    "server-renders intent=%s as the %s inquiry route",
    async (intent, subject, label) => {
      const document = await renderContactPage({ intent });

      expect(selectedSubject(document)).toBe(subject);
      expect(selectedSubjectLabel(document)).toBe(label);
      expect(
        document.getElementById("contact-subject-options")?.hasAttribute(
          "hidden",
        ),
      ).toBe(true);
    },
  );

  it.each([
    ["partnership", "Partnership & BD"],
    ["investor", "Investor relations"],
    ["media", "Media & press"],
    ["career", "Careers"],
    ["general", "General inquiry"],
    ["other", "Not sure where to start"],
  ])(
    "server-renders the approved subject=%s route",
    async (subject, label) => {
      const document = await renderContactPage({ subject });

      expect(selectedSubject(document)).toBe(subject);
      expect(selectedSubjectLabel(document)).toBe(label);
    },
  );

  it("server-renders approved media guidance with the media route", async () => {
    const document = await renderContactPage({
      subject: "media",
      intent: "press",
    });

    expect(selectedSubject(document)).toBe("media");
    expect(document.body.textContent).toContain("Press desk support");
    expect(document.body.textContent).toContain(
      "Include your outlet, deadline, and the context you need confirmed.",
    );
  });

  it.each([
    { subject: "unknown" },
    { intent: "unknown" },
    { subject: ["unknown", "media"] },
  ])("safely defaults malformed query values to General", async (query) => {
    const document = await renderContactPage(query);

    expect(selectedSubject(document)).toBe("general");
    expect(selectedSubjectLabel(document)).toBe("General inquiry");
    expect(
      document.getElementById("contact-subject-options")?.hasAttribute(
        "hidden",
      ),
    ).toBe(false);
  });
});
