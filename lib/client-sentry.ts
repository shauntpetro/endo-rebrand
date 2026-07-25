export type ClientSentryFacade = {
  captureException: (exception: unknown) => string;
  captureRouterTransitionStart: (
    href: string,
    navigationType: string,
  ) => void;
};

export type ClientSentryEvent = {
  request?: {
    url?: string;
    query_string?: unknown;
  };
};

export type ClientSentryBreadcrumb = {
  data?: Record<string, unknown>;
};

let clientPromise: Promise<ClientSentryFacade | null> | null = null;

export function sanitizeClientUrl(value: string): string {
  try {
    const url = new URL(
      value,
      typeof window === "undefined" ? "https://endocyclic.com" : window.location.origin,
    );
    return `${url.origin}${url.pathname}`;
  } catch {
    return value.split(/[?#]/, 1)[0] ?? "";
  }
}

export function sanitizeClientSentryEvent<T extends ClientSentryEvent>(
  event: T,
): T {
  if (event.request?.url) {
    event.request.url = sanitizeClientUrl(event.request.url);
  }
  if (event.request) {
    delete event.request.query_string;
  }
  return event;
}

export function sanitizeClientSentryBreadcrumb<
  T extends ClientSentryBreadcrumb,
>(breadcrumb: T): T {
  if (!breadcrumb.data) return breadcrumb;

  for (const key of ["from", "to", "url"] as const) {
    const value = breadcrumb.data[key];
    if (typeof value === "string") {
      breadcrumb.data[key] = sanitizeClientUrl(value);
    }
  }
  return breadcrumb;
}

/**
 * Keep the monitoring SDK out of the critical client path and expose only the
 * capture methods this site uses. The narrow local adapter lets the bundler
 * discard Replay and other unused browser SDK features.
 */
export function loadClientSentry(): Promise<ClientSentryFacade | null> {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) return Promise.resolve(null);

  clientPromise ??= import("./client-sentry-runtime")
    .then(({ initializeClientSentry }) =>
      initializeClientSentry({
        dsn,
        beforeSend: sanitizeClientSentryEvent,
        beforeBreadcrumb: sanitizeClientSentryBreadcrumb,
      }),
    )
    .catch(() => {
      clientPromise = null;
      return null;
    });

  return clientPromise;
}
