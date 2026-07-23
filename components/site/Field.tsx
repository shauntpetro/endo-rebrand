"use client";

import { clsx } from "clsx";
import { ChevronDown } from "lucide-react";

type Base = {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  className?: string;
  id?: string;
};

const inputCls =
  "w-full rounded-lg border border-ink/25 bg-surface px-3.5 py-2.5 text-ink placeholder:text-muted transition-[border-color,box-shadow] focus-visible:border-teal-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-ink/25";

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
    <p id={id} role="alert" className="mt-1.5 text-sm text-rose-ink">
      {children}
    </p>
  );
}

export function TextField({
  label, name, required, error, className, id: providedId, type = "text", value, onChange, placeholder, autoComplete, maxLength, inputMode,
}: Base & {
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  const id = providedId ?? `field-${name}`;
  const errId = `${id}-err`;
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>{label}</Label>
      <input
        id={id} name={name} type={type} value={value} placeholder={placeholder} autoComplete={autoComplete}
        maxLength={maxLength} inputMode={inputMode}
        required={required} aria-required={required || undefined} aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined} onChange={(e) => onChange(e.target.value)}
        className={clsx(inputCls, error && "border-rose-ink")}
      />
      {error && <ErrorText id={errId}>{error}</ErrorText>}
    </div>
  );
}

export function TextArea({
  label, name, required, error, className, id: providedId, value, onChange, placeholder, rows = 4, maxLength,
}: Base & { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number; maxLength?: number }) {
  const id = providedId ?? `field-${name}`;
  const errId = `${id}-err`;
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>{label}</Label>
      <textarea
        id={id} name={name} rows={rows} value={value} placeholder={placeholder} maxLength={maxLength}
        required={required} aria-required={required || undefined} aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined} onChange={(e) => onChange(e.target.value)}
        className={clsx(inputCls, "resize-y", error && "border-rose-ink")}
      />
      {error && <ErrorText id={errId}>{error}</ErrorText>}
    </div>
  );
}

export function SelectField({
  label, name, required, error, className, id: providedId, value, onChange, options,
}: Base & { value: string; onChange: (v: string) => void; options: readonly { value: string; label: string }[] }) {
  const id = providedId ?? `field-${name}`;
  const errId = `${id}-err`;
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>{label}</Label>
      <div className="relative">
        <select
          id={id} name={name} value={value} required={required} aria-required={required || undefined}
          aria-invalid={error ? true : undefined} aria-describedby={error ? errId : undefined}
          onChange={(e) => onChange(e.target.value)}
          className={clsx(inputCls, "cursor-pointer appearance-none pr-10", error && "border-rose-ink")}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown aria-hidden size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted" />
      </div>
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
