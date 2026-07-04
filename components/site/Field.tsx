"use client";

import { useId } from "react";
import { clsx } from "clsx";

type Base = {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  className?: string;
};

const inputCls =
  "w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-ink placeholder:text-muted/70 transition-colors focus:border-teal-ink focus:outline-none";

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
      {children}
      {required && <span aria-hidden className="text-teal-ink"> *</span>}
    </label>
  );
}

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-rose">
      {children}
    </p>
  );
}

export function TextField({
  label, name, required, error, className, type = "text", value, onChange, placeholder, autoComplete,
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
      <Label htmlFor={id} required={required}>{label}</Label>
      <input
        id={id} name={name} type={type} value={value} placeholder={placeholder} autoComplete={autoComplete}
        required={required} aria-required={required || undefined} aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined} onChange={(e) => onChange(e.target.value)}
        className={clsx(inputCls, error && "border-rose")}
      />
      {error && <ErrorText id={errId}>{error}</ErrorText>}
    </div>
  );
}

export function TextArea({
  label, name, required, error, className, value, onChange, placeholder, rows = 4,
}: Base & { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>{label}</Label>
      <textarea
        id={id} name={name} rows={rows} value={value} placeholder={placeholder}
        required={required} aria-required={required || undefined} aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined} onChange={(e) => onChange(e.target.value)}
        className={clsx(inputCls, "resize-none", error && "border-rose")}
      />
      {error && <ErrorText id={errId}>{error}</ErrorText>}
    </div>
  );
}

export function SelectField({
  label, name, required, error, className, value, onChange, options,
}: Base & { value: string; onChange: (v: string) => void; options: readonly { value: string; label: string }[] }) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>{label}</Label>
      <select
        id={id} name={name} value={value} required={required} aria-required={required || undefined}
        aria-invalid={error ? true : undefined} aria-describedby={error ? errId : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(inputCls, "cursor-pointer appearance-none", error && "border-rose")}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {error && <ErrorText id={errId}>{error}</ErrorText>}
    </div>
  );
}

export function Honeypot({ value, onChange, name = "_honeypot" }: { value: string; onChange: (v: string) => void; name?: string }) {
  return (
    <div className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden>
      <label htmlFor={`${name}-hp`}>Leave this field empty</label>
      <input id={`${name}-hp`} name={name} type="text" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
