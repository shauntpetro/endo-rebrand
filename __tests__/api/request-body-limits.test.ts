import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { POST as contactPost } from "@/app/api/contact/route";
import { POST as investorPost } from "@/app/api/investor/route";
import { POST as newsletterPost } from "@/app/api/newsletter/route";
import { MAX_FORM_JSON_BODY_BYTES } from "@/lib/server/read-json-body";

type RouteHandler = (request: NextRequest) => Promise<Response>;

const endpoints: Array<{
  name: string;
  path: string;
  handler: RouteHandler;
}> = [
  { name: "contact", path: "/api/contact", handler: contactPost },
  { name: "newsletter", path: "/api/newsletter", handler: newsletterPost },
  { name: "investor", path: "/api/investor", handler: investorPost },
];

let requestSequence = 1;

function createRequest(
  path: string,
  body: string,
  headers: Record<string, string> = {},
) {
  return new NextRequest(`http://localhost${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-real-ip": `198.51.100.${requestSequence++}`,
      ...headers,
    },
    body,
  });
}

describe.each(endpoints)("$name request body boundary", ({ path, handler }) => {
  it("returns 400 for malformed JSON", async () => {
    const response = await handler(createRequest(path, '{"email":'));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      success: false,
      error: "Invalid request. Please try again.",
    });
  });

  it("returns 400 for an invalid Content-Length header", async () => {
    const response = await handler(
      createRequest(path, "{}", { "content-length": "invalid" }),
    );

    expect(response.status).toBe(400);
  });

  it("returns 413 before reading a declared oversized body", async () => {
    const response = await handler(
      createRequest(path, "{}", {
        "content-length": String(MAX_FORM_JSON_BODY_BYTES + 1),
      }),
    );

    expect(response.status).toBe(413);
    await expect(response.json()).resolves.toMatchObject({
      success: false,
      error: "Request body is too large.",
    });
  });

  it("returns 413 for an oversized body without Content-Length", async () => {
    const request = createRequest(
      path,
      JSON.stringify({ padding: "x".repeat(MAX_FORM_JSON_BODY_BYTES) }),
    );
    expect(request.headers.get("content-length")).toBeNull();

    const response = await handler(request);

    expect(response.status).toBe(413);
  });
});
