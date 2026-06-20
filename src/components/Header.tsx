"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dict } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

interface Props {
  locale: Locale;
  dict: Dict;
}

export function Header({ locale, dict }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const links = [
    { href: `/${locale}`, label: dict.nav.home, exact: true },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/products`, label: dict.nav.products },
    { href: `/${locale}/brands`, label: dict.nav.brands },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  };



  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-bg)]/85 backdrop-blur-md border-b border-[var(--color-border)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-20">
        <Link href={`/${locale}`} className="flex items-center group">
          <Logo variant="full" size={38} locale={locale} />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const active = isActive(l.href, l.exact);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  active
                    ? "text-[var(--color-fg)]"
                    : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-px bg-[var(--color-accent)]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">


          <Link
            href={`/${locale}/contact`}
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-[#1D1D1D] px-4 py-2 text-sm font-semibold text-[#F9F7F3] hover:bg-[var(--color-accent)] hover:text-white transition shadow-sm"
          >
            {dict.nav.cta}
            <Icon name={locale === "ar" ? "ArrowLeft" : "ArrowRight"} size={14} />
          </Link>

          <button
            className="lg:hidden grid h-10 w-10 place-items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg)]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <Icon name={mobileOpen ? "X" : "Menu"} size={18} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur">
          <nav className="container-page flex flex-col py-4">
            {links.map((l) => {
              const active = isActive(l.href, l.exact);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`flex items-center justify-between rounded-xl px-3 py-3 text-base ${
                    active
                      ? "text-[var(--color-fg)] bg-[var(--color-surface)]"
                      : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                  }`}
                >
                  <span>{l.label}</span>
                  <Icon name={locale === "ar" ? "ArrowLeft" : "ArrowRight"} size={16} />
                </Link>
              );
            })}
            <div className="mt-3">
              <Link
                href={`/${locale}/contact`}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#1D1D1D] px-3 py-3 text-sm font-semibold text-[#F9F7F3] hover:bg-[var(--color-accent)] hover:text-white transition shadow-sm w-full"
              >
                {dict.nav.cta}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
