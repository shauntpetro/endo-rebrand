import {
  captureException,
  captureRouterTransitionStart,
  getClient,
  init,
} from "@sentry/nextjs";
import type {
  ClientSentryBreadcrumb,
  ClientSentryEvent,
  ClientSentryFacade,
} from "./client-sentry";

type InitializeClientSentryOptions = {
  dsn: string;
  beforeSend: <T extends ClientSentryEvent>(event: T) => T;
  beforeBreadcrumb: <T extends ClientSentryBreadcrumb>(breadcrumb: T) => T;
};

export function initializeClientSentry({
  dsn,
  beforeSend,
  beforeBreadcrumb,
}: InitializeClientSentryOptions): ClientSentryFacade {
  if (!getClient()) {
    init({
      dsn,
      tracesSampleRate: 0.1,
      debug: false,
      beforeSend,
      beforeBreadcrumb,
    });
  }

  return {
    captureException,
    captureRouterTransitionStart,
  };
}
