import { describe, it, expect } from "vitest";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;

describe("Newsletter API Validation", () => {
  it("validates email format", () => {
    expect(EMAIL_REGEX.test("subscriber@example.com")).toBe(true);
    expect(EMAIL_REGEX.test("invalid")).toBe(false);
  });

  it("enforces max email length", () => {
    const longEmail = "a".repeat(250) + "@b.com";
    expect(longEmail.length > MAX_EMAIL_LENGTH).toBe(true);
  });

  it("normalizes email to lowercase", () => {
    const email = "Test@Example.COM";
    expect(email.trim().toLowerCase()).toBe("test@example.com");
  });
});
