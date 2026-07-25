"use client";

import Button from "@/components/site/Button";
import { useIsHydrated } from "@/components/site/useIsHydrated";

function hasRecoverableHistory(href: string) {
  if (window.history.length <= 1 || !document.referrer) return false;

  try {
    const referrer = new URL(document.referrer);
    const destination = new URL(href, window.location.origin);

    return (
      referrer.origin === window.location.origin &&
      referrer.pathname === destination.pathname
    );
  } catch {
    return false;
  }
}

export default function DraftRecoveryLink({
  href,
}: {
  href: string;
}) {
  const isHydrated = useIsHydrated();

  if (!isHydrated || !hasRecoverableHistory(href)) return null;

  function restoreDraft(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    window.history.back();
  }

  return (
    <Button href={href} onClick={restoreDraft} arrow>
      Go back to your draft
    </Button>
  );
}
