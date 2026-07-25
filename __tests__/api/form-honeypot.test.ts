import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST as contactPost } from "@/app/api/contact/route";
import { POST as investorPost } from "@/app/api/investor/route";
import { POST as newsletterPost } from "@/app/api/newsletter/route";
import {
  CONTACT_SUCCESS_MESSAGE,
  INVESTOR_SUCCESS_MESSAGE,
} from "@/lib/form-messages";

const { resendConstructor, resendSend } = vi.hoisted(() => {
  const send = vi.fn();
  const constructor = vi.fn(function MockResend() {
    return { emails: { send } };
  });
  return { resendConstructor: constructor, resendSend: send };
});

vi.mock("resend", () => ({
  Resend: resendConstructor,
}));

let clientSequence = 1;

function request(path: string, body: unknown) {
  return new NextRequest(`http://localhost${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-real-ip": `203.0.113.${clientSequence++}`,
    },
    body: JSON.stringify(body),
  });
}

const validContact = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  subject: "partnership",
  message: "I would like to discuss a potential partnership.",
};

const validInvestor = {
  name: "Grace Hopper",
  email: "grace@example.com",
  company: "Compiler Partners",
  role: "Partner",
  message: "Please share the diligence process.",
};

const validNewsletter = { email: "reader@example.com" };

beforeEach(() => {
  // Delivery is fully configured, so a filled honeypot is the only reason
  // these requests could avoid reaching the provider.
  vi.stubEnv("RESEND_API_KEY", "re_test_verified");
  vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "public@approved.example");
  vi.stubEnv("FORM_FROM_EMAIL", "forms@verified.example");
  vi.stubEnv("FORM_TO_EMAIL", "team@approved.example");
  resendConstructor.mockClear();
  resendSend.mockReset();
  resendSend.mockResolvedValue({ data: { id: "email_123" }, error: null });
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("form honeypot", () => {
  it("drops contact submissions with a filled honeypot without delivering", async () => {
    const response = await contactPost(
      request("/api/contact", {
        ...validContact,
        _honeypot: "http://spam.example",
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      message: CONTACT_SUCCESS_MESSAGE,
    });
    expect(resendSend).not.toHaveBeenCalled();
  });

  it("drops investor submissions with a filled honeypot without delivering", async () => {
    const response = await investorPost(
      request("/api/investor", {
        ...validInvestor,
        _honeypot: "http://spam.example",
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      message: INVESTOR_SUCCESS_MESSAGE,
    });
    expect(resendSend).not.toHaveBeenCalled();
  });

  it("drops update-request submissions with a filled honeypot without delivering", async () => {
    const response = await newsletterPost(
      request("/api/newsletter", {
        ...validNewsletter,
        _honeypot: "http://spam.example",
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
    expect(resendSend).not.toHaveBeenCalled();
  });

  it("returns the decoy success before validation so bots cannot probe the rules", async () => {
    // Every payload below is independently invalid. A validation error would
    // tell a bot which field to fix; the honeypot guard must answer first.
    const responses = await Promise.all([
      contactPost(
        request("/api/contact", {
          name: "",
          email: "not-an-email",
          subject: "not-a-valid-subject",
          message: "x",
          _honeypot: "filled",
        }),
      ),
      investorPost(
        request("/api/investor", {
          name: "",
          email: "not-an-email",
          _honeypot: "filled",
        }),
      ),
      newsletterPost(
        request("/api/newsletter", {
          email: "not-an-email",
          _honeypot: "filled",
        }),
      ),
    ]);

    for (const response of responses) {
      expect(response.status).toBe(200);
      await expect(response.clone().json()).resolves.toMatchObject({
        success: true,
      });
    }
    expect(resendSend).not.toHaveBeenCalled();
  });

  it("delivers identically shaped responses whether or not the honeypot is filled", async () => {
    // A distinguishable response would let a bot detect the trap.
    const trapped = await contactPost(
      request("/api/contact", { ...validContact, _honeypot: "filled" }),
    );
    const genuine = await contactPost(request("/api/contact", validContact));

    expect(trapped.status).toBe(genuine.status);
    await expect(trapped.json()).resolves.toEqual(await genuine.json());
    expect(resendSend).toHaveBeenCalledTimes(1);
  });

  it("still delivers when the honeypot is present but empty", async () => {
    const response = await contactPost(
      request("/api/contact", { ...validContact, _honeypot: "" }),
    );

    expect(response.status).toBe(200);
    expect(resendSend).toHaveBeenCalledTimes(1);
  });
});
