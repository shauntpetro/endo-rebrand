import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST as contactPost } from "@/app/api/contact/route";
import { POST as investorPost } from "@/app/api/investor/route";
import { POST as newsletterPost } from "@/app/api/newsletter/route";
import { MAX_FORM_URLENCODED_BODY_BYTES } from "@/lib/server/read-urlencoded-body";

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

type NativeEndpoint = {
  kind: "contact" | "investor" | "newsletter";
  path: string;
  handler: RouteHandler;
  valid: Record<string, string>;
  invalid: Record<string, string>;
  privateValues: string[];
};

const endpoints: NativeEndpoint[] = [
  {
    kind: "contact",
    path: "/api/contact",
    handler: contactPost,
    valid: {
      name: "Ada Lovelace",
      email: "ada.private@example.com",
      company: "Analytical Engines",
      subject: "partnership",
      message: "I would like to discuss a potential partnership.",
      _honeypot: "",
    },
    invalid: {
      name: "Ada Lovelace",
      email: "ada.private@example.com",
      subject: "partnership",
      message: "short",
    },
    privateValues: ["Ada Lovelace", "ada.private@example.com"],
  },
  {
    kind: "investor",
    path: "/api/investor",
    handler: investorPost,
    valid: {
      name: "Grace Hopper",
      email: "grace.private@example.com",
      company: "Compiler Partners",
      role: "Partner",
      message: "Please share the diligence process.",
      _honeypot: "",
    },
    invalid: {
      name: "Grace Hopper",
      email: "grace.private@example.com",
      company: "",
    },
    privateValues: ["Grace Hopper", "grace.private@example.com"],
  },
  {
    kind: "newsletter",
    path: "/api/newsletter",
    handler: newsletterPost,
    valid: {
      email: "reader.private@example.com",
      _honeypot: "",
    },
    invalid: {
      email: "reader.private@example",
    },
    privateValues: ["reader.private@example.com"],
  },
];

let clientSequence = 1;

function nativeRequest(
  path: string,
  body: URLSearchParams | string,
  headers: Record<string, string> = {},
) {
  return new NextRequest(`http://localhost${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "x-real-ip": `198.51.100.${clientSequence++}`,
      ...headers,
    },
    body: body.toString(),
  });
}

function redirectLocation(response: Response) {
  const location = response.headers.get("location");
  expect(location).toBeTruthy();
  return new URL(location!);
}

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
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe.each(endpoints)(
  "$kind native form fallback",
  ({ kind, path, handler, valid, invalid, privateValues }) => {
    it("delivers a valid URL-encoded submission and redirects without PII", async () => {
      const response = await handler(
        nativeRequest(path, new URLSearchParams(valid)),
      );
      const location = redirectLocation(response);

      expect(response.status).toBe(303);
      expect(location.pathname).toBe("/form-response");
      expect(location.searchParams.get("form")).toBe(kind);
      expect(location.searchParams.get("status")).toBe("success");
      expect(response.headers.get("cache-control")).toBe("no-store");
      expect(response.headers.get("referrer-policy")).toBe("no-referrer");
      expect(response.headers.get("x-robots-tag")).toContain("noindex");
      for (const privateValue of privateValues) {
        expect(response.headers.get("location")).not.toContain(
          encodeURIComponent(privateValue),
        );
        expect(response.headers.get("location")).not.toContain(privateValue);
      }
      expect(resendSend).toHaveBeenCalledTimes(1);
    });

    it("redirects invalid details to a fixed status without attempting delivery", async () => {
      const response = await handler(
        nativeRequest(path, new URLSearchParams(invalid)),
      );
      const location = redirectLocation(response);

      expect(response.status).toBe(303);
      expect(location.searchParams.get("form")).toBe(kind);
      expect(location.searchParams.get("status")).toBe("invalid");
      expect(resendSend).not.toHaveBeenCalled();
      for (const privateValue of privateValues) {
        expect(response.headers.get("location")).not.toContain(privateValue);
      }
    });

    it("redirects a declared oversized body before delivery", async () => {
      const response = await handler(
        nativeRequest(path, "", {
          "content-length": String(MAX_FORM_URLENCODED_BODY_BYTES + 1),
        }),
      );
      const location = redirectLocation(response);

      expect(response.status).toBe(303);
      expect(location.searchParams.get("form")).toBe(kind);
      expect(location.searchParams.get("status")).toBe("too-large");
      expect(resendSend).not.toHaveBeenCalled();
    });
  },
);

it("enforces the URL-encoded stream limit when Content-Length is absent", async () => {
  const request = nativeRequest(
    "/api/contact",
    `padding=${"x".repeat(MAX_FORM_URLENCODED_BODY_BYTES)}`,
  );
  expect(request.headers.get("content-length")).toBeNull();

  const response = await contactPost(request);
  const location = redirectLocation(response);

  expect(response.status).toBe(303);
  expect(location.searchParams.get("status")).toBe("too-large");
  expect(resendSend).not.toHaveBeenCalled();
});

it("carries only an approved same-origin newsletter return path", async () => {
  const valid = new URLSearchParams(endpoints[2].valid);
  const approved = await newsletterPost(
    nativeRequest("/api/newsletter", valid, {
      referer: "http://localhost/media?source=footer",
    }),
  );
  const external = await newsletterPost(
    nativeRequest("/api/newsletter", valid, {
      referer: "https://outside.example/media",
    }),
  );

  expect(redirectLocation(approved).searchParams.get("returnTo")).toBe(
    "/media",
  );
  expect(redirectLocation(external).searchParams.has("returnTo")).toBe(false);
});
