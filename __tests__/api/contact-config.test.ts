import { describe, expect, it } from "vitest";
import {
  normalizeContactEmail,
  withPublicContactRecovery,
} from "@/lib/contact-config";

describe("public contact configuration", () => {
  it("accepts plain mailbox addresses and rejects header-shaped values", () => {
    expect(normalizeContactEmail(" team@approved.example ")).toBe(
      "team@approved.example",
    );
    expect(
      normalizeContactEmail("EndoCyclic <team@approved.example>"),
    ).toBeNull();
    expect(
      normalizeContactEmail("team@approved.example\r\nBcc: other@example.com"),
    ).toBeNull();
    expect(normalizeContactEmail("team<@approved.example")).toBeNull();
    expect(normalizeContactEmail("team@approved.example>")).toBeNull();
    expect(normalizeContactEmail(".team@approved.example")).toBeNull();
    expect(normalizeContactEmail("not-an-email")).toBeNull();
  });

  it("adds only a validated recovery inbox and otherwise omits email copy", () => {
    expect(
      withPublicContactRecovery(
        "Please try again.",
        "team@approved.example",
      ),
    ).toBe(
      "Please try again. You can also email team@approved.example directly.",
    );
    expect(withPublicContactRecovery("Please try again.", "")).toBe(
      "Please try again.",
    );
    expect(
      withPublicContactRecovery("Please try again.", "unapproved-domain"),
    ).toBe("Please try again.");
  });
});
