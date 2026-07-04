"use client";

import { useId } from "react";
import { clsx } from "clsx";

type Base = {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  tone?: "light" | "dark";
  className?: string;
};

const inputBaseLight =
  "w-full bg-transparent border-b border-line px-0 py-3 text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-gold-ink transition-colors";
const inputBaseDark =
  "w-full bg-transparent border-b border-line-on-dark px-0 py-3 text-paper-on-dark placeholder:text-muted-on-dark/60 focus:outline-none focus:border-gold-light transition-colors";

function Label({
  htmlFor,
  children,
  required,
  tone,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  tone?: "light" | "dark";
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx("t-label mb-1 block", tone === "dark" ? "text-muted-on-dark" : "text-ink-muted")}
    >
      {children}
      {required && <span aria-hidden className="text-gold-ink"> *</span>}
    </label>
  );
}

export function TextField({
  label,
  name,
  required,
  error,
  tone = "light",
  className,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
}: Base & {
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div className={className}>
      <Label htmlFor={id} required={required} tone={tone}>
        {label}
      </Label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(tone === "dark" ? inputBaseDark : inputBaseLight, error && "border-rose")}
      />
      {error && (
        <p id={errId} role="alert" className="mt-1.5 text-sm text-rose">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextArea({
  label,
  name,
  required,
  error,
  tone = "light",
  className,
  value,
  onChange,
  placeholder,
  rows = 4,
}: Base & {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div className={className}>
      <Label htmlFor={id} required={required} tone={tone}>
        {label}
      </Label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        placeholder={placeholder}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          tone === "dark" ? inputBaseDark : inputBaseLight,
          "resize-none",
          error && "border-rose",
        )}
      />
      {error && (
        <p id={errId} role="alert" className="mt-1.5 text-sm text-rose">
          {error}
        </p>
      )}
    </div>
  );
}

export function SelectField({
  label,
  name,
  required,
  error,
  tone = "light",
  className,
  value,
  onChange,
  options,
}: Base & {
  value: string;
  onChange: (v: string) => void;
  options: readonly { value: string; label: string }[];
}) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div className={className}>
      <Label htmlFor={id} required={required} tone={tone}>
        {label}
      </Label>
      <select
        id={id}
        name={name}
        value={value}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          tone === "dark" ? inputBaseDark : inputBaseLight,
          "appearance-none cursor-pointer",
          error && "border-rose",
        )}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-paper text-ink">
            {o.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errId} role="alert" className="mt-1.5 text-sm text-rose">
          {error}
        </p>
      )}
    </div>
  );
}

/** Honeypot — visually hidden, off-screen, not tab-reachable. */
export function Honeypot({
  value,
  onChange,
  name = "_honeypot",
}: {
  value: string;
  onChange: (v: string) => void;
  name?: string;
}) {
  return (
    <div className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden>
      <label htmlFor={`${name}-hp`}>Leave this field empty</label>
      <input
        id={`${name}-hp`}
        name={name}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
