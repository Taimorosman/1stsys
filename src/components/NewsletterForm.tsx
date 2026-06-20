"use client";

import * as React from "react";
import type { Locale } from "@/i18n/config";
import { Icon } from "./Icon";

interface Props {
  locale: Locale;
  placeholder: string;
  cta: string;
  successText: string;
}

export function NewsletterForm({ locale: _locale, placeholder, cta, successText }: Props) {
  const [value, setValue] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) return;
    setSubmitted(true);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-md flex-col sm:flex-row items-stretch gap-2"
    >
      <div className="relative flex-1">
        <Icon
          name="Mail"
          size={16}
          className="absolute start-4 top-1/2 -translate-y-1/2 text-[var(--color-fg-subtle)]"
        />
        <input
          type="email"
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="h-12 w-full rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] pe-4 ps-11 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-muted)] focus:border-[var(--color-accent)]/50 focus:outline-none transition"
        />
      </div>
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#1D1D1D] px-6 text-sm font-semibold text-[#F9F7F3] hover:bg-[var(--color-accent)] hover:text-white transition shadow-sm"
      >
        {submitted ? <Icon name="Check" size={16} /> : <Icon name="Send" size={14} />}
        <span>{submitted ? successText : cta}</span>
      </button>
    </form>
  );
}
