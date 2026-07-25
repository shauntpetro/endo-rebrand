export const MAX_FORM_JSON_BODY_BYTES = 32 * 1024;

export class JsonBodyTooLargeError extends Error {
  constructor(maxBytes: number) {
    super(`JSON request body exceeds the ${maxBytes}-byte limit.`);
    this.name = "JsonBodyTooLargeError";
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
    throw new JsonBodyTooLargeError(maxBytes);
  }
}

async function cancelReader(
  reader: ReadableStreamDefaultReader<Uint8Array>,
) {
  try {
    await reader.cancel("JSON request body exceeded the configured limit.");
  } catch {
    // The size error is the actionable response even if stream cancellation fails.
  }
}

export async function readLimitedJson<T>(
  request: Request,
  maxBytes = MAX_FORM_JSON_BODY_BYTES,
): Promise<T> {
  validateDeclaredLength(request.headers.get("content-length"), maxBytes);

  const reader = request.body?.getReader();
  if (!reader) {
    throw new SyntaxError("JSON request body is required.");
  }

  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      if (totalBytes + value.byteLength > maxBytes) {
        await cancelReader(reader);
        throw new JsonBodyTooLargeError(maxBytes);
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
  const parsed: unknown = JSON.parse(text);
  return parsed as T;
}
