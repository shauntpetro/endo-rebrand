import { MAX_FORM_JSON_BODY_BYTES } from "./read-json-body";

export const MAX_FORM_URLENCODED_BODY_BYTES = MAX_FORM_JSON_BODY_BYTES;
const MAX_FORM_URLENCODED_FIELDS = 64;

export class UrlEncodedBodyTooLargeError extends Error {
  constructor(maxBytes: number) {
    super(`URL-encoded request body exceeds the ${maxBytes}-byte limit.`);
    this.name = "UrlEncodedBodyTooLargeError";
  }
}

function validateDeclaredLength(
  contentLength: string | null,
  maxBytes: number,
) {
  if (contentLength === null) return;

  const normalizedLength = contentLength.trim();
  if (!/^\d+$/.test(normalizedLength)) {
    throw new SyntaxError("Invalid Content-Length header.");
  }

  const declaredLength = Number(normalizedLength);
  if (!Number.isSafeInteger(declaredLength) || declaredLength > maxBytes) {
    throw new UrlEncodedBodyTooLargeError(maxBytes);
  }
}

async function cancelReader(
  reader: ReadableStreamDefaultReader<Uint8Array>,
) {
  try {
    await reader.cancel(
      "URL-encoded request body exceeded the configured limit.",
    );
  } catch {
    // The size error remains actionable if stream cancellation also fails.
  }
}

export async function readLimitedUrlEncoded<T>(
  request: Request,
  maxBytes = MAX_FORM_URLENCODED_BODY_BYTES,
): Promise<T> {
  validateDeclaredLength(request.headers.get("content-length"), maxBytes);

  const reader = request.body?.getReader();
  if (!reader) {
    throw new SyntaxError("URL-encoded request body is required.");
  }

  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      if (totalBytes + value.byteLength > maxBytes) {
        await cancelReader(reader);
        throw new UrlEncodedBodyTooLargeError(maxBytes);
      }

      chunks.push(value);
      totalBytes += value.byteLength;
    }
  } finally {
    reader.releaseLock();
  }

  const payload = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    payload.set(chunk, offset);
    offset += chunk.byteLength;
  }

  const text = new TextDecoder("utf-8", { fatal: true }).decode(payload);
  const params = new URLSearchParams(text);
  const result: Record<string, string> = Object.create(null);
  let fieldCount = 0;

  for (const [key, value] of params) {
    fieldCount += 1;
    if (fieldCount > MAX_FORM_URLENCODED_FIELDS) {
      throw new SyntaxError("Too many form fields.");
    }
    if (Object.hasOwn(result, key)) {
      throw new SyntaxError("Duplicate form field.");
    }
    result[key] = value;
  }

  return result as T;
}
