import { describe, expect, it } from "vitest";
import {
  sanitizeClientSentryBreadcrumb,
  sanitizeClientSentryEvent,
  sanitizeClientUrl,
} from "@/lib/client-sentry";

describe("sanitizeClientUrl", () => {
  it("removes query strings and hashes from absolute and relative URLs", () => {
    expect(
      sanitizeClientUrl(
        "https://endocyclic.com/contact?email=private%40example.com#form",
      ),
    ).toBe("https://endocyclic.com/contact");
    expect(
      sanitizeClientUrl("/investors?name=Ada+Lovelace#data-room"),
    ).toBe(`${window.location.origin}/investors`);
  });

  it("removes private URL parts from events and navigation breadcrumbs", () => {
    const event = sanitizeClientSentryEvent({
      request: {
        url: "https://endocyclic.com/contact?email=private%40example.com#form",
        query_string: "email=private%40example.com",
      },
    });
    const breadcrumb = sanitizeClientSentryBreadcrumb({
      data: {
        from: "/contact?email=private%40example.com",
        to: "/investors#data-room",
        url: "https://endocyclic.com/news?source=private",
        untouched: 42,
      },
    });

    expect(event).toEqual({
      request: {
        url: "https://endocyclic.com/contact",
      },
    });
    expect(breadcrumb.data).toEqual({
      from: `${window.location.origin}/contact`,
      to: `${window.location.origin}/investors`,
      url: "https://endocyclic.com/news",
      untouched: 42,
    });
    expect(JSON.stringify({ event, breadcrumb })).not.toContain("private");
  });
});
