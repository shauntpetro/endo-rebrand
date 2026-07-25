import { loadClientSentry, sanitizeClientUrl } from "@/lib/client-sentry";

const SENTRY_IDLE_TIMEOUT_MS = 8_000;

let activateClientSentry = loadClientSentry;

if (process.env.NEXT_PUBLIC_SENTRY_DSN && typeof window !== "undefined") {
  let activationPromise: ReturnType<typeof loadClientSentry> | null = null;
  let idleCallbackId: number | null = null;
  let fallbackTimeoutId: ReturnType<typeof setTimeout> | null = null;
  let waitingForLoad = false;

  const removeEarlyErrorListeners = () => {
    window.removeEventListener("error", handleEarlyError);
    window.removeEventListener(
      "unhandledrejection",
      handleEarlyUnhandledRejection,
    );
  };

  const cancelDeferredActivation = () => {
    if (waitingForLoad) {
      window.removeEventListener("load", scheduleDeferredActivation);
      waitingForLoad = false;
    }

    if (idleCallbackId !== null && "cancelIdleCallback" in window) {
      window.cancelIdleCallback(idleCallbackId);
      idleCallbackId = null;
    }

    if (fallbackTimeoutId !== null) {
      clearTimeout(fallbackTimeoutId);
      fallbackTimeoutId = null;
    }
  };

  function scheduleDeferredActivation() {
    waitingForLoad = false;

    const connection = (
      window.navigator as Navigator & {
        connection?: { saveData?: boolean };
      }
    ).connection;

    // Preserve immediate activation for errors and route transitions, but do
    // not spend a constrained connection on speculative monitoring work.
    if (connection?.saveData) return;

    if ("requestIdleCallback" in window) {
      idleCallbackId = window.requestIdleCallback(
        () => {
          void activate();
        },
        { timeout: SENTRY_IDLE_TIMEOUT_MS },
      );
    } else {
      fallbackTimeoutId = setTimeout(() => {
        void activate();
      }, SENTRY_IDLE_TIMEOUT_MS);
    }
  }

  const activate = () => {
    if (activationPromise) return activationPromise;

    cancelDeferredActivation();
    removeEarlyErrorListeners();
    activationPromise = loadClientSentry().then((sentry) => {
      if (!sentry) activationPromise = null;
      return sentry;
    });
    return activationPromise;
  };

  function handleEarlyError(event: ErrorEvent) {
    const exception =
      event.error ??
      new Error(event.message || "Unhandled browser error");

    void activate().then((sentry) => {
      sentry?.captureException(exception);
    });
  }

  function handleEarlyUnhandledRejection(event: PromiseRejectionEvent) {
    const exception =
      event.reason ?? new Error("Unhandled promise rejection");

    void activate().then((sentry) => {
      sentry?.captureException(exception);
    });
  }

  activateClientSentry = activate;
  window.addEventListener("error", handleEarlyError);
  window.addEventListener(
    "unhandledrejection",
    handleEarlyUnhandledRejection,
  );

  if (document.readyState === "complete") {
    scheduleDeferredActivation();
  } else {
    waitingForLoad = true;
    window.addEventListener("load", scheduleDeferredActivation, { once: true });
  }
}

export function onRouterTransitionStart(
  href: string,
  navigationType: string,
) {
  void activateClientSentry().then((sentry) => {
    sentry?.captureRouterTransitionStart(
      sanitizeClientUrl(href),
      navigationType,
    );
  });
}
