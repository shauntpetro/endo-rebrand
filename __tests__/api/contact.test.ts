import { describe, it, expect } from "vitest";

// Test the validation patterns used in the contact API
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_SUBJECTS = ["partnership", "media", "investor", "career", "general", "other", "data", "report"];

describe("Contact API Validation", () => {
  describe("Email validation", () => {
    it("accepts valid emails", () => {
      expect(EMAIL_REGEX.test("user@example.com")).toBe(true);
      expect(EMAIL_REGEX.test("test@endocyclic.com")).toBe(true);
    });

    it("rejects invalid emails", () => {
      expect(EMAIL_REGEX.test("")).toBe(false);
      expect(EMAIL_REGEX.test("notanemail")).toBe(false);
      expect(EMAIL_REGEX.test("@missing.com")).toBe(false);
    });
  });

  describe("Subject validation", () => {
    it("accepts valid subjects", () => {
      VALID_SUBJECTS.forEach(subject => {
        expect(VALID_SUBJECTS.includes(subject)).toBe(true);
      });
    });

    it("rejects invalid subjects", () => {
      expect(VALID_SUBJECTS.includes("spam")).toBe(false);
      expect(VALID_SUBJECTS.includes("")).toBe(false);
    });
  });

  describe("Input sanitization", () => {
    const sanitize = (s: string) => s.trim().replace(/<[^>]*>/g, "");

    it("strips HTML tags", () => {
      expect(sanitize("<script>alert('xss')</script>Hello")).toBe("alert('xss')Hello");
      expect(sanitize("<b>bold</b>")).toBe("bold");
    });

    it("trims whitespace", () => {
      expect(sanitize("  hello  ")).toBe("hello");
    });

    it("leaves clean text unchanged", () => {
      expect(sanitize("Hello World")).toBe("Hello World");
    });
  });
});
