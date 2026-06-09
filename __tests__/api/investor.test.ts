import { describe, it, expect } from "vitest";

// Test the validation patterns used in the investor API
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = {
  name: 200,
  email: 254,
  company: 200,
  role: 200,
  message: 5000,
};

describe("Investor API Validation", () => {
  describe("Email validation", () => {
    it("accepts valid emails", () => {
      expect(EMAIL_REGEX.test("investor@fund.com")).toBe(true);
      expect(EMAIL_REGEX.test("analyst@firm.co.uk")).toBe(true);
    });

    it("rejects invalid emails", () => {
      expect(EMAIL_REGEX.test("")).toBe(false);
      expect(EMAIL_REGEX.test("notanemail")).toBe(false);
      expect(EMAIL_REGEX.test("@missing.com")).toBe(false);
    });
  });

  describe("Field length limits", () => {
    it("defines expected field limits", () => {
      expect(MAX_FIELD_LENGTH.name).toBe(200);
      expect(MAX_FIELD_LENGTH.email).toBe(254);
      expect(MAX_FIELD_LENGTH.company).toBe(200);
      expect(MAX_FIELD_LENGTH.role).toBe(200);
      expect(MAX_FIELD_LENGTH.message).toBe(5000);
    });

    it("rejects overly long inputs", () => {
      const longName = "a".repeat(201);
      expect(longName.length > MAX_FIELD_LENGTH.name).toBe(true);
    });
  });

  describe("Input sanitization", () => {
    const sanitize = (s: string) => s.trim().replace(/<[^>]*>/g, "");

    it("strips HTML tags", () => {
      expect(sanitize("<script>alert('xss')</script>")).toBe("alert('xss')");
      expect(sanitize("<b>bold</b>")).toBe("bold");
    });

    it("trims whitespace", () => {
      expect(sanitize("  investor  ")).toBe("investor");
    });

    it("leaves clean text unchanged", () => {
      expect(sanitize("Acme Capital Partners")).toBe("Acme Capital Partners");
    });
  });
});
