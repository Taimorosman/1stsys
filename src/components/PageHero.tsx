import * as React from "react";

interface Props {
  eyebrow: string;
  title: React.ReactNode;
  body?: string;
  children?: React.ReactNode;
  bgImage?: string;
}

export function PageHero({ eyebrow, title, body, children, bgImage }: Props) {
  return (
    <section className="relative pt-32 pb-16 md:pt-44 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 hero-grid-bg pointer-events-none" />
      <div className="absolute -top-32 -end-32 w-[500px] h-[500px] rounded-full bg-[var(--color-accent)]/8 blur-3xl pointer-events-none" />

      <div className="container-page relative">
        {bgImage ? (
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex animate-fade-in items-center gap-2 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
                {eyebrow}
              </span>
              <h1 className="text-display animate-fade-up delay-100 mt-6 text-4xl font-medium md:text-5xl lg:text-6xl leading-[1.1] md:leading-[1.05]">
                {title}
              </h1>
              {body && (
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-fg-muted)] md:text-lg animate-fade-up delay-200">
                  {body}
                </p>
              )}
              {children && <div className="mt-10 animate-fade-up delay-300">{children}</div>}
            </div>
            <div className="lg:col-span-5 relative mt-6 lg:mt-0 animate-fade-in delay-300">
              {/* Outer soft aura glow */}
              <div className="absolute -inset-2 rounded-[24px] bg-gradient-to-tr from-[var(--color-accent)]/15 to-[var(--color-accent)]/2 blur-xl opacity-75 animate-halo pointer-events-none parallax-glow-1" />
              <div className="ui-card relative rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3] group animate-float-slow parallax-element">
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/60 via-transparent to-transparent z-10 pointer-events-none" />
                <img
                  src={bgImage}
                  alt={typeof title === "string" ? title : "Hero visual"}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl">
            <span className="inline-flex animate-fade-in items-center gap-2 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              {eyebrow}
            </span>
            <h1 className="text-display animate-fade-up delay-100 mt-6 text-4xl font-medium md:text-6xl lg:text-7xl">
              {title}
            </h1>
            {body && (
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-fg-muted)] md:text-xl animate-fade-up delay-200">
                {body}
              </p>
            )}
            {children && <div className="mt-10 animate-fade-up delay-300">{children}</div>}
          </div>
        )}
      </div>
    </section>
  );
}
