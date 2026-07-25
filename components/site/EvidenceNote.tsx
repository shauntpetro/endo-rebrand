import type { EvidenceReference } from "@/lib/site";

export default function EvidenceNote({
  reference,
  className = "",
  flush = false,
}: {
  reference: EvidenceReference;
  className?: string;
  flush?: boolean;
}) {
  const prefix =
    reference.basis === "institutional"
      ? "Institutional record"
      : "Company reported";
  const label =
    reference.label === "Company reported"
      ? prefix
      : `${prefix} · ${reference.label}`;

  if (!reference.href) {
    return (
      <p
        className={`${flush ? "" : "mt-3"} text-xs font-medium leading-relaxed text-muted ${className}`}
      >
        {label}
      </p>
    );
  }

  return (
    <a
      href={reference.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`link-underline ${flush ? "" : "mt-2"} inline-flex min-h-11 items-center text-xs font-medium text-teal-ink ${className}`}
    >
      {label}
      <span aria-hidden className="ml-1">
        ↗
      </span>
      <span className="sr-only">, opens in a new tab</span>
    </a>
  );
}
