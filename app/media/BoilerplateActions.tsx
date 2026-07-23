"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ClipboardCopy, Download } from "lucide-react";

type CopyState = "idle" | "copied" | "error";

async function writeToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall through to the selection-based copy path for restricted browsers.
    }
  }

  if (typeof document.execCommand !== "function") {
    throw new Error("Copy command was unavailable.");
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.inset = "0 auto auto -9999px";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    if (!document.execCommand("copy")) {
      throw new Error("Copy command was unavailable.");
    }
  } finally {
    textarea.remove();
  }
}

export default function BoilerplateActions({ text }: { text: string }) {
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const statusId = useId();

  useEffect(
    () => () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    },
    [],
  );

  async function handleCopy() {
    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
    }

    try {
      await writeToClipboard(text);
      setCopyState("copied");
      resetTimer.current = setTimeout(() => setCopyState("idle"), 2400);
    } catch {
      setCopyState("error");
    }
  }

  const status =
    copyState === "copied"
      ? "Approved boilerplate copied to the clipboard."
      : copyState === "error"
        ? "Copy is unavailable in this browser. Select the boilerplate text below or download the text file."
        : "Copy or download the approved boilerplate without reformatting it.";

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <button
        type="button"
        onClick={handleCopy}
        aria-describedby={statusId}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-teal-ink transition-[border-color,color,transform] duration-300 hover:border-plum hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-ink active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none"
      >
        {copyState === "copied" ? (
          <Check aria-hidden size={16} />
        ) : (
          <ClipboardCopy aria-hidden size={16} />
        )}
        {copyState === "copied" ? "Copied" : "Copy boilerplate"}
      </button>
      <a
        href="/downloads/endocyclic-approved-boilerplate.txt"
        download="endocyclic-approved-boilerplate.txt"
        className="link-underline inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-teal-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-ink"
      >
        Download .txt
        <Download aria-hidden size={16} />
      </a>
      <p
        id={statusId}
        aria-live="polite"
        aria-atomic="true"
        className="basis-full text-xs leading-relaxed text-muted"
      >
        {status}
      </p>
    </div>
  );
}
