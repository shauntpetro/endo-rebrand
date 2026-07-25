import { NextResponse } from "next/server";

export const FORM_RESPONSE_CACHE_CONTROL = "no-store";
export const NATIVE_FORM_RESPONSE_PATH = "/form-response";

const NATIVE_RETURN_PATHS = new Set([
  "/",
  "/innovation",
  "/pipeline",
  "/imaging",
  "/impact",
  "/team",
  "/news",
  "/contact",
  "/investors",
  "/media",
]);

export type FormRequestMode = "json" | "native";
export type NativeFormKind = "contact" | "investor" | "newsletter";
export type NativeFormStatus =
  | "success"
  | "invalid"
  | "too-large"
  | "rate-limited"
  | "unavailable";

function normalizedContentType(request: Request): string | null {
  const contentType = request.headers.get("content-type");
  if (!contentType) return null;

  return contentType.split(";", 1)[0]?.trim().toLowerCase() ?? null;
}

export function isJsonContentType(request: Request): boolean {
  return normalizedContentType(request) === "application/json";
}

export function isUrlEncodedContentType(request: Request): boolean {
  return normalizedContentType(request) === "application/x-www-form-urlencoded";
}

export function getFormRequestMode(request: Request): FormRequestMode | null {
  if (isJsonContentType(request)) return "json";
  if (isUrlEncodedContentType(request)) return "native";
  return null;
}

export function jsonNoStore<T>(
  body: T,
  init: ResponseInit = {},
): NextResponse<T> {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", FORM_RESPONSE_CACHE_CONTROL);

  return NextResponse.json(body, {
    ...init,
    headers,
  });
}

export function normalizeNativeReturnPath(
  value: unknown,
  baseUrl = "https://endocyclic.invalid",
): string | null {
  if (typeof value !== "string" || value.length === 0) return null;

  try {
    const base = new URL(baseUrl);
    const candidate = new URL(value, base);

    if (candidate.origin !== base.origin) return null;

    return NATIVE_RETURN_PATHS.has(candidate.pathname)
      ? candidate.pathname
      : null;
  } catch {
    return null;
  }
}

export function nativeFormRedirect(
  request: Request,
  kind: NativeFormKind,
  status: NativeFormStatus,
  headersInit?: HeadersInit,
): NextResponse {
  const destination = new URL(NATIVE_FORM_RESPONSE_PATH, request.url);
  destination.searchParams.set("form", kind);
  destination.searchParams.set("status", status);
  if (kind === "newsletter") {
    const returnPath = normalizeNativeReturnPath(
      request.headers.get("referer"),
      request.url,
    );

    if (returnPath) destination.searchParams.set("returnTo", returnPath);
  }

  const headers = new Headers(headersInit);
  headers.set("Cache-Control", FORM_RESPONSE_CACHE_CONTROL);
  headers.set("Referrer-Policy", "no-referrer");
  headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");

  return NextResponse.redirect(destination, {
    status: 303,
    headers,
  });
}

export function formResponse<T>(
  request: Request,
  mode: FormRequestMode,
  kind: NativeFormKind,
  nativeStatus: NativeFormStatus,
  body: T,
  init: ResponseInit = {},
): NextResponse<T> | NextResponse {
  if (mode === "native") {
    return nativeFormRedirect(request, kind, nativeStatus, init.headers);
  }

  return jsonNoStore(body, init);
}

export function sanitizeFormText(value: string): string {
  return value
    .trim()
    .replace(
      /<!--[\s\S]*?-->|<![A-Za-z][^>]*>|<\?[^>]*\?>|<\/?[A-Za-z][A-Za-z0-9:-]*(?:\s[^<>]*?)?\/?>/g,
      "",
    );
}

/**
 * Keep user-provided values on one line before interpolating them into an
 * email subject or any other header context.
 */
export function sanitizeHeaderText(value: string): string {
  return sanitizeFormText(value)
    .replace(/[\r\n]+/g, " ")
    .replace(/[ \t]+/g, " ")
    .trim();
}
