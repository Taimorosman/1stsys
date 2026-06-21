import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

export default async function BrandsPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.brands;
  const isAr = locale === "ar";
  const arrow = isAr ? "ArrowLeft" : "ArrowRight";

  const getBrandBgImage = (id: string) => {
    switch (id) {
      case "ccc":
        return "/images/polished_concrete.png";
      case "rapidset":
        return "/images/concrete_construction.png";
      case "flake":
        return "/images/terrazzo_floor.png";
      case "bricform":
        return "/images/stamped_concrete.png";
      case "lythic":
        return "/images/polished_concrete.png";
      case "day1":
        return "/images/exposed_aggregate.png";
      default:
        return "/images/polished_concrete.png";
    }
  };

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} body={t.hero.body} bgImage="/images/brands_hero.png" />

      <Section size="md">
        <div className="grid gap-5 md:grid-cols-2">
          {t.items.map((b) => (
            <article
              key={b.id}
              className={`ui-card group relative overflow-hidden rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                b.exclusive
                  ? "border-[var(--color-accent)]/30 bg-gradient-to-br from-[var(--color-surface)] via-[var(--color-surface)] to-[var(--color-accent-soft)]/20 hover:border-[var(--color-accent)]/60 hover:shadow-[var(--color-accent)]/5"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent-green)]/60 hover:shadow-[var(--color-accent-green)]/5"
              }`}
            >
              {/* Dynamic Background Image Texture on Hover */}
              <div 
                className={`absolute inset-0 opacity-0 scale-100 transition-all duration-1000 pointer-events-none z-0 ${
                  b.exclusive ? "group-hover:opacity-[0.12] group-hover:scale-108" : "group-hover:opacity-[0.07] group-hover:scale-105"
                }`}
                style={{
                  backgroundImage: `url(${getBrandBgImage(b.id)})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-[var(--color-surface)]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />

              {b.exclusive && (
                <div className="absolute end-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)] z-10">
                  <Icon name="Award" size={10} />
                  {isAr ? "وكيل حصري" : "Exclusive Agent"}
                </div>
              )}

              <div className="relative grid h-16 w-16 place-items-center rounded-2xl border border-[var(--color-accent)]/30 bg-gradient-to-br from-[var(--color-surface-elevated)] to-[var(--color-bg)] text-display text-2xl font-bold text-[var(--color-accent)] shadow-md ring-1 ring-[var(--color-accent)]/10 z-10 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105">
                {b.name.slice(0, 2).toUpperCase()}
              </div>

              <div className="mt-6 relative z-10">
                <h3 className="text-display text-2xl font-medium transition-colors duration-300 group-hover:text-[var(--color-accent)]">{b.name}</h3>
                <div className="mt-1 text-sm text-[var(--color-fg-subtle)] font-mono" dir="ltr">
                  {b.fullName}
                </div>
                <div className="mt-3 inline-block rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-fg-muted)] bg-[var(--color-bg)]/40">
                  {b.tagline}
                </div>
                <p className="mt-5 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                  {b.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section size="md">
        <div className="ui-card relative overflow-hidden rounded-3xl border border-[var(--color-accent-green)]/30 bg-[var(--color-surface)] p-8 md:p-14 text-center group">
          <div 
            className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] scale-100 group-hover:scale-105 transition-all duration-1000 pointer-events-none z-0"
            style={{
              backgroundImage: `url(/images/stamped_concrete.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent pointer-events-none z-0" />
          <div className="absolute inset-0 hero-grid-bg pointer-events-none opacity-40 z-0" />
          <div className="relative z-10">
            <h2 className="text-display text-3xl font-medium md:text-5xl">
              {t.cta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-fg-muted)] md:text-lg">
              {t.cta.body}
            </p>
            <div className="mt-10 flex justify-center">
              <Button href={`/${locale}/contact`} size="lg" trailingIcon={arrow}>
                {t.cta.primary}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
