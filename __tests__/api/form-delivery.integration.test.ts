import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST as contactPost } from "@/app/api/contact/route";
import { POST as investorPost } from "@/app/api/investor/route";
import { POST as newsletterPost } from "@/app/api/newsletter/route";
import { FORM_RATE_LIMIT_MESSAGE } from "@/lib/contact-config";
import {
  CONTACT_SUCCESS_MESSAGE,
  INVESTOR_SUCCESS_MESSAGE,
} from "@/lib/form-messages";
import { FORM_DELIVERY_TIMEOUT_MS } from "@/lib/server/form-delivery";

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

type RouteHandler = (request: NextRequest) => Promise<Response>;

let clientSequence = 1;

function request(
  path: string,
  body: unknown,
  {
    contentType = "application/json",
    realIp = `203.0.113.${clientSequence++}`,
    forwardedIp = "198.51.100.250",
  }: {
    contentType?: string;
    realIp?: string;
    forwardedIp?: string;
  } = {},
) {
  return new NextRequest(`http://localhost${path}`, {
    method: "POST",
    headers: {
      "content-type": contentType,
      "x-real-ip": realIp,
      "x-forwarded-for": forwardedIp,
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

beforeEach(() => {
  vi.stubEnv("RESEND_API_KEY", "re_test_verified");
  vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "public@approved.example");
  vi.stubEnv("FORM_FROM_EMAIL", "forms@verified.example");
  vi.stubEnv("FORM_TO_EMAIL", "team@approved.example");
  resendConstructor.mockClear();
  resendSend.mockReset();
  resendSend.mockResolvedValue({ data: { id: "email_123" }, error: null });
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("form delivery integration", () => {
  it("uses only configured sender and destination addresses for all endpoints", async () => {
    const contactResponse = await contactPost(
      request("/api/contact", {
        ...validContact,
        name: "<b>Ada\r\nLovelace</b>",
      }),
    );
    const investorResponse = await investorPost(
      request("/api/investor", {
        ...validInvestor,
        name: "Grace\r\nHopper",
        company: "Compiler\r\nPartners",
      }),
    );
    const newsletterResponse = await newsletterPost(
      request("/api/newsletter", { email: "Reader@Example.com" }),
    );

    expect(contactResponse.status).toBe(200);
    expect(investorResponse.status).toBe(200);
    expect(newsletterResponse.status).toBe(200);
    await expect(contactResponse.clone().json()).resolves.toMatchObject({
      message: CONTACT_SUCCESS_MESSAGE,
    });
    await expect(investorResponse.clone().json()).resolves.toMatchObject({
      message: INVESTOR_SUCCESS_MESSAGE,
    });
    expect(resendSend).toHaveBeenCalledTimes(3);

    const deliveries = resendSend.mock.calls.map(([payload]) => payload);
    expect(deliveries.map(({ to }) => to)).toEqual([
      ["team@approved.example"],
      ["team@approved.example"],
      ["team@approved.example"],
    ]);
    expect(deliveries.map(({ from }) => from)).toEqual([
      "EndoCyclic Contact Form <forms@verified.example>",
      "EndoCyclic Investor Relations <forms@verified.example>",
      "EndoCyclic Updates <forms@verified.example>",
    ]);
    expect(deliveries[0].subject).toContain("Ada Lovelace");
    expect(deliveries[1].subject).toContain(
      "Grace Hopper (Compiler Partners)",
    );
    for (const delivery of deliveries) {
      expect(delivery.subject).not.toMatch(/[\r\n]/);
    }

    const deliveryOptions = resendSend.mock.calls.map(([, options]) => options);
    for (const options of deliveryOptions) {
      expect(options.idempotencyKey).toMatch(
        /^form-(contact|investor|newsletter)-[a-f0-9]{64}$/,
      );
      expect(options.signal).toBeInstanceOf(AbortSignal);
    }
  });

  it("uses a stable, privacy-safe idempotency key for logical retries", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-23T12:00:00.000Z"));

    const firstResponse = await contactPost(
      request("/api/contact", validContact),
    );
    vi.setSystemTime(new Date("2026-07-23T12:05:00.000Z"));
    const retryResponse = await contactPost(
      request("/api/contact", validContact),
    );

    expect(firstResponse.status).toBe(200);
    expect(retryResponse.status).toBe(200);
    const firstKey = resendSend.mock.calls[0][1].idempotencyKey;
    const retryKey = resendSend.mock.calls[1][1].idempotencyKey;
    expect(retryKey).toBe(firstKey);
    expect(firstKey).not.toContain(validContact.email);
    expect(firstKey).not.toContain(validContact.name);
  });

  it("aborts a stalled provider request and returns a recoverable failure", async () => {
    vi.useFakeTimers();
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});
    resendSend.mockImplementation(
      (
        _payload: unknown,
        options: { signal: AbortSignal },
      ) =>
        new Promise((resolve) => {
          options.signal.addEventListener(
            "abort",
            () =>
              resolve({
                data: null,
                error: {
                  name: "application_error",
                  message: "Unable to fetch data.",
                },
              }),
            { once: true },
          );
        }),
    );

    const responsePromise = contactPost(
      request("/api/contact", validContact),
    );
    await vi.advanceTimersByTimeAsync(FORM_DELIVERY_TIMEOUT_MS);
    const response = await responsePromise;

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toMatchObject({
      success: false,
      error: expect.stringContaining("couldn’t deliver"),
    });
    expect(errorLog).toHaveBeenCalledWith("[Form delivery failed]", {
      form: "contact",
      errorType: "FormDeliveryTimeoutError",
    });
    expect(JSON.stringify(errorLog.mock.calls)).not.toContain(
      validContact.email,
    );
  });

  it("fails closed when any delivery setting is missing or invalid", async () => {
    vi.stubEnv("FORM_TO_EMAIL", "");

    const missingDestination = await newsletterPost(
      request("/api/newsletter", { email: "reader@example.com" }),
    );

    expect(missingDestination.status).toBe(503);
    await expect(missingDestination.json()).resolves.toMatchObject({
      success: false,
      error:
        "Update requests are temporarily unavailable. You can also email public@approved.example directly.",
    });
    expect(resendSend).not.toHaveBeenCalled();

    vi.stubEnv("FORM_TO_EMAIL", "team@approved.example");
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "not-an-email");

    const invalidPublicInbox = await contactPost(
      request("/api/contact", validContact),
    );
    const invalidPublicPayload = await invalidPublicInbox.json();

    expect(invalidPublicInbox.status).toBe(503);
    expect(invalidPublicPayload.error).toBe(
      "Message delivery is temporarily unavailable.",
    );
    expect(invalidPublicPayload.error).not.toContain("not-an-email");
    expect(resendSend).not.toHaveBeenCalled();
  });

  it("requires an exact JSON media type while allowing charset parameters", async () => {
    const invalidType = await newsletterPost(
      request(
        "/api/newsletter",
        { email: "reader@example.com" },
        { contentType: "application/jsonp" },
      ),
    );
    const validType = await newsletterPost(
      request(
        "/api/newsletter",
        { email: "reader@example.com" },
        { contentType: "application/json; charset=utf-8" },
      ),
    );

    expect(invalidType.status).toBe(415);
    expect(invalidType.headers.get("cache-control")).toBe("no-store");
    expect(validType.status).toBe(200);
    expect(validType.headers.get("cache-control")).toBe("no-store");
  });

  it("shares one X-Real-IP-first limit across all endpoints", async () => {
    const sameRealIp = "192.0.2.77";
    const attempts: Array<[string, RouteHandler]> = [
      ["/api/contact", contactPost],
      ["/api/investor", investorPost],
      ["/api/newsletter", newsletterPost],
      ["/api/contact", contactPost],
      ["/api/investor", investorPost],
      ["/api/newsletter", newsletterPost],
    ];

    const responses: Response[] = [];
    for (const [path, handler] of attempts) {
      responses.push(
        await handler(
          request(
            path,
            {},
            {
              realIp: sameRealIp,
              forwardedIp: `198.51.100.${clientSequence++}`,
            },
          ),
        ),
      );
    }

    expect(responses.slice(0, 5).map(({ status }) => status)).toEqual([
      400, 400, 400, 400, 400,
    ]);
    expect(responses[5].status).toBe(429);
    expect(responses[5].headers.get("cache-control")).toBe("no-store");
    await expect(responses[5].clone().json()).resolves.toMatchObject({
      error: FORM_RATE_LIMIT_MESSAGE,
    });
    expect(Number(responses[5].headers.get("retry-after"))).toBeGreaterThan(0);
    expect(Number(responses[5].headers.get("retry-after"))).toBeLessThanOrEqual(
      60,
    );
  });

  it("validates the optional contact company field by type and length", async () => {
    const wrongType = await contactPost(
      request("/api/contact", {
        ...validContact,
        company: { name: "Not text" },
      }),
    );
    const tooLong = await contactPost(
      request("/api/contact", {
        ...validContact,
        company: "x".repeat(201),
      }),
    );

    expect(wrongType.status).toBe(400);
    await expect(wrongType.json()).resolves.toMatchObject({
      error: expect.stringContaining("Company must be text."),
    });
    expect(tooLong.status).toBe(400);
    await expect(tooLong.json()).resolves.toMatchObject({
      error: expect.stringContaining("Company must be under 200 characters."),
    });
  });

  it("does not write provider payloads or user PII to logs", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    resendSend.mockRejectedValueOnce(
      new Error("Delivery failed for private.person@example.com"),
    );

    const response = await contactPost(
      request("/api/contact", {
        ...validContact,
        email: "private.person@example.com",
      }),
    );

    expect(response.status).toBe(502);
    expect(consoleError).toHaveBeenCalledWith("[Form delivery failed]", {
      form: "contact",
      errorType: "Error",
    });
    expect(JSON.stringify(consoleError.mock.calls)).not.toContain(
      "private.person@example.com",
    );
  });
});
