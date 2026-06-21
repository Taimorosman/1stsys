import * as React from "react";
import Link from "next/link";
import type { Dict } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

interface Props {
  locale: Locale;
  dict: Dict;
}

export function Footer({ locale, dict }: Props) {
  const f = dict.footer;
  const localePath = (href: string) => href;

  return (
    <footer className="relative mt-24 border-t border-[var(--color-border)] bg-[var(--color-surface)]/40">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" className="inline-flex items-center">
              <Logo variant="full" size={42} locale={locale} />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[var(--color-fg-muted)]">
              {f.tagline}
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
              {f.headquarters.title}
            </div>
            <ul className="mt-4 space-y-3 text-sm text-[var(--color-fg-muted)]">
              {f.headquarters.locations.map((loc) => (
                <li key={loc} className="flex items-start gap-2">
                  <Icon
                    name="MapPin"
                    size={14}
                    className="mt-0.5 text-[var(--color-accent)] shrink-0"
                  />
                  <span>{loc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
              {f.quickLinks.title}
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              {f.quickLinks.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={localePath(l.href)}
                    className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
              {f.support.title}
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Icon
                  name="Phone"
                  size={14}
                  className="mt-0.5 text-[var(--color-accent)] shrink-0"
                />
                <a
                  href={f.support.phoneHref}
                  className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition"
                  dir="ltr"
                >
                  {f.support.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon
                  name="Mail"
                  size={14}
                  className="mt-0.5 text-[var(--color-accent)] shrink-0"
                />
                <a
                  href={`mailto:${f.support.email}`}
                  className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition"
                  dir="ltr"
                >
                  {f.support.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon
                  name="Clock"
                  size={14}
                  className="mt-0.5 text-[var(--color-accent)] shrink-0"
                />
                <span className="text-[var(--color-fg-muted)]">
                  {f.support.hours}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="gradient-divider mt-14" />

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-[var(--color-fg-subtle)]">
            {f.legal.copyright}
          </p>
          <div className="flex items-center gap-6 text-xs text-[var(--color-fg-subtle)]">
            <Link href="#" className="hover:text-[var(--color-fg)] transition">
              {f.legal.privacy}
            </Link>
            <Link href="#" className="hover:text-[var(--color-fg)] transition">
              {f.legal.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
