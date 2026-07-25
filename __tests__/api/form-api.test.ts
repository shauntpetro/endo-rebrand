import { describe, expect, it } from "vitest";
import {
  nativeFormRedirect,
  normalizeNativeReturnPath,
  sanitizeFormText,
  sanitizeHeaderText,
} from "@/lib/server/form-api";

describe("form text sanitization", () => {
  it("removes plausible HTML tags without corrupting scientific comparisons", () => {
    expect(
      sanitizeFormText(
        "<b>Assay note:</b> the threshold is <6.5 and >6.0 <script>alert(1)</script>",
      ),
    ).toBe("Assay note: the threshold is <6.5 and >6.0 alert(1)");
  });

  it("keeps header values on one line after removing markup", () => {
    expect(
      sanitizeHeaderText("<strong>Ada</strong>\r\nLovelace"),
    ).toBe("Ada Lovelace");
  });

  it("normalizes only approved same-origin public return paths", () => {
    expect(normalizeNativeReturnPath("/pipeline")).toBe("/pipeline");
    expect(normalizeNativeReturnPath("/media?source=footer")).toBe("/media");
    expect(
      normalizeNativeReturnPath(
        "https://endocyclic.example/news",
        "https://endocyclic.example/api/newsletter",
      ),
    ).toBe("/news");
    expect(
      normalizeNativeReturnPath(
        "https://outside.example/news",
        "https://endocyclic.example/api/newsletter",
      ),
    ).toBeNull();
    expect(normalizeNativeReturnPath("/api/newsletter")).toBeNull();
    expect(normalizeNativeReturnPath("/form-response")).toBeNull();
  });

  it("carries an approved newsletter referrer without leaking it to other forms", () => {
    const request = new Request(
      "https://endocyclic.example/api/newsletter",
      {
        headers: { referer: "https://endocyclic.example/media?campaign=x" },
      },
    );
    const newsletter = nativeFormRedirect(
      request,
      "newsletter",
      "unavailable",
    );
    const contact = nativeFormRedirect(request, "contact", "unavailable");

    expect(
      new URL(newsletter.headers.get("location") ?? "").searchParams.get(
        "returnTo",
      ),
    ).toBe("/media");
    expect(
      new URL(contact.headers.get("location") ?? "").searchParams.has(
        "returnTo",
      ),
    ).toBe(false);
  });
});
